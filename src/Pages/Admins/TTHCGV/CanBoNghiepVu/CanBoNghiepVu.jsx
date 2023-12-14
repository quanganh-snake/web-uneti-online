import React, { useEffect, useState } from "react";
import CanBoNghiepVuView from "./CanBoNghiepVuView";
import { getAllHoSoGuiYeuCau } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";

function CanBoNghiepVu() {
	const [listHoSoYeuCau, setListHoSoYeuCau] = useState(null);
	useEffect(() => {
		getAllHoSoGuiYeuCau().then((res) => {
			if (res.status === 200) {
				setListHoSoYeuCau(res?.data?.body);
			}
		});
	}, []);

	return <CanBoNghiepVuView listHoSoYeuCau={listHoSoYeuCau} />;
}

export default CanBoNghiepVu;
