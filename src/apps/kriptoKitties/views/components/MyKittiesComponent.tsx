import * as React from 'react';
import { CatAttributes, CatComponent } from './CatComponent';
import { DNA } from './KittiesFactoryComponent';
import { Factory } from '../../../../Factory';
import { useEffect, useRef, useState } from 'react';
import { mergeMap, of } from 'rxjs';
import { navigationService } from '../../../../services/NavigationService';
import { Routes } from '../../Routes';
import { Cat } from '../../../../contract-interactors/KittyFactoryInteractor';

export const MyKittiesComponent = () => {
	const { navigate } = navigationService();
	return (
		<div>
			<div className={'container'}>
				<h1>Krypto CSS Kitties - My Kitties</h1>
				<h3>These are your custom Kitties</h3>
				<button onClick={() => navigate(Routes.breading)}>Breed Kitties</button>
			</div>
			<MyKittiesListComponent />
		</div>
	);
};

export const MyKittiesListComponent = (props: { excludedId?: number; onChoose?: (cat: Cat) => void }) => {
	const [cats, updateCats] = useState([] as Cat[]);
	const walletService = Factory.getWalletService();

	useEffect(() => {
		const account = walletService.getAccount();
		const kittyFactoryInteractor = Factory.getKittyFactoryInteractor();
		const canMakeRequest = walletService.isValidNetwork() && walletService.isConnected();
		if (canMakeRequest) {
			kittyFactoryInteractor.getCatsWithValidDNAByOwner(account).subscribe(updateCats);
		}
		walletService
			.getAccountBus()
			.pipe(
				mergeMap(account =>
					walletService.isValidNetwork() ? kittyFactoryInteractor.getCatsWithValidDNAByOwner(account) : of([])
				)
			)
			.subscribe(updateCats);
	}, []);

	const isNotValidNetwork = cats.length === 0 && !walletService.isValidNetwork();
	if (isNotValidNetwork) {
		console.log('Network is not valid');
	}

	const fromCatToComponent = () =>
		cats
			.filter(c => c.id != props.excludedId)
			.map((cat, i) => (
				<div className={'cat-box'} key={i} onClick={() => props.onChoose(cat)}>
					<CatComponent key={i} dna={cat.genes} />
					<div className={'dna'}>
						<span>GEN: {cat.generation}</span>
						<span>DNA: {cat.genes}</span>
					</div>
				</div>
			));

	return <div className={'my-kitties-container'}>{fromCatToComponent()}</div>;
};
