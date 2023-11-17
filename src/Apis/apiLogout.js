import { logOutFailure, logOutStart, logOutSuccess } from "../Services/Redux/Slice/authSlice";
import http from "../Configs/http";
import { userSuccess } from "../Services/Redux/Slice/userSlice";

export const logOut = async (role, dispatch, navigate, refreshToken) => {
	dispatch(logOutStart());
	await console.log(`role: ${role}`);
	try {
		const dataRefresh = {
			refreshToken: refreshToken,
		};
		if (role === "SV") {
			await http.post(`/jwt/Logout`, dataRefresh);
		} else if (role === "CB") {
			await http.post(`/jwtGV/LogoutGV`, dataRefresh);
		} else {
			navigate("/dangnhap");
		}
		navigate("/dangnhap");
		dispatch(logOutSuccess());
		dispatch(userSuccess(null));
	} catch (error) {
		dispatch(logOutFailure());
	}
};
