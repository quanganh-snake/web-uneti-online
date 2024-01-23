import http from '@/Configs/http'

export const getAllYeuCau = (MaSinhVien = '') => {
  return http.get('SP_MC_TrangThai_YeuCau_SinhVien/LoadThongBao', {
    params: {
      MC_TrangThai_YeuCau_SinhVien_MaSinhVien: MaSinhVien,
    },
  })
}

export const getChiTietYeuCau = (IDBang = '', TenBang = '') => {
  return http.get('SP_MC_TrangThai_YeuCau_SinhVien/SinhVien_ChiTiet', {
    params: {
      MC_TrangThai_YeuCau_SinhVien_IDBang: IDBang,
      MC_TrangThai_YeuCau_SinhVien_TenBang: TenBang,
    },
  })
}

export const updateXemYeuCau = (data = {}) => {
  return http.put('SP_MC_TrangThai_YeuCau_SinhVien/ReadTB_Para', data)
}
