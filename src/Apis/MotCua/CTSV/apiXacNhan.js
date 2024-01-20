import http from '@/Configs/http'

export const xacNhanKiemTraTrung = ({ maSinhVien, yeuCau }) =>
    http.get('SP_MC_HSSV_XacNhan_TiepNhan/KiemTraTrung', {
        params: {
            MC_HSSV_XacNhan_MaSinhVien: maSinhVien,
            MC_HSSV_XacNhan_YeuCau: yeuCau,
        },
    })

export const postYeuCauXacNhan = (data = {}) =>
    http.post('SP_MC_HSSV_XacNhan_TiepNhan/Add_Para', data)
