import { from, map, mergeMap } from 'rxjs';
import { Greeter } from '../../typechain-types';
import { ContractConfig, ContractConnector } from '../services/contractConnector';
import { WalletService } from '../services/walletService';

export class GreeterWrapper {
	contract: Greeter;
	constructor(
		private walletService: WalletService,
		private networkService: ContractConnector,
		private contractConfig: ContractConfig
	) {
		this.contract = networkService.connect(contractConfig);
	}

	greet() {
		return from(this.walletService.connectToMetamask()).pipe(mergeMap(_ => from(this.contract.greet())));
	}

	setGreetings(text: string) {
		return from(this.walletService.connectToMetamask()).pipe(
			mergeMap(_ => from(this.contract.setGreeting(text))),
			mergeMap(tx => from(tx.wait()))
		);
	}
}
