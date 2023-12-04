import clsx from "clsx";
import React, { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import Swal from "sweetalert2";

function TrinhTuThucHien(props) {
	const { quyTrinh, setQuyTrinh, handleAddQuyTrinh } = props;
	const [editRowIndex, setEditRowIndex] = useState(-1);
	const [editValueRow, setEditValueRow] = useState({});

	const handleEditRow = (index) => {
		setEditRowIndex(index);
		setEditValueRow(quyTrinh[index]);
	};

	const handleSaveDataRow = () => {
		setQuyTrinh((prevDataRow) => {
			const newDataRow = [...prevDataRow];
			newDataRow[editRowIndex] = editValueRow;
			return newDataRow;
		});

		setEditRowIndex(-1);
		setEditValueRow({});
	};

	const handleCancelEditDataRow = () => {
		setEditRowIndex(-1);
	};

	const handleDeleteRow = (rowIndex) => {
		Swal.fire({
			title: "Bạn chắc chắn muốn xóa dữ liệu này?",
			text: "Sau khi xóa sẽ không thể khôi phục lại được",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Xóa",
			cancelButtonText: "Hủy",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: "Xóa!",
					text: "Xóa thành công dữ liệu",
					icon: "success",
				});
				setThanhPhanHoSo((prevDataRow) => {
					const newData = [...prevDataRow];
					newData.splice(rowIndex, 1);
					return newData;
				});
			}
		});
	};

	const handleChangeValue = (e, fieldName) => {
		const { value, checked, type, files } = e.target;
		let fieldValue;
		if (type === "checkbox") {
			fieldValue = checked;
			setEditValueRow((prevEditValueRow) => ({
				...prevEditValueRow,
				[fieldName]: fieldValue,
			}));
		} else if (type === "file") {
			if (files && files.length > 0) {
				setEditValueRow((prevEditValueRow) => ({
					...prevEditValueRow,
					MC_TTHC_GV_ThanhPhanHoSo_TenFile: files[0].name,
				}));
				getDataFileToBase64(files[0]).then((dataFileBase64) => {
					setEditValueRow((prevEditValueRow) => ({
						...prevEditValueRow,
						MC_TTHC_GV_ThanhPhanHoSo_DataFile: dataFileBase64,
					}));
				});
			}
		} else {
			fieldValue = value;
			setEditValueRow((prevEditValueRow) => ({
				...prevEditValueRow,
				[fieldName]: fieldValue,
			}));
		}
	};

	return (
		<div className="uneti-tthcgv__trinhtuthuchien mb-5 max-w-full">
			<h2 className="text-2xl font-semibold uppercase mb-4">Thiết lập trình tự thực hiện</h2>

			<div className="w-full overflow-x-auto mb-4 border border-slate-300 rounded-xl ">
				<table className="w-full">
					<thead className="bg-[#075985] text-white rounded-t-xl">
						<tr>
							<th className="border-r px-2 py-1 rounded-tl-xl">STT</th>
							<th className="border-r px-2 py-1 whitespace-nowrap">Tên công việc</th>
							<th className="border-r px-2 py-1 whitespace-nowrap">Cách thức thực hiện</th>
							<th className="border-r px-2 py-1 whitespace-nowrap">Địa chỉ tiếp nhận/trả hồ sơ</th>
							<th className="border-r px-2 py-1 whitespace-nowrap">Đơn vị thực hiện/được ủy quyền thực hiện</th>
							<th className="border-r px-2 py-1 whitespace-nowrap">Đơn vị phối hợp</th>
							<th className="border-r px-2 py-1 whitespace-nowrap">Thời gian (ngày)</th>
							<th className="border-r px-2 py-1 whitespace-nowrap">Kết quả</th>
							<th className="px-2 py-1 rounded-tr-xl sticky right-0 bg-[#336699] text-white z-[1]">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y">
						{quyTrinh.length === 0 && (
							<tr className="text-center">
								<td colSpan={7}>
									<p className="px-2 py-2 font-semibold text-red-500">Chưa có trình tự thực hiện nào</p>
								</td>
							</tr>
						)}
						{quyTrinh.map((row, index) => (
							<tr key={index} className={clsx(editRowIndex === index ? "bg-slate-200" : null)}>
								{/* Dữ liệu hiển thị */}
								{editRowIndex === index ? (
									<>
										{/* Hiển thị dữ liệu cho phép chỉnh sửa */}
										<td className="border-r px-2 py-1 text-center">{index + 1}</td>
										<td className="border-r py-1">
											<textarea
												type="text"
												className="min-w-[150px] h-full border border-slate-300 px-3 py-1 focus:outline-slate-300"
												placeholder="Nhập tên công việc..."
												rows={3}
												value={editValueRow.MC_TTHC_GV_TrinhTuThucHien_TenCongViec || ""}
												onChange={(e) => handleChangeValue(e, "MC_TTHC_GV_TrinhTuThucHien_TenCongViec")}
											></textarea>
										</td>
										<td className="border-r py-1">
											<textarea
												type="text"
												rows={3}
												className="min-w-[300px] border border-slate-300 px-3 py-1 focus:outline-slate-300"
												placeholder="Nhập mô tả thực hiện..."
												value={editValueRow.MC_TTHC_GV_TrinhTuThucHien_CacThucThucHien || ""}
												onChange={(e) => handleChangeValue(e, "MC_TTHC_GV_TrinhTuThucHien_CacThucThucHien")}
											/>
										</td>
										<td className="border-r py-1">
											<select
												className="border border-slate-300 px-3 py-1 w-full focus:outline-slate-200"
												value={editValueRow.MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra || ""}
												name="MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra"
												id="MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra"
												onChange={(e) => handleChangeValue(e, "MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra")}
											>
												<option value="">Chọn địa chỉ tiếp nhận/trả hồ sơ</option>
												<option value="Phòng Đào tạo HN">Phòng Đào tạo HN</option>
												<option value="Phòng Đào tạo NĐ">Phòng Đào tạo NĐ</option>
												<option value="Phòng Tổ chức cán bộ">Phòng Tổ chức cán bộ</option>
											</select>
										</td>
										<td className="border-r py-1">
											<select
												className="border border-slate-300 px-3 py-1 w-full focus:outline-slate-200"
												value={editValueRow.MC_TTHC_GV_TrinhTuThucHien_DonViThucHien || ""}
												name="MC_TTHC_GV_TrinhTuThucHien_DonViThucHien"
												id="MC_TTHC_GV_TrinhTuThucHien_DonViThucHien"
												onChange={(e) => handleChangeValue(e, "MC_TTHC_GV_TrinhTuThucHien_DonViThucHien")}
											>
												<option value="">Chọn đơn vị thực hiện</option>
												<option value="Phòng Đào tạo HN">Phòng Đào tạo HN</option>
												<option value="Phòng Đào tạo NĐ">Phòng Đào tạo NĐ</option>
												<option value="Phòng Tổ chức cán bộ">Phòng Tổ chức cán bộ</option>
											</select>
										</td>
										<td className="border-r px-2 py-1">
											<select
												className="border border-slate-300 px-3 py-1 w-full focus:outline-slate-200"
												value={editValueRow.MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop || ""}
												name="MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop"
												id="MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop"
												onChange={(e) => handleChangeValue(e, "MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop")}
											>
												<option value="">Chọn đơn vị phối hợp</option>
												<option value="Phòng Đào tạo HN">Phòng Đào tạo HN</option>
												<option value="Phòng Đào tạo NĐ">Phòng Đào tạo NĐ</option>
												<option value="Phòng Tổ chức cán bộ">Phòng Tổ chức cán bộ</option>
											</select>
										</td>
										<td className="border-r py-1">
											<input
												type="number"
												className="w-full border border-slate-300 px-3 py-1 focus:outline-slate-300"
												placeholder="Nhập thời gian thực hiện"
												step={0.1}
												value={editValueRow.MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay || ""}
												onChange={(e) => handleChangeValue(e, "MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay")}
											/>
										</td>
										<td className="border-r py-1">
											<textarea
												type="text"
												className="min-w-[300px] border border-slate-300 px-3 py-1 focus:outline-slate-300"
												placeholder="Nhập thông báo kết quả"
												rows="3"
												value={editValueRow.MC_TTHC_GV_TrinhTuThucHien_KetQua || ""}
												onChange={(e) => handleChangeValue(e, "MC_TTHC_GV_TrinhTuThucHien_KetQua")}
											/>
										</td>
										<td className="border-r px-2 py-1 text-center flex flex-col lg:flex-row justify-center gap-2 sticky right-0 z-[1] bg-slate-300 shadow-md top-0 bottom-0 h-[100px]">
											<div className="flex flex-col lg:flex-row items-center justify-center gap-2 h-full">
												<button type="button" className="px-3 py-1 bg-[#336699] text-white hover:opacity-70" onClick={handleSaveDataRow}>
													Lưu
												</button>
												<button type="button" className="px-3 py-1 bg-[#336699] text-white hover:opacity-70" onClick={handleCancelEditDataRow}>
													Hủy
												</button>
												<button type="button" className="px-3 py-1 bg-[#336699] text-white hover:opacity-70" onClick={() => handleDeleteRow(index)}>
													Xóa
												</button>
											</div>
										</td>
									</>
								) : (
									<>
										<td className="text-center border-r px-2 py-1 whitespace-nowrap">{index + 1}</td>
										<td className="text-center border-r px-2 py-1 min-w-[250px]">{row.MC_TTHC_GV_TrinhTuThucHien_TenCongViec ?? ""}</td>
										<td className="text-left border-r px-2 py-1 w-[150px]">{row.MC_TTHC_GV_TrinhTuThucHien_CacThucThucHien ?? ""}</td>
										<td className="text-center border-r px-2 py-1">{row.MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra ?? ""}</td>
										<td className="text-center border-r px-2 py-1">{row.MC_TTHC_GV_TrinhTuThucHien_DonViThucHien ?? ""}</td>
										<td className="text-center border-r px-2 py-1">{row.MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop ?? ""}</td>
										<td className="text-center border-r px-2 py-1">{row.MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay ?? ""}</td>
										<td className="text-center border-r px-2 py-1 min-w-[300px]">
											<p className="w-full text-left">{row.MC_TTHC_GV_TrinhTuThucHien_KetQua ?? ""}</p>
										</td>
										<td className="text-center border-r px-2 py-1 sticky right-0 z-[1] bg-slate-300 shadow-md top-0 bottom-0 h-full">
											<div className="flex flex-col lg:flex-row items-center justify-center gap-2 h-full">
												<button type="button" className="px-3 py-1 bg-[#336699] text-white hover:opacity-70" onClick={() => handleEditRow(index)}>
													Sửa
												</button>
												<button type="button" className="px-3 py-1 bg-[#336699] text-white hover:opacity-70" onClick={() => handleDeleteRow(index)}>
													Xóa
												</button>
											</div>
										</td>
									</>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<button type="button" className="flex flex-row gap-2 items-center font-semibold text-xl text-white bg-[#245D7C] px-2 py-1 rounded-md hover:opacity-70" onClick={handleAddQuyTrinh}>
				<MdAdd size={24} className="font-bold" />
				Thêm trình tự thực hiện
			</button>
		</div>
	);
}

export default TrinhTuThucHien;
