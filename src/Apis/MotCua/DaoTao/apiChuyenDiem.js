import http from '@/Configs/http'

export const getAllHocPhanChuyenDiem = (MaSinhVien = '') => {
  return http.get('SP_MC_DT_ChuyenDiem_TiepNhan/EDU_Load_Para_MaSinhVien', {
    params: { MaSinhVien: MaSinhVien },
  })
}

export const getAllHocPhanTuongDuongChuyenDiem = (
  MaSinhVien = '',
  MaMonHoc = '',
) => {
  return http.get('SP_MC_DT_ChuyenDiem_TiepNhan/HT_HPTD_MCD_MaMonHoc', {
    params: {
      MaSinhVien: MaSinhVien,
      HT_HPTD_MCD_MaMonHoc: MaMonHoc,
    },
  })
}
