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
    timeout: 30000, // TODO: check trang đầu tiên của tiếng Anh timeout
  })

export const getTongSoTrangTheoDe = ({ IDDeThi, SoCauTrenTrang }) =>
  http.get('SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/TongSoTrangCauHoi_TheoDe', {
    params: {
      IDDeThi,
      SoCauTrenTrang,
    },
  })
