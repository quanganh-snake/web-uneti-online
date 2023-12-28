import http from '../../../Configs/http'

export const getAllHocPhanDKThiLai = (
  MaSinhVien = '',
  tenDot = '',
  loaiThi = ''
) => {
  return http.get(
    `SP_MC_KT_DangKyThi_TiepNhan/EDU_Load_R_Para_MaSinhVien_DangKyThi`,
    {
      params: {
        MaSinhVien: MaSinhVien,
        MC_KT_DangKyThi_TenDot: tenDot,
        MC_KT_DangKyThi_LoaiThi: loaiThi
      }
    }
  )
}

export const postDangKyThiLai = (data = {}) => {
  return http.post('SP_MC_KT_DangKyThi_TiepNhan/Add_Para', data)
}
export const getAllHocPhanLichThi = (
  axiosJWT,
  MaSinhVien = '',
  tenDot = '',
  loaiThi = '',
  lyDo = '',
  accessToken = ''
) => {
  const strQueryParams = `MaSinhVien=${MaSinhVien}&MC_KT_LichThi_TenDot=${tenDot}&MC_KT_LichThi_LoaiThi=${loaiThi}&MC_KT_LichThi_YeuCau=${lyDo}`
  const endpoint = `/SP_MC_KT_LichThi_TiepNhan/EDU_Load_R_Para_MaSinhVien_LichThiLichHoc?${strQueryParams}`
  return axiosJWT.get(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}
