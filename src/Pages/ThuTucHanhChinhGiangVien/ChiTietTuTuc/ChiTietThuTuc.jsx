import React from "react";
import PropTypes from "prop-types";
import ChiTietThuTucView from "./ChiTietThuTucView";
import { useParams } from "react-router-dom";

function ChiTietThuTuc(props) {
	const { id } = useParams();

	const home = {
		path: "/tthcgiangvien",
		title: "TTHC Giảng Viên",
	};

	const breadcrumbs = [
		{
			path: "/tthcgiangvien/dsthutuc",
			title: "Chi tiết thủ tục",
		},
	];
	return <ChiTietThuTucView idThuTuc={id} home={home} breadcrumbs={breadcrumbs} />;
}

ChiTietThuTuc.propTypes = {};

export default ChiTietThuTuc;
