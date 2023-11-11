import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: {
		currentUser: null,
		isFetching: false,
		error: false,
	},
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userStart: (state) => {
			state.user.isFetching = true;
		},
		userSuccess: (state, action) => {
			state.user.isFetching = false;
			state.user.currentUser = action.payload;
			state.user.error = false;
		},
		userFailure: (state) => {
			state.user.isFetching = false;
			state.user.error = true;
		},
	},
});

export const { userStart, userSuccess, userFailure } = userSlice.actions;
export default userSlice.reducer;
