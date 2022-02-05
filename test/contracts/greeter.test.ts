import { ethers } from 'hardhat';

describe('The Greeter', function () {
	it("generates a new greeting once it's changed", async function () {
		const Greeter = await ethers.getContractFactory('Greeter');
		const greeter = await Greeter.deploy('Hello, world!');
		await greeter.deployed();

		expect(await greeter.greet()).toBe('Hello, world!');

		const setGreetingTx = await greeter.setGreeting('Hola, mundo!');

		// wait until the transaction is mined
		await setGreetingTx.wait();

		expect(await greeter.greet()).toBe('Hola, mundo!');
	});
});
