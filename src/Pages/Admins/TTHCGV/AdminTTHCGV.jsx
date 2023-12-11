import React from "react";
import AdminTTHCGVView from "./AdminTTHCGVView";
import { useState } from "react";
import { useEffect } from "react";
import { getAllMucDoThuTuc } from "./../../../Apis/ThuTucHanhChinhGiangVien/apiMucDo";
function AdminTTHCGV() {
	const [listMucDo, setListMucDo] = useState(null);
	useEffect(() => {
		const getListMucDoThuTuc = () => {
			getAllMucDoThuTuc().then(async (res) => {
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
