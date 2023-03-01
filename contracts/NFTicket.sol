// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol"; // library for counters -- may not be needed
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol"; // NFT token standard

contract NFTicket is ERC1155 {

    uint256 private LAST_EVENT_ID = 0;
    uint256 constant MAX_EVENT_ID = 999;
    uint256[] private ALL_GA_TICKETS_AVAILABLE = new uint256[](MAX_EVENT_ID);
    uint256[] private ALL_GA_TICKETS_PRICE = new uint256[](MAX_EVENT_ID);

    constructor() ERC1155("https://ipfs.io/ipfs/QmZHERTYLSB3EaTzmwCMXYkdSNvwfZm6ZLctoP7JrsDHma?filename={id}.json") {

    }

    // create a new event
    function createEvent (uint256 ga_ticket_amount, uint256 ga_ticket_price) public returns (uint256) {
        uint256 eventId = generateId();
        ALL_GA_TICKETS_AVAILABLE[eventId] = ga_ticket_amount;
        ALL_GA_TICKETS_PRICE[eventId] = ga_ticket_price;
        return eventId;
    }

    function setEventUri (string memory eventURI) public {
        _setURI(eventURI);
    }

    function mintGATickets (uint256 eventId, uint256 amount) public payable {
        // TODO: make this actually charge for the tickets
        //require(msg.value == ALL_GA_TICKETS_PRICE[eventId] * amount, "Incorrect Amount of ETH");
        require(ALL_GA_TICKETS_AVAILABLE[eventId] >= amount, "Insufficient tickets remaining");
        require(amount > 0, "Must mint at least 1 ticket");

        // mint ticket and update amount available
        // NOTE: each GA ticket is more like a fungile token than an NFT
        _mint(msg.sender, eventId, amount, "");
        ALL_GA_TICKETS_AVAILABLE[eventId] = ALL_GA_TICKETS_AVAILABLE[eventId] - amount;
    }

    // increment the event id each time a new event is created
    function generateId () private returns (uint256) {
        uint256 newId = LAST_EVENT_ID + 1;
        LAST_EVENT_ID = newId;
        return newId;
    }

    function getLastEventId () public view returns (uint256) {
        return LAST_EVENT_ID;
    }

    function getGATicketsAvailable (uint256 eventId) public view returns (uint256) {
        return ALL_GA_TICKETS_AVAILABLE[eventId];
    }

    function getGATicketsPrice (uint256 eventId) public view returns (uint256) {
        return ALL_GA_TICKETS_PRICE[eventId];
    }

}
