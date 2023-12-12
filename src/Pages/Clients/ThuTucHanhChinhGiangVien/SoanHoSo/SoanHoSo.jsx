import React, { useState } from "react";
import PropTypes from "prop-types";
import SoanHoSoView from "./SoanHoSoView";
import { useParams } from "react-router-dom";

function SoanHoSo() {
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

	const { tieude, id } = useParams();
    const [thanhPhanHoSoFiles, setThanhPhanHoSoFiles] = useState([]);
    
	return <SoanHoSoView home={home} breadcrumbs={breadcrumbs} />;
}

SoanHoSo.propTypes = {};

export default SoanHoSo;
