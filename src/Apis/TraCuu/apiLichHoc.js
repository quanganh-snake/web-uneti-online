import http from '@/Configs/http'

export const getLichHocSinhVien = ({ MaSinhVien }) =>
  http.get(
    'SP_TC_SV_KetQuaHocTap_TiepNhan/EDU_Load_Para_MaSinhVien_LichHocSinhVien',
    {
      TC_SV_KetQuaHocTap_MaSinhVien: MaSinhVien,
    },
  )
