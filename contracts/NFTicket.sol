// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol"; // library for counters -- may not be needed
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol"; // NFT token standard

contract NFTicket is ERC1155 {

    using Counters for Counters.Counter;
    Counters.Counter private eventCounter;
    mapping(uint256 => Counters.Counter) private ticketCounters; // counter for each event

    struct Event {
        uint256 eventId; // 1 - 999
        uint256 ticketAmount; // 0 - 999999
        uint256 ticketPrice;
        uint256 ticketsAvailable;
        address eventOwner;
    }

    struct Ticket {
        uint256 ticketId; // ticketId is the eventId concatenated with the ticket number
        bool redeemed;
    }

    mapping (uint256 => Event) private allEventsMap; // event id -> Event struct
    mapping (uint256 => Ticket) private allTicketsMap;  // ticket id -> Ticket struct
    mapping (address => uint256[]) private ownedTicketsMap;  // user -> owned ticketIds
    mapping (address => uint256[]) private ownedEventsMap; // user -> owned eventId


    constructor() ERC1155("https://ipfs.io/ipfs/QmZHERTYLSB3EaTzmwCMXYkdSNvwfZm6ZLctoP7JrsDHma?filename={id}.json") {
        eventCounter.increment(); // start at event id 1
    }

    // create a new event
    function createEvent (uint256 ticketAmount, uint256 ticketPrice) public returns (uint256) {
        uint256 eventId = eventCounter.current();
        eventCounter.increment(); // start ticket ids at 1
        allEventsMap[eventId] =  Event(eventId, ticketAmount, ticketPrice, ticketAmount, msg.sender);
        return eventId;
    }

    function setEventUri (string memory eventURI) public {
        _setURI(eventURI);
    }

    function mintTickets (uint256 eventId, uint256 amount) public payable {
        // TODO: make this actually charge for the tickets
        //require(msg.value == ALL_GA_TICKETS_PRICE[eventId] * amount, "Incorrect Amount of ETH");
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
            allTicketsMap[ids[i]] = Ticket(ids[i], false);  // update ticket information
            ownedTicketsMap[msg.sender].push(ids[i]);  // add ticket to owner mapping
        }
    }

    // increment the event id each time a new event is created
    function generateTicketId (uint256 eventId, uint256 ticketNumber) internal pure returns (uint256) {
        require(eventId <= 999, "Event ID must be less than 1000");
        require(ticketNumber <= 999999, "Ticket number must be less than 99999999");

        return eventId * 1000000 + ticketNumber;
    }

    // ------------------------
    // getters defined below
    function getLastEventId () public view returns (uint256) {
        return eventCounter.current() - 1;
    }

    function getTicketsAvailable (uint256 eventId) public view returns (uint256) {
        return allEventsMap[eventId].ticketsAvailable;
    }

    function getTicketPrice (uint256 eventId) public view returns (uint256) {
        return allEventsMap[eventId].ticketPrice;
    }

    function getEventInfo (uint256 eventId) public view returns (Event memory) {
        return allEventsMap[eventId];
    }

    function getAllOwnedTickets () public view returns (uint256[] memory ticketIds) {
        return ownedTicketsMap[msg.sender];
    }

}
