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
import { postThuTucHanhChinh } from "../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";
import { createAxiosJWT } from "./../../../Configs/http";
import { DataSinhVien } from "../../../Services/Utils/dataSinhVien";
import { DataCanBoGV } from "../../../Services/Utils/dataCanBoGV";
import { useDispatch } from "react-redux";
import { tokenSuccess } from "../../../Services/Redux/Slice/authSlice";
import { NguonTiepNhan_WEB } from "../../../Services/Static/dataStatic";
import Swal from "sweetalert2";
function AdminTTHCGVView(props) {
	const { listMucDo } = props;
	// variables
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
	const [donViTiepNhan, setDonViTiepNhan] = useState("");
	const [noiTraKetQua, setNoiTraKetQua] = useState("");
	const [thuTucLienThong, setThuTucLienThong] = useState(false);
	const [thuTucKhongApDungMotCua, setThuTucLienThongApDungMotCua] = useState(false);
	const [thanhPhanHoSo, setThanhPhanHoSo] = useState([]);
	const [quyTrinh, setQuyTrinh] = useState([]);
	const [phiLePhi, setPhiLePhi] = useState([]);
	const [trangThai, setTrangThai] = useState([]);
	const [phanQuyen, setPhanQuyen] = useState([]);
	// const [formData, setFormData] = useState({
	// 	thongTinHoSo: {
	// 		tenThuTuc: "",
	// 		viTri: 1,
	// 		maThuTuc: "",
	// 		mucDo: 1,
	// 		tongThoiGianGiaiQuyet: "3",
	// 		linhVuc: "",
	// 		donViTiepNhan: "",
	// 		noiTraKetQua: "",
	// 		thuTucLienThong: false,
	// 		thuTucKhongApDungMotCua: false,
	// 	},
	// 	thanhPhanHoSoDeNghi: [],
	// 	quyTrinh: [],
	// 	phiLePhi: [],
	// 	trangThai: [],
	// 	phanQuyen: [],
	// });

	const dataTokenSV = DataSinhVien();
	const dataTokenCBGV = DataCanBoGV();
	const dataToken = dataTokenSV.dataToken ?? dataTokenCBGV.dataToken;
	const dispatch = useDispatch();
	const axiosJWT = createAxiosJWT(dataToken, dispatch, tokenSuccess);

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
			MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo: "",
			MC_TTHC_GV_ThanhPhanHoSo_DataFile: null,
			MC_TTHC_GV_ThanhPhanHoSo_TenFile: "",
			MC_TTHC_GV_ThanhPhanHoSo_BanChinh: false,
			MC_TTHC_GV_ThanhPhanHoSo_BanSao: false,
			MC_TTHC_GV_ThanhPhanHoSo_BatBuoc: false,
		};

		setThanhPhanHoSo([...thanhPhanHoSo, newThanhPhanHoSo]);
	};

	const handleAddQuyTrinh = () => {
		const newQuyTrinh = {
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
			MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo: "",
			MC_TTHC_GV_ThanhPhanHoSo_DataFile: null,
			MC_TTHC_GV_ThanhPhanHoSo_TenFile: "",
			MC_TTHC_GV_ThanhPhanHoSo_BanChinh: false,
			MC_TTHC_GV_ThanhPhanHoSo_BanSao: false,
			MC_TTHC_GV_ThanhPhanHoSo_BatBuoc: false,
		};

		setPhiLePhi([...phiLePhi, newLePhi]);
	};

	const handleAddTrangThai = () => {
		const newTrangThai = {
			MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo: "",
			MC_TTHC_GV_ThanhPhanHoSo_DataFile: null,
			MC_TTHC_GV_ThanhPhanHoSo_TenFile: "",
			MC_TTHC_GV_ThanhPhanHoSo_BanChinh: false,
			MC_TTHC_GV_ThanhPhanHoSo_BanSao: false,
			MC_TTHC_GV_ThanhPhanHoSo_BatBuoc: false,
		};

		setTrangThai([...trangThai, newTrangThai]);
	};

	const handleOnSubmitForm = async (e) => {
		e.preventDefault();
		const dataForms = {
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
			images: [
				{
					urlTemp: "",
					lastModified: "",
					MC_TTHC_GV_TepThuTuc_DataFileFile: "",
					MC_TTHC_GV_TepThuTuc_TenFile: "hinhanh-quanganh-test",
				},
			],
		};
		if (quyTrinh.length <= 0) {
			Swal.fire();
		}
		postThuTucHanhChinh(axiosJWT, dataForms)
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.log("ERROR: ", [error]);
			});
	};

	useEffect(() => {
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
