import { configureStore } from '@reduxjs/toolkit';
import inputSymbolReducer from './pushButtonSlice';
import togglePopupReducer from './togglePopupSlice';
import { togglePopup } from './togglePopupSlice';
import {
	setClickedSymbol,
	setPushedSymbol,
	setResult,
} from './pushButtonSlice';
import apiSourceReducer from './apiSourceSlice';
import { setApiSource } from './apiSourceSlice';

export const store = configureStore({
	reducer: {
		pushButtonHandler: inputSymbolReducer,
		apiSourceHandler: apiSourceReducer,
		togglePopupHandler: togglePopupReducer,
	},
});

export {
	setClickedSymbol,
	setPushedSymbol,
	setResult,
	setApiSource,
	togglePopup,
};
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
