import { sum } from '../../src/core/sum';

test('adds two given numbers', ()=>{
	expect(sum(1, 2)).toBe(3)
})


import * as arithmetic from "../../src/core/Arithmetic";
import * as calculator from "../../src/core/Calculator";


test("calls arithmetic.add", () => {
	const addMock = jest.spyOn(arithmetic, 'add')

	expect(calculator.doAdd(1, 2)).toBe(3);

	expect(addMock).toHaveBeenCalled();
	expect(addMock).toHaveBeenCalledTimes(1);
	expect(addMock).toHaveBeenCalledWith(1, 2);
});

test("calls arithmetic.subtract", () => {
	calculator.doSubtract(1, 2);
	expect(arithmetic.subtract).toHaveBeenCalledWith(1, 2);
});
