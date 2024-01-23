import http from '@/Configs/http'

export const getTenDot = () =>
    http.get('SP_MC_KT_HoanThi_TiepNhan/EDU_Load_TenDot')

export const getAllHocPhanHoanThi = (maSinhVien, tenDot, loaiThi, lyDo) =>
    http.get('SP_MC_KT_HoanThi_TiepNhan/EDU_Load_Para_MaSinhVien_LichThi', {
        params: {
            MaSinhVien: maSinhVien,
            MC_KT_HoanThi_TenDot: tenDot,
            MC_KT_HoanThi_LoaiThi: loaiThi,
            MC_KT_HoanThi_YeuCau: lyDo,
        },
    })

export const hoanThikiemTraTrung = ({
    maSinhVien,
    tenCoSo,
    tenDot,
    maLopHocPhan,
    loaiThi,
}) =>
    http.get('SP_MC_KT_HoanThi_TiepNhan/KiemTraTrung', {
        params: {
            MC_KT_HoanThi_MaSinhVien: maSinhVien,
            MC_KT_HoanThi_TenCoSo: tenCoSo,
            MC_KT_HoanThi_TenDot: tenDot,
            MC_KT_HoanThi_MaLopHocPhan: maLopHocPhan,
            MC_KT_HoanThi_LoaiThi: loaiThi,
        },
    })

export const getTenDotHoanThi = () => {
    return http.get('SP_MC_KT_HoanThi_TiepNhan/EDU_Load_TenDot')
}

export const postHoanThi = (data = {}) => {
    return http.post('SP_MC_KT_HoanThi_TiepNhan/Add_Para', data)
}
