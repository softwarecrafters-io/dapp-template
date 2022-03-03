import { EthereumProvider } from "hardhat/types";
import { from, map, of, Subject, tap } from "rxjs";

export class WalletService {
	private accounts:string[] = [];
	private accountsBus: Subject<string[]> = new Subject();

	constructor(private wallet?:EthereumProvider) {
		if(this.wallet){
			this.wallet.on('chainChanged', this.handleChainChanged);
			this.wallet.on('accountsChanged', this.handleAccounts);
			this.wallet.on('disconnect', this.handleDisconnect);
			this.wallet.on('connect', this.handleConnect);
		}
	}

	hasWallet() {
		return this.wallet != null ? true : false;
	}

	isConnected(){
		return this.accounts.length > 0;
	}

	getAccounts = () => {
		return this.accounts;
	}

	getAccountBus(){
		return this.accountsBus;
	}

	getWallet(){
		return this.wallet;
	}

	requestAccounts(){
		const request = this.createRequest('eth_accounts')
		return request.pipe(
			map(value => value as string[]),
			tap(console.log),
			tap(value => this.handleAccounts(value))
		);
	}

	connectToMetamask() {
		console.log('connect to metamask', 'is connected: ', this.isConnected())
		const request = this.isConnected() ? of(this.getAccounts()) : this.createRequest('eth_requestAccounts');
		//const request = this.createRequest('eth_requestAccounts');
		return request.pipe(
			map(value => value as string[]),
			tap(value => this.handleAccounts(value))
		);
	}

	private createRequest(method: 'eth_requestAccounts' | 'eth_accounts' ){
		return this.wallet ? from(this.wallet.request({ method })) : of([]);
	}

	private handleAccounts = (accounts:string[]) =>{
		this.notify(accounts);
	}

	private handleChainChanged = () => {
		this.notify([]);
	}

	private handleDisconnect = () => {
		this.notify([]);
	}

	private handleConnect(event:any) {
		console.log('handleConnect',event);
	}

	private notify(accounts:string[]){
		this.accounts = accounts;
		this.accountsBus.next(this.accounts);
	}
}