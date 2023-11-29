import clsx from "clsx";
import React from "react";
import { useState } from "react";

import { FaCaretRight, FaCaretDown } from "react-icons/fa";
function ChiTietHoSoYeuCau() {
	const [showThongTinNguoiNop, setShowThongTinNguoiNop] = useState(true);
	const [showThongTinHoSo, setShowThongTinHoSo] = useState(true);

	const handleShowThongTinNguoiNop = () => {
		setShowThongTinNguoiNop(!showThongTinNguoiNop);
	};

	const handleShowThongTinHoSo = () => {
		setShowThongTinHoSo(!showThongTinHoSo);
	};

	return (
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
					<p className="font-semibold col-span-1 mb-3">
						Họ và tên: <span>Tống Bá Quang Anh</span>
					</p>
					<p className="font-semibold col-span-1 mb-3">
						Địa chỉ hiện tại: <span>Số 43, P.Lĩnh Nam, Q.Hoàng Mai, TP.Hà Nội</span>
					</p>
					<p className="font-semibold col-span-1 mb-3">
						Ngày sinh: <span>20/10/2001</span>
					</p>
					<p className="font-semibold col-span-1 mb-3">
						CMTND/CCCD: <span>8126386189245</span>
					</p>
					<p className="font-semibold col-span-1 mb-3">
						Số điện thoại: <span>03334512418</span>
					</p>
					<p className="font-semibold col-span-1 mb-3">
						Email liên hệ: <span>tbquanganh@gmail.com</span>
					</p>
					<p className="font-semibold col-span-1 mb-3">
						Quê quán: <span>Xã A, Huyện B, Tỉnh C</span>
					</p>
				</div>
			</div>
			{/* END: Thông tin người nộp */}

			{/* START: Thông tin hồ sơ */}
			<div className="mb-4">
				<div className="flex flex-row items-center gap-2 bg-[#0484AC] text-white font-semibold px-3 py-1 rounded-md mb-4">
					{showThongTinHoSo ? (
						<FaCaretDown className="text-white cursor-pointer" onClick={handleShowThongTinHoSo} />
					) : (
						<FaCaretRight className="text-white cursor-pointer" onClick={handleShowThongTinHoSo} />
					)}
					<h4>Thông tin hồ sơ</h4>
				</div>

				{/* START: Thông tin */}
				<div className={clsx("grid grid-cols-2 items-center justify-between", showThongTinHoSo ? null : "hidden")}>
					<p className="font-semibold col-span-1 mb-3">
						Tên thủ tục: <span>QUY TRÌNH ĐỀ NGHỊ CẤP TÀI KHOẢN: EMAIL, LMS, PHÂN QUYỀN: EDU, EGOV</span>
					</p>
					<p className="font-semibold col-span-1 mb-3">
						Ngày nộp hồ sơ: <span> 27/11/2023</span>
					</p>
					<p className="font-semibold col-span-1 mb-3">
						Mã thủ tục: <span>TTHC-ĐT-xx</span>
					</p>
					<p className="font-semibold col-span-1 mb-3">
						Ngày tiếp nhận: <span>27/11/2023</span>
					</p>
					<p className="font-semibold col-span-1 mb-3">
						Đơn vị tiếp nhận: <span>Phòng Đào Tạo</span>
					</p>
					<p className="font-semibold col-span-1 mb-3">
						Ngày hẹn trả: <span>30/11/2023</span>
					</p>
					<p className="font-semibold col-span-1 mb-3">
						Lĩnh vực: <span>CNTT</span>
					</p>
					<p className="font-semibold col-span-1 mb-3">
						Ngày giao trả: <span>30/11/2023</span>
					</p>
					<p className="font-semibold col-span-1 mb-3 flex items-center gap-4">
						<input type="checkbox" defaultChecked name="" id="" /> <span>Đã thanh toán phí</span>
					</p>
					<p className="font-semibold col-span-1 mb-3">
						Hình thức giao trả: <span>Trực tiếp</span>
					</p>
				</div>
			</div>
			{/* END: Thông tin hồ sơ */}

			{/* START: Xử lý hồ sơ */}
			<div className="mb-4"></div>
			{/* END: Xử lý hồ sơ */}
		</div>
	);
}

export default ChiTietHoSoYeuCau;
