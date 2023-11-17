import axios from "axios";
import { useSelector } from "react-redux";
import { tokenSuccess } from "../Services/Redux/Slice/authSlice";

export const API_URL = "https://apiv2.uneti.edu.vn";

const http = axios.create({
	baseURL: `${API_URL}/api`,
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
// 			console.log("🚀 ~ file: http.js:45 ~ refreshToken:", refreshToken)
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
// 				console.log("🚀 ~ file: http.js:45 ~ response:", response);
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
export const createAxiosJWT = (dataToken, dispatch) => {
	const newAxios = axios.create();
	// Add a request interceptor
	newAxios.interceptors.request.use(
		(config) => {
			const accessToken = useSelector((state) => state.auth?.login?.currentToken?.token);
			console.log("🚀 ~ file: http.js:81 ~ createAxios ~ accessToken:", accessToken);
			if (accessToken) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
			return config;
		},
		(error) => Promise.reject(error)
	);

	// Add a response interceptor
	newAxios.interceptors.response.use(
		(response) => response,
		async (error) => {
			const { accessToken, refreshToken } = useSelector((state) => state.auth?.login?.currentToken);
			console.log("🚀 ~ file: http.js:95 ~ accessToken:", accessToken);
			console.log("🚀 ~ file: http.js:96 ~ refreshToken:", refreshToken);

			const originalRequest = error.config;
			// If the error status is 401 and there is no originalRequest._retry flag,
			// it means the token has expired and we need to refresh it
			if (error.response.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;

				try {
					const response = await axios.post("/jwt/RefreshToken", { refreshToken });
					console.log("🚀 ~ file: http.js:45 ~ response:", response);
					const { token } = response.data;
					dispatch(
						tokenSuccess({
							...dataToken,
							token: token,
						})
					);
					// localStorage.setItem("token", token);

					// Retry the original request with the new token
					originalRequest.headers.Authorization = `Bearer ${token}`;
					return axios(originalRequest);
				} catch (error) {
					// Handle refresh token error or redirect to login
				}
			}

			return Promise.reject(error);
		}
	);

	return newAxios;
};

export default http;
