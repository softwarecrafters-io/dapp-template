import { ethers } from 'hardhat';
import { Calculator } from '../../typechain';

describe('The calculator', () => {
	let calculator: Calculator;

	beforeAll(async () => {
		const CalculatorContract = await ethers.getContractFactory('Calculator');
		calculator = await CalculatorContract.deploy();
		await calculator.deployed();
	});

	it('adds two given numbers', async () => {
		const addTx = await calculator.add(2, 5);

		expect(addTx.toNumber()).toBe(7);
	});

	it('subtracts two given numbers', async () => {
		const addTx = await calculator.subtract(4, 2);

		expect(addTx.toNumber()).toBe(2);
	});

	it('multiply two given numbers', async () => {
		const addTx = await calculator.multiply(2, 5);

		expect(addTx.toNumber()).toBe(10);
	});

	it('divide two given numbers', async () => {
		const addTx = await calculator.divide(8, 2);

		expect(addTx.toNumber()).toBe(4);
	});

	it('calculates the factorial of a given number', async () => {
		const addTx = await calculator.factorial(5);

		expect(addTx.toNumber()).toBe(120);
	});

	it('sets value by owner on chain', async () => {
		const [owner, otherAddress] = await ethers.getSigners();
		const setValueTx = await calculator.connect(owner).setValueByOwner(23);
		await setValueTx.wait(); // wait until the transaction is mined
		const ownerValueTx = await calculator.getStoredValue();
		const otherValueTx = await calculator.connect(otherAddress).getStoredValue();

		expect(ownerValueTx.toNumber()).toBe(23);
		expect(otherValueTx.toNumber()).toBe(0);
	});

	it('adds a given value to the stored value', async () => {
		await calculator.setValueByOwner(22);
		const valueStoredTx = await calculator.addStoredValue(5);
		expect(valueStoredTx.toNumber()).toBe(27);
	});
});
