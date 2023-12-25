import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { DataSinhVien } from "../Services/Utils/dataSinhVien";
import { DataCanBoGV } from "../Services/Utils/dataCanBoGV";
function AuthMiddleware() {
	const dataSV = DataSinhVien();
	const dataCBGV = DataCanBoGV();

	let role = null;
	if (dataSV) {
		role = dataSV.Role;
	} else if (dataCBGV) {
		role = dataCBGV.Role;
	} else {
		role = null;
	}

	const dataAuth = useSelector((state) => state.auth?.login?.currentToken?.token);
	if (dataAuth == null || dataAuth == undefined || dataAuth == "" || role == null || role == "" || role == undefined) {
		return <Navigate to={"/dangnhap"} />;
	} else {
		return <Outlet />;
	}
}

export default AuthMiddleware;
