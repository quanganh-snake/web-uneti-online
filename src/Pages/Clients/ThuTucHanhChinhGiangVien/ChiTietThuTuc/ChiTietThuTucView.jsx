import React from "react";
import PropTypes from "prop-types";
import SidebarTTHCGV from "../SidebarTTHCGV/SidebarTTHCGV";
import Breadcrumb from "../../../../Components/Breadcumb/Breadcrumb";
import { Link, useParams } from "react-router-dom";

function ChiTietThuTucView(props) {
	const { tieude, id } = useParams();

	const { idThuTuc, home, breadcrumbs } = props;

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

	return (
		<div className="flex flex-col md:flex-row gap-2">
			<div className="flex-grow-1 bg-white p-4 md:h-[100vh]">
				<SidebarTTHCGV />
			</div>
			<div className="flex-grow-2 bg-white w-full p-4">
				<Breadcrumb home={home} breadcrumbs={breadcrumbs} />
				<div className="mt-4 mb-2 flex flex-row justify-between">
					<p className="px-3 py-1 bg-white text-[#336699] border border-[#336699] rounded-md font-semibold">Thông tin thủ tục</p>
					<Link to={`/tthcgiangvien/soanhoso/${tieude}/${id}/submit`} className="px-3 py-1 bg-[#336699] text-white rounded-md hover:opacity-70">
						Nộp hồ sơ
					</Link>
				</div>
				<div className="">
					<table className="w-full">
						<tbody>
							<tr>
								<td className="px-4 py-1 border border-slate-500 font-semibold">Lĩnh vực</td>
								<td className="px-4 py-1 border border-slate-500">CNTT</td>
							</tr>
							<tr>
								<td className="px-4 py-1 border border-slate-500 font-semibold">Mã thủ tục</td>
								<td className="px-4 py-1 border border-slate-500">TTHC-ĐT-xx</td>
							</tr>
							<tr>
								<td className="px-4 py-1 border border-slate-500 font-semibold">Tên thủ tục</td>
								<td className="px-4 py-1 border border-slate-500">
									<div className="uppercase font-semibold text-[#0C4A6E]">Quy trình đề nghị cấp tài khoản: Email, LMS, phân quyền: EDU, EGOV</div>
								</td>
							</tr>
							<tr>
								<td className="px-4 py-1 border border-slate-500 font-semibold">Thủ tục liên thông</td>
								<td className="px-4 py-1 border border-slate-500">
									<input type="checkbox" defaultChecked={true} disabled name="" id="" />
								</td>
							</tr>
							<tr>
								<td className="px-4 py-1 border border-slate-500 font-semibold">Thủ tục không áp dụng Một cửa</td>
								<td className="px-4 py-1 border border-slate-500"></td>
							</tr>
							<tr>
								<td className="px-4 py-1 border border-slate-500 font-semibold">Thành phần hồ sơ đề nghị</td>
								<td className="px-4 py-1 border border-slate-500">
									<table className="table-auto w-full">
										<thead className="bg-[#075985] text-white">
											<tr>
												<th className="rounded-tl-xl px-2 py-1">STT</th>
												<th className="border border-slate-300 px-2 py-1">Tên giấy tờ</th>
												<th className="border border-slate-300 px-2 py-1 lg:whitespace-nowrap">Mẫu hồ sơ/Hướng dẫn</th>
												<th className="border border-slate-300 px-2 py-1 lg:whitespace-nowrap">Bản chính</th>
												<th className="border border-slate-300 px-2 py-1 lg:whitespace-nowrap">Bản sao</th>
												<th className="rounded-tr-xl px-2 py-1 lg:whitespace-nowrap">Bắt buộc</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td className="border border-slate-300 text-center">1</td>
												<td className="border border-slate-300">
													<p className="px-2">Đề nghị cấp tài khoản: Email, LMS, phân quyền: EDU, EGOV</p>
												</td>
												<td className="border border-slate-300">
													<div className="px-2">
														<ol>
															<li>
																<div className="text-[#0C4A6E] font-semibold">1. TTHC-DT-01-CTK.docx</div>
															</li>
														</ol>
													</div>
												</td>
												<td className="border border-slate-300">
													<p className="text-center">1</p>
												</td>
												<td className="border border-slate-300">
													<p className="text-center">0</p>
												</td>
												<td className="border border-slate-300 text-center">
													<input type="checkbox" defaultChecked={true} disabled name="" id="" />
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr>
								<td className="px-4 py-1 border border-slate-500 font-semibold">Số bộ hồ sơ</td>
								<td className="px-4 py-1 border border-slate-500">
									<p>
										0 <span>bộ</span>
									</p>
								</td>
							</tr>
							<tr>
								<td className="px-4 py-1 border border-slate-500 font-semibold">Tổng thời gian giải quyết</td>
								<td className="px-4 py-1 border border-slate-500">
									<p>
										3 <span>ngày kể từ khi nhận đủ hồ sơ hợp lệ</span>
									</p>
								</td>
							</tr>
							<tr>
								<td className="px-4 py-1 border border-slate-500 font-semibold">Mô tả trình tự thực hiện</td>
								<td className="px-4 py-1 border border-slate-500">
									<table className="table-auto w-full">
										<thead className="bg-[#075985] text-white rounded-t-xl">
											<tr>
												<th className="rounded-tl-xl px-2 py-1">Bước</th>
												<th className="border border-slate-300 px-2 py-1">Tên công việc</th>
												<th className="border border-slate-300 px-2 py-1">Cách thức thực hiện</th>
												<th className="border border-slate-300 px-2 py-1">Địa chỉ tiếp nhận / trả hồ sơ</th>
												<th className="border border-slate-300 px-2 py-1">Đơn vị thực hiện / được ủy quyền thực hiện</th>
												<th className="border border-slate-300 px-2 py-1">Đơn vị phối hợp</th>
												<th className="border border-slate-300 px-2 py-1">Thời gian (ngày)</th>
												<th className="rounded-tr-xl px-2 py-1">Kết quả</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td className="border border-slate-300 text-center">1</td>
												<td className="border border-slate-300">
													<div className="px-2 text-[#245D7C] font-semibold">Tiếp nhận hồ sơ</div>
												</td>
												<td className="border border-slate-300">
													<div className="px-2">Nộp trực tuyến thông qua: Web/App</div>
												</td>
												<td className="border border-slate-300">
													<div className="text-center"></div>
												</td>
												<td className="border border-slate-300">
													<div className="text-center"></div>
												</td>
												<td className="border border-slate-300 text-center">
													<div></div>
												</td>
												<td className="border border-slate-300 text-center">
													<div>0.5</div>
												</td>
												<td className="border border-slate-300 text-center">
													<div></div>
												</td>
											</tr>
											<tr>
												<td className="border border-slate-300 text-center">2</td>
												<td className="border border-slate-300">
													<div className="px-2 text-[#245D7C] font-semibold">Xử lý hồ sơ</div>
												</td>
												<td className="border border-slate-300">
													<div className="px-2">Kiểm tra và xử lý hồ sơ đã nộp trên hệ thống phần mềm Uneti Online</div>
												</td>
												<td className="border border-slate-300">
													<div className="text-center"></div>
												</td>
												<td className="border border-slate-300">
													<div className="text-center">P.Đào tạo</div>
												</td>
												<td className="border border-slate-300 text-center">
													<div></div>
												</td>
												<td className="border border-slate-300 text-center">
													<div>2.5</div>
												</td>
												<td className="border border-slate-300 text-left">
													<div className="px-2 text-[#245D7C] font-semibold">
														Thông báo kết quả xử lý qua: Email / Thông báo trên ứng dụng Web, App <br /> - Duyệt ={">"} Thông báo kết quả; <br />- Không duyệt ={">"} Nêu lý
														do không được chấp nhận.
													</div>
												</td>
											</tr>
											<tr>
												<td className="border border-slate-300 text-center">3</td>
												<td className="border border-slate-300">
													<div className="px-2 font-semibold text-[#245D7C]">Trả kết quả</div>
												</td>
												<td className="border border-slate-300">
													<div className="px-2">Trả kết quả trực tuyến thông qua: Web/App</div>
												</td>
												<td className="border border-slate-300">
													<div className="text-center"></div>
												</td>
												<td className="border border-slate-300">
													<div className="text-center"></div>
												</td>
												<td className="border border-slate-300 text-center">
													<div></div>
												</td>
												<td className="border border-slate-300 text-center">
													<div className="px-2">0</div>
												</td>
												<td className="border border-slate-300 text-left">
													<div className="px-2 text-[#245D7C] font-semibold">
														- Thông báo kết quả cho CB.TCCB biết kết quả; <br />- Thông báo cho nhân sự biết thông tin tài khoản, mật khẩu thông qua email cá nhân …
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr>
								<td className="px-4 py-1 border border-slate-500 font-semibold">Thành phần hồ sơ đề nghị</td>
								<td className="px-4 py-1 border border-slate-500">
									<table className="table-auto w-full">
										<thead className="bg-[#075985] text-white rounded-t-xl">
											<tr>
												<th className="rounded-tl-xl px-2 py-1">STT</th>
												<th className="border border-slate-300 px-2 py-1">Mức phí</th>
												<th className="rounded-tr-xl px-2 py-1">Mô tả</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td colSpan={3} className="border border-slate-300">
													<span className="px-2 py-1 font-semibold">Không có phí</span>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr>
								<td className="px-4 py-1 border border-slate-500 font-semibold">Đối tượng thực hiện</td>
								<td className="px-4 py-1 border border-slate-500">
									<div></div>
								</td>
							</tr>
							<tr>
								<td className="px-4 py-1 border border-slate-500 font-semibold">Căn cứ pháp lý của TTHC</td>
								<td className="px-4 py-1 border border-slate-500">
									<div></div>
								</td>
							</tr>
							<tr>
								<td className="px-4 py-1 border border-slate-500 font-semibold">Yêu cầu hoặc điều kiện để thực hiện TTHC</td>
								<td className="px-4 py-1 border border-slate-500">
									<div></div>
								</td>
							</tr>
							<tr>
								<td className="px-4 py-1 border border-slate-500 font-semibold">Tệp thủ tục</td>
								<td className="px-4 py-1 border border-slate-500">
									<div></div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

ChiTietThuTucView.propTypes = {};

export default ChiTietThuTucView;
