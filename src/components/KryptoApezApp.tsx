import * as React from "react";
import * as ReactDOM from "react-dom";
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { KryptoApez } from '../../typechain-types';
import { Factory } from "../Factory";
import { useEffect } from "react";
import { WalletService } from "../services/walletService";

export const KryptoApezApp = ()=> {
	return <div className={'app'}>
		<div className={'header'}>
			<span>Krypto Apez - NFT Marketplace</span>
			<MetamaskComponent/>
		</div>
		<div className={'content'}>
			<h1>Content</h1>
		</div>
	</div>
}

const metamaskHook = (metamaskService: WalletService) => {
	const [accounts, setAccounts] = React.useState(metamaskService.getAccounts());
	useEffect(() => {
		metamaskService.getAccountBus().subscribe(setAccounts);
	});
	const onLogin = () => metamaskService.connectToMetamask().subscribe();
	const mustDisplayLogin = () => metamaskService.hasWallet() && !metamaskService.isConnected()
	const mustDisplayAccount = () => metamaskService.isConnected();
	return {
		accounts, onLogin, mustDisplayLogin, mustDisplayAccount
	}
}

const MetamaskComponent = () => {
	const { accounts, onLogin, mustDisplayLogin, mustDisplayAccount } = metamaskHook(Factory.getWalletService());

	if(mustDisplayLogin()){
		return <button onClick={onLogin}>Connect Metamask</button>
	}
	if(mustDisplayAccount()){
		return <span>{accounts[0]}</span>
	}
	return <span>Metamask not detected!</span>
}