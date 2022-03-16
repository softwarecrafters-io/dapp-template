import { EIP1193Provider, WalletService } from './services/walletService';
import { ContractConfig, ContractConnector } from './services/contractConnector';
import { GreeterWrapper } from './contract-interactors/greeterService';
import GreeterMetadata from '../artifacts/contracts/Greeter.sol/Greeter.json';
import BasicTokenMetadata from '../artifacts/contracts/BasicToken.sol/BasicToken.json';
import KryptoApezMetadata from '../artifacts/contracts/KryptoApez.sol/KryptoApez.json';
import KittyFactoryMetadata from '../artifacts/contracts/kryptoKitties/KittyFactory.sol/KittyFactory.json';
import { BasicTokenWrapper } from './contract-interactors/BasicTokenWrapper';
import { KryptoApezInteractor } from './contract-interactors/KryptoApezInteractor';
import { KittyFactoryInteractor } from './contract-interactors/KittyFactoryInteractor';
import { ethers } from 'ethers';
import { Maybe } from 'monet';
import { NetworkService } from './services/NetworkService';

export class Factory {
	static readonly greeterAddress = '0xE39D73Bc223fA0A306D365f4402BB243A15a3D4e';
	static readonly basicTokenAddress = '0x0a54A68EdF7bf87CB7D2E9fA7Bf2792bb2Bc5934';
	static readonly kryptoAppezAddress = '0xF8Fbb0ADe680f2a913284a7465c277f5c7982Ba6';
	static readonly kittyFactory = '0xC08780280F6122cF5bBf414eB7eEFc0db057f0BD';
	static readonly validChainId = '0x539';
	static readonly nodeUrl = 'http://127.0.0.1:7545';

	private static walletService: WalletService;
	private static networkService: NetworkService;
	private static contractConnector: ContractConnector;
	private static greeterWrapper: GreeterWrapper;
	private static basicTokenWrapper: BasicTokenWrapper;
	private static kryptoApezWrapper: KryptoApezInteractor;
	private static kittyFactoryInteractor: KittyFactoryInteractor;
	private static maybeBrowserProvider: Maybe<EIP1193Provider>;

	static setBrowserProvider(browserProvider: EIP1193Provider) {
		this.maybeBrowserProvider = Maybe.fromNull(browserProvider);
		console.log('maybeprovider', this.maybeBrowserProvider.isSome());
	}

	static getWalletService() {
		if (this.walletService == null) {
			this.walletService = new WalletService(
				this.maybeBrowserProvider,
				this.validChainId,
				this.getNetworkService()
			);
		}
		return this.walletService;
	}

	static getContractConnector() {
		if (this.contractConnector == null) {
			const jsonRpcProvider = this.maybeBrowserProvider.cata(
				() => new ethers.providers.JsonRpcProvider(this.nodeUrl),
				provider => new ethers.providers.Web3Provider(provider)
			);
			this.contractConnector = ContractConnector.create(jsonRpcProvider);
		}
		return this.contractConnector;
	}

	static getNetworkService() {
		if (this.networkService == null) {
			const jsonRpcProvider = this.maybeBrowserProvider.cata(
				() => new ethers.providers.JsonRpcProvider(this.nodeUrl),
				provider => new ethers.providers.Web3Provider(provider)
			);
			this.networkService = new NetworkService(jsonRpcProvider);
		}
		return this.networkService;
	}

	static getGreeterService() {
		if (this.greeterWrapper == null) {
			const configContract = ContractConfig.create(this.greeterAddress, GreeterMetadata);
			this.greeterWrapper = new GreeterWrapper(
				this.getWalletService(),
				this.getContractConnector(),
				configContract
			);
		}
		return this.greeterWrapper;
	}

	static getBasicTokenWrapper() {
		if (this.basicTokenWrapper == null) {
			const configContract = ContractConfig.create(this.basicTokenAddress, BasicTokenMetadata);
			this.basicTokenWrapper = new BasicTokenWrapper(
				this.getWalletService(),
				this.getContractConnector(),
				configContract
			);
		}
		return this.basicTokenWrapper;
	}

	static getKryptoApezInteractor() {
		if (this.kryptoApezWrapper == null) {
			const configContract = ContractConfig.create(this.kryptoAppezAddress, KryptoApezMetadata);
			this.kryptoApezWrapper = new KryptoApezInteractor(
				this.getWalletService(),
				this.getContractConnector(),
				configContract
			);
		}
		return this.kryptoApezWrapper;
	}

	static getKittyFactoryInteractor() {
		if (this.kittyFactoryInteractor == null) {
			const configContract = ContractConfig.create(this.kittyFactory, KittyFactoryMetadata);
			this.kittyFactoryInteractor = new KittyFactoryInteractor(this.getContractConnector(), configContract);
		}
		return this.kittyFactoryInteractor;
	}
}
