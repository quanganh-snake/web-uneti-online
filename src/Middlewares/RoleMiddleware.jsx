import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

function RoleMiddleware(props) {
	const { allowedRoles } = props;
	const role = localStorage.getItem("role");
	return allowedRoles?.includes(role) ? <Outlet /> : <Navigate to="/dangnhap" replace={true} />;
}

RoleMiddleware.propTypes = {
	allowedRoles: PropTypes.array,
};

export default RoleMiddleware;
