import { lazy } from 'react'
import { Route } from 'react-router-dom'
import AuthMiddleware from '@/Middlewares/AuthMiddleware'
const Home = lazy(() => import('@/Pages/Clients/Home/Home'))
const HomeMotCua = lazy(() => import('@/Pages/Clients/MotCua'))
// Middlewares
import RoleMiddleware from '@/Middlewares/RoleMiddleware.jsx'
import RoleViewActionMiddleware from '@/Middlewares/RoleViewActionMiddleware'
import { simpleSHA256 } from '@/Services/Utils/stringUtils'
import KDCLLayout from '@/Layouts/LayoutKDCL/KDCLLayout'
import KiemDinhChatLuongCTDT from '@/Pages/Admins/DamBaoChatLuong/KiemDinhChatLuongCTDT/KiemDinhChatLuongCTDT'
import KiemDinhChatLuongCSGD from '@/Pages/Admins/DamBaoChatLuong/KiemDinhChatLuongCSGD/KiemDinhChatLuongCSGD'
import CauHinhNhiemVu from '@/Pages/Admins/DamBaoChatLuong/CauHinhNhiemVu/CauHinhNhiemVu'
import PhanHoi from '@/Pages/Admins/KhaoSatVaDanhGiaChatLuong/PhanHoi/PhanHoi'
import CSDLDonVi from '@/Pages/Admins/CSDLDonVi/CSDLDonVi'
import MCDungChungDonVi from '@/Pages/Admins/QuanLyMinhChung/MCDungChungDonVi/MCDungChungDonVi'
import CauHinhDinhDangMaMC from '@/Pages/Admins/QuanLyMinhChung/CauHinhDinhDangMaMC/CauHinhDinhDangMaMC'
import GioiThieu from '@/Pages/Admins/CSDLDonVi/GioiThieu/GioiThieu'
import ThongKeNguoiHoc from '@/Pages/Admins/CSDLDonVi/ThongKeNguoiHoc/ThongKeNguoiHoc'
import DanhSachCanBoChuChot from '@/Pages/Admins/CSDLDonVi/DanhSachCanBoChuChot/DanhSachCanBoChuChot'
import ThongKeKhoaHoc from '@/Pages/Admins/CSDLDonVi/ThongKeKhoaHoc/ThongKeKhoaHoc'
import DanhSachCacDonVi from '@/Pages/Admins/CSDLDonVi/DanhSachCacDonVi/DanhSachCacDonVi'
import CoSoVatChat from '@/Pages/Admins/CSDLDonVi/CoSoVatChat/CoSoVatChat'
import ThongKeNhanLuc from '@/Pages/Admins/CSDLDonVi/ThongKeNhanLuc/ThongKeNhanLuc'
import DoiTac from '@/Pages/Admins/CSDLDonVi/DoiTac/DoiTac'

// Pages MC - Khảo Thí
const HomeKhaoThi = lazy(() => import('@/Pages/Clients/MotCua/KhaoThi'))
const MienHocThiTiengAnh = lazy(
  () =>
    import(
      '@/Pages/Clients/MotCua/KhaoThi/MienHocThiTiengAnh/MienHocThiTiengAnh.jsx'
    ),
)
const PhucKhao = lazy(
  () => import('@/Pages/Clients/MotCua/KhaoThi/PhucKhao/PhucKhao'),
)
const LichThi = lazy(
  () => import('@/Pages/Clients/MotCua/KhaoThi/LichThi/LichThi'),
)
const DangKyThiLai = lazy(
  () => import('@/Pages/Clients/MotCua/KhaoThi/DangKyThiLai/DangKyThiLai'),
)
const HoanThi = lazy(
  () => import('@/Pages/Clients/MotCua/KhaoThi/HoanThi/HoanThi'),
)
const HuyDangKyThiLai = lazy(
  () =>
    import('@/Pages/Clients/MotCua/KhaoThi/HuyDangKyThilai/HuyDangKyThiLai'),
)
const KetQuaHocTap = lazy(
  () => import('@/Pages/Clients/MotCua/KhaoThi/KetQuaHocTap/KetQuaHocTap'),
)

// Pages MC - Đào Tạo
const HomeDaoTao = lazy(() => import('@/Pages/Clients/MotCua/DaoTao'))
const CapBangDiem = lazy(
  () => import('@/Pages/Clients/MotCua/DaoTao/CapBangDiem/CapBangDiem'),
)
const XacNhanDT = lazy(
  () => import('@/Pages/Clients/MotCua/DaoTao/XacNhanDT/XacNhanDT'),
)
const DangKyTotNghiep = lazy(
  () => import('@/Pages/Clients/MotCua/DaoTao/DangKyTotNghiep/DangKyTotNghiep'),
)
const CapBanSao = lazy(
  () => import('@/Pages/Clients/MotCua/DaoTao/CapBanSao/CapBanSao'),
)
const SuaThongTin = lazy(
  () => import('@/Pages/Clients/MotCua/DaoTao/SuaThongTin/SuaThongTin'),
)
const MienChungChi = lazy(
  () => import('@/Pages/Clients/MotCua/DaoTao/MienChungChi/MienChungChi'),
)
const ChuyenDiem = lazy(
  () => import('@/Pages/Clients/MotCua/DaoTao/ChuyenDiem/ChuyenDiem'),
)
const EmailLMS = lazy(
  () => import('@/Pages/Clients/MotCua/DaoTao/EmailLMS/EmailLMS'),
)
const DangKyLopChatLuong = lazy(
  () =>
    import(
      '@/Pages/Clients/MotCua/DaoTao/DangKyLopChatLuong/DangKyLopChatLuong'
    ),
)

// Pages MC - CT&CTSV
const HomeCTSV = lazy(() => import('@/Pages/Clients/MotCua/CTSV'))
const CapLai = lazy(() => import('@/Pages/Clients/MotCua/CTSV/CapLai/CapLai'))
const XacNhanCTSV = lazy(
  () => import('@/Pages/Clients/MotCua/CTSV/XacNhanCTSV/XacNhanCTSV'),
)
const QuaTrinhHoc = lazy(
  () => import('@/Pages/Clients/MotCua/CTSV/QuaTrinhHoc/QuaTrinhHoc'),
)
const NghiHocTamThoi = lazy(
  () => import('@/Pages/Clients/MotCua/CTSV/NghiHocTamThoi/NghiHocTamThoi'),
)
const XinChuyen = lazy(
  () => import('@/Pages/Clients/MotCua/CTSV/XinChuyen/XinChuyen'),
)

// Pages MC - Hành Chính
const HomeHanhChinh = lazy(() => import('@/Pages/Clients/MotCua/HanhChinh'))
const GiayGioiThieu = lazy(
  () => import('@/Pages/Clients/MotCua/HanhChinh/GiayGioiThieu/GiayGioiThieu'),
)

// Pages MC - Hướng dẫn
const HomeHuongDan = lazy(() => import('@/Pages/Clients/MotCua/HuongDan'))

// Pages Thiết Bị Giảng Đường
const HomeTBGD = lazy(() => import('@/Pages/Clients/ThietBiGiangDuong'))
const BaoHong = lazy(
  () => import('@/Pages/Clients/ThietBiGiangDuong/BaoHong/BaoHong'),
)
const XuLySuCo = lazy(
  () => import('@/Pages/Clients/ThietBiGiangDuong/XuLySuCo/XuLySuCo'),
)
const DangKySuDungThietBi = lazy(
  () =>
    import(
      '@/Pages/Clients/ThietBiGiangDuong/DangKySuDungThietBi/DangKySuDungThietBi'
    ),
)
const GopY = lazy(() => import('@/Pages/Clients/ThietBiGiangDuong/GopY/GopY'))

// Pages Tài Sản
const HomeTaiSan = lazy(() => import('@/Pages/Clients/TaiSan/'))
const BaoHongTaiSan = lazy(
  () => import('@/Pages/Clients/TaiSan/BaoHongTaiSan/BaoHongTaiSan'),
)
const SuaChuaTaiSan = lazy(
  () => import('@/Pages/Clients/TaiSan/SuaChuaTaiSan/SuaChuaTaiSan'),
)
const TraCuuTaiSan = lazy(
  () => import('@/Pages/Clients/TaiSan/TraCuuTaiSan/TraCuuTaiSan'),
)
const CapNhatTaiSan = lazy(
  () => import('@/Pages/Clients/TaiSan/CapNhatThongTinTaiSan/CapNhatTaiSan'),
)

// Page Thủ tục hành chính Giảng viên
const HomeTTHCGV = lazy(
  () => import('@/Pages/Clients/ThuTucHanhChinhGiangVien/HomeTTHCGV.jsx'),
)
const ChiTietThuTuc = lazy(
  () =>
    import(
      '@/Pages/Clients/ThuTucHanhChinhGiangVien/ChiTietThuTuc/ChiTietThuTuc.jsx'
    ),
)
const SoanHoSo = lazy(
  () => import('@/Pages/Clients/ThuTucHanhChinhGiangVien/SoanHoSo/SoanHoSo'),
)
const HomeAdmin = lazy(() => import('@/Pages/Admins/Home/HomeAdmin.jsx'))
const AdminTTHCGV = lazy(() => import('@/Pages/Admins/TTHCGV/AdminTTHCGV.jsx'))
const CanBoNghiepVu = lazy(
  () => import('@/Pages/Admins/TTHCGV/CanBoNghiepVu/CanBoNghiepVu.jsx'),
)
const ChiTietHoSoYeuCau = lazy(
  () => import('@/Pages/Admins/TTHCGV/ChiTietHoSoYeuCau/ChiTietHoSoYeuCau.jsx'),
)
const ThongTinChiTietHoSo = lazy(
  () =>
    import(
      '@/Pages/Admins/TTHCGV/DanhSachHoSo/ThongTinChiTietHoSo/ThongTinChiTietHoSo.jsx'
    ),
)
const DanhSachHoSo = lazy(
  () => import('@/Pages/Admins/TTHCGV/DanhSachHoSo/DanhSachHoSo.jsx'),
)
const TheoDoiDeNghiTTHCGV = lazy(
  () =>
    import(
      '@/Pages/Clients/ThuTucHanhChinhGiangVien/TheoDoiDeNghiTTHCGV/TheoDoiDeNghiTTHCGV.jsx'
    ),
)
const TheoDoiDeNghiTTHCGVChiTiet = lazy(
  () =>
    import(
      '@/Pages/Clients/ThuTucHanhChinhGiangVien/TheoDoiDeNghiTTHCGV/TheoDoiDeNghiTTHCGVChiTiet.jsx'
    ),
)

// Page Hỗ trợ sử dụng phần mềm
const HoTroSuDungPhanMem = lazy(
  () => import('@/Pages/Clients/HoTroSuDungPhanMem/HoTroSuDungPhanMem.jsx'),
)

// page theo dõi đề nghị SV
const TheoDoiDeNghi = lazy(
  () => import('@/Pages/Clients/TheoDoiDeNghi/TheoDoiDeNghi.jsx'),
)
const TheoDoiDeNghiChiTiet = lazy(
  () =>
    import(
      '@/Pages/Clients/TheoDoiDeNghi/TheoDoiDeNghiChiTiet/TheoDoiDeNghiChiTiet.jsx'
    ),
)

// Page học tập
const HomeHocTap = lazy(() => import('@/Pages/Clients/HocTap/HocTap.jsx'))
const HocTapKetQuaHocTap = lazy(
  () => import('@/Pages/Clients/HocTap/KetQuaHocTap/KetQuaHocTap.jsx'),
)
const HocTapOnLuyen = lazy(
  () => import('@/Pages/Clients/HocTap/OnLuyen/OnLuyen.jsx'),
)
const HocTapOnTap = lazy(
  () => import('@/Pages/Clients/HocTap/OnLuyen/OnTap/OnTap.jsx'),
)
const HocTapThiThu = lazy(
  () => import('@/Pages/Clients/HocTap/OnLuyen/ThiThu/ThiThu.jsx'),
)
const KetQuaHocTapChiTiet = lazy(
  () =>
    import(
      '@/Pages/Clients/HocTap/KetQuaHocTap/KetQuaHocTapChiTiet/KetQuaHocTapChiTiet'
    ),
)
const DeThi = lazy(
  () =>
    import('@/Pages/Clients/HocTap/OnLuyen/ThiThu/DanhSachDeThi/DeThi/DeThi'),
)
const ThiThuDanhSachDeThi = lazy(
  () =>
    import('@/Pages/Clients/HocTap/OnLuyen/ThiThu/DanhSachDeThi/DanhSachDeThi'),
)
const OnTapDanhSachCauHoi = lazy(
  () =>
    import(
      '@/Pages/Clients/HocTap/OnLuyen/OnTap/DanhSachCauHoi/DanhSachCauHoi'
    ),
)
const HomeTraCuu = lazy(() => import('@/Pages/Clients/TraCuu'))
const ThoiKhoaBieu = lazy(
  () => import('@/Pages/Clients/TraCuu/ThoiKhoaBieu/ThoiKhoaBieu'),
)
const DiemDanh = lazy(() => import('@/Pages/Clients/TraCuu/DiemDanh/DiemDanh'))
const RenLuyen = lazy(() => import('@/Pages/Clients/TraCuu/RenLuyen/RenLuyen'))
const ChuongTrinhDaoTao = lazy(
  () => import('@/Pages/Clients/TraCuu/ChuongTrinhDaoTao/ChuongTrinhDaoTao'),
)
const DanhSachPhan = lazy(
  () =>
    import('@/Pages/Clients/HocTap/OnLuyen/OnTap/DanhSachPhan/DanhSachPhan'),
)
const DanhSachChuong = lazy(
  () =>
    import(
      '@/Pages/Clients/HocTap/OnLuyen/OnTap/DanhSachChuong/DanhSachChuong'
    ),
)

// Page Kiểm định chất lượng - GV
const KiemDinhChatLuong = lazy(
  () => import('@/Pages/Admins/KiemDinhChatLuong/KiemDinhChatLuong'),
)

const QuanLyNhomQuyen = lazy(
  () => import('@/Pages/Admins/QuanTriHeThong/QuanLyNhomQuyen/QuanLyNhomQuyen'),
)
const QuanLyDanhMuc = lazy(
  () => import('@/Pages/Admins/QuanTriHeThong/QuanLyDanhMuc/QuanLyDanhMuc'),
)
const QuanLyThuMuc = lazy(
  () => import('@/Pages/Admins/QuanTriHeThong/QuanLyThuMuc/QuanLyThuMuc'),
)
const SoDoToChuc = lazy(
  () => import('@/Pages/Admins/QuanTriHeThong/SoDoToChuc/SoDoToChuc'),
)
const ThamSoHeThong = lazy(
  () => import('@/Pages/Admins/QuanTriHeThong/ThamSoHeThong/ThamSoHeThong'),
)
const BoTieuChuanKiemDinh = lazy(
  () =>
    import(
      '@/Pages/Admins/QuanTriHeThong/BoTieuChuanKiemDinh/BoTieuChuanKiemDinh'
    ),
)
const MauKhaoSat = lazy(
  () => import('@/Pages/Admins/QuanTriHeThong/MauKhaoSat/MauKhaoSat'),
)
const NamHoc = lazy(() => import('@/Pages/Admins/QuanTriHeThong/NamHoc/NamHoc'))
const QuanLyNguoiDung = lazy(
  () => import('@/Pages/Admins/QuanTriHeThong/QuanLyNguoiDung/QuanLyNguoiDung'),
)

export const ROLES = {
  A0000: simpleSHA256('Admin'),
  G0101: simpleSHA256('GV'),
  S0202: simpleSHA256('SV'),
  CBNV0: simpleSHA256('CBNV'),
}

export const ROLE_VIEW_ACTION_HTTB = {
  QT_XLSC: '14',
}

export const ROLE_VIEW_ACTION_TTHCGV = {
  QT_TTHCGV: '15',
  CBNV_TTHCGV: '16',
  TP_TTHCGV: '24',
  BGH_TTHCGV: '25',
}

export const privateRoutes = (
  <>
    <Route element={<AuthMiddleware />}>
      <Route path="/uneti">
        <Route index element={<Home />} />
      </Route>
      {/* ADMIN */}
      <Route element={<RoleMiddleware allowedRoles={[ROLES.G0101]} />}>
        <Route path="admin">
          <Route index element={<HomeAdmin />} />
          <Route
            path="xu-ly-nghiep-vu"
            element={
              <RoleViewActionMiddleware
                allowedRoleViewAction={[
                  ROLE_VIEW_ACTION_TTHCGV.CBNV_TTHCGV,
                  ROLE_VIEW_ACTION_TTHCGV.TP_TTHCGV,
                  ROLE_VIEW_ACTION_TTHCGV.BGH_TTHCGV,
                ]}
              />
            }
          >
            <Route index element={<CanBoNghiepVu />} />
            <Route path="ho-so-xu-ly" element={<CanBoNghiepVu />} />
            <Route
              path="chi-tiet-yeu-cau/:yeucau/:id"
              element={<ChiTietHoSoYeuCau />}
            />
          </Route>
          <Route
            path="quan-tri-TTHCGV"
            element={
              <RoleViewActionMiddleware
                allowedRoleViewAction={[ROLE_VIEW_ACTION_TTHCGV.QT_TTHCGV]}
              />
            }
          >
            <Route index element={<DanhSachHoSo />} />
            <Route path="ho-so-thu-tuc/xem/tat-ca" element={<DanhSachHoSo />} />
            <Route path="ho-so-thu-tuc/them" element={<AdminTTHCGV />} />
            <Route
              path="ho-so-thu-tuc/xem/chi-tiet/:title/:id"
              element={<ThongTinChiTietHoSo />}
            />
          </Route>
        </Route>
      </Route>
      {/* Thủ tục hành chính giảng viên */}
      <Route element={<RoleMiddleware allowedRoles={[ROLES.G0101]} />}>
        <Route path="tthc-giang-vien">
          <Route index element={<HomeTTHCGV />} />
          <Route path="chi-tiet/:tieude/:id" element={<ChiTietThuTuc />} />
          <Route path="soan-ho-so/:tieude/:id/submit" element={<SoanHoSo />} />
          <Route path="theo-doi-quy-trinh">
            <Route index element={<TheoDoiDeNghiTTHCGV />} />
            <Route
              path="chi-tiet/:tieude/:id"
              element={<TheoDoiDeNghiTTHCGVChiTiet />}
            />
          </Route>
        </Route>
      </Route>
      {/* Tài sản */}
      <Route
        element={<RoleMiddleware allowedRoles={[ROLES.G0101, ROLES.S0202]} />}
      >
        <Route path="ho-tro-thiet-bi">
          <Route index element={<HomeTaiSan />} />
          <Route path="bao-hong-tai-san" element={<BaoHongTaiSan />} />
          <Route
            path="sua-chua-tai-san"
            element={
              <RoleViewActionMiddleware
                allowedRoleViewAction={[ROLE_VIEW_ACTION_HTTB.QT_XLSC]}
              />
            }
          >
            <Route index element={<SuaChuaTaiSan />} />
          </Route>
          <Route path="tra-cuu-tai-san" element={<TraCuuTaiSan />} />
          <Route path="cap-nhat-tai-san" element={<CapNhatTaiSan />} />
        </Route>
      </Route>
      {/* Một cửa - Sinh Viên */}
      <Route element={<RoleMiddleware allowedRoles={[ROLES.S0202]} />}>
        {/* Theo dõi đề nghị */}
        <Route path="theo-doi-de-nghi">
          <Route index element={<TheoDoiDeNghi />} />
          <Route
            path="theo-doi-de-nghi-chi-tiet"
            element={<TheoDoiDeNghiChiTiet />}
          />
        </Route>
        <Route path="mot-cua">
          <Route index element={<HomeMotCua />} />
          <Route path="khao-thi">
            <Route index element={<HomeKhaoThi />} />
            <Route
              path="mien-hoc-thi-tieng-anh"
              element={<MienHocThiTiengAnh />}
            />
            <Route path="phuc-khao" element={<PhucKhao />} />
            <Route path="lich-thi" element={<LichThi />} />
            <Route path="dang-ky-thi-lai" element={<DangKyThiLai />} />
            <Route path="hoan-thi" element={<HoanThi />} />
            <Route path="huy-dang-ky-thi-lai" element={<HuyDangKyThiLai />} />
            <Route path="ket-qua-hoc-tap" element={<KetQuaHocTap />} />
          </Route>
          <Route path="dao-tao">
            <Route index element={<HomeDaoTao />} />
            <Route path="cap-bang-diem" element={<CapBangDiem />} />
            <Route path="xac-nhan" element={<XacNhanDT />} />
            <Route path="dang-ky-tot-nghiep" element={<DangKyTotNghiep />} />
            <Route path="cap-ban-sao" element={<CapBanSao />} />
            <Route path="sua-thong-tin" element={<SuaThongTin />} />
            <Route path="mien-chung-chi" element={<MienChungChi />} />
            <Route path="chuyen-diem" element={<ChuyenDiem />} />
            <Route path="email-lms" element={<EmailLMS />} />
            <Route
              path="dang-ky-lop-chat-luong"
              element={<DangKyLopChatLuong />}
            />
          </Route>
          <Route path="ct&ctsv">
            <Route index element={<HomeCTSV />} />
            <Route path="cap-lai" element={<CapLai />} />
            <Route path="xac-nhan" element={<XacNhanCTSV />} />
            <Route path="qua-trinh-hoc" element={<QuaTrinhHoc />} />
            <Route path="nghi-hoc-tam-thoi" element={<NghiHocTamThoi />} />
            <Route path="xin-chuyen" element={<XinChuyen />} />
          </Route>
          <Route path="hanh-chinh">
            <Route index element={<HomeHanhChinh />} />
            <Route path="giay-gioi-thieu" element={<GiayGioiThieu />} />
          </Route>
          <Route path="huong-dan">
            <Route index element={<HomeHuongDan />} />
          </Route>
        </Route>
        <Route path="tra-cuu">
          <Route index element={<HomeTraCuu />} />
          <Route path="diem-danh" element={<DiemDanh />} />
          <Route path="ren-luyen" element={<RenLuyen />} />
          <Route path="thoi-khoa-bieu" element={<ThoiKhoaBieu />} />
          <Route path="chuong-trinh-dao-tao" element={<ChuongTrinhDaoTao />} />
        </Route>
      </Route>
      {/* Hỗ trợ TBGD */}
      <Route element={<RoleMiddleware allowedRoles={[ROLES.G0101]} />}>
        <Route path="ho-tro-thiet-bi-giang-duong">
          <Route index element={<HomeTBGD />} />
          <Route path="bao-hong/:id?" element={<BaoHong />} />
          <Route
            path="xu-ly-su-co"
            element={
              <RoleViewActionMiddleware
                allowedRoleViewAction={[ROLE_VIEW_ACTION_HTTB.QT_XLSC]}
              />
            }
          >
            <Route index element={<XuLySuCo />} />
          </Route>
          <Route
            path="dang-ky-su-dung-thiet-bi"
            element={<DangKySuDungThietBi />}
          />
          <Route path="gop-y" element={<GopY />} />
        </Route>
      </Route>

      {/* Học tập - Sinh Viên */}
      <Route element={<RoleMiddleware allowedRoles={[ROLES.S0202]} />}>
        <Route path="hoc-tap">
          <Route index element={<HomeHocTap />} />
          <Route path="ket-qua-hoc-tap" element={<HocTapKetQuaHocTap />} />
          <Route
            path="ket-qua-hoc-tap/ket-qua-hoc-tap-chi-tiet/:id?"
            element={<KetQuaHocTapChiTiet />}
          />
          <Route path="on-luyen">
            <Route index element={<HocTapOnLuyen />} />

            <Route path="on-tap">
              <Route index element={<HocTapOnTap />} />
              <Route path="danh-sach-phan/:id?">
                <Route index element={<DanhSachPhan />} />
                <Route path="danh-sach-chuong/:id?">
                  <Route index element={<DanhSachChuong />} />
                  <Route
                    path="danh-sach-cau-hoi/:id?"
                    element={<OnTapDanhSachCauHoi />}
                  />
                </Route>
              </Route>
            </Route>
            <Route path="thi-thu">
              <Route index element={<HocTapThiThu />} />
              <Route path="danh-sach-de-thi/:id?">
                <Route index element={<ThiThuDanhSachDeThi />} />
                <Route path="de-thi/:id?" element={<DeThi />}></Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
      {/* Hỗ trợ SDPM */}
      <Route path="ho-tro-su-dung-phan-mem" element={<HoTroSuDungPhanMem />} />

      <Route element={<RoleMiddleware allowedRoles={[ROLES.G0101]} />}>
        <Route element={<KDCLLayout />}>
          {/* Kiểm định chất lượng */}
          <Route path="kiem-dinh-chat-luong" element={<KiemDinhChatLuong />} />
          {/* Quản trị hệ thống */}
          <Route path="quan-tri-he-thong">
            <Route path="nguoi-dung" element={<QuanLyNguoiDung />} />
            <Route path="quan-ly-nhom-quyen" element={<QuanLyNhomQuyen />} />
            <Route path="danh-muc" element={<QuanLyDanhMuc />} />
            <Route path="so-do-to-chuc" element={<SoDoToChuc />} />
            <Route path="tham-so-he-thong" element={<ThamSoHeThong />} />
            <Route
              path="bo-tieu-chuan-kiem-dinh"
              element={<BoTieuChuanKiemDinh />}
            />
            <Route path="mau-khao-sat" element={<MauKhaoSat />} />
            <Route path="nam-hoc" element={<NamHoc />} />
            <Route path="thu-muc" element={<QuanLyThuMuc />} />
          </Route>
          {/* Đảm bảo chất lượng */}
          <Route path="dam-bao-chat-luong">
            <Route path="chat-luong-ctdt" element={<KiemDinhChatLuongCTDT />} />
            <Route path="chat-luong-csgd" element={<KiemDinhChatLuongCSGD />} />
            <Route path="cau-hinh-nhiem-vu" element={<CauHinhNhiemVu />} />
          </Route>

          {/* Khảo sát và đánh giá chất lượng */}
          <Route path="khao-sat-va-dgcl">
            <Route
              path="danh-gia-cua-cac-ben-lien-quan"
              element={<PhanHoi />}
            />
          </Route>

          {/* CSDL đơn vị */}
          <Route path="csdl-don-vi">
            <Route index path="tong-quan" element={<CSDLDonVi />} />
            <Route path="gioi-thieu" element={<GioiThieu />} />
            <Route path="thong-ke-nguoi-hoc" element={<ThongKeNguoiHoc />} />
            <Route
              path="danh-sach-can-bo-chu-chot"
              element={<DanhSachCanBoChuChot />}
            />
            <Route path="thong-ke-khoa-hoc" element={<ThongKeKhoaHoc />} />
            <Route path="danh-sach-cac-don-vi" element={<DanhSachCacDonVi />} />
            <Route path="co-so-vat-chat" element={<CoSoVatChat />} />
            <Route path="thong-ke-nhan-luc" element={<ThongKeNhanLuc />} />
            <Route path="doi-tac" element={<DoiTac />} />
          </Route>

          {/* Quản lý minh chứng */}
          <Route path="quan-ly-minh-chung">
            <Route
              path="minh-chung-dung-chung-don-vi"
              element={<MCDungChungDonVi />}
            />
            <Route
              path="cau-hinh-ma-minh-chung"
              element={<CauHinhDinhDangMaMC />}
            />
          </Route>
        </Route>
      </Route>
    </Route>
  </>
)
