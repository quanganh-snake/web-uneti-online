import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdAddCircle, MdCheckBox } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FaFileSignature } from "react-icons/fa6";

import clsx from "clsx";

const PATH_TTHCGV = "/admin/quantriTTHCGV/hosothutuc";

function SidebarTTHCGV() {
	const [openMenuQuanTri, setOpenMenuQuanTri] = useState(true);
	const handleOpenMenuQuanTri = () => {
		setOpenMenuQuanTri(!openMenuQuanTri);
	};

	return (
		<div className={clsx("bg-white p-4 rounded-xl shadow-xl", openMenuQuanTri ? "min-w-[308px] flex flex-col" : "")}>
			<div className="mb-4">
				{openMenuQuanTri ? (
					<IoClose size={32} className="hover:text-red-500 cursor-pointer float-right" onClick={handleOpenMenuQuanTri} />
				) : (
					<GiHamburgerMenu size={26} className=" cursor-pointer hover:text-slate-400" onClick={handleOpenMenuQuanTri} />
				)}
			</div>
			<div className={clsx(openMenuQuanTri ? "" : "hidden")}>
				<div className="mb-4">
					<h4 className="text-md font-bold uppercase mb-4">Quy trình/Hồ sơ</h4>
					<ul>
						<li>
							<Link to={`${PATH_TTHCGV}/them`} className="flex flex-row items-center  gap-2 mb-4 bg-slate-200 p-2 rounded-md hover:bg-slate-500 hover:text-white">
								<MdAddCircle size={24} />
								<span>Thêm quy trình hồ sơ</span>
							</Link>
						</li>
						<li>
							<Link to={`${PATH_TTHCGV}/xem/tatca`} className="flex flex-row items-center  gap-2 mb-4 bg-slate-200 p-2 rounded-md hover:bg-slate-500 hover:text-white">
								<CiViewList size={24} />
								<span>Danh sách quy trình hồ sơ</span>
							</Link>
						</li>
					</ul>
				</div>
				<div className="mb-4">
					<h4 className="text-md font-bold uppercase mb-4">Danh sách hồ sơ</h4>
					<ul>
						<li>
							<Link to={"/admin/canbonghiepvu"} className="flex flex-row items-center justify-between  gap-2 mb-4 bg-slate-200 p-2 rounded-md hover:bg-slate-500 hover:text-white">
								<div className="flex flex-row items-center  gap-2">
									<AiOutlineFileSearch size={24} />
									<span>Theo dõi hồ sơ</span>
								</div>
								{/* <p className="px-1 py-[0.5] bg-red-500 rounded-md text-white">120</p> */}
							</Link>
						</li>
						<li>
							<Link to={"/admin/canbonghiepvu/hosoxuly"} className="flex flex-row items-center justify-between  gap-2 mb-4 bg-slate-200 p-2 rounded-md hover:bg-slate-500 hover:text-white">
								<div className="flex flex-row items-center  gap-2">
									<FaFileSignature size={24} />
									<span>Hồ sơ cần xử lý</span>
								</div>
								{/* <p className="px-1 py-[0.5] bg-red-500 rounded-md text-white">1252</p> */}
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default SidebarTTHCGV;
