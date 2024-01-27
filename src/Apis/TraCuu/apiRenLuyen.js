import http from '@/Configs/http'

export const getAllDiemRenLuyen = (MaSinhVien = '') => {
  return http.get(
    'SP_TC_SV_KetQuaHocTap_TiepNhan/EDU_Load_Para_MaSinhVien_DiemTrungBinhHocKy',
    {
      params: {
        TC_SV_KetQuaHocTap_MaSinhVien: MaSinhVien,
      },
    },
  )
}
