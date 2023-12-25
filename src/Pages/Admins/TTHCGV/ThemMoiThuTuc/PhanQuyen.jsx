import React, { useEffect, useState } from "react";
import { getAllNhanSuByIDPhongBan, getAllPhongBan } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";

import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import clsx from "clsx";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

function PhanQuyen({ phanQuyen, setPhanQuyen, setThongTinActive, setTPHoSoDeNghiActive, setTrinhTuThucHienActive, setPhanQuyenActive, setTrangThaiActive }) {
	const [listDonViThucHien, setListDonViThucHien] = useState([]);
	const [listNhanSuThucHien, setListNhanSuThucHien] = useState([]);

	const [donViSelected, setDonViSelected] = useState({});
	const [searchDonVi, setSearchDonVi] = useState("");

	const [inputToThucHien, setInputToThucHien] = useState("");
	const [inputNhomThucHien, setInputNhomThucHien] = useState("");

	const [nhanSuSelected, setNhanSuSelected] = useState([]);
	const [searchNhanSu, setSearchNhanSu] = useState("");

	const [openSelectDonVi, setOpenSelectDonVi] = useState(false);
	const [openSelectNhanSu, setOpenSelectNhanSu] = useState(false);

	const handleSelectData = (value, idSelect) => {
		if (idSelect === "donvi") {
			setDonViSelected(value);
		}

		if (idSelect === "nhansu") {
			setNhanSuSelected(value);
			let dataNhanSuPhanQuyen = {
				...value,
				MC_TTHC_GV_PhanQuyen_DonVi: donViSelected?.TenPhongBan ? donViSelected?.TenPhongBan : "",
				MC_TTHC_GV_PhanQuyen_To: inputToThucHien,
				MC_TTHC_GV_PhanQuyen_Nhom: inputNhomThucHien,
				MC_TTHC_GV_PhanQuyen_QuyenFull: true,
				MC_TTHC_GV_PhanQuyen_QuyenXem: true,
				MC_TTHC_GV_PhanQuyen_QuyenThem: true,
				MC_TTHC_GV_PhanQuyen_QuyenSua: true,
				MC_TTHC_GV_PhanQuyen_QuyenXoa: true,
			};
			setPhanQuyen([...phanQuyen, dataNhanSuPhanQuyen]);
		}
	};

	useEffect(() => {
		const getListDepartments = async () => {
			const resultGetListDepartments = await getAllPhongBan();
			if (resultGetListDepartments.status === 200) {
				const dataListDepartments = resultGetListDepartments.data.body;
				if (dataListDepartments && dataListDepartments.length) {
					setListDonViThucHien(dataListDepartments);
				}
			}
		};

		getListDepartments();
	}, []);

	useEffect(() => {
		const getListPersonnel = async () => {
			const resultGetListPersonnel = await getAllNhanSuByIDPhongBan(donViSelected?.IDPhongBan);
			if (resultGetListPersonnel.status === 200) {
				const dataListPersonnel = await resultGetListPersonnel?.data?.body;
				if (dataListPersonnel && dataListPersonnel?.length) {
					setListNhanSuThucHien(dataListPersonnel);
				}
			}
		};
		getListPersonnel();
	}, [donViSelected]);

	return (
		<div className="uneti-tthcgv__phanquyen mb-5">
			<h2 className="text-2xl font-semibold uppercase mb-4">Thiết lập phân quyền thực hiện</h2>
			<div className="grid grid-cols-4 gap-5 mb-4">
				{/* START: Select Đơn Vị Thực Hiện */}
				<div className="col-span-4 md:col-span-2">
					<div className="flex flex-col gap-2">
						<label htmlFor="MC_TTHC_GV_PhanQuyen_DonVi" className="font-semibold">
							Đơn vị thực hiện
						</label>
						<div className="col-span-4 md:col-span-2 relative">
							<div
								id="MC_TTHC_GV_PhanQuyen_DonVi"
								onClick={() => {
									setOpenSelectDonVi(!openSelectDonVi);
								}}
								className="bg-white w-full p-2 flex items-center justify-between rounded-md border border-slate-300 cursor-pointer"
							>
								<span className={clsx(donViSelected && "text-gray-700 font-semibold")}>
									{" "}
									{donViSelected?.TenPhongBan
										? donViSelected?.TenPhongBan?.length > 50
											? donViSelected?.TenPhongBan?.substring(0, 50) + "..."
											: donViSelected?.TenPhongBan
										: "Chọn đơn vị thực hiện"}{" "}
								</span>
								<BiChevronDown size={20} className={clsx(openSelectDonVi && "rotate-180")} />
							</div>
							<ul className={clsx("bg-white mt-2 border shadow-md overflow-y-auto absolute right-0 left-0 top-full", openSelectDonVi ? "max-h-60" : "hidden")}>
								<div className="flex items-center px-2 sticky top-0 bg-white shadow-md">
									<AiOutlineSearch size={18} className="text-gray-700" />
									<input
										type="text"
										value={searchDonVi}
										onChange={(e) => {
											setSearchDonVi(e.target.value.toLowerCase());
										}}
										placeholder="Nhập tên phòng ban"
										className="w-full placeholder:text-gray-500 p-2 outline-none"
									/>
								</div>
								{listDonViThucHien?.length &&
									listDonViThucHien?.map((iDonVi) => (
										<li
											key={iDonVi?.IDPhongBan}
											className={clsx(
												"p-2 text-sm cursor-pointer hover:bg-sky-600 hover:text-white",
												iDonVi?.TenPhongBan.toLowerCase().includes(searchDonVi) ? "block" : "hidden",
												iDonVi?.TenPhongBan.toLowerCase() === donViSelected?.TenPhongBan?.toLowerCase() && "bg-sky-600 text-white font-medium"
											)}
											onClick={() => {
												handleSelectData(iDonVi, "donvi");
												setOpenSelectDonVi(false);
												setSearchDonVi("");
											}}
										>
											{iDonVi?.TenPhongBan}
										</li>
									))}
							</ul>
						</div>
					</div>
				</div>
				{/* END: Select Đơn Vị Thực Hiện */}

				{/* START: Select Tổ nghiệp vụ */}
				<div className="col-span-4 md:col-span-2">
					<div className="flex flex-col gap-2">
						<label htmlFor="MC_TTHC_GV_PhanQuyen_To">
							<p className="font-semibold mb-2">Tổ nghiệp vụ (Nếu có)</p>
							<input
								className="px-3 py-2 w-full rounded-lg border border-slate-300 focus:outline-slate-300"
								type="text"
								placeholder="Nhập tổ nghiệp vụ"
								name="MC_TTHC_GV_PhanQuyen_To"
								id="MC_TTHC_GV_PhanQuyen_To"
								onChange={(e) => {
									setInputToThucHien(e.target.value);
								}}
							/>
						</label>
					</div>
				</div>
				{/* END: Select Tổ nghiệp vụ */}

				{/* START: Select Nhóm thực hiện */}
				<div className="col-span-4 md:col-span-2">
					<div className="flex flex-col gap-2">
						<label htmlFor="MC_TTHC_GV_PhanQuyen_Nhom">
							<p className="font-semibold mb-2">Nhóm thực hiện (Nếu có)</p>
							<input
								className="px-3 py-2 w-full rounded-lg border border-slate-300 focus:outline-slate-300"
								type="text"
								placeholder="Nhập nhóm thực hiện"
								name="MC_TTHC_GV_PhanQuyen_Nhom"
								id="MC_TTHC_GV_PhanQuyen_Nhom"
								onChange={(e) => {
									setInputNhomThucHien(e.target.value);
								}}
							/>
						</label>
					</div>
				</div>
				{/* END: Select Nhóm thực hiện */}

				{/* START: Select Nhân sự thực hiện */}
				<div className="col-span-4 md:col-span-2">
					<div className="flex flex-col gap-2">
						<label htmlFor="MC_TTHC_GV_PhanQuyen_HoTen" className="font-semibold">
							<p>
								Chọn nhân sự thực hiện <span className="text-red-500 font-semibold">*</span>
							</p>
						</label>
						<div className="col-span-4 md:col-span-2 relative">
							<div
								id="MC_TTHC_GV_PhanQuyen_DonVi"
								onClick={() => {
									setOpenSelectNhanSu(!openSelectNhanSu);
								}}
								className="bg-white w-full p-2 flex items-center justify-between rounded-md border border-slate-300 cursor-pointer"
							>
								<span className={clsx(nhanSuSelected && "text-gray-700 font-semibold")}>Chọn nhân sự thực hiện</span>
								<BiChevronDown size={20} className={clsx(openSelectNhanSu && "rotate-180")} />
							</div>
							<ul className={clsx("bg-white mt-2 border shadow-sm overflow-y-auto absolute right-0 left-0 top-full", openSelectNhanSu ? "max-h-60" : "hidden")}>
								<div className="flex items-center px-2 sticky top-0 bg-white shadow-md">
									<AiOutlineSearch size={18} className="text-gray-700" />
									<input
										type="text"
										value={searchNhanSu}
										onChange={(e) => {
											setSearchNhanSu(e.target.value.toLowerCase());
										}}
										placeholder="Nhập tên nhân sự"
										className="w-full placeholder:text-gray-500 p-2 outline-none"
									/>
								</div>
								{listNhanSuThucHien &&
									listNhanSuThucHien?.map((iNhanSu, index) => {
										return (
											<li
												key={index}
												className={clsx(
													"p-2 text-sm cursor-pointer hover:bg-sky-600 hover:text-white",
													iNhanSu?.HoVaTen.toLowerCase().includes(searchNhanSu) ? "block" : "hidden",
													iNhanSu?.HoVaTen.toLowerCase() === nhanSuSelected?.HoVaTen?.toLowerCase() && "bg-sky-600 text-white font-medium"
												)}
												onClick={() => {
													handleSelectData({ MC_TTHC_GV_PhanQuyen_MaNhanSu: iNhanSu.MaNhanSu, MC_TTHC_GV_PhanQuyen_HoTen: iNhanSu.HoVaTen }, "nhansu");
													setOpenSelectNhanSu(false);
													setSearchNhanSu("");
												}}
											>
												{iNhanSu?.MaNhanSu + " - " + iNhanSu?.HoVaTen}
											</li>
										);
									})}
							</ul>
						</div>
					</div>
				</div>
				{/* END: Select Nhân sự thực hiện */}
				{phanQuyen && phanQuyen.length ? (
					<div className="col-span-4">
						<div className="flex flex-col gap-4">
							<h4>Danh sách nhân sự được chọn</h4>
							<div className="flex flex-wrap gap-2 p-2 border border-slate-500 rounded-md">
								{phanQuyen?.map((iPhanQuyen, index) => {
									return (
										<p key={index} className="p-2 border rounded-md flex items-center gap-4">
											<span>{iPhanQuyen.MC_TTHC_GV_PhanQuyen_MaNhanSu + " - " + iPhanQuyen.MC_TTHC_GV_PhanQuyen_HoTen}</span>
											<MdClose
												size={20}
												color="red"
												className="cursor-pointer hover:opacity-70"
												onClick={() => {
													const newPhanQuyen = phanQuyen.splice(index, 1);
													setPhanQuyen([...phanQuyen]);
												}}
											/>
										</p>
									);
								})}
							</div>
						</div>
					</div>
				) : null}
			</div>

			<div className="flex items-center gap-3">
				<button
					type="button"
					onClick={() => {
						setPhanQuyenActive(false);
						setTrinhTuThucHienActive(true);
					}}
					className="font-semibold text-md flex items-center gap-2 px-3 py-2 bg-teal-600 text-white rounded-lg hover:opacity-70"
				>
					<FaArrowLeft />
					<span className="text-md">Quay lại</span>
				</button>
				<button
					type="button"
					onClick={() => {
						setPhanQuyenActive(false);
						setTrangThaiActive(true);
					}}
					className="font-semibold text-md flex items-center gap-2 px-3 py-2 bg-teal-600 text-white rounded-lg hover:opacity-70"
				>
					<span className="text-md">Tiếp theo</span>
					<FaArrowRight />
				</button>
			</div>
		</div>
	);
}

export default PhanQuyen;
