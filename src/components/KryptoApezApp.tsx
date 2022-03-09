import * as React from "react";
import * as ReactDOM from "react-dom";
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { KryptoApez } from '../../typechain-types';
import { Factory } from "../Factory";
import { useEffect, useState } from "react";
import { WalletService } from "../services/walletService";
import { KryptoApezInteractor } from "../contract-interactors/KryptoApezInteractor";



export const KryptoApezApp = ()=> {
	const kryptoApezInteractor = Factory.getKryptoApezWrapper();
	const [nfts, setNfts] = useState([]);
	const [url, setUrl] = useState('');
	const totalSupply = () =>{
		kryptoApezInteractor.totalSupply().subscribe(value => console.log(value.toString()))
	}

	const getAllNfts = () => {
		kryptoApezInteractor.getAllNfts().subscribe(nfts => setNfts(nfts as any))
	}

	const mint = () => {
		kryptoApezInteractor.mint(url).subscribe(console.log)
	}

	useEffect(getAllNfts);

	return <div className={'app'}>
		<div className={'header-nav'}>
			<span>Krypto Apez - NFT Marketplace</span>
			<MetamaskComponent/>
		</div>
		<div className={'content'}>
			<div className="bg-white">
				<div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
					<div className="text-center">
						<h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">NFT Gallery</h2>
						<p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
							Krypto Apez
						</p>
						<p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
						</p>
						<button onClick={totalSupply}
										className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>Total Supply</button>
						<button onClick={getAllNfts}
										className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

						>All NFTS</button>
						<br/>
						<div style={{display: "flex", justifyContent:'center', margin: '10px'}}>
						<div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
							<label
								htmlFor="name"
								className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
							>
								NFT Url
							</label>
							<input
								type="text"
								name="name"
								id="name"
								className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
								placeholder=""
								onChange={e => setUrl(e.target.value)}
							/>
						</div>
						<button onClick={mint}
										className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							Mint
						</button>
						</div>
					</div>
				</div>
			</div>

			<Divider/>
			<Gallery nfts={nfts}/>
		</div>
	</div>
}

const KryptoApezHook = (kryptoApezWrapper:KryptoApezInteractor) => {
	kryptoApezWrapper.totalSupply().subscribe()
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



export default function Gallery(props:{nfts:string[]}) {
	return (
		<div>
			<div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
				<h2 className="sr-only">Products</h2>

				<div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
					{props.nfts.map((url, id) => (
						<span key={id}  className="group">
							<div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
								<img
									src={url}
									className="w-full h-full object-center object-cover group-hover:opacity-75"
								/>
							</div>
							<h3 className="mt-4 text-sm text-gray-700"></h3>
							<p className="mt-1 text-lg font-medium text-gray-900"></p>
						</span>
					))}
				</div>
			</div>
		</div>
	)
}

export function Divider() {
	return (
		<div className="relative">
			<div className="absolute inset-0 flex items-center" aria-hidden="true">
				<div className="w-full border-t border-gray-300" />
			</div>
			<div className="relative flex justify-center">
				<span className="px-2 bg-white text-sm text-gray-500">Gallery</span>
			</div>
		</div>
	)
}

