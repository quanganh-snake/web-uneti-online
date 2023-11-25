import React from "react";
import PhucKhaoView from "./PhucKhaoView";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { getTenDot } from "../../../../../Apis/MotCua/apiTenDot";
import { checkExpiredPhucKhao, getAllHocPhanPhucKhao, postYeuCauPhucKhao } from "../../../../../Apis/MotCua/KhaoThi/apiPhucKhao";
import { DataSinhVien } from "../../../../../Services/Utils/dataSinhVien";
import { createAxiosJWT } from "../../../../../Configs/http";
import { tokenSuccess } from "../../../../../Services/Redux/Slice/authSlice";
import moment from "moment";
import { dataLoaiThi } from "../../../../../Services/Static/dataStatic";
function PhucKhao() {
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
			path: "/motcua/khaothi/phuckhao",
			title: "Phúc khảo",
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
	const handleChangeValue = (e) => {
		if (e.target.id === "MC_KT_PhucKhao_TenDot") {
			setTenDot(e.target.value);
		}

		if (e.target.id === "MC_KT_PhucKhao_LoaiThi") {
			setLoaiThi(e.target.value);
		}
	};

	const handleRowSelection = async (event, item) => {
		if (event.target.checked) {
			// Thêm vào mảng yeucau
			setSelectedRows([...selectedRows, item]);
		} else {
			// Xóa khỏi mảng yeucau
			const updatedYeucau = selectedRows.filter((yeucauItem) => yeucauItem !== item);
			setSelectedRows(updatedYeucau);
		}
	};

	const handleSubmitData = async (e) => {
		e.preventDefault();

		if (tenDot === "") {
			Swal.fire({
				icon: "error",
				title: "Lỗi",
				text: "Vui lòng chọn học kỳ!",
			});
			return;
		}

		if (loaiThi === "") {
			Swal.fire({
				icon: "error",
				title: "Lỗi",
				text: "Vui lòng chọn loại thi!",
			});
			return;
		}

		if (selectedRows.length > 1 || selectedRows.length === 0) {
			Swal.fire({
				icon: "error",
				title: "Lỗi",
				text: "Vui lòng chọn 1 học phần cần phúc khảo!",
			});
			return;
		}

		const itemHocPhan = selectedRows[0];
		console.log("🚀 ~ file: PhucKhao.jsx:96 ~ handleSubmitData ~ itemHocPhan:", itemHocPhan);

		let dataHocPhan = {};
		if (itemHocPhan) {
			// Data post API
			dataHocPhan.MC_KT_PhucKhao_TenCoSo = dataSV.CoSo ? dataSV.CoSo : "null";
			dataHocPhan.MC_KT_PhucKhao_TenDot = tenDot ?? "null";
			dataHocPhan.MC_KT_PhucKhao_MaSinhVien = dataSV.MaSinhVien ? dataSV.MaSinhVien : "null";
			dataHocPhan.MC_KT_PhucKhao_HoDem = dataSV.HoDem ? dataSV.HoDem : "null";
			dataHocPhan.MC_KT_PhucKhao_Ten = dataSV.Ten ? dataSV.Ten : "null";
			dataHocPhan.MC_KT_PhucKhao_GioiTinh = dataSV.GioiTinh ?? "null";
			dataHocPhan.MC_KT_PhucKhao_TenHeDaoTao = dataSV.BacDaoTao ? dataSV.BacDaoTao : "null";
			dataHocPhan.MC_KT_PhucKhao_TenLoaiHinhDT = dataSV.LoaiHinhDaoTao ? dataSV.LoaiHinhDaoTao : "null";
			dataHocPhan.MC_KT_PhucKhao_TenKhoaHoc = dataSV.KhoaHoc ? dataSV.KhoaHoc : "null";
			dataHocPhan.MC_KT_PhucKhao_TenNganh = dataSV.ChuyenNganh ? dataSV.ChuyenNganh : "null";
			dataHocPhan.MC_KT_PhucKhao_TenNghe = dataSV.ChuyenNganh ? dataSV.ChuyenNganh : "null";
			dataHocPhan.MC_KT_PhucKhao_TenLop = dataSV.LopHoc ? dataSV.LopHoc : "null";
			dataHocPhan.MC_KT_PhucKhao_DienThoai = dataSV.SoDienThoai ? dataSV.SoDienThoai : dataSV.SoDienThoai2 ? dataSV.SoDienThoai2 : dataSV.SoDienThoai3 ? dataSV.SoDienThoai3 : "";
			dataHocPhan.MC_KT_PhucKhao_Email = dataSV.Email_TruongCap ? dataSV.Email_TruongCap : "null";
			dataHocPhan.MC_KT_PhucKhao_IDSinhVien = dataSV.IdSinhVien ? dataSV.IdSinhVien.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_NgaySinh2 = dataSV.NgaySinh
				? new Date(`${dataSV.NgaySinh.split("/")[2]}-${dataSV.NgaySinh.split("/")[1]}-${dataSV.NgaySinh.split("/")[0]}`).toISOString()
				: "null";
			// data trong Tables
			dataHocPhan.MC_KT_PhucKhao_MaLopHocPhan = itemHocPhan.MaLopHocPhan ? itemHocPhan.MaLopHocPhan : "null";
			dataHocPhan.MC_KT_PhucKhao_TenMonHoc = itemHocPhan.TenMonHoc ? itemHocPhan.TenMonHoc : "null";
			dataHocPhan.MC_KT_PhucKhao_KhoaChuQuanMon = itemHocPhan.KhoaChuQuanMon ? itemHocPhan.KhoaChuQuanMon : "null";
			dataHocPhan.MC_KT_PhucKhao_TenHinhThucThi = itemHocPhan.TenHinhThucThi ? itemHocPhan.TenHinhThucThi : "null";
			dataHocPhan.MC_KT_PhucKhao_NgayThi = itemHocPhan.NgayThi ? itemHocPhan.NgayThi : "null";
			dataHocPhan.MC_KT_PhucKhao_Thu = itemHocPhan.Thu ? itemHocPhan.Thu.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_Nhom = itemHocPhan.Nhom ? itemHocPhan.Nhom.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_TuTiet = itemHocPhan.TuTiet ? itemHocPhan.TuTiet.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_DenTiet = itemHocPhan.DenTiet ? itemHocPhan.DenTiet.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_LoaiThi = itemHocPhan.LoaiThi ? itemHocPhan.LoaiThi : "null";
			dataHocPhan.MC_KT_PhucKhao_TenPhong = itemHocPhan.TenPhong ? itemHocPhan.TenPhong : "null";
			dataHocPhan.MC_KT_PhucKhao_SBD = itemHocPhan.SBD ? itemHocPhan.SBD.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_DiemThi = itemHocPhan.DiemThi ? itemHocPhan.DiemThi.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_DiemThi1 = itemHocPhan.DiemThi1 ? itemHocPhan.DiemThi1.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_DiemThi2 = itemHocPhan.DiemThi2 ? itemHocPhan.DiemThi2.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_DiemTongKet = itemHocPhan.DiemTongKet ? itemHocPhan.DiemTongKet.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_DiemTongKet1 = itemHocPhan.DiemTongKet1 ? itemHocPhan.DiemTongKet1.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_DiemTongKet2 = itemHocPhan.DiemTongKet2 ? itemHocPhan.DiemTongKet2.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_TuiBaiThi = itemHocPhan.TuiBaiThi ? itemHocPhan.TuiBaiThi.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_SoPhach = itemHocPhan.SoPhach ? itemHocPhan.SoPhach.toString() : "null";
		}

		// handle post
		Swal.fire({
			title: "Bạn chắc chắn muốn gửi yêu cầu phúc khảo?",
			showDenyButton: true,
			showCancelButton: false,
			confirmButtonText: "Gửi",
			denyButtonText: `Hủy`,
		}).then(async (result) => {
			if (result.isConfirmed) {
				await handlePostData(dataHocPhan);
			} else if (result.isDenied) {
				Swal.fire("Đã hủy gửi yêu cầu phúc khảo", "", "info");
			}
		});
	};

	const handlePostData = async (dataHocPhan) => {
		console.log("🚀 ~ file: PhucKhao.jsx:158 ~ handlePostData ~ dataHocPhan:", dataHocPhan);
		// Kiểm tra học phần đã quá hạn phúc khảo chưa
		try {
			console.log(`item.NgayThi: `, dataHocPhan.MC_KT_PhucKhao_NgayThi);
			const checkQuaHanPhucKhao = await checkExpiredPhucKhao(axiosJWT, moment(dataHocPhan.MC_KT_PhucKhao_NgayThi).format("DD/MM/YYYY"), accessToken);
			if (checkQuaHanPhucKhao.status === 200) {
				const { KetQua } = checkQuaHanPhucKhao.data?.body[0];
				console.log("🚀 ~ file: PhucKhao.jsx:151 ~ selectedRows.forEach ~ KetQua:", KetQua, " - môn", dataHocPhan.MC_KT_PhucKhao_TenMonHoc);
				if (KetQua === 0) {
					Swal.fire({
						icon: "error",
						title: "Thông báo quá hạn",
						text: `Học phần ${dataHocPhan.MC_KT_PhucKhao_TenMonHoc} đã hết hạn gửi yêu cầu phúc khảo!`,
					});
					return;
				}
				const resPostData = await postYeuCauPhucKhao(axiosJWT, dataHocPhan, accessToken);
				console.log("🚀 ~ file: PhucKhao.jsx:200 ~ data.forEach ~ resPostData:", resPostData);

				if ((await resPostData) == "ERR_BAD_REQUEST") {
					Swal.fire({
						icon: "error",
						title: "Lỗi hệ thống",
						text: `Vui lòng thử lại và gửi thông báo lỗi cho bộ phận hỗ trợ phần mềm!`,
					});
					return;
				}
				if ((await resPostData.status) === 200) {
					const data = await resPostData.data;

					// Check bản ghi trùng
					if (data.message === "Bản ghi bị trùng.") {
						Swal.fire({
							icon: "error",
							title: "Thông báo quá hạn",
							text: `Học phần ${dataHocPhan.MC_KT_PhucKhao_TenMonHoc} đã được gửi phúc khảo trước đấy. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
						});
					} else {
						Swal.fire({
							position: "center",
							icon: "success",
							title: `Học phần ${dataHocPhan.MC_KT_PhucKhao_TenMonHoc} đã được gửi phúc khảo thành công. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
							showConfirmButton: false,
							timer: 1500,
						});

						setTimeout(() => {
							window.location.reload();
						}, 1000);
					}
				}
			}
		} catch (error) {
			console.log(error);
			if (!error.response) {
				console.log(`Server not response.`);
			} else {
				console.log(`Error `, {
					errorResponse: error.response,
					errorMessage: error.message,
				});
			}
		}
	};

	useEffect(() => {
		getTenDot(axiosJWT, accessToken).then((res) => {
			setListHocKy(res?.data?.body);
		});

		setLoading(false);

		if (tenDot !== "" && loaiThi !== "") {
			setLoading(true);
			getAllHocPhanPhucKhao(axiosJWT, dataSV.MaSinhVien, tenDot, loaiThi, accessToken).then((res) => {
				setLoading(false);
				setListHocPhan(res?.data?.body);
			});
		}

		return () => {
			setListHocPhan([]);
		};
	}, [tenDot, loaiThi]);

	return (
		<PhucKhaoView
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

export default PhucKhao;
