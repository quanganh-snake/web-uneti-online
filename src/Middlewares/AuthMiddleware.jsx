import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
function AuthMiddleware() {
	const role = localStorage.getItem("role") ? localStorage.getItem("role") : null;

	const dataAuth = useSelector((state) => state.auth?.login?.currentToken?.token);

	if (dataAuth == null || dataAuth == undefined || dataAuth == "" || role == null || role == "" || role == undefined) {
		return <Navigate to={"/dangnhap"} />;
	} else {
		return <Outlet />;
	}
}

export default AuthMiddleware;
