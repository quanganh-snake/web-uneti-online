import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "./Tabs/Tabs";
import ThongTinHoSo from "./ThemMoiThuTuc/ThongTinHoSo";
import ThanhPhanHoSoDeNghi from "./ThemMoiThuTuc/ThanhPhanHoSoDeNghi";
import TrinhTuThucHien from "./ThemMoiThuTuc/TrinhTuThucHien";
import PhiLePhi from "./ThemMoiThuTuc/PhiLePhi";
import TrangThaiHoSo from "./ThemMoiThuTuc/TrangThaiHoSo";
import PhanQuyen from "./ThemMoiThuTuc/PhanQuyen";
import SidebarTTHCGV from "./Sidebar/SidebarTTHCGV";
import { getAllPhongBan, postThuTucHanhChinh } from "../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";
import { createAxiosJWT } from "./../../../Configs/http";
import { DataSinhVien } from "../../../Services/Utils/dataSinhVien";
import { DataCanBoGV } from "../../../Services/Utils/dataCanBoGV";
import { useDispatch } from "react-redux";
import { tokenSuccess } from "../../../Services/Redux/Slice/authSlice";
import { NguonTiepNhan_WEB } from "../../../Services/Static/dataStatic";
import Swal from "sweetalert2";
import { postThanhPhanHoSoTTHCGV } from "./../../../Apis/ThuTucHanhChinhGiangVien/apiThanhPhanHoSo";
import { postTrinhTuThucHienTTHCGV } from "./../../../Apis/ThuTucHanhChinhGiangVien/apiTrinhTuThucHien";
import { postLePhi } from "./../../../Apis/ThuTucHanhChinhGiangVien/apiLePhi";
import { postTrangThaiTTHCGV } from "./../../../Apis/ThuTucHanhChinhGiangVien/apiTrangThai";
import { getThuTucHanhChinhByMaThuTuc } from "./../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";

const checkValidateTepThuTuc = (thuTucLienThong = false, thuThucKhongApDungMC = false, images = []) => {
	if ((thuTucLienThong || thuThucKhongApDungMC) && images.length === 1) {
		return true;
	} else if (thuTucLienThong && thuThucKhongApDungMC && images.length === 2) {
		return true;
	} else if (!thuTucLienThong && !thuThucKhongApDungMC && images.length === 0) {
		return true;
	} else {
		return false;
	}
};

const errorMessageFieldThongTinHoSo = {
	MC_TTHC_GV_MaThuTuc: "Vui lòng nhập mã thủ tục!",
	MC_TTHC_GV_TenThuTuc: "Vui lòng nhập tên thủ tục!",
	MC_TTHC_GV_IDMucDo: "Vui lòng chọn mức độ!",
	MC_TTHC_GV_LinhVuc: "Vui lòng nhập lĩnh vực!",
	MC_TTHC_GV_TongThoiGianGiaiQuyet: "Vui lòng nhập tổng thời gian giải quyết!",
	MC_TTHC_GV_NoiTiepNhan: "Vui lòng chọn nơi tiếp nhận hồ sơ!",
	MC_TTHC_GV_NoiTraKetQua: "Vui lòng chọn nơi trả kết quả!",
};

function AdminTTHCGVView(props) {
	const { listMucDo } = props;
	// variables
	// error
	const [errorThongTinHoSo, setErrorThongTinHoSo] = useState({});
	// var: active Tabs
	const [thongTinActive, setThongTinActive] = useState(false);
	const [tpHoSoDeNghiActive, setTPHoSoDeNghiActive] = useState(false);
	const [trinhTuThucHienActive, setTrinhTuThucHienActive] = useState(false);
	const [phiActive, setPhiActive] = useState(false);
	const [phanQuyenActive, setPhanQuyenActive] = useState(false);
	const [trangThaiActive, setTrangThaiActive] = useState(false);
	// var: dataForm - thongtinhoso
	const [tenThuTuc, setTenThuTuc] = useState("");
	const [canCuPhapLyCuaTTHC, setCanCuPhapLyCuaTTHC] = useState("");
	const [dieuKienThucHien, setDieuKienThucHien] = useState("");
	const [viTri, setViTri] = useState("");
	const [maThuTuc, setMaThuTuc] = useState("");
	const [mucDo, setMucDo] = useState("");
	const [tongThoiGianGiaiQuyet, setTongThoiGianGiaiQuyet] = useState("");
	const [soBoHoSo, setSoBoHoSo] = useState("");
	const [linhVuc, setLinhVuc] = useState("");
	const [listDonVi, setListDonVi] = useState(null);
	const [donViTiepNhan, setDonViTiepNhan] = useState("");
	const [noiTraKetQua, setNoiTraKetQua] = useState("");
	const [thuTucLienThong, setThuTucLienThong] = useState(false);
	const [thuTucKhongApDungMotCua, setThuTucLienThongApDungMotCua] = useState(false);
	const [thanhPhanHoSo, setThanhPhanHoSo] = useState([]);
	const [quyTrinh, setQuyTrinh] = useState([]);
	const [phiLePhi, setPhiLePhi] = useState([]);
	const [trangThai, setTrangThai] = useState([]);
	const [phanQuyen, setPhanQuyen] = useState([]);

	const dataTokenSV = DataSinhVien();
	const dataTokenCBGV = DataCanBoGV();
	const dataToken = dataTokenSV.dataToken ?? dataTokenCBGV.dataToken;
	const dispatch = useDispatch();

	const axiosJWT = createAxiosJWT(dataToken, dispatch);

	// event handlers
	const handleOpenTab = (e) => {
		const { id } = e.target;
		if (id === "btnThietLapHoSo") {
			setThongTinActive(true);
			setTPHoSoDeNghiActive(false);
			setTrinhTuThucHienActive(false);
			setPhiActive(false);
			setPhanQuyenActive(false);
			setTrangThaiActive(false);
		}

		if (id === "btnTPHSDeNghi") {
			setThongTinActive(false);
			setTPHoSoDeNghiActive(true);
			setTrinhTuThucHienActive(false);
			setPhiActive(false);
			setPhanQuyenActive(false);
			setTrangThaiActive(false);
		}

		if (id === "btnTLTrinhTuThucHien") {
			setThongTinActive(false);
			setTPHoSoDeNghiActive(false);
			setTrinhTuThucHienActive(true);
			setPhiActive(false);
			setPhanQuyenActive(false);
			setTrangThaiActive(false);
		}

		if (id === "btnPhiLePhi") {
			setThongTinActive(false);
			setTPHoSoDeNghiActive(false);
			setTrinhTuThucHienActive(false);
			setPhiActive(true);
			setPhanQuyenActive(false);
			setTrangThaiActive(false);
		}

		if (id === "btnPhanQuyen") {
			setThongTinActive(false);
			setTPHoSoDeNghiActive(false);
			setTrinhTuThucHienActive(false);
			setPhiActive(false);
			setPhanQuyenActive(true);
			setTrangThaiActive(false);
		}

		if (id === "btnTrangThai") {
			setThongTinActive(false);
			setTPHoSoDeNghiActive(false);
			setTrinhTuThucHienActive(false);
			setPhiActive(false);
			setPhanQuyenActive(false);
			setTrangThaiActive(true);
		}
	};

	const handleChangeValue = (e) => {
		const { id, value, checked } = e.target;
		if (id === "MC_TTHC_GV_TenThuTuc") {
			setTenThuTuc(value);
		}

		if (id === "MC_TTHC_GV_ThuTu") {
			setViTri(value);
		}

		if (id === "MC_TTHC_GV_MaThuTuc") {
			setMaThuTuc(value);
		}

		if (id === "MC_TTHC_GV_IDMucDo") {
			setMucDo(value);
		}

		if (id === "MC_TTHC_GV_TongThoiGianGiaiQuyet") {
			setTongThoiGianGiaiQuyet(value);
		}

		if (id === "MC_TTHC_GV_LinhVuc") {
			setLinhVuc(value);
		}

		if (id === "MC_TTHC_GV_NoiTiepNhan") {
			setDonViTiepNhan(value);
		}

		if (id === "MC_TTHC_GV_NoiTraKetQua") {
			setNoiTraKetQua(value);
		}

		if (id === "MC_TTHC_GV_ThuTucLienThong") {
			setThuTucLienThong(checked);
		}

		if (id === "MC_TTHC_GV_ThuTucKhongApDungMC") {
			setThuTucLienThongApDungMotCua(checked);
		}

		if (id === "MC_TTHC_GV_SoBoHoSo") {
			setSoBoHoSo(value);
		}

		if (id === "MC_TTHC_GV_CanCuPhapLyCuaTTHC") {
			setCanCuPhapLyCuaTTHC(value);
		}

		if (id === "MC_TTHC_GV_DieuKienThucHien") {
			setDieuKienThucHien(value);
		}
	};

	const handleAddThanhPhanHoSo = () => {
		const newThanhPhanHoSo = {
			MC_TTHC_GV_ThanhPhanHoSo_IDTTHC: "",
			MC_TTHC_GV_ThanhPhanHoSo_STT: "",
			MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo: "",
			MC_TTHC_GV_ThanhPhanHoSo_BanChinh: false,
			MC_TTHC_GV_ThanhPhanHoSo_BanSao: false,
			MC_TTHC_GV_ThanhPhanHoSo_BatBuoc: false,
			MC_TTHC_GV_ThanhPhanHoSo_DataFile: null,
			MC_TTHC_GV_ThanhPhanHoSo_TenFile: "",
		};

		setThanhPhanHoSo([...thanhPhanHoSo, newThanhPhanHoSo]);
	};

	const handleAddQuyTrinh = () => {
		const newQuyTrinh = {
			MC_TTHC_GV_TrinhTuThucHien_IDTTHC: "",
			MC_TTHC_GV_TrinhTuThucHien_Buoc: "",
			MC_TTHC_GV_TrinhTuThucHien_TenCongViec: "",
			MC_TTHC_GV_TrinhTuThucHien_CacThucThucHien: "",
			MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra: "",
			MC_TTHC_GV_TrinhTuThucHien_DonViThucHien: "",
			MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop: "",
			MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay: 0,
			MC_TTHC_GV_TrinhTuThucHien_KetQua: "",
		};

		setQuyTrinh([...quyTrinh, newQuyTrinh]);
	};

	const handleAddLePhi = () => {
		const newLePhi = {
			MC_TTHC_GV_LePhi_STT: null,
			MC_TTHC_GV_LePhi_MucPhi: null,
			MC_TTHC_GV_LePhi_MoTa: "",
		};

		setPhiLePhi([...phiLePhi, newLePhi]);
	};

	const handleAddTrangThai = () => {
		const newTrangThai = {
			MC_TTHC_GV_TrangThai_IDTTHC: "",
			MC_TTHC_GV_TrangThai_TenTrangThai: "",
			MC_TTHC_GV_TrangThai_MoTa: "",
		};

		setTrangThai([...trangThai, newTrangThai]);
	};

	const handleOnSubmitForm = async (e) => {
		e.preventDefault();
		const dataThongTinHoSo = {
			MC_TTHC_GV_ThuTu: viTri,
			MC_TTHC_GV_MaThuTuc: maThuTuc,
			MC_TTHC_GV_TenThuTuc: tenThuTuc,
			MC_TTHC_GV_GhiChu: "",
			MC_TTHC_GV_IDMucDo: mucDo,
			MC_TTHC_GV_LinhVuc: linhVuc,
			MC_TTHC_GV_ThuTucLienThong: thuTucLienThong,
			MC_TTHC_GV_ThuTucKhongApDungMC: thuTucKhongApDungMotCua,
			MC_TTHC_GV_SoBoHoSo: soBoHoSo,
			MC_TTHC_GV_TongThoiGianGiaiQuyet: tongThoiGianGiaiQuyet,
			MC_TTHC_GV_CanCuPhapLyCuaTTHC: canCuPhapLyCuaTTHC,
			MC_TTHC_GV_DieuKienThucHien: dieuKienThucHien,
			MC_TTHC_GV_NguonTiepNhan: NguonTiepNhan_WEB,
			MC_TTHC_GV_NoiTiepNhan: donViTiepNhan,
			MC_TTHC_GV_NoiTraKetQua: noiTraKetQua,
			images: [],
		};

		let idTTHCGV;

		const errorObject = {};
		Object.keys(dataThongTinHoSo).forEach((key) => {
			if (!dataThongTinHoSo[key]) {
				errorObject[key] = errorMessageFieldThongTinHoSo[key];
			}
		});
		setErrorThongTinHoSo(errorObject);

		const checkDataTepThuTuc = checkValidateTepThuTuc(dataThongTinHoSo.MC_TTHC_GV_ThuTucLienThong, dataThongTinHoSo.MC_TTHC_GV_ThuTucKhongApDungMC, dataThongTinHoSo.images);
		if (checkDataTepThuTuc == false) {
			Swal.fire({
				icon: "error",
				title: "Thiếu thông tin bắt buộc",
				text: `Vui lòng tải lên tệp thủ tục ${dataThongTinHoSo.MC_TTHC_GV_ThuTucLienThong ? "liên thông" : "không áp dụng Một cửa"} !`,
			});
			return;
		}

		try {
			const resultPostThongTinTTHC = await postThuTucHanhChinh(axiosJWT, dataThongTinHoSo);
			if (resultPostThongTinTTHC.status === 200) {
				const dataPostThongTinHoSo = await resultPostThongTinTTHC.data;
				if (dataPostThongTinHoSo.message === "Bản ghi bị trùng.") {
					Swal.fire({
						icon: "error",
						title: "Hồ sơ đã tồn tại",
						text: `Thông tin hồ sơ ${dataThongTinHoSo.MC_TTHC_GV_TenThuTuc} - mã hồ sơ ${dataThongTinHoSo.MC_TTHC_GV_MaThuTuc} đã tồn tại. Vui lòng chỉnh sửa hoặc xóa hồ sơ để tạo mới!`,
					});
					return;
				} else {
					const dataTTHCGVGetID = await getThuTucHanhChinhByMaThuTuc(axiosJWT, maThuTuc);
					if (dataTTHCGVGetID.status === 200) {
						const dataTTHCGVID = await dataTTHCGVGetID.data;
						idTTHCGV = dataTTHCGVID.body[0].MC_TTHC_GV_ID;
					}
				}
			}

			// UI-POST: Thanh Phan Ho So
			for (let i = 0; i < thanhPhanHoSo.length; i++) {
				thanhPhanHoSo[i].MC_TTHC_GV_ThanhPhanHoSo_IDTTHC = idTTHCGV;
			}
			const resultPostThanhPhanHoSo = await postThanhPhanHoSoTTHCGV(axiosJWT, thanhPhanHoSo);

			// UI-POST: TrinhTuThucHien
			for (let i = 0; i < quyTrinh.length; i++) {
				quyTrinh[i].MC_TTHC_GV_TrinhTuThucHien_IDTTHC = idTTHCGV;
			}
			const resultPostTrinhTuThucHien = await postTrinhTuThucHienTTHCGV(axiosJWT, quyTrinh);

			// UI-POST: Lệ phí
			for (let i = 0; i < phiLePhi.length; i++) {
				phiLePhi[i].MC_TTHC_GV_LePhi_IDTTHC = idTTHCGV;
			}
			const resultPostLePhi = await postLePhi(axiosJWT, phiLePhi);

			// UI-POST: Trạng thái
			for (let i = 0; i < trangThai.length; i++) {
				trangThai[i].MC_TTHC_GV_TrangThai_IDTTHC = idTTHCGV;
			}
			const resultPostTrangThai = await postTrangThaiTTHCGV(axiosJWT, trangThai);

			try {
				if (resultPostThanhPhanHoSo.status === 200 && resultPostTrinhTuThucHien.status === 200 && resultPostLePhi.status === 200 && resultPostTrangThai.status === 200) {
					const dataPostThanhPhanHoSo = await resultPostThanhPhanHoSo.data;
					const dataPostTrinhTuThucHien = await resultPostTrinhTuThucHien.data;
					const dataPostLePhi = await resultPostLePhi.data;
					const dataPostTrangThai = await resultPostTrangThai.data;

					if (dataPostThanhPhanHoSo && dataPostTrinhTuThucHien && dataPostLePhi && dataPostTrangThai) {
						return Swal.fire({
							position: "center",
							icon: "success",
							title: "Thêm mới hồ sơ/thủ tục thành công!",
							showConfirmButton: false,
							timer: 1500,
						});
					} else {
						return Swal.fire({
							icon: "error",
							title: "Lỗi",
							text: `Vui lòng kiểm tra lại thông tin hồ sơ!`,
						});
					}
				}
			} catch (error) {
				console.log(">>> Error: " + error);
			}
		} catch (error) {
			console.log(">>> Error: " + [error]);
		}
	};

	useEffect(() => {
		const getDanhSachPhongBan = async () => {
			const resultGetAllPhongBan = await getAllPhongBan(axiosJWT);
			if (resultGetAllPhongBan.status === 200) {
				const dataPhongBan = await resultGetAllPhongBan.data;
				setListDonVi(dataPhongBan);
			}
		};

		getDanhSachPhongBan();

		setThongTinActive(true);
		setTPHoSoDeNghiActive(false);
		setTrinhTuThucHienActive(false);
		setPhiActive(false);
		setPhanQuyenActive(false);
		setTrangThaiActive(false);
	}, []);

	useEffect(() => {}, [thongTinActive, tpHoSoDeNghiActive, trinhTuThucHienActive, phiActive, phanQuyenActive, trangThaiActive]);

	return (
		<div className="px-5 lg:px-0 flex gap-4">
			<SidebarTTHCGV />
			<div className="w-full p-4 rounded-xl shadow-lg bg-white">
				{/* START: Tabs Bar */}
				<Tabs
					handleOpenTab={handleOpenTab}
					thongTinActive={thongTinActive}
					tpHoSoDeNghiActive={tpHoSoDeNghiActive}
					trinhTuThucHienActive={trinhTuThucHienActive}
					phiActive={phiActive}
					phanQuyenActive={phanQuyenActive}
					trangThaiActive={trangThaiActive}
				/>
				{/* END: Tabs Bar */}

				<form className="w-full" onSubmit={handleOnSubmitForm}>
					{/* START: Thông Tin Hồ Sơ */}
					{thongTinActive ? (
						<ThongTinHoSo
							listMucDo={listMucDo}
							tenThuTuc={tenThuTuc}
							viTri={viTri}
							maThuTuc={maThuTuc}
							mucDo={mucDo}
							tongThoiGianGiaiQuyet={tongThoiGianGiaiQuyet}
							soBoHoSo={soBoHoSo}
							linhVuc={linhVuc}
							donViTiepNhan={donViTiepNhan}
							noiTraKetQua={noiTraKetQua}
							thuTucLienThong={thuTucLienThong}
							thuTucKhongApDungMotCua={thuTucKhongApDungMotCua}
							handleChangeValue={handleChangeValue}
							errorThongTinHoSo={errorThongTinHoSo}
						/>
					) : null}
					{/* END: Thông Tin Hồ Sơ */}

					{/* START: Thành phần hồ sơ đề nghị */}
					{tpHoSoDeNghiActive ? <ThanhPhanHoSoDeNghi thanhPhanHoSo={thanhPhanHoSo} setThanhPhanHoSo={setThanhPhanHoSo} handleAddThanhPhanHoSo={handleAddThanhPhanHoSo} /> : null}
					{/* END: Thành phần hồ sơ đề nghị */}

					{/* START: Thiết lập trình tự thực hiện */}
					{trinhTuThucHienActive ? <TrinhTuThucHien quyTrinh={quyTrinh} setQuyTrinh={setQuyTrinh} handleAddQuyTrinh={handleAddQuyTrinh} /> : null}
					{/* END: Thiết lập trình tự thực hiện */}

					{/* START: Phí, lệ phí */}
					{phiActive ? <PhiLePhi phiLePhi={phiLePhi} setPhiLePhi={setPhiLePhi} handleAddLePhi={handleAddLePhi} /> : null}
					{/* END: Phí, lệ phí */}

					{/* START: Trạng thái */}
					{trangThaiActive ? <TrangThaiHoSo trangThai={trangThai} setTrangThai={setTrangThai} handleAddTrangThai={handleAddTrangThai} /> : null}
					{/* END: Trạng thái */}

					{/* START: Phân quyền */}
					{phanQuyenActive ? <PhanQuyen /> : null}
					{/* END: Phân quyền */}

					<div className="uneti-tthcgv__add-form">
						<button type="submit" className="px-3 py-1 bg-[#109435] text-white hover:opacity-70 rounded-md">
							Lưu hồ sơ
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

AdminTTHCGVView.propTypes = {};

export default AdminTTHCGVView;
