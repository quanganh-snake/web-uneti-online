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
export const postThanhgPhanHoSoGuiYeuCau = (data = []) => {
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

// GET: Tìm kiếm hồ sơ thủ tục hành chính Giảng Viên
export const getThuTucHanhChinhByKeyWords = (keywords) => {
	try {
		return http.get("SP_MC_TTHC_GV_TiepNhan/TimKiemThuTuc", {
			params: {
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
