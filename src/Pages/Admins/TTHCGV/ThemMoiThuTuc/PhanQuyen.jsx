import React, { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
function PhanQuyen() {
	const [listDonViThucHien, setListDonViThucHien] = useState([]);
	const [listToNghiepVu, setListToNghiepVu] = useState([]);
	const [listNhomThucHien, setListNhomThucHien] = useState([]);
	const [listNhanSuThucHien, setListNhanSuThucHien] = useState([]);

	const dataRoles = [
		{
			id: 1,
			role: "all",
		},
		{
			id: 2,
			role: "view",
		},
		{
			id: 3,
			role: "add",
		},
		{
			id: 4,
			role: "edit",
		},
		{
			id: 5,
			role: "del",
		},
	];

	const handleSelectData = () => {};

	return (
		<div className="uneti-tthcgv__phanquyen mb-5">
			<h2 className="text-2xl font-semibold uppercase mb-4">Thiết lập phân quyền thực hiện</h2>
			<div className="grid grid-cols-4 gap-5">
				{/* START: Select Đơn Vị Thực Hiện */}
				<div className="col-span-4 md:col-span-2">
					<div className="flex flex-col gap-2">
						<label htmlFor="MC_TTHC_GV_PhanQuyen_DonVi">
							<p className="font-semibold mb-2">Đơn vị thực hiện</p>
							<select className="px-3 py-2 w-full rounded-lg border border-slate-300 focus:outline-slate-300" name="MC_TTHC_GV_PhanQuyen_DonVi" id="MC_TTHC_GV_PhanQuyen_DonVi">
								<option value="">Chọn đơn vị thực hiện</option>
								<option value="">Phòng đào tạo</option>
								<option value="">Phòng tổ chức cán bộ</option>
								<option value="">Phòng tài chính - kế toán</option>
							</select>
						</label>
						<div className="w-full px-3 py-2 border rounded-lg bg-slate-50 min-h-[60px] max-h-[140px] overflow-y-auto">
							<p className="px-2 py-1 font-semibold flex flex-row items-center justify-between hover:bg-slate-100 rounded-md cursor-pointer border mb-1">
								<span>- Phòng Tổ chức cán bộ</span>
								<TiDeleteOutline className="cursor-pointer text-red-500 hover:opacity-70" size={24} />
							</p>
							<p className="px-2 py-1 font-semibold flex flex-row items-center justify-between hover:bg-slate-100 rounded-md cursor-pointer border mb-1">
								<span>- Phòng Đào tạo</span>
								<TiDeleteOutline className="cursor-pointer text-red-500 hover:opacity-70" size={24} />
							</p>
							<p className="px-2 py-1 font-semibold flex flex-row items-center justify-between hover:bg-slate-100 rounded-md cursor-pointer border mb-1">
								<span>- Phòng Tài chính - Kế toán</span>
								<TiDeleteOutline className="cursor-pointer text-red-500 hover:opacity-70" size={24} />
							</p>
						</div>
					</div>
				</div>
				{/* END: Select Đơn Vị Thực Hiện */}

				{/* START: Select Tổ nghiệp vụ */}
				<div className="col-span-4 md:col-span-2">
					<div className="flex flex-col gap-2">
						<label htmlFor="MC_TTHC_GV_PhanQuyen_DonVi">
							<p className="font-semibold mb-2">Tổ nghiệp vụ</p>
							<select className="px-3 py-2 w-full rounded-lg border border-slate-300 focus:outline-slate-300" name="MC_TTHC_GV_PhanQuyen_DonVi" id="MC_TTHC_GV_PhanQuyen_DonVi">
								<option value="">Chọn tổ nghiệp vụ</option>
								<option value="">Tổ 1</option>
								<option value="">Tổ 2</option>
								<option value="">Tổ 3</option>
							</select>
						</label>
						<div className="w-full px-3 py-2 border rounded-lg bg-slate-50 min-h-[60px] max-h-[140px] overflow-y-auto">
							<p className="px-2 py-1 font-semibold flex flex-row items-center justify-between hover:bg-slate-100 rounded-md cursor-pointer border mb-1">
								<span>- Tổ 1</span>
								<TiDeleteOutline className="cursor-pointer text-red-500 hover:opacity-70" size={24} />
							</p>
							<p className="px-2 py-1 font-semibold flex flex-row items-center justify-between hover:bg-slate-100 rounded-md cursor-pointer border mb-1">
								<span>- Tổ 2</span>
								<TiDeleteOutline className="cursor-pointer text-red-500 hover:opacity-70" size={24} />
							</p>
							<p className="px-2 py-1 font-semibold flex flex-row items-center justify-between hover:bg-slate-100 rounded-md cursor-pointer border mb-1">
								<span>- Tổ 3</span>
								<TiDeleteOutline className="cursor-pointer text-red-500 hover:opacity-70" size={24} />
							</p>
						</div>
					</div>
				</div>
				{/* END: Select Tổ nghiệp vụ */}

				{/* START: Select Nhóm thực hiện */}
				<div className="col-span-4 md:col-span-2">
					<div className="flex flex-col gap-2">
						<label htmlFor="MC_TTHC_GV_PhanQuyen_DonVi">
							<p className="font-semibold mb-2">Nhóm thực hiện</p>
							<select className="px-3 py-2 w-full rounded-lg border border-slate-300 focus:outline-slate-300" name="MC_TTHC_GV_PhanQuyen_DonVi" id="MC_TTHC_GV_PhanQuyen_DonVi">
								<option value="">Chọn nhóm thực hiện</option>
								<option value="">Nhóm 1</option>
								<option value="">Nhóm 2</option>
								<option value="">Nhóm 3</option>
							</select>
						</label>
						<div className="w-full px-3 py-2 border rounded-lg bg-slate-50 min-h-[60px] max-h-[140px] overflow-y-auto">
							<p className="px-2 py-1 font-semibold flex flex-row items-center justify-between hover:bg-slate-100 rounded-md cursor-pointer border mb-1">
								<span>- Nhóm 1</span>
								<TiDeleteOutline className="cursor-pointer text-red-500 hover:opacity-70" size={24} />
							</p>
							<p className="px-2 py-1 font-semibold flex flex-row items-center justify-between hover:bg-slate-100 rounded-md cursor-pointer border mb-1">
								<span>- Nhóm 2</span>
								<TiDeleteOutline className="cursor-pointer text-red-500 hover:opacity-70" size={24} />
							</p>
							<p className="px-2 py-1 font-semibold flex flex-row items-center justify-between hover:bg-slate-100 rounded-md cursor-pointer border mb-1">
								<span>- Nhóm 3</span>
								<TiDeleteOutline className="cursor-pointer text-red-500 hover:opacity-70" size={24} />
							</p>
						</div>
					</div>
				</div>
				{/* END: Select Nhóm thực hiện */}

				{/* START: Select Nhân sự thực hiện */}
				<div className="col-span-4 md:col-span-2">
					<div className="flex flex-col gap-2">
						<label htmlFor="MC_TTHC_GV_PhanQuyen_DonVi">
							<p className="font-semibold mb-2">
								Chọn nhân sự thực hiện <span className="text-red-500 font-semibold">*</span>
							</p>
							<select className="px-3 py-2 w-full rounded-lg border border-slate-300 focus:outline-slate-300" name="MC_TTHC_GV_PhanQuyen_DonVi" id="MC_TTHC_GV_PhanQuyen_DonVi">
								<option value="">Chọn nhân sự thực hiện</option>
								<option value="">Tống Bá Quang Anh - PĐT</option>
								<option value="">Nguyễn Mạnh Quân - PĐT</option>
								<option value="">Nguyễn Thành Trung - PĐT</option>
								<option value="">Tô Mạnh Công - QTM</option>
								<option value="">Nguyễn Mạnh Cường - QTM</option>
							</select>
						</label>
						<div className="w-full px-3 py-2 border rounded-lg bg-slate-50 min-h-[60px] max-h-[140px] overflow-y-auto">
							<div className="px-2 py-1 font-semibold flex flex-row items-center justify-between hover:bg-slate-100 rounded-md cursor-pointer border mb-1">
								<p>
									<span>- Tống Bá Quang Anh - PĐT</span>
									<span className="ml-2">(Tất cả quyền)</span>
								</p>
								<TiDeleteOutline className="cursor-pointer text-red-500 hover:opacity-70" size={24} />
							</div>
							<div className="px-2 py-1 font-semibold flex flex-row items-center justify-between hover:bg-slate-100 rounded-md cursor-pointer border mb-1">
								<p>
									<span>- Nguyễn Mạnh Quân - PĐT</span>
									<span className="ml-2">(Tất cả quyền)</span>
								</p>
								<TiDeleteOutline className="cursor-pointer text-red-500 hover:opacity-70" size={24} />
							</div>
							<div className="px-2 py-1 font-semibold flex flex-row items-center justify-between hover:bg-slate-100 rounded-md cursor-pointer border mb-1">
								<p>
									<span>- Vũ Xuân Tuấn - STU</span>
									<span className="ml-2">(Xem)</span>
								</p>
								<TiDeleteOutline className="cursor-pointer text-red-500 hover:opacity-70" size={24} />
							</div>
						</div>
					</div>
				</div>
				{/* END: Select Nhân sự thực hiện */}

				{/* START: Select Quyền thao tác */}
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
				{/* END: Select Quyền thao tác */}
			</div>
		</div>
	);
}

export default PhanQuyen;
