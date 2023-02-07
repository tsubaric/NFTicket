// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol"; // library for counters -- may not be needed
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol"; // NFT token standard

contract Ticket is ERC1155 {

    uint256 public constant GA = 0;
    uint256 public constant GA_SUPPLY = 1000;
    uint256 public GA_PRICE;
    uint256 public GA_MINTED;

    constructor(string memory metadata_uri, uint256 _ga_price) ERC1155(metadata_uri) {
       GA_PRICE = _ga_price; 
    }

    // NOTE: need to pay this function?
    function mintGeneralAdmission(uint256 _amount) public payable {
        require(msg.value >= GA_PRICE * _amount, "Insufficient amount of ETH");
        require(GA_MINTED < GA_SUPPLY, "General Admission sold out");
        require(GA_MINTED + _amount < GA_SUPPLY, "Insufficient tickets remaining");
        _mint(msg.sender, GA, _amount, "");
        GA_MINTED = GA_MINTED + _amount;
    }

    // TODO: function to redeem tickets
    //https://docs.mintbase.xyz/ethereum/ethereum/minter-ui/redeeming-tickets-nfts
    


    // TODO: add transfer function
    

    // TODO: royalties -- percentage of resell profit to be paid to original creator

    // TODO: destroy function


}
