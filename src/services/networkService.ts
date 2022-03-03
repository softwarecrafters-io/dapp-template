import { BaseContract, ethers } from "ethers";
import { EthereumProvider } from "hardhat/types";

export class ContractConfig{
	private constructor(readonly address:string, readonly contractMetadata:{abi:any}) {
	}

	static create(address:string, contractMetadata:{abi:any}){
		return new ContractConfig(address, contractMetadata);
	}
}

export class NetworkService{
	private provider:ethers.providers.Web3Provider;

	private constructor(private wallet:EthereumProvider) {
			this.provider = new ethers.providers.Web3Provider(wallet as any);
	}

	static create(wallet?:EthereumProvider){
		if(wallet == null){
			throw new Error('Wallet is not provided')
		}
		return new NetworkService(wallet);
	}
	
	connectContract<T extends BaseContract>(config:ContractConfig) : T{
		const contract = new ethers.Contract(config.address, config.contractMetadata.abi, this.provider.getSigner()) as T;
		return contract;
	}
}