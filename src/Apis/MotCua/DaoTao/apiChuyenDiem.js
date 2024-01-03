import http from '@/Configs/http'

export const getAllHocPhanChuyenDiem = (MaSinhVien = '') => {
  return http.get('SP_MC_DT_ChuyenDiem_TiepNhan/EDU_Load_Para_MaSinhVien', {
    params: { MaSinhVien: MaSinhVien },
  })
}

export const getChuyenDiemID = (MaSinhVien = '') => {
  return http.get(
    'SP_MC_DT_ChuyenDiem_TiepNhan/Load_R_MC_DT_ChuyenDiem_ID_ByMaSinhVien',
    {
      params: {
        MC_DT_ChuyenDiem_MaSinhVien: MaSinhVien,
      },
    },
  )
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

export const getKiemTraTrungChuyenDiem = (
  MaSinhVien = '',
  YeuCau = '',
  HocKy = '',
  MaMonHoc = '',
) => {
  return http.get('SP_MC_DT_ChuyenDiem_TiepNhan/KiemTraTrung', {
    params: {
      MC_DT_ChuyenDiem_MaSinhVien: MaSinhVien,
      MC_DT_ChuyenDiem_YeuCau: YeuCau,
      MC_DT_ChuyenDiem_ChiTiet_HocKy: HocKy,
      MC_DT_ChuyenDiem_ChiTiet_MaMonHoc: MaMonHoc,
    },
  })
}

export const postChuyenDiem = (data = {}) => {
  return http.post('SP_MC_DT_ChuyenDiem_TiepNhan/Add_Para', data)
}

export const postChuyenDiemChiTiet = (data = {}) => {
  return http.post('SP_MC_DT_ChuyenDiem_TiepNhan/ChiTiet_Add_Para', data)
}
