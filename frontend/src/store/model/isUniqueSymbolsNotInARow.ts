import { UNIQUE_OPERATORS } from './avaliable-symbols-data';

const isUniqueSymbolsNotInARow = (expression: string): boolean => {
	for (let i = 1; i < expression.length; i++) {
		const currentChar = expression[i];
		const previousChar = expression[i - 1];
		if (
			UNIQUE_OPERATORS.includes(currentChar) &&
			UNIQUE_OPERATORS.includes(previousChar)
		) {
			return false;
		}
	}
	return true;
};

export { isUniqueSymbolsNotInARow };
