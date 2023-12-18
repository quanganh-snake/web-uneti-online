import http from "../../Configs/http";

// POST: Thêm trạng thái hồ sơ
export const postTrangThaiTTHCGV = (data = []) => {
	return http.post("SP_MC_TTHC_GV_TrangThaiTiepNhan/Add_Para", data);
};

// GET: load danh sách trạng thái
export const getListTrangThaiTTHCGV = () => {
	return http.get("SP_MC_TTHC_GV_TiepNhan/GuiYeuCau_Load_All_TrangThai");
};

// GET: get list trạng thái by id gốc
export const getListTrangThaiTTHCGVByIDGoc = (MC_TTHC_GV_IDTTHC = "") => {
	return http.get("SP_MC_TTHC_GV_TrangThaiTiepNhan/TrangThai_Load_ByIDGoc", {
		params: {
			MC_TTHC_GV_IDTTHC: MC_TTHC_GV_IDTTHC,
		},
	});
};

// GET: get ID Trạng thái by STT + YeuCauID
export const getTrangThaiIDBySTTYeuCauId = (yeuCauId = "", STT = "") => {
	return http.get("SP_MC_TTHC_GV_TrangThaiTiepNhan/TrangThai_GetID_BySTT", {
		params: {
			MC_TTHC_GV_GuiYeuCau_YeuCau_ID: yeuCauId,
			MC_TTHC_GV_TrangThai_STT: STT,
		},
	});
};
