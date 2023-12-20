import http from "../../Configs/http";

// DELETE
export const delPhanQuyenTTHCGV = (id) => {
	return http.delete("SP_MC_TTHC_GV_PhanQuyenTiepNhan/Del_Para", {
		data: {
			MC_TTHC_GV_PhanQuyen_ID: id.toString(),
		},
	});
};

// POST
export const postPhanQuyenTTHCGV = (data = []) => {
	return http.post("SP_MC_TTHC_GV_PhanQuyenTiepNhan/Add_Para", data);
};
