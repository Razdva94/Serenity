import { EQUAL_SYMBOL, OPERATORS, NUMBERS } from '@/shared';
const defineButtonGroup = (symbol: string) => {
	if (
		EQUAL_SYMBOL.some((el) => {
			return el === symbol;
		})
	) {
		return 'equal-symbol';
	}
	if (
		OPERATORS.some((el) => {
			return el === symbol;
		})
	) {
		return 'operator';
	}
	if (
		NUMBERS.some((el) => {
			return el === symbol;
		})
	) {
		return 'number';
	}
};

export { defineButtonGroup };
