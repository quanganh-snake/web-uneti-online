import http from "../../Configs/http";

export const postTrinhTuThucHienTTHCGV = (data = []) => {
	return http.post("SP_MC_TTHC_GV_TrinhTuThucHienTiepNhan/Add_Para", data);
};
