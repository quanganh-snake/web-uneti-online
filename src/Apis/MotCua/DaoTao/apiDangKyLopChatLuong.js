import http from '@/Configs/http'

export const getAllHocPhanDKLopChatLuong = (TenDot = '', MaSinhVien = '') => {
  return http.get(
    'SP_MC_DT_DKHocChatLuong_TiepNhan/EDU_Load_Para_View_TKB_LopHocPhan',
    {
      params: {
        MC_DT_DKHocChatLuong_TenDot: TenDot,
        MC_DT_DKHocChatLuong_MaSinhVien: MaSinhVien,
      },
    },
  )
}

// kiểm tra gửi quá hạn yêu cầu
export const getKiemTraQuaHanDKLopChatLuong = () => {
  return http.get('SP_MC_DT_DKHocChatLuong_TiepNhan/KiemTra_GioiHan')
}

// kiểm tra gửi trùng yêu cầu
export const getKiemTraTrungDKLopChatLuong = (
  MaSinhVien = '',
  LyDo = '',
  MaLopHoc = '',
) => {
  return http.get('SP_MC_DT_DKHocChatLuong_TiepNhan/KiemTraTrung', {
    params: {
      MC_DT_DKHocChatLuong_MaSinhVien: MaSinhVien,
      MC_DT_DKHocChatLuong_YeuCau_LyDo: LyDo,
      MC_DT_DKHocChatLuong_MaLopHoc: MaLopHoc,
    },
  })
}

// POST yêu cầu
export const postDKLopChatLuong = (data = {}) => {
  return http.post('SP_MC_DT_DKHocChatLuong_TiepNhan/Add_Para', data)
}
