//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract CustomNFT {
    string private _name;
    string private _symbol;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _owners;
    mapping(uint256 => address) private _tokenApprovals;

    constructor(string memory name_, string memory symbol_){
        _name = name_;
        _symbol = symbol_;
    }

    function name() public view returns (string memory){
        return _name;
    }

    function symbol() public view returns (string memory){
        return _symbol;
    }

    function mint(address to, uint256 tokenId) public {
        require(!_exists(tokenId), "ERC721: token already minted");

        _balances[to] += 1;
        _owners[tokenId] = to;
    }

    function _exists(uint256 tokenId) private view returns (bool) {
        return _owners[tokenId] != address(0);
    }

    function balanceOf(address owner) public view returns (uint256) {
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId) external view returns (address){
        return _owners[tokenId];
    }

    function approve(address to, uint256 tokenId) public {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");
        _tokenApprovals[tokenId] = to;
    }

    function getApproved(uint256 tokenId) external view returns (address){
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");
        return _tokenApprovals[tokenId];
    }

    function transferFrom(address from, address to, uint256 tokenId) public{
        //clear approvals
        approve(address(0), tokenId);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;
    }
}