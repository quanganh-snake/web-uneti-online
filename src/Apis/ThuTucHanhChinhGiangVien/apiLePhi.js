export const postLePhi = (axiosJWT, data = []) => {
	return axiosJWT.post("SP_MC_TTHC_GV_LePhiTiepNhan/Add_Para", data);
};
