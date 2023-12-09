export const postTrinhTuThucHienTTHCGV = (axiosJWT, data = []) => {
	return axiosJWT.post("SP_MC_TTHC_GV_TrinhTuThucHienTiepNhan/Add_Para", data);
};
