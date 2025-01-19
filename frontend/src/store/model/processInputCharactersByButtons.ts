import {
	AVALIABLE_SYMBOLS_BUTTONS,
	CHANGED_SYMBOLS,
} from './avaliable-symbols-data';

type lastCharacterType = '*' | '/';

const processInputCharactersByButtons = (expression: string): string => {
	const lastCharacter = expression[expression.length - 1];
	if (AVALIABLE_SYMBOLS_BUTTONS.includes(lastCharacter)) {
		if (lastCharacter in CHANGED_SYMBOLS) {
			const changedExpression =
				expression.slice(0, -1) +
				CHANGED_SYMBOLS[lastCharacter as lastCharacterType];
			return changedExpression;
		}

		return expression;
	}
	return '';
};

export { processInputCharactersByButtons };
