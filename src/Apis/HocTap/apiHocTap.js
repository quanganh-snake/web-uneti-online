import http from '@/Configs/http'

export const getAllMonHoc = (MaSinhVien = '') => {
  return http.get(
    'SP_TC_SV_KetQuaHocTap_TiepNhan/EDU_Load_Para_MaSinhVien_ChiTiet',
    {
      params: {
        TC_SV_KetQuaHocTap_MaSinhVien: MaSinhVien,
      },
    },
  )
}
