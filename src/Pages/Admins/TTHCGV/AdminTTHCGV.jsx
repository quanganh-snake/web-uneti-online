import React from "react";
import AdminTTHCGVView from "./AdminTTHCGVView";
import { useState } from "react";
import { useEffect } from "react";
import { getAllMucDoThuTuc } from "./../../../Apis/ThuTucHanhChinhGiangVien/apiMucDo";
import { createAxiosJWT } from "./../../../Configs/http";
import { DataSinhVien } from "./../../../Services/Utils/dataSinhVien";
import { DataCanBoGV } from "./../../../Services/Utils/dataCanBoGV";
import { useDispatch } from "react-redux";
import { tokenSuccess } from "../../../Services/Redux/Slice/authSlice";
function AdminTTHCGV() {
	const [listMucDo, setListMucDo] = useState(null);

	const dispatch = useDispatch();
	const dataTokenSV = DataSinhVien();
	const dataTokenCBGV = DataCanBoGV();

	const dataToken = dataTokenSV.dataToken ?? dataTokenCBGV.dataToken;
	const axiosJWT = createAxiosJWT(dataToken, dispatch, tokenSuccess);

	useEffect(() => {
		const getListMucDoThuTuc = () => {
			getAllMucDoThuTuc(axiosJWT).then(async (res) => {
				if (res.status === 200) {
					const data = await res.data;
					setListMucDo(data.body);
				}
			});
		};
		getListMucDoThuTuc();
	}, []);

	return <AdminTTHCGVView listMucDo={listMucDo} />;
}

export default AdminTTHCGV;
