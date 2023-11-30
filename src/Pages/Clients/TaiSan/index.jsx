import React, { useEffect, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { homeTaiSan } from "../../../Services/Static/dataStatic.js";
import icoPhoneHotLine from "../../../assets/Icons/icoPhoneTaiSan.png";
import ReactPaginate from "react-paginate";

import { FiSearch } from "react-icons/fi";
import ModalYeuCauHoTro from "../../../Components/Modals/ModalTaiSan/ModalYeuCauHoTro.jsx";
import { DataSinhVien } from "../../../Services/Utils/dataSinhVien.js";
import { DataCanBoGV } from "../../../Services/Utils/dataCanBoGV.js";
import { getDanhSachYeuCau } from "../../../Apis/TaiSan/apiTaiSan.js";
import { tokenSuccess } from "../../../Services/Redux/Slice/authSlice.js";
import { useDispatch } from "react-redux";
import { createAxiosJWT } from "../../../Configs/http.js";

function HomeTaiSan() {
	const [loading, setLoading] = useState(true);
	const { listCanBoHoTro, listHotlines, listAppSupport } = homeTaiSan;

	const [listYeuCauSuCo, setListYeuCauSuCo] = useState([]);

	const [showModal, setShowModal] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedRows, setSelectedRows] = useState([]);
	const [selectAll, setSelectAll] = useState(false);

	const dataSV = DataSinhVien();
	const dataCBGV = DataCanBoGV();

	const dispatch = useDispatch();
	const dataToken = dataSV.dataToken ?? dataCBGV.dataToken;
	const axiosJWT = createAxiosJWT(dataToken, dispatch, tokenSuccess);
	// event handlers
	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected);
	};
	const ITEMS_PER_PAGE = 10;
	const offset = listYeuCauSuCo ? currentPage * ITEMS_PER_PAGE : 0;
	const currentItems = listYeuCauSuCo ? listYeuCauSuCo.slice(offset, offset + ITEMS_PER_PAGE) : [];

	const handleShowModal = () => {
		setShowModal(!showModal);
	};

	const handleRowClick = (rowId) => {
		const isSelected = selectedRows.includes(rowId);
		let newSelectedRows = [];

		if (isSelected) {
			newSelectedRows = selectedRows.filter((id) => id !== rowId);
		} else {
			newSelectedRows = [...selectedRows, rowId];
		}

		setSelectedRows(newSelectedRows);
	};

	const handleSelectAll = () => {
		if (selectAll) {
			// Deselect all rows
			setSelectedRows([]);
		} else {
			// Select all rows
			// Assume your data is an array of objects and each object has a unique id property
			const allRowIds = currentItems.map((row) => row.id);
			setSelectedRows(allRowIds);
		}

		setSelectAll(!selectAll);
	};

	useEffect(() => {
		const getAllYeuCauBaoHong = async () => {
			getDanhSachYeuCau(axiosJWT, dataToken.token)
				.then((res) => {
					setListYeuCauSuCo(res);
					setLoading(false);
				})
				.catch((err) => {
					console.log([err]);
					setLoading(false);
				});
		};

		getAllYeuCauBaoHong();
	}, []);

	return (
		<main className="my-[120px]">
			{/* START: Thống kê - Hỗ trợ */}
			<section className="flex flex-col lg:flex-row gap-4 items-stretch px-2 mb-4">
				<div className="uneti-qlsp__thongke w-full flex-grow-0 lg:flex-grow-2">
					<div className="bg-sky-900 px-2 rounded-lg h-[100%]">Lorem ipsum dolor sit amet consectetur adipisic</div>
				</div>
				{/* END: Thống kê */}
				<div className="uneti-qlsp__canbohotro flex-grow">
					<div className="canbohotro-box border lg:w-[300px] rounded-lg">
						<h6 className="text-white font-semibold rounded-t-lg text-center py-2 bg-[#336699]">Danh sách cán bộ hỗ trợ</h6>
						<div className="pt-2 canbohotro--list px-2 h-[500px] overflow-y-hidden hover:overflow-y-auto">
							<div className="canbohotro--container overflow-x-hidden">
								{listCanBoHoTro &&
									listCanBoHoTro.length > 0 &&
									listCanBoHoTro.map((canbo) => (
										<div className="canbohotro-item flex gap-2 items-center mb-4" key={canbo.id}>
											<div className="canbohotro--chucvu h-10 w-10 bg-[#336699] text-white font-semibold rounded-full flex items-center justify-center">{canbo.position}</div>
											<p className="flex flex-col">
												<span className="font-semibold">{canbo.name}</span>
												<span className="text-sm">{canbo.phone}</span>
											</p>
										</div>
									))}
							</div>
						</div>
					</div>
				</div>
				{/* END: .uneti-qlsp__canbohotro */}
				<div className="uneti-qlsp__support flex-grow">
					<div className="support-box lg:w-[300px] h-[542px] border rounded-lg">
						<div className="support__hotline">
							<h6 className="text-white font-semibold rounded-t-lg text-center py-2 bg-[#336699]">Tổng đài</h6>
							<div className="hotline-box h-[250px] overflow-y-scroll">
								<div className="hotline--list pt-2 px-2">
									{listHotlines &&
										listHotlines.length > 0 &&
										listHotlines.map((hotline) => (
											<div className="hotline--item flex flex-row gap-4 mb-4" key={hotline.id}>
												<div className="hotline-image w-10 h-10 bg-red-200 rounded-full flex items-center justify-center">
													<img src={icoPhoneHotLine} alt="hotline" className="w-5" title="hotline" />
												</div>
												<div className="hotline-content flex flex-col">
													<p className="font-semibold">{hotline.name}</p>
													<span className="text-sm text-red-500">{hotline.phone}</span>
												</div>
											</div>
										))}
								</div>
							</div>
						</div>
						{/* END: .support__hotline */}
						<div className="support__app">
							<h6 className="text-white font-semibold rounded-t-lg text-center py-2 bg-[#336699]">Phầm mềm hỗ trợ</h6>
							<div className="app-box h-[210px] overflow-y-hidden hover:overflow-y-auto">
								<div className="hotline--list pt-2 px-2">
									{listAppSupport &&
										listAppSupport.length > 0 &&
										listAppSupport.map((app) => (
											<div className="hotline--item flex flex-row gap-4 mb-4" key={app.id}>
												<div className="hotline-image w-10 h-10 bg-white rounded-full flex items-center justify-center">
													<img src={app.logo} alt="app" className="w-full" title="app" />
												</div>
												<div className="hotline-content flex flex-col">
													<p className="font-semibold">{app.name}</p>
													{/* <span className="text-sm text-red-500">{hotline.phone}</span> */}
												</div>
											</div>
										))}
								</div>
							</div>
						</div>
						{/* END: .support__app */}
					</div>
				</div>
				{/* END: .uneti-qlsp__support */}
			</section>
			{/* END: Thống kê - Hỗ trợ */}

			{/* START: Danh sách yêu cầu */}
			<section className="uneti-qlsp__list-require px-2">
				<div className="list-require__box p-2 border rounded-lg flex flex-col">
					<div className="list-require__action flex flex-col lg:flex-row lg:justify-between mb-4">
						<div className="action--data grid grid-cols-3 items-center gap-4 mb-4 lg:mb-0">
							<select className="rounded-lg border w-full col-span-3 lg:col-span-1">
								<option>Hiển thị yêu cầu</option>
								<option value={0}>Tất cả yêu cầu</option>
								<option value={1}>Yêu cầu của tôi</option>
							</select>
							<button type="button" onClick={handleShowModal} className="bg-[#336699] text-white font-semibold rounded-lg px-3 py-2 hover:opacity-70  col-span-3 lg:col-span-1">
								Yêu cầu hỗ trợ
							</button>
							<button type="button" className="border font-semibold rounded-lg px-3 py-2 bg-red-700 text-white hover:opacity-70 col-span-3 lg:col-span-1">
								Xóa
							</button>
						</div>
						<div className="action--filter flex items-center flex-wrap gap-4">
							<div className="filter-search relative">
								<input type="text" placeholder="Nhập từ khóa tìm kiếm..." className="p-2 pr-12 border rounded-lg focus:outline-none" />
								<span className="absolute right-0 top-0 w-10 h-10 p-2 flex items-center justify-center rounded-r-lg cursor-pointer hover:bg-blue-100">
									<FiSearch className="" />
								</span>
							</div>
							<button type="button" className="px-3 py-2 bg-sky-400 font-semibold rounded-lg hover:opacity-70">
								Làm mới
							</button>
						</div>
					</div>
					{/* END: .list-require__action */}
					<div className="list-require__table">
						<div className="inline-block max-w-full py-2">
							<div className="relative right-0 left-0 overflow-x-auto max-w-screen-2xl shadow-md">
								{loading ? (
									<p>Loading...</p>
								) : (
									<table className="w-auto border text-sm text-left text-gray-500 dark:text-gray-400">
										<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
											<tr className="border-b">
												<th scope="col" className="whitespace-nowrap p-4 border-r w-[10px]">
													<div className="flex items-center">
														<input
															checked={selectAll}
															onChange={handleSelectAll}
															id="checkbox-all-search"
															type="checkbox"
															className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
														/>
														<label htmlFor="checkbox-all-search" className="sr-only">
															checkbox
														</label>
													</div>
												</th>
												<th scope="col" className="whitespace-nowrap px-6 py-3 text-center border-r w-[240px]">
													Mô tả sự cố
												</th>
												<th scope="col" className="whitespace-nowrap px-6 py-3 text-center border-r w-[60px]">
													Thời gian yêu cầu
												</th>
												<th scope="col" className="whitespace-nowrap px-6 py-3 text-center border-r w-[60px]">
													Người yêu cầu
												</th>
												<th scope="col" className="whitespace-nowrap px-6 py-3 text-center border-r w-[60px]">
													Đơn vị
												</th>
												<th scope="col" className="whitespace-nowrap pt-3 text-center border-r">
													<span>Địa chỉ</span>
													<table className="mt-2 border border-solid w-full px-4">
														<tbody>
															<tr>
																<td scope="col" className="px-6 py-3 text-center border-r whitespace-nowrap">
																	Cơ sở
																</td>
																<td scope="col" className="px-6 py-3 text-center border-r">
																	Địa điểm
																</td>
																<td scope="col" className="px-6 py-3 text-center border-r">
																	Tòa nhà
																</td>
																<td scope="col" className="px-6 py-3 text-center border-r">
																	Tầng
																</td>
																<td scope="col" className="px-6 py-3 text-center border-r">
																	Phòng
																</td>
															</tr>
														</tbody>
													</table>
												</th>
												<th scope="col" className="whitespace-nowrap px-6 py-3 text-center border-r w-[60px]">
													Số điện thoại
												</th>
												<th scope="col" className="whitespace-nowrap px-6 py-3 text-center border-r w-[60px]">
													Trạng thái sửa chữa
												</th>
												<th scope="col" className="whitespace-nowrap px-6 py-3 text-center border-r w-[100px]">
													Kết quả xử lý
												</th>
												<th scope="col" className="whitespace-nowrap px-4 py-3 text-center border-r w-[60px]">
													Người xử lý sự cố
												</th>
												<th scope="col" className="whitespace-nowrap px-6 py-3 text-center w-[60px]">
													Ngày hoàn thành
												</th>
											</tr>
										</thead>
										<tbody>
											{currentItems &&
												currentItems.length > 0 &&
												currentItems.map((yeucau) => (
													<tr className="border-b dark:border-neutral-500" key={yeucau.DT_QLTS_TS_ID}>
														<td className="w-4 p-4 border-r">
															<div className="flex items-center">
																<input
																	id="checkbox-table-search-3"
																	type="checkbox"
																	checked={selectedRows.includes(yeucau.DT_QLTS_TS_ID)}
																	onChange={() => handleRowClick(yeucau.DT_QLTS_TS_ID)}
																	className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
																/>
																<label htmlFor="checkbox-table-search-3" className="sr-only">
																	checkbox
																</label>
															</div>
														</td>
														<td className="whitespace-nowrap px-6 py-4 border-r">{"Đây là nội dung mô tả ......................"}</td>
														<td className="whitespace-nowrap px-6 py-4 border-r">{"Đây là thời gian yêu cầu"}</td>
														<td className="whitespace-nowrap px-6 py-4 border-r">{"Đây là người yêu cầu"}</td>
														<td className="whitespace-nowrap px-6 py-4 border-r">{"Đây là đơn vị"}</td>
														<td className="whitespace-nowrap py-1 border-r">
															<table className="border border-solid w-full px-4">
																<tbody>
																	<tr>
																		<td className="whitespace-nowrap px-6 py-4 border-r font-semibold">Cơ sở</td>
																		<td className="whitespace-nowrap px-6 py-4 border-r font-semibold">Địa điểm</td>
																		<td className="whitespace-nowrap px-6 py-4 border-r font-semibold">Tòa nhà</td>
																		<td className="whitespace-nowrap px-6 py-4 border-r font-semibold">Tầng</td>
																		<td className="whitespace-nowrap px-6 py-4 border-r font-semibold">Phòng</td>
																	</tr>
																</tbody>
															</table>
														</td>
														<td className="whitespace-nowrap px-6 py-4 border-r">{"0334350166"}</td>
														<td className="whitespace-nowrap px-6 py-4 border-r">{yeucau.DT_QLTS_TS_ID}</td>
														<td className="whitespace-nowrap px-6 py-4 border-r">{yeucau.DT_QLTS_TS_ID}</td>
														<td className="whitespace-nowrap px-6 py-4 border-r">{"Tống Bá Quang Anh"}</td>
														<td className="whitespace-nowrap px-6 py-4 border-r">{"11/11/2023"}</td>
													</tr>
												))}
										</tbody>
									</table>
								)}
								{/* END: table navigation */}
							</div>
							<ReactPaginate
								className="flex flex-row items-center gap-4 p-3"
								pageClassName="border px-3 py-1"
								previousLabel={<AiFillCaretLeft className="text-2xl text-sky-800" />}
								nextLabel={<AiFillCaretRight className="text-2xl text-sky-800" />}
								pageCount={listYeuCauSuCo ? Math.ceil(listYeuCauSuCo.length / ITEMS_PER_PAGE) : 0}
								pageRangeDisplayed={2}
								marginPagesDisplayed={1}
								onPageChange={handlePageChange}
								containerClassName="pagination"
								activeClassName="bg-sky-900 text-white font-semibold"
							/>
						</div>
					</div>
					{/* END: list-require__table */}
				</div>
				{/* START: Modal Add */}
				<ModalYeuCauHoTro isShow={showModal} onShowModal={handleShowModal} />
			</section>
			{/* END: .uneti-qlsp__list-require Danh sách yêu cầu */}
		</main>
	);
}

export default HomeTaiSan;
