import http from "@/Configs/http";

// lấy đợt thi
export const getTenDotHDKThiLai = () => {
  return http.get("/SP_MC_KT_HDKThiLai_TiepNhan/EDU_Load_TenDot");
};

// lấy danh sách học phần có thể hủy đăng ký
export const getAllHocPhanHDKThiLai = (
  MaSinhVien = "",
  tenDot = "",
  loaiThi = "",
  yeuCau = 0,
) => {
  return http.get(
    `SP_MC_KT_HDKThiLai_TiepNhan/EDU_Load_Para_MaSinhVien_DKThi`,
    {
      params: {
        MaSinhVien: MaSinhVien,
        MC_KT_HDKThiLai_TenDot: tenDot,
        MC_KT_HDKThiLai_LoaiThi: loaiThi,
        MC_KT_HDKThiLai_YeuCau: yeuCau,
      },
    },
  );
};

// kiểm tra trùng
export const getKiemTraTrungHDKThi = (
  maSinhVien = "",
  tenCoSo = "",
  tenDot = "",
  maLopHocPhan = "",
  loaiThi = "",
) => {
  return http.get(`SP_MC_KT_HDKThiLai_TiepNhan/KiemTraTrung`, {
    params: {
      MC_KT_HDKThiLai_MaSinhVien: maSinhVien,
      MC_KT_HDKThiLai_TenCoSo: tenCoSo,
      MC_KT_HDKThiLai_TenDot: tenDot,
      MC_KT_HDKThiLai_MaLopHocPhan: maLopHocPhan,
      MC_KT_HDKThiLai_LoaiThi: loaiThi,
    },
  });
};

// hủy đăng ký
export const postHDKThiLai = (data = {}) => {
  return http.post("SP_MC_KT_HDKThiLai_TiepNhan/Add_Para", data);
};
