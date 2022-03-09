import { from, map, mergeMap } from "rxjs";
import { Greeter } from "../../typechain-types";
import { ContractConfig, NetworkService } from "../services/networkService";
import { WalletService } from "../services/walletService";

export class GreeterWrapper {
	contract: Greeter;
	constructor(
		private walletService:WalletService,
		private networkService:NetworkService,
		private contractConfig:ContractConfig)
	{
		this.contract = networkService.connectContract(contractConfig);
	}

	greet(){
		return from(this.walletService.connectToMetamask()).pipe(
			mergeMap(_=> from(this.contract.greet()))
		)
	}

	setGreetings(text:string){
		return from(this.walletService.connectToMetamask()).pipe(
			mergeMap(_ => from(this.contract.setGreeting(text))),
			mergeMap(tx => from(tx.wait()))
		)
	}
}