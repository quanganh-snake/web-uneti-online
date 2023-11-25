import clsx from "clsx";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
function SidebarTTHCGV() {
	const fakeDataDonVi = [{ id: 1, name: "Trường Đại học Kinh tế - Kỹ thuật Công nghiệp" }];
	const fakeDataLinhVuc = [
		{
			id: 1,
			name: "Chính trị và Công tác Sinh viên",
		},
		{
			id: 2,
			name: "Phòng Đào tạo",
		},
		{
			id: 3,
			name: "Phòng Tổ chức Cán bộ",
		},
		{
			id: 4,
			name: "Tài chính - Kế toán",
		},
		{
			id: 5,
			name: "Quản trị mạng",
		},
		{
			id: 6,
			name: "Quản trị kinh doanh",
		},
		{
			id: 7,
			name: "Đào tạo từ xa",
		},
		{
			id: 8,
			name: "Quản lý thiết bị, tài sản",
		},
		{
			id: 9,
			name: "Đại học tại chức",
		},
		{
			id: 10,
			name: "Đào tạo sau đại học",
		},
		{
			id: 11,
			name: "Đào tạo Quốc tế",
		},
	];

	const [openMenu, setOpenMenu] = useState(true);
	const [dataSelect, setDataSelect] = useState(fakeDataDonVi);

	const handleOpenMenu = () => {
		setOpenMenu(!openMenu);
	};

	const handleChangeSelectionData = (e) => {
		const { id } = e.target;

		if (id === "linhvuc") {
			setDataSelect(fakeDataLinhVuc);
		}

		if (id === "donvi") {
			setDataSelect(fakeDataDonVi);
		}
	};

	useEffect(() => {}, [dataSelect]);

	return (
		<div className="w-full md:max-w-[220px]">
			<div className={clsx("uneti__menu mb-2 flex", openMenu ? "justify-end" : "justify-start")}>
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
			<div className={clsx("uneti__luachon--list my-4", openMenu ? "" : "hidden")}>
				{dataSelect &&
					dataSelect.length > 0 &&
					dataSelect.map((iData, index) => {
						return (
							<div className="uneti__luachon--item px-2 py-1 border hover:bg-[#336699] hover:text-white hover:font-semibold" key={iData.id}>
								<Link>
									<p className="truncate">{iData.name}</p>
								</Link>
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default SidebarTTHCGV;
