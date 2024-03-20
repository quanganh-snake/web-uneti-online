import dayjs from 'dayjs'
import { useSelector } from 'react-redux'

export const DataCanBoGV = () => {
  const teacher = useSelector((state) => state.user?.currentUser)
  const dataToken = useSelector((state) => state.auth?.login?.currentToken)

  const {
    IDNhanSu,
    MaNhanSu,
    SoThuTu,
    HoDem,
    Ten,
    NgaySinh,
    NoiSinh,
    GioiTinh,
    NguyenQuan,
    HoKhau,
    NoiOHienTai,
    SoCMND,
    NgayCapCMND,
    NoiCapCMND,
    SoDienThoai,
    SoDiDong,
    Email,
    ATM1,
    ATM2,
    GiaoVien,
    DanToc,
    TonGiao,
    HienTaiDonVi,
    HienTaiChucVu,
    HienTaiPhongBan,
    HienTaiChucVuTuNgay,
    HienTaiChucVuDenNgay,
    ChuyenMon,
    HocVan,
    HocHam,
    HocHamNamPhong,
    HocVi,
    HocViNamHoc,
    HocViNamBaoVe,
    HocViNoiHoc,
    NgoaiNgu1,
    NgoaiNgu2,
    TrinhDoNgoaiNgu1,
    TrinhDoNgoaiNgu2,
    TrinhDoChinhTri,
    TrinhDoQuanLyNhaNuoc,
    TrinhDoQuanLyGiaoDuc,
    DangVienNgayVao,
    DangVienChinhThuc,
    DangVienChucVu,
    MaSoThue,
    LoaiTaiKhoan,
    Role,
    HT_GROUPUSER_ID,
    EmailUneti,
  } = teacher ?? ''
  return {
    IDNhanSu,
    MaNhanSu,
    SoThuTu,
    HoDem,
    Ten,
    NgaySinh: dayjs(NgaySinh).format('DD/MM/YYYY'),
    NoiSinh,
    GioiTinh,
    NguyenQuan,
    HoKhau,
    NoiOHienTai,
    SoCMND,
    NgayCapCMND: dayjs(NgayCapCMND).format('DD/MM/YYYY'),
    NoiCapCMND,
    SoDienThoai,
    SoDiDong,
    Email,
    ATM1,
    ATM2,
    GiaoVien,
    DanToc,
    TonGiao,
    HienTaiDonVi,
    HienTaiChucVu,
    HienTaiPhongBan,
    HienTaiChucVuTuNgay,
    HienTaiChucVuDenNgay,
    ChuyenMon,
    HocVan,
    HocHam,
    HocHamNamPhong,
    HocVi,
    HocViNamHoc,
    HocViNamBaoVe,
    HocViNoiHoc,
    NgoaiNgu1,
    NgoaiNgu2,
    TrinhDoNgoaiNgu1,
    TrinhDoNgoaiNgu2,
    TrinhDoChinhTri,
    TrinhDoQuanLyNhaNuoc,
    TrinhDoQuanLyGiaoDuc,
    DangVienNgayVao: dayjs(DangVienNgayVao).format('DD/MM/YYYY'),
    DangVienChinhThuc,
    DangVienChucVu,
    MaSoThue,
    LoaiTaiKhoan,
    Role,
    dataToken,
    HT_GROUPUSER_ID,
    EmailUneti,
  }
}
