import http from "../../Configs/http";

export const getDanhSachYeuCau = async () => {
	try {
		const response = await http.get(`/SP_DT_QLTS_TiepNhan/Load`);
		const data = await response.data;
		const listData = data.body;
		return listData;
	} catch (error) {
		console.log(error);
	}
};
