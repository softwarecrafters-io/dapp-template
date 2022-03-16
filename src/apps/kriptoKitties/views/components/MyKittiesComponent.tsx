import * as React from 'react';
import { CatComponent } from './CatComponent';
import { DNA } from './KittiesFactoryComponent';
import { Factory } from '../../../../Factory';
import { useEffect, useRef, useState } from 'react';
import { mergeMap, of } from 'rxjs';
import { navigationService } from '../../../../services/NavigationService';
import { Routes } from '../../Routes';

export const MyKittiesComponent = () => {
	const { navigate } = navigationService();
	return (
		<div>
			<div className={'container'}>
				<h1>Krypto CSS Kitties - My Kitties</h1>
				<h3>These are your custom Kitties</h3>
			</div>
			<button onClick={() => navigate(Routes.breading)}>Breed</button>
			<MyKittiesListComponent />
		</div>
	);
};

export const MyKittiesListComponent = () => {
	const [dnas, updateDnas] = useState([] as DNA[]);
	const walletService = Factory.getWalletService();

	useEffect(() => {
		const account = walletService.getAccount();
		const kittyFactoryInteractor = Factory.getKittyFactoryInteractor();
		const canMakeRequest = walletService.isValidNetwork() && walletService.isConnected();
		if (canMakeRequest) {
			kittyFactoryInteractor.getValidDNAByOwner(account).subscribe(updateDnas);
		}
		walletService
			.getAccountBus()
			.pipe(
				mergeMap(account =>
					walletService.isValidNetwork() ? kittyFactoryInteractor.getValidDNAByOwner(account) : of([])
				)
			)
			.subscribe(updateDnas);
	}, []);

	const isNotValidNetwork = dnas.length === 0 && !walletService.isValidNetwork();
	if (isNotValidNetwork) {
		console.log('Network is not valid');
	}

	const fromDNAToCat = () =>
		dnas.map((dna, i) => (
			<div className={'cat-box'} key={i}>
				<CatComponent key={i} dna={dna} />
				<div className={'dna'}>
					<span>{dna}</span>
				</div>
			</div>
		));

	return <div className={'my-kitties-container'}>{fromDNAToCat()}</div>;
};
