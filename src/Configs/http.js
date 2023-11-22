import axios from "axios";
import { useSelector } from "react-redux";
import { tokenSuccess } from "../Services/Redux/Slice/authSlice";
import { jwtDecode } from "jwt-decode";

export const API_URL = "https://apiv2.uneti.edu.vn/api";

const http = axios.create({
	baseURL: `${API_URL}`,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

const dataAuth = localStorage.getItem("persist:root") ? localStorage.getItem("persist:root") : null;

// Add a request interceptor
// http.interceptors.request.use(
// 	(config) => {
// 		let accessToken = null;
// 		if (dataAuth) {
// 			const dataAuthLogin = JSON.parse(dataAuth);
// 			const dataToken = JSON.parse(dataAuthLogin.auth);
// 			accessToken = dataToken?.login?.currentToken.token;
// 		} else {
// 			console.log("error");
// 		}
// 		if (accessToken) {
// 			config.headers.Authorization = `Bearer ${accessToken}`;
// 		}
// 		return config;
// 	},
// 	(error) => Promise.reject(error)
// );

// // Add a response interceptor
// http.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		let refreshToken = null;
// 		if (dataAuth) {
// 			const dataAuthLogin = JSON.parse(dataAuth);
// 			const dataToken = JSON.parse(dataAuthLogin.auth);
// 			refreshToken = dataToken?.login?.currentToken.refreshToken;
// console.log("🚀 ~ file: http.js:45 ~ refreshToken:", refreshToken);
//         } else {
//             localStorage.removeItem("persist:root")
// 			console.log("error");
// 		}
// 		const originalRequest = error.config;
// 		// If the error status is 401 and there is no originalRequest._retry flag,
// 		// it means the token has expired and we need to refresh it
// 		if (error.response.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true;

// 			try {
// 				const response = await axios.post("/jwt/RefreshToken", { refreshToken });
// console.log("🚀 ~ file: http.js:45 ~ response:", response);
// 				const { token } = response.data;
// 				// dispatch(tokenSuccess(response.data));
// 				// localStorage.setItem("token", token);

// 				// Retry the original request with the new token
// 				originalRequest.headers.Authorization = `Bearer ${token}`;
// 				return axios(originalRequest);
// 			} catch (error) {
// 				// Handle refresh token error or redirect to login
// 			}
// 		}

// 		return Promise.reject(error);
// 	}
// );

// Request api check tokens
export const createAxiosJWT = (dataToken, dispatch, stateSuccess) => {
	// console.log("🚀 ~ file: http.js:78 ~ createAxiosJWT ~ stateSuccess:", stateSuccess);
	// console.log("🚀 ~ file: http.js:78 ~ createAxiosJWT ~ dispatch:", dispatch);
	// console.log("🚀 ~ file: http.js:78 ~ createAxiosJWT ~ dataToken:", dataToken);
	const newAxios = axios.create({
		baseURL: `${API_URL}`,
		headers: {
			"Content-Type": "application/json",
		},
	});
	// Add a request interceptor
	newAxios.interceptors.request.use(
		async (config) => {
			let date = new Date();
			const { token: accessToken, refreshToken } = dataToken;

			if (accessToken && refreshToken) {
				const decodedToken = jwtDecode(accessToken);
				console.log(
					"🚀 ~ file: http.js:92 ~ check accessToken expire: ",
					decodedToken.exp < date.getTime() / 1000,
					"  - time detail: ",
					date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "s"
				);
				const decodedRefreshToken = jwtDecode(refreshToken);
				console.log(
					"🚀 ~ file: http.js:92 ~ check refreshToken expire: ",
					decodedRefreshToken.exp < date.getTime() / 1000,
					"  - time detail: ",
					date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "s"
				);

				if (decodedRefreshToken.exp < date.getTime() / 1000) {
					window.location.href = window.location.hostname + "/dangnhap";
					return;
				}

				if (decodedToken.exp < date.getTime() / 1000) {
					const resNewDataToken = await axios.post(`${API_URL}/jwt/RefreshToken`, { refreshToken });
					const refreshUser = {
						...dataToken,
						token: resNewDataToken.data.token,
					};
					dispatch(stateSuccess(refreshUser));
					config.headers.Authorization = `Bearer ${resNewDataToken.data.token}`;
				}
			}
			return config;
		},
		(error) => Promise.reject(error)
	);

	return newAxios;
};

export default http;
