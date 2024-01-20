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
    DiaDiem = '',
    DayNha = '',
) => {
    return http.get('SP_DT_QLP_Phong_TiepNhan/Load_Para_SuCoKhacPhuc', {
        params: {
            DT_CVNB_TBGD_LichHoc_NgayBatDau: NgayBatDau,
            DT_CVNB_TBGD_LichHoc_TenDiaDiem: DiaDiem,
            DT_CVNB_TBGD_LichHoc_TenDayNha: DayNha,
        },
    })
}

export const getAllKhacPhucXuLySuCo = () => {
    return http.get('SP_DT_QLP_Phong_TiepNhan/TL_Load_R_Para_KhacPhuc')
}

export const getAllNguyenNhanXuLySuCo = () => {
    return http.get('SP_DT_QLP_Phong_TiepNhan/TL_Load_R_Para_NguyenNhan')
}

export const updateXuLySuCo = (data = {}) => {
    return http.put('SP_DT_QLP_Phong_TiepNhan/Edit_Para_KhacPhucSuCo', data)
}
