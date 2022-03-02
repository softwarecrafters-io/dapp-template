import { ethers } from 'hardhat';

async function main() {
	const CustomNFT = await ethers.getContractFactory('KryptoApe');
	const token = await CustomNFT.deploy();

	await token.deployed();

	console.log('KryptoApe deployed to:', token.address);
}

main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
