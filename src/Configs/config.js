import axios from "axios";

export const BASE_URL = "https://apiv2.uneti.edu.vn/api";

const axiosJWT = axios.create();

export const axiosRequest = () => {
	const token = localStorage.getItem("persist:root");
	const accessToken = JSON.parse(token);
	axiosJWT.interceptors.request.use(
		async (config) => {
			let date = new Date();
			const decodedToken = jwtDecode(accessToken);
			if (decodedToken.exp < date.getTime() / 1000) {
				const data = await refreshToken();
				const refreshUser = {
					...currentToken,
					token: data.token,
				};
				dispatch(tokenSuccess(refreshUser));
				dispatch(tokenSuccess(refreshUser));
				config.headers["Authorization"] = `Bearer ${data.token}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);
};
