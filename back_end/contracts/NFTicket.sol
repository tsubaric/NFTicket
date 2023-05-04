// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol"; // library for counters -- may not be needed
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol"; // NFT token standard
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract NFTicket is ERC1155 {

    using Counters for Counters.Counter;
    Counters.Counter private eventCounter;
    mapping(uint256 => Counters.Counter) private ticketCounters;
    AggregatorV3Interface internal immutable priceFeed;

    struct Event {
        uint256 eventId; // 1 - 999
        uint256 ticketAmount; // 0 - 999999
        uint256 ticketPriceUSD;
        uint256 ticketsAvailable;
        address eventOwner;
    }

    struct Ticket {
        uint256 eventId;
        uint256 ticketId; // ticketId is the eventId concatenated with the ticket number
        bool redeemed;
        address owner;
    }

    mapping (uint256 => Event) private allEventsMap; // event id -> Event struct
    mapping (uint256 => Ticket) private allTicketsMap;  // ticket id -> Ticket struct
    mapping (address => uint256[]) private ownedTicketsMap;  // user -> owned ticketIds
    mapping (address => uint256[]) private ownedEventsMap; // user -> owned eventId

    constructor(address _priceFeed) ERC1155("https://firebasestorage.googleapis.com/v0/b/nfticket-f0356.appspot.com/o/metadata%2F{id}.json?alt=media") {
        eventCounter.increment(); // start at event id 1
        priceFeed = AggregatorV3Interface(_priceFeed); // ETH/USD price feed
    }

    // create a new event
    function createEvent (uint256 ticketAmount, uint256 ticketPriceUSD) public returns (uint256) {
        uint256 eventId = eventCounter.current();
        eventCounter.increment(); // start ticket ids at 1
        allEventsMap[eventId] =  Event(eventId, ticketAmount, ticketPriceUSD, ticketAmount, msg.sender);
        ownedEventsMap[msg.sender].push(eventId);
        return eventId;
    }

    function setEventUri (string memory eventURI) public {
        _setURI(eventURI);
    }

    function mintTickets (uint256 eventId, uint256 amount) public payable {
        require(msg.value >= (getTicketPriceETH(eventId) * amount), "Incorrect amount of ETH sent");
        require(allEventsMap[eventId].ticketsAvailable >= amount, "Insufficient tickets remaining");
        require(amount > 0, "Must mint at least 1 ticket");

        // mint tickets and update amount available
        uint256[] memory ids = new uint256[](amount);
        uint256[] memory amounts = new uint256[](amount);
        uint256 curTicketCount = ticketCounters[eventId].current();
        // generate ids for minting
        for (uint i = 0; i < amount; i++) {
            uint256 ticketId = generateTicketId(eventId, curTicketCount);
            ids[i] = ticketId;
            amounts[i] = 1;
            curTicketCount++; // incrementing temp variable because we want to increment counter after minting
        }
        _mintBatch(msg.sender, ids, amounts, "");

        // update owned tickets
        // doing this after minting in case mint fails
        for (uint i = 0; i < amount; i++){
            ticketCounters[eventId].increment(); // increment ticket counter
            allTicketsMap[ids[i]] = Ticket(eventId, ids[i], false, msg.sender);  // update ticket information
            ownedTicketsMap[msg.sender].push(ids[i]);  // add ticket to owner mapping
            allEventsMap[eventId].ticketsAvailable--;  // update available tickets
        }
    }

    // increment the event id each time a new event is created
    function generateTicketId (uint256 eventId, uint256 ticketNumber) internal pure returns (uint256) {
        require(eventId <= 999, "Event ID must be less than 1000");
        require(ticketNumber <= 999999, "Ticket number must be less than 999999");

        return eventId * 1000000 + ticketNumber;
    }

    function redeemTicket (uint256 ticketId) public {
        require(allTicketsMap[ticketId].owner == msg.sender, "Only the ticket owner can redeem a ticket");
        allTicketsMap[ticketId].redeemed = true;
    }

    function transferTicket (uint256 ticketId, address recipient) public {
        require(allTicketsMap[ticketId].owner == msg.sender, "Only the ticket owner can transfer a ticket");
        safeTransferFrom(msg.sender, recipient, ticketId, 1, "");
        allTicketsMap[ticketId].owner = recipient;
        ownedTicketsMap[msg.sender] = removeTicketId(ownedTicketsMap[msg.sender], ticketId);
        ownedTicketsMap[recipient].push(ticketId);
    }

    function removeTicketId (uint256[] memory ticketIds, uint256 ticketId) internal pure returns (uint256[] memory) {
        uint256[] memory newTicketIds = new uint256[](ticketIds.length - 1);
        uint256 j = 0;
        for (uint i = 0; i < ticketIds.length; i++) {
            if (ticketIds[i] != ticketId) {
                newTicketIds[j] = ticketIds[i];
                j++;
            }
        }
        return newTicketIds;
    }

    // ------------------------
    // getters defined below
    function getLastEventId () public view returns (uint256) {
        return eventCounter.current() - 1;
    }

    function getEventInfo (uint256 eventId) public view returns (Event memory) {
        return allEventsMap[eventId];
    }

    function getAllOwnedTickets () public view returns (uint256[] memory ticketIds) {
        return ownedTicketsMap[msg.sender];
    }

    function getAllOwnedEvents () public view returns (uint256[] memory eventIds) {
        return ownedEventsMap[msg.sender];
    }

    function getTicketInfo (uint256 ticketId) public view returns (Ticket memory) {
        return allTicketsMap[ticketId];
    }

    // returns number of tickets still available for an event
    function getRemainingAvailTickets (uint256 eventId) public view returns (uint ticketRemain){
        return allEventsMap[eventId].ticketsAvailable;
    }

    // returns ticket price in USD
    function getTicketPriceUSD (uint256 eventId) public view returns (uint256) {
        return allEventsMap[eventId].ticketPriceUSD;
    }

    function getTicketPriceETH (uint256 eventId) public view returns (uint256) {
        uint256 ticketPriceUSD = getTicketPriceUSD(eventId);
        uint8 decimals = priceFeed.decimals();

        (,int256 price,,,) = priceFeed.latestRoundData();

        return (ticketPriceUSD * 10 ** decimals) / (uint256(price) / 10 ** decimals);
    }

}
