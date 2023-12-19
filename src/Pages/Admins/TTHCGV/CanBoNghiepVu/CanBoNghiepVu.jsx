import React, { useEffect, useState } from "react";
import CanBoNghiepVuView from "./CanBoNghiepVuView";
import { getAllHoSoGuiYeuCau, putHoSoThuTucGuiYeuCauById } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";
import { getListTrangThaiTTHCGV, getTrangThaiIDBySTTYeuCauId } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiTrangThai";
import Swal from "sweetalert2";
import { sendEmailUserSubmit } from "../../../../Services/Utils/emailUtils";
import { DataCanBoGV } from "../../../../Services/Utils/dataCanBoGV";

function CanBoNghiepVu() {
	const [listHoSoYeuCau, setListHoSoYeuCau] = useState(null);
	const [listTrangThaiHoSo, setListTrangThaiHoSo] = useState(null);
	const [trangThaiSelected, setTrangThaiSelected] = useState("");
	const dataCBGV = DataCanBoGV();
	// event handlers
	const handleTiepNhanHoSo = async (itemYeuCau) => {
		console.log("🚀 ~ file: CanBoNghiepVu.jsx:14 ~ handleTiepNhanHoSo ~ itemYeuCau:", itemYeuCau);
		return;
		if (itemYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID == 0) {
			Swal.fire({
				title: "Hồ sơ yêu cầu chưa được tiếp nhận!",
				text: "Bạn có muốn tiếp nhận hồ sơ để tiếp tục xử lý yêu cầu?",
				icon: "question",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Đồng ý",
				cancelButtonText: "Hủy",
			}).then(async (result) => {
				if (result.isConfirmed) {
					const resNewTrangThaiID = await getTrangThaiIDBySTTYeuCauId(itemYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_ID, 1);
					if (resNewTrangThaiID.status === 200) {
						const dataTrangThaiIDNew = await resNewTrangThaiID.data?.body[0];
						if (dataTrangThaiIDNew) {
							const newDataUpdate = {
								...itemYeuCau,
								MC_TTHC_GV_GuiYeuCau_TrangThai_ID: dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_ID,
								MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu: dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_MoTa
									? dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_MoTa
									: dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_TenTrangThai,
							};
							const resPutHoSoThuTuc = await putHoSoThuTucGuiYeuCauById(newDataUpdate);

							if (resPutHoSoThuTuc.status === 200) {
								sendEmailUserSubmit(
									"tiepnhan",
									`Thông báo trả lời đề nghị ${itemYeuCau?.MC_TTHC_GV_TenThuTuc.toUpperCase()} (Email tự động, vui lòng không trả lời)`,
									itemYeuCau?.HoTen,
									itemYeuCau?.MC_TTHC_GV_TenThuTuc.toUpperCase(),
									itemYeuCau?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu,
									itemYeuCau?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa,
									itemYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu,
									itemYeuCau?.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong,
									`${dataCBGV?.HoDem + " " + dataCBGV?.Ten}`,
									dataCBGV?.Email,
									dataCBGV?.SoDienThoai ? dataCBGV?.SoDienThoai : dataCBGV?.SoDiDong,
									itemYeuCau?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email
								);
								Swal.fire({
									title: "Thông báo",
									text: "Đã tiếp nhận hồ sơ! Tiếp tục xử lý yêu cầu!",
									icon: "success",
								});
							}
						}
					}
				} else {
					toast.success("Đã huỷ tiếp nhận hồ sơ!");
					return;
				}
			});
		}
	};

	// effects
	useEffect(() => {
		getAllHoSoGuiYeuCau().then((res) => {
			if (res.status === 200) {
				setListHoSoYeuCau(res?.data?.body);
			}
		});

		getListTrangThaiTTHCGV()
			.then((res) => {
				if (res.status === 200) {
					const data = res.data?.body;
					setListTrangThaiHoSo(data);
				}
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [trangThaiSelected]);

	return <CanBoNghiepVuView listHoSoYeuCau={listHoSoYeuCau} listTrangThaiHoSo={listTrangThaiHoSo} setTrangThaiSelected={setTrangThaiSelected} handleTiepNhanHoSo={handleTiepNhanHoSo} />;
}

export default CanBoNghiepVu;
