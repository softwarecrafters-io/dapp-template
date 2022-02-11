import { ethers } from 'hardhat';
import { BasicToken } from '../../typechain-types';
const { expect } = require("chai");

describe('The Basic Token Contract', () => {
	let token: BasicToken;

	beforeEach(async () => {
		const tokenContract = await ethers.getContractFactory('BasicToken');
		token = (await tokenContract.deploy()) as BasicToken;
		await token.deployed();
	});

	it("gets total supply", async ()=>{
		expect(ethers.utils.formatEther(await token.totalSupply())).to.equal("21000000.0");
	})

	it("assigns the total supply of tokens to the owner", async function () {
		const [owner] = await ethers.getSigners();

		const ownerBalance = await token.balanceOf(owner.address);
		expect(await token.totalSupply()).to.equal(ownerBalance);
	});

	it('Transfers amount to destination account', async () => {
		const [owner] = await ethers.getSigners();
		const destinationAccount = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
		await token.transfer(destinationAccount, 7);
		expect(await token.balanceOf(destinationAccount)).to.equal(7);
		const ownerBalance = await token.balanceOf(owner.address);
		expect(await token.totalSupply()).to.equal(ownerBalance.add(7));
	});

	it('Transfer emits event', async () => {
		const [owner] = await ethers.getSigners();
		const destinationAccount = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

		await expect(token.transfer(destinationAccount, 7))
			.to.emit(token, 'Transfer')
			.withArgs(owner.address, destinationAccount, 7);
	});

	it('Can not transfer above the amount', async () => {
		const destinationAccount = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
		await expect(token.transfer(destinationAccount, 22000000)).to.be.reverted;
	});

	it('Can not transfer from empty account', async () => {
		const [owner, anotherAccount] = await ethers.getSigners();
		const tokenFromOtherWallet = token.connect(anotherAccount);
		await expect(tokenFromOtherWallet.transfer(anotherAccount.address, 1))
			.to.be.reverted;
	});
});