import { ethers } from 'hardhat';

async function main() {
	const tokenContract = await ethers.getContractFactory('CustomERC20');
	const token = await tokenContract.deploy('my token', 'mt', 1000000);

	await token.deployed();

	console.log('my token contract deployed to:', token.address);
}

main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
