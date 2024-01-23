import http from '@/Configs/http'

// GET
export const getMonHocTheoSinhVien = (MaSinhVien = '') => {
  return http.get('SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/TheoSinhVien', {
    params: {
      MaSinhVien,
    },
  })
}

export const getCauHoiTheoDe = ({ IDDeThi, SoTrang, SoCauTrenTrang }) =>
  http.get('SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/CauHoi_TheoDeThi', {
    params: {
      IDDeThi,
      SoCauTrenTrang,
      SoTrang,
    },
  })

export const getTongSoTrangTheoDe = ({ IDDeThi, SoCauTrenTrang }) =>
  http.get('SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/TongSoTrangCauHoi_TheoDe', {
    params: {
      IDDeThi,
      SoCauTrenTrang,
    },
  })
