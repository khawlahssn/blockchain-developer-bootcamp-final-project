// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
contract ThankYouCard is ERC721, ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor() public ERC721("ThankYouCard", "TYC") {} 

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
      super._burn(tokenId);
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) 
          internal 
          virtual 
          override(ERC721URIStorage) 
    {
      super._setTokenURI(tokenId, _tokenURI);
    }

    function tokenURI(uint256 tokenId) 
          public 
          view 
          virtual 
          override(ERC721, ERC721URIStorage)
          returns (string memory) 
    {
      return super.tokenURI(tokenId);
    }


    function _baseURI() internal view virtual override(ERC721) returns (string memory) {
      return "https://ipfs.io/ipfs/";
    }

    function mintCard(address _to)
        public
        onlyOwner
        returns (uint256)
    {
      _tokenIds.increment(); 

      uint256 newCardId = _tokenIds.current();

      // _safeMint(/* arguments */);

      // _setTokenURI(/* arguments */);

      return newCardId;
    }
}
