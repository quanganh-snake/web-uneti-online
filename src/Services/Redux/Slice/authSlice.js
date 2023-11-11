import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: {
		currentToken: null,
		isFetching: false,
		error: false,
	},
};
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		tokenStart: (state) => {
			state.token.isFetching = true;
		},
		tokenSuccess: (state, action) => {
			state.token.isFetching = false;
			state.token.currentToken = action.payload;
			state.token.error = false;
		},
		tokenFailure: (state) => {
			state.token.isFetching = false;
			state.token.error = true;
		},
	},
});

export const { tokenStart, tokenSuccess, tokenFailure } = authSlice.actions;
export default authSlice.reducer;
