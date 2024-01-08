import http from '@/Configs/http'

export const getTTPhongXuLySuCo = (id = '') => {
  return http.get('SP_DT_QLP_Phong_TiepNhan/Load_R_Para_File', {
    params: {
      DT_QLP_Phong_ID: id,
    },
  })
}

export const getAllLichDayXuLySuCo = (
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
