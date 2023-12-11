import React, { useEffect, useState } from "react";
import HomeTTHCGVView from "./HomeTTHCGVView";
import { getAllPhongBan, getAllThuTucHanhChinhGV } from "../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";

function HomeTTHCGV() {
	const home = {
		path: "/tthcgiangvien",
		title: "TTHC Giảng Viên",
	};

	const breadcrumbs = [];

	const [listHoSoThuTuc, setListHoSoThuTuc] = useState([]);

	useEffect(() => {
		const getListHoSoThuTuc = async () => {
			const resultListHoSoThuTuc = await getAllThuTucHanhChinhGV();
			console.log("🚀 ~ file: HomeTTHCGV.jsx:18 ~ getListHoSoThuTuc ~ resultListHoSoThuTuc:", resultListHoSoThuTuc);
			if (resultListHoSoThuTuc.status === 200) {
				const dataListHoSoThuTuc = await resultListHoSoThuTuc?.data?.body;
				if (dataListHoSoThuTuc && dataListHoSoThuTuc.length) {
					setListHoSoThuTuc([...dataListHoSoThuTuc]);
				}
			}
		};
		getListHoSoThuTuc();
	}, []);

	return <HomeTTHCGVView home={home} dataListHoSoThuTuc={listHoSoThuTuc} />;
}

export default HomeTTHCGV;
