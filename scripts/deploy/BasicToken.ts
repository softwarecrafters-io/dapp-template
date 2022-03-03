import { ethers } from 'hardhat';

async function main() {
	const BasicToken = await ethers.getContractFactory('BasicToken');
	const token = await BasicToken.deploy();

	await token.deployed();

	console.log('Basic token deployed to:', token.address);
}

main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
