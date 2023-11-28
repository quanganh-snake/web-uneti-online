import React from "react";
import PropTypes from "prop-types";
import Breadcrumb from "../../../Components/Breadcumb/Breadcrumb";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import SidebarTTHCGV from "./SidebarTTHCGV/SidebarTTHCGV";
import { changeSlug } from "../../../Services/Utils/stringUtils";
function HomeTTHCGVView(props) {
	const { home } = props;

	const fakeDataTables = [
		{
			id: 1,
			name: "Quy trình đề nghị cấp lại mật khẩu tài khoản email",
			level: 4,
			type: "Nộp hồ sơ",
			linhVuc: "CNTT",
		},
		{
			id: 2,
			name: "Quy trình đề nghị cấp tài khoản: Email, LMS, phân quyền: EDU, EGOV",
			level: 4,
			type: "Nộp hồ sơ",
			linhVuc: "CNTT",
		},
		{
			id: 3,
			name: "Quy trình đề nghị cấp lại mật khẩu tài khoản LMS",
			level: 4,
			type: "Nộp hồ sơ",
			linhVuc: "CNTT",
		},
		{
			id: 4,
			name: "Quy trình đề nghị cấp lại tên miền và hệ quản trị nội dung website",
			level: 3,
			type: "Nộp hồ sơ",
			linhVuc: "CNTT",
		},
		{
			id: 5,
			name: "Quy trình đề nghị cấp tên miền và trỏ tên miền ra máy chủ bên ngoài",
			level: 3,
			type: "Nộp hồ sơ",
			linhVuc: "TCCB",
		},
	];

	// events handlers
	const handleSearch = (e) => {
		e.preventDefault();
	};
	return (
		<div className="flex flex-col md:flex-row gap-2">
			<div className="bg-white p-4">
				<SidebarTTHCGV />
			</div>
			<div className="grow bg-white w-full p-4">
				<Breadcrumb home={home} breadcrumbs={[]} />
				{/* START: Form search */}
				<div className="mt-5">
					<div className="flex flex-col md:flex-row items-center gap-4">
						<button className="w-full md:w-auto px-3 py-2 rounded-full bg-[#0484AC] text-white font-semibold hover:opacity-70 md:whitespace-nowrap">Tìm kiếm nâng cao</button>
						<form className="w-full relative" onSubmit={handleSearch}>
							<input type="text" className="w-full rounded-full px-3 py-2 border focus:outline-none" placeholder="Nhập nội dung tìm kiếm" name="" id="" />
							<span className="absolute px-4 py-2 right-0 top-0 font-semibold cursor-pointer">
								<FiSearch size={24} className="font-semibold" />
							</span>
							<button type="submit" className="hidden">
								Tìm kiếm
							</button>
						</form>
						<select className="w-full md:w-auto px-3 py-2 border rounded-full font-semibold text-white bg-[#0484AC] focus:outline-none" name="" id="">
							<option value="">Số thủ tục hiển thị</option>
							<option value="">5</option>
							<option value="">10</option>
							<option value="">15</option>
						</select>
					</div>
				</div>
				{/* END: Form search */}
				{/* START: Table DS Thủ tục */}
				<div className="my-5">
					<table className="w-full table-auto">
						<thead className="bg-[#075985] text-white rounded-t-xl">
							<tr>
								<th className="border-r px-2 py-1 rounded-tl-xl">STT</th>
								<th className="border-r px-2 py-1">Tên thủ tục</th>
								<th className="px-2 py-1 rounded-tr-xl">Lĩnh vực</th>
							</tr>
						</thead>
						<tbody>
							{fakeDataTables &&
								fakeDataTables.map((iData, index) => {
									const nameSlug = changeSlug(iData.name);
									return (
										<tr key={iData.id}>
											<td className="border border-slate-300 text-center">{index + 1}</td>
											<td className="border border-slate-300">
												<div className="px-2">
													<ul>
														<li>
															<Link to={`/tthcgiangvien/chitiet/${nameSlug}/${iData.id}`} className="uppercase font-semibold text-[#0C4A6E]">
																{iData.name}
															</Link>
														</li>
														<li>
															<span className="flex items-center gap-2">
																Mức độ:{" "}
																<span className="inline-block w-4 h-4 bg-[#075985] rounded-full text-center text-white font-semibold text-xs">{iData.level}</span>
															</span>
														</li>
														<li>
															<span className="font-semibold italic text-red-600">{iData.type}</span>
														</li>
													</ul>
												</div>
											</td>
											<td className="border border-slate-300">
												<p className="px-2 text-center">{iData.linhVuc}</p>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
				{/* END: Table DS Thủ tục */}
			</div>
		</div>
	);
}

HomeTTHCGVView.propTypes = {};

export default HomeTTHCGVView;
