import React from "react";
import PropTypes from "prop-types";
import SoanHoSoView from "./SoanHoSoView";

function SoanHoSo(props) {
	const home = {
		path: "/tthcgiangvien",
		title: "TTHC Giảng Viên",
	};

	const breadcrumbs = [
		{
			path: "/tthcgiangvien/submit",
			title: "Soạn hồ sơ",
		},
	];
	return <SoanHoSoView home={home} breadcrumbs={breadcrumbs} />;
}

SoanHoSo.propTypes = {};

export default SoanHoSo;
