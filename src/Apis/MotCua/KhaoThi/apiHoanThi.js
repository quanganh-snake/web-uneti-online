export const postHoanThi = (axiosJWT, data = {}, accessToken = "") => {
	return axiosJWT.post("SP_MC_KT_HoanThi_TiepNhan/Add_Para", data, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
