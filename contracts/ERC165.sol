// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface IERC165 {
    /// @notice Query if a contract implements an interface
    /// @param interfaceID The interface identifier, as specified in ERC-165
    /// @dev Interface identification is specified in ERC-165. This function
    ///  uses less than 30,000 gas.
    /// @return `true` if the contract implements `interfaceID` and
    ///  `interfaceID` is not 0xffffffff, `false` otherwise
    function supportsInterface(bytes4 interfaceID) external view returns (bool);
}

contract ERC165 is IERC165{
    mapping (bytes4 => bool) _supportedInterfaces;

    constructor(){
        registerInterface(0x73813bba);
    }

    function calculateFingerPrint() public pure returns (bytes4){
        bytes32 hash = keccak256('supportsInterface(bytes4');
        return bytes4(hash);
    }

    function supportsInterface(bytes4 interfaceId) external override view returns (bool){
        return _supportedInterfaces[interfaceId];
    }

    function registerInterface(bytes4 interfaceId) public{
        _supportedInterfaces[interfaceId] = true;
    }
}