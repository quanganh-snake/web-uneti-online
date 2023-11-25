import React, { useState } from "react";
import LichThiView from "./LichThiView";
import { DataSinhVien } from "../../../../../Services/Utils/dataSinhVien";
import { useDispatch } from "react-redux";
import { createAxiosJWT } from "../../../../../Configs/http";
import { tokenSuccess } from "../../../../../Services/Redux/Slice/authSlice";
import { dataLoaiThi } from "../../../../../Services/Static/dataStatic";
import { useEffect } from "react";
import { getTenDot } from "../../../../../Apis/MotCua/apiTenDot";
import { getAllHocPhanLichThi } from "../../../../../Apis/MotCua/KhaoThi/apiLichThi";

function LichThi() {
	const home = {
		path: "/motcua",
		title: "Bộ phận một cửa",
	};

	const breadcrumbs = [
		{
			path: "/motcua/khaothi",
			title: "Khảo thí",
		},
		{
			path: "/motcua/khaothi/lichthi",
			title: "Lịch thi",
		},
	];

	const listLyDo = [
		{
			id: 1,
			title: "Xem lịch thi",
			value: 0,
		},
		{
			id: 2,
			title: "Trùng lịch thi",
			value: 1,
		},
		{
			id: 3,
			title: "Không có lịch thi",
			value: 2,
		},
	];

	const [loading, setLoading] = useState(true);
	const [listHocKy, setListHocKy] = useState([]);
	const [tenDot, setTenDot] = useState("");
	const [loaiThi, setLoaiThi] = useState("");
	const [lyDo, setLyDo] = useState("");
	const [listHocPhan, setListHocPhan] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);

	const dataSV = DataSinhVien();
	const accessToken = dataSV.dataToken.token;

	const dispatch = useDispatch();
	let axiosJWT = createAxiosJWT(dataSV.dataToken, dispatch, tokenSuccess);

	// event handlers
	const handleChangeValue = (e) => {
		if (e.target.id === "MC_KT_LichThi_TenDot") {
			setTenDot(e.target.value);
		}

		if (e.target.id === "MC_KT_LichThi_LoaiThi") {
			setLoaiThi(e.target.value);
		}

		if (e.target.id === "MC_KT_LichThi_YeuCau") {
			setLyDo(e.target.value);
		}
	};

	const handleRowSelection = () => {};

	const handleSubmitData = () => {};

	const handlePostData = () => {};

	useEffect(() => {
		getTenDot(axiosJWT, accessToken).then((res) => {
			setListHocKy(res?.data?.body);
		});

		if (tenDot !== "" && loaiThi !== "" && lyDo !== "") {
			setLoading(true);
			getAllHocPhanLichThi(axiosJWT, dataSV.MaSinhVien, tenDot, loaiThi, lyDo, accessToken).then((res) => {
				setLoading(false);
				setListHocPhan(res?.data?.body);
			});
		}
		setLoading(false);
	}, [tenDot, loaiThi, lyDo]);
	return (
		<LichThiView
			home={home}
			breadcrumbs={breadcrumbs}
			loading={loading}
			listHocKy={listHocKy}
			listLyDo={listLyDo}
			tenDot={tenDot}
			dataLoaiThi={dataLoaiThi}
			loaiThi={loaiThi}
			lyDo={lyDo}
			listHocPhan={listHocPhan}
			handleChangeValue={handleChangeValue}
			handleRowSelection={handleRowSelection}
			handleSubmitData={handleSubmitData}
			handlePostData={handlePostData}
		/>
	);
}

export default LichThi;
