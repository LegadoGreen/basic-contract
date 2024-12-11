// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BasicERC721WithDynamicURI is ERC721, Ownable {
  uint256 public nextTokenId;
  string public baseURI;

  constructor(
    string memory initialBaseURI,
    address initialOwner
  ) ERC721("DynamicERC721", "D721") Ownable(initialOwner) {
    baseURI = initialBaseURI;
  }

  function mint(address to) external onlyOwner {
    _safeMint(to, nextTokenId);
    nextTokenId++;
  }

  function setBaseURI(string memory newBaseURI) external onlyOwner {
    baseURI = newBaseURI;
  }

  function _baseURIInternal() internal view returns (string memory) {
    return baseURI;
  }

  function tokenURI(
    uint256 tokenId
  ) public view override returns (string memory) {
    // Replace _exists with a try-catch around ownerOf
    try this.ownerOf(tokenId) returns (address) {
      return
        string(
          abi.encodePacked(_baseURIInternal(), Strings.toString(tokenId), ".json")
        );
    } catch {
      revert("ERC721Metadata: URI query for nonexistent token");
    }
  }
}
