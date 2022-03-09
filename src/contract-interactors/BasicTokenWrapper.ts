import { BigNumber } from "ethers";
import { from, map, mergeMap, tap } from "rxjs";
import { BasicToken } from "../../typechain-types";
import { ContractConfig, NetworkService } from "../services/networkService";
import { WalletService } from "../services/walletService";

export class BasicTokenWrapper {
	contract: BasicToken;
	constructor(
		private walletService:WalletService,
		private networkService:NetworkService,
		private contractConfig:ContractConfig)
	{
		this.contract = networkService.connectContract(contractConfig);
	}

	balanceOf(accountAddress:string){
		return from(this.walletService.connectToMetamask()).pipe(
			mergeMap(_ => this.decimals()),
			map(this.calculateMultiplier),
			mergeMap(divisor => from(this.contract.balanceOf(accountAddress))
				.pipe(map(balance => balance.div(divisor))))
		)
	}

	decimals(){
		return from(this.walletService.connectToMetamask()).pipe(
			mergeMap(_=> from(this.contract.decimals())),
			tap(value => console.log('decimals', value))
		)
	}

	transfer(to:string, ammount:BigNumber){
		return from(this.walletService.connectToMetamask()).pipe(
			mergeMap(_ => this.decimals()),
			map(this.calculateMultiplier),
			mergeMap(multiplier => from(this.contract.transfer(to, ammount.mul(multiplier)))),
			mergeMap(tx => from(tx.wait()))
		)
	}

	private calculateMultiplier = (decimals:number) => {
		return BigNumber.from(10).pow(decimals)
	}
}