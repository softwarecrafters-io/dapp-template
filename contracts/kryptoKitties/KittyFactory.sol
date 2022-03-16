//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract KittyFactory is ERC721, ERC721Enumerable, Ownable {
    uint256 public generationZeroCounter;
    struct Kitty {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }
    Kitty[] kitties;
    event Birth(address owner, uint256 kittyId, uint256 mumId, uint256 dadId, uint256 genes);

    constructor() ERC721('Krypto CSS Kitties', 'KCK') {}

    function getKitty(uint256 id) public view returns (Kitty memory){
        return kitties[id];
    }

    function mintGenerationZeroKitty(uint256 genes) public {
        generationZeroCounter++;
        mintKitty(0, 0, 0, genes, msg.sender);
    }

    function mintKitty(uint256 dadId, uint256 mumId, uint256 generation, uint256 genes, address owner) private{
        Kitty memory kitty = Kitty({
            genes: genes,
            birthTime: uint64(block.timestamp),
            mumId: uint32(mumId),
            dadId: uint32(dadId),
            generation: uint16(generation)
        });
        kitties.push(kitty);
        uint256 newKittenId = kitties.length - 1;
        _mint(owner, newKittenId);
        emit Birth(owner, newKittenId, uint256(kitty.mumId), uint256(kitty.dadId), kitty.genes);
    }

    function breed(uint256 dadId, uint256 mumId) public {
        require(ownerOf(dadId) == msg.sender, 'Is not the owner of the father');
        require(ownerOf(mumId) == msg.sender, 'Is not the owner of the mother');
        address owner = msg.sender;
        Kitty memory dad = kitties[dadId];
        Kitty memory mum = kitties[mumId];
        uint256 newDna = _mixDna(dad.genes, mum.genes);
        uint256 newGeneration = calculateGeneration(dad.generation, mum.generation);
        mintKitty(dadId, mumId, newGeneration, newDna, owner);
    }

    function calculateGeneration(uint256 dadGeneration, uint256 mumGeneration) private pure returns (uint256){
        if(dadGeneration > mumGeneration){
            return dadGeneration + 1;
        }
        return mumGeneration + 1;
    }

    function _mixDna(uint256 dadDna, uint256 mumDna) public pure returns (uint256){
        uint256 divisor = 10000000;
        uint256 firstHalf = dadDna / divisor;
        uint256 secondHalf = mumDna % divisor;
        uint256 newDna = (firstHalf * divisor) + secondHalf;
        return newDna;
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool){
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}