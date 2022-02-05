import { sum } from '../../src/core/sum';

test('adds two given numbers', ()=>{
	expect(sum(1, 2)).toBe(3)
})