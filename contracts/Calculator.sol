//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Calculator {
	mapping(address => int256) private storedValueByOwner;

	function Constructor() public {
		storedValueByOwner[msg.sender] = 0;
	}

	function add(int256 a, int256 b) public pure returns (int256) {
		return a + b;
	}

	function subtract(int256 a, int256 b) public pure returns (int256) {
		return a - b;
	}

	function multiply(int256 a, int256 b) public pure returns (int256) {
		return a * b;
	}

	function divide(int256 a, int256 b) public pure returns (int256) {
		return a / b;
	}

	function factorial(int256 n) public pure returns (int256) {
		require(n >= 0, 'Negative numbers not allowed');
		if (n == 0) {
			return 1;
		}
		int256 acc = 1;
		while (n > 0) {
			acc = acc * n;
			n = n - 1;
		}
		return acc;
	}

	function addStoredValue(int256 n) public view returns (int256) {
		return n + storedValueByOwner[msg.sender];
	}

	function subtractStoredValue(int256 n) public view returns (int256) {
		return storedValueByOwner[msg.sender] - n;
	}

	function multiplyStoredValue(int256 n) public view returns (int256) {
		return storedValueByOwner[msg.sender] * n;
	}

	function divideStoredValue(int256 n) public view returns (int256) {
		return storedValueByOwner[msg.sender] / n;
	}

	event onSetValue(int256 value);

	function setValueByOwner(int256 value) public {
		emit onSetValue(value);
		storedValueByOwner[msg.sender] = value;
	}

	function getStoredValue() public view returns (int256) {
		return storedValueByOwner[msg.sender];
	}

	function deleteStoredValue() public {
		storedValueByOwner[msg.sender] = 0;
	}
}
