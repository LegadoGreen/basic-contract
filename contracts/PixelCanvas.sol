// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PixelCanvas is ERC721, Ownable {
  struct PixelData {
    uint8 red;
    uint8 green;
    uint8 blue;
  }

  uint public constant WIDTH = 100;
  uint public constant HEIGHT = 100;
  mapping(uint256 => PixelData) public pixelColors;

  event PixelMinted(
    uint indexed tokenId,
    uint x,
    uint y,
    uint8 red,
    uint8 green,
    uint8 blue
  );

  constructor() ERC721("PixelCanvas", "PIXEL") Ownable(msg.sender) {}

  function mintPixel(
    uint x,
    uint y,
    uint8 red,
    uint8 green,
    uint8 blue
  ) public payable {
    require(x < WIDTH && y < HEIGHT, "Pixel out of bounds");

    uint256 tokenId = _getTokenId(x, y);

    require(!_isTokenMinted(tokenId), "Pixel already owned");

    _safeMint(msg.sender, tokenId);
    pixelColors[tokenId] = PixelData(red, green, blue);

    emit PixelMinted(tokenId, x, y, red, green, blue);
  }

  function _getTokenId(uint x, uint y) internal pure returns (uint256) {
    return y * WIDTH + x;
  }

  function getPixelData(uint x, uint y) public view returns (PixelData memory) {
    uint256 tokenId = _getTokenId(x, y);
    require(_isTokenMinted(tokenId), "Pixel not minted");
    return pixelColors[tokenId];
  }

  function _isTokenMinted(uint256 tokenId) internal view returns (bool) {
    try this.ownerOf(tokenId) {
      return true;
    } catch {
      return false;
    }
  }
}
