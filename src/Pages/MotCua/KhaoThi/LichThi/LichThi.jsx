import React, { useState } from "react";
import LichThiView from "./LichThiView";
import { DataSinhVien } from "../../../../Services/Utils/dataSinhVien";
import { useDispatch } from "react-redux";
import { createAxiosJWT } from "../../../../Configs/http";
import { tokenSuccess } from "../../../../Services/Redux/Slice/authSlice";
import { dataLoaiThi } from "../../../../Services/Utils/dataStatic";

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

	const lyDo = [
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
	const [listHocPhan, setListHocPhan] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);

	const dataSV = DataSinhVien();
	const accessToken = dataSV.dataToken.token;

	const dispatch = useDispatch();
	let axiosJWT = createAxiosJWT(dataSV.dataToken, dispatch, tokenSuccess);

	// event handlers
	const handleChangeValue = () => {};

	const handleRowSelection = () => {};

	const handleSubmitData = () => {};

	const handlePostData = () => {};
	return (
		<LichThiView
			home={home}
			breadcrumbs={breadcrumbs}
			loading={loading}
			listHocKy={listHocKy}
			tenDot={tenDot}
			dataLoaiThi={dataLoaiThi}
			loaiThi={loaiThi}
			listHocPhan={listHocPhan}
			handleChangeValue={handleChangeValue}
			handleRowSelection={handleRowSelection}
			handleSubmitData={handleSubmitData}
			handlePostData={handlePostData}
		/>
	);
}

export default LichThi;
