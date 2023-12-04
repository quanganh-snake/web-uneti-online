export const postPhanQuyenTTHCGV = (axiosJWT, data = []) => {
	return axiosJWT.post("SP_MC_TTHC_GV_PhanQuyenTiepNhan/Add_Para", data);
};
