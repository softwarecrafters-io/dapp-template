import { EthereumProvider } from "hardhat/types";
import { from, map, of, Subject, tap } from "rxjs";

export class MetamaskService {
	private accounts:string[] = [];
	private accountsBus: Subject<string[]> = new Subject();

	constructor(private metamask?:EthereumProvider) {
		if(this.metamask){
			this.metamask.on('chainChanged', this.handleChainChanged);
			this.metamask.on('accountsChanged', this.handleAccounts);
			this.metamask.on('disconnect', this.handleDisconnect);
			this.metamask.on('connect', this.handleConnect);
		}
	}

	hasMetamask() {
		return this.metamask != null ? true : false;
	}

	isConnected(){
		return this.accounts.length > 0;
	}

	getAccounts() {
		return this.accounts;
	}

	getAccountBus(){
		return this.accountsBus;
	}

	requestAccounts(){
		const request = this.createRequest('eth_accounts')
		return request.pipe(
			map(value => value as string[]),
			tap(value => this.handleAccounts(value))
		);
	}

	connectToMetamask() {
		const request = this.createRequest('eth_requestAccounts')
		return request.pipe(
			map(value => value as string[]),
			tap(value => this.handleAccounts(value))
		);
	}

	private createRequest(method: 'eth_requestAccounts' | 'eth_accounts' ){
		return this.metamask ? from(this.metamask.request({ method })) : of([]);
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