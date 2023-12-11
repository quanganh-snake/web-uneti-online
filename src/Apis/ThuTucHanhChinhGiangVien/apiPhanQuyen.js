import http from "../../Configs/http";

export const postPhanQuyenTTHCGV = (data = []) => {
	return http.post("SP_MC_TTHC_GV_PhanQuyenTiepNhan/Add_Para", data);
};
