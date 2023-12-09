import React from "react";
import PropTypes from "prop-types";
import SidebarTTHCGV from "../../Sidebar/SidebarTTHCGV";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getThuTucHanhChinhByID } from "../../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";
import { useDispatch } from "react-redux";
import { createAxiosJWT } from "../../../../../Configs/http";
import { DataCanBoGV } from "../../../../../Services/Utils/dataCanBoGV";

// icons
import { FaAngleRight, FaChevronDown } from "react-icons/fa";
import Loading from "./../../../../../Components/Loading/Loading";
import clsx from "clsx";
function ThongTinChiTietHoSo(props) {
	const { title, id } = useParams();
	const [detailHoSoThuTuc, setDetailHoSoThuTuc] = useState({});
	const [loading, setLoading] = useState(true);

	const [showThongTinHoSo, setShowThongTinHoSo] = useState(true);

	const { dataToken } = DataCanBoGV();
	const dispatch = useDispatch();
	const axiosJWT = createAxiosJWT(dataToken, dispatch);

	// Events handlers
	const handleShowView = (idView) => {
		if (idView === "ThongTinHoSo") {
			setShowThongTinHoSo(!showThongTinHoSo);
		}
	};

	// Effects
	useEffect(() => {
		const getDataDetailHoSoThuTuc = async () => {
			const resultDataHoSoThuTuc = await getThuTucHanhChinhByID(axiosJWT, id);
			if (resultDataHoSoThuTuc.status === 200) {
				const dataDetailHoSoThuTuc = await resultDataHoSoThuTuc.data;
				if (dataDetailHoSoThuTuc) {
					setDetailHoSoThuTuc(dataDetailHoSoThuTuc);
					setLoading(false);
				}
			}
		};
		getDataDetailHoSoThuTuc();
	}, []);

	const { ThongTinHoSo, ThanhPhanHoSo, TrinhTuThucHien, LePhi, PhanQuyen, TrangThai } = detailHoSoThuTuc ?? null;
	console.log("🚀 ~ file: ThongTinChiTietHoSo.jsx:33 ~ ThongTinChiTietHoSo ~ ThongTinHoSo:", ThongTinHoSo);
	return (
		<div className="px-5 lg:px-0 flex gap-4">
			<SidebarTTHCGV />
			<div className="w-full p-4 rounded-xl shadow-lg bg-white">
				<div className="flex flex-col">
					<h3>Chi tiết quy trình hồ sơ - thủ tục</h3>
					{loading ? (
						<div className="w-full flex justify-center">
							<Loading />
						</div>
					) : (
						<div className="TTHC-GV_thongtinhoso">
							<div className="flex flex-col sm:flex-row items-center justify-between bg-blue-100 p-2 rounded-md mb-4">
								<div className="flex flex-row items-center gap-2 text-blue-800">
									{showThongTinHoSo ? (
										<FaAngleRight
											size={20}
											className="cursor-pointer hover:opacity-70 mt-1 rotate-90"
											onClick={() => {
												handleShowView("ThongTinHoSo");
											}}
										/>
									) : (
										<FaAngleRight
											size={20}
											className="cursor-pointer hover:opacity-70 mt-1"
											onClick={() => {
												handleShowView("ThongTinHoSo");
											}}
										/>
									)}
									<h4 className="text-xl uppercase font-medium">Thông tin hồ sơ</h4>
								</div>
								<button type="button" className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:opacity-60">
									Cập nhật thông tin
								</button>
							</div>
							<div className={clsx(showThongTinHoSo ? "animate__animated animate__fadeInDown animate__faster flex flex-col gap-4" : "hidden")}>
								<div className="flex flex-col gap-1">
									<label htmlFor="MC_TTHC_GV_TenThuTuc">
										Tên thủ tục <span className="text-red-600 font-bold">*</span>
									</label>
									<input
										type="text"
										className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-none"
										defaultValue={ThongTinHoSo?.MC_TTHC_GV_TenThuTuc}
										placeholder="Nhập tên thủ tục"
										name="MC_TTHC_GV_TenThuTuc"
										id="MC_TTHC_GV_TenThuTuc"
									/>
								</div>
								<div className="flex flex-col md:flex-row items-center">
									<div className="">
										<div className="flex flex-col gap-1">
											<label htmlFor="MC_TTHC_GV_MaThuTuc">
												Mã thủ tục <span className="text-red-600 font-bold">*</span>
											</label>
											<input
												type="text"
												className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-none"
												defaultValue={ThongTinHoSo?.MC_TTHC_GV_MaThuTuc}
												placeholder="Nhập tên thủ tục"
												name="MC_TTHC_GV_MaThuTuc"
												id="MC_TTHC_GV_MaThuTuc"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

ThongTinChiTietHoSo.propTypes = {};

export default ThongTinChiTietHoSo;
