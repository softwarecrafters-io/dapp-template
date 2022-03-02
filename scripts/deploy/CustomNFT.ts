import { ethers } from 'hardhat';

async function main() {
	const CustomNFT = await ethers.getContractFactory('CustomNFT');
	const token = await CustomNFT.deploy('Bored Ape', 'APE');

	await token.deployed();

	console.log('Custom NFT deployed to:', token.address);
}

main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
