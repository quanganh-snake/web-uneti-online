import http from "../../Configs/http";

export const postTrangThaiTTHCGV = (data = []) => {
	return http.post("SP_MC_TTHC_GV_TrangThaiTiepNhan/Add_Para", data);
};
