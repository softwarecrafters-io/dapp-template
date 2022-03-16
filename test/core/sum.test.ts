import { sum } from '../../src/core/sum';
import { DNA } from '../../src/apps/kriptoKitties/views/components/KittiesFactoryComponent';
/*
test('adds two given numbers', () => {
	expect(sum(1, 2)).toBe(3);
});

import * as arithmetic from '../../src/core/Arithmetic';
import * as calculator from '../../src/core/Calculator';
import { expect } from 'chai';

test('calls arithmetic.add', () => {
	const addMock = jest.spyOn(arithmetic, 'add');

	expect(calculator.doAdd(1, 2)).toBe(3);

	expect(addMock).toHaveBeenCalled();
	expect(addMock).toHaveBeenCalledTimes(1);
	expect(addMock).toHaveBeenCalledWith(1, 2);
});

test('calls arithmetic.subtract', () => {
	calculator.doSubtract(1, 2);
	expect(arithmetic.subtract).toHaveBeenCalledWith(1, 2);
});
*/
it('from number to dna', () => {
	const validDna = 101112101114141;

	const result = fromNumberToDna(validDna);
	expect(result).toEqual([10, 11, 12, 10, 1, 1, 14, 14, 1]);
});

it('is valid dna', () => {
	const number = 101;

	const result = isValidDNA(fromNumberToDna(number) as DNA);

	expect(result).toEqual(false);
});

function fromNumberToDna(value: number) {
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
	return dna.map(s => Number.parseInt(s));
}

function isValidDNA(dna: DNA) {
	return dna.filter(v => v == null || isNaN(v)).length == 0;
}
