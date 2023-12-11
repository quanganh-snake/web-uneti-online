import http from "../../Configs/http";

export const postThanhPhanHoSoTTHCGV = (data = []) => {
	return http.post("SP_MC_TTHC_GV_ThanhPhanHoSoTiepNhan/Add_Para", data);
};
