import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHoSoGuiYeuCauById } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";
import { getListTrangThaiTTHCGVByIDGoc } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiTrangThai";
import moment from "moment";
import clsx from "clsx";
import Loading from "../../../../Components/Loading/Loading";

function TheoDoiDeNghiTTHCGVChiTiet() {
	const { tieude, id } = useParams();

	const [loading, setLoading] = useState(true);
	const [infoProcedure, setInfoProcedure] = useState(null);
	const [listTrangThai, setListTrangThai] = useState(null);
	const [currentStatusByProcedure, setCurrentStatusByProcedure] = useState(0);
	useEffect(() => {
		getHoSoGuiYeuCauById(id).then(async (resHoSo) => {
			if (resHoSo.status === 200) {
				const dataHoSo = await resHoSo.data?.body[0];
				setInfoProcedure(dataHoSo);
				setCurrentStatusByProcedure(dataHoSo?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID);
				getListTrangThaiTTHCGVByIDGoc(dataHoSo?.MC_TTHC_GV_GuiYeuCau_YeuCau_ID).then(async (resListTrangThai) => {
					if (resListTrangThai.status === 200) {
						const dataListTrangThai = await resListTrangThai.data?.body;
						setListTrangThai(dataListTrangThai);
					}
				});
				setLoading(false);
			}
		});
	}, [id, tieude]);

	return (
		<div>
			{loading ? (
				<div className="fixed bg-[#4d4d4d3a] inset-0 flex items-center justify-center z-50">
					<Loading />
				</div>
			) : (
				<>
					<div className="mb-4 border p-2 bg-white">
						<h3 className="text-xl uppercase font-bold mb-4 underline">Thông tin hồ sơ:</h3>
						<table>
							<tbody>
								<tr>
									<td className="text-right px-2 font-semibold">Thủ tục:</td>
									<td>{infoProcedure?.MC_TTHC_GV_TenThuTuc}</td>
								</tr>
								<tr>
									<td className="text-right px-2 font-semibold">Mã hồ sơ:</td>
									<td>{infoProcedure?.MC_TTHC_GV_MaThuTuc}</td>
								</tr>
								<tr>
									<td className="text-right px-2 font-semibold">Người nộp hồ sơ:</td>
									<td>{infoProcedure?.HoTen}</td>
								</tr>
								<tr>
									<td className="text-right px-2 font-semibold">Ngày gửi:</td>
									<td>{moment(infoProcedure?.MC_TTHC_GV_GuiYeuCau_NgayGui).format("DD/MM/YYYY HH:mm:ss")}</td>
								</tr>
								<tr>
									<td className="text-right px-2 font-semibold">Trạng thái:</td>
									<td>{infoProcedure?.MC_TTHC_GV_TrangThai_TenTrangThai}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="mb-4 border p-2 bg-white">
						<h3 className="text-xl uppercase font-bold mb-4 underline">Quá trình xử lý:</h3>
						<table className="w-[500px] border">
							<thead className="bg-[#336699] text-white">
								<tr>
									<th className="border-r rounded-tl-xl">Bước</th>
									<th className="border-r rounded-tr-xl">Công việc</th>
								</tr>
							</thead>
							<tbody>
								{listTrangThai?.length > 0 &&
									listTrangThai?.map((iTrangThai, index) => {
										return (
											<tr key={index} className={clsx(currentStatusByProcedure == iTrangThai?.MC_TTHC_GV_TrangThai_ID ? "bg-slate-300" : "")}>
												<td className="text-center border-r">{index + 1}</td>
												<td className="text-center border-r">{iTrangThai?.MC_TTHC_GV_TrangThai_TenTrangThai}</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
				</>
			)}
		</div>
	);
}

export default TheoDoiDeNghiTTHCGVChiTiet;
