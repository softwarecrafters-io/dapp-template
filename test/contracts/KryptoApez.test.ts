import { ethers } from 'hardhat';
import { KryptoApez } from '../../typechain-types';
const { expect } = require("chai");


describe('The Krypto Apez NFT Contract', () => {
	let nft: KryptoApez;

	beforeEach(async () => {
		const nftContract = await ethers.getContractFactory('KryptoApez');
		nft = (await nftContract.deploy()) as KryptoApez;
		await nft.deployed();
	});

	it('has a name', async ()=>{
		const name = (await nft.name());
		expect(name).to.equal('Krypto APE')
	});

	it('has a symbol', async ()=>{
		const symbol = (await nft.symbol());
		expect(symbol).to.equal('KAPE')
	});

	it("counts all NFTs assigned to an owner", async function () {
		const [owner] = await ethers.getSigners();
		await nft.mint('https://1');
		await nft.mint('https://2');

		expect(await nft.balanceOf(owner.address)).to.equal(2);
	});

	it("get all minted NFTs", async function () {
		const [owner] = await ethers.getSigners();
		//await nft.mint('https://1');
		//await nft.mint('https://2');

		expect(await nft.getKryptoApez()).to.equal([]);
	});

	it("finds the owner of an NFT", async function () {
		const [owner] = await ethers.getSigners();
		await nft.mint('https://1');

		expect(await nft.ownerOf('0')).to.equal(owner.address);
	});

	it("does not allow to mint two NFTs with the same url", async function () {
		const [owner] = await ethers.getSigners();
		await nft.mint('https://1');

		await expect(nft.mint('https://1')).to.be.revertedWith("Error - Krypto Ape already exists");
	});

	it("approves token to another account", async function () {
		const [owner, another] = await ethers.getSigners();
		await nft.mint('1');
		const ownerDebbug = await nft.ownerOf(0);
		await nft.approve(another.address, 0);

		const approvedAddress = await nft.getApproved(0);

		expect(approvedAddress).to.equal(another.address);
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
		await nft.mint('1');

		await nft.transferFrom(owner.address, another.address, '1');

		expect(await nft.ownerOf('1')).to.equal(another.address);
	});

	describe('ERC721 Enumerable', ()=>{
		it("counts of valid NFTs tracked by this contract", async function () {
			const [owner, another] = await ethers.getSigners();
			await nft.mint('https://1');
			await nft.mint('https://2');
			await nft.connect(another).mint('https://3');

			expect(await nft.totalSupply()).to.equal(3);
		});

		it("gets the token identifier for a given index", async function () {
			const [owner, another] = await ethers.getSigners();
			await nft.mint('https://1');
			await nft.mint('https://2');
			await nft.mint('https://3');

			expect(await nft.tokenByIndex(1)).to.equal('1');
		});

		it("reverts the transaction when given index to get the token identifier is out of bound", async function () {
			const [owner, another] = await ethers.getSigners();
			await nft.mint('https://1');
			await nft.mint('https://2');
			await nft.mint('https://3');

			await expect(nft.tokenByIndex(10)).to.be.revertedWith("ERC721Enumerable: global index out of bounds");
		});


		it("gets the token identifier for a given owner index", async function () {
			const [owner, another] = await ethers.getSigners();
			await nft.mint('https://1');
			await nft.mint('https://2');
			await nft.connect(another).mint('https://3');

			expect(await nft.tokenOfOwnerByIndex(another.address, 0)).to.equal('0');
		});
	})
});