export const postTrangThaiTTHCGV = (axiosJWT, data = []) => {
	return axiosJWT.post("SP_MC_TTHC_GV_TrangThaiTiepNhan/Add_Para", data);
};
