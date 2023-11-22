import React, { useEffect, useState } from "react";
import Breadcrumb from "./../../../../Components/Breadcumb/Breadcrumb";
import { dataLoaiThi } from "../../../../Services/Utils/dataStatic";
import { DataSinhVien } from "./../../../../Services/Utils/dataSinhVien";
import { getTenDot } from "../../../../Apis/MotCua/apiTenDot";
import { checkExpiredPhucKhao, getAllHocPhanPhucKhao, postYeuCauPhucKhao } from "../../../../Apis/MotCua/KhaoThi/PhucKhao/apiPhucKhao";
import Swal from "sweetalert2";
import Loading from "../../../../Components/Loading/Loading";
import moment from "moment/moment";
import { createAxiosJWT } from "../../../../Configs/http";
import { useDispatch } from "react-redux";
import { tokenSuccess } from "../../../../Services/Redux/Slice/authSlice";
import { toast } from "react-toastify";

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
	const [listYeuCau, setListYeuCau] = useState([]);
	const [listYeuCauQuaHan, setListYeuCauQuaHan] = useState([]);

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
				setSelectedRows([]);
			} else if (result.isDenied) {
				Swal.fire("Đã hủy gửi yêu cầu phúc khảo", "", "info");
				setSelectedRows([]);
			}
		});
	};

	const handlePostData = async (dataHocPhan) => {
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
				} else {
					const resPostData = await postYeuCauPhucKhao(axiosJWT, dataHocPhan, accessToken);

					if (resPostData.status === 200) {
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
								position: "top-end",
								icon: "success",
								title: `Học phần ${dataHocPhan.MC_KT_PhucKhao_TenMonHoc} đã được gửi phúc khảo thành công. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
								showConfirmButton: false,
								timer: 1500,
							});
						}
					}
					console.log("🚀 ~ file: PhucKhao.jsx:200 ~ data.forEach ~ resPostData:", resPostData);
				}
			}
		} catch (error) {
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
	}, [tenDot, loaiThi]);

	return (
		<div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
			<div className="p-4 flex flex-col gap-4">
				<Breadcrumb home={home} breadcrumbs={breadcrumbs} />
				<div className="form-submit flex flex-col w-full justify-center">
					<h2 className="text-center uppercase text-2xl font-bold text-sky-800 mb-6">Tiếp nhận yêu cầu phúc khảo kết quả học tập</h2>

					<form className="lg:px-36" onSubmit={handleSubmitData}>
						{/* Start: Tên đọt - Học kỳ */}
						<div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
							<label htmlFor={"MC_KT_PhucKhao_TenDot"} className="md:w-[30%] mb-2 md:mb-0">
								Học kỳ (*)
							</label>
							<select id={"MC_KT_PhucKhao_TenDot"} onChange={handleChangeValue} className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800">
								<option value={""}>Chọn học kỳ</option>
								{listHocKy.map((option) => (
									<option value={option.TenDot} key={option.TenDot}>
										{option.TenDot}
									</option>
								))}
							</select>
						</div>
						{/* END: Tên đợt - Học kỳ */}
						{/* Start: Tên đọt - Học kỳ */}
						<div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
							<label htmlFor={"MC_KT_PhucKhao_LoaiThi"} className="md:w-[30%] mb-2 md:mb-0">
								Loại thi (*)
							</label>
							<select id={"MC_KT_PhucKhao_LoaiThi"} onChange={handleChangeValue} className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800">
								<option value={""}>Chọn loại thi</option>
								{dataLoaiThi.map((option) => (
									<option value={option.id} key={option.id}>
										{option.title}
									</option>
								))}
							</select>
						</div>
						{/* END: Tên đợt - Học kỳ */}
						{/* START: Table học phần */}
						<div className="relative overflow-x-auto shadow-md sm:rounded-lg my-6">
							{loading ? (
								<div className="w-full flex justify-center">
									<Loading />
								</div>
							) : tenDot !== "" && loaiThi !== "" ? (
								<>
									<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
										<thead className="text-xs text-white uppercase bg-sky-800 dark:bg-gray-700 dark:text-gray-400">
											<tr className="text-center">
												<th scope="col" className="p-4 border border-r">
													STT
												</th>
												<th scope="col" className="p-4 border border-r">
													Chọn
												</th>
												<th scope="col" className="px-6 py-3 whitespace-nowrap border border-r">
													Mã lớp học phần
												</th>
												<th scope="col" className="px-6 py-3 whitespace-nowrap border border-r">
													Tên học phần
												</th>
												<th scope="col" className="px-6 py-3 whitespace-nowrap border border-r">
													Hình thức thi
												</th>
												<th scope="col" className="px-6 py-3 whitespace-nowrap border border-r">
													Ngày thi
												</th>
												<th scope="col" className="px-6 py-3 border border-r">
													Nhóm
												</th>
												<th scope="col" className="px-6 py-3 border border-r">
													Tiết
												</th>
												<th scope="col" className="px-6 py-3 whitespace-nowrap border border-r">
													Phòng thi
												</th>
												<th scope="col" className="px-6 py-3 whitespace-nowrap border border-r">
													Số báo danh
												</th>
												<th scope="col" className="whitespace-nowrap text-center border">
													<p className="border-b w-full py-3">Điểm</p>
													<table>
														<tbody>
															<tr>
																<td className="whitespace-nowrap border-r">
																	<p className="py-2 border-b">Điểm thi</p>
																	<table>
																		<tbody>
																			<tr>
																				<td className="whitespace-nowrap px-6 py-2 border-r">Lần 1</td>
																				<td className="whitespace-nowrap px-6 py-2">Thi lại</td>
																			</tr>
																		</tbody>
																	</table>
																</td>
																<td className="whitespace-nowrap border-r">
																	<p className="py-2 border-b">Điểm tổng kết</p>
																	<table>
																		<tbody>
																			<tr>
																				<td className="whitespace-nowrap px-6 py-2 border-r">Lần 1</td>
																				<td className="whitespace-nowrap px-6 py-2">Thi lại</td>
																			</tr>
																		</tbody>
																	</table>
																</td>
															</tr>
														</tbody>
													</table>
												</th>
											</tr>
										</thead>
										<tbody>
											{listHocPhan && listHocPhan.length > 0 ? (
												listHocPhan.map((hocphan, index) => {
													return (
														<tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
															<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
																{index + 1}
															</th>
															<td className="w-4 p-4">
																<div className="flex justify-center">
																	<input
																		onChange={(e) => {
																			handleRowSelection(e, hocphan);
																		}}
																		id="checkbox-table-1"
																		type="checkbox"
																		className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
																	/>
																	<label htmlFor="checkbox-table-1" className="sr-only">
																		checkbox
																	</label>
																</div>
															</td>
															<th scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
																{hocphan.MaLopHocPhan}
															</th>
															<td className="px-6 py-4 whitespace-nowrap">
																<p>{hocphan.TenMonHoc}</p>
															</td>
															<td className="px-6 py-4">
																<p>{hocphan.TenHinhThucThi}</p>
															</td>
															<td className="px-6 py-4 whitespace-nowrap">
																<p>
																	{hocphan.Thu == 8 ? "Chủ nhật" : "Thứ " + hocphan.Thu} {", "}
																	{moment(hocphan.NgayThi).format("DD/MM/YYYY")}
																</p>
															</td>
															<td className="px-6 py-4">
																<p className="text-center">{hocphan.Nhom}</p>
															</td>
															<td className="px-6 py-4 whitespace-nowrap">
																<p>
																	{hocphan.TuTiet} {" - "} {hocphan.DenTiet}
																</p>
															</td>
															<td className="px-6 py-4 whitespace-nowrap">
																<p>{hocphan.TenPhong}</p>
															</td>
															<td className="px-6 py-4 whitespace-nowrap">
																<p className="text-center">{hocphan.SBD ? hocphan.SBD : ""}</p>
															</td>
															<td className="whitespace-nowrap">
																<div className="w-full flex items-center">
																	<div className="w-1/2 flex items-center">
																		<p className="px-6 py-4 text-center w-1/2">{hocphan.DiemThi ? hocphan.DiemThi : hocphan.DiemThi1 ? hocphan.DiemThi1 : ""}</p>
																		<p className="px-6 py-4 text-center w-1/2">{hocphan.DiemThi2 ? hocphan.DiemThi2 : ""}</p>
																	</div>
																	<div className="w-1/2 flex items-center">
																		<p className="px-6 py-4 text-center w-1/2">
																			{hocphan.DiemTongKet ? hocphan.DiemTongKet : hocphan.DiemTongKet1 ? hocphan.DiemTongKet1 : ""}
																		</p>
																		<p className="px-6 py-4 text-center w-1/2">{hocphan.DiemTongKet2 ? hocphan.DiemTongKet2 : ""}</p>
																	</div>
																</div>
															</td>
														</tr>
													);
												})
											) : (
												<tr>
													<td colSpan={`10`}>
														<p className="p-4 text-center font-bold text-red-600">Không có dữ liệu!</p>
													</td>
												</tr>
											)}
										</tbody>
									</table>
								</>
							) : null}
						</div>

						{/* END: Table học phần */}
						<div className="uneti-notify my-4">
							<p className="w-full font-bold text-red-600">*Lưu ý: Lệ phí phúc khảo kết quả học tập: Có mức thu theo quy định, được chuyển trực tiếp vào công nợ của SV.</p>
							{/* {listYeuCauTrung.length > 0 ? (
								<p className="w-full px-3 py-2 bg-red-700 rounded-lg text-white font-semibold text-center">
									Yêu cầu cho môn học đã được gửi đi trước đó. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!
								</p>
							) : null}
							{listYeuCauQuaHan.length > 0 ? (
								<p className="w-full px-3 py-2 bg-red-600 rounded-lg text-white font-semibold text-center">Môn học {listYeuCauQuaHan.join(", ")} đã quá hạn gửi yêu cầu phúc khảo !</p>
							) : null}
							{listYeuCauThanhCong.length > 0 ? (
								<p className="w-full px-3 py-2 bg-green-500 text-white font-semibold text-center">
									Môn học đã được gửi yêu cầu phúc khảo. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!
								</p>
							) : null} */}
						</div>
						<div className="uneti-action flex justify-center">
							<button type="submit" className="px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-full hover:bg-sky-800 hover:text-white">
								Gửi yêu cầu
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default PhucKhao;
