import * as React from "react";
import { useState } from "react";
import { Factory } from "../Factory";

export const BasicTokenApp = ()=> {
	const walletService = Factory.getWalletService();
	const [greeting, setGreetingValue] = useState('');

	const getBalance = () => {
		if (walletService.hasWallet()) {
			const contract = Factory.getBasicTokenWrapper();
			const account = walletService.getAccounts()[0];
			const balance = contract.balanceOf(account)
				.subscribe(balance => console.log("Balance: ", balance.toString()));
		}
	}

	return <div className={'app'}>
		<div className={'header'}>
			<span>Basic Token App</span>
		</div>
		<div className={'content'}>
			<h1>Hello!</h1>
			<button onClick={getBalance}>Balance</button>
		</div>
	</div>
}