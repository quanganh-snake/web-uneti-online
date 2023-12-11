import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { tokenSuccess } from "../Services/Redux/Slice/authSlice";
import { store } from "../Services/Redux/store";
import { refreshDataToken } from "../Apis/apiLogin";

const http = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}`,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

const requestToRefreshToken = async () => {
	const dataCurrentToken = store.getState()?.auth?.login?.currentToken;
	return dataCurrentToken;
};

// Add a request interceptor
http.interceptors.request.use(
	async (config) => {
		const dataToken = store.getState()?.auth?.login?.currentToken;

		let currentDate = new Date();
		if (dataToken) {
			const { token: accessToken, refreshToken } = dataToken;
			config.headers["Authorization"] = `Bearer ${accessToken}`;

			// Check expire
			const decodedToken = jwtDecode(accessToken);
			// console.log("🚀 ~ file: http.js:92 ~ check accessToken expire: ", {
			// 	expire: decodedToken.exp < currentDate.getTime() / 1000,
			// 	timeout: currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds() + "s",
			// });

			const decodedRefreshToken = jwtDecode(refreshToken);
			// console.log("🚀 ~ file: http.js:92 ~ check refreshToken expire: ", {
			// 	expire: decodedRefreshToken.exp < currentDate.getTime() / 1000,
			// 	timeout: currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds() + "s",
			// });

			if (decodedRefreshToken.exp < currentDate.getTime() / 1000) {
				window.location.href = "/";
				return;
			}

			if (decodedToken.exp < currentDate.getTime() / 1000) {
				// const resNewDataToken = await axios.post(`${import.meta.env.VITE_API_URL}/jwt/RefreshToken`, { refreshToken });
				const resNewDataToken = await requestToRefreshToken();
				console.log("🚀 ~ file: http.js:52 ~ resNewDataToken:", resNewDataToken);
				const refreshUser = {
					...dataToken,
					token: resNewDataToken.token,
				};
				store.dispatch(tokenSuccess(refreshUser));
				config.headers.Authorization = `Bearer ${resNewDataToken.token}`;
			}
		}
		return config;
	},
	(error) => {
		localStorage.setItem(">>>Error http.js", error.message);
		Promise.reject(error);
	}
);

http.interceptors.response.use(
	async (response) => {
		return response;
	},
	async (error) => {
		const { response, config } = error;
		const status = error.response ? error.response.status : null;

		if (status === 401 || status === 403) {
			const resNewDataToken = await requestToRefreshToken();

			const { refreshToken } = resNewDataToken;
			const decodedRefreshToken = jwtDecode(refreshToken);
			console.log("🚀 ~ file: http.js:81 ~ check refreshToken expire: ", {
				expire: decodedRefreshToken.exp < currentDate.getTime() / 1000,
				timeout: currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds() + "s",
			});

			if (decodedRefreshToken.exp < currentDate.getTime() / 1000) {
				window.location.href = "/";
			} else {
				const refreshUser = {
					...dataToken,
					token: resNewDataToken.token,
				};
				store.dispatch(tokenSuccess(refreshUser));
				config.headers.Authorization = `Bearer ${resNewDataToken.token}`;
			}
		}

		return Promise.reject(error);
	}
);

export default http;
