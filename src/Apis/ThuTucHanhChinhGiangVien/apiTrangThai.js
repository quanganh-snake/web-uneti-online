import http from "../../Configs/http";

// POST: Thêm trạng thái hồ sơ
export const postTrangThaiTTHCGV = (data = []) => {
	return http.post("SP_MC_TTHC_GV_TrangThaiTiepNhan/Add_Para", data);
};

// GET: load danh sách trạng thái
export const getListTrangThaiTTHCGV = () => {
	return http.get("SP_MC_TTHC_GV_TiepNhan/GuiYeuCau_Load_All_TrangThai");
};
