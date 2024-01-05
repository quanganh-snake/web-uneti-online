import http from '../../../Configs/http'

export const getAllHocPhanDKThiLai = (
  MaSinhVien = '',
  tenDot = '',
  loaiThi = '',
) => {
  return http.get(
    `SP_MC_KT_DangKyThi_TiepNhan/EDU_Load_R_Para_MaSinhVien_DangKyThi`,
    {
      params: {
        MaSinhVien: MaSinhVien,
        MC_KT_DangKyThi_TenDot: tenDot,
        MC_KT_DangKyThi_LoaiThi: loaiThi,
      },
    },
  )
}

export const postDangKyThiLai = (data = {}) => {
  return http.post('SP_MC_KT_DangKyThi_TiepNhan/Add_Para', data)
}
