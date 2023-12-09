/**
 * API - TTHCGV - Mức độ thủ tục
 * @param {*} axiosJWT
 * @returns
 */

// GET DATA
// GET: Danh sách Mức độ thủ tục
export const getAllMucDoThuTuc = (axiosJWT) => {
	return axiosJWT.get("SP_MC_TTHC_GV_MucDoTiepNhan/Load");
};

// GET: Mức độ theo ID
export const getMucDoThuThucByID = (axiosJWT, id = "") => {
	return axiosJWT.get("SP_MC_TTHC_GV_MucDoTiepNhan/Load_R_Para_File", {
		params: {
			MC_TTHC_GV_MucDo_ID: id,
		},
	});
};
