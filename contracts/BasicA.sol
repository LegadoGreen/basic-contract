// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BasicERC721A is ERC721A, Ownable {
    constructor(address initialOwner) ERC721A("BasicERC721A", "B721A") Ownable(initialOwner) {}

    function batchMint(address to, uint256 quantity) external onlyOwner {
        require(quantity > 0, "Quantity must be greater than 0");
        _mint(to, quantity);
    }
}
