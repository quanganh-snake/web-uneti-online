export const getDanhSachYeuCau = async (axiosJWT, token) => {
	try {
		const response = await axiosJWT.get(`/SP_DT_QLTS_TiepNhan/Load`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		// console.log("12-response-apiTaiSan: ", response);
		const data = await response.data;
		const listData = data.body;
		return listData;
	} catch (error) {
		console.log(error);
	}
};
