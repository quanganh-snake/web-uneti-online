import React from "react";
import PropTypes from "prop-types";
import SidebarTTHCGV from "../../Sidebar/SidebarTTHCGV";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getThuTucHanhChinhByID } from "../../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";

// icons
import { FaAngleRight, FaChevronDown } from "react-icons/fa";
import Loading from "./../../../../../Components/Loading/Loading";
import clsx from "clsx";
function ThongTinChiTietHoSo(props) {
	const { title, id } = useParams();
	const [detailHoSoThuTuc, setDetailHoSoThuTuc] = useState({});
	const [loading, setLoading] = useState(true);

	const [showThongTinHoSo, setShowThongTinHoSo] = useState(true);
	const [showTPHSDeNghi, setShowTPHSDeNghi] = useState(true);

	// Events handlers
	const handleShowView = (idView) => {
		if (idView === "ThongTinHoSo") {
			setShowThongTinHoSo(!showThongTinHoSo);
		}
		if (idView === "ThanhPhanHoSoDeNghi") {
			setShowTPHSDeNghi(!showTPHSDeNghi);
		}
	};

	const handleOpenPreviewFile = (dataFile, fileName) => {
		const blodFile = new Blob([dataFile]);
		const newFileUrl = URL.createObjectURL(blodFile);
		window.open(newFileUrl, "_blank");

		const a = document.createElement("a");
		a.href = newFileUrl;
		a.download = fileName || "downloaded_file";
		document.body.appendChild(a);
		a.click();

		// Clean up
		document.body.removeChild(a);
		URL.revokeObjectURL(newFileUrl);
	};

	// Effects
	useEffect(() => {
		const getDataDetailHoSoThuTuc = async () => {
			const resultDataHoSoThuTuc = await getThuTucHanhChinhByID(id);
			if (resultDataHoSoThuTuc.status === 200) {
				const dataDetailHoSoThuTuc = await resultDataHoSoThuTuc.data;
				if (dataDetailHoSoThuTuc) {
					setDetailHoSoThuTuc(dataDetailHoSoThuTuc);
					setLoading(false);
				}
			}
		};
		getDataDetailHoSoThuTuc();
	}, []);

	const { ThongTinHoSo, ThanhPhanHoSo, TrinhTuThucHien, LePhi, PhanQuyen, TrangThai } = detailHoSoThuTuc ?? null;
	console.log("🚀 ~ file: ThongTinChiTietHoSo.jsx:47 ~ ThongTinChiTietHoSo ~ ThanhPhanHoSo:", ThanhPhanHoSo);
	return (
		<div className="px-5 lg:px-0 flex gap-4">
			<SidebarTTHCGV />
			<div className="w-full p-4 rounded-xl shadow-lg bg-white">
				<div className="flex flex-col">
					<h3 className="font-bold text-2xl uppercase mb-6 text-[#336699] underline">Chi tiết quy trình hồ sơ - thủ tục</h3>
					{loading ? (
						<div className="w-full flex justify-center">
							<Loading />
						</div>
					) : (
						<>
							<div className="TTHC-GV_thongtinhoso mb-6">
								<div className="flex flex-col sm:flex-row items-center justify-between bg-blue-100 p-2 rounded-md mb-4">
									<div className="flex flex-row items-center gap-2 text-blue-800">
										{showThongTinHoSo ? (
											<FaAngleRight
												size={20}
												className="cursor-pointer hover:opacity-70 mt-1 rotate-90"
												onClick={() => {
													handleShowView("ThongTinHoSo");
												}}
											/>
										) : (
											<FaAngleRight
												size={20}
												className="cursor-pointer hover:opacity-70 mt-1"
												onClick={() => {
													handleShowView("ThongTinHoSo");
												}}
											/>
										)}
										<h4 className="text-xl uppercase font-medium">Thông tin hồ sơ</h4>
									</div>
									<button type="button" className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:opacity-60">
										Cập nhật thông tin
									</button>
								</div>
								<div className={clsx(showThongTinHoSo ? "flex flex-col gap-4" : "hidden")}>
									<div className="flex flex-col gap-1">
										<label htmlFor="MC_TTHC_GV_TenThuTuc">
											Tên thủ tục <span className="text-red-600 font-bold">*</span>
										</label>
										<input
											type="text"
											className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-none"
											defaultValue={ThongTinHoSo?.MC_TTHC_GV_TenThuTuc}
											placeholder="Nhập tên thủ tục"
											name="MC_TTHC_GV_TenThuTuc"
											id="MC_TTHC_GV_TenThuTuc"
										/>
									</div>
									<div className="flex flex-col md:flex-row items-center gap-4">
										<div className="w-full">
											<div className="flex flex-col gap-1">
												<label htmlFor="MC_TTHC_GV_MaThuTuc">
													Mã thủ tục <span className="text-red-600 font-bold">*</span>
												</label>
												<input
													type="text"
													className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-none"
													defaultValue={ThongTinHoSo?.MC_TTHC_GV_MaThuTuc}
													placeholder="Nhập tên thủ tục"
													name="MC_TTHC_GV_MaThuTuc"
													id="MC_TTHC_GV_MaThuTuc"
												/>
											</div>
										</div>
										<div className="w-full">
											<div className="flex flex-col gap-1">
												<label htmlFor="MC_TTHC_GV_IDMucDo">
													Mức độ <span className="text-red-600 font-bold">*</span>
												</label>
												<input
													type="number"
													min={1}
													max={4}
													className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-none"
													defaultValue={ThongTinHoSo?.MC_TTHC_GV_IDMucDo + 1}
													placeholder="Nhập tên thủ tục"
													name="MC_TTHC_GV_IDMucDo"
													id="MC_TTHC_GV_IDMucDo"
												/>
											</div>
										</div>
										<div className="w-full">
											<div className="flex flex-col gap-1">
												<label htmlFor="MC_TTHC_GV_TongThoiGianGiaiQuyet">
													Tổng thời gian giải quyết <span className="text-red-600 font-bold">*</span>
												</label>
												<div className="flex items-center gap-2">
													<input
														type="number"
														min={1}
														className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-none"
														defaultValue={ThongTinHoSo?.MC_TTHC_GV_TongThoiGianGiaiQuyet}
														name="MC_TTHC_GV_TongThoiGianGiaiQuyet"
														id="MC_TTHC_GV_TongThoiGianGiaiQuyet"
													/>
													<span className="font-medium">Ngày</span>
												</div>
											</div>
										</div>
									</div>
									<div className="flex flex-col gap-1">
										<label htmlFor="MC_TTHC_GV_DoiTuongThucHien" className="font-semibold">
											Đối tượng thực hiện <span className="text-red-600 font-bold">*</span>
										</label>
										<input
											type="text"
											className="px-3 py-1 w-full bg-slate-300 border border-slate-200 rounded-md focus:outline-none"
											defaultValue={ThongTinHoSo?.MC_TTHC_GV_DoiTuongThucHien}
											disabled={true}
											name="MC_TTHC_GV_DoiTuongThucHien"
											id="MC_TTHC_GV_DoiTuongThucHien"
										/>
									</div>
									<div className="flex flex-col md:flex-row items-center gap-4">
										<div className="w-full">
											<div className="flex flex-col gap-1">
												<label htmlFor="MC_TTHC_GV_CanCuPhapLyCuaTTHC" className="font-semibold">
													Căn cứ pháp lý của Thủ tục hàn chính
												</label>
												<input
													type="text"
													className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-slate-400"
													defaultValue={ThongTinHoSo?.MC_TTHC_GV_CanCuPhapLyCuaTTHC}
													name="MC_TTHC_GV_CanCuPhapLyCuaTTHC"
													id="MC_TTHC_GV_CanCuPhapLyCuaTTHC"
												/>
											</div>
										</div>
										<div className="w-full">
											<div className="flex flex-col gap-1">
												<label htmlFor="MC_TTHC_GV_DieuKienThucHien" className="font-semibold">
													Điều kiện thực hiện
												</label>
												<input
													type="text"
													className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-slate-400"
													defaultValue={ThongTinHoSo?.MC_TTHC_GV_DieuKienThucHien}
													name="MC_TTHC_GV_DieuKienThucHien"
													id="MC_TTHC_GV_DieuKienThucHien"
												/>
											</div>
										</div>
									</div>
									<div className="flex flex-col md:flex-row items-center gap-4">
										<div className="w-full flex items-center gap-4 border px-3 py-1 rounded-md">
											<input
												type="checkbox"
												className="w-4 h-4 px-3 py-1 bg-slate-300 border border-slate-200 rounded-md focus:outline-none"
												defaultChecked={ThongTinHoSo?.MC_TTHC_GV_ThuTucLienThong}
												name="MC_TTHC_GV_ThuTucLienThong"
												id="MC_TTHC_GV_ThuTucLienThong"
											/>
											<label htmlFor="MC_TTHC_GV_ThuTucLienThong">Thủ tục liên thông</label>
										</div>
										<div className="w-full flex items-center gap-4 border px-3 py-1 rounded-md">
											<input
												type="checkbox"
												className="w-4 h-4 px-3 py-1 bg-slate-300 border border-slate-200 rounded-md focus:outline-none"
												defaultChecked={ThongTinHoSo?.MC_TTHC_GV_ThuTucKhongApDungMC}
												name="MC_TTHC_GV_ThuTucKhongApDungMC"
												id="MC_TTHC_GV_ThuTucKhongApDungMC"
											/>
											<label htmlFor="MC_TTHC_GV_ThuTucKhongApDungMC">Thủ tục không áp dụng Một cửa</label>
										</div>
									</div>

									{ThongTinHoSo.MC_TTHC_GV_ThuTucLienThong || ThongTinHoSo.MC_TTHC_GV_ThuTucKhongApDungMC ? (
										<div className="">
											{ThongTinHoSo.MC_TTHC_GV_TepThuTuc_DataFileFile ? (
												<>
													<div className="flex flex-col gap-1">
														<label htmlFor="MC_TTHC_GV_DoiTuongThucHien" className="font-semibold">
															Tệp thủ tục kèm theo <span className="text-red-600 font-bold">*</span>
														</label>
														<input
															type="text"
															className="px-3 py-1 w-full bg-slate-300 border border-slate-200 rounded-md focus:outline-none"
															defaultValue={ThongTinHoSo?.MC_TTHC_GV_DoiTuongThucHien}
															disabled={true}
															name="MC_TTHC_GV_DoiTuongThucHien"
															id="MC_TTHC_GV_DoiTuongThucHien"
														/>
													</div>
												</>
											) : null}
										</div>
									) : null}
									<div className="flex flex-col md:flex-row items-center gap-4">
										<div className="w-full">
											<div className="flex flex-col gap-1">
												<label htmlFor="MC_TTHC_GV_NoiTiepNhan" className="font-semibold">
													Đơn vị tiếp nhận <span className="text-red-600 font-bold">*</span>
												</label>
												<input
													type="text"
													className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-slate-400"
													defaultValue={ThongTinHoSo?.MC_TTHC_GV_NoiTiepNhan}
													name="MC_TTHC_GV_NoiTiepNhan"
													id="MC_TTHC_GV_NoiTiepNhan"
												/>
											</div>
										</div>
										<div className="w-full">
											<div className="flex flex-col gap-1">
												<label htmlFor="MC_TTHC_GV_NoiTraKetQua" className="font-semibold">
													Nơi trả kết quả <span className="text-red-600 font-bold">*</span>
												</label>
												<input
													type="text"
													className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-slate-400"
													defaultValue={ThongTinHoSo?.MC_TTHC_GV_NoiTraKetQua}
													name="MC_TTHC_GV_NoiTraKetQua"
													id="MC_TTHC_GV_NoiTraKetQua"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>

							{ThanhPhanHoSo.length ? (
								<div className="TTHC-GV_tphosodenghi">
									<div className="flex flex-col sm:flex-row items-center justify-between bg-blue-100 p-2 rounded-md mb-4">
										<div className="flex flex-row items-center gap-2 text-blue-800">
											{showTPHSDeNghi ? (
												<FaAngleRight
													size={20}
													className="cursor-pointer hover:opacity-70 mt-1 rotate-90"
													onClick={() => {
														handleShowView("ThanhPhanHoSoDeNghi");
													}}
												/>
											) : (
												<FaAngleRight
													size={20}
													className="cursor-pointer hover:opacity-70 mt-1"
													onClick={() => {
														handleShowView("ThanhPhanHoSoDeNghi");
													}}
												/>
											)}
											<h4 className="text-xl uppercase font-medium">Thành phần hồ sơ đề nghị</h4>
										</div>
										<button type="button" className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:opacity-60">
											Cập nhật thông tin
										</button>
									</div>
									<div className={clsx(showTPHSDeNghi ? "flex flex-col gap-4" : "hidden")}>
										<table className="w-full">
											<thead className="bg-[#075985] text-white rounded-t-xl">
												<tr>
													<th className="border-r px-2 py-1 rounded-tl-xl">STT</th>
													<th className="border-r px-2 py-1">Tên giấy tờ</th>
													<th className="border-r px-2 py-1">Mẫu hồ sơ/Hướng dẫn</th>
													<th className="border-r px-2 py-1">Bản chính</th>
													<th className="border-r px-2 py-1">Bản sao</th>
													<th className="border-r px-2 py-1">Bắt buộc</th>
													<th className="px-2 py-1 rounded-tr-xl"></th>
												</tr>
											</thead>
											<tbody>
												{ThanhPhanHoSo.map((iThanhPhan, index) => (
													<tr className="border-b" key={iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_ID}>
														<td className="border-r border-l px-2 py-1 text-center">{index + 1}</td>
														<td className="border-r px-2 py-1 text-center">{iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo}</td>
														<td className="border-r px-2 py-1 text-center">
															<p
																className="font-semibold text-[#336699] cursor-pointer hover:opacity-70"
																onClick={() => {
																	handleOpenPreviewFile(iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_DataFile, iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenFile);
																}}
															>
																{iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenFile}
															</p>
														</td>
														<td className="border-r px-2 py-1 text-center">
															<input type="checkbox" defaultChecked={iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_BanChinh} name="" id="" />
														</td>
														<td className="border-r px-2 py-1 text-center">
															<input type="checkbox" defaultChecked={iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_BanSao} name="" id="" />
														</td>
														<td className="border-r px-2 py-1 text-center">
															<input type="checkbox" defaultChecked={iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_BatBuoc} name="" id="" />
														</td>
														<td className="border-r px-2 py-1 text-center">
															<div className="flex flex-col lg:flex-row items-center justify-center gap-2">
																<button type="button" className="px-3 py-1 bg-[#336699] text-white hover:opacity-70" onClick={() => handleEditRow(index)}>
																	Sửa
																</button>
																<button type="button" className="px-3 py-1 bg-[#336699] text-white hover:opacity-70" onClick={() => handleDeleteRow(index)}>
																	Xóa
																</button>
															</div>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							) : null}
						</>
					)}
				</div>
			</div>
		</div>
	);
}

ThongTinChiTietHoSo.propTypes = {};

export default ThongTinChiTietHoSo;
