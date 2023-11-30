import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdAddCircle, MdOutlineDownloading, MdPause, MdCheckBox } from "react-icons/md";
import { CiViewList, CiClock2 } from "react-icons/ci";
import { HiMiniBellAlert } from "react-icons/hi2";
import { FaFile, FaRegTrashAlt } from "react-icons/fa";
import { HiOutlineFolderDownload } from "react-icons/hi";
import { FiCheckSquare } from "react-icons/fi";
import { IoCloseCircleOutline, IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import clsx from "clsx";

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
							<Link className="flex flex-row items-center  gap-2 mb-4 bg-slate-200 p-2 rounded-md hover:bg-slate-500 hover:text-white">
								<MdAddCircle size={24} />
								<span>Thêm quy trình hồ sơ</span>
							</Link>
						</li>
						<li>
							<Link className="flex flex-row items-center  gap-2 mb-4 bg-slate-200 p-2 rounded-md hover:bg-slate-500 hover:text-white">
								<CiViewList size={24} />
								<span>Danh sách quy trình hồ sơ</span>
							</Link>
						</li>
					</ul>
				</div>
				<div className="mb-4">
					<h4 className="text-md font-bold uppercase mb-4">Danh sách công việc</h4>
					<ul>
						<li>
							<Link className="flex flex-row items-center justify-between  gap-2 mb-4 bg-slate-200 p-2 rounded-md hover:bg-slate-500 hover:text-white">
								<div className="flex flex-row items-center  gap-2">
									<MdOutlineDownloading size={24} />
									<span>Đang xử lý</span>
								</div>
								<p className="px-1 py-[0.5] bg-red-500 rounded-md text-white">120</p>
							</Link>
						</li>
						<li>
							<Link className="flex flex-row items-center justify-between  gap-2 mb-4 bg-slate-200 p-2 rounded-md hover:bg-slate-500 hover:text-white">
								<div className="flex flex-row items-center  gap-2">
									<MdCheckBox size={24} />
									<span>Đã chuyển</span>
								</div>
								<p className="px-1 py-[0.5] bg-red-500 rounded-md text-white">1252</p>
							</Link>
						</li>
					</ul>
				</div>
				{/* END: Danh sách công việc */}
				<div className="mb-4">
					<h4 className="text-md font-bold uppercase mb-4">Danh sách hồ sơ</h4>
					<ul>
						<li>
							<Link className="flex flex-row items-center justify-between  gap-2 mb-4 bg-slate-200 p-2 rounded-md hover:bg-slate-500 hover:text-white">
								<div className="flex flex-row items-center  gap-2">
									<HiMiniBellAlert color="red" size={16} />
									<span>Hồ sơ sắp hết hạn</span>
								</div>
								<p className="px-1 py-[0.5] bg-red-500 rounded-md text-white">120</p>
							</Link>
						</li>
						<li>
							<Link className="flex flex-row items-center justify-between  gap-2 mb-4 bg-slate-200 p-2 rounded-md hover:bg-slate-500 hover:text-white">
								<div className="flex flex-row items-center  gap-2">
									<FaFile color="#0484AC" size={16} />
									<span>Đã nộp - chờ tiếp nhận</span>
								</div>
								<p className="px-1 py-[0.5] bg-red-500 rounded-md text-white">120</p>
							</Link>
						</li>
						<li>
							<Link className="flex flex-row items-center justify-between  gap-2 mb-4 bg-slate-200 p-2 rounded-md hover:bg-slate-500 hover:text-white">
								<div className="flex flex-row items-center  gap-2">
									<HiOutlineFolderDownload size={16} />
									<span>Đã tiếp nhận chờ chuyển</span>
								</div>
								<p className="px-1 py-[0.5] bg-red-500 rounded-md text-white">120</p>
							</Link>
						</li>
						<li>
							<Link className="flex flex-row items-center justify-between  gap-2 mb-4 bg-slate-200 p-2 rounded-md hover:bg-slate-500 hover:text-white">
								<div className="flex flex-row items-center  gap-2">
									<MdOutlineDownloading size={16} />
									<span>Đang xử lý</span>
								</div>
								<p className="px-1 py-[0.5] bg-red-500 rounded-md text-white">120</p>
							</Link>
						</li>
						<li>
							<Link className="flex flex-row items-center justify-between  gap-2 mb-4 bg-slate-200 p-2 rounded-md hover:bg-slate-500 hover:text-white">
								<div className="flex flex-row items-center  gap-2">
									<MdPause size={16} />
									<span>Dừng tính</span>
								</div>
								<p className="px-1 py-[0.5] bg-red-500 rounded-md text-white">120</p>
							</Link>
						</li>
						<li>
							<Link className="flex flex-row items-center justify-between  gap-2 mb-4 bg-slate-200 p-2 rounded-md hover:bg-slate-500 hover:text-white">
								<div className="flex flex-row items-center  gap-2">
									<FiCheckSquare size={16} />
									<span>Chờ giao trả</span>
								</div>
								<p className="px-1 py-[0.5] bg-red-500 rounded-md text-white">120</p>
							</Link>
						</li>
						<li>
							<Link className="flex flex-row items-center justify-between  gap-2 mb-4 bg-slate-200 p-2 rounded-md hover:bg-slate-500 hover:text-white">
								<div className="flex flex-row items-center  gap-2">
									<MdCheckBox size={16} />
									<span>Đã giao trả</span>
								</div>
								<p className="px-1 py-[0.5] bg-red-500 rounded-md text-white">120</p>
							</Link>
						</li>
						<li>
							<Link className="flex flex-row items-center justify-between  gap-2 mb-4 bg-slate-200 p-2 rounded-md hover:bg-slate-500 hover:text-white">
								<div className="flex flex-row items-center  gap-2">
									<IoCloseCircleOutline size={16} />
									<span>Từ chối giải quyết</span>
								</div>
								<p className="px-1 py-[0.5] bg-red-500 rounded-md text-white">120</p>
							</Link>
						</li>
						<li>
							<Link className="flex flex-row items-center justify-between gap-2 mb-4 bg-slate-200 p-2 rounded-md hover:bg-slate-500 hover:text-white">
								<div className="flex flex-row items-center  gap-2">
									<FaRegTrashAlt size={16} />
									<span>Hủy hồ sơ</span>
								</div>
								<p className="px-1 py-[0.5] bg-red-500 rounded-md text-white">120</p>
							</Link>
						</li>
						<li>
							<Link className="flex flex-row items-center justify-between gap-2 mb-4 bg-slate-200 p-2 rounded-md hover:bg-slate-500 hover:text-white">
								<div className="flex flex-row items-center gap-2">
									<CiClock2 size={16} />
									<span>Đang chờ kết quả phối hợp</span>
								</div>
								<p className="px-1 py-[0.5] bg-red-500 rounded-md text-white">120</p>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default SidebarTTHCGV;
