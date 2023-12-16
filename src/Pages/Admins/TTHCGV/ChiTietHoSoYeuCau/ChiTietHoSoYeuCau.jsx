import clsx from "clsx";
import React, { useEffect } from "react";
import { useState } from "react";

import { FaCaretRight, FaCaretDown } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import SidebarTTHCGV from "../Sidebar/SidebarTTHCGV";
import { getHoSoGuiYeuCauById, putHoSoThuTucGuiYeuCauById } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";
import moment from "moment";
import { sendEmailUserSubmit } from "../../../../Services/Utils/sendEmail";
import { getThanhPhanHoSoGuiYeuCauById } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiThanhPhanHoSo";
import Swal from "sweetalert2";

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
	const [] = useState("");
	const [testDateTimeLocal, setDateTimeLocal] = useState(null);
	// event handlers

	const handleChangeValue = (e) => {
		const { id, name, value } = e.target;

		if (id == "MC_TTHC_GV_GuiYeuCau_NgayHenTra") {
			let strNgayHenTra = moment(value).format("DD/MM/YYYY HH:mm:ss");
			setNgayHenTra(strNgayHenTra);
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

		if (id === "") {
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

	const handleUpdateYeuCauGui = async (trangThaiID) => {
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
			}).then((result) => {
				if (result.isConfirmed) {
					const dataUpdateTrangThai = {
						MC_TTHC_GV_GuiYeuCau_TrangThai_ID: 1,
					};
					putHoSoThuTucGuiYeuCauById();
					Swal.fire({
						title: "Thông báo",
						text: "Đã tiếp nhận hồ sơ. Tiếp tục xử lý yêu cầu.",
						icon: "success",
						timer: 1500,
					});
				} else {
					return;
				}
			});
		}
	};

	useEffect(() => {
		getHoSoGuiYeuCauById(id)
			.then((result) => {
				if (result.status === 200) {
					setDataDetailYeuCau(result.data?.body[0]);
				}
			})
			.catch((err) => {
				console.log("🚀 ~ file: ChiTietHoSoYeuCau.jsx:78 ~ useEffect ~ err:", err);
			});

		getThanhPhanHoSoGuiYeuCauById(id)
			.then((result) => {
				if (result.status === 200) {
					setDataDetailTPHSYeuCauYeuCau(result.data?.body);
				}
			})
			.catch((err) => {
				console.log("🚀 ~ file: ChiTietHoSoYeuCau.jsx:88 ~ useEffect ~ err:", err);
			});
	}, []);

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
											value={moment(testDateTimeLocal, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DDTHH:mm")}
											onChange={(e) => {
												setDateTimeLocal(moment(e.target.value).format("DD/MM/YYYY HH:mm:ss"));
											}}
										/>
									</div>
									<div className="flex flex-col gap-2">
										<p>Hình thức giao trả:</p>
										<select className="p-2 border focus:outline-slate-400" name="HinhThucTra" id="HinhThucTra">
											<option value="">Chọn hình thức giao trả</option>
											<option value="">Trả online - Qua Email</option>
											<option value="">Trả trực tiếp</option>
										</select>
									</div>
									<div className="flex flex-col gap-2">
										<p>Địa điểm giao trả:</p>
										<select className="p-2 border focus:outline-slate-400" name="MC_TTHC_GV_GuiYeuCau_NoiTraKetQua" id="MC_TTHC_GV_GuiYeuCau_NoiTraKetQua">
											<option value="">Chọn địa điểm giao trả</option>
											<option value="1 - Minh Khai">1 - Minh Khai</option>
											<option value="2 - Lĩnh Nam">2 - Lĩnh Nam</option>
											<option value="3 - Nam Định">3 - Nam Định</option>
										</select>
									</div>
									<div className="flex flex-col gap-2 col-span-2">
										<p>Ghi chú:</p>
										<textarea
											className="border border-slate-400 focus:outline-slate-500 p-2"
											placeholder="Nhập mô tả thông báo"
											name="MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu"
											id="MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu"
											rows={4}
										></textarea>
									</div>
									<div className="col-span-1 flex flex-col gap-2">
										<button
											type="button"
											onClick={() => {
												handleUpdateYeuCauGui(dataDetailYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID);
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
								<button type="button" className="px-3 py-1 text-white rounded-lg font-semibold hover:opacity-70 bg-[#D85D17]">
									Chuyển bước trước
								</button>
								<button type="button" className="px-3 py-1 text-white rounded-lg font-semibold hover:opacity-70 bg-[#70C788]">
									Chuyển bước tiếp
								</button>
								<button type="button" className="px-3 py-1 text-white rounded-lg font-semibold hover:opacity-70 bg-[#FF0000]">
									Hủy/trả hồ sơ
								</button>
								<button type="button" className="px-3 py-1 text-white rounded-lg font-semibold hover:opacity-70 bg-[#D85D17]">
									Dừng thực hiện
								</button>
							</div>
						) : (
							<div className="flex flex-col gap-2">
								<div className="flex flex-col border-b pb-1">
									<p>
										<span className="underline">Nhân sự xử lý:</span> Tống Bá Quang Anh: <span className="font-bold text-[#ff0000]">Tiếp nhận hồ sơ</span>
									</p>
									<small>27/11/2023 02:27 PM</small>
								</div>
								<div className="flex flex-col border-b pb-1">
									<p>
										<span className="underline">Nhân sự xử lý:</span> Tống Bá Quang Anh: <span className="font-bold text-[#ff0000]">Xử lý hồ sơ</span>
									</p>
									<small>27/11/2023 02:27 PM</small>
								</div>
								<div className="flex flex-col border-b pb-1">
									<p>
										<span className="underline">Nhân sự xử lý:</span> Tống Bá Quang Anh: <span className="font-bold text-[#ff0000]">Trả kết quả</span>
									</p>
									<small>27/11/2023 02:27 PM</small>
								</div>
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
