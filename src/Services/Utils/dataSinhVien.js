import moment from 'moment'
import { useSelector } from 'react-redux'

export const DataSinhVien = () => {
    const student = useSelector((state) => state.user?.currentUser)
    const dataToken = useSelector((state) => state.auth?.login?.currentToken)

    const {
        HoDem,
        Ten,
        LopHoc,
        HinhAnh,
        MaSinhVien,
        GioiTinh,
        NgaySinh,
        TenKhoaHoc,
        CoSo,
        SoCMND,
        Email_TruongCap,
        SoDienThoai,
        SoDienThoai2,
        SoDienThoai3,
        NgayCapCMND,
        NoiCapCMND,
        IdSinhVien,
        ChuyenNganh,
        KhoaHoc,
        LoaiHinhDaoTao,
        BacDaoTao,
        Khoa,
        DiaChiThuongTru,
        TrangThaiHocTap,
        Role,
    } = student ?? ''
    return {
        HoDem,
        Ten,
        HinhAnh,
        LopHoc,
        MaSinhVien,
        GioiTinh,
        NgaySinh,
        TenKhoaHoc,
        CoSo,
        SoCMND,
        Email_TruongCap,
        SoDienThoai,
        SoDienThoai2,
        SoDienThoai3,
        NgayCapCMND: NgayCapCMND
            ? moment(NgayCapCMND).format('DD/MM/YYYY').toString()
            : '',
        NoiCapCMND,
        IdSinhVien,
        ChuyenNganh,
        KhoaHoc,
        LoaiHinhDaoTao,
        BacDaoTao,
        Khoa,
        DiaChiThuongTru,
        TrangThaiHocTap,
        Role,
        dataToken,
    }
}
