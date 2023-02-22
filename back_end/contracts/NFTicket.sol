// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol"; // library for counters -- may not be needed
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol"; // NFT token standard

contract NFTicket is ERC1155 {

    uint256 private LAST_EVENT_ID = 0;
    uint256[] private ALL_GA_TICKETS_AVAILABLE;
    uint256[] private ALL_GA_TICKETS_PRICE;

    constructor() ERC1155("https://ipfs.io/ipfs/QmZHERTYLSB3EaTzmwCMXYkdSNvwfZm6ZLctoP7JrsDHma?filename={id}.json") {

    }

    // create a new event
    function createEvent (string memory eventURI, uint256 ga_ticket_amount, uint256 ga_ticket_price) public returns (uint256) {
        uint256 eventId = generateId();
        ALL_GA_TICKETS_AVAILABLE[eventId] = ga_ticket_amount;
        ALL_GA_TICKETS_PRICE[eventId] = ga_ticket_price;
        return eventId;
    }

    function setEventUri (string memory eventURI) public {
        _setURI(eventURI)
    }

    function mintGATickets (uint256 eventId, uint256 amount) public payable {
        require(msg.value == ALL_GA_TICKETS_PRICE[eventId] * amount, "Incorrect Amount of ETH");
        require(ALL_GA_TICKETS_AVAILABLE[eventId] >= amount, "Insufficient tickets remaining");

        // mint ticket and update amount available
        _mint(msg.sender, eventId, amount, "");
        ALL_GA_TICKETS_AVAILABLE[eventId] = ALL_GA_TICKETS_AVAILABLE[eventId] - amount;
    }

    // increment the event id each time a new event is created
    function generateId () private returns (uint256) {
        uint256 newId = LAST_EVENT_ID + 1;
        LAST_EVENT_ID = newId;
        return newId;
    }


}
