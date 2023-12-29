import http from "@/Configs/http";

export const getKiemTraTrungEmailLMS = (
  MaSinhVien = "",
  Loai = "",
  YeuCau = ""
) => {
  return http.get("SP_MC_DT_EMAILLMS_TiepNhan/KiemTraTrung", {
    params: {
      MC_DT_EMAILLMS_MaSinhVien: MaSinhVien,
      MC_DT_EMAILLMS_Loai: Loai,
      MC_DT_EMAILLMS_YeuCau: YeuCau,
    },
  });
};

export const getKiemTraTrungTaiKhoanEmailLMS = (
  MaSinhVien = "",
  Loai = "",
  YeuCau = ""
) => {
  return http.get(
    "SP_MC_DT_EMAILLMS_TiepNhan/KiemTraTrungTaiKhoan_QTPM_QLEMAIL",
    {
      params: {
        MC_DT_EMAILLMS_MaSinhVien: MaSinhVien,
        MC_DT_EMAILLMS_Loai: Loai,
        MC_DT_EMAILLMS_YeuCau: YeuCau,
      },
    }
  );
};

export const postEmailLMS = (data = {}) => {
  return http.post("SP_MC_DT_EMAILLMS_TiepNhan/Add_Para", data);
};
