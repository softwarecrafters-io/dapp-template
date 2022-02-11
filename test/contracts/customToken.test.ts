import { ethers } from 'hardhat';
import { CustomERC20 } from '../../typechain-types';
const { expect } = require("chai");

describe('The custom token contract', () => {
	let token: CustomERC20;

	beforeEach(async ()=>{
		const tokenContract = await ethers.getContractFactory('CustomERC20');
		token = (await tokenContract.deploy('my token', 'mt', 21000000)) as CustomERC20;
	})

	it('gets name', async ()=>{
		const name = (await token.name());
		expect(name).to.equal('my token')
	})

	it('gets symbol', async ()=>{
		const symbol = (await token.symbol());
		expect(symbol).to.equal('mt')
	})

	it('gets decimals', async ()=>{
		const decimals = (await token.decimals());
		expect(decimals).to.equal(18)
	})

	it('gets total supply which is the same as the initial amount', async ()=>{
		const totalSupply = ethers.utils.formatEther(await token.totalSupply());

		expect(totalSupply).to.equal("21000000.0")
	})

	it("assigns the total supply of tokens to the owner", async function () {
		const [owner] = await ethers.getSigners();

		const ownerBalance = await token.balanceOf(owner.address);
		expect(await token.totalSupply()).to.equal(ownerBalance);
	});

	it('transfers amount from owner to destination account', async () => {
		const [owner] = await ethers.getSigners();
		const destinationAccount = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
		await token.transfer(destinationAccount, 1000);

		expect(await token.balanceOf(destinationAccount)).to.equal(1000);
		const ownerBalance = await token.balanceOf(owner.address);
		expect(ownerBalance).to.equal((await token.totalSupply()).sub(1000));
	});

	it('does not tranfer from owner when the amount of the account is exceeded', async () => {
		const exceededAmount = (await token.totalSupply()).add(1);
		const destinationAccount = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

		await expect(token.transfer(destinationAccount, exceededAmount)).to.be.revertedWith('ERC20: transfer amount exceeds balance');
	});

	it('emits an event when tranfer is completed', async () => {
		const [owner] = await ethers.getSigners();
		const destinationAccount = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

		await expect(token.transfer(destinationAccount, 7))
			.to.emit(token, 'Transfer')
			.withArgs(owner.address, destinationAccount, 7);
	});

	it('approves an allowance of tokens to a given address', async () => {
		const [owner] = await ethers.getSigners();
		const spenderAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
		const value = 1000;

		await expect( token.approve(spenderAddress, value)).to.be.not.reverted;
	});

	it('emits an event when allowance is approved', async () => {
		const [owner] = await ethers.getSigners();
		const spenderAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
		const value = 1000;

		await expect(token.approve(spenderAddress, value))
			.to.emit(token, 'Approve')
			.withArgs(owner.address, spenderAddress, value);
	});

	it('gets the allowance for a given address', async ()=>{
		const [owner] = await ethers.getSigners();
		const spenderAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
		const value = 1000;
		await token.approve(spenderAddress, value);

		await expect(await token.allowance(owner.address, spenderAddress)).to.equal(1000);
	});

	it('transfers funds from one address that has allowance to another', async ()=>{
		const [owner, spender, receiver] = await ethers.getSigners();
		const allowedValue = 1000;
		await token.approve(spender.address, allowedValue);

		await expect(await token.connect(spender).transferFrom(owner.address, receiver.address, 600));

		await expect(await token.allowance(owner.address, spender.address)).to.equal(400);
		await expect(await token.balanceOf(receiver.address)).to.equal(600);
	})
});