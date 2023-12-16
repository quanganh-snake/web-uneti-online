import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
function ThongTinHoSo(props) {
	const {
		inputTenThuTucRef,
		inputMaThuTucRef,
		inputMucDoRef,
		inputTongThoiGianRef,
		inputDonViTiepNhanRef,
		inputNoiTraKetQuaRef,
		listMucDo,
		listDonViTiepNhan,
		tenThuTuc,
		viTri,
		maThuTuc,
		mucDo,
		tongThoiGianGiaiQuyet,
		soBoHoSo,
		linhVuc,
		setDonViTiepNhan,
		noiTraKetQua,
		thuTucLienThong,
		thuTucKhongApDungMotCua,
		canCuPhapLyCuaTTHC,
		dieuKienThucHien,
		dataFilesTepThuTuc,
		setDataFilesTepThuTuc,
		tenTepThuTuc,
		handleChangeValue,
	} = props;

	const [donViSelected, setDonViSelected] = useState("");
	const [searchDonVi, setSearchDonVi] = useState("");
	const [openSelectDonVi, setOpenSelectDonVi] = useState(false);

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
							ref={inputTenThuTucRef}
							value={tenThuTuc}
							onChange={handleChangeValue}
						/>
					</label>
				</div>
				<div className="col-span-4 lg:col-span-2">
					<label htmlFor="MC_TTHC_GV_ThuTu">
						<p className="font-semibold mb-2">Vị trí</p>
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
							ref={inputMaThuTucRef}
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
							ref={inputMucDoRef}
							defaultValue={mucDo}
							onChange={handleChangeValue}
						>
							<option value="">Chọn mức độ</option>
							{listMucDo &&
								listMucDo.map((iMucDo, index) => {
									return (
										<option key={iMucDo.MC_TTHC_GV_MucDo_ID} value={iMucDo.MC_TTHC_GV_MucDo_ID}>
											{index + 1 + " - " + iMucDo.MC_TTHC_GV_MucDo_MoTa}
										</option>
									);
								})}
						</select>
					</label>
				</div>
				<div className="col-span-4 lg:col-span-2">
					<label htmlFor="MC_TTHC_GV_CanCuPhapLyCuaTTHC">
						<p className="font-semibold mb-2">Căn cứ pháp lý của TTHC</p>
						<input
							type="text"
							placeholder="Nhập căn cứ pháp lý của TTHC..."
							className="px-3 py-2 w-full rounded-full border border-slate-300 focus:outline-slate-300"
							name="MC_TTHC_GV_CanCuPhapLyCuaTTHC"
							id="MC_TTHC_GV_CanCuPhapLyCuaTTHC"
							value={canCuPhapLyCuaTTHC}
							onChange={handleChangeValue}
						/>
					</label>
				</div>
				<div className="col-span-4 lg:col-span-2">
					<label htmlFor="MC_TTHC_GV_DieuKienThucHien">
						<p className="font-semibold mb-2">Điều kiện thực hiện của TTHC</p>
						<input
							type="text"
							placeholder="Nhập điều kiện thực hiện của TTHC..."
							className="px-3 py-2 w-full rounded-full border border-slate-300 focus:outline-slate-300"
							name="MC_TTHC_GV_DieuKienThucHien"
							id="MC_TTHC_GV_DieuKienThucHien"
							value={dieuKienThucHien}
							onChange={handleChangeValue}
						/>
					</label>
				</div>
				<div className="col-span-4 lg:col-span-2">
					<label htmlFor="MC_TTHC_GV_TongThoiGianGiaiQuyet" className="flex flex-col">
						<p className="font-semibold mb-2 lg:whitespace-nowrap">
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
								ref={inputTongThoiGianRef}
								value={tongThoiGianGiaiQuyet}
								onChange={handleChangeValue}
							/>
							<span className="font-bold">Ngày</span>
						</div>
					</label>
				</div>
				<div className="col-span-4 lg:col-span-2">
					<label htmlFor="MC_TTHC_GV_SoBoHoSo">
						<p className="font-semibold mb-2">Số bộ hồ sơ kèm theo</p>
						<input
							type="number"
							placeholder="Số bộ hồ sơ"
							min={0}
							className="px-3 py-2 rounded-full w-full border border-slate-300 focus:outline-slate-300"
							name="MC_TTHC_GV_SoBoHoSo"
							id="MC_TTHC_GV_SoBoHoSo"
							value={soBoHoSo}
							onChange={handleChangeValue}
						/>
					</label>
				</div>
				<div className="col-span-4 lg:col-span-2">
					<label htmlFor="MC_TTHC_GV_LinhVuc">
						<p className="font-semibold mb-2">Lĩnh vực</p>
						<input
							type="text"
							placeholder="Nhập lĩnh vực..."
							className="px-3 py-2 w-full rounded-full border border-slate-300 focus:outline-slate-300"
							name="MC_TTHC_GV_LinhVuc"
							id="MC_TTHC_GV_LinhVuc"
							value={linhVuc}
							onChange={handleChangeValue}
						/>
					</label>
				</div>
				<div className="col-span-4 md:col-span-2">
					<label htmlFor="MC_TTHC_GV_NoiTiepNhan">
						<p className="font-semibold mb-2">
							Đơn vị tiếp nhận <span className="text-red-500">*</span>
						</p>
						<div className="col-span-4 md:col-span-2 relative">
							<div
								id="MC_TTHC_GV_PhanQuyen_DonVi"
								ref={inputDonViTiepNhanRef}
								onClick={() => {
									setOpenSelectDonVi(!openSelectDonVi);
								}}
								className="bg-white w-full p-2 flex items-center justify-between rounded-md border border-slate-300 cursor-pointer"
							>
								<span className={clsx(donViSelected && "text-gray-700 font-semibold")}>{donViSelected ? donViSelected : "Chọn đơn vị tiếp nhận"}</span>
								<BiChevronDown size={20} className={clsx(openSelectDonVi && "rotate-180")} />
							</div>
							<ul className={clsx("bg-white mt-2 border shadow-sm overflow-y-auto absolute right-0 left-0 top-full", openSelectDonVi ? "max-h-60" : "hidden")}>
								<div className="flex items-center px-2 sticky top-0 bg-white shadow-md">
									<AiOutlineSearch size={18} className="text-gray-700" />
									<input
										type="text"
										value={searchDonVi}
										onChange={(e) => {
											setSearchDonVi(e.target.value.toLowerCase());
										}}
										placeholder="Nhập tên đơn vị"
										className="w-full placeholder:text-gray-500 p-2 outline-none"
									/>
								</div>
								{listDonViTiepNhan &&
									listDonViTiepNhan?.map((iDonVi, index) => {
										return (
											<li
												key={index}
												className={clsx(
													"p-2 text-sm cursor-pointer hover:bg-sky-600 hover:text-white",
													iDonVi?.TenPhongBan.toLowerCase().includes(searchDonVi) ? "block" : "hidden"
												)}
												onClick={() => {
													setDonViTiepNhan(iDonVi?.TenPhongBan);
													setDonViSelected(iDonVi?.TenPhongBan);
													setOpenSelectDonVi(false);
													setSearchDonVi("");
												}}
											>
												{iDonVi?.TenPhongBan}
											</li>
										);
									})}
							</ul>
						</div>
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
							ref={inputNoiTraKetQuaRef}
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

				<div className="col-span-4 my-4">
					<label className="" htmlFor="MC_TTHC_GV_TepThuTuc_DataFileFile">
						<p className="font-semibold mb-2">Đính kèm tệp thủ tục</p>
					</label>
					<input
						className="p-2 border border-slate-200 w-full focus:outline-slate-400"
						id="MC_TTHC_GV_TepThuTuc_DataFileFile"
						type="text"
						placeholder="Chèn link tệp thủ tục"
						value={tenTepThuTuc ? tenTepThuTuc : ""}
						onChange={handleChangeValue}
					/>
				</div>
			</div>
		</div>
	);
}

ThongTinHoSo.propTypes = {
	listMucDo: PropTypes.array,
	tenThuTuc: PropTypes.string,
	viTri: PropTypes.string,
	maThuTuc: PropTypes.string,
	mucDo: PropTypes.string,
	tongThoiGianGiaiQuyet: PropTypes.string,
	linhVuc: PropTypes.string,
	donViTiepNhan: PropTypes.string,
	noiTraKetQua: PropTypes.string,
	thuTucLienThong: PropTypes.bool,
	thuTucKhongApDungMotCua: PropTypes.bool,
	handleChangeValue: PropTypes.func,
};

export default ThongTinHoSo;
