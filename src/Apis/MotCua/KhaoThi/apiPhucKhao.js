import http from '@/Configs/http'

// Method lấy tất cả học phần phúc khảo
export const getAllHocPhanPhucKhao = (
    MaSinhVien = '',
    tenDot = '',
    loaiThi = '',
) => {
    return http.get(
        'SP_MC_KT_PhucKhao_TiepNhan/EDU_Load_R_Para_MaSinhVien_KetQuaHT',
        {
            params: {
                MaSinhVien: MaSinhVien,
                MC_KT_PhucKhao_TenDot: tenDot,
                MC_KT_PhucKhao_LoaiThi: loaiThi,
            },
        },
    )
}

// Method kiểm tra học phần phúc khảo quá hạn hay chưa? 0 === quá hạn || 1 === chưa quá hạn
export const checkExpiredPhucKhao = (ngayThi = '') => {
    return http.get('SP_MC_KT_PhucKhao_TiepNhan/KiemTra_ThoiGianTiepNhan', {
        params: {
            MC_KT_PhucKhao_NgayThi: ngayThi,
        },
    })
}

// Method gửi yêu cầu phúc khảo + kiểm tra yêu cầu trùng
export const postYeuCauPhucKhao = (data = {}) => {
    return http.post('SP_MC_KT_PhucKhao_TiepNhan/Add_Para', data)
}
