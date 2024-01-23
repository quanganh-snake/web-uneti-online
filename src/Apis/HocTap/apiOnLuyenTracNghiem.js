import http from '@/Configs/http'

// GET
const getMonHocTheoSinhVien = (MaSinhVien = '') => {
    return http.get('SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/TheoSinhVien', {
        params: {
            MaSinhVien,
        },
    })
}

export { getMonHocTheoSinhVien }
