/**
 * API - Thủ tục hành chính giảng viên
 * @param {*} data
 * @returns
 */

import http from "./../../Configs/http";

// POST
// POST: Tạo mới 1 hồ sơ thủ tục hành chính Giảng viên
export const postThuTucHanhChinh = (data = {}) => {
	return http.post("SP_MC_TTHC_GV_TiepNhan/Add_Para", data);
};

// POST: Gửi yêu cầu xử lý Hồ sơ, thủ tục
export const postThuTucHanhChinhGuiYeuCau = (data = {}) => {
	return http.post("SP_MC_TTHC_GV_TiepNhan/GuiYeuCau_Add_Para", data);
};

// POST: Gửi yêu cầu thành phần hồ sơ
export const postThanhPhanHoSoGuiYeuCau = (data = []) => {
	return http.post("SP_MC_TTHC_GV_ThanhPhanHoSoTiepNhan/GuiYeuCau_Add_Para", data);
};

// GET DATA
// GET: Tất cả hồ sơ thủ tục hành chính Giảng Viên
export const getAllThuTucHanhChinhGV = () => {
	return http.get("SP_MC_TTHC_GV_TiepNhan/Load");
};

// GET: hồ sơ thủ tục hành chính Giảng Viên theo ID
export const getThuTucHanhChinhByID = (id) => {
	return http.get("SP_MC_TTHC_GV_TiepNhan/LoadChiTietHoSoTTHC_ByID", {
		params: {
			MC_TTHC_GV_IDTTHC: id,
		},
	});
};

// GET: hồ sơ thủ tục hành chính Giảng Viên theo Mã Thủ Tục
export const getThuTucHanhChinhByMaThuTuc = (maThuTuc) => {
	return http.get("SP_MC_TTHC_GV_TiepNhan/Load_IDGoc_R_Para_ByMaThuTuc", {
		params: {
			MC_TTHC_GV_MaThuTuc: maThuTuc,
		},
	});
};

// GET: Hồ sơ thủ tục hành chính Giảng Viên - Gửi yêu cầu Trùng
export const getGuiYeuCauHoSoThuTucKiemTraTrung = (maNhanSu, yeuCauIDGoc, trangThaiYeuCauID) => {
	return http.get("SP_MC_TTHC_GV_TiepNhan/GuiYeuCau_Add_Para_KiemTraTrung", {
		params: {
			MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu: maNhanSu,
			MC_TTHC_GV_GuiYeuCau_YeuCau_ID: yeuCauIDGoc,
			MC_TTHC_GV_GuiYeuCau_TrangThai_ID: trangThaiYeuCauID,
		},
	});
};

// GET: Tìm kiếm hồ sơ thủ tục hành chính Giảng Viên
export const getThuTucHanhChinhByKeyWords = (dieuKienLoc, keywords) => {
	try {
		return http.get("SP_MC_TTHC_GV_TiepNhan/TimKiemThuTuc", {
			params: {
				MC_TTHC_GV_DieuKienLoc: dieuKienLoc,
				TuKhoaTimKiem: keywords,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

// GET: Danh sách Phòng Ban
export const getAllPhongBan = () => {
	return http.get("SP_MC_TTHC_GV_TiepNhan/Load_PhongBan");
};

// GET: Danh sách nhân sự theo phòng ban
export const getAllNhanSuByIDPhongBan = (idPhongBan) => {
	return http.get("SP_MC_TTHC_GV_TiepNhan/Load_NhanSu_R_Para", {
		params: {
			IDPhongBan: idPhongBan,
		},
	});
};

// GET: Danh sách lĩnh vực
export const getAllLinhVuc = () => {
	return http.get("SP_MC_TTHC_GV_TiepNhan/Load_LinhVuc");
};

// GET: Danh sách hồ sơ, thủ tục đã gửi lên
export const getAllHoSoGuiYeuCau = () => {
	return http.get("SP_MC_TTHC_GV_TiepNhan/GuiYeuCau_Load");
};

// GET: Danh sách thành phần hồ sơ - hồ sơ đã gửi
export const getAllThanhPhanHoSoGuiYeuCau = () => {
	return http.get("SP_MC_TTHC_GV_ThanhPhanHoSoTiepNhan/GuiYeuCau_Load");
};

// GET: Danh sách trạng thái hồ sơ yêu cầu
export const getAllTrangThaiHoSoYeuCau = () => {
	return http.get("SP_MC_TTHC_GV_TiepNhan/GuiYeuCau_Load_All_TrangThai");
};

// GET: Danh sách TTHCGV_GuiYeuCau theo trạng thái
export const getAllTTHCGVGuiYeuCauByTrangThai = (tenTrangThai = "") => {
	return http.get("SP_MC_TTHC_GV_TiepNhan/GuiYeuCau_Load_ByTrangThai", {
		params: {
			MC_TTHC_GV_TrangThai_TenTrangThai: tenTrangThai,
		},
	});
};

// GET: Danh sách TTHCGV_GuiYeuCau theo id
export const getAllHoSoGuiYeuCauById = (id = "") => {
	return http.get("SP_MC_TTHC_GV_TiepNhan/GuiYeuCau_Load_R_Para_File", {
		params: {
			MC_TTHC_GV_GuiYeuCau_ID: id,
		},
	});
};
