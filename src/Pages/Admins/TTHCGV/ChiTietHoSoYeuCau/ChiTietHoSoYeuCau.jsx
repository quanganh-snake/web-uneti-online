import clsx from "clsx";
import React, { useEffect } from "react";
import { useState } from "react";

import { FaCaretRight, FaCaretDown } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import SidebarTTHCGV from "../Sidebar/SidebarTTHCGV";
import { getHoSoGuiYeuCauById, getQuyTrinhXuLyCBNV, putHoSoThuTucGuiYeuCauById } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";
import moment from "moment";
import { getThanhPhanHoSoGuiYeuCauById } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiThanhPhanHoSo";
import Swal from "sweetalert2";
import { getListTrangThaiTTHCGVByIDGoc, getTrangThaiIDBySTTYeuCauId } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiTrangThai";
import { toast } from "react-toastify";
import { NguonTiepNhan_WEB } from "./../../../../Services/Static/dataStatic";
import { sendEmailUserSubmit } from "./../../../../Services/Utils/emailUtils";
import { DataCanBoGV } from "../../../../Services/Utils/dataCanBoGV";

function ChiTietHoSoYeuCau() {
	const { yeucau, id } = useParams();

	const [showThongTinNguoiNop, setShowThongTinNguoiNop] = useState(true);
	const [showThongTinHoSo, setShowThongTinHoSo] = useState(true);
	const [showXuLyHoSo, setShowXuLyHoSo] = useState(true);
	const [dataDetailYeuCau, setDataDetailYeuCau] = useState(null);
	const [dataDetailTPHSYeuCau, setDataDetailTPHSYeuCauYeuCau] = useState(null);
	const [ngayHenTra, setNgayHenTra] = useState(null);
	const [ngayGiaoTra, setNgayGiaoTra] = useState(null);
	const [hinhThucTra, setHinhThucTra] = useState("");
	const [diaDiemTra, setDiaDiemTra] = useState("");
	const [listQuyTrinhXuLy, setListQuyTrinhXuLy] = useState([]);
	const [trangThaiGhiChu, setTrangThaiGhiChu] = useState("");
	const [listTrangThaiYeuCau, setListTrangThaiYeuCau] = useState([]);
	let khoaGiangVien = "";
	const dataCBGV = DataCanBoGV();
	// event handlers
	const handleChangeValue = (e) => {
		const { id, name, value } = e.target;

		if (id == "MC_TTHC_GV_GuiYeuCau_NgayHenTra") {
			setNgayHenTra(moment(value).format("DD/MM/YYYY HH:mm:ss"));
		}

		if (id == "NgayGiaoTra") {
			let strNgayGiaoTra = moment(value).format("DD/MM/YYYY HH:mm:ss");
			setNgayGiaoTra(strNgayGiaoTra);
		}

		if (id == "HinhThucTra") {
			setHinhThucTra(value);
		}

		if (id === "MC_TTHC_GV_GuiYeuCau_NoiTraKetQua") {
			setDiaDiemTra(value);
		}

		if (id === "MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu") {
			setTrangThaiGhiChu(value);
		}
	};

	const handleShowThongTinNguoiNop = () => {
		setShowThongTinNguoiNop(!showThongTinNguoiNop);
	};

	const handleShowThongTinHoSo = () => {
		setShowThongTinHoSo(!showThongTinHoSo);
	};

	const handleShowXuLyHoSo = () => {
		setShowXuLyHoSo(!showXuLyHoSo);
	};

	const handleUpdateYeuCauGui = async (yeuCauID, trangThaiID) => {
		if (trangThaiID == 0) {
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
					const resNewTrangThaiID = await getTrangThaiIDBySTTYeuCauId(yeuCauID, 1);
					console.log("🚀 ~ file: ChiTietHoSoYeuCau.jsx:89 ~ handleUpdateYeuCauGui ~ resNewTrangThaiID:", resNewTrangThaiID)
					if (resNewTrangThaiID.status === 200) {
						const dataTrangThaiIDNew = await resNewTrangThaiID.data?.body[0];
						if (dataTrangThaiIDNew) {
							const newDataUpdate = {
								MC_TTHC_GV_GuiYeuCau_ID: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_ID,
								MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu,
								MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email,
								MC_TTHC_GV_GuiYeuCau_NhanSuGui_SDT: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_SDT,
								MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa,
								MC_TTHC_GV_GuiYeuCau_YeuCau_ID: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_ID,
								MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu,

								MC_TTHC_GV_GuiYeuCau_TrangThai_ID: dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_ID,
								MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu: dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_MoTa
									? dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_MoTa
									: dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_TenTrangThai,
								MC_TTHC_GV_GuiYeuCau_NgayGui: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayGui,
								MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong,
								MC_TTHC_GV_GuiYeuCau_DaNop: false,
								MC_TTHC_GV_GuiYeuCau_NgayHenTra: moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
								MC_TTHC_GV_GuiYeuCau_NoiTraKetQua: "Trả Online - Qua Email",
								MC_TTHC_GV_GuiYeuCau_NguonTiepNhan: NguonTiepNhan_WEB,
							};
							const resPutHoSoThuTuc = await putHoSoThuTucGuiYeuCauById(newDataUpdate);
							console.log("🚀 ~ file: ChiTietHoSoYeuCau.jsx:113 ~ handleUpdateYeuCauGui ~ resPutHoSoThuTuc:", resPutHoSoThuTuc);

							if (resPutHoSoThuTuc.status === 200) {
								sendEmailUserSubmit(
									"tiepnhan",
									`Thông báo trả lời đề nghị ${dataDetailYeuCau?.MC_TTHC_GV_TenThuTuc.toUpperCase()} (Email tự động, vui lòng không trả lời)`,
									dataCBGV?.HoDem + " " + dataCBGV?.Ten,
									dataDetailYeuCau.MC_TTHC_GV_TenThuTuc.toUpperCase(),
									dataCBGV?.MaNhanSu,
									khoaGiangVien,
									newDataUpdate?.MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu,
									newDataUpdate?.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong,
									"Tống Bá Quang Anh",
									"tbquanganh@gmail.com",
									"0334350166",
									newDataUpdate?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email
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
		} else {
			let newDataUpdate = {
				MC_TTHC_GV_GuiYeuCau_ID: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_ID,
				MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu,
				MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email,
				MC_TTHC_GV_GuiYeuCau_NhanSuGui_SDT: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_SDT,
				MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa,
				MC_TTHC_GV_GuiYeuCau_YeuCau_ID: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_ID,
				MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu,

				MC_TTHC_GV_GuiYeuCau_TrangThai_ID: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID,
				MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu,
				MC_TTHC_GV_GuiYeuCau_NgayGui: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayGui,
				MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong,
				MC_TTHC_GV_GuiYeuCau_DaNop: false,
				MC_TTHC_GV_GuiYeuCau_NgayHenTra: moment(ngayHenTra).format("DD/MM/YYYY HH:mm:ss"),
				MC_TTHC_GV_GuiYeuCau_NoiTraKetQua: diaDiemTra,
				MC_TTHC_GV_GuiYeuCau_NguonTiepNhan: NguonTiepNhan_WEB,
			};

			// Hình thức trả: Email
			if (hinhThucTra == "1") {
				Swal.fire({
					title: "Hãy chèn link file đính kèm",
					input: "text",
					inputAttributes: {
						autocapitalize: "off",
						require: true,
					},
					showCancelButton: true,
					confirmButtonText: "Lưu cập nhật",
					cancelButtonText: "Hủy",
					showLoaderOnConfirm: true,
					allowOutsideClick: () => !Swal.isLoading(),
				}).then(async (result) => {
					if (result.isConfirmed) {
						let STTTrangThai;
						let dataListTrangThai = [];
						const resListTrangThai = await getListTrangThaiTTHCGVByIDGoc(dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_ID);
						if (resListTrangThai.status === 200) {
							dataListTrangThai = resListTrangThai.data?.body;
						}

						for (let i = 0; i < dataListTrangThai.length; i++) {
							if (dataListTrangThai[i].MC_TTHC_GV_TrangThai_ID == trangThaiID) {
								STTTrangThai = dataListTrangThai[i].MC_TTHC_GV_TrangThai_STT;
							}
						}

						if (STTTrangThai && STTTrangThai == 1) {
							STTTrangThai = 2;
						} else {
							STTTrangThai++;
							for (let i = 0; i < dataListTrangThai.length; i++) {
								if (parseInt(STTTrangThai) > parseInt(dataListTrangThai[i].MC_TTHC_GV_TrangThai_STT)) {
									STTTrangThai = dataListTrangThai[i].MC_TTHC_GV_TrangThai_STT;
								}
							}
						}
						const getNewTrangThai = await getTrangThaiIDBySTTYeuCauId(yeuCauID, STTTrangThai);
						if (getNewTrangThai.status === 200) {
							const dataNewTrangThai = await getNewTrangThai?.data?.body[0];
							const resUpdateYeuCau = await putHoSoThuTucGuiYeuCauById({
								...newDataUpdate,
								MC_TTHC_GV_GuiYeuCau_TrangThai_ID: dataNewTrangThai?.MC_TTHC_GV_TrangThai_ID,
								MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu: trangThaiGhiChu ? trangThaiGhiChu : dataNewTrangThai?.MC_TTHC_GV_TrangThai_MoTa,
								MC_TTHC_GV_GuiYeuCau_NgayHenTra: moment(ngayHenTra, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
							});

							if (resUpdateYeuCau.status === 200) {
								sendEmailUserSubmit(
									"xuly",
									`Thông báo xử lý đề nghị ${dataDetailYeuCau?.MC_TTHC_GV_TenThuTuc.toUpperCase()} (Email tự động, vui lòng không trả lời)`,
									dataCBGV?.HoDem + " " + dataCBGV?.Ten,
									dataDetailYeuCau?.ThongTinHoSo?.MC_TTHC_GV_TenThuTuc.toUpperCase(),
									dataCBGV?.MaNhanSu,
									khoaGiangVien,
									newDataUpdate?.MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu,
									`Cập nhật xử lý theo yêu cầu ${result.value}. Vui lòng truy cập website để kiểm tra chi tiết.`,
									newDataUpdate?.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong,
									"Tống Bá Quang Anh",
									"tbquanganh@gmail.com",
									"0334350166",
									newDataUpdate?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email
								);
								return;
							}
						}
					}
				});
				return;
			} else if (hinhThucTra == "2") {
				//Hình thức trả: trực tiếp
				if (!diaDiemTra) {
					return toast.error("Vui lòng chọn địa điểm giao trả.");
				} else {
					Swal.fire({
						icon: "question",
						title: "Bạn chắc chắn muốn cập nhật thông tin yêu cầu này?",
						showCancelButton: true,
						confirmButtonText: "Lưu cập nhật",
						cancelButtonText: "Hủy",
						showLoaderOnConfirm: true,
						allowOutsideClick: () => !Swal.isLoading(),
					}).then(async (result) => {
						if (result.isConfirmed) {
							let STTTrangThai;
							let dataListTrangThai = [];
							const resListTrangThai = await getListTrangThaiTTHCGVByIDGoc(dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_ID);
							if (resListTrangThai.status === 200) {
								dataListTrangThai = resListTrangThai.data?.body;
							}

							for (let i = 0; i < dataListTrangThai.length; i++) {
								if (dataListTrangThai[i].MC_TTHC_GV_TrangThai_ID == trangThaiID) {
									STTTrangThai = dataListTrangThai[i].MC_TTHC_GV_TrangThai_STT;
								}
							}

							if (STTTrangThai && STTTrangThai == 1) {
								STTTrangThai = 2;
							}
							const getNewTrangThai = await getTrangThaiIDBySTTYeuCauId(yeuCauID, STTTrangThai);
							if (getNewTrangThai.status === 200) {
								const dataNewTrangThai = await getNewTrangThai?.data?.body[0];
								newDataUpdate = {
									...newDataUpdate,
									MC_TTHC_GV_GuiYeuCau_TrangThai_ID: dataNewTrangThai?.MC_TTHC_GV_TrangThai_ID,
									MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu: trangThaiGhiChu ? trangThaiGhiChu : dataNewTrangThai?.MC_TTHC_GV_TrangThai_MoTa,
									MC_TTHC_GV_GuiYeuCau_NgayHenTra: moment(ngayHenTra, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
									MC_TTHC_GV_GuiYeuCau_NoiTraKetQua: diaDiemTra,
								};
								const resUpdateYeuCau = await putHoSoThuTucGuiYeuCauById(newDataUpdate);

								if (resUpdateYeuCau.status === 200) {
									toast.success("Cập nhật thông tin thành công!");
									sendEmailUserSubmit(
										"xuly",
										`Thông báo xử lý đề nghị ${dataDetailYeuCau?.MC_TTHC_GV_TenThuTuc.toUpperCase()} (Email tự động, vui lòng không trả lời)`,
										dataCBGV?.HoDem + " " + dataCBGV?.Ten,
										dataDetailYeuCau?.ThongTinHoSo?.MC_TTHC_GV_TenThuTuc.toUpperCase(),
										dataCBGV?.MaNhanSu,
										khoaGiangVien,
										newDataUpdate?.MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu,
										`Cập nhật xử lý theo yêu cầu ${result.value}. Vui lòng truy cập website để kiểm tra chi tiết.`,
										newDataUpdate?.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong,
										"Tống Bá Quang Anh",
										"tbquanganh@gmail.com",
										"0334350166",
										newDataUpdate?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email
									);
									return;
								}
							}
						}
					});
					return;
				}
			} else {
				let strCurrentDateHenTra = moment(dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayHenTra).format("DD/MM/YYYY HH:mm").toString();
				let strNewDateHenTra = moment(ngayHenTra, "DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY HH:mm").toString();
				let strNewDateGiaoTra = moment(ngayGiaoTra, "DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY HH:mm").toString();

				if (strNewDateHenTra != strCurrentDateHenTra || strNewDateGiaoTra != strCurrentDateHenTra) {
					Swal.fire({
						icon: "question",
						title: "Bạn có muốn cập nhật thông tin này?",
						text: "Sau khi cập nhật, hệ thống sẽ tự động gửi mail thông báo cho người gửi!",
						showConfirmButton: true,
						showCancelButton: true,
						confirmButtonText: "Đồng ý",
						cancelButtonText: "Huỷ",
					}).then(async (result) => {
						if (result.isConfirmed) {
							const res = await putHoSoThuTucGuiYeuCauById({
								...newDataUpdate,
								MC_TTHC_GV_GuiYeuCau_NgayHenTra: moment(ngayHenTra, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
							});
							if (res.status === 200) {
								toast.success("Cập nhật thành công thông tin yêu cầu!");
								sendEmailUserSubmit(
									"xuly",
									`Thông báo xử lý đề nghị ${dataDetailYeuCau?.MC_TTHC_GV_TenThuTuc.toUpperCase()} (Email tự động, vui lòng không trả lời)`,
									dataCBGV?.HoDem + " " + dataCBGV?.Ten,
									dataDetailYeuCau?.ThongTinHoSo?.MC_TTHC_GV_TenThuTuc.toUpperCase(),
									dataCBGV?.MaNhanSu,
									khoaGiangVien,
									newDataHoSoYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu,
									`Cập nhật xử lý theo yêu cầu. Vui lòng truy cập website để kiểm tra chi tiết.`,
									newDataHoSoYeuCau?.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong,
									"Tống Bá Quang Anh",
									"tbquanganh@gmail.com",
									"0334350166",
									newDataHoSoYeuCau?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email
								);
							}
						}
					});
				} else {
					Swal.fire({
						icon: "info",
						title: "Không có thông tin nào được thay đổi để cập nhật",
						text: "Vui lòng thay đổi thông tin để thực hiện cập nhật mới!",
					});
				}
			}
		}
	};

	const handlePrevStep = async (yeuCauID, currentTrangThaiID) => {};

	const handleNextStep = async () => {};

	const handleCancelHoSo = async () => {};

	useEffect(() => {
		getHoSoGuiYeuCauById(id)
			.then(async (result) => {
				if (result.status === 200) {
					const data = await result.data?.body[0];
					setDataDetailYeuCau(data);
					setNgayHenTra(moment(data?.MC_TTHC_GV_GuiYeuCau_NgayHenTra).format("DD/MM/YYYY HH:mm:ss"));
					setNgayGiaoTra(data?.MC_TTHC_GV_GuiYeuCau_NgayHenTra);
					setDiaDiemTra(data?.MC_TTHC_GV_GuiYeuCau_NoiTraKetQua);
					setTrangThaiGhiChu(data?.MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu);
				}
			})
			.catch((err) => {
				console.log("🚀 ~ file: ChiTietHoSoYeuCau.jsx:78 ~ useEffect ~ err:", err.message);
			});

		getThanhPhanHoSoGuiYeuCauById(id)
			.then((result) => {
				if (result.status === 200) {
					setDataDetailTPHSYeuCauYeuCau(result.data?.body);
				}
			})
			.catch((err) => {
				console.log("🚀 ~ file: ChiTietHoSoYeuCau.jsx:88 ~ useEffect ~ err:", err.message);
			});

		getQuyTrinhXuLyCBNV(id)
			.then(async (res) => {
				if (res.status === 200) {
					const data = await res.data?.body;
					setListQuyTrinhXuLy(data);
				}
			})
			.catch((err) => {
				console.log("🚀 ~ file: ChiTietHoSoYeuCau.jsx:160 ~ useEffect ~ err:", err.message);
			});

		getListTrangThaiTTHCGVByIDGoc(id)
			.then(async (res) => {
				if (res.status === 200) {
					const data = await res.data?.body;
					setListTrangThaiYeuCau(data);
				}
			})
			.catch((err) => {
				console.log("🚀 ~ file: ChiTietHoSoYeuCau.jsx:177 ~ getListTrangThaiTTHCGVByIDGoc ~ err:", err.message);
			});
	}, [id]);

	if (dataDetailYeuCau) {
		return (
			<div className="flex gap-4">
				<SidebarTTHCGV />
				<div className="p-4 bg-white rounded-xl">
					{/* START: Thông tin người nộp */}
					<div className="mb-4">
						<div className="flex flex-row items-center gap-2 bg-[#0484AC] text-white font-semibold px-3 py-1 rounded-md mb-4">
							{showThongTinNguoiNop ? (
								<FaCaretDown className="text-white cursor-pointer" onClick={handleShowThongTinNguoiNop} />
							) : (
								<FaCaretRight className="text-white cursor-pointer" onClick={handleShowThongTinNguoiNop} />
							)}
							<h4>Thông tin người nộp</h4>
						</div>

						<div className={clsx("grid grid-cols-2 items-center justify-between", showThongTinNguoiNop ? null : "hidden")}>
							<p className="col-span-1 mb-3">
								Họ và tên: <span className="font-semibold">{dataDetailYeuCau?.HoTen}</span>
							</p>
							<p className="col-span-1 mb-3">
								Địa chỉ hiện tại: <span className="font-semibold">{dataDetailYeuCau?.NoiOHienTai}</span>
							</p>
							<p className="col-span-1 mb-3">
								Ngày sinh: <span className="font-semibold">{dataDetailYeuCau?.NgaySinh ? moment(dataDetailYeuCau?.NgaySinh).format("DD/MM/YYYY") : ""}</span>
							</p>
							<p className="col-span-1 mb-3">
								CMTND/CCCD: <span className="font-semibold">{dataDetailYeuCau?.SoCMND}</span>
							</p>
							<p className="col-span-1 mb-3">
								Số điện thoại: <span className="font-semibold">{dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_SDT}</span>
							</p>
							<p className="col-span-1 mb-3">
								Email liên hệ: <span className="font-semibold">{dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email}</span>
							</p>
							<p className="col-span-1 mb-3">
								Quê quán: <span className="font-semibold">{dataDetailYeuCau?.QueQuan}</span>
							</p>
						</div>
					</div>
					{/* END: Thông tin người nộp */}

					{/* START: Thông tin hồ sơ */}
					<div className="mb-10">
						<div className="flex flex-row items-center gap-2 bg-[#0484AC] text-white font-semibold px-3 py-1 rounded-md mb-4">
							{showThongTinHoSo ? (
								<FaCaretDown className="text-white cursor-pointer" onClick={handleShowThongTinHoSo} />
							) : (
								<FaCaretRight className="text-white cursor-pointer" onClick={handleShowThongTinHoSo} />
							)}
							<h4>Thông tin hồ sơ</h4>
						</div>

						{/* START: Thông tin */}
						<div className={clsx("grid grid-cols-2 gap-x-4 items-center justify-between mb-4", showThongTinHoSo ? null : "hidden")}>
							<p className="col-span-1 mb-3">
								Tên thủ tục: <span className="font-semibold">{dataDetailYeuCau?.MC_TTHC_GV_TenThuTuc}</span>
							</p>
							<p className="col-span-1 mb-3">
								Mã thủ tục: <span className="font-semibold">{dataDetailYeuCau?.MC_TTHC_GV_MaThuTuc}</span>
							</p>
							<p className="col-span-1 mb-3">
								Ngày nộp hồ sơ:{" "}
								<span className="font-semibold">{dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayGui && moment(dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayGui).format("DD/MM/YYYY")}</span>
							</p>

							<p className="col-span-1 mb-3">
								Ngày tiếp nhận:{" "}
								<span className="font-semibold">{dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayGui && moment(dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayGui).format("DD/MM/YYYY")}</span>
							</p>
							<p className="col-span-1 mb-3">
								Đơn vị tiếp nhận: <span className="font-semibold">{dataDetailYeuCau?.MC_TTHC_GV_NoiTiepNhan}</span>
							</p>
							<p className="col-span-1 mb-3">
								Lĩnh vực: <span className="font-semibold">{dataDetailYeuCau?.MC_TTHC_GV_LinhVuc}</span>
							</p>
							<div className="col-span-2">
								<div className="grid grid-cols-2 gap-2 border border-slate-400 p-2">
									<div className="flex flex-col gap-2">
										<p>Ngày hẹn trả:</p>
										<input
											type="datetime-local"
											className="p-2 border"
											name="MC_TTHC_GV_GuiYeuCau_NgayHenTra"
											id="MC_TTHC_GV_GuiYeuCau_NgayHenTra"
											format="DD/MM/YYYY HH:mm:ss"
											value={moment(ngayHenTra, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DDTHH:mm")}
											onChange={(e) => {
												setNgayHenTra(moment(e.target.value).format("DD/MM/YYYY HH:mm:ss"));
											}}
										/>
									</div>
									<div className="flex flex-col gap-2">
										<p>Ngày giao trả:</p>
										<input
											type="datetime-local"
											className="p-2 border"
											name="NgayGiaoTra"
											id="NgayGiaoTra"
											value={moment(ngayGiaoTra, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DDTHH:mm")}
											onChange={(e) => {
												setNgayGiaoTra(moment(e.target.value).format("DD/MM/YYYY HH:mm:ss"));
											}}
										/>
									</div>
									<div className="flex flex-col gap-2">
										<p>Hình thức giao trả:</p>
										<select className="p-2 border focus:outline-slate-400" name="HinhThucTra" id="HinhThucTra" onChange={handleChangeValue}>
											<option value="">Chọn hình thức giao trả</option>
											<option value="1">Trả online - Qua Email</option>
											<option value="2">Trả trực tiếp</option>
										</select>
									</div>
									{hinhThucTra == "2" ? (
										<div className="flex flex-col gap-2">
											<p>Địa điểm giao trả:</p>
											<select
												className="p-2 border focus:outline-slate-400"
												name="MC_TTHC_GV_GuiYeuCau_NoiTraKetQua"
												id="MC_TTHC_GV_GuiYeuCau_NoiTraKetQua"
												value={diaDiemTra ? diaDiemTra : ""}
												onChange={handleChangeValue}
											>
												<option value="">Chọn địa điểm giao trả</option>
												<option value="1 - Minh Khai">1 - Minh Khai</option>
												<option value="2 - Lĩnh Nam">2 - Lĩnh Nam</option>
												<option value="3 - Nam Định">3 - Nam Định</option>
											</select>
										</div>
									) : null}

									<div className="flex flex-col gap-2 col-span-2">
										<p>Ghi chú:</p>
										<textarea
											className="border border-slate-400 focus:outline-slate-500 p-2"
											placeholder="Nhập mô tả cập nhật/thay đổi"
											minLength={2}
											name="MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu"
											id="MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu"
											rows={4}
											required={true}
											value={trangThaiGhiChu}
											onChange={handleChangeValue}
										></textarea>
									</div>
									<div className="col-span-1 flex flex-col gap-2">
										<button
											type="button"
											onClick={() => {
												handleUpdateYeuCauGui(dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_ID, dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID);
											}}
											className="border p-2 rounded-xl font-medium bg-[#336699] text-white hover:opacity-70"
										>
											Cập nhật
										</button>
									</div>
								</div>
							</div>
						</div>

						{/* START: Thành phần hồ show */}
						<div className="w-full">
							<table className="w-full">
								<thead className="bg-[#075985] text-white ">
									<tr>
										<th className="border-r px-2 py-1 rounded-tl-xl">STT</th>
										<th className="border-r px-2 py-1">Tên giấy tờ</th>
										<th className="border-r px-2 py-1 rounded-tr-xl">Giấy tờ kèm theo</th>
									</tr>
								</thead>
								<tbody>
									{dataDetailTPHSYeuCau &&
										dataDetailTPHSYeuCau?.map((iTPHSYeuCau, index) => {
											return (
												<tr className="border" key={index}>
													<td className="border-r px-2 py-1 text-center">{index + 1}</td>
													<td className="border-r px-2 py-1">
														<p className="">{iTPHSYeuCau?.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo}</p>
													</td>
													<td className="border-r px-2 py-1 text-center">
														<p className="">
															<Link to={iTPHSYeuCau?.MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_TenFile} target="_blank" className="text-[#336699] font-medium">
																Xem
															</Link>
														</p>
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>
						</div>
					</div>
					{/* END: Thông tin hồ sơ */}

					{/* START: Xử lý hồ sơ */}
					<div className="mb-4">
						<div className="tabs__xulyhoso flex flex-row gap-4 border-b pb-2 mb-4">
							<button
								type="button"
								onClick={handleShowXuLyHoSo}
								className={clsx(
									"px-3 py-1 rounded-md flex flex-row items-center gap-2 cursor-pointer hover:opacity-70",
									showXuLyHoSo ? "bg-[#0484AC] text-white" : "border border-[#0484AC] text-[#336699]"
								)}
							>
								<FaFileDownload />
								Xử lý hồ sơ
							</button>
							<button
								type="button"
								onClick={handleShowXuLyHoSo}
								className={clsx(
									"px-3 py-1 rounded-md flex flex-row items-center gap-2 cursor-pointer hover:opacity-70",
									showXuLyHoSo ? "border border-[#0484AC] text-[#336699]" : "bg-[#0484AC] text-white"
								)}
							>
								<FaListCheck />
								Quá trình xử lý hồ sơ
							</button>
						</div>
						{showXuLyHoSo ? (
							<div className="flex flex-row items-center gap-4">
								<button
									type="button"
									className="px-3 py-1 text-white rounded-lg font-semibold hover:opacity-70 bg-[#D85D17]"
									onClick={() => {
										handlePrevStep();
									}}
								>
									Chuyển bước trước
								</button>
								<button
									type="button"
									className="px-3 py-1 text-white rounded-lg font-semibold hover:opacity-70 bg-[#70C788]"
									onClick={() => {
										handleNextStep();
									}}
								>
									Chuyển bước tiếp
								</button>
								<button
									type="button"
									className="px-3 py-1 text-white rounded-lg font-semibold hover:opacity-70 bg-[#FF0000]"
									onClick={() => {
										handleCancelHoSo();
									}}
								>
									Hủy/trả hồ sơ
								</button>
							</div>
						) : (
							<div className="w-full">
								<table className="relative w-full left-0 right-0 border">
									<thead className="bg-[#336699] text-white">
										<tr className="border">
											<th>STT</th>
											<th>Nhân sự xử lý</th>
											<th>Hình thức xử lý</th>
											<th>Thời gian xử lý</th>
										</tr>
									</thead>
									<tbody>
										{listQuyTrinhXuLy.length > 0 &&
											listQuyTrinhXuLy?.map((iQTXuLy, index) => {
												return (
													<tr className="border-b" key={index}>
														<td className="border-r p-2 text-center">{index + 1}</td>
														<td className="border-r p-2 text-center">{iQTXuLy?.HoTen}</td>
														<td className="border-r p-2 text-center">{iQTXuLy?.MC_TTHC_GV_TrangThai_TenTrangThai}</td>
														<td className="p-2 text-center">
															{moment(iQTXuLy?.MC_TTHC_GV_GuiYeuCau_DateEditor, "YYYY-MM-DDTHH:mm:ss.SSS[Z]").format("DD/MM/YYYY HH:mm:ss")}
														</td>
													</tr>
												);
											})}
									</tbody>
								</table>
							</div>
						)}
					</div>
					{/* END: Xử lý hồ sơ */}
				</div>
			</div>
		);
	} else {
		return <p className="px-3 py-1 rounded-md bg-white text-red-500 text-center font-semibold">Không tìm thấy dữ liệu yêu cầu hợp lệ.</p>;
	}
}

export default ChiTietHoSoYeuCau;
