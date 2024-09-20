import { createSlice } from "@reduxjs/toolkit";

type CurrentPageType = {
	value: number;
};

const initialState: CurrentPageType = {
	value: 0,
};

export const currentPageSlice = createSlice({
	name: "currentPage",
	initialState,
	reducers: {
		nextPage: (state) => {
			state.value = state.value + 1;
		},
		prevPage: (state) => {
			state.value = state.value - 1;
		},
	},
});

export const { nextPage, prevPage } = currentPageSlice.actions;
export default currentPageSlice.reducer;
