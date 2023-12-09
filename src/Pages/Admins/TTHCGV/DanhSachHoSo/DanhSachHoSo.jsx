import React from "react";
import SidebarTTHCGV from "../Sidebar/SidebarTTHCGV";
import { getAllThuTucHanhChinhGV } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";
import { DataCanBoGV } from "../../../../Services/Utils/dataCanBoGV";
import { useDispatch } from "react-redux";
import { createAxiosJWT } from "../../../../Configs/http";
import { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { changeSlug } from "../../../../Services/Utils/stringUtils";

const PATH_TTHCGV = "/admin/quantriTTHCGV/hosothutuc";

function DanhSachHoSo() {
	// variables
	const [listHoSoThuTuc, setListHoSoThuTuc] = useState([]);
	const dataCanBoGV = DataCanBoGV();
	const { dataToken } = dataCanBoGV;

	const dispatch = useDispatch();
	const axiosJWT = createAxiosJWT(dataToken, dispatch);

	// paginates
	const [currentPage, setCurrentPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const pageCount = Math.ceil(listHoSoThuTuc.length / itemsPerPage);
	const displayData = listHoSoThuTuc.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

	// event handlers
	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected);
	};
	const handleChangeValue = (e) => {
		const { id, name, value } = e.target;
		if (id == "records-number" || name == "records-number") {
			setItemsPerPage(parseInt(value));
		}
	};
	// effects
	useEffect(() => {
		setCurrentPage(0);
	}, [itemsPerPage]);

	useEffect(() => {
		const getAllHoSoThuTuc = async () => {
			const resultGetAllHoSoThuTuc = await getAllThuTucHanhChinhGV(axiosJWT);
			if (resultGetAllHoSoThuTuc.status === 200) {
				const dataHoSoThuTuc = await resultGetAllHoSoThuTuc.data?.body;
				if (dataHoSoThuTuc) {
					setListHoSoThuTuc(dataHoSoThuTuc);
				}
			}
		};
		getAllHoSoThuTuc();
	}, []);
	return (
		<div className="px-5 lg:px-0 flex gap-4">
			<SidebarTTHCGV />
			<div className="w-full p-4 rounded-xl shadow-lg bg-white">
				<div className="flex flex-col gap-4 relative top-0 bottom-0 h-full">
					<div className="grid grid-cols-5 items-center gap-4 justify-between">
						<div className="col-span-2">
							<h3 className="text-lg font-bold uppercase underline">Danh sách quy trình hồ sơ</h3>
						</div>
						<form className="col-span-2">
							<div className=" flex items-center gap-2 border px-2 rounded-full">
								<input type="search" placeholder="Nhập từ khóa tìm kiếm" className="px-3 py-1 bg-transparent w-full focus:outline-none" name="" id="" />
								<label htmlFor="search-file" className="">
									<FiSearch size={22} className="text-[#336699] cursor-pointer hover:opacity-70" />
								</label>
							</div>
							<input type="submit" id="search-file" className="hidden" value="Tìm kiếm" />
						</form>
						<select className="col-span-1 rounded-full px-3 py-1 border focus:outline-slate-300" onChange={handleChangeValue} name="records-number" id="records-number">
							<option value="">Số bản ghi</option>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="15">15</option>
							<option value="20">20</option>
						</select>
					</div>
					<table className="mb-5">
						<thead className="bg-[#336699] text-white">
							<tr>
								<th className="px-2 py-1 rounded-tl-lg border-r">STT</th>
								<th className="px-2 py-1 border-r">Thủ tục</th>
								<th className="px-2 py-1 border-r">Lĩnh vực</th>
								<th className="px-2 py-1 rounded-tr-lg"></th>
							</tr>
						</thead>
						<tbody>
							{!displayData ? (
								<tr>
									<td colSpan={4}>
										<p className="font-bold text-[#336699] text-center border">Không có dữ liệu</p>
									</td>
								</tr>
							) : null}
							{displayData &&
								displayData.map((itemThuTuc, index) => {
									const titleSlug = changeSlug(itemThuTuc.MC_TTHC_GV_TenThuTuc);
									return (
										<tr className="border-b" key={itemThuTuc.MC_TTHC_GV_ID}>
											<td className="px-2 py-1 border-r border-l border-slate-300 text-center font-semibold">{index + 1}</td>
											<td className="px-2 py-1 border-r border-slate-300">
												<div className="flex flex-col gap-1">
													<Link to={`${PATH_TTHCGV}/xem/chitiet/${titleSlug}/${itemThuTuc.MC_TTHC_GV_ID}`} className="font-semibold text-sky-700 hover:opacity-70">
														{itemThuTuc.MC_TTHC_GV_TenThuTuc}
													</Link>
													<p className="flex flex-row items-center gap-2">
														<span className="text-sm">Mức độ:</span>
														<span
															className={clsx(
																"w-4 h-4 text-center text-white rounded-full text-xs font-semibold",
																parseInt(itemThuTuc.MC_TTHC_GV_IDMucDo) == 0 ? "bg-red-300" : "",
																parseInt(itemThuTuc.MC_TTHC_GV_IDMucDo) == 1 ? "bg-red-400" : "",
																parseInt(itemThuTuc.MC_TTHC_GV_IDMucDo) == 2 ? "bg-red-500" : "",
																parseInt(itemThuTuc.MC_TTHC_GV_IDMucDo) == 3 ? "bg-red-600" : ""
															)}
														>
															{parseInt(itemThuTuc.MC_TTHC_GV_IDMucDo) + 1}
														</span>
													</p>
												</div>
											</td>
											<td className="px-2 py-1 border-r border-slate-300 text-center">{itemThuTuc.MC_TTHC_GV_LinhVuc}</td>
											<td className="px-2 py-1 border-r border-slate-300">
												<div className="flex gap-4">
													<Link
														to={`${PATH_TTHCGV}/xem/chitiet/${titleSlug}/${itemThuTuc.MC_TTHC_GV_ID}`}
														className="bg-white text-[#336699] font-semibold rounded-md border px-2 py-1 hover:bg-[#336699] hover:text-white"
													>
														Xem
													</Link>
													<button type="button" className="bg-orange-500 text-white font-semibold px-2 py-1 rounded-md hover:opacity-70">
														Sửa
													</button>
													<button type="button" className="bg-red-500 text-white font-semibold px-2 py-1 rounded-md hover:opacity-70">
														Xóa
													</button>
												</div>
											</td>
										</tr>
									);
								})}
						</tbody>
						<tfoot></tfoot>
					</table>
					{/* Phân trang */}
					<div className="grid grid-cols-2 items-center justify-between">
						<div className="flex flex-row items-center">
							<p className="font-bold text-[#336699]">
								Tổng số: <span>{listHoSoThuTuc?.length} hồ sơ/thủ tục</span>
							</p>
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
				</div>
			</div>
		</div>
	);
}

export default DanhSachHoSo;
