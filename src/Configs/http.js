import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { tokenSuccess } from "../Services/Redux/Slice/authSlice";
import { store } from "../Services/Redux/store";

const http = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}`,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

const state = store.getState();
// Add a request interceptor
http.interceptors.request.use(
	(config) => {
		let accessToken = state?.auth?.login?.currentToken?.token;
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Request api check tokens
export const createAxiosJWT = (dispatch) => {
	const dataToken = state?.auth?.login?.currentToken ? state?.auth?.login?.currentToken : null;
	const newAxios = axios.create({
		baseURL: `${import.meta.env.VITE_API_URL}`,
		timeout: 10000,
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
				config.headers.Authorization = `Bearer ${accessToken}`;
				const decodedToken = jwtDecode(accessToken);
				console.log("🚀 ~ file: http.js:92 ~ check accessToken expire: ", {
					expire: decodedToken.exp < date.getTime() / 1000,
					timeout: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "s",
				});
				const decodedRefreshToken = jwtDecode(refreshToken);
				console.log("🚀 ~ file: http.js:92 ~ check refreshToken expire: ", {
					expire: decodedRefreshToken.exp < date.getTime() / 1000,
					timeout: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "s",
				});

				if (decodedRefreshToken.exp < date.getTime() / 1000) {
					window.location.href = "/dangnhap";
					return;
				}

				if (decodedToken.exp < date.getTime() / 1000) {
					const resNewDataToken = await axios.post(`${import.meta.env.VITE_API_URL}/jwt/RefreshToken`, { refreshToken });
					const refreshUser = {
						...dataToken,
						token: resNewDataToken.data.token,
					};
					dispatch(tokenSuccess(refreshUser));
					config.headers.Authorization = `Bearer ${resNewDataToken.data.token}`;
				}
			}
			return config;
		},
		(error) => {
			console.log(error);
			Promise.reject(error);
		}
	);

	newAxios.interceptors.response.use(
		(response) => {
			// console.log(response);
			return response;
		},
		(error) => {
			// console.log("🚀 ~ file: http.js:138 ~ createAxiosJWT ~ error:", error);
			const status = error.response ? error.response.status : null;

			if (status === 401 || status === 403) {
				window.location.href = "/dangnhap";
			}

			return Promise.reject(error);
		}
	);
	return newAxios;
};

export default http;
