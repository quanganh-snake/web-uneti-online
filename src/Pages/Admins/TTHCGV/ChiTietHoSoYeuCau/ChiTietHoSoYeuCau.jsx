import clsx from "clsx";
import React, { useEffect } from "react";
import { useState } from "react";

import { FaCaretRight, FaCaretDown } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import SidebarTTHCGV from "../Sidebar/SidebarTTHCGV";
import { getAllHoSoGuiYeuCauById } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";
import moment from "moment";
import { sendEmailConfig } from "../../../../Services/Utils/sendEmail";

function ChiTietHoSoYeuCau() {
	const { yeucau, id } = useParams();

	const [showThongTinNguoiNop, setShowThongTinNguoiNop] = useState(true);
	const [showThongTinHoSo, setShowThongTinHoSo] = useState(true);
	const [showXuLyHoSo, setShowXuLyHoSo] = useState(true);
	const [dataDetailYeuCau, setDataDetailYeuCau] = useState(null);
	const [ngayHenTra, setNgayHenTra] = useState(null);
	const [ngayGiaoTra, setNgayGiaoTra] = useState(null);
	const [hinhThucTra, setHinhThucTra] = useState("");
	const [diaDiemTra, setDiaDiemTra] = useState("");

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

	const handleUpdateYeuCauGui = async () => {
		sendEmailConfig("", "ĐĂNG KÝ HỆ THỐNG PHẦN MỀM", "Tống Bá Quang Anh", "tbquanganh@gmail.com", "quanganhsnake2001@gmail.com", "Đăng ký emailjs test");
	};

	useEffect(() => {
		getAllHoSoGuiYeuCauById(id)
			.then((result) => {
				if (result.status === 200) {
					setDataDetailYeuCau(result.data?.body[0]);
				}
			})
			.catch((err) => {});
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
										<input type="datetime-local" className="p-2 border" name="MC_TTHC_GV_GuiYeuCau_NgayHenTra" id="MC_TTHC_GV_GuiYeuCau_NgayHenTra" />
									</div>
									<div className="flex flex-col gap-2">
										<p>Ngày giao trả:</p>
										<input type="datetime-local" className="p-2 border" name="NgayGiaoTra" id="NgayGiaoTra" />
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
									<div className="col-span-1 flex flex-col gap-2">
										<button type="button" onClick={handleUpdateYeuCauGui} className="border p-2 rounded-xl font-medium bg-[#336699] text-white hover:opacity-70">
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
										<th className="border-r px-2 py-1">Mẫu hồ sơ/Hướng dẫn</th>
										<th className="border-r px-2 py-1">Bản chính</th>
										<th className="border-r px-2 py-1">Bản sao</th>
										<th className="border-r px-2 py-1 rounded-tr-xl">Bắt buộc</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border">
										<td className="border-r px-2 py-1 text-center">1</td>
										<td className="border-r px-2 py-1">
											<p>Đề nghị cấp tài khoản: Email, LMS, phân quyền: EDU, EGOV</p>
										</td>
										<td className="border-r px-2 py-1 text-center">TTHC-ĐT-01-CTK.docx</td>
										<td className="border-r px-2 py-1 text-center">
											<input type="checkbox" defaultChecked name="" id="" />
										</td>
										<td className="border-r px-2 py-1 text-center">
											<input type="checkbox" name="" id="" />
										</td>
										<td className="border-r px-2 py-1 text-center">
											<input type="checkbox" defaultChecked name="" id="" />
										</td>
									</tr>
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
