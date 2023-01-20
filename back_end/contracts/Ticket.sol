// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Ticket is ERC1155 {

    constructor(string memory metadata_uri) ERC1155(metadata_uri) {
    }

    function createTickets(uint256 _id, uint256 _supply) public {
        _mint(msg.sender, _id, _supply, "");
    }


    // TODO: function to redeem tickets

    // TODO: add transfer function

    // TODO: royalties

    // TODO: destroy function


}
