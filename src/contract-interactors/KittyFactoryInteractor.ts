import { BigNumber } from 'ethers';
import { from, map, mergeMap, Subject, tap, zip } from 'rxjs';
import { KittyFactory } from '../../typechain-types';
import { ContractConfig, ContractConnector } from '../services/contractConnector';
import { WalletService } from '../services/walletService';
import { BirthEvent } from '../../typechain-types/KittyFactory';
import { DNA } from '../apps/kriptoKitties/views/components/KittiesFactoryComponent';

export class KittyFactoryInteractor {
	contractAPI: KittyFactory;
	birthBus: Subject<[string, BigNumber, BigNumber, BigNumber, BigNumber, BirthEvent]> = new Subject();
	constructor(private contractConnector: ContractConnector, private contractConfig: ContractConfig) {
		this.contractAPI = contractConnector.connect(contractConfig);
		this.contractAPI.on(this.contractAPI.filters.Birth(), (...values) => {
			this.birthBus.next(values);
		});
	}

	getValidDNAByOwner(account: string) {
		return from(this.balanceOf(account).pipe(map(b => ({ balance: b.toNumber(), owner: account })))).pipe(
			map(b => ({ range: this.range(0, b.balance), owner: b.owner })),
			map(r => r.range.map(n => this.tokenOfOwnerByIndex(r.owner, n))),
			mergeMap(requestsToGetIndexes => zip(...requestsToGetIndexes)),
			map(ids => ids.map(id => this.requestNFTBy(id.toNumber()))),
			mergeMap(requestsToGetNFTData => zip(...requestsToGetNFTData)),
			map(nfts => nfts.map(nft => this.fromNumberToDna(nft.genes.toNumber())).filter(this.isValidDNA))
		);
	}

	private fromNumberToDna(value: number) {
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

	private isValidDNA(dna: DNA) {
		return dna.filter(v => v == null || isNaN(v)).length == 0;
	}

	private range(from: number, length: number, steps = 1): number[] {
		return Array.from({ length: length }, (_, i) => (i + from) * steps);
	}

	requestNFTBy(id: number) {
		return from(this.contractAPI.getKitty(id));
	}

	mintKitty(genes: number) {
		console.log('mintkitty', genes);
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
