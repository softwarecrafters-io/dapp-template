//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract CustomERC20 {
    string private _name;
    string private _symbol;
    uint256  private _totalSupply;
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    address private _owner;

    constructor(string memory name_, string memory symbol_, uint256 initialAmount){
        _name = name_;
        _symbol = symbol_;
        _totalSupply = initialAmount * (10**decimals());
        _balances[msg.sender] = _totalSupply;
        _owner = msg.sender;
    }

    function name() public view returns (string memory){
        return _name;
    }

    function symbol() public view returns (string memory){
        return _symbol;
    }

    function decimals() public pure returns (uint8){
        return 18;
    }

    function totalSupply() public view returns (uint256 ){
        return _totalSupply;
    }

    function balanceOf(address owner) public view returns (uint256 balance){
        return _balances[owner];
    }

    function transfer(address to, uint256 amount) public returns (bool success){
        address from = msg.sender;
        return _transfer(from, to, amount);
    }

    event Transfer(address indexed from, address indexed to, uint256 value);

    function approve(address spender, uint256 amount) public returns (bool success){
        address owner = msg.sender;
        _allowances[owner][spender] = amount;
        emit Approve(owner, spender, amount);
        return true;
    }

    event Approve(address indexed owner, address indexed spender, uint256 value);

    function allowance(address owner, address spender) public view returns (uint256 remaining){
        return _allowances[owner][spender];
    }

    function transferFrom(address from, address to, uint256 amount) public returns (bool success){
        uint256 currentAllowance = allowance(from, msg.sender);
        require(currentAllowance >= amount, "ERC20: insufficient allowance");
        _allowances[from][msg.sender] -= amount;
        return _transfer(from, to, amount);
    }

    function _transfer(address from, address to, uint256 amount) private returns (bool success){
        require(_balances[from] >= amount, "ERC20: transfer amount exceeds balance");
        _balances[from] -= amount;
        _balances[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }

    function mint(uint amount) public onlyOwner {
        _balances[msg.sender] += amount;
        _totalSupply += amount;
    }

    modifier onlyOwner() {
        require(_owner == msg.sender, "ERC20: caller is not the owner");
        _;
    }

    function burn(uint amount) public onlyOwner {
        uint256 accountBalance = _balances[msg.sender];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        _balances[msg.sender] -= amount;
        _totalSupply -= amount;
    }
}