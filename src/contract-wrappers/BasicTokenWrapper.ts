import { from, mergeMap } from "rxjs";
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
		console.log('balanceOf', accountAddress, this.walletService.isConnected())
		return from(this.walletService.connectToMetamask()).pipe(
			mergeMap(_=> from(this.contract.balanceOf(accountAddress)))
		)
	}

	transfer(to:string, ammount:number){
		return from(this.walletService.connectToMetamask()).pipe(
			mergeMap(_ => from(this.contract.transfer(to, ammount))),
			mergeMap(tx => from(tx.wait()))
		)
	}
}