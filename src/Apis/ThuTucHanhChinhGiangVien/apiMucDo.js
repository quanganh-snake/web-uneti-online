export const getAllMucDoThuTuc = (axiosJWT) => {
	return axiosJWT.get("SP_MC_TTHC_GV_MucDoTiepNhan/Load");
};

export const getMucDoThuThucByID = (axiosJWT, id = "") => {
	const strQueryParams = `MC_TTHC_GV_MucDo_ID=${id}`;
	const endpoint = `SP_MC_TTHC_GV_MucDoTiepNhan/Load_R_Para_File?${strQueryParams}`;
	return axiosJWT.get(endpoint);
};
