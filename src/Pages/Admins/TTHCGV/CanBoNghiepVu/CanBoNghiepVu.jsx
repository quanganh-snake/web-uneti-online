import React, { useEffect, useState } from "react";
import CanBoNghiepVuView from "./CanBoNghiepVuView";
import { getAllHoSoGuiYeuCau, getAllTTHCGVGuiYeuCauByTrangThai } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";
import { useParams } from "react-router-dom";

function CanBoNghiepVu() {
	const params = useParams();
	const [listHoSoYeuCau, setListHoSoYeuCau] = useState(null);
	const [listHoSoYeuCauByStatus, setListHoSoYeuCauByStatus] = useState(null);

	useEffect(() => {
		getAllHoSoGuiYeuCau().then((res) => {
			if (res.status === 200) {
				setListHoSoYeuCau(res?.data?.body);
			}
		});
	}, []);

	useEffect(() => {
		getAllTTHCGVGuiYeuCauByTrangThai(params?.status).then(async (res) => {
			if (res.status === 200) {
				const data = await res.data?.body;
				setListHoSoYeuCauByStatus(data);
			}
		});
	}, [params?.status]);

	if (params) {
		const { status } = params;
		return <CanBoNghiepVuView status={status} listHoSoYeuCauByStatus={listHoSoYeuCauByStatus} listHoSoYeuCau={listHoSoYeuCau} />;
	} else {
		return <CanBoNghiepVuView listHoSoYeuCau={listHoSoYeuCau} />;
	}
}

export default CanBoNghiepVu;
