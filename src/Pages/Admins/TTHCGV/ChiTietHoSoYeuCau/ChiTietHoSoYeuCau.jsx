import clsx from "clsx";
import React, { useEffect } from "react";
import { useState } from "react";

import { FaCaretRight, FaCaretDown } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import SidebarTTHCGV from "../Sidebar/SidebarTTHCGV";

function ChiTietHoSoYeuCau() {
	const { yeucau, id } = useParams();
	const fakeDataHSYeuCau = [
		{
			id: 1,
			tenHS: "Quy trình đề nghị cấp tài khoản: email, LMS, phân quyền: EDU, EGOV",
			soBienNhan: 1,
			nguoiNop: "Tống Bá Quang Anh",
			nguoiNhan: "Phòng Đào Tạo",
			ngayTiepNhan: "22/11/2023",
			ngayHenTra: "30/11/2023",
			lePhi: 210000,
			dongTien: true,
			trangThai: "Chờ tiếp nhận",
		},
		{
			id: 2,
			tenHS: "Quy trình đề nghị cấp lại mật khẩu tài khoản Email",
			soBienNhan: 2,
			nguoiNop: "Nguyễn Thị Thanh Tâm",
			nguoiNhan: "Phòng Đào Tạo",
			ngayTiepNhan: "22/11/2023",
			ngayHenTra: "30/11/2023",
			lePhi: 210000,
			dongTien: true,
			trangThai: "Chờ tiếp nhận",
		},
		{
			id: 3,
			tenHS: "Quy trình đề nghị cấp lại mật khẩu tài khoản LMS",
			soBienNhan: 3,
			nguoiNop: "Nguyễn Thị Thanh Tâm",
			nguoiNhan: "Phòng Đào Tạo",
			ngayTiepNhan: "22/11/2023",
			ngayHenTra: "30/11/2023",
			lePhi: 0,
			dongTien: false,
			trangThai: "Chờ tiếp nhận",
		},
		{
			id: 4,
			tenHS: "Quy trình đề nghị cấp tên miền và hệ quản trị nội dung website",
			soBienNhan: 4,
			nguoiNop: "Nguyễn Thành Trung",
			nguoiNhan: "Phòng Đào Tạo",
			ngayTiepNhan: "22/11/2023",
			ngayHenTra: "30/11/2023",
			lePhi: 210000,
			dongTien: false,
			trangThai: "Chờ tiếp nhận",
		},
		{
			id: 5,
			tenHS: "Quy trình đề nghị cấp tên miền và trỏ tên miền ra máy chủ bên ngoài",
			soBienNhan: 5,
			nguoiNop: "Nguyễn Mạnh Cường",
			nguoiNhan: "Phòng Đào Tạo",
			ngayTiepNhan: "22/11/2023",
			ngayHenTra: "30/11/2023",
			lePhi: 210000,
			dongTien: true,
			trangThai: "Chờ tiếp nhận",
		},
		{
			id: 6,
			tenHS: "Quy trình đề nghị nghỉ phép năm",
			soBienNhan: 6,
			nguoiNop: "Lê Văn Hiến",
			nguoiNhan: "Phòng Đào Tạo",
			ngayTiepNhan: "22/11/2023",
			ngayHenTra: "30/11/2023",
			lePhi: 210000,
			dongTien: true,
			trangThai: "Chờ tiếp nhận",
		},
		{
			id: 7,
			tenHS: "Quy trình đề nghị thanh toán hạng mục lắt đặt hệ thống controller mạng",
			soBienNhan: 7,
			nguoiNop: "Tô Thành Công",
			nguoiNhan: "Phòng Đào Tạo",
			ngayTiepNhan: "22/11/2023",
			ngayHenTra: "30/11/2023",
			lePhi: 210000,
			dongTien: true,
			trangThai: "Chờ tiếp nhận",
		},
		{
			id: 8,
			tenHS: "Quy trình đề nghị cấp tài khoản: email, LMS, phân quyền: EDU, EGOV",
			soBienNhan: 8,
			nguoiNop: "Tống Bá Quang Anh",
			nguoiNhan: "Phòng Đào Tạo",
			ngayTiepNhan: "22/11/2023",
			ngayHenTra: "30/11/2023",
			lePhi: 210000,
			dongTien: true,
			trangThai: "Chờ tiếp nhận",
		},
		{
			id: 9,
			tenHS: "Quy trình đề nghị cấp tài khoản: email, LMS, phân quyền: EDU, EGOV",
			soBienNhan: 9,
			nguoiNop: "Tống Bá Quang Anh",
			nguoiNhan: "Phòng Đào Tạo",
			ngayTiepNhan: "22/11/2023",
			ngayHenTra: "30/11/2023",
			lePhi: 210000,
			dongTien: true,
			trangThai: "Chờ tiếp nhận",
		},
		{
			id: 10,
			tenHS: "Quy trình đề nghị cấp tài khoản: email, LMS, phân quyền: EDU, EGOV",
			soBienNhan: 10,
			nguoiNop: "Tống Bá Quang Anh",
			nguoiNhan: "Phòng Đào Tạo",
			ngayTiepNhan: "22/11/2023",
			ngayHenTra: "30/11/2023",
			lePhi: 210000,
			dongTien: true,
			trangThai: "Chờ tiếp nhận",
		},
	];

	const [showThongTinNguoiNop, setShowThongTinNguoiNop] = useState(true);
	const [showThongTinHoSo, setShowThongTinHoSo] = useState(true);
	const [showXuLyHoSo, setShowXuLyHoSo] = useState(true);

	const handleShowThongTinNguoiNop = () => {
		setShowThongTinNguoiNop(!showThongTinNguoiNop);
	};

	const handleShowThongTinHoSo = () => {
		setShowThongTinHoSo(!showThongTinHoSo);
	};

	const handleShowXuLyHoSo = () => {
		setShowXuLyHoSo(!showXuLyHoSo);
	};

	const dataDetailYeuCau = fakeDataHSYeuCau.find((itemYeuCau) => itemYeuCau.id == id);

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
								Họ và tên: <span className="font-semibold">{dataDetailYeuCau.nguoiNop}</span>
							</p>
							<p className="col-span-1 mb-3">
								Địa chỉ hiện tại: <span className="font-semibold">Số 43, P.Lĩnh Nam, Q.Hoàng Mai, TP.Hà Nội</span>
							</p>
							<p className="col-span-1 mb-3">
								Ngày sinh: <span className="font-semibold">10/01/1996</span>
							</p>
							<p className="col-span-1 mb-3">
								CMTND/CCCD: <span className="font-semibold">8126386189245</span>
							</p>
							<p className="col-span-1 mb-3">
								Số điện thoại: <span className="font-semibold">03334512418</span>
							</p>
							<p className="col-span-1 mb-3">
								Email liên hệ: <span className="font-semibold">tbquanganh@gmail.com</span>
							</p>
							<p className="col-span-1 mb-3">
								Quê quán: <span className="font-semibold">Xã A, Huyện B, Tỉnh C</span>
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
						<div className={clsx("grid grid-cols-2 items-center justify-between mb-4", showThongTinHoSo ? null : "hidden")}>
							<p className="col-span-1 mb-3">
								Tên thủ tục: <span className="font-semibold">{dataDetailYeuCau.tenHS}</span>
							</p>
							<p className="col-span-1 mb-3">
								Ngày nộp hồ sơ: <span className="font-semibold"> 27/11/2023</span>
							</p>
							<p className="col-span-1 mb-3">
								Mã thủ tục: <span className="font-semibold">TTHC-ĐT-xx</span>
							</p>
							<p className="col-span-1 mb-3">
								Ngày tiếp nhận: <span className="font-semibold">27/11/2023</span>
							</p>
							<p className="col-span-1 mb-3">
								Đơn vị tiếp nhận: <span className="font-semibold">Phòng Đào Tạo</span>
							</p>
							<p className="col-span-1 mb-3">
								Ngày hẹn trả: <span className="font-semibold">30/11/2023</span>
							</p>
							<p className="col-span-1 mb-3">
								Lĩnh vực: <span className="font-semibold">CNTT</span>
							</p>
							<p className="col-span-1 mb-3">
								Ngày giao trả: <span className="font-semibold">30/11/2023</span>
							</p>
							<p className="col-span-1 mb-3 flex items-center gap-4">
								<input type="checkbox" defaultChecked name="" id="" /> <span className="font-semibold">Đã thanh toán phí</span>
							</p>
							<p className="col-span-1 mb-3">
								Hình thức giao trả: <span className="font-semibold">Trực tiếp</span>
							</p>
						</div>

						{/* START: Thành phần hồ sow */}
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
