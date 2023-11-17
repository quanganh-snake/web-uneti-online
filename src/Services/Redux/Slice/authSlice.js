import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	login: {
		currentToken: null,
		isFetching: false,
		error: false,
	},

	logout: {
		isFetching: false,
		error: false,
	},
};
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		tokenStart: (state) => {
			state.login.isFetching = true;
		},
		tokenSuccess: (state, action) => {
			state.login.isFetching = false;
			state.login.currentToken = action.payload;
			state.login.error = false;
		},
		tokenFailure: (state) => {
			state.login.isFetching = false;
			state.login.error = true;
		},
		logOutStart: (state) => {
			state.logout.isFetching = true;
		},
		logOutSuccess: (state) => {
			state.logout.isFetching = false;
			state.login.currentToken = null;
			state.logout.error = false;
		},
		logOutFailure: (state) => {
			state.logout.isFetching = false;
			state.logout.error = true;
		},
	},
});

export const { tokenStart, tokenSuccess, tokenFailure, logOutStart, logOutSuccess, logOutFailure } = authSlice.actions;
export default authSlice.reducer;
