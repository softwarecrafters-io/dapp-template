//Calculator.ts
import * as arithmetic from './Arithmetic';

export function doAdd(a: number, b: number) {
	return arithmetic.add(a, b);
}

export function doSubtract(a: number, b: number) {
	return arithmetic.subtract(a, b);
}

export function doMultiply(a: number, b: number) {
	return arithmetic.multiply(a, b);
}

export function doDivide(a: number, b: number) {
	return arithmetic.divide(a, b);
}