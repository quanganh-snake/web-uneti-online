import http from "../../Configs/http";

export const postThanhPhanHoSoTTHCGV = (data = []) => {
	return http.post("SP_MC_TTHC_GV_ThanhPhanHoSoTiepNhan/Add_Para", data);
};

// GET: Lấy DS Thành phần hồ sơ - Gửi yêu cầu theo Hồ Sơ Gửi yêu Cầu
export const getThanhPhanHoSoGuiYeuCauById = (id = "") => {
	return http.get("SP_MC_TTHC_GV_ThanhPhanHoSoTiepNhan/GuiYeuCau_Load_ByIDGuiYeuCau", {
		params: {
			MC_TTHC_GV_GuiYeuCau_ID: id,
		},
	});
};
