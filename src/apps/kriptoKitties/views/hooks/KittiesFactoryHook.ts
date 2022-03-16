import { WalletService } from '../../../../services/walletService';
import { KittyFactoryInteractor } from '../../../../contract-interactors/KittyFactoryInteractor';
import { useState } from 'react';
import { DNA } from '../components/KittiesFactoryComponent';

export const KittiesFactoryHook = (
	initialDna: DNA,
	walletService: WalletService,
	kittyFactoryInteractor: KittyFactoryInteractor
) => {
	kittyFactoryInteractor.birthBus.subscribe(birth => console.log('bus birth', birth));
	const [dna, setDna] = useState(initialDna);
	const updateDnaAt = (index: number, value: number) => {
		dna[index] = value;
		setDna([...dna] as DNA);
	};
	const handleHeadChestColor = (value: number) => updateDnaAt(0, value);
	const handleMouthBodyTailColor = (value: number) => updateDnaAt(1, value);
	const handleEyeColor = (value: number) => updateDnaAt(2, value);
	const handleEarPawColor = (value: number) => updateDnaAt(3, value);
	const handleEyeShapeColor = (value: number) => updateDnaAt(4, value);
	const handleDecorationPattern = (value: number) => updateDnaAt(5, value);
	const handleDecorationMiddleColor = (value: number) => updateDnaAt(6, value);
	const handleDecorationSideColor = (value: number) => updateDnaAt(7, value);
	const handleAnimation = (value: number) => updateDnaAt(8, value);
	const [isColorsView, setIsColorsView] = useState(true);
	const generateDefaultDna = () => setDna([10, 11, 12, 10, 1, 1, 14, 14, 1] as DNA);
	const parseDnaToInteger = (dna: DNA): number => {
		return Number.parseInt(dna.map(n => n.toString()).join(''));
	};
	const generateRandomDna = () => {
		const initialDna: DNA = [
			randomBetween(10, 100),
			randomBetween(10, 100),
			randomBetween(10, 100),
			randomBetween(10, 100),
			randomBetween(1, 6),
			randomBetween(1, 6),
			randomBetween(10, 100),
			randomBetween(10, 100),
			randomBetween(1, 6),
		];
		setDna(initialDna);
	};
	const randomBetween = (from: number, to: number) => Math.floor(Math.random() * (to - from)) + from;
	const mintKitty = () => kittyFactoryInteractor.mintKitty(parseDnaToInteger(dna)).subscribe(console.log);

	const queries = {
		dnaFormatted: `DNA: ${dna.map(d => d.toString()).join('')}`,
		isColorsView,
		dna,
	};

	const commands = {
		handleHeadChestColor,
		handleMouthBodyTailColor,
		handleEyeColor,
		handleEarPawColor,
		handleEyeShapeColor,
		handleDecorationPattern,
		handleDecorationMiddleColor,
		handleDecorationSideColor,
		handleAnimation,
		generateDefaultDna,
		generateRandomDna,
		setIsColorsView,
		mintKitty,
	};

	return {
		queries,
		commands,
	};
};
