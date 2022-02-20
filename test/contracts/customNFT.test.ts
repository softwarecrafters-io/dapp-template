import { ethers } from 'hardhat';
import { CustomNFT } from '../../typechain-types';
const { expect } = require("chai");


describe('The Basic NFT Contract', () => {
	let nft: CustomNFT;

	beforeEach(async () => {
		const nftContract = await ethers.getContractFactory('CustomNFT');
		nft = (await nftContract.deploy('my nft', 'mn')) as CustomNFT;
		await nft.deployed();
	});

	it('has a name', async ()=>{
		const name = (await nft.name());
		expect(name).to.equal('my nft')
	});

	it('has a symbol', async ()=>{
		const symbol = (await nft.symbol());
		expect(symbol).to.equal('mn')
	});

	it("increases balance when a nft is minted", async function () {
		const [owner] = await ethers.getSigners();
		await nft.mint(owner.address, '1');
		await nft.mint(owner.address, '2');

		expect(await nft.balanceOf(owner.address)).to.equal(2);
	});

	it("assigns the owner when a nft is minted", async function () {
		const [owner] = await ethers.getSigners();
		await nft.mint(owner.address, '1');

		expect(await nft.ownerOf('1')).to.equal(owner.address);
	});

	it('does not allow to mint when token exists', async ()=>{
		const [owner] = await ethers.getSigners();
		await nft.mint(owner.address, '1');

		await expect(nft.mint(owner.address, '1'))
			.to.be.revertedWith("ERC721: token already minted");
	})

	it("approves token to another account", async function () {
		const [owner, another] = await ethers.getSigners();
		await nft.mint(owner.address, '1');
		await nft.approve(another.address, '1');

		expect(await nft.getApproved('1')).to.equal(another.address);
	});

	it("does not approve for nonexistent token", async function () {
		const [owner, another] = await ethers.getSigners();
		await expect(nft.approve(another.address, '1'))
			.to.be.revertedWith("ERC721: approved query for nonexistent token");
	});

	it("does not get Approved for nonexistent token", async function () {
		await expect(nft.getApproved('1'))
			.to.be.revertedWith("ERC721: approved query for nonexistent token");
	});

	it("transfer from token to another account", async function () {
		const [owner, another] = await ethers.getSigners();
		await nft.mint(owner.address, '1');

		await nft.transferFrom(owner.address, another.address, '1');

		expect(await nft.ownerOf('1')).to.equal(another.address);
	});
});