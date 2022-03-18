import { BigNumber } from 'ethers';
import { from, map, mergeMap, Subject, tap, zip } from 'rxjs';
import { KittyFactory } from '../../typechain-types';
import { ContractConfig, ContractConnector } from '../services/contractConnector';
import { BirthEvent } from '../../typechain-types/KittyFactory';
import { DNA } from '../apps/kriptoKitties/views/components/KittiesFactoryComponent';

export class Cat {
	constructor(
		readonly id: number,
		readonly genes: DNA,
		readonly generation: number,
		readonly mumId: number,
		readonly dadId: number,
		readonly birthday: number
	) {}

	static createFrom(kittyStruct: KittyFactory.KittyStructOutput) {
		const dna = this.fromNumberToDna(kittyStruct.genes.toNumber());
		return new Cat(
			kittyStruct.id.toNumber(),
			dna,
			kittyStruct.generation,
			kittyStruct.mumId,
			kittyStruct.dadId,
			kittyStruct.birthTime.toNumber()
		);
	}

	static fromNumberToDna(value: number) {
		const valueAsString = value.toString();
		const dna = [
			valueAsString.substring(0, 2),
			valueAsString.substring(2, 4),
			valueAsString.substring(4, 6),
			valueAsString.substring(6, 8),
			valueAsString.substring(8, 9),
			valueAsString.substring(9, 10),
			valueAsString.substring(10, 12),
			valueAsString.substring(12, 14),
			valueAsString.substring(14, 15),
		];
		return dna.map(s => Number.parseInt(s)) as DNA;
	}

	static isValidDNA(dna: DNA) {
		return dna.filter(v => v == null || isNaN(v)).length == 0;
	}
}

export class KittyFactoryInteractor {
	contractAPI: KittyFactory;
	birthBus: Subject<[string, BigNumber, BigNumber, BigNumber, BigNumber, BirthEvent]> = new Subject();
	constructor(private contractConnector: ContractConnector, private contractConfig: ContractConfig) {
		this.contractAPI = contractConnector.connect(contractConfig);
		this.contractAPI.on(this.contractAPI.filters.Birth(), (...values) => {
			this.birthBus.next(values);
		});
	}

	breed(dadId: number, mumId: number) {
		return from(this.contractAPI.breed(dadId, mumId)).pipe(mergeMap(tx => from(tx.wait())));
	}

	getCatsWithValidDNAByOwner(account: string) {
		return from(this.balanceOf(account).pipe(map(b => ({ balance: b.toNumber(), owner: account })))).pipe(
			map(b => ({ range: this.range(0, b.balance), owner: b.owner })),
			map(r => r.range.map(n => this.tokenOfOwnerByIndex(r.owner, n))),
			mergeMap(requestsToGetIndexes => zip(...requestsToGetIndexes)),
			map(ids => ids.map(id => this.requestNFTBy(id.toNumber()))),
			mergeMap(requestsToGetNFTData => zip(...requestsToGetNFTData)),
			map(cats => cats.filter(cat => Cat.isValidDNA(Cat.fromNumberToDna(cat.genes.toNumber())))),
			map(cats => cats.map(cat => Cat.createFrom(cat)))
		);
	}

	private range(from: number, length: number, steps = 1): number[] {
		return Array.from({ length: length }, (_, i) => (i + from) * steps);
	}

	requestNFTBy(id: number) {
		return from(this.contractAPI.getKitty(id));
	}

	mintKitty(genes: number) {
		return from(this.contractAPI.mintGenerationZeroKitty(genes)).pipe(mergeMap(tx => from(tx.wait())));
	}

	totalSupply() {
		return from(this.contractAPI.totalSupply());
	}

	balanceOf(accountAddress: string) {
		return from(this.contractAPI.balanceOf(accountAddress));
	}

	tokenOfOwnerByIndex(accountAddress: string, index: number) {
		return from(this.contractAPI.tokenOfOwnerByIndex(accountAddress, index));
	}

	transfer(addressFrom: string, addressTo: string, tokenId: BigNumber) {
		return from(this.contractAPI.transferFrom(addressFrom, addressTo, tokenId)).pipe(
			mergeMap(tx => from(tx.wait()))
		);
	}
}
