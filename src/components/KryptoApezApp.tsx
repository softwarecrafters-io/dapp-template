import * as React from "react";
import * as ReactDOM from "react-dom";
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { KryptoApez } from '../../typechain-types';
import Web3 from "web3";
import { Factory } from "../Factory";
import { useEffect } from "react";

export const KryptoApezApp = ()=> {
	const ethereumService = Factory.getMetamaskService();

	const onLogin = async () => {
		await ethereumService.connectToMetamask();
		console.log(ethereumService.getAccounts());
	}

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

const MetamaskComponent = () => {
	const metamaskService = Factory.getMetamaskService();
	const [accounts, setAccounts] = React.useState(metamaskService.getAccounts());

	useEffect(() => {
		metamaskService.getAccountBus().subscribe(setAccounts);
	});
	const onLogin = () => {
		metamaskService.connectToMetamask().subscribe();
	}
	const mustDisplayLogin = metamaskService.hasMetamask() && !metamaskService.isConnected()
	if(mustDisplayLogin){
		return <button onClick={onLogin}>Connect Metamask</button>
	}
	if(metamaskService.isConnected()){
		return <span>{accounts[0]}</span>
	}
	return <span>Metamask not detected!</span>
}