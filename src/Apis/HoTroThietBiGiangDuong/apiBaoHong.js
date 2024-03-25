import http from '@/Configs/http'

export const getTTPhongBaoHong = (id = '') => {
  return http.get('SP_DT_QLP_Phong_TiepNhan/Load_R_Para_File', {
    params: {
      DT_QLP_Phong_ID: id,
    },
  })
}

export const getAllLichDayBaoHong = (
  NgayBatDau = '',
  NgayKetThuc = '',
  TenPhong = '',
  MaGiangVien = '',
) => {
  return http.get('SP_DT_QLP_Phong_TiepNhan/TBGD_Load_Para_Ngay', {
    params: {
      DT_CVNB_TBGD_LichHoc_NgayBatDau: NgayBatDau,
      DT_CVNB_TBGD_LichHoc_NgayKetThuc: NgayKetThuc,
      DT_CVNB_TBGD_LichHoc_TenPhong: TenPhong,
      DT_CVNB_TBGD_LichHoc_MaGiangVien: MaGiangVien,
    },
  })
}

export const getAllSuCo = (id = '', tenPhong = '') => {
  return http.get('SP_DT_QLP_Phong_TiepNhan/Load_R_Para_DanhSachThietBi', {
    params: {
      DT_CVNB_TBGD_TL_Nhom1: id,
      DT_CVNB_TBGD_TL_Nhom2: tenPhong,
    },
  })
}

export const updateBaoHong = (data = {}) => {
  return http.put('SP_DT_QLP_Phong_TiepNhan/Edit_SuCo_Web', data)
}

// GET: Lấy thông tin người trực TBGD
export const getTTNguoiTrucThietBi = (diaDiem = '', toaNha = '') => {
  return http.get('SP_DT_QLP_Phong_TiepNhan/LTTBGD_Load_Para_Ngay', {
    params: {
      DT_CVNB_LTTBGD_DiaDiem: diaDiem,
      DT_CVNB_LTTBGD_ToaNha: toaNha,
    },
  })
}
