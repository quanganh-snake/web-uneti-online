/**
 * API - Thủ tục hành chính giảng viên
 * @param {*} axiosJWT
 * @param {*} data
 * @returns
 */

// POST
// POST: Tạo mới 1 hồ sơ thủ tục hành chính Giảng viên
export const postThuTucHanhChinh = (axiosJWT, data = {}) => {
	return axiosJWT.post("SP_MC_TTHC_GV_TiepNhan/Add_Para", data);
};

// GET DATA
// GET: Tất cả hồ sơ thủ tục hành chính Giảng Viên
export const getAllThuTucHanhChinhGV = (axiosJWT) => {
	return axiosJWT.get("SP_MC_TTHC_GV_TiepNhan/Load");
};

// GET: hồ sơ thủ tục hành chính Giảng Viên theo ID
export const getThuTucHanhChinhByID = (axiosJWT, id) => {
	return axiosJWT.get("SP_MC_TTHC_GV_TiepNhan/LoadChiTietHoSoTTHC_ByID", {
		params: {
			MC_TTHC_GV_IDTTHC: id,
		},
	});
};

// GET: hồ sơ thủ tục hành chính Giảng Viên theo Mã Thủ Tục
export const getThuTucHanhChinhByMaThuTuc = (axiosJWT, maThuTuc) => {
	return axiosJWT.get("SP_MC_TTHC_GV_TiepNhan/Load_IDGoc_R_Para_ByMaThuTuc", {
		params: {
			MC_TTHC_GV_MaThuTuc: maThuTuc,
		},
	});
};

// GET: Tìm kiếm hồ sơ thủ tục hành chính Giảng Viên
export const getThuTucHanhChinhByKeyWords = (axiosJWT, keywords) => {
	return axiosJWT.get("SP_MC_TTHC_GV_TiepNhan/TimKiemThuTuc", {
		params: {
			TuKhoaTimKiem: keywords,
		},
	});
};

// GET: Danh sách Phòng Ban
export const getAllPhongBan = (axiosJWT) => {
	return axiosJWT.get("SP_MC_TTHC_GV_TiepNhan/Load_PhongBan");
};

// GET: Danh sách nhân sự theo phòng ban
export const getAllNhanSuByIDPhongBan = (axiosJWT, idPhongBan) => {
	return axiosJWT.get("SP_MC_TTHC_GV_TiepNhan/Load_NhanSu_R_Para", {
		params: {
			IDPhongBan: idPhongBan,
		},
	});
};
