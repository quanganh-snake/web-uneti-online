import http from "../../../Configs/http";

export const getTenDotHoanThi = () => {
	return http.get("SP_MC_KT_HoanThi_TiepNhan/EDU_Load_TenDot")
}

export const postHoanThi = (data = {}) => {
	return http.post("SP_MC_KT_HoanThi_TiepNhan/Add_Para", data);
};
