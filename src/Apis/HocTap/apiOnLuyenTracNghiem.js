import http from '@/Configs/http'
import { LOAD_CAU_HOI_DIEU_KIEN_LOC } from '@/Services/Tokens'

// GET
export const getMonHocTheoSinhVien = (MaSinhVien = '') => {
  return http.get('/SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/TheoSinhVien', {
    params: {
      MaSinhVien,
    },
  })
}

export const getCauHoiTheoDe = ({ IDDeThi, SoTrang, SoCauTrenTrang }) =>
  http.get('/SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/CauHoi_TheoDeThi_Web', {
    params: {
      IDDeThi,
      SoCauTrenTrang,
      SoTrang,
    },
    timeout: 30000, // TODO: check trang đầu tiên của tiếng Anh timeout
  })

export const getTongSoTrangTheoDe = ({ IDDeThi, SoCauTrenTrang }) =>
  http.get('/SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/TongSoTrangCauHoi_TheoDe', {
    params: {
      IDDeThi,
      SoCauTrenTrang,
    },
  })

export const getPhanTheoMonHoc = (MaMonHoc = '') =>
  http.get('/SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/PhanCauHoi_TheoMonHoc', {
    params: {
      MaMonHoc: MaMonHoc,
    },
  })

export const getChuongTheoPhanCauHoi = (IDPhan = '') =>
  http.get('/SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/ChuongCauHoi_TheoPhan', {
    params: {
      IDPhan,
    },
  })

export const getCauHoiTheoChuong = ({
  IDSinhVien,
  IDChuong,
  SoTrang,
  SoCauTrenTrang = '10',
  DieuKienLoc,
}) =>
  http.get('/SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/CauHoi_TheoChuong', {
    params: {
      IDSinhVien,
      IDChuong,
      SoTrang,
      SoCauTrenTrang,
      DieuKienLoc,
    },
  })

export const getTongSoTrangTheoChuong = ({
  IDSinhVien,
  IDChuong,
  SoCauTrenTrang = '10',
  DieuKienLoc,
}) =>
  http.get(
    '/SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/TongSoTrangCauHoi_TheoChuong',
    {
      params: {
        IDSinhVien,
        IDChuong,
        SoCauTrenTrang,
        DieuKienLoc,
      },
    },
  )

export const getTongSoTrangTheoMonHoc = ({ MaMonHoc, DieuKienLoc }) =>
  http.get(
    '/SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/TongSoTrangCauHoi_TheoMonHoc',
    {
      params: {
        MaMonHoc,
        DieuKienLoc,
      },
    },
  )

export const getCauHoiTheoMonHoc = ({
  IDSinhVien,
  soTrang,
  maMonHoc,
  dieuKienLoc = LOAD_CAU_HOI_DIEU_KIEN_LOC.TatCa,
}) =>
  http.get('SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/TheoMonHoc', {
    params: {
      IDSinhVien: IDSinhVien,
      SoTrang: soTrang,
      MaMonHoc: maMonHoc,
      DieuKienLoc: dieuKienLoc,
    },
  })

export const postDanhSachOnTap = (data = {}) =>
  http.post(
    '/SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/DanhSachOnTap_GuiKetQua_Add_Para',
    data,
  )

export const postKetQuaOnTap = (data = []) =>
  http.post(
    '/SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/KetQuaOnTap_GuiKetQua_Add_Para',
    data,
  )
