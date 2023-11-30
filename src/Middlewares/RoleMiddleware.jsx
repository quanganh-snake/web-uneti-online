import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { DataSinhVien } from "../Services/Utils/dataSinhVien";
import { DataCanBoGV } from "../Services/Utils/dataCanBoGV";

function RoleMiddleware(props) {
	const { allowedRoles } = props;
	console.log("🚀 ~ file: RoleMiddleware.jsx:9 ~ RoleMiddleware ~ allowedRoles:", allowedRoles)
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
	console.log("data ROLE: ", role);
	console.log(">>> Check ROLE: ", allowedRoles?.includes(role));
	return allowedRoles?.includes(role) ? <Outlet /> : <Navigate to="/dangnhap" />;
}

RoleMiddleware.propTypes = {
	allowedRoles: PropTypes.array,
};

export default RoleMiddleware;
