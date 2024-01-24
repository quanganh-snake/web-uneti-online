import http from '@/Configs/http'

export const getAllDiemDanh = (MaSinhVien = '') => {
  return http.get(
    'SP_TC_SV_KetQuaHocTap_TiepNhan/EDU_Load_Para_MaSinhVien_DiemDanhSinhVien',
    {
      params: {
        TC_SV_KetQuaHocTap_MaSinhVien: MaSinhVien,
      },
    },
  )
}
