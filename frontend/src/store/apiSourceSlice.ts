import { createSlice } from '@reduxjs/toolkit';
interface ISource {
	text: string;
}
const initialState: ISource = {
	text: 'math.js',
};

const apiSourceSlice = createSlice({
	name: 'apiSource',
	initialState,
	reducers: {
		setApiSource: (state, action) => ({
			...state,
			text: action.payload.text,
		}),
	},
});

export const { setApiSource } = apiSourceSlice.actions;

export default apiSourceSlice.reducer;
