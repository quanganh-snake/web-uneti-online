import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { tokenSuccess } from "../Services/Redux/Slice/authSlice";
import { BASE_URL } from "./config";

const refreshToken = async (resfreshToken) => {
	console.log("🚀 ~ file: axiosInstance.js:7 ~ refreshToken ~ resfreshToken:", resfreshToken)
	try {
		const response = await axios.post(`${BASE_URL}/jwt/refreshToken`, {
			resfreshToken: resfreshToken,
		});
		console.log("🚀 ~ file: axiosInstance.js:10 ~ refreshToken ~ response:", response)
		return response.data;
	} catch (error) {
		console.log([error]);
	}
};

export const axiosInstance = (accessToken, dataRefreshToken, dispatch, stateSuccess) => {
	const newInstance = new axios.create();
	newInstance.interceptors.request.use(
		async (config) => {
			let date = new Date();
			const decodeToken = jwtDecode(accessToken);
			if (decodeToken.exp < date.getTime() / 1000) {
				const data = await refreshToken(dataRefreshToken);
				console.log("🚀 ~ file: axiosInstance.js:25 ~ data:", data)
				const refreshUser = {
					...user,
					token: data.token,
				};
				dispatch(stateSuccess(refreshUser));
				config.headers["Authorization"] = `Bearer ${data.token}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	return newInstance;
};
