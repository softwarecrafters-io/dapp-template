import { WalletService } from "./services/walletService";
import { EthereumProvider } from "hardhat/types";
import { ContractConfig, NetworkService } from "./services/networkService";
import { GreeterWrapper } from "./contract-interactors/greeterService";
import GreeterMetadata from '../artifacts/contracts/Greeter.sol/Greeter.json'
import BasicTokenMetadata from '../artifacts/contracts/BasicToken.sol/BasicToken.json'
import KryptoApezMetadata from '../artifacts/contracts/KryptoApez.sol/KryptoApez.json'
import { BasicTokenWrapper } from "./contract-interactors/BasicTokenWrapper";
import { KryptoApezInteractor } from "./contract-interactors/KryptoApezInteractor";

const greeterAddress = "0xE39D73Bc223fA0A306D365f4402BB243A15a3D4e";
const basicTokenAddress = '0x0a54A68EdF7bf87CB7D2E9fA7Bf2792bb2Bc5934';
const kryptoAppezAddress = '0xF8Fbb0ADe680f2a913284a7465c277f5c7982Ba6';

export class Factory{
	private static walletService: WalletService;
	private static networkService: NetworkService;
	private static greeterWrapper: GreeterWrapper;
	private static basicTokenWrapper: BasicTokenWrapper;
	private static kryptoApezWrapper: KryptoApezInteractor;
	private static provider: EthereumProvider;

	static setProvider(provider:EthereumProvider){
		this.provider = provider;
	}

	static getWalletService(){
		if(this.walletService == null){
			this.walletService = new WalletService(this.provider);
		}
		return this.walletService;
	}

	static getNetworkService(){
		if(this.networkService == null){
			this.networkService = NetworkService.create(this.provider);
		}
		return this.networkService;
	}

	static getGreeterService(){
		if(this.greeterWrapper == null){
			const configContract = ContractConfig.create(greeterAddress, GreeterMetadata)
			this.greeterWrapper = new GreeterWrapper(this.getWalletService(), this.getNetworkService(), configContract);
		}
		return this.greeterWrapper;
	}

	static getBasicTokenWrapper(){
		if(this.basicTokenWrapper == null){
			const configContract = ContractConfig.create(basicTokenAddress, BasicTokenMetadata)
			this.basicTokenWrapper = new BasicTokenWrapper(this.getWalletService(), this.getNetworkService(), configContract);
		}
		return this.basicTokenWrapper;
	}

	static getKryptoApezWrapper(){
		if(this.kryptoApezWrapper == null){
			const configContract = ContractConfig.create(kryptoAppezAddress, KryptoApezMetadata)
			this.kryptoApezWrapper = new KryptoApezInteractor(this.getWalletService(), this.getNetworkService(), configContract);
		}
		return this.kryptoApezWrapper;
	}

}

