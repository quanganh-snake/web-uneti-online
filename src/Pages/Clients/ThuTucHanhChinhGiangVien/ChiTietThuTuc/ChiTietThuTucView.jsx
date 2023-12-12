import React from "react";
import PropTypes from "prop-types";
import SidebarTTHCGV from "../SidebarTTHCGV/SidebarTTHCGV";
import Breadcrumb from "../../../../Components/Breadcumb/Breadcrumb";
import { Link, useParams } from "react-router-dom";
import Loading from "./../../../../Components/Loading/Loading";
import jsPDF from "jspdf";

function ChiTietThuTucView({ idThuTuc, home, breadcrumbs, loading, dataThuTuc }) {
	const { tieude, id } = useParams();
	if (typeof dataThuTuc !== "object" || dataThuTuc === null) {
		return null;
	}

	const { ThongTinHoSo, ThanhPhanHoSo, TrinhTuThucHien } = dataThuTuc;

	const handleDownloadFile = (fileName, dataFile) => {
		console.log("🚀 ~ file: ChiTietThuTucView.jsx:18 ~ handleDownloadFile ~ dataFile:", dataFile);
		const blob = new Blob([dataFile?.data], { type: "application/octet-stream" });
		console.log("🚀 ~ file: ChiTietThuTucView.jsx:19 ~ handleDownloadFile ~ blob:", blob);
		const url = window.URL.createObjectURL(blob);
		// Tạo một liên kết và bấm vào nó để tải xuống
		const link = document.createElement("a");
		link.href = url;
		link.download = fileName; // Tên file bạn muốn đặt
		document.body.appendChild(link);
		link.click();

		// Giải phóng tài nguyên
		window.URL.revokeObjectURL(url);
	};

	const readFile = (dataFile) => {
		const fr = new FileReader();
		fr.readAsDataURL(dataFile);
		fr.addEventListener("load", () => {
			const res = fr.result;
			console.log(res);
		});
	};

	return (
		<>
			<div className="">
				{loading ? (
					<Loading />
				) : (
					<div className="flex flex-col md:flex-row gap-2">
						<div className="flex-grow-1 bg-white p-4">
							<SidebarTTHCGV />
						</div>
						<div className="flex-grow-2 bg-white w-full p-4">
							<Breadcrumb home={home} breadcrumbs={breadcrumbs} />
							<div className="mt-4 mb-2 flex flex-row justify-between">
								<p className="px-3 py-1 bg-white text-[#336699] border border-[#336699] rounded-md font-semibold">Thông tin thủ tục</p>
								<Link to={`/tthcgiangvien/soanhoso/${tieude}/${id}/submit`} className="px-3 py-1 bg-[#336699] text-white rounded-md hover:opacity-70">
									Nộp hồ sơ
								</Link>
							</div>
							<div className="">
								<table className="w-full">
									<tbody>
										<tr>
											<td className="px-4 py-1 border border-slate-500 font-semibold">Lĩnh vực</td>
											<td className="px-4 py-1 border border-slate-500">{ThongTinHoSo?.MC_TTHC_GV_LinhVuc}</td>
										</tr>
										<tr>
											<td className="px-4 py-1 border border-slate-500 font-semibold">Mã thủ tục</td>
											<td className="px-4 py-1 border border-slate-500">{ThongTinHoSo?.MC_TTHC_GV_MaThuTuc}</td>
										</tr>
										<tr>
											<td className="px-4 py-1 border border-slate-500 font-semibold">Tên thủ tục</td>
											<td className="px-4 py-1 border border-slate-500">
												<div className="uppercase font-semibold text-[#0C4A6E]">{ThongTinHoSo?.MC_TTHC_GV_TenThuTuc}</div>
											</td>
										</tr>
										<tr>
											<td className="px-4 py-1 border border-slate-500 font-semibold">Thủ tục liên thông</td>
											<td className="px-4 py-1 border border-slate-500">
												<input type="checkbox" defaultChecked={ThongTinHoSo?.MC_TTHC_GV_ThuTucLienThong} disabled name="" id="" />
											</td>
										</tr>
										<tr>
											<td className="px-4 py-1 border border-slate-500 font-semibold">Thủ tục không áp dụng Một cửa</td>
											<td className="px-4 py-1 border border-slate-500">
												<input type="checkbox" defaultChecked={ThongTinHoSo?.MC_TTHC_GV_ThuTucKhongApDungMC} disabled name="" id="" />
											</td>
										</tr>
										<tr>
											<td className="px-4 py-1 border border-slate-500 font-semibold">Thành phần hồ sơ đề nghị</td>
											<td className="px-4 py-1 border border-slate-500">
												{ThanhPhanHoSo && ThanhPhanHoSo.length > 0 ? (
													<table className="table-auto w-full">
														<thead className="bg-[#075985] text-white">
															<tr>
																<th className="rounded-tl-xl px-2 py-1">STT</th>
																<th className="border border-slate-300 px-2 py-1">Tên giấy tờ</th>
																<th className="border border-slate-300 px-2 py-1 lg:whitespace-nowrap">Mẫu hồ sơ/Hướng dẫn</th>
																<th className="border border-slate-300 px-2 py-1 lg:whitespace-nowrap">Bản chính</th>
																<th className="border border-slate-300 px-2 py-1 lg:whitespace-nowrap">Bản sao</th>
																<th className="rounded-tr-xl px-2 py-1 lg:whitespace-nowrap">Bắt buộc</th>
															</tr>
														</thead>
														<tbody>
															{ThanhPhanHoSo?.map((iThanhPhanHoSo, index) => {
																return (
																	<tr key={index}>
																		<td className="border border-slate-300 text-center">{index + 1}</td>
																		<td className="border border-slate-300">
																			<p className="px-2">{iThanhPhanHoSo.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo}</p>
																		</td>
																		<td className="border border-slate-300">
																			<div className="px-2">
																				<ol>
																					<li>
																						<div
																							className="text-[#0C4A6E] font-semibold cursor-pointer hover:opacity-70"
																							onClick={() => {
																								handleDownloadFile(
																									iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_TenFile,
																									iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_DataFile
																								);
																							}}
																						>
																							{index + 1}. {iThanhPhanHoSo.MC_TTHC_GV_ThanhPhanHoSo_TenFile}
																						</div>
																					</li>
																				</ol>
																			</div>
																		</td>
																		<td className="border border-slate-300 text-center">
																			<input type="checkbox" defaultChecked={iThanhPhanHoSo.MC_TTHC_GV_ThanhPhanHoSo_BanChinh} disabled={true} />
																		</td>
																		<td className="border border-slate-300 text-center">
																			<input type="checkbox" defaultChecked={iThanhPhanHoSo.MC_TTHC_GV_ThanhPhanHoSo_BanSao} disabled={true} />
																		</td>
																		<td className="border border-slate-300 text-center">
																			<input type="checkbox" defaultChecked={iThanhPhanHoSo.MC_TTHC_GV_ThanhPhanHoSo_BatBuoc} disabled={true} />
																		</td>
																	</tr>
																);
															})}
														</tbody>
													</table>
												) : (
													<p className="px-2 font-semibold text-center">Không có thành phần hồ sơ đề nghị</p>
												)}
											</td>
										</tr>
										<tr>
											<td className="px-4 py-1 border border-slate-500 font-semibold">Số bộ hồ sơ</td>
											<td className="px-4 py-1 border border-slate-500">
												<p>
													{ThongTinHoSo?.MC_TTHC_GV_SoBoHoSo} <span>bộ</span>
												</p>
											</td>
										</tr>
										<tr>
											<td className="px-4 py-1 border border-slate-500 font-semibold">Tổng thời gian giải quyết</td>
											<td className="px-4 py-1 border border-slate-500">
												<p>
													{ThongTinHoSo?.MC_TTHC_GV_TongThoiGianGiaiQuyet} <span>ngày kể từ khi nhận đủ hồ sơ hợp lệ</span>
												</p>
											</td>
										</tr>
										<tr>
											<td className="px-4 py-1 border border-slate-500 font-semibold">Mô tả trình tự thực hiện</td>
											<td className="px-4 py-1 border border-slate-500">
												{TrinhTuThucHien && TrinhTuThucHien.length > 0 ? (
													<table className="table-auto w-full">
														<thead className="bg-[#075985] text-white rounded-t-xl">
															<tr>
																<th className="rounded-tl-xl px-2 py-1">Bước</th>
																<th className="border border-slate-300 px-2 py-1">Tên công việc</th>
																<th className="border border-slate-300 px-2 py-1">Cách thức thực hiện</th>
																<th className="border border-slate-300 px-2 py-1">Địa chỉ tiếp nhận / trả hồ sơ</th>
																<th className="border border-slate-300 px-2 py-1">Đơn vị thực hiện / được ủy quyền thực hiện</th>
																<th className="border border-slate-300 px-2 py-1">Đơn vị phối hợp</th>
																<th className="border border-slate-300 px-2 py-1">Thời gian (ngày)</th>
																<th className="rounded-tr-xl px-2 py-1">Kết quả</th>
															</tr>
														</thead>
														<tbody>
															{TrinhTuThucHien?.map((iTrinhTu, index) => {
																return (
																	<tr key={index}>
																		<td className="border border-slate-300 text-center">{index + 1}</td>
																		<td className="border border-slate-300">
																			<div className="px-2 text-[#245D7C] font-semibold">{iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_TenCongViec}</div>
																		</td>
																		<td className="border border-slate-300">
																			<div className="px-2">{iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_CacThucThucHien}</div>
																		</td>
																		<td className="border border-slate-300">
																			<div className="text-center">{iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra}</div>
																		</td>
																		<td className="border border-slate-300">
																			<div className="text-center">{iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_DonViThucHien}</div>
																		</td>
																		<td className="border border-slate-300 text-center">
																			<div>{iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop}</div>
																		</td>
																		<td className="border border-slate-300 text-center">
																			<div>{iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay}</div>
																		</td>
																		<td className="border border-slate-300 text-center">
																			<div>{iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_KetQua}</div>
																		</td>
																	</tr>
																);
															})}
														</tbody>
													</table>
												) : (
													<p>Không có trình tự thực hiện</p>
												)}
											</td>
										</tr>
										<tr>
											<td className="px-4 py-1 border border-slate-500 font-semibold">Phí, lệ phí</td>
											<td className="px-4 py-1 border border-slate-500">
												<p>Không tính phí.</p>
												{/* <table className="table-auto w-full">
													<thead className="bg-[#075985] text-white rounded-t-xl">
														<tr>
															<th className="rounded-tl-xl px-2 py-1">STT</th>
															<th className="border border-slate-300 px-2 py-1">Mức phí</th>
															<th className="rounded-tr-xl px-2 py-1">Mô tả</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td colSpan={3} className="border border-slate-300">
																<span className="px-2 py-1 font-semibold">Không có phí</span>
															</td>
														</tr>
													</tbody>
												</table> */}
											</td>
										</tr>
										<tr>
											<td className="px-4 py-1 border border-slate-500 font-semibold">Đối tượng thực hiện</td>
											<td className="px-4 py-1 border border-slate-500">
												<div>
													<p>{ThongTinHoSo?.MC_TTHC_GV_DoiTuongThucHien}</p>
												</div>
											</td>
										</tr>
										<tr>
											<td className="px-4 py-1 border border-slate-500 font-semibold">Căn cứ pháp lý của TTHC</td>
											<td className="px-4 py-1 border border-slate-500">
												<div>
													<p>{ThongTinHoSo?.MC_TTHC_GV_CanCuPhapLyCuaTTHC}</p>
												</div>
											</td>
										</tr>
										<tr>
											<td className="px-4 py-1 border border-slate-500 font-semibold">Yêu cầu hoặc điều kiện để thực hiện TTHC</td>
											<td className="px-4 py-1 border border-slate-500">
												<div>{ThongTinHoSo?.MC_TTHC_GV_DieuKienThucHien}</div>
											</td>
										</tr>
										<tr>
											<td className="px-4 py-1 border border-slate-500 font-semibold">Tệp thủ tục</td>
											<td className="px-4 py-1 border border-slate-500">
												<div>
													<p
														className="font-semibold text-[#336699] cursor-pointer hover:opacity-70"
														onClick={() => {
															handleDownloadFile(ThongTinHoSo?.MC_TTHC_GV_TepThuTuc_TenFile, ThongTinHoSo?.MC_TTHC_GV_TepThuTuc_DataFileFile);
														}}
													>
														{ThongTinHoSo?.MC_TTHC_GV_TepThuTuc_TenFile}
													</p>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

ChiTietThuTucView.propTypes = {};

export default ChiTietThuTucView;
