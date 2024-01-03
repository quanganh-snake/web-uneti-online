import http from '@/Configs/http'

export const dangKyTotNghiepKiemTraTrung = ({ maSinhVien, yeuCau }) =>
  http.get('SP_MC_DT_TotNghiepXetThi_TiepNhan/KiemTraTrung', {
    params: {
      MC_DT_TotNghiepXetThi_MaSinhVien: maSinhVien,
      MC_DT_TotNghiepXetThi_YeuCau: yeuCau,
    },
  })

export const postDangKyTotNghiep = (data = {}) =>
  http.post('SP_MC_DT_TotNghiepXetThi_TiepNhan/Add_Para', data)
