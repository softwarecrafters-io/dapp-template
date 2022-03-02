import { sum } from '../../src/core/sum';

test('adds two given numbers', ()=>{
	expect(sum(1, 2)).toBe(3)
})


import * as arithmetic from "../../src/core/Arithmetic";
import * as calculator from "../../src/core/Calculator";

// @ts-ignore
arithmetic.add = jest.fn();
// @ts-ignore
arithmetic.subtract = jest.fn();

test("calls arithmetic.add", () => {
	calculator.doAdd(1, 2);
	expect(arithmetic.add).toHaveBeenCalledWith(1, 2);
});

test("calls arithmetic.subtract", () => {
	calculator.doSubtract(1, 2);
	expect(arithmetic.subtract).toHaveBeenCalledWith(1, 2);
});