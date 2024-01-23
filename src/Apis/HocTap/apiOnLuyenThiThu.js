import http from '@/Configs/http'

export const getAllMonHocThiThu = (MaSinhVien = '') => {
    return http.get('SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/TheoSinhVien', {
        params: {
            MaSinhVien: MaSinhVien,
        },
    })
}

export const getAllDeThiThiThu = (MaMonHoc = '') => {
    return http.get('SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/DeThi_TheoMonHoc', {
        params: {
            MaMonHoc: MaMonHoc,
        },
    })
}
export const LOAD_CAU_HOI_DIEU_KIEN_LOC = {
    TatCa: 0,
    ChuaLam: 1,
    DaLam: 2,
    PhanVan: 3,
}

export const getCauHoiTheoMonHoc = ({
    IDSinhVien,
    soTrang = 1,
    maMonHoc,
    dieuKienLoc = LOAD_CAU_HOI_DIEU_KIEN_LOC.TatCa,
}) =>
    http.get('SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/TheoMonHoc', {
        params: {
            IDSinhVien,
            SoTrang: soTrang,
            MaMonHoc: maMonHoc,
            DieuKienLoc: dieuKienLoc,
        },
    })

export const getTongSoTrangCauHoiTheoMonHoc = ({
    IDSinhVien,
    maMonHoc,
    dieuKienLoc = LOAD_CAU_HOI_DIEU_KIEN_LOC.TatCa,
}) =>
    http.get(
        'SP_TC_SV_OnThi_Load_CauHoi_TiepNhan/TongSoTrangCauHoi_TheoMonHoc',
        {
            params: {
                IDSinhVien,
                MaMonHoc: maMonHoc,
                DieuKienLoc: dieuKienLoc,
            },
        },
    )
