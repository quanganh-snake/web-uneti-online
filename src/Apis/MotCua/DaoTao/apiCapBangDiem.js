import http from '@/Configs/http'

export const capBangDiemKiemTraTrung = ({ maSinhVien, yeuCau, loaiBangDiem }) =>
  http.get('SP_MC_DT_CapBangDiem_TiepNhan/BangDiem_TiepNhan_KiemTraTrung', {
    params: {
      MC_DT_CapBangDiem_MaSinhVien: maSinhVien,
      MC_DT_CapBangDiem_YeuCau: yeuCau,
      MC_DT_CapBangDiem_YeuCau_LoaiBangDiem: loaiBangDiem
    }
  })

export const postCapBangDiem = (data = {}) =>
  http.post('SP_MC_DT_CapBangDiem_TiepNhan/Add_Para', data)
