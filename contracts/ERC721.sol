//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;
import './ERC165.sol';

contract ERC721 is ERC165{
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _owners;
    mapping(uint256 => address) private _tokenApprovals;
    uint256[] private _allTokens;
    // Mapping from token id to position in the allTokens array
    mapping(uint256 => uint256) private _allTokensIndex;
    // Mapping from owner to list of owned token IDs
    mapping(address => mapping(uint256 => uint256)) private _ownedTokens;
    // Mapping from token ID to index of the owner tokens list
    mapping(uint256 => uint256) private _ownedTokensIndex;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    function _mint(address to, uint tokenId) internal {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already exits");
        _balances[to] += 1;
        _owners[tokenId] = to;
        _addTokenToAllTokensEnumeration(tokenId);
        _addTokenToOwnerEnumeration(to, tokenId);
        emit Transfer(address(0), to, tokenId);
    }

    function _exists(uint tokenId) internal returns (bool){
        return _owners[tokenId] != address(0);
    }

    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address (0), 'owner query for non-existent token');
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId) public view returns (address){
        address owner = _owners[tokenId];
        require(owner != address (0), 'owner query for non-existent token');
        return owner;
    }

    function transferFrom(address from, address to, uint256 tokenId) external payable{
        require(to != address(0), 'ERC721 Transfer to zero address');
        require(ownerOf(tokenId) == from, 'Trying to transfer a token address does not own!');
        approve(address(0), tokenId);
        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;
        emit Transfer(from, to, tokenId);
    }

    function approve(address to, uint256 tokenId) public {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");
        _tokenApprovals[tokenId] = to;
    }

    function getApproved(uint256 tokenId) external  returns (address){
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");
        return _tokenApprovals[tokenId];
    }

    //ERC721Enumerable
    function _addTokenToAllTokensEnumeration(uint tokenId) private{
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);
    }

    function _addTokenToOwnerEnumeration(address to, uint256 tokenId) private {
        uint length = balanceOf(to);
        _ownedTokens[to][length] = tokenId;
        _ownedTokensIndex[tokenId] = length;
    }

    function totalSupply() public view returns (uint256){
        return _allTokens.length;
    }

    function tokenByIndex(uint256 index) external view returns (uint256){
        require(index < totalSupply(), "ERC721Enumerable: global index out of bounds");
        return _allTokens[index];
    }

    function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256){
        return _ownedTokens[owner][index];
    }
}
