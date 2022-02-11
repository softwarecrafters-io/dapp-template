import { ethers } from 'hardhat';

async function main() {
	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	// await hre.run('compile');

	// We get the contract to deploy
	const BasicToken = await ethers.getContractFactory('BasicToken');
	const token = await BasicToken.deploy();

	await token.deployed();

	console.log('Greeter deployed to:', token.address);
}

main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
