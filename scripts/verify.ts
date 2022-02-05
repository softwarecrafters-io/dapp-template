import { ethers } from 'hardhat';

async function main() {
	const contractAddress = '0xCFb2f639c842d9F3497455CB0Df0EbB41BB4626f';
	const GreeterContract = await ethers.getContractAt('Greeter', contractAddress);
	const setGreetingTx = await GreeterContract.setGreeting('Hi Software Crafter!!');
	await setGreetingTx.wait(1); //wait until mine
	console.log('verify: ', await GreeterContract.greet());
}

main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
