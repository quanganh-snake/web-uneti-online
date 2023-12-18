import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SidebarTTHCGV from "../Sidebar/SidebarTTHCGV";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { changeSlug } from "../../../../Services/Utils/stringUtils";
import ReactPaginate from "react-paginate";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import moment from "moment";
function CanBoNghiepVuView({ status, listHoSoYeuCauByStatus, listHoSoYeuCau }) {
	const [keywordSearch, setKeywordSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 5;
	const pageCount = Math.ceil(listHoSoYeuCau?.length / itemsPerPage);
	const displayData = listHoSoYeuCau?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
	const handleSearch = (e) => {
		e.preventDefault();
		const { value } = e.target;
		setKeywordSearch(value);

		const newDataSearch = listHoSoYeuCau.filter((itemYeuCau) => itemYeuCau?.MC_TTHC_GV_TenThuTuc.toLowerCase().includes(value.toLowerCase()));
		listHoSoYeuCau = [...newDataSearch];
	};

	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected);
	};

	if (listHoSoYeuCauByStatus?.length > 0) {
		console.log("🚀 ~ file: CanBoNghiepVuView.jsx:30 ~ CanBoNghiepVuView ~ listHoSoYeuCauByStatus:", listHoSoYeuCauByStatus);
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
									<th className="px-2 py-1 border-r">Thông tin hồ sơ</th>
									<th className="px-2 py-1 border-r">Đơn vị/Cá nhân gửi</th>
									<th className="px-2 py-1 border-r">Đơn vị/Cá nhân tiếp nhận</th>
									<th className="px-2 py-1 rounded-tr-lg">Trạng thái hồ sơ</th>
								</tr>
							</thead>
							<tbody>
								{listHoSoYeuCauByStatus?.length ? (
									listHoSoYeuCauByStatus?.map((itemYeuCau, index) => {
										const titleSlug = changeSlug(itemYeuCau.MC_TTHC_GV_TenThuTuc);
										return (
											<tr className="border" key={index}>
												<td className="px-2 py-1 text-center border-r">{index + 1}</td>
												<td className="px-2 py-1 border-r">
													<div className="flex flex-col gap-3 p-2">
														<p className="font-semibold uppercase">{itemYeuCau.MC_TTHC_GV_TenThuTuc}</p>
														<ul>
															<li>- Số biên tiếp nhận: {itemYeuCau?.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong}</li>
															<li>
																- Tổ chức/Cá nhân nộp HS: <span className="font-semibold capitalize">{itemYeuCau?.HoTen}</span>
															</li>
															<li>- Ngày tiếp nhận: {moment(itemYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayGui).format("DD/MM/YYYY HH:mm:ss")}</li>
															<li>
																- Ngày hẹn trả:{" "}
																{itemYeuCau.MC_TTHC_GV_GuiYeuCau_NgayHenTra
																	? moment(itemYeuCau.MC_TTHC_GV_GuiYeuCau_NgayHenTra).format("DD/MM/YYYY HH:mm:ss")
																	: "Chưa thực hiện"}
															</li>
														</ul>
														<div className="flex items-center gap-4">
															<Link
																to={`/admin/canbonghiepvu/chitietyeucau/${titleSlug}/${itemYeuCau.MC_TTHC_GV_GuiYeuCau_ID}`}
																className="text-white font-semibold bg-[#336699] px-3 py-1 rounded-full hover:opacity-70"
															>
																Xử lý/Xem chi tiết
															</Link>
															{itemYeuCau.MC_TTHC_GV_GuiYeuCau_TrangThai_ID == 0 ? (
																<Link className="text-white font-semibold bg-[#0484AC] px-3 py-1 rounded-full hover:opacity-70">Tiếp nhận</Link>
															) : (
																<p className="text-white font-semibold bg-green-700 px-3 py-1 rounded-full">Đã tiếp nhận</p>
															)}
														</div>
													</div>
												</td>
												<td className="px-2 py-1 text-center border-r">
													<p className="font-semibold">{itemYeuCau?.HoTen}</p>
												</td>
												<td className="px-2 py-1 text-center border-r">
													<p className="font-semibold">{itemYeuCau?.MC_TTHC_GV_NoiTiepNhan}</p>
												</td>
												<td className="px-2 py-1">
													<p className="font-semibold flex flex-col">
														<span className="text-center">{itemYeuCau?.MC_TTHC_GV_TrangThai_TenTrangThai}</span>
													</p>
												</td>
											</tr>
										);
									})
								) : (
									<tr>
										<td colSpan={6}>
											<p className="p-2 font-medium text-center w-full">Chưa có yêu cầu nào được gửi lên.</p>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					{/* Phân trang */}
					{listHoSoYeuCauByStatus?.length > 5 ? (
						<div className="flex items-center justify-between">
							<div className="">
								<p className="text-[#336699] font-medium">Tổng số: {listHoSoYeuCauByStatus?.length} yêu cầu</p>
							</div>
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
					) : null}
				</div>
				{/* END: Danh sách các thủ tục/yêu cầu hỗ trợ */}
			</div>
		);
	} else {
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
								{displayData?.length ? (
									displayData?.map((itemYeuCau, index) => {
										const titleSlug = changeSlug(itemYeuCau.MC_TTHC_GV_TenThuTuc);
										return (
											<tr className="border" key={index}>
												<td className="px-2 py-1 text-center border-r">{index + 1}</td>
												<td className="px-2 py-1 text-center border-r">
													<input type="checkbox" name="" id="" />
												</td>
												<td className="px-2 py-1 border-r">
													<div className="flex flex-col gap-3 p-2">
														<p className="font-semibold uppercase">{itemYeuCau.MC_TTHC_GV_TenThuTuc}</p>
														<ul>
															<li>- Số biên tiếp nhận: {itemYeuCau?.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong}</li>
															<li>
																- Tổ chức/Cá nhân nộp HS: <span className="font-semibold capitalize">{itemYeuCau?.HoTen}</span>
															</li>
															<li>- Ngày tiếp nhận: {moment(itemYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayGui).format("DD/MM/YYYY")}</li>
															<li>- Ngày hẹn trả: {itemYeuCau.ngayHenTra ? itemYeuCau.ngayHenTra : "Chưa thực hiện"}</li>
														</ul>
														<div className="flex items-center gap-4">
															<Link
																to={`/admin/canbonghiepvu/chitietyeucau/${titleSlug}/${itemYeuCau.MC_TTHC_GV_GuiYeuCau_ID}`}
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
													<p className="font-semibold">{itemYeuCau?.HoTen}</p>
												</td>
												<td className="px-2 py-1 text-center border-r">
													<p className="font-semibold">{itemYeuCau?.MC_TTHC_GV_NoiTiepNhan}</p>
												</td>
												<td className="px-2 py-1">
													<p className="font-semibold flex flex-col">
														<span className="text-center">{itemYeuCau?.MC_TTHC_GV_TrangThai_TenTrangThai}</span>
													</p>
												</td>
											</tr>
										);
									})
								) : (
									<tr>
										<td colSpan={6}>
											<p className="p-2 font-medium text-center w-full">Chưa có yêu cầu nào được gửi lên.</p>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					{/* Phân trang */}
					{displayData?.length > 5 ? (
						<div className="flex items-center justify-between">
							<div className="">
								<p className="text-[#336699] font-medium">Tổng số: {listHoSoYeuCau?.length} yêu cầu</p>
							</div>
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
					) : null}
				</div>
				{/* END: Danh sách các thủ tục/yêu cầu hỗ trợ */}
			</div>
		);
	}
}

CanBoNghiepVuView.propTypes = {};

export default CanBoNghiepVuView;
