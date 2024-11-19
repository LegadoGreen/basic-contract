// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol"; // Import Strings library

contract ChangeUri is ERC1155, Ownable {
  uint256 public currentTokenId;

  // Base URI for IPFS metadata
  string public baseURI;

  // Constructor to set the base URI and initialize ownership
  constructor(
    string memory _baseURI,
    address initialOwner
  ) ERC1155("") Ownable(initialOwner) {
    baseURI = _baseURI;
  }

  // Override the uri function to append the token ID to the base URI
  function uri(uint256 tokenId) public view override returns (string memory) {
    return
      string(
        abi.encodePacked(baseURI, "/", Strings.toString(tokenId), ".json")
      );
  }

  // Batch mint tokens
  function batchMint(address to, uint256 amount) external onlyOwner {
    require(amount > 0, "Amount must be greater than zero");
    for (uint256 i = 0; i < amount; i++) {
      _mint(to, currentTokenId, 1, ""); // Mint 1 unit of each token
      currentTokenId++;
    }
  }

  // Update the base URI
  function setBaseURI(string memory _baseURI) external onlyOwner {
    baseURI = _baseURI;
  }
}
