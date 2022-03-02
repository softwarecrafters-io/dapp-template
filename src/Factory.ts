import { MetamaskService } from "./services/metamaskService";
import { EthereumProvider } from "hardhat/types";

export class Factory{
	private static metamaskService: MetamaskService;
	private static provider: EthereumProvider;

	static setProvider(provider:EthereumProvider){
		this.provider = provider;
	}

	static getMetamaskService(){
		if(this.metamaskService == null){
			this.metamaskService = new MetamaskService(this.provider);
		}
		return this.metamaskService;
	}
}

