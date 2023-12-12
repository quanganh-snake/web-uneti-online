import React, { useEffect, useState } from "react";
import HomeTTHCGVView from "./HomeTTHCGVView";
import { getAllThuTucHanhChinhGV, getThuTucHanhChinhByKeyWords } from "../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";

function HomeTTHCGV() {
	const home = {
		path: "/tthcgiangvien",
		title: "TTHC Giảng Viên",
	};

	const breadcrumbs = [];

	const [listHoSoThuTuc, setListHoSoThuTuc] = useState([]);
	const [keywords, setKeywords] = useState("");
	useEffect(() => {
		const getListHoSoThuTuc = async () => {
			try {
				const resultListHoSoThuTuc = await getThuTucHanhChinhByKeyWords(keywords);
				console.log("🚀 ~ file: HomeTTHCGV.jsx:19 ~ getListHoSoThuTuc ~ resultListHoSoThuTuc:", resultListHoSoThuTuc)
				if (resultListHoSoThuTuc.status === 200) {
					const dataListHoSoThuTuc = await resultListHoSoThuTuc?.data?.body;
					if (dataListHoSoThuTuc && dataListHoSoThuTuc.length) {
						setListHoSoThuTuc([...dataListHoSoThuTuc]);
					}
				}
			} catch (error) {
				// console.log(error);
			}
		};
		getListHoSoThuTuc();
	}, [keywords]);

	return <HomeTTHCGVView home={home} dataListHoSoThuTuc={listHoSoThuTuc} setKeywords={setKeywords} />;
}

export default HomeTTHCGV;
