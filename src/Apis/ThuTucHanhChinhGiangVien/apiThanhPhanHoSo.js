export const postThanhPhanHoSoTTHCGV = (axiosJWT, data = []) => {
	return axiosJWT.post("SP_MC_TTHC_GV_ThanhPhanHoSoTiepNhan/Add_Para", data);
};
