import { CrowFunding } from "../../typechain-types";
import { ethers } from 'hardhat';
const { expect } = require("chai");

describe('The Crowfunding Contract', () => {
	let crowFunding: CrowFunding;

	beforeEach(async () => {
		const crowFundingContract = await ethers.getContractFactory('CrowFunding');
		crowFunding = (await crowFundingContract.deploy()) as CrowFunding;
		await crowFunding.deployed();
	});

	it('accepts donation to campaign', async ()=>{
		const [owner, account1] = await ethers.getSigners();

		await crowFunding.connect(account1).donate({value:1000});

		expect(await crowFunding.raised()).to.equal(1000);
	});

	it('ensure donator balance keep on track', async ()=>{
		const [owner, account1, account2] = await ethers.getSigners();

		await crowFunding.connect(account1).donate({value:1000});
		await crowFunding.connect(account2).donate({value:2000});

		expect(await crowFunding.raised()).to.equal(3000);
		expect(await crowFunding.balances(account1.address)).to.equal(1000);
		expect(await crowFunding.balances(account2.address)).to.equal(2000);
	});
})

type Dependency = any;

class SubjectUnderTest {
	private dependency:Dependency;

	constructor(dependency:Dependency){
		this.dependency = dependency; // dependency injection
	}
 }
