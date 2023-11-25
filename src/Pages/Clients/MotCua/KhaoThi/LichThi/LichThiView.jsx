import React from "react";
import PropTypes from "prop-types";
import Breadcrumb from "../../../../../Components/Breadcumb/Breadcrumb";
import Loading from "../../../../../Components/Loading/Loading";
import moment from "moment";

function LichThiView(props) {
	const { home, breadcrumbs, loading, listHocKy, listLyDo, tenDot, dataLoaiThi, loaiThi, lyDo, listHocPhan, handleChangeValue, handleRowSelection, handleSubmitData } = props;
	return (
		<div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
			<div className="p-4 flex flex-col gap-4">
				<Breadcrumb home={home} breadcrumbs={breadcrumbs} />
				<div className="form-submit flex flex-col w-full justify-center">
					<h2 className="text-center uppercase text-2xl font-bold text-sky-800 mb-6">Tiếp nhận yêu cầu lịch thi</h2>
					<form className="lg:px-36" onSubmit={handleSubmitData}>
						{/* Start: Tên đọt - Học kỳ */}
						<div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
							<label htmlFor={"MC_KT_LichThi_TenDot"} className="md:w-[30%] mb-2 md:mb-0">
								Học kỳ (*)
							</label>
							<select id={"MC_KT_LichThi_TenDot"} onChange={handleChangeValue} className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800">
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
							<label htmlFor={"MC_KT_LichThi_LoaiThi"} className="md:w-[30%] mb-2 md:mb-0">
								Loại thi (*)
							</label>
							<select id={"MC_KT_LichThi_LoaiThi"} onChange={handleChangeValue} className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800">
								<option value={""}>Chọn loại thi</option>
								{dataLoaiThi.map((option) => (
									<option value={option.id} key={option.id}>
										{option.title}
									</option>
								))}
							</select>
						</div>
						{/* END: Tên đợt - Học kỳ */}
						{/* START: Lý do */}
						<div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
							<label htmlFor={"MC_KT_LichThi_YeuCau"} className="md:w-[30%] mb-2 md:mb-0">
								Lý do (*)
							</label>
							<select id={"MC_KT_LichThi_YeuCau"} onChange={handleChangeValue} className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800">
								<option value={""}>Chọn lý do</option>
								{listLyDo.map((itemLyDo) => (
									<option value={itemLyDo.value} key={itemLyDo.id}>
										{itemLyDo.title}
									</option>
								))}
							</select>
						</div>
						{/* END: Lý do */}

						{/* START: Table học phần */}
						<div className="relative overflow-x-auto shadow-md sm:rounded-lg my-6">
							{loading ? (
								<div className="w-full flex justify-center">
									<Loading />
								</div>
							) : tenDot !== "" && loaiThi !== "" && lyDo !== "" ? (
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

LichThiView.propTypes = {};

export default LichThiView;
