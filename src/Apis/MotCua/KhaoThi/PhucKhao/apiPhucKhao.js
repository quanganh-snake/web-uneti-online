import http from "../../../../Configs/http";

// Method lấy tất cả học phần phúc khảo
export const getAllHocPhanPhucKhao = (MaSinhVien = "", tenDot = "", loaiThi = "", accessToken = "") => {
	const strQueryParams = `MaSinhVien=${MaSinhVien}&MC_KT_PhucKhao_TenDot=${tenDot}&MC_KT_PhucKhao_LoaiThi=${loaiThi}`;
	const endpoint = `SP_MC_KT_PhucKhao_TiepNhan/EDU_Load_R_Para_MaSinhVien_KetQuaHT?${strQueryParams}`;

	return http.get(endpoint, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

// Method kiểm tra học phần phúc khảo quá hạn hay chưa? 0 === quá hạn || 1 === chưa quá hạn
export const checkExpiredPhucKhao = (ngayThi = "", accessToken = "") => {
	const strQueryParams = `MC_KT_PhucKhao_NgayThi=${ngayThi}`;
	const endpoint = `SP_MC_KT_PhucKhao_TiepNhan/KiemTra_ThoiGianTiepNhan?${strQueryParams}`;

	return http.get(endpoint, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

// Method gửi yêu cầu phúc khảo + kiểm tra yêu cầu trùng
export const postYeuCauPhucKhao = (data = {}, accessToken = "") => {
	return http.post("SP_MC_KT_PhucKhao_TiepNhan/Add_Para", data, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
