pragma solidity ^0.8.0;

contract CrowFunding {
    address private _owner;
    uint private _raised;
    mapping(address => uint) private _balances;

    constructor(){
        _owner = msg.sender;
    }

    function donate() public payable{
        _raised += msg.value;
        _balances[msg.sender] += msg.value;
    }

    function raised() public view returns (uint){
        return _raised;
    }

    function balances(address from) public view returns (uint){
        return _balances[from];
    }
}
