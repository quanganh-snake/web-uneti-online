import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SidebarTTHCGV from "../Sidebar/SidebarTTHCGV";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { changeSlug } from "../../../../Services/Utils/stringUtils";
import ReactPaginate from "react-paginate";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
function CanBoNghiepVuView(props) {
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

	const [dataSearch, setDataSearch] = useState(fakeDataHSYeuCau);
	const [keywordSearch, setKeywordSearch] = useState("");

	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 5;
	const pageCount = Math.ceil(dataSearch.length / itemsPerPage);
	const displayData = dataSearch.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
	const handleSearch = (e) => {
		e.preventDefault();
		const { value } = e.target;
		setKeywordSearch(value);

		const newDataSearch = fakeDataHSYeuCau.filter((itemYeuCau) => itemYeuCau.tenHS.toLowerCase().includes(value.toLowerCase()));
		setDataSearch(newDataSearch);
	};

	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected);
	};

	return (
		<div className="flex flex-row gap-4">
			<SidebarTTHCGV />
			{/* START: Danh sách các thủ tục/yêu cầu hỗ trợ */}
			<div className="bg-white w-full rounded-xl px-2 py-4">
				<div className="grid grid-cols-4 gap-4 mb-4">
					<div className="uneti-tthc__timkiem col-span-4 lg:col-span-2">
						<input
							type="text"
							value={keywordSearch}
							placeholder="Nhập nội dung tìm kiếm..."
							className="w-full px-3 py-1 rounded-full border border-slate-200 focus:outline-slate-300"
							onChange={handleSearch}
						/>
					</div>
					<div className="uneti-tthc__timkiem col-span-4 lg:col-span-1">
						<button type="button" className="w-full text-[#336699] px-3 py-1 rounded-lg font-semibold border border-[#336699] hover:bg-[#336699] hover:text-white">
							Tìm kiếm nâng cao
						</button>
					</div>
					<div className="uneti-tthc__timkiem col-span-4 lg:col-span-1">
						<select className="w-full border border-[#336699] rounded-lg px-3 py-1 focus:outline-slate-300" name="" id="">
							<option value="">Số lượng hồ sơ hiển thị</option>
							<option value="5">5</option>
							<option value="5">10</option>
							<option value="5">15</option>
							<option value="5">20</option>
						</select>
					</div>
				</div>
				{/* END: Bộ lọc */}

				<div className="w-full mb-4">
					<table className="w-full">
						<thead className="bg-[#336699] text-white">
							<tr>
								<th className="px-2 py-1 rounded-tl-lg border-r">STT</th>
								<th className="px-2 py-1 border-r">Chọn</th>
								<th className="px-2 py-1 border-r">Thông tin hồ sơ</th>
								<th className="px-2 py-1 border-r">Đơn vị/Cá nhân gửi</th>
								<th className="px-2 py-1 border-r">Đơn vị/Cá nhân tiếp nhận</th>
								<th className="px-2 py-1 rounded-tr-lg">Trạng thái hồ sơ</th>
							</tr>
						</thead>
						<tbody>
							{displayData.map((itemYeuCau, index) => {
								const titleSlug = changeSlug(itemYeuCau.tenHS);
								return (
									<tr className="border" key={itemYeuCau.id}>
										<td className="px-2 py-1 text-center border-r">{index + 1}</td>
										<td className="px-2 py-1 text-center border-r">
											<input type="checkbox" name="" id="" />
										</td>
										<td className="px-2 py-1 border-r">
											<div className="flex flex-col gap-3 p-2">
												<p className="font-semibold uppercase">{itemYeuCau.tenHS}</p>
												<ul>
													<li>- Số biên tiếp nhận: {itemYeuCau.soBienNhan}</li>
													<li>
														- Tổ chức/Cá nhân nộp HS: <span className="font-semibold capitalize">{itemYeuCau.nguoiNop}</span>
													</li>
													<li>- Ngày tiếp nhận: {itemYeuCau.ngayTiepNhan}</li>
													<li>- Ngày hẹn trả: {itemYeuCau.ngayHenTra}</li>
												</ul>
												{itemYeuCau.lePhi > 0 ? (
													<div className="flex flex-col lg:flex-row items-center">
														<div className="text-white bg-[#336699] px-2 py-1">
															Lệ phí: <span className="font-semibold">{itemYeuCau.lePhi.toLocaleString()} VNĐ</span>
														</div>
														<div className={clsx("text-white  px-2 py-1", itemYeuCau.dongTien ? "bg-[#109435]" : "bg-red-500")}>
															{itemYeuCau.dongTien ? "Đã đóng " + itemYeuCau.ngayTiepNhan : "Chưa đóng " + itemYeuCau.ngayTiepNhan}
														</div>
													</div>
												) : (
													""
												)}
												<div className="flex items-center gap-4">
													<Link
														to={`/admin/canbonghiepvu/chitietyeucau/${titleSlug}/${itemYeuCau.id}`}
														className="text-white font-semibold bg-[#336699] px-3 py-1 rounded-full hover:opacity-70"
													>
														Xử lý/Xem chi tiết
													</Link>
													<Link className="text-white font-semibold bg-[#0484AC] px-3 py-1 rounded-full hover:opacity-70">Tiếp nhận</Link>
													<Link className="text-white font-semibold bg-[#E56E2A] px-3 py-1 rounded-full hover:opacity-70">Sửa</Link>
												</div>
											</div>
										</td>
										<td className="px-2 py-1 text-center border-r">
											<p className="font-semibold">{itemYeuCau.nguoiNop}</p>
										</td>
										<td className="px-2 py-1 text-center border-r">
											<p className="font-semibold">{itemYeuCau.nguoiNhan}</p>
										</td>
										<td className="px-2 py-1">
											<p className="font-semibold flex flex-col">
												<span className="text-center">{itemYeuCau.trangThai}</span>
												{itemYeuCau.lePhi > 0 ? itemYeuCau.dongTien ? "" : <span className="text-red-500 italic">(Chưa được tiếp nhận do chưa đóng phí)</span> : null}
											</p>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>

				{/* Phân trang */}
				<ReactPaginate
					previousLabel={<FaCaretLeft color="#336699" size={32} />}
					nextLabel={<FaCaretRight color="#336699" size={32} />}
					pageCount={pageCount}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
					onPageChange={handlePageChange}
					containerClassName={"pagination"}
					pageClassName={"px-2 py-1 hover:text-white hover:font-semibold hover:bg-[#336699]"}
					activeClassName={"px-2 py-1 text-white font-semibold bg-[#336699]"}
					className="w-full flex items-center justify-end gap-1"
				/>
			</div>
			{/* END: Danh sách các thủ tục/yêu cầu hỗ trợ */}
		</div>
	);
}

CanBoNghiepVuView.propTypes = {};

export default CanBoNghiepVuView;
