export const getAllHocPhanDKThiLai = (axiosJWT, MaSinhVien = "", tenDot = "", loaiThi = "", accessToken = "") => {
	const strQueryParams = `MaSinhVien=${MaSinhVien}&MC_KT_DangKyThi_TenDot=${tenDot}&MC_KT_DangKyThi_LoaiThi=${loaiThi}`;
	const endpoint = `SP_MC_KT_DangKyThi_TiepNhan/EDU_Load_R_Para_MaSinhVien_DangKyThi?${strQueryParams}`;

	return axiosJWT.get(endpoint, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const postDangKyThiLai = (axiosJWT, data = {}, accessToken = "") => {
	return axiosJWT.post("SP_MC_KT_DangKyThi_TiepNhan/Add_Para", data, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
