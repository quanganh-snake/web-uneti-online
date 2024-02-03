import http from '@/Configs/http'
import { LOAD_CAU_HOI_DIEU_KIEN_LOC } from '@/Services/Tokens'

export const getAllMonHocThiThu = (MaSinhVien = '') => {
  return http.get('SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/TheoSinhVien', {
    params: {
      MaSinhVien: MaSinhVien,
    },
  })
}

export const getAllDeThiThiThu = (MaMonHoc = '') => {
  return http.get('SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/DeThi_TheoMonHoc', {
    params: {
      MaMonHoc: MaMonHoc,
    },
  })
}

export const getCauHoiTheoMonHoc = ({
  IDSinhVien,
  soTrang = 1,
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

export const getTongSoTrangCauHoiTheoMonHoc = ({
  IDSinhVien,
  maMonHoc,
  dieuKienLoc = LOAD_CAU_HOI_DIEU_KIEN_LOC.TatCa,
}) =>
  http.get('SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/TongSoTrangCauHoi_TheoMonHoc', {
    params: {
      IDSinhVien,
      MaMonHoc: maMonHoc,
      DieuKienLoc: dieuKienLoc,
    },
  })

export const getAudioById = ({ IDCauHoi }) =>
  http.get(`SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/GetAudio_ByID`, {
    params: {
      IDCauHoi,
    },
  })

export const getCauHoiTheoChuong = ({
  IDSinhVien,
  IDChuong,
  SoTrang = '10',
  SoCauTrenTrang,
  DieuKienLoc,
}) =>
  http.get('SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/CauHoi_TheoChuong_Web', {
    params: {
      IDSinhVien,
      IDChuong,
      SoTrang,
      SoCauTrenTrang,
      DieuKienLoc,
    },
  })

export const postDanhSachOnThi = (data) =>
  http.post('SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/DanhSachOnThi_Add_Para', data)

export const postKetQuaOnThi = (data) =>
  http.post('SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/KetQuaOnThi_Add_Para', data)

export const getTongSoTrangTheoDe = ({ IDDeThi, SoCauTrenTrang }) =>
  http.get('SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/TongSoTrangCauHoi_TheoDe_Web', {
    params: {
      IDDeThi,
      SoCauTrenTrang,
    },
  })
