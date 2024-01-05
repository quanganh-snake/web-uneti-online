import clsx from "clsx";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";

import { FaCaretRight, FaCaretDown } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { FaCaretLeft, FaListCheck } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import SidebarTTHCGV from "../Sidebar/SidebarTTHCGV";
import { delThuTucHanhChinhGuiYeuCauByID, getHoSoGuiYeuCauById, getQuyTrinhXuLyCBNV, putHoSoThuTucGuiYeuCauById } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";
import moment from "moment";
import { getThanhPhanHoSoByIdTTHCGV, getThanhPhanHoSoGuiYeuCauById } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiThanhPhanHoSo";
import Swal from "sweetalert2";
import { getListTrangThaiTTHCGVByIDGoc, getTrangThaiIDBySTTYeuCauId, getTrangThaiIDGuiYeuCauXuLySTT } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiTrangThai";
import { toast } from "react-toastify";
import { NguonTiepNhan_WEB } from "./../../../../Services/Static/dataStatic";
import { TEMPLATE_SUBJECT_PENDING_EMAIL, TEMPLATE_SUBJECT_RECEIVED_EMAIL, sendEmailTTHCGiangVien } from "./../../../../Services/Utils/emailUtils";
import { DataCanBoGV } from "../../../../Services/Utils/dataCanBoGV";
import { compareStrings, convertBufferToBase64 } from "../../../../Services/Utils/stringUtils";
import Loading from "./../../../../Components/Loading/Loading";
import { DebounceInput } from "react-debounce-input";
import ReactPaginate from "react-paginate";
import { handlePreviewFileBase64 } from "../../../../Services/Utils/fileUtils";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { getListNoiTraKetQua } from "./../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";

function ChiTietHoSoYeuCau() {
	const { id } = useParams();

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
	const [listNoiTraKetQua, setListNoiTraKetQua] = useState(null);
	const [trangThaiGhiChu, setTrangThaiGhiChu] = useState("");
	const [listTrangThaiYeuCau, setListTrangThaiYeuCau] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchNoiTraKetQua, setSearchNoiTraKetQua] = useState("");
	const [openSelectNoiTraKetQua, setOpenSelectNoiTraKetQua] = useState(false);

	const navigate = useNavigate();

	let khoaGiangVien = "";
	const dataCBGV = DataCanBoGV();

	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 10;
	const pageCount = Math.ceil(listQuyTrinhXuLy?.length / parseInt(itemsPerPage));
	const paginateListQuyTrinhXuLy = listQuyTrinhXuLy?.slice(currentPage * parseInt(itemsPerPage), (currentPage + 1) * parseInt(itemsPerPage));

	// call data
	const getDataHoSoYeuCauById = async (id) => {
		const res = await getHoSoGuiYeuCauById(id);
		if (res.status === 200) {
			const data = await res.data?.body[0];
			setLoading(false);
			setDataDetailYeuCau(data);
			setNgayHenTra(data?.MC_TTHC_GV_GuiYeuCau_NgayHenTra);
			setNgayGiaoTra(data?.MC_TTHC_GV_GuiYeuCau_NgayGiaoTra);
			setTrangThaiGhiChu(data?.MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu);
		}
	};
	const getDataTPHSDeNghiYeuCauByIDGoc = async (id) => {
		const res = await getThanhPhanHoSoGuiYeuCauById(id);
		if (res.status === 200) {
			setDataDetailTPHSYeuCauYeuCau(res.data?.body);
			setLoading(false);
		}
	};
	const getDataTrinhTuThucHienYeuCauByIDGoc = async (id) => {
		const res = await getQuyTrinhXuLyCBNV(id);
		if (res.status === 200) {
			const data = await res.data?.body;
			setListQuyTrinhXuLy(data);
			setLoading(false);
		}
	};
	const getDataTrangThaiYeuCauByIDGoc = async (id) => {
		const res = await getListTrangThaiTTHCGVByIDGoc(id);
		if (res.status === 200) {
			const data = await res.data?.body;
			setListTrangThaiYeuCau(data);
			setLoading(false);
		}
	};

	const getListDataNoiTraKetQua = async () => {
		try {
			const res = await getListNoiTraKetQua();
			if (res.status === 200) {
				const data = await res.data?.body;
				setListNoiTraKetQua(data);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

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
		let listTPHSDeNghiYeuCau = [];
		try {
			const resListTPHSDeNghiYeuCau = await getThanhPhanHoSoByIdTTHCGV(dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_ID);
			if (resListTPHSDeNghiYeuCau.status === 200) {
				const data = await resListTPHSDeNghiYeuCau.data?.body;
				listTPHSDeNghiYeuCau = [...data];
			}
		} catch (error) {
			console.log(error.message);
		}

		if (trangThaiID == 0) {
			Swal.fire({
				title: "Hồ sơ yêu cầu chưa được tiếp nhận!",
				text: "Bạn có muốn tiếp nhận hồ sơ để tiếp tục xử lý yêu cầu?",
				icon: "question",
				showConfirmButton: true,
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Đồng ý",
				cancelButtonText: "Hủy",
			}).then(async (result) => {
				if (result.isConfirmed) {
					const resNewTrangThaiID = await getTrangThaiIDBySTTYeuCauId(yeuCauID, 1);
					if (resNewTrangThaiID.status === 200) {
						const dataTrangThaiIDNew = await resNewTrangThaiID.data?.body[0];
						if (dataTrangThaiIDNew) {
							const newDataUpdate = {
								...dataDetailYeuCau,
								MC_TTHC_GV_GuiYeuCau_TrangThai_ID: dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_ID,
								MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu: dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_MoTa
									? dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_MoTa
									: dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_TenTrangThai,
							};

							const resPutHoSoThuTuc = await putHoSoThuTucGuiYeuCauById(newDataUpdate);

							if (resPutHoSoThuTuc.status === 200) {
								Swal.fire({
									title: "Thông báo",
									text: "Đã tiếp nhận hồ sơ! Tiếp tục xử lý yêu cầu!",
									icon: "success",
								});

								sendEmailTTHCGiangVien(
									TEMPLATE_SUBJECT_RECEIVED_EMAIL,
									{ ...dataDetailYeuCau, ...newDataUpdate },
									dataCBGV,
									listTPHSDeNghiYeuCau,
									newDataUpdate.MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu
								).then((res) => console.log("SEND EMAIL OK"));
								getDataHoSoYeuCauById(id);
								getDataTrinhTuThucHienYeuCauByIDGoc(id);
							}
						} else {
							return Swal.fire({
								icon: "error",
								title: "Không tìm thấy trạng thái được thiết lập cho hồ sơ này để tiến hành cập nhật!",
							});
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
				MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu: trangThaiGhiChu,
				MC_TTHC_GV_GuiYeuCau_NgayGui: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayGui,
				MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong: dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong,
				MC_TTHC_GV_GuiYeuCau_DaNop: false,
				MC_TTHC_GV_GuiYeuCau_NgayHenTra: ngayHenTra,
				MC_TTHC_GV_GuiYeuCau_NgayGiaoTra: ngayGiaoTra,
				MC_TTHC_GV_GuiYeuCau_NoiTraKetQua: diaDiemTra,
				MC_TTHC_GV_GuiYeuCau_NguonTiepNhan: NguonTiepNhan_WEB,
			};

			// Ngày update
			let strCurrentDateHenTra = moment(dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayHenTra).format("DD/MM/YYYY HH:mm").toString();
			let strCurrentDateGiaoTra = moment(dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayGiaoTra).format("DD/MM/YYYY HH:mm").toString();
			let strNewDateHenTra = moment(ngayHenTra).format("DD/MM/YYYY HH:mm").toString();
			let strNewDateGiaoTra = moment(ngayGiaoTra).format("DD/MM/YYYY HH:mm").toString();

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
						if (compareStrings(newDataUpdate?.MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu, dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu) == true) {
							Swal.fire({
								icon: "error",
								title: "Vui lòng chỉnh sửa, thay đổi nội dung cập nhật yêu cầu để thông báo lại cho người gửi!",
							});
							return;
						}
						// return;
						const resUpdateYeuCau = await putHoSoThuTucGuiYeuCauById({
							...newDataUpdate,
							MC_TTHC_GV_GuiYeuCau_NgayHenTra: ngayHenTra ? moment(ngayHenTra).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]") : null,
							MC_TTHC_GV_GuiYeuCau_NgayGiaoTra: ngayGiaoTra ? moment(ngayGiaoTra).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]") : null,
							MC_TTHC_GV_GuiYeuCau_NoiTraKetQua: "",
						});

						if (resUpdateYeuCau.status === 200) {
							toast.success("Cập nhật thành công thông tin xử lý hồ sơ.");
							sendEmailTTHCGiangVien(
								TEMPLATE_SUBJECT_PENDING_EMAIL,
								{ ...dataDetailYeuCau, ...newDataUpdate },
								dataCBGV,
								listTPHSDeNghiYeuCau,
								newDataUpdate.MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu
							).then((res) => console.log("SEND EMAIL OK"));
							getDataHoSoYeuCauById(id);
							getDataTrinhTuThucHienYeuCauByIDGoc(id);
						}
					}
				});
				return;
			} else if (hinhThucTra == "2") {
				//Hình thức trả: trực tiếp
				if (!diaDiemTra) {
					return toast.error("Vui lòng chọn địa điểm giao trả!");
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
							const resUpdateYeuCau = await putHoSoThuTucGuiYeuCauById({
								...newDataUpdate,
								MC_TTHC_GV_GuiYeuCau_NgayHenTra: moment(ngayHenTra).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
								MC_TTHC_GV_GuiYeuCau_NgayGiaoTra: moment(ngayGiaoTra).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
								MC_TTHC_GV_GuiYeuCau_NoiTraKetQua: diaDiemTra,
							});
							if (resUpdateYeuCau.status === 200) {
								toast.success("Cập nhật thông tin thành công!");
								sendEmailTTHCGiangVien(
									TEMPLATE_SUBJECT_PENDING_EMAIL,
									{ ...dataDetailYeuCau, ...newDataUpdate },
									dataCBGV,
									listTPHSDeNghiYeuCau,
									newDataUpdate.MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu
								).then((res) => console.log("SEND EMAIL OK"));
								getDataHoSoYeuCauById(id);
								getDataTrinhTuThucHienYeuCauByIDGoc(id);
								return;
							}
						}
					});
					return;
				}
			} else {
				if (strNewDateHenTra != strCurrentDateHenTra || strNewDateGiaoTra != strCurrentDateGiaoTra) {
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
							const res = await putHoSoThuTucGuiYeuCauById(newDataUpdate);
							if (res.status === 200) {
								toast.success("Cập nhật thành công thông tin yêu cầu!");
								sendEmailTTHCGiangVien(
									TEMPLATE_SUBJECT_PENDING_EMAIL,
									{ ...dataDetailYeuCau, ...newDataUpdate },
									dataCBGV,
									listTPHSDeNghiYeuCau,
									newDataUpdate.MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu
								).then((res) => console.log("SEND EMAIL OK"));
								getDataHoSoYeuCauById(id);
								getDataTrinhTuThucHienYeuCauByIDGoc(id);
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

	const updateStepTrangThaiHoSoYeuCau = async (dataGuiYeuCau, type) => {
		let currentTrangThaiSTT;
		const resultListTrangThaiByIDGoc = await getListTrangThaiTTHCGVByIDGoc(dataGuiYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_ID);
		if (resultListTrangThaiByIDGoc.status === 200) {
			const listTrangThaiHoSo = await resultListTrangThaiByIDGoc.data?.body;
			console.log("🚀 ~ file: ChiTietHoSoYeuCau.jsx:343 ~ updateStepTrangThaiHoSoYeuCau ~ listTrangThaiHoSo:", listTrangThaiHoSo);
			if (listTrangThaiHoSo.length > 0) {
				for (let i = 0; i < listTrangThaiHoSo?.length; i++) {
					if (parseInt(dataGuiYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID) === parseInt(listTrangThaiHoSo[i].MC_TTHC_GV_TrangThai_ID)) {
						currentTrangThaiSTT = parseInt(listTrangThaiHoSo[i].MC_TTHC_GV_TrangThai_STT);
					}
				}
			}
		}

		const resultTrangThaiIDUpdate = await getTrangThaiIDGuiYeuCauXuLySTT(dataGuiYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_ID, currentTrangThaiSTT, type);

		if (resultTrangThaiIDUpdate.status === 200) {
			const dataTrangThaiIDUpdate = await resultTrangThaiIDUpdate.data?.body[0];
			if (dataTrangThaiIDUpdate?.MC_TTHC_GV_TrangThai_ID) {
				const dataUpdateNew = {
					MC_TTHC_GV_GuiYeuCau_ID: dataGuiYeuCau?.MC_TTHC_GV_GuiYeuCau_ID,
					MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu: dataGuiYeuCau?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu,
					MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email: dataGuiYeuCau?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email,
					MC_TTHC_GV_GuiYeuCau_NhanSuGui_SDT: dataGuiYeuCau?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_SDT,
					MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa: dataGuiYeuCau?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa,
					MC_TTHC_GV_GuiYeuCau_YeuCau_ID: dataGuiYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_ID,
					MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu: dataGuiYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu,
					MC_TTHC_GV_GuiYeuCau_TrangThai_ID: dataTrangThaiIDUpdate?.MC_TTHC_GV_TrangThai_ID,
					MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu: dataGuiYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu,
					MC_TTHC_GV_GuiYeuCau_NgayGui: dataGuiYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayGui,
					MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong: dataGuiYeuCau?.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong,
					MC_TTHC_GV_GuiYeuCau_DaNop: dataGuiYeuCau?.MC_TTHC_GV_GuiYeuCau_DaNop,
					MC_TTHC_GV_GuiYeuCau_NgayHenTra: dataGuiYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayHenTra,
					MC_TTHC_GV_GuiYeuCau_NgayGiaoTra: dataGuiYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayGiaoTra,
					MC_TTHC_GV_GuiYeuCau_NoiTraKetQua: dataGuiYeuCau?.MC_TTHC_GV_GuiYeuCau_NoiTraKetQua,
					MC_TTHC_GV_GuiYeuCau_NguonTiepNhan: dataGuiYeuCau?.MC_TTHC_GV_GuiYeuCau_NguonTiepNhan,
				};
				const responseUpdateSTTTrangThaiHoSo = await putHoSoThuTucGuiYeuCauById(dataUpdateNew);
				if (responseUpdateSTTTrangThaiHoSo.status === 200) {
					setLoading(false);
					getDataHoSoYeuCauById(id);
					getDataTPHSDeNghiYeuCauByIDGoc(id);
					getDataTrinhTuThucHienYeuCauByIDGoc(id);
					getDataTrangThaiYeuCauByIDGoc(id);
					return {
						status: 1,
						message: "Đã chuyển trạng thái hồ sơ thành công!",
					};
				}
			} else {
				if (type == "next") {
					return {
						status: -1,
						message: "Đã chuyển trạng thái hồ sơ đến bước tiếp theo thất bại! Do hồ sơ đang ở trạng thái cuối cùng.",
					};
				}

				if (type == "prev") {
					return {
						status: -1,
						message: "Đã chuyển trạng thái hồ sơ về bước trước thất bại! Do hồ sơ đang ở trạng thái mặc định được khởi tạo.",
					};
				}
			}
		}
	};

	const handlePrevStep = async (dataGuiYeuCau) => {
		const dataUpdate = await updateStepTrangThaiHoSoYeuCau(dataGuiYeuCau, "prev");
		if (dataUpdate?.status == 1) {
			return toast.success(dataUpdate?.message);
		}

		if (dataUpdate?.status == -1) {
			return toast.error(dataUpdate?.message);
		}
	};

	const handleNextStep = async (dataGuiYeuCau) => {
		const dataUpdate = await updateStepTrangThaiHoSoYeuCau(dataGuiYeuCau, "next");
		if (dataUpdate?.status == 1) {
			return toast.success(dataUpdate?.message);
		}

		if (dataUpdate?.status == -1) {
			return toast.error(dataUpdate?.message);
		}
	};

	const handleCancelHoSo = async (dataHoSoYeuCau) => {
		Swal.fire({
			icon: "question",
			title: "Bạn chắc chắn muốn hủy/trả yêu cầu này?",
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: "Đồng ý",
			cancelButtonText: "Hủy",
		}).then(async (result) => {
			if (result.isConfirmed) {
				if (dataHoSoYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu == "") {
					Swal.fire({
						icon: "error",
						title: "Vui lòng nhập nội dung chi tiết hủy/trả hồ sơ tại mục ghi chú!",
					});
					return;
				}
				// Thực hiện xóa
				delThuTucHanhChinhGuiYeuCauByID(dataHoSoYeuCau?.MC_TTHC_GV_GuiYeuCau_ID).then((res) => {
					Swal.fire({
						icon: "success",
						title: "Hủy/trả yêu cầu hồ sơ thành công!",
					});
					// Gửi email thông báo cho người dùng
					sendEmailTTHCGiangVien(dataHoSoYeuCau, dataCBGV, listTPHSDeNghiYeuCau, dataHoSoYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu).then((res) => {
						console.log(res.statusText);
					});
					navigate(-1);
					return;
				});
			}
		});
	};

	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected);
	};

	// effects
	useEffect(() => {
		getListDataNoiTraKetQua();
	}, []);
	useEffect(() => {
		getDataHoSoYeuCauById(id);
		getDataTPHSDeNghiYeuCauByIDGoc(id);
		getDataTrinhTuThucHienYeuCauByIDGoc(id);
		getDataTrangThaiYeuCauByIDGoc(id);
	}, [id, loading]);

	const displayedListQuyTrinhXuLy = useMemo(() => {
		if (!showXuLyHoSo) {
			return paginateListQuyTrinhXuLy;
		}
		return [];
	}, [paginateListQuyTrinhXuLy, showXuLyHoSo]);

	if (dataDetailYeuCau) {
		return (
			<>
				{loading ? (
					<div className="relative left-0 right-0 w-full flex items-center justify-center">
						<Loading />
					</div>
				) : (
					<div className="flex gap-4">
						<SidebarTTHCGV />
						<div className="w-full p-4 bg-white rounded-xl">
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
										<span className="font-semibold">
											{dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayGui && moment(dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayGui).format("DD/MM/YYYY")}
										</span>
									</p>

									<p className="col-span-1 mb-3">
										Ngày tiếp nhận:{" "}
										<span className="font-semibold">
											{dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayGui && moment(dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayGui).format("DD/MM/YYYY")}
										</span>
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
													value={moment(ngayHenTra).format("YYYY-MM-DDTHH:mm")}
													onChange={(e) => {
														setNgayHenTra(e.target.value);
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
													value={moment(ngayGiaoTra).format("YYYY-MM-DDTHH:mm")}
													onChange={(e) => {
														setNgayGiaoTra(e.target.value);
													}}
												/>
											</div>
											<div className="flex flex-col gap-2">
												<p>Hình thức giao trả:</p>
												<select className="p-2 border focus:outline-slate-400" name="HinhThucTra" id="HinhThucTra" onChange={handleChangeValue}>
													<option value="">Chọn hình thức giao trả</option>
													<option value="1">Trả online - Email</option>
													<option value="2">Trả trực tiếp</option>
												</select>
											</div>
											{hinhThucTra == "2" ? (
												<div className="flex flex-col gap-2">
													<p>Địa điểm giao trả:</p>
													<div className="col-span-4 md:col-span-2 relative">
														<div
															id="MC_TTHC_GV_GuiYeuCau_NoiTraKetQua"
															onClick={() => {
																setOpenSelectNoiTraKetQua(!openSelectNoiTraKetQua);
															}}
															className="bg-white w-full p-2 flex items-center justify-between rounded-md border border-slate-300 cursor-pointer"
														>
															<span className={clsx(diaDiemTra && "text-gray-700 font-semibold")}>{diaDiemTra ? diaDiemTra : "Chọn nơi trả kết quả"}</span>
															<BiChevronDown size={20} className={clsx(openSelectNoiTraKetQua && "rotate-180")} />
														</div>
														<ul
															className={clsx(
																"bg-white mt-2 border shadow-sm overflow-y-auto absolute right-0 left-0 top-full",
																openSelectNoiTraKetQua ? "max-h-60" : "hidden"
															)}
														>
															<div className="flex items-center px-2 sticky top-0 bg-white shadow-md">
																<AiOutlineSearch size={18} className="text-gray-700" />
																<input
																	type="text"
																	value={searchNoiTraKetQua}
																	onChange={(e) => {
																		setSearchNoiTraKetQua(e.target.value);
																	}}
																	placeholder="Nhập nơi trả kết quả..."
																	className="w-full placeholder:text-gray-500 p-2 outline-none"
																/>
															</div>
															{searchNoiTraKetQua ? (
																<li
																	className={clsx("font-semibold px-2 py-3 text-sm cursor-pointer hover:bg-sky-600 hover:text-white")}
																	onClick={() => {
																		setDiaDiemTra(searchNoiTraKetQua);
																		setOpenSelectNoiTraKetQua(false);
																		setSearchNoiTraKetQua("");
																	}}
																>
																	{searchNoiTraKetQua}
																</li>
															) : null}
															{listNoiTraKetQua &&
																listNoiTraKetQua?.map((iDiaChi, index) => {
																	return (
																		<li
																			key={index}
																			className={clsx(
																				"p-2 text-sm cursor-pointer hover:bg-sky-600 hover:text-white",
																				iDiaChi?.MC_TTHC_GV_NoiTraKetQua.toLowerCase().includes(searchNoiTraKetQua) ? "block" : "hidden"
																			)}
																			onClick={() => {
																				setDiaDiemTra(iDiaChi?.MC_TTHC_GV_NoiTraKetQua);
																				setOpenSelectNoiTraKetQua(false);
																				setSearchNoiTraKetQua("");
																			}}
																		>
																			{iDiaChi?.MC_TTHC_GV_NoiTraKetQua}
																		</li>
																	);
																})}
														</ul>
													</div>
												</div>
											) : null}

											<div className="flex flex-col gap-2 col-span-2">
												<p>Ghi chú:</p>
												<DebounceInput
													element="textarea"
													className="border border-slate-400 focus:outline-slate-500 p-2"
													placeholder="Nhập mô tả cập nhật/thay đổi"
													minLength={2}
													required={true}
													debounceTimeout={300}
													value={trangThaiGhiChu}
													onChange={(e) => setTrangThaiGhiChu(e.target.value)}
												/>
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
																<button
																	type="button"
																	className="text-[#336699] font-medium"
																	onClick={() => {
																		const base64StringWithoutPrefix = convertBufferToBase64(iTPHSYeuCau?.MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_DataFile?.data);
																		handlePreviewFileBase64(iTPHSYeuCau?.MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_TenFile, base64StringWithoutPrefix);
																	}}
																>
																	Xem
																</button>
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
								<h4 className="font-semibold my-4">
									Trạng thái hồ sơ yêu cầu hiện tại: <span className="text-red-600 uppercase">{dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu}</span>
								</h4>
								{showXuLyHoSo ? (
									<div className="flex flex-row items-center gap-4">
										<button
											type="button"
											className="px-3 py-1 text-white rounded-lg font-semibold hover:opacity-70 bg-[#D85D17]"
											onClick={() => {
												handlePrevStep(dataDetailYeuCau);
											}}
										>
											Chuyển bước trước
										</button>
										<button
											type="button"
											className="px-3 py-1 text-white rounded-lg font-semibold hover:opacity-70 bg-[#70C788]"
											onClick={() => {
												handleNextStep(dataDetailYeuCau);
											}}
										>
											Chuyển bước tiếp
										</button>
										<button
											type="button"
											className="px-3 py-1 text-white rounded-lg font-semibold hover:opacity-70 bg-[#FF0000]"
											onClick={() => {
												handleCancelHoSo({ ...dataDetailYeuCau, MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu: trangThaiGhiChu });
											}}
										>
											Hủy/trả hồ sơ
										</button>
									</div>
								) : (
									<div className="w-full">
										<table className="relative w-full left-0 right-0 border mb-4">
											<thead className="bg-[#336699] text-white">
												<tr className="border">
													<th className="border-r px-2">STT</th>
													<th className="border-r px-2">Nhân sự xử lý</th>
													<th className="border-r px-2">Hình thức xử lý</th>
													<th className="border-r px-2">Ngày hẹn trả hồ sơ</th>
													<th className="border-r px-2">Nơi trả kết quả</th>
													<th className="border-r px-2">Thời gian xử lý</th>
												</tr>
											</thead>
											<tbody>
												{displayedListQuyTrinhXuLy?.length > 0 &&
													displayedListQuyTrinhXuLy?.map((iQTXuLy, index) => {
														return (
															<tr className="border-b" key={index}>
																<td className="border-r p-2 text-center">{index + 1}</td>
																<td className="border-r p-2 text-center">{iQTXuLy?.HoTen}</td>
																<td className="border-r p-2 text-center">{iQTXuLy?.MC_TTHC_GV_TrangThai_TenTrangThai}</td>
																<td className="border-r p-2 text-center">
																	{iQTXuLy?.MC_TTHC_GV_GuiYeuCau_NgayHenTra
																		? moment(iQTXuLy?.MC_TTHC_GV_GuiYeuCau_NgayHenTra, "YYYY-MM-DDTHH:mm:ss.SSS[Z]").format("DD/MM/YYYY HH:mm:ss")
																		: null}
																</td>
																<td className="border-r p-2 text-center">{iQTXuLy?.MC_TTHC_GV_GuiYeuCau_NoiTraKetQua}</td>
																<td className="p-2 text-center">
																	{moment(iQTXuLy?.MC_TTHC_GV_GuiYeuCau_DateEditor, "YYYY-MM-DDTHH:mm:ss.SSS[Z]").format("DD/MM/YYYY HH:mm:ss")}
																</td>
															</tr>
														);
													})}
											</tbody>
										</table>
										<ReactPaginate
											previousLabel={<FaCaretLeft color="#336699" size={32} />}
											nextLabel={<FaCaretRight color="#336699" size={32} />}
											pageCount={pageCount}
											marginPagesDisplayed={2}
											pageRangeDisplayed={5}
											onPageChange={handlePageChange}
											containerClassName={"pagination"}
											pageClassName={"px-2 py-1 hover:text-white hover:font-semibold hover:bg-[#336699]"}
											activeClassName={"px-2 py-1 text-white font-semibold bg-[#336699]"}
											className="w-full flex items-center justify-end gap-1"
										/>
									</div>
								)}
							</div>
							{/* END: Xử lý hồ sơ */}
						</div>
					</div>
				)}
			</>
		);
	} else {
		return (
			<>
				{loading ? (
					<div className="relative left-0 right-0 w-full flex items-center justify-center">
						<Loading />
					</div>
				) : (
					<p className="px-3 py-1 rounded-md bg-white text-red-500 text-center font-semibold">Không tìm thấy dữ liệu yêu cầu hợp lệ.</p>
				)}
			</>
		);
	}
}

export default ChiTietHoSoYeuCau;
