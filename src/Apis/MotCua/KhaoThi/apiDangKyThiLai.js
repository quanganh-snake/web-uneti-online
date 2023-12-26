import http from "../../../Configs/http";

// lấy đợt thi
export const getTenDotDKThiLai = () => {
	return http.get("/SP_MC_KT_DangKyThi_TiepNhan/EDU_Load_TenDot");
};

// lấy danh sách học phần có thể đăng ký
export const getAllHocPhanDKThiLai = (MaSinhVien = "", tenDot = "", loaiThi = "") => {
	return http.get(`SP_MC_KT_DangKyThi_TiepNhan/EDU_Load_R_Para_MaSinhVien_DangKyThi`, {
		params: {
			MaSinhVien: MaSinhVien,
			MC_KT_DangKyThi_TenDot: tenDot,
			MC_KT_DangKyThi_LoaiThi: loaiThi,
		},
	});
};

// kiểm tra trùng
export const getKiemTraTrung = (MaSinhVien = "", TenDot="", TenMonHoc="", MaMonHoc="", YeuCau) => {
	return http.get(`SP_MC_KT_DangKyThi_TiepNhan/KiemTraTrung`, {
		params: {
			MC_KT_DangKyThi_MaSinhVien: MaSinhVien,
			MC_KT_DangKyThi_TenDot: TenDot,
			MC_KT_DangKyThi_TenMonHoc: TenMonHoc,
			MC_KT_DangKyThi_MaMonHoc: MaMonHoc,
			MC_KT_DangKyThi_YeuCau: YeuCau
		},
	});
}

// gửi yêu cầu
export const postDangKyThiLai = (data = {}) => {
	return http.post("SP_MC_KT_DangKyThi_TiepNhan/Add_Para", data);
};
