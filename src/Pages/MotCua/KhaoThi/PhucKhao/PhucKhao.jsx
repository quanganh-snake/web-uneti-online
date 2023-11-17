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
	const [listYeuCauQuaHan, setListYeuCauQuaHan] = useState([]);
	const [listYeuCauTrung, setListYeuCauTrung] = useState([]);
	const [listYeuCauThanhCong, setListYeuCauThanhCong] = useState([]);
	const [listYeuCau, setListYeuCau] = useState([]);

	const dataSV = DataSinhVien();
	const accessToken = dataSV.dataToken.token;
	const dispatch = useDispatch();
	let axiosJWT = createAxiosJWT(dataSV.dataToken, dispatch, accessToken);
	// event handlers
	const handleChangeValue = (e) => {
		if (e.target.id === "MC_KT_PhucKhao_TenDot") {
			setTenDot(e.target.value);
		}

		if (e.target.id === "MC_KT_PhucKhao_LoaiThi") {
			setLoaiThi(e.target.value);
		}
	};

	const handleRowSelection = (event, item) => {
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

		if (selectedRows.length === 0) {
			Swal.fire({
				icon: "error",
				title: "Lỗi",
				text: "Vui lòng chọn học phần cần phúc khảo!",
			});
			return;
		}

		selectedRows.forEach(async (iHocPhan) => {
			let strNgayThi = moment(iHocPhan.NgayThi).format("DD/MM/YYYY");

			let dataHocPhan = {};

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
			dataHocPhan.MC_KT_PhucKhao_MaLopHocPhan = iHocPhan.MaLopHocPhan ? iHocPhan.MaLopHocPhan : "null";
			dataHocPhan.MC_KT_PhucKhao_TenMonHoc = iHocPhan.TenMonHoc ? iHocPhan.TenMonHoc : "null";
			dataHocPhan.MC_KT_PhucKhao_KhoaChuQuanMon = iHocPhan.KhoaChuQuanMon ? iHocPhan.KhoaChuQuanMon : "null";
			dataHocPhan.MC_KT_PhucKhao_TenHinhThucThi = iHocPhan.TenHinhThucThi ? iHocPhan.TenHinhThucThi : "null";
			dataHocPhan.MC_KT_PhucKhao_NgayThi = iHocPhan.NgayThi
				? new Date(`${dataSV.NgaySinh.split("/")[2]}-${dataSV.NgaySinh.split("/")[1]}-${dataSV.NgaySinh.split("/")[0]}`).toISOString()
				: "null";
			dataHocPhan.MC_KT_PhucKhao_Thu = iHocPhan.Thu ? iHocPhan.Thu.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_Nhom = iHocPhan.Nhom ? iHocPhan.Nhom.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_TuTiet = iHocPhan.TuTiet ? iHocPhan.TuTiet.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_DenTiet = iHocPhan.DenTiet ? iHocPhan.DenTiet.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_LoaiThi = iHocPhan.LoaiThi ? iHocPhan.LoaiThi : "null";
			dataHocPhan.MC_KT_PhucKhao_TenPhong = iHocPhan.TenPhong ? iHocPhan.TenPhong : "null";
			dataHocPhan.MC_KT_PhucKhao_SBD = iHocPhan.SBD ? iHocPhan.SBD.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_DiemThi = iHocPhan.DiemThi ? iHocPhan.DiemThi.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_DiemThi1 = iHocPhan.DiemThi1 ? iHocPhan.DiemThi1.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_DiemThi2 = iHocPhan.DiemThi2 ? iHocPhan.DiemThi2.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_DiemTongKet = iHocPhan.DiemTongKet ? iHocPhan.DiemTongKet.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_DiemTongKet1 = iHocPhan.DiemTongKet1 ? iHocPhan.DiemTongKet1.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_DiemTongKet2 = iHocPhan.DiemTongKet2 ? iHocPhan.DiemTongKet2.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_TuiBaiThi = iHocPhan.TuiBaiThi ? iHocPhan.TuiBaiThi.toString() : "null";
			dataHocPhan.MC_KT_PhucKhao_SoPhach = iHocPhan.SoPhach ? iHocPhan.SoPhach.toString() : "null";

			// Kiểm tra học phần đã quá hạn phúc khảo chưa
			const checkQuaHanPhucKhao = await checkExpiredPhucKhao(strNgayThi, accessToken);

			if (Array.isArray(checkQuaHanPhucKhao.data.body)) {
				checkQuaHanPhucKhao.data?.body?.forEach((itemCheck) => {
					const { KetQua } = itemCheck;

					if (KetQua === "0") {
						// Học phần đã quá hạn phúc khảo
						setListYeuCauQuaHan([...listYeuCauQuaHan, dataHocPhan]);
					} else {
						// Học phần vẫn trong thời gian phúc khảo
						// 1. Check trùng
						// 2. Gửi yêu cầu
						setListYeuCau([...listYeuCau, dataHocPhan]);
						console.log(listYeuCau);
						// try {
						// 	postYeuCauPhucKhao(dataHocPhan, accessToken).then(async (response) => {
						// 		console.log("🚀 ~ file: PhucKhao.jsx:166 ~ postYeuCauPhucKhao ~ response:", response);
						// 		if (response.status === 200) {
						// 			if (response.data?.message === "Bản ghi bị trùng.") {
						// 				setListYeuCauTrung(response.data.body);
						// 			} else {
						// 				setListYeuCauThanhCong(response.data.body);
						// 				console.log(`>> line 165 - listThanhCong: ${response.data.body}`);
						// 			}
						// 		}
						// 	});
						// } catch (error) {
						// 	console.log(error.message);
						// }
					}
				});
			}
		});
	};

	useEffect(() => {
		getTenDot(axiosJWT, accessToken).then((res) => {
			setListHocKy(res?.data?.body);
		});

		setLoading(false);

		if (tenDot !== "" && loaiThi !== "") {
			setLoading(true);
			getAllHocPhanPhucKhao(dataSV.MaSinhVien, tenDot, loaiThi, accessToken).then((res) => {
				// console.log(res);
				setLoading(false);
				setListHocPhan(res?.data?.body);
			});
		}

		// return () => {
		// 	console.log("end");
		// };
	}, [tenDot, loaiThi]);

	useEffect(() => {}, [listHocPhan, listYeuCauQuaHan, listYeuCauTrung, listYeuCauThanhCong]);

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
																<p>{hocphan.Nhom}</p>
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
							{listYeuCauTrung.length > 0 ? (
								<p className="w-full px-3 py-2 bg-red-700 rounded-lg text-white font-semibold text-center">
									Yêu cầu cho môn học đã được gửi đi trước đó. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!
								</p>
							) : null}
							{listYeuCauQuaHan.length > 0 ? <p className="w-full px-3 py-2 bg-red-700 text-white font-semibold text-center">Môn học đã quá hạn gửi yêu cầu phúc khảo !</p> : null}
							{listYeuCauThanhCong.length > 0 ? (
								<p className="w-full px-3 py-2 bg-green-500 text-white font-semibold text-center">
									Môn học đã được gửi yêu cầu phúc khảo. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!
								</p>
							) : null}
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
