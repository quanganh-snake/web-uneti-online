import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AuthMiddleware() {
	const auth = true;
	return auth ? <Outlet /> : <Navigate to={"/dangnhap"} />;
}

export default AuthMiddleware;
