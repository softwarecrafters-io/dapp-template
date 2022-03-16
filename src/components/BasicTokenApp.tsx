import { BigNumber } from 'ethers';
import * as React from 'react';
import { useState } from 'react';
import { zip } from 'rxjs';
import { Factory } from '../Factory';

export const BasicTokenApp = () => {
	const walletService = Factory.getWalletService();
	const contract = Factory.getBasicTokenWrapper();

	const [balance, setBalance] = useState(BigNumber.from(0));
	const [account, setAccount] = useState('');
	const [amount, setAmount] = useState(BigNumber.from(0));
	const [to, setTo] = useState('');
	const [addresses, setAddresses] = useState('');
	const myAccount = walletService.getAccount() as string;

	const getBalance = (account: string) => {
		if (walletService.hasWallet()) {
			contract.balanceOf(account).subscribe(balance => setBalance(balance));
		}
	};

	const transfer = (to: string, ammount: BigNumber) => {
		if (walletService.hasWallet()) {
			contract.transfer(to, ammount).subscribe(console.log);
		}
	};

	return (
		<div className={'app'}>
			<div className={'header'}>
				<span>Basic Token App</span>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					margin: '0 1.5em 0 1.5em',
					width: '400px',
				}}
			>
				<h1>Token Management</h1>
				<h2>Balance: {balance.toString()}</h2>
				<div style={{ display: 'flex', margin: '0 0 10px 0' }}>
					<input type="text" placeholder={'account'} onChange={e => setAccount(e.target.value)} />
					<button onClick={() => getBalance(myAccount)}>My Balance</button>
					<br />
					<button onClick={() => getBalance(account)}>Balance</button>
				</div>
				<div style={{ display: 'flex', margin: '0 0 10px 0' }}>
					<input type="text" placeholder={'to'} onChange={e => setTo(e.target.value)} />
					<input
						type="number"
						placeholder={'amount'}
						onChange={e => setAmount(BigNumber.from(e.target.value))}
					/>
					<button onClick={() => transfer(to, amount)}>Transfer</button>
				</div>
			</div>
		</div>
	);
};
