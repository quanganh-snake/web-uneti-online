import http from '../../../Configs/http'

export const getAllHocPhanLichThi = (
  MaSinhVien = '',
  tenDot = '',
  loaiThi = '',
  lyDo = '',
) => {
  return http.get(
    'SP_MC_KT_LichThi_TiepNhan/EDU_Load_R_Para_MaSinhVien_LichThiLichHoc',
    {
      params: {
        MaSinhVien: MaSinhVien,
        MC_KT_LichThi_TenDot: tenDot,
        MC_KT_LichThi_LoaiThi: loaiThi,
        MC_KT_LichThi_YeuCau: lyDo,
      },
    },
  )
}

export const postYeuCauLichThi = (data) => {
  return http.post('SP_MC_KT_LichThi_TiepNhan/Add_Para', data)
}
