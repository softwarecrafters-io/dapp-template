import * as React from 'react';
import { useState } from 'react';
import { Factory } from '../Factory';

export const GreeterApp = () => {
	const walletService = Factory.getWalletService();
	const [greeting, setGreetingValue] = useState('');

	const fetchGreeting = () => {
		const walletService = Factory.getWalletService();
		if (walletService.hasWallet()) {
			const greeterService = Factory.getGreeterService();
			greeterService.greet().subscribe(console.log);
		}
	};

	const setGreeting = (greeting: string) => {
		if (walletService.hasWallet()) {
			const greeterService = Factory.getGreeterService();
			greeterService.setGreetings(greeting).subscribe(console.log);
		}
	};

	return (
		<div className={'app'}>
			<div className={'header'}>
				<span>Greeter App</span>
			</div>
			<div className={'content'}>
				<h1>Hello!</h1>
				<button onClick={fetchGreeting}>Fetch Greeting</button>
				<input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />
				<button onClick={() => setGreeting(greeting)}>Set Greeting</button>
			</div>
		</div>
	);
};
