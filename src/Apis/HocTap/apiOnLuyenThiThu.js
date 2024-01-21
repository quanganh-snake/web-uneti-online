import http from '@/Configs/http'

export const getAllMonHocThiThu = (MaSinhVien = '') => {
  return http.get('SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/TheoSinhVien', {
    params: {
      MaSinhVien: MaSinhVien,
    },
  })
}
