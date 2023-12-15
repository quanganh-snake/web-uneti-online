import React, { useEffect, useState } from "react";
import SoanHoSoView from "./SoanHoSoView";
import { useParams } from "react-router-dom";
import {
	getGuiYeuCauHoSoThuTucKiemTraTrung,
	getThuTucHanhChinhByID,
	postThanhPhanHoSoGuiYeuCau,
	postThuTucHanhChinhGuiYeuCau,
} from "../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";
import { NguonTiepNhan_WEB } from "../../../../Services/Static/dataStatic";
import moment from "moment-timezone";
import { DataCanBoGV } from "../../../../Services/Utils/dataCanBoGV";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
function SoanHoSo() {
	const home = {
		path: "/tthcgiangvien",
		title: "TTHC Giảng Viên",
	};

	const breadcrumbs = [
		{
			path: "/tthcgiangvien/submit",
			title: "Soạn hồ sơ",
		},
	];

	const dataCBGV = DataCanBoGV();
	const { tieude, id } = useParams();
	const [dataChiTietThuTuc, setDataChiTietThuTuc] = useState(null);
	const [dataHoSoYeuCau, setDataHoSoYeuCau] = useState({
		MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu: dataCBGV.MaNhanSu,
		MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email: "",
		MC_TTHC_GV_GuiYeuCau_NhanSuGui_SDT: "",
		MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa: "",
		MC_TTHC_GV_GuiYeuCau_YeuCau_ID: id,
		MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu: "",
		MC_TTHC_GV_GuiYeuCau_TrangThai_ID: "",
		MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu: "",
		MC_TTHC_GV_GuiYeuCau_NgayGui: "",
		MC_TTHC_GV_GuiYeuCau_DaNop: "",
		MC_TTHC_GV_GuiYeuCau_NgayHenTra: "",
		MC_TTHC_GV_GuiYeuCau_NoiTraKetQua: "",
		MC_TTHC_GV_GuiYeuCau_NguonTiepNhan: NguonTiepNhan_WEB,
	});
	const [listThanhPhanHoSoFiles, setListThanhPhanHoSoFiles] = useState([]);
	const [itemThanhPhanHoSoFile, setItemThanhPhanHoSoFile] = useState({
		MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_IDGoc: "",
		MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_IDThanhPhanHoSo: "",
		MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_DataFile: "",
		MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_TenFile: "",
	});
	const [loading, setLoading] = useState(true);

	// event handlers

	const handleChangeInputFileTPHS = async (idTPHS, e) => {
		const { id, name, value, files } = e.target;
		if (value) {
			let newItemThanhPhanHoSoFile = {
				...itemThanhPhanHoSoFile,
				MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_IDGoc: "",
				MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_IDThanhPhanHoSo: idTPHS,
				MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_TenFile: value,
				MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_DataFile: "",
			};
			setItemThanhPhanHoSoFile(newItemThanhPhanHoSoFile);

			listThanhPhanHoSoFiles.forEach((item, index) => {
				if (
					item.MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_IDGoc == newItemThanhPhanHoSoFile.MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_IDGoc &&
					item.MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_IDThanhPhanHoSo == newItemThanhPhanHoSoFile.MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_IDThanhPhanHoSo
				) {
					listThanhPhanHoSoFiles.splice(index, 1);
				}
			});

			let newListTPHSFiles = [...listThanhPhanHoSoFiles, newItemThanhPhanHoSoFile];
			setListThanhPhanHoSoFiles(newListTPHSFiles);
		} else {
			setItemThanhPhanHoSoFile((previousData) => {
				return {
					...previousData,
				};
			});
		}
	};

	const handleSubmitForm = async (e) => {
		e.preventDefault();
		const newDataHoSoYeuCau = {
			...dataHoSoYeuCau,
			MC_TTHC_GV_GuiYeuCau_YeuCau_ID: dataChiTietThuTuc?.ThongTinHoSo?.MC_TTHC_GV_ID ? dataChiTietThuTuc?.ThongTinHoSo?.MC_TTHC_GV_ID.toString() : "",
			MC_TTHC_GV_GuiYeuCau_TrangThai_ID: "0",
			MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu: "",
			MC_TTHC_GV_GuiYeuCau_NgayGui: moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
		};

		if (Object.keys(newDataHoSoYeuCau).length > 0) {
			if (newDataHoSoYeuCau?.MC_TTHC_GV_GuiYeuCau_NoiTraKetQua == "") {
				toast.error("Vui lòng chọn nơi trả kết quả!");
				return;
			}
			let idGuiYeuCau;
			try {
				const resultKiemTraHoSoThuTucTrung = await getGuiYeuCauHoSoThuTucKiemTraTrung(
					dataCBGV.MaNhanSu,
					newDataHoSoYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_ID,
					newDataHoSoYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID
				);
				if (resultKiemTraHoSoThuTucTrung.status === 200) {
					const resultCountKiemTra = await resultKiemTraHoSoThuTucTrung?.data?.body?.length;

					if (resultCountKiemTra > 0) {
						Swal.fire({
							icon: "info",
							title: "Thông báo",
							html: `Yêu cầu cho hồ sơ <p class="font-semibold text-[#336699]">${dataChiTietThuTuc?.ThongTinHoSo?.MC_TTHC_GV_TenThuTuc}</p> đã được gửi lên trước đó. Vui lòng chờ kết quả phản hồi qua email. `,
						});
						return;
					} else {
						const resultPostTTHCYeuCau = await postThuTucHanhChinhGuiYeuCau(newDataHoSoYeuCau);

						if (resultPostTTHCYeuCau.status === 200) {
							const dataPostTTHCYeuCau = await resultPostTTHCYeuCau.data;
							console.log("🚀 ~ file: SoanHoSo.jsx:127 ~ handleSubmitForm ~ dataPostTTHCYeuCau:", dataPostTTHCYeuCau);
							const getIDGuiYeuCau = await getGuiYeuCauHoSoThuTucKiemTraTrung(
								dataCBGV.MaNhanSu,
								newDataHoSoYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_ID,
								newDataHoSoYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID
							);
							const dataIDGuiYeuCau = await getIDGuiYeuCau.data?.body[0];
							console.log("🚀 ~ file: SoanHoSo.jsx:128 ~ handleSubmitForm ~ dataKiemTraHoSoThuTucTrung:", dataIDGuiYeuCau);
							idGuiYeuCau = await dataIDGuiYeuCau?.MC_TTHC_GV_GuiYeuCau_ID;
							console.log("🚀 ~ file: SoanHoSo.jsx:129 ~ handleSubmitForm ~ idGuiYeuCau:", idGuiYeuCau);

							// UI-POST: Thanh Phan Ho So
							for (let i = 0; i < listThanhPhanHoSoFiles.length; i++) {
								listThanhPhanHoSoFiles[i].MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_IDGoc = idGuiYeuCau;
							}
							console.log(listThanhPhanHoSoFiles);
							// const resultPostTPHSGuiYeuCau = await postThanhPhanHoSoGuiYeuCau(listThanhPhanHoSoFiles);
						} else {
							Swal.fire({
								icon: "error",
								title: "Lỗi",
								text: "Đã có lỗi xảy ra!",
							});
							return;
						}
					}
				}
			} catch (error) {
				Swal.fire({
					title: "Đã có lỗi xảy ra",
					text: `${error.message}`,
				});
			}
			return;
			const resultPostThanhPhanHoSoYeuCau = await postThanhPhanHoSoGuiYeuCau(listThanhPhanHoSoFiles);
			console.log("🚀 ~ file: SoanHoSo.jsx:104 ~ handleSubmitForm ~ resultPostThanhPhanHoSoYeuCau:", resultPostThanhPhanHoSoYeuCau);

			if (resultPostTTHCYeuCau.status === 200 && resultPostThanhPhanHoSoYeuCau.status === 200) {
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Gửi yêu cầu thành công!",
					showConfirmButton: false,
					timer: 1500,
				});
			}
		} else {
			Swal.fire({
				icon: "error",
				title: "Lỗi",
				text: "Đã có lỗi xảy ra! Vui lòng kiểm tra thông tin nhập liệu.",
			});
		}
	};

	const handleCancelSubmit = () => {
		setDataHoSoYeuCau((previousData) => {
			return {
				...previousData,
			};
		});
		setListThanhPhanHoSoFiles([]);
	};

	// effects
	useEffect(() => {
		getThuTucHanhChinhByID(id)
			.then((res) => {
				if (res.status === 200) {
					const data = res.data;
					if (data) {
						setDataChiTietThuTuc(data);
						setLoading(false);
					}
				}
			})
			.catch((error) => {
				console.log(error);
			});

		return () => {
			setDataHoSoYeuCau((previousData) => {
				return {
					...previousData,
				};
			});
			setListThanhPhanHoSoFiles([]);
		};
	}, [id]);

	return (
		<SoanHoSoView
			home={home}
			breadcrumbs={breadcrumbs}
			tieude={tieude}
			id={id}
			loading={loading}
			dataChiTietThuTuc={dataChiTietThuTuc}
			dataHoSoYeuCau={dataHoSoYeuCau}
			setDataHoSoYeuCau={setDataHoSoYeuCau}
			itemThanhPhanHoSoFile={itemThanhPhanHoSoFile}
			setItemThanhPhanHoSoFile={setItemThanhPhanHoSoFile}
			listThanhPhanHoSoFiles={listThanhPhanHoSoFiles}
			setListThanhPhanHoSoFiles={setListThanhPhanHoSoFiles}
			handleChangeInputFileTPHS={handleChangeInputFileTPHS}
			handleSubmitForm={handleSubmitForm}
		/>
	);
}

export default SoanHoSo;
