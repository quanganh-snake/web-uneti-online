import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const BASE_URL = "https://apiv2.uneti.edu.vn/api";

// Hàm để gửi yêu cầu refresh token
const refreshToken = async (refreshToken) => {
	try {
		const response = await axios.post(`${BASE_URL}/jwt/RefreshToken`, {
			refreshToken: refreshToken,
		});

		// Lấy access token mới từ response
		const newAccessToken = response.data.accessToken;

		// Lưu trữ access token mới vào nơi nào đó (ví dụ: localStorage)
		// localStorage.setItem('accessToken', newAccessToken);

		return newAccessToken;
	} catch (error) {
		// Xử lý lỗi refresh token (ví dụ: đăng xuất người dùng, xóa thông tin đăng nhập, etc.)
		console.error("Error refreshing token:", error);
		throw error;
	}
};

// Hàm để thực hiện yêu cầu API với việc xử lý tự động refresh token
const performRequestWithRetry = async (method, url, data = null) => {
	try {
		// Lấy access token từ nơi lưu trữ (ví dụ: localStorage)
		const accessToken = localStorage.getItem("accessToken");

		// Thực hiện yêu cầu với access token hiện tại
		const response = await axios({
			method: method,
			url: `${BASE_URL}/${url}`,
			data: data,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return response.data;
	} catch (error) {
		// Nếu gặp lỗi 401 (Unauthorized), thử refresh token và thực hiện lại yêu cầu
		if (error.response && error.response.status === 401) {
			try {
				const newAccessToken = await refreshToken(refreshToken);

				// Cập nhật access token mới vào nơi lưu trữ (ví dụ: localStorage)
				// localStorage.setItem('accessToken', newAccessToken);

				// Thực hiện lại yêu cầu với access token mới
				const retryResponse = await axios({
					method: method,
					url: `${BASE_URL}/${url}`,
					data: data,
					headers: {
						Authorization: `Bearer ${newAccessToken}`,
					},
				});

				return retryResponse.data;
			} catch (refreshError) {
				// Xử lý lỗi khi refresh token thất bại (ví dụ: đăng xuất người dùng, xóa thông tin đăng nhập, etc.)
				console.error("Error retrying request after refreshing token:", refreshError);
				throw refreshError;
			}
		} else {
			// Xử lý lỗi khác
			console.error(`Error ${method} request:`, error);
			throw error;
		}
	}
};
