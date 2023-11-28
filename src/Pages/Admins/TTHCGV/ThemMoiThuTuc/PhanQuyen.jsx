import React from "react";

function PhanQuyen() {
	return (
		<div className="uneti-tthcgv__phanquyen mb-5">
			<h2 className="text-2xl font-semibold uppercase mb-4">Thiết lập phân quyền thực hiện</h2>
			<div className="grid grid-cols-4 gap-5">
				<div className="col-span-4 md:col-span-2 lg:col-span-1">
					<label htmlFor="MC_TTHC_GV_PhanQuyen_DonVi">
						<p className="font-semibold mb-2">
							Đơn vị thực hiện <span className="text-red-500">*</span>
						</p>
						<select className="px-3 py-2 w-full rounded-full border border-slate-300 focus:outline-slate-300" name="MC_TTHC_GV_PhanQuyen_DonVi" id="MC_TTHC_GV_PhanQuyen_DonVi">
							<option value="">Chọn đơn vị thực hiện</option>
							<option value="">Phòng đào tạo</option>
							<option value="">Phòng tổ chức cán bộ</option>
							<option value="">Phòng tài chính - kế toán</option>
						</select>
					</label>
				</div>
				<div className="col-span-4 md:col-span-2 lg:col-span-1">
					<label htmlFor="MC_TTHC_GV_PhanQuyen_To">
						<p className="font-semibold mb-2">
							Tổ nghiệp vụ <span className="text-red-500">*</span>
						</p>
						<select className="px-3 py-2 w-full rounded-full border border-slate-300 focus:outline-slate-300" name="MC_TTHC_GV_PhanQuyen_To" id="MC_TTHC_GV_PhanQuyen_To">
							<option value="">Chọn tổ nghiệp vụ</option>
							<option value="">Phòng đào tạo</option>
							<option value="">Phòng tổ chức cán bộ</option>
							<option value="">Phòng tài chính - kế toán</option>
						</select>
					</label>
				</div>
				<div className="col-span-4 md:col-span-2 lg:col-span-1">
					<label htmlFor="MC_TTHC_GV_PhanQuyen_MaNhanSu">
						<p className="font-semibold mb-2">
							Mã nhân sự <span className="text-red-500">*</span>
						</p>
						<input
							type="text"
							placeholder="Mã nhân sự..."
							className="px-3 py-2 w-full rounded-full border border-slate-300 focus:outline-slate-300"
							name="MC_TTHC_GV_PhanQuyen_MaNhanSu"
							id="MC_TTHC_GV_PhanQuyen_MaNhanSu"
						/>
					</label>
				</div>
				<div className="col-span-4 md:col-span-2 lg:col-span-1">
					<label htmlFor="MC_TTHC_GV_PhanQuyen_HoTen">
						<p className="font-semibold mb-2">
							Tên nhân sự <span className="text-red-500">*</span>
						</p>
						<input
							type="text"
							placeholder="Tên nhân sự..."
							className="px-3 py-2 w-full rounded-full border border-slate-300 focus:outline-slate-300"
							name="MC_TTHC_GV_PhanQuyen_HoTen"
							id="MC_TTHC_GV_PhanQuyen_HoTen"
							disabled={true}
						/>
					</label>
				</div>
				<div className="col-span-4">
					<h3 className="font-semibold mb-2">Chọn quyền thực hiện</h3>
					<div className="flex flex-row items-center gap-10">
						<div className="flex flex-row items-center gap-2">
							<input
								type="checkbox"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								name="MC_TTHC_GV_PhanQuyen_QuyenFull"
								id="MC_TTHC_GV_PhanQuyen_QuyenFull"
							/>
							<label htmlFor="MC_TTHC_GV_PhanQuyen_QuyenFull">Tất cả quyền</label>
						</div>
						<div className="flex flex-row items-center gap-2">
							<input
								type="checkbox"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								name="MC_TTHC_GV_PhanQuyen_QuyenXem"
								id="MC_TTHC_GV_PhanQuyen_QuyenXem"
							/>
							<label htmlFor="MC_TTHC_GV_PhanQuyen_QuyenXem">Quyền xem</label>
						</div>
						<div className="flex flex-row items-center gap-2">
							<input
								type="checkbox"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								name="MC_TTHC_GV_PhanQuyen_QuyenThem"
								id="MC_TTHC_GV_PhanQuyen_QuyenThem"
							/>
							<label htmlFor="MC_TTHC_GV_PhanQuyen_QuyenThem">Quyền thêm</label>
						</div>
						<div className="flex flex-row items-center gap-2">
							<input
								type="checkbox"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								name="MC_TTHC_GV_PhanQuyen_QuyenSua"
								id="MC_TTHC_GV_PhanQuyen_QuyenSua"
							/>
							<label htmlFor="MC_TTHC_GV_PhanQuyen_QuyenSua">Quyền sửa</label>
						</div>
						<div className="flex flex-row items-center gap-2">
							<input
								type="checkbox"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								name="MC_TTHC_GV_PhanQuyen_QuyenXoa"
								id="MC_TTHC_GV_PhanQuyen_QuyenXoa"
							/>
							<label htmlFor="MC_TTHC_GV_PhanQuyen_QuyenXoa">Quyền xóa</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PhanQuyen;
