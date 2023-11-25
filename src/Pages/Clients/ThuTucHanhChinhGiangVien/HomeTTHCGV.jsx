import React from "react";
import HomeTTHCGVView from "./HomeTTHCGVView";

function HomeTTHCGV() {
	const home = {
		path: "/tthcgiangvien",
		title: "TTHC Giảng Viên",
	};

	const breadcrumbs = [];
	return <HomeTTHCGVView home={home} />;
}

export default HomeTTHCGV;
