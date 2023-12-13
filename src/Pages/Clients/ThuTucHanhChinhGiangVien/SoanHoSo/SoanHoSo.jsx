import React, { useEffect, useState } from "react";
import SoanHoSoView from "./SoanHoSoView";
import { useParams } from "react-router-dom";
import { getThuTucHanhChinhByID, postThanhPhanHoSoGuiYeuCau, postThuTucHanhChinhGuiYeuCau } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";
import { NguonTiepNhan_WEB } from "../../../../Services/Static/dataStatic";
import moment from "moment-timezone";
import { DataCanBoGV } from "../../../../Services/Utils/dataCanBoGV";
import { convertDataFileToBase64 } from "../../../../Services/Utils/stringUtils";
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

	const handleChangeInputFileTPHS = async (idGoc, idTPHS, e) => {
		const file = e.target.files[0];
		if (file) {
			let encodeFile = await convertDataFileToBase64(file).then((res) => res);
			let newItemThanhPhanHoSoFile = {
				...itemThanhPhanHoSoFile,
				MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_IDGoc: idGoc,
				MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_IDThanhPhanHoSo: idTPHS,
				MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_TenFile: file?.name,
				MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_DataFile: encodeFile,
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
			setItemThanhPhanHoSoFile((previewData) => {
				return {
					...previewData,
				};
			});
		}
	};

	const handleSubmitForm = async (e) => {
		e.preventDefault();
		const newDataHoSoYeuCau = {
			...dataHoSoYeuCau,
			MC_TTHC_GV_GuiYeuCau_YeuCau_ID: dataChiTietThuTuc?.ThongTinHoSo?.MC_TTHC_GV_ID ? dataChiTietThuTuc?.ThongTinHoSo?.MC_TTHC_GV_ID.toString() : "",
			MC_TTHC_GV_GuiYeuCau_TrangThai_ID: dataChiTietThuTuc?.TrangThai?.[0]?.MC_TTHC_GV_TrangThai_ID ? dataChiTietThuTuc?.TrangThai?.[0]?.MC_TTHC_GV_TrangThai_ID.toString() : "",
			MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu: dataChiTietThuTuc?.TrangThai?.[0]?.MC_TTHC_GV_TrangThai_TenTrangThai ? dataChiTietThuTuc?.TrangThai?.[0]?.MC_TTHC_GV_TrangThai_TenTrangThai : "",
			MC_TTHC_GV_GuiYeuCau_NgayGui: moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
		};

		if (Object.keys(newDataHoSoYeuCau).length > 0) {
			if (newDataHoSoYeuCau?.MC_TTHC_GV_GuiYeuCau_NoiTraKetQua == "") {
				toast.error("Vui lòng chọn nơi trả kết quả!");
				return;
			}
			const resultPostTTHCYeuCau = await postThuTucHanhChinhGuiYeuCau(newDataHoSoYeuCau);
			const resultPostThanhPhanHoSoYeuCau = await postThanhPhanHoSoGuiYeuCau(listThanhPhanHoSoFiles);

			if (resultPostTTHCYeuCau.status === 200 && resultPostThanhPhanHoSoYeuCau.status === 200) {
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Gửi yêu cầu thành công!",
					showConfirmButton: false,
					timer: 1500,
				});
			}
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
