import React from "react";
import { AiFillFileAdd } from "react-icons/ai";
function ModalYeuCauHoTro(props) {
	const { isShow, onShowModal } = props;

	return (
		<>
			{/* Main modal */}
			{isShow ? (
				<div
					id="authentication-modal"
					tabIndex={-1}
					aria-hidden="true"
					className="fixed bg-[#efefef96] top-0 left-0 right-0 z-50 show w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full flex items-center justify-center"
				>
					<div className="relative w-full max-w-7xl top-[160px] lg:top-0">
						{/* Modal content */}
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							<button
								type="button"
								className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-hide="authentication-modal"
								onClick={onShowModal}
							>
								<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
									<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
								</svg>
								<span className="sr-only">Close modal</span>
							</button>
							<div className="px-6 py-6 lg:px-8">
								<h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Báo hỏng thiết bị</h3>
								<form className="flex flex-col gap-4">
									<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
										<div className="col-span-2 lg:col-span-1">
											<label htmlFor="DT_QLTS_TS_TenTaiSan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
												Tên tài sản <span className="text-red-700">*</span>
											</label>
											<input
												type="text"
												name="DT_QLTS_TS_TenTaiSan"
												id="DT_QLTS_TS_TenTaiSan"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
												placeholder="Ví dụ: Router 502A"
												required=""
											/>
										</div>
										{/* END: Tên Tài Sản - DT_QLTS_TS_TenTaiSan */}
										<div className="col-span-2 lg:col-span-1">
											<label htmlFor="DT_QLTS_TS_MaTaiSan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
												Mã tài sản <span className="text-red-700">*</span>
											</label>
											<input
												type="text"
												name="DT_QLTS_TS_MaTaiSan"
												id="DT_QLTS_TS_MaTaiSan"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
												placeholder="Ví dụ: 012472351"
												required=""
											/>
										</div>
										{/* END: Mã Tài Sản - DT_QLTS_TS_MaTaiSan */}
										<div className="col-span-2 lg:col-span-1">
											<label htmlFor="DT_QLTS_TS_SDT" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
												Số điện thoại liên hệ <span className="text-red-700">*</span>
											</label>
											<input
												type="tel"
												name="DT_QLTS_TS_SDT"
												id="DT_QLTS_TS_SDT"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
												placeholder="Ví dụ: 0123456789"
												required=""
											/>
										</div>
										{/* END: Số ĐT Liên Hệ - DT_QLTS_TS_SDT */}
										<div className="col-span-2">
											<label htmlFor="DT_QLTS_TS_MoTa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
												Mô tả sự cố
											</label>
											<textarea
												type="t"
												name="DT_QLTS_TS_MoTa"
												id="DT_QLTS_TS_MoTa"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
												placeholder="Nội dung mô tả"
												rows={10}
												required=""
											/>
										</div>
										{/* END: Mô Tả Sự Cố - DT_QLTS_TS_MoTa */}
										<div>
											<label htmlFor="selectCoSo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
												Cơ sở <span className="text-red-700">*</span>
											</label>
											<select
												defaultValue={"Chọn cơ sở"}
												name="selectCoSo"
												id="selectCoSo"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
											>
												<option selected="" defaultValue={""}>
													Chọn cơ sở
												</option>
												<option value={"Hà Nội"}>Hà Nội</option>
												<option value={"Nam Định"}>Nam Định</option>
											</select>
										</div>
										{/* END: Cơ sở - selectCoSo */}
										<div>
											<label htmlFor="ddlDiaDiem" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
												Địa điểm <span className="text-red-700">*</span>
											</label>
											<select
												defaultValue={"Chọn địa điểm"}
												name="ddlDiaDiem"
												id="ddlDiaDiem"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
											>
												<option selected="" defaultValue={""}>
													Chọn địa điểm
												</option>
												<option value={"Minh Khai"}>Minh Khai</option>
												<option value={"Lĩnh Nam"}>Lĩnh Nam</option>
											</select>
										</div>
										{/* END: Địa điểm - ddlDiaDiem */}
										<div>
											<label htmlFor="ddlToaNha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
												Tòa nhà <span className="text-red-700">*</span>
											</label>
											<select
												name="ddlToaNha"
												id="ddlToaNha"
												defaultValue={"Chọn tòa nhà"}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
											>
												<option selected="" defaultValue={""}>
													Chọn tòa nhà
												</option>
												<option value={"Tòa nhà 1"}>Tòa nhà 1</option>
												<option value={"Tòa nhà 2"}>Tòa nhà 2</option>
											</select>
										</div>
										{/* END: Tòa nhà - ddlToaNha */}
										<div>
											<label htmlFor="ddlTang" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
												Tầng <span className="text-red-700">*</span>
											</label>
											<select
												defaultValue={"Chọn tầng"}
												name="ddlTang"
												id="ddlTang"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
											>
												<option selected="" defaultValue={""}>
													Chọn tầng
												</option>
												<option value={"Tầng 1"}>Tầng 1</option>
												<option value={"Tầng 2"}>Tầng 2</option>
											</select>
										</div>
										{/* END: Tầng - ddlTang */}
										<div>
											<label htmlFor="ddlPhong" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
												Phòng <span className="text-red-700">*</span>
											</label>
											<select
												defaultValue={"Chọn phòng"}
												name="ddlPhong"
												id="ddlPhong"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
											>
												<option value={""} selected defaultValue={""}>
													Chọn Phòng
												</option>
												<option value={"Phòng 1"}>Phòng 1</option>
												<option value={"Phòng 2"}>Phòng 2</option>
											</select>
										</div>
										{/* END: Cơ sở - ddlPhong */}
										<div className="col-span-1"></div>
										<div className="col-span-2 lg:col-span-1 justify-end">
											<label htmlFor="dropfile" className="px-4 py-2 bg-blue-200 flex items-center gap-4 rounded-lg hover:opacity-70">
												<span className="text-2xl text-blue-900">
													<AiFillFileAdd />
												</span>
												<span className="font-semibold text-blue-900">Tệp đính kèm</span>
												<input type="file" id="dropfile" className="hidden" />
											</label>
										</div>
										{/* END: Drop File đính kèm */}
									</div>
									<div className="uneti-qlsp__modal--action flex justify-end gap-4">
										<button type="button" className="bg-red-700 px-3 py-2 rounded-lg text-white font-semibold hover:opacity-70" onClick={onShowModal}>
											Hủy
										</button>
										<button
											type="submit"
											className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										>
											Gửi báo hỏng
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}

export default ModalYeuCauHoTro;
