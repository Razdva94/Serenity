import { createSlice } from '@reduxjs/toolkit';
import {
	processInputCharactersByButtons,
	isUniqueSymbolsNotInARow,
} from './model';
interface IInputSymbol {
	expression: string;
	custom: boolean;
}
const initialState: IInputSymbol = {
	expression: '',
	custom: false,
};

const inputSymbolSlice = createSlice({
	name: 'inputSymbol',
	initialState,
	reducers: {
		setClickedSymbol: (state, action) => {
			if (action.payload === 'CE') {
				state.expression = state.expression.slice(
					0,
					state.expression.length - 1,
				);
			} else {
				if (isUniqueSymbolsNotInARow(state.expression + action.payload))
					state.expression += action.payload;
			}
		},
		setPushedSymbol: (state, action) => {
			if (action.payload === '') {
				state.expression = '';
			} else {
				const expression = processInputCharactersByButtons(action.payload);
				if (expression && isUniqueSymbolsNotInARow(expression)) {
					state.expression = expression;
				}
			}
		},
		setResult: (state, action) => {
			state.expression = action.payload;
		},
	},
});

export const { setClickedSymbol, setPushedSymbol, setResult } =
	inputSymbolSlice.actions;

export default inputSymbolSlice.reducer;
