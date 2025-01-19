import { createSlice } from '@reduxjs/toolkit';
interface ISource {
	isOpen: boolean;
}
const initialState: ISource = {
	isOpen: false,
};

const openPopupSlice = createSlice({
	name: 'openPopup',
	initialState,
	reducers: {
		togglePopup: (state) => {
			state.isOpen = !state.isOpen;
		},
	},
});

export const { togglePopup } = openPopupSlice.actions;

export default openPopupSlice.reducer;
