export const postThuTucHanhChinh = (axiosJWT, data = {}) => {
	return axiosJWT.post("SP_MC_TTHC_GV_TiepNhan/Add_Para", data);
};
