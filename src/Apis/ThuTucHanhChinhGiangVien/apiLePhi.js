import http from "../../Configs/http";

export const postLePhi = (data = []) => {
	return http.post("SP_MC_TTHC_GV_LePhiTiepNhan/Add_Para", data);
};
