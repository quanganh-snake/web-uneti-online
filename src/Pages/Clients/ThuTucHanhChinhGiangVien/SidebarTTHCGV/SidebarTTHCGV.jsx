import clsx from "clsx";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { getAllPhongBan } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";
function SidebarTTHCGV({ listDepartments }) {
	const fakeDataLinhVuc = [
		{
			id: 1,
			TenPhongBan: "Chính trị và Công tác Sinh viên",
		},
		{
			id: 2,
			TenPhongBan: "Phòng Đào tạo",
		},
		{
			id: 3,
			TenPhongBan: "Phòng Tổ chức Cán bộ",
		},
		{
			id: 4,
			TenPhongBan: "Tài chính - Kế toán",
		},
		{
			id: 5,
			TenPhongBan: "Quản trị mạng",
		},
		{
			id: 6,
			TenPhongBan: "Quản trị kinh doanh",
		},
		{
			id: 7,
			TenPhongBan: "Đào tạo từ xa",
		},
		{
			id: 8,
			TenPhongBan: "Quản lý thiết bị, tài sản",
		},
		{
			id: 9,
			TenPhongBan: "Đại học tại chức",
		},
		{
			id: 10,
			TenPhongBan: "Đào tạo sau đại học",
		},
		{
			id: 11,
			TenPhongBan: "Đào tạo Quốc tế",
		},
	];

	const [openMenu, setOpenMenu] = useState(true);
	const [dataSelect, setDataSelect] = useState(null);

	const handleOpenMenu = () => {
		setOpenMenu(!openMenu);
	};

	const handleChangeSelectionData = (e) => {
		const { id } = e.target;

		if (id === "linhvuc") {
			setDataSelect(fakeDataLinhVuc);
		}

		if (id === "donvi") {
			setDataSelect(listDepartments);
		}
	};

	useEffect(() => {
		const getAllDepartments = async () => {
			const resultAllDepartments = await getAllPhongBan();
			if (resultAllDepartments.status === 200) {
				const dataDepartments = await resultAllDepartments?.data?.body;
				if (dataDepartments) {
					setDataSelect(dataDepartments);
				}
			}
		};

		getAllDepartments();
	}, [dataSelect]);

	return (
		<div className="w-full md:max-w-[220px]">
			<div className={clsx("uneti__menu mb-2 flex", openMenu ? "justify-end" : "justify-start ")}>
				{openMenu ? (
					<MdClose size={24} className="cursor-pointer hover:text-red-600" onClick={handleOpenMenu} />
				) : (
					<MdMenu size={24} className="cursor-pointer hover:text-slate-700 hover:opacity-70" onClick={handleOpenMenu} />
				)}
			</div>
			<div className={clsx("uneti__luachon border p-2", openMenu ? "flex justify-between items-center gap-4" : "hidden")}>
				<label onChange={handleChangeSelectionData} htmlFor="donvi" className="flex items-center gap-2 whitespace-nowrap">
					<input type="radio" defaultChecked name="luachon" id="donvi" />
					<span>Đơn vị</span>
				</label>
				<label onChange={handleChangeSelectionData} htmlFor="linhvuc" className="flex items-center gap-2 whitespace-nowrap">
					<input type="radio" name="luachon" id="linhvuc" />
					<span>Lĩnh vực</span>
				</label>
			</div>
			<div className={clsx("uneti__luachon--list my-4  max-h-[500px] overflow-y-auto", openMenu ? "" : "hidden")}>
				{dataSelect &&
					dataSelect.length > 0 &&
					dataSelect.map((iData, index) => {
						return (
							<div className="uneti__luachon--item px-2 py-1 border hover:bg-[#336699] hover:text-white hover:font-semibold" key={index}>
								<Link>
									<p className="truncate">{iData.TenPhongBan}</p>
								</Link>
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default SidebarTTHCGV;
