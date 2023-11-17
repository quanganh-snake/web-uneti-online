import http from "../../Configs/http";

export const getDanhSachYeuCau = async (token) => {
	try {
		const response = await http.get(`/SP_DT_QLTS_TiepNhan/Load`, {
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
