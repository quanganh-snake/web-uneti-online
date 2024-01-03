import { useSelector } from 'react-redux'

export const DataCanBoGV = () => {
  const teacher = useSelector((state) => state.user?.currentUser)
  // console.log("🚀 ~ file: dataCanBoGV.js:5 ~ DataCanBoGV ~ teacher:", teacher)
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
  } = teacher ?? ''
  let formatDate = NgayCapCMND
    ? NgayCapCMND?.slice(8, 10) +
      '/' +
      NgayCapCMND?.slice(5, 7) +
      '/' +
      NgayCapCMND?.slice(0, 4)
    : ''
  let formatDateNgaySinh = NgaySinh
    ? NgaySinh?.slice(8, 10) +
      '/' +
      NgaySinh?.slice(5, 7) +
      '/' +
      NgaySinh?.slice(0, 4)
    : ''
  let formatDateVaoDang = NgaySinh
    ? DangVienNgayVao?.slice(8, 10) +
      '/' +
      DangVienNgayVao?.slice(5, 7) +
      '/' +
      DangVienNgayVao?.slice(0, 4)
    : ''
  return {
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
    formatDate,
    formatDateNgaySinh,
    formatDateVaoDang,
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
    dataToken,
  }
}
