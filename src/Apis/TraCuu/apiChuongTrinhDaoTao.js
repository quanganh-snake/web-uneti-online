import http from '@/Configs/http'

export const getAllChuongTrinhDaoTao = (MaSinhVien = '') => {
  return http.get(
    'SP_TC_SV_KetQuaHocTap_TiepNhan/ChuongTrinhKhung_MonTuongDuong_Load_ByMaSinhVien',
    {
      params: {
        MaSinhVien,
      },
    },
  )
}
