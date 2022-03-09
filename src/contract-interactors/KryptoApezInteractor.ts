import { BigNumber } from "ethers";
import { from, map, mergeMap, tap } from "rxjs";
import {  KryptoApez } from "../../typechain-types";
import { ContractConfig, NetworkService } from "../services/networkService";
import { WalletService } from "../services/walletService";

export class KryptoApezInteractor {
	contract: KryptoApez;
	constructor(
		private walletService:WalletService,
		private networkService:NetworkService,
		private contractConfig:ContractConfig)
	{
		this.contract = networkService.connectContract(contractConfig);
	}

	getAllNfts(){
		return from(this.walletService.connectToMetamask()).pipe(
			mergeMap(_ => from(this.contract.getKryptoApez()))
		)
	}

	mint(tokenUrl:string){
		return from(this.walletService.connectToMetamask()).pipe(
			mergeMap(_ => from(this.contract.mint(tokenUrl))),
			mergeMap(tx => from(tx.wait()))
		)
	}

	totalSupply(){
		return from(this.walletService.connectToMetamask()).pipe(
			mergeMap(_ => from(this.contract.totalSupply()))
		)
	}

	balanceOf(accountAddress:string){
		return from(this.walletService.connectToMetamask()).pipe(
			mergeMap(divisor => from(this.contract.balanceOf(accountAddress)))
		)
	}

	transfer(addressFrom:string, addressTo:string, tokenId:BigNumber){
		return from(this.walletService.connectToMetamask()).pipe(
			mergeMap(multiplier => from(this.contract.transferFrom(addressFrom, addressTo, tokenId))),
			mergeMap(tx => from(tx.wait()))
		)
	}

	private calculateMultiplier = (decimals:number) => {
		return BigNumber.from(10).pow(decimals)
	}
}