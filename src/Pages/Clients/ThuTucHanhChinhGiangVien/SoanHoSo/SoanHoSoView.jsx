import React from "react";
import PropTypes from "prop-types";
import SidebarTTHCGV from "../SidebarTTHCGV/SidebarTTHCGV";
import Breadcrumb from "../../../../Components/Breadcumb/Breadcrumb";
import { Link, useParams } from "react-router-dom";
import { FaUpload, FaSave } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import { BsSend } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
function SoanHoSoView(props) {
	const { tieude, id } = useParams();

	const { home, breadcrumbs } = props;

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
			<div className="bg-white p-4">
				<SidebarTTHCGV />
			</div>
			<div className="grow bg-white w-full p-4">
				<Breadcrumb home={home} breadcrumbs={breadcrumbs} />
				<div className="grid grid-cols-2 gap-4 mt-5">
					<h2 className="text-lg mb-4 col-span-2">
						<span className="font-semibold">Tên thủ tục: </span>
						<span className="uppercase font-bold">Quy trình đề nghị cấp tài khoản: Email, LMS, phân quyền: EDU, EGOV</span>
						<Link to={`/tthcgiangvien/chitiet/${tieude}/${id}`} className="font-semibold text-[#245D7C] hover:opacity-70 mx-3">
							(Xem chi tiết)
						</Link>
					</h2>
					<div className="flex flex-col form-group mb-4 col-span-2 md:col-span-1">
						<label htmlFor="coquantiepnhan" className="font-semibold mb-2">
							Đơn vị tiếp nhận <span className="font-bold text-red-500">*</span>
						</label>
						<select className="px-2 py-1 border rounded-full focus:outline-[0.2px] focus:outline-slate-300" name="" id="coquantiepnhan">
							<option value="">Chọn đơn vị tiếp nhận</option>
							<option value="">Phòng Tổ chức Cán bộ</option>
							<option value="">Phòng Đào tạo</option>
							<option value="">Phòng Tài chính - Kế toán</option>
							<option value="">Phòng Chính trị & CTSV</option>
						</select>
					</div>
					<div className="flex flex-col form-group mb-4 col-span-2">
						<label htmlFor="noidungyc" className="font-semibold mb-2">
							Nội dung yêu cầu <span className="font-bold text-red-500">*</span>
						</label>
						<textarea
							className="border border-slate-300 px-2 py-1 rounded-xl focus:outline-1 focus:outline-slate-300"
							rows={4}
							name="noidungyc"
							id="noidungyc"
							placeholder="Nhập nội dung"
						></textarea>
					</div>
					<div className="flex flex-col form-group mb-4 col-span-2 md:col-span-1">
						<label htmlFor="coquantiepnhan" className="font-semibold mb-2">
							Hình thức nhận kết quả <span className="font-bold text-red-500">*</span>
						</label>
						<select className="px-2 py-1 border rounded-full focus:outline-[0.2px] focus:outline-slate-300" name="" id="coquantiepnhan">
							<option value="">Chọn hình thức nhận kết quả</option>
							<option value="">Trực tiếp</option>
							<option value="">Trực tuyến</option>
							<option value="">Bưu điện</option>
						</select>
					</div>
					<div className="flex flex-col form-group mb-4 col-span-2 md:col-span-1">
						<label htmlFor="detail-price" className="font-semibold mb-2">
							Thông tin nộp phí giải quyết hồ sơ
						</label>
						<input
							type="text"
							className="px-2 py-1 border rounded-full focus:outline-[0.2px] focus:outline-slate-300"
							placeholder="30000 VNĐ/Tài khoản"
							disabled
							name="detail-price"
							id="detail-price"
						/>
					</div>
					<div className="flex flex-col form-group mb-4 col-span-2 md:col-span-1">
						<label htmlFor="quantity" className="font-semibold mb-2">
							Nhập số lượng bản <span className="font-bold text-red-500">*</span>
						</label>
						<input type="number" className="px-2 py-1 border rounded-full focus:outline-[0.2px] focus:outline-slate-300" min={1} value={1} name="quantity" id="quantity" />
					</div>
					<div className="flex flex-col form-group mb-4 col-span-2 md:col-span-1">
						<label htmlFor="price" className="font-semibold mb-2">
							Số tiền cần thanh toán
						</label>
						<input type="number" className="px-2 py-1 border rounded-full focus:outline-[0.2px] focus:outline-slate-300" value={30000} disabled name="price" id="price" />
					</div>
					<div className="flex flex-col form-group mb-4 col-span-2">
						<label htmlFor="price" className="font-semibold mb-2">
							Danh sách giấy tờ kèm theo
						</label>
						<table className="rounded-xl">
							<thead className="bg-[#0C4A6E] text-white">
								<tr className=" rounded-xl">
									<th className="px-2 py-1 md:whitespace-nowrap rounded-tl-lg">STT</th>
									<th className="px-2 py-1 md:whitespace-nowrap ">Tên giấy tờ</th>
									<th className="px-2 py-1 md:whitespace-nowrap ">Số lượng</th>
									<th className="px-2 py-1 md:whitespace-nowrap ">Bắt buộc</th>
									<th className="px-2 py-1 md:whitespace-nowrap rounded-tr-lg">Tệp đính kèm</th>
								</tr>
							</thead>
							<tbody>
								<tr className="border border-slate-300">
									<td className="px-2 py-1 border border-slate-300 text-center">1</td>
									<td className="px-2 py-1 border border-slate-300">
										<p>01 bản photo chứng minh thư nhân dân hoặc căn cước công dân (có kèm theo CMTND/CCCD gốc để đối chiếu)</p>
									</td>
									<td className="px-2 py-1 border border-slate-300">
										<p className="text-center text-[#0C4A6E] font-semibold">1 Bản chính</p>
									</td>
									<td className="px-2 py-1 border border-slate-300 text-center">
										<input type="checkbox" defaultChecked={true} disabled name="" id="" />
									</td>
									<td className="px-2 py-1 border border-slate-300">
										<label
											htmlFor="attachments"
											className="flex flex-row gap-2 items-center text-[#0C4A6E] md:justify-center font-semibold border border-[#0C4A6E] rounded-xl px-2 py-1 hover:opacity-70 cursor-pointer"
										>
											<FaUpload />
											<span className="md:whitespace-nowrap hidden lg:inline-block">Chọn file đính kèm</span>
										</label>
										<input type="file" accept="image/,.jpg,.jpeg,.png" name="attachments" className="hidden" id="attachments" />
									</td>
								</tr>
								<tr className="border border-slate-300">
									<td className="px-2 py-1 border border-slate-300 text-center">2</td>
									<td className="px-2 py-1 border border-slate-300">
										<p>01 ảnh 3x4</p>
									</td>
									<td className="px-2 py-1 border border-slate-300">
										<p className="text-center text-[#0C4A6E] font-semibold">1 Bản chính</p>
									</td>
									<td className="px-2 py-1 border border-slate-300 text-center">
										<input type="checkbox" defaultChecked={true} disabled name="" id="" />
									</td>
									<td className="px-2 py-1 border border-slate-300">
										<label
											htmlFor="attachments"
											className="flex flex-row gap-2 items-center text-[#0C4A6E] md:justify-center font-semibold border border-[#0C4A6E] rounded-xl px-2 py-1 hover:opacity-70 cursor-pointer"
										>
											<FaUpload />
											<span className="md:whitespace-nowrap hidden lg:inline-block">Chọn file đính kèm</span>
										</label>
										<input type="file" accept="image/,.jpg,.jpeg,.png" name="attachments" className="hidden" id="attachments" />
									</td>
								</tr>
								<tr className="border border-slate-300">
									<td className="px-2 py-1 border border-slate-300 text-center">3</td>
									<td className="px-2 py-1 border border-slate-300">
										<p>Đơn đề nghị cấp tài khoản: Email, Lms, phân quyền: EDU, EGOV</p>
										<p className="text-[#0C4A6E] italic hover:font-semibold cursor-pointer">1. Mẫu đơn đề nghị cấp tài khoản: Email, Lms, phân quyền: EDU, EGOV.docx</p>
									</td>
									<td className="px-2 py-1 border border-slate-300">
										<p className="text-center text-[#0C4A6E] font-semibold">1 Bản chính</p>
									</td>
									<td className="px-2 py-1 border border-slate-300 text-center">
										<input type="checkbox" defaultChecked={true} disabled name="" id="" />
									</td>
									<td className="px-2 py-1 border border-slate-300">
										<label
											htmlFor="attachments"
											className="flex flex-row gap-2 items-center text-[#0C4A6E] md:justify-center font-semibold border border-[#0C4A6E] rounded-xl px-2 py-1 hover:opacity-70 cursor-pointer"
										>
											<FaUpload />
											<span className="md:whitespace-nowrap hidden lg:inline-block">Chọn file đính kèm</span>
										</label>
										<input type="file" accept="image/,.jpg,.jpeg,.png" name="attachments" className="hidden" id="attachments" />
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="flex flex-row gap-4 col-span-2">
						<p className="flex flex-row gap-2 items-center cursor-pointer hover:opacity-70 bg-[#336699] text-white border border-slate-100 px-2 py-1 rounded-xl">
							<FaSave />
							<span>Lưu</span>
						</p>
						<p className="flex flex-row gap-2 items-center cursor-pointer hover:opacity-70 bg-green-700 text-white border border-slate-100 px-2 py-1 rounded-xl">
							<BsSend />
							<span>Nộp hồ sơ</span>
						</p>
						<p className="flex flex-row gap-2 items-center cursor-pointer hover:opacity-70 bg-red-500 text-white border border-slate-100 px-2 py-1 rounded-xl">
							<MdCancel className="text-white" />
							<span>Hủy</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

SoanHoSoView.propTypes = {};

export default SoanHoSoView;
