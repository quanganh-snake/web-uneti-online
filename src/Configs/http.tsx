import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import AxiosConfig from "axios";
import { store } from "../Services/Redux/store";
import { DataSinhVien } from "../Services/Utils/dataSinhVien";
import { DataCanBoGV } from "../Services/Utils/dataCanBoGV";
import { jwtDecode } from "jwt-decode";
import { tokenSuccess } from "../Services/Redux/Slice/authSlice";

interface IFetcherOtions {
	token: string;
	withToken?: boolean;
}

export function fetcher<T>(config: AxiosRequestConfig, dispatch: Dispatch<AnyAction>, options: IFetcherOtions): Promise<T> {
	const defaultHeader: IFetcherOtions = {
		withToken: true,
		...options,
	};
	// con cai interceptor chua viet duoc idol a
	// the con cai auto refreshToken ntn idol

	const clientRequest = axios.create({
		headers: {
			"Content-Type": "application/json",
			Origin: "https://uneti.edu.vn",
		},

		baseURL: `https://apiv2.uneti.edu.vn/api`,
		timeout: 12000,
    });
    // de toi xem nha, chac no sai o day
    // oke idol ok
	const dataAuth = localStorage.getItem("persist:root") ? localStorage.getItem("persist:root") : null;
	// clientRequest.interceptors.request.use(
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
	clientRequest.interceptors.request.use(
		async (config: any) => {
			let date = new Date();
			const dataTokenSV = DataSinhVien();
			const dataTokenCBGV = DataCanBoGV();
			const dataToken = dataTokenSV.dataToken ?? dataTokenCBGV.dataToken;
			const { token: accessToken, refreshToken } = dataToken;
			if (accessToken && refreshToken) {
				config.headers.Authorization = `Bearer ${accessToken}`;
				const decodedToken = jwtDecode(accessToken);
				// console.log(
				// 	"🚀 ~ file: http.js:92 ~ check accessToken expire: ",
				// 	decodedToken.exp < date.getTime() / 1000,
				// 	"  - time detail: ",
				// 	date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "s"
				// );
				const decodedRefreshToken = jwtDecode(refreshToken);
				// console.log(
				// 	"🚀 ~ file: http.js:92 ~ check refreshToken expire: ",
				// 	decodedRefreshToken.exp < date.getTime() / 1000,
				// 	"  - time detail: ",
				// 	date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "s"
				// );

				if (decodedRefreshToken.exp ?? 0 < date.getTime() / 1000) {
					window.location.href = "/dangnhap";
					return;
				}

				if (decodedToken.exp ?? 0 < date.getTime() / 1000) {
					const resNewDataToken = await axios.post(`https://apiv2.uneti.edu.vn/api/jwt/RefreshToken`, { refreshToken });
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

	const state = store.getState();

	if (defaultHeader.token) {
		clientRequest.defaults.headers.common.Authorization = `Bearer ${defaultHeader.token}`;
		//viet ho dau nhay voi id
	} else {
		if (defaultHeader.withToken) {
			//sv voi gv key la gi the idol
			// dung r idol,
			const token = state.auth?.login?.currentToken;
			clientRequest.defaults.headers.common.Authorization = `Bearer ${token}`;
		}
	}
	//mo man kia di idol
	return new Promise<T>((resolve, reject) => {
		clientRequest
			.request(config)
			.then(async (response) => {
				console.log("aaaaaa");
				if (response.data) {
					resolve(response.data);
					return;
				}
				reject({
					status: response.data,
					message: response.data,
				});
			})
			.catch((err: AxiosError) => {
				console.log("bbbbbb");
				if (axios.isAxiosError(err)) {
					return reject(err);
				}
			});
	});
}
