import React, { useEffect, useState } from "react";
import CanBoNghiepVuView from "./CanBoNghiepVuView";
import { getAllHoSoGuiYeuCau, putHoSoThuTucGuiYeuCauById } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";
import { getListTrangThaiTTHCGV, getTrangThaiIDBySTTYeuCauId } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiTrangThai";
import Swal from "sweetalert2";
import { sendEmailUserSubmit } from "../../../../Services/Utils/emailUtils";
import { DataCanBoGV } from "../../../../Services/Utils/dataCanBoGV";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function CanBoNghiepVu() {
	const [listHoSoYeuCau, setListHoSoYeuCau] = useState(null);
	const [listTrangThaiHoSo, setListTrangThaiHoSo] = useState(null);

	const [keywordSearch, setKeywordSearch] = useState("");
	const [selectedTrangThai, setSelectedTrangThai] = useState("");
	const [currentPage, setCurrentPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [paginatedData, setPaginatedData] = useState([]);

	const [loading, setLoading] = useState(true);
	const dataCBGV = DataCanBoGV();

	const { pathname } = useLocation();
	// event handlers
	const handleTiepNhanHoSo = async (itemYeuCau) => {
		if (itemYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID == 0 || !itemYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID) {
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
					setLoading(true);
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
							console.log("🚀 ~ file: CanBoNghiepVu.jsx:56 ~ handleTiepNhanHoSo ~ resPutHoSoThuTuc:", resPutHoSoThuTuc);

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
								setLoading(false);
								getListHoSoYeuCau();
								toast.success("Đã tiếp nhận yêu cầu hồ sơ!");
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
		const fetchData = async () => {
			try {
				setLoading(true);
				const resTrangThai = await getListTrangThaiTTHCGV();
				if (resTrangThai.status === 200) {
					setListTrangThaiHoSo(resTrangThai.data?.body);
				}

				const resHoSoYeuCau = await getAllHoSoGuiYeuCau(pathname.includes("hosoxuly") ? 1 : 0);
				if (resHoSoYeuCau.status === 200) {
					setListHoSoYeuCau(resHoSoYeuCau.data?.body);
				}
			} catch (err) {
				console.log(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [pathname]);

	useEffect(() => {
		// Lọc và phân trang dữ liệu
		let filteredData = listHoSoYeuCau;

		if (keywordSearch) {
			filteredData = filteredData.filter((item) => item?.MC_TTHC_GV_TenThuTuc.toLowerCase().includes(keywordSearch.toLowerCase()));
		}

		if (selectedTrangThai) {
			filteredData = filteredData.filter((item) => item?.MC_TTHC_GV_TrangThai_TenTrangThai === selectedTrangThai);
		}

		const startIndex = currentPage * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		setPaginatedData(filteredData?.slice(startIndex, endIndex));
	}, [listHoSoYeuCau, keywordSearch, selectedTrangThai, currentPage, itemsPerPage]);

	const handleSearch = (value) => {
		setKeywordSearch(value);
		setCurrentPage(0);
	};

	const handlePageChange = (selectedPage) => {
		setCurrentPage(selectedPage);
	};

	return (
		<CanBoNghiepVuView
			loading={loading}
			listHoSoYeuCau={listHoSoYeuCau}
			listTrangThaiHoSo={listTrangThaiHoSo}
			handleTiepNhanHoSo={handleTiepNhanHoSo}
			paginatedData={paginatedData}
			currentPage={currentPage}
			itemsPerPage={itemsPerPage}
			setPage={handlePageChange}
			setItemsPerPage={setItemsPerPage}
			keywordSearch={keywordSearch}
			onSearch={handleSearch}
			setSelectedTrangThai={setSelectedTrangThai}
		/>
	);
}

export default CanBoNghiepVu;
