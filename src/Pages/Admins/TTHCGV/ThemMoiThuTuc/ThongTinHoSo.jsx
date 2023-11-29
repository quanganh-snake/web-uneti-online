import React from "react";
import PropTypes from "prop-types";

function ThongTinHoSo(props) {
	const { tenThuTuc, viTri, maThuTuc, mucDo, tongThoiGianGiaiQuyet, linhVuc, donViTiepNhan, noiTraKetQua, thuTucLienThong, thuTucKhongApDungMotCua, handleChangeValue } = props;
	return (
		<div className="uneti-tthcgv__thongtinhoso mb-5">
			<h2 className="text-2xl font-semibold uppercase mb-4">Thiết lập thông tin hồ sơ</h2>
			<div className="grid grid-cols-4 gap-5">
				<div className="col-span-4 lg:col-span-2">
					<label htmlFor="MC_TTHC_GV_TenThuTuc">
						<p className="font-semibold mb-2">
							Tên thủ tục <span className="text-red-500">*</span>
						</p>
						<input
							type="text"
							placeholder="Nhập tên thủ tục..."
							className="px-3 py-2 w-full rounded-full border border-slate-300 focus:outline-slate-300"
							name="MC_TTHC_GV_TenThuTuc"
							id="MC_TTHC_GV_TenThuTuc"
							value={tenThuTuc}
							onChange={handleChangeValue}
						/>
					</label>
				</div>
				<div className="col-span-4 lg:col-span-2">
					<label htmlFor="MC_TTHC_GV_ThuTu">
						<p className="font-semibold mb-2">
							Vị trí <span className="text-red-500">*</span>
						</p>
						<input
							type="number"
							placeholder="Nhập vị trí sắp xếp hồ sơ..."
							min={1}
							className="px-3 py-2 w-full rounded-full border border-slate-300 focus:outline-slate-300"
							name="MC_TTHC_GV_ThuTu"
							id="MC_TTHC_GV_ThuTu"
							value={viTri}
							onChange={handleChangeValue}
						/>
					</label>
				</div>
				<div className="col-span-4 lg:col-span-2">
					<label htmlFor="MC_TTHC_GV_MaThuTuc">
						<p className="font-semibold mb-2">
							Mã thủ tục <span className="text-red-500">*</span>
						</p>
						<input
							type="text"
							placeholder="Nhập mã thủ tục..."
							className="px-3 py-2 w-full rounded-full border border-slate-300 focus:outline-slate-300"
							name="MC_TTHC_GV_MaThuTuc"
							id="MC_TTHC_GV_MaThuTuc"
							value={maThuTuc}
							onChange={handleChangeValue}
						/>
					</label>
				</div>
				<div className="col-span-4 lg:col-span-2">
					<label htmlFor="MC_TTHC_GV_IDMucDo">
						<p className="font-semibold mb-2">
							Mức độ <span className="text-red-500">*</span>
						</p>
						<select
							className="px-3 py-2 w-full rounded-full border border-slate-300 focus:outline-slate-300"
							name="MC_TTHC_GV_IDMucDo"
							id="MC_TTHC_GV_IDMucDo"
							value={mucDo}
							onChange={handleChangeValue}
						>
							<option value="">Chọn mức độ</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
						</select>
					</label>
				</div>
				<div className="col-span-4 lg:col-span-2">
					<label htmlFor="MC_TTHC_GV_TongThoiGianGiaiQuyet" className="flex flex-col">
						<p className="font-semibold mb-2 whitespace-nowrap">
							Tổng thời gian giải quyết (trong giờ HC) <span className="text-red-500">*</span>
						</p>
						<div className="flex flex-row items-center justify-between w-full gap-2">
							<input
								type="number"
								placeholder="Số ngày giải quyết"
								min={0}
								className="px-3 py-2 rounded-full w-full border border-slate-300 focus:outline-slate-300"
								name="MC_TTHC_GV_TongThoiGianGiaiQuyet"
								id="MC_TTHC_GV_TongThoiGianGiaiQuyet"
								value={tongThoiGianGiaiQuyet}
								onChange={handleChangeValue}
							/>
							<span className="font-bold">Ngày</span>
						</div>
					</label>
				</div>
				<div className="col-span-4 lg:col-span-2">
					<label htmlFor="MC_TTHC_GV_LinhVuc">
						<p className="font-semibold mb-2">
							Lĩnh vực <span className="text-red-500">*</span>
						</p>
						<select
							className="px-3 py-2 w-full rounded-full border border-slate-300 focus:outline-slate-300"
							name="MC_TTHC_GV_LinhVuc"
							id="MC_TTHC_GV_LinhVuc"
							value={linhVuc}
							onChange={handleChangeValue}
						>
							<option value="">Chọn lĩnh vực</option>
							<option value="Chính trị & CTSV">Chính trị & CTSV</option>
							<option value="Hợp tác quốc tế">Hợp tác quốc tế</option>
							<option value="Khảo thí và Đảm bảo chất lượng">Khảo thí và Đảm bảo chất lượng</option>
							<option value="Tài chính - kế toán">Tài chính - kế toán</option>
							<option value="Truyền thông">Truyền thông</option>
							<option value="Tổ chức cán bộ">Tổ chức cán bộ</option>
							<option value="Quản lý Đào tạo">Quản lý Đào tạo</option>
						</select>
					</label>
				</div>
				<div className="col-span-4 md:col-span-2">
					<label htmlFor="MC_TTHC_GV_NoiTiepNhan">
						<p className="font-semibold mb-2">
							Đơn vị tiếp nhận <span className="text-red-500">*</span>
						</p>
						<select
							className="px-3 py-2 w-full rounded-full border border-slate-300 focus:outline-slate-300"
							name="MC_TTHC_GV_NoiTiepNhan"
							id="MC_TTHC_GV_NoiTiepNhan"
							value={donViTiepNhan}
							onChange={handleChangeValue}
						>
							<option value="">Chọn đơn vị tiếp nhận</option>
							<option value="Chính trị & CTSV">Chính trị & CTSV</option>
							<option value="Hợp tác quốc tế">Hợp tác quốc tế</option>
							<option value="Khảo thí và Đảm bảo chất lượng">Khảo thí và Đảm bảo chất lượng</option>
							<option value="Tài chính - kế toán">Tài chính - kế toán</option>
							<option value="Truyền thông">Truyền thông</option>
							<option value="Tổ chức cán bộ">Tổ chức cán bộ</option>
							<option value="Quản lý Đào tạo">Quản lý Đào tạo</option>
						</select>
					</label>
				</div>
				<div className="col-span-4 md:col-span-2">
					<label htmlFor="MC_TTHC_GV_NoiTraKetQua">
						<p className="font-semibold mb-2">
							Nơi trả kết quả <span className="text-red-500">*</span>
						</p>
						<select
							className="px-3 py-2 w-full rounded-full border border-slate-300 focus:outline-slate-300"
							name="MC_TTHC_GV_NoiTraKetQua"
							id="MC_TTHC_GV_NoiTraKetQua"
							value={noiTraKetQua}
							onChange={handleChangeValue}
						>
							<option value="">Chọn nơi trả kết quả</option>
							<option value="Trả online - Email">Trả online - Email</option>
							<option value="1 - Minh Khai">1 - Minh Khai</option>
							<option value="2 - Lĩnh Nam">2 - Lĩnh Nam</option>
							<option value="3 - Nam Định">3 - Nam Định</option>
						</select>
					</label>
				</div>
				<div className="col-span-4 flex flex-row gap-3 items-center">
					<input
						type="checkbox"
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
						name="MC_TTHC_GV_ThuTucLienThong"
						id="MC_TTHC_GV_ThuTucLienThong"
						checked={thuTucLienThong}
						onChange={handleChangeValue}
					/>
					<label htmlFor="MC_TTHC_GV_ThuTucLienThong" className="cursor-pointer">
						<span className="font-semibold">Thủ tục liên thông</span>
					</label>
				</div>
				<div className="col-span-4 flex flex-row gap-3 items-center">
					<input
						type="checkbox"
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
						name="MC_TTHC_GV_ThuTucKhongApDungMC"
						id="MC_TTHC_GV_ThuTucKhongApDungMC"
						checked={thuTucKhongApDungMotCua}
						onChange={handleChangeValue}
					/>
					<label htmlFor="MC_TTHC_GV_ThuTucKhongApDungMC" className="cursor-pointer">
						<span className="font-semibold">Thủ tục không áp dụng Một cửa</span>
					</label>
				</div>
			</div>
		</div>
	);
}

ThongTinHoSo.propTypes = {};

export default ThongTinHoSo;
