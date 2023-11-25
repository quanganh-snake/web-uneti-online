export const getAllHocPhanLichThi = (axiosJWT, MaSinhVien = "", tenDot = "", loaiThi = "", lyDo = "", accessToken = "") => {
	const strQueryParams = `MaSinhVien=${MaSinhVien}&MC_KT_LichThi_TenDot=${tenDot}&MC_KT_LichThi_LoaiThi=${loaiThi}&MC_KT_LichThi_YeuCau=${lyDo}`;
	const endpoint = `/SP_MC_KT_LichThi_TiepNhan/EDU_Load_R_Para_MaSinhVien_LichThiLichHoc?${strQueryParams}`;
	return axiosJWT.get(endpoint, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
