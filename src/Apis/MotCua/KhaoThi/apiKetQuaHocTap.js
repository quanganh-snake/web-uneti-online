import http from "@/Configs/http";

// lấy danh sách tên đợt trong kqht
export const getTenDotKQHT = () => {
  return http.get("SP_MC_KT_DangKyThi_TiepNhan/EDU_Load_TenDot");
};

// lấy danh sách học phần có thể hủy đăng ký
export const getAllHocPhanKQHT = (MaSinhVien = "") => {
  return http.get(
    `SP_MC_KT_KetQuaHT_TiepNhan/EDU_Load_Para_MaSinhVien_KetQuaHT`,
    {
      params: {
        MaSinhVien: MaSinhVien,
      },
    },
  );
};

// kiểm tra gửi trùng yêu cầu
export const getKiemTraTrungKQHT = (
  MaSinhVien = "",
  TenDot = "",
  TenMonHoc = "",
  MaMonHoc = "",
) => {
  return http.get(`SP_MC_KT_KetQuaHT_TiepNhan/KiemTraTrung`, {
    params: {
      MC_KT_KetQuaHT_MaSinhVien: MaSinhVien,
      MC_KT_KetQuaHT_TenDot: TenDot,
      MC_KT_KetQuaHT_TenMonHoc: TenMonHoc,
      MC_KT_KetQuaHT_MaMonHoc: MaMonHoc,
    },
  });
};

// post sửa điểm
export const postKQHT = (data = {}) => {
  return http.post("SP_MC_KT_KetQuaHT_TiepNhan/Add_Para", data);
};
