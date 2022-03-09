//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import './ERC721Connector.sol';

contract KryptoApez is ERC721Connector{
    string[] private _kryptoApez;
    mapping(string => bool) _kryptoApeExists;

    constructor() ERC721Connector('Krypto APE', 'KAPE'){}

    function mint(string memory kryptoApeUrl) public {
        require(!_kryptoApeExists[kryptoApeUrl], 'Error - Krypto Ape already exists');
        _kryptoApez.push(kryptoApeUrl);
        uint id = _kryptoApez.length -1;

        _kryptoApeExists[kryptoApeUrl] = true;
        _mint(msg.sender, id);
    }

    function getKryptoApez() public view returns (string[] memory){
        return _kryptoApez;
    }
}
