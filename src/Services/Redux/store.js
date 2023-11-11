import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice.js";
import userReducer from "./Slice/userSlice.js";

const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
	},
});

export { store };
