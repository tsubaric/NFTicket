// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract Ticket is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("TIcket", "NFTCKT") {}

    /*
        Super basic mint function that stores the URI.
        URIs should be addresses of CIDs of metadata 
        stored on IPFS, but not enforced
    */
    function mint(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newTokenId  = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        return newTokenId;
    }


}
