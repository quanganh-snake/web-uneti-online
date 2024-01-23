import http from '../../../Configs/http'

// lấy đợt thi
export const getTenDotDKThiLai = () => {
    return http.get('/SP_MC_KT_DangKyThi_TiepNhan/EDU_Load_TenDot')
}
// lấy danh sách học phần có thể đăng ký

export const getAllHocPhanDKThiLai = (
    MaSinhVien = '',
    tenDot = '',
    loaiThi = '',
) => {
    return http.get(
        `SP_MC_KT_DangKyThi_TiepNhan/EDU_Load_R_Para_MaSinhVien_DangKyThi`,
        {
            params: {
                MaSinhVien: MaSinhVien,
                MC_KT_DangKyThi_TenDot: tenDot,
                MC_KT_DangKyThi_LoaiThi: loaiThi,
            },
        },
    )
}

// kiểm tra trùng
export const getKiemTraTrung = (
    MaSinhVien = '',
    TenDot = '',
    TenMonHoc = '',
    MaMonHoc = '',
    YeuCau = 0,
) => {
    return http.get(`SP_MC_KT_DangKyThi_TiepNhan/KiemTraTrung`, {
        params: {
            MC_KT_DangKyThi_MaSinhVien: MaSinhVien,
            MC_KT_DangKyThi_TenDot: TenDot,
            MC_KT_DangKyThi_TenMonHoc: TenMonHoc,
            MC_KT_DangKyThi_MaMonHoc: MaMonHoc,
            MC_KT_DangKyThi_YeuCau: YeuCau,
        },
    })
}

// gửi yêu cầu
export const postDangKyThiLai = (data = {}) => {
    return http.post('SP_MC_KT_DangKyThi_TiepNhan/Add_Para', data)
}
export const getAllHocPhanLichThi = (
    MaSinhVien = '',
    tenDot = '',
    loaiThi = '',
    lyDo = '',
) => {
    const strQueryParams = `MaSinhVien=${MaSinhVien}&MC_KT_LichThi_TenDot=${tenDot}&MC_KT_LichThi_LoaiThi=${loaiThi}&MC_KT_LichThi_YeuCau=${lyDo}`
    const endpoint = `/SP_MC_KT_LichThi_TiepNhan/EDU_Load_R_Para_MaSinhVien_LichThiLichHoc?${strQueryParams}`
    return http.get(endpoint)
}
