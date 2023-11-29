import axios from "axios";
import { tokenFailure, tokenStart, tokenSuccess } from "../Services/Redux/Slice/authSlice.js";
import { BASE_URL } from "../Configs/config.js";
import { userFailure, userStart, userSuccess } from "../Services/Redux/Slice/userSlice.js";

// data token
export const tokenSVLogin = async (user, dispatch) => {
	dispatch(tokenStart());

	try {
		const res = await axios.post(`${BASE_URL}/jwt/Login`, user);
		if (res.status === 200) {
			dispatch(tokenSuccess(res.data));
			return res.data;
		}
	} catch (error) {
		dispatch(tokenFailure());
	}
};

export const tokenGVLogin = async (user, dispatch) => {
	dispatch(tokenStart());

	try {
		const res = await axios.post(`${BASE_URL}/jwtGV/LoginGV`, user);
		if (res.status === 200) {
			dispatch(tokenSuccess(res.data));
			return res.data;
		}
	} catch (error) {
		dispatch(tokenFailure());
	}
};

// data user
export const userSVLogin = async (axiosJWT, username, accessToken, dispatch, navigate) => {
	dispatch(userStart());
	try {
		const res = await axiosJWT.post(`${BASE_URL}/SP_MC_MaSinhVien/Load_Web_App_Para`, username, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		if (res.status === 200) {
			dispatch(userSuccess(res.data?.body[0]));
			navigate("/");
			return res.data?.body[0];
		}
		// console.log("🚀 ~ file: apiLogin.js:26 ~ userLogin ~ res:", res);
		// console.log("🚀 ~ file: apiLogin.js:26 ~ userLogin ~ res:", res.data?.body[0]);
	} catch (error) {
		dispatch(userFailure());
	}
};

export const userGVLogin = async (axiosJWT, user, accessToken, dispatch, navigate) => {
	dispatch(userStart());
	try {
		const res = await axiosJWT.post(`${BASE_URL}/SP_HT_USER_GIANGVIEN/Load_MaND_HRM`, user, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		if (res.status === 200) {
			dispatch(userSuccess(res.data?.body[0]));
			navigate("/");
			return res.data?.body[0];
		}
		// console.log("🚀 ~ file: apiLogin.js:26 ~ userLogin ~ res:", res);
		// console.log("🚀 ~ file: apiLogin.js:26 ~ userLogin ~ res:", res.data?.body[0]);
	} catch (error) {
		dispatch(userFailure());
	}
};
