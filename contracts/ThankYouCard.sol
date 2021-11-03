// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ThankYouCard is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds; // Default: 0

  constructor() public ERC721("ThankYouCard", "THK") {}

  /**
    * @dev Override _baseURI function by returning our own
   */
  function _baseURI() internal view virtual returns (string memory) {
    return "YOUR_API_URL/api/erc721/";
  }

  /**
    * @dev Mints NFTs and sends them to the recipient's address. Minting is the process of 
    * publishing an instance of this contract on the blockchain
   */
  function awardCard(address recipient, string memory tokenURI) 
        external 
        onlyOwner
        returns (uint 256)
  {
    _tokenIds.increment();

    uint256 newCardId = _tokenIds.current();
    _safeMint(recipient, newCardId);
    _setTokenURI(newCardId, tokenURI);
  
    return newCardId;
  }
}
