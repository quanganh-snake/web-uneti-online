import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../Configs/config";
import { tokenSuccess } from "../Services/Redux/Slice/authSlice";
function AuthMiddleware() {
	let axiosJWT = axios.create();

	const token = useSelector((state) => state.auth.token);
	const { currentToken } = token;
	const accessToken = currentToken?.token;

	const refreshToken = async () => {
		try {
			const res = await axiosJWT.post(`${BASE_URL}/jwt/RefreshToken`, {
				withCredentials: true,
			});
			return res.data;
		} catch (error) {
			console.log([error]);
		}
	};
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

	return accessToken ? <Outlet /> : <Navigate to={"/dangnhap"} />;
}

export default AuthMiddleware;
