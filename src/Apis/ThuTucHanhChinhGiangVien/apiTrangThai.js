import http from "../../Configs/http";

// DELETE
export const deleteTrangThaiTTHCGV = (data = {}) => {
	return http.delete("SP_MC_TTHC_GV_TrangThaiTiepNhan/TrangThai_Del_Para", {
		data,
	});
};

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

// GET: get TrangThaiID by IDHoSoGoc, STT, Loai (Prev, Next)
export const getTrangThaiIDGuiYeuCauXuLySTT = (IDHoSoGoc, STT, Loai) => {
	return http.get("SP_MC_TTHC_GV_TiepNhan/GuiYeuCau_XuLySTT", {
		params: {
			MC_TTHC_GV_ID: IDHoSoGoc,
			STT: STT,
			Loai: Loai,
		},
	});
};
