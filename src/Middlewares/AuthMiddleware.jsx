import { jwtDecode } from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
function AuthMiddleware() {
	try {
		const role = localStorage.getItem("role") ? localStorage.getItem("role") : null;

		const dataAuth = useSelector((state) => state.auth?.login?.currentToken.token);

		const decodedToken = jwtDecode(dataAuth);

		if (decodedToken.exp < new Date().getTime() / 1000 || role == null || role == "" || role == undefined) {
			return <Navigate to={"/dangnhap"} />;
		} else {
			return <Outlet />;
		}
	} catch (error) {
		localStorage.removeItem("persist:root");
		localStorage.removeItem("role");
		return <Navigate to={"/dangnhap"} />;
	}
}

export default AuthMiddleware;
