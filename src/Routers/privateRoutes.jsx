import { Route } from 'react-router-dom'
import AuthMiddleware from '@/Middlewares/AuthMiddleware'
import Home from '@/Pages/Clients/Home/Home'
import HomeMotCua from '@/Pages/Clients/MotCua'
// Middlewares
import RoleMiddleware from '@/Middlewares/RoleMiddleware.jsx'
import RoleViewActionMiddleware from '@/Middlewares/RoleViewActionMiddleware'

// Pages MC - Khảo Thí
import HomeKhaoThi from '@/Pages/Clients/MotCua/KhaoThi'
import MienHocThiTiengAnh from '@/Pages/Clients/MotCua/KhaoThi/MienHocThiTiengAnh/MienHocThiTiengAnh.jsx'
import PhucKhao from '@/Pages/Clients/MotCua/KhaoThi/PhucKhao/PhucKhao'
import LichThi from '@/Pages/Clients/MotCua/KhaoThi/LichThi/LichThi'
import DangKyThiLai from '@/Pages/Clients/MotCua/KhaoThi/DangKyThiLai/DangKyThiLai'
import HoanThi from '@/Pages/Clients/MotCua/KhaoThi/HoanThi/HoanThi'
import HuyDangKyThiLai from '@/Pages/Clients/MotCua/KhaoThi/HuyDangKyThilai/HuyDangKyThiLai'
import KetQuaHocTap from '@/Pages/Clients/MotCua/KhaoThi/KetQuaHocTap/KetQuaHocTap'

// Pages MC - Đào Tạo
import HomeDaoTao from '@/Pages/Clients/MotCua/DaoTao'
import CapBangDiem from '@/Pages/Clients/MotCua/DaoTao/CapBangDiem/CapBangDiem'
import XacNhanDT from '@/Pages/Clients/MotCua/DaoTao/XacNhanDT/XacNhanDT'
import DangKyTotNghiep from '@/Pages/Clients/MotCua/DaoTao/DangKyTotNghiep/DangKyTotNghiep'
import CapBanSao from '@/Pages/Clients/MotCua/DaoTao/CapBanSao/CapBanSao'
import SuaThongTin from '@/Pages/Clients/MotCua/DaoTao/SuaThongTin/SuaThongTin'
import MienChungChi from '@/Pages/Clients/MotCua/DaoTao/MienChungChi/MienChungChi'
import ChuyenDiem from '@/Pages/Clients/MotCua/DaoTao/ChuyenDiem/ChuyenDiem'
import EmailLMS from '@/Pages/Clients/MotCua/DaoTao/EmailLMS/EmailLMS'
import DangKyLopChatLuong from '@/Pages/Clients/MotCua/DaoTao/DangKyLopChatLuong/DangKyLopChatLuong'

// Pages MC - CT&CTSV
import HomeCTSV from '@/Pages/Clients/MotCua/CTSV'
import CapLai from '@/Pages/Clients/MotCua/CTSV/CapLai/CapLai'
import XacNhanCTSV from '@/Pages/Clients/MotCua/CTSV/XacNhanCTSV/XacNhanCTSV'
import QuaTrinhHoc from '@/Pages/Clients/MotCua/CTSV/QuaTrinhHoc/QuaTrinhHoc'
import NghiHocTamThoi from '@/Pages/Clients/MotCua/CTSV/NghiHocTamThoi/NghiHocTamThoi'
import XinChuyen from '@/Pages/Clients/MotCua/CTSV/XinChuyen/XinChuyen'

// Pages MC - Hành Chính
import HomeHanhChinh from '@/Pages/Clients/MotCua/HanhChinh'
import GiayGioiThieu from '@/Pages/Clients/MotCua/HanhChinh/GiayGioiThieu/GiayGioiThieu'

// Pages MC - Hướng dẫn
import HomeHuongDan from '@/Pages/Clients/MotCua/HuongDan'

// Pages Thiết Bị Giảng Đường
import HomeTBGD from '@/Pages/Clients/ThietBiGiangDuong'
import BaoHong from '@/Pages/Clients/ThietBiGiangDuong/BaoHong/BaoHong'
import XuLySuCo from '@/Pages/Clients/ThietBiGiangDuong/XuLySuCo/XuLySuCo'
import DangKySuDungThietBi from '@/Pages/Clients/ThietBiGiangDuong/DangKySuDungThietBi/DangKySuDungThietBi'
import GopY from '@/Pages/Clients/ThietBiGiangDuong/GopY/GopY'

// Pages Tài Sản
import HomeTaiSan from '@/Pages/Clients/TaiSan/'
import BaoHongTaiSan from '@/Pages/Clients/TaiSan/BaoHongTaiSan/BaoHongTaiSan'
import SuaChuaTaiSan from '@/Pages/Clients/TaiSan/SuaChuaTaiSan/SuaChuaTaiSan'
import TraCuuTaiSan from '@/Pages/Clients/TaiSan/TraCuuTaiSan/TraCuuTaiSan'
import CapNhatTaiSan from '@/Pages/Clients/TaiSan/CapNhatThongTinTaiSan/CapNhatTaiSan'

// Page Thủ tục hành chính Giảng viên
import HomeTTHCGV from '@/Pages/Clients/ThuTucHanhChinhGiangVien/HomeTTHCGV.jsx'
import ChiTietThuTuc from '@/Pages/Clients/ThuTucHanhChinhGiangVien/ChiTietThuTuc/ChiTietThuTuc.jsx'
import SoanHoSo from '@/Pages/Clients/ThuTucHanhChinhGiangVien/SoanHoSo/SoanHoSo'
import HomeAdmin from '@/Pages/Admins/Home/HomeAdmin.jsx'
import AdminTTHCGV from '@/Pages/Admins/TTHCGV/AdminTTHCGV.jsx'
import CanBoNghiepVu from '@/Pages/Admins/TTHCGV/CanBoNghiepVu/CanBoNghiepVu.jsx'
import ChiTietHoSoYeuCau from '@/Pages/Admins/TTHCGV/ChiTietHoSoYeuCau/ChiTietHoSoYeuCau.jsx'
import ThongTinChiTietHoSo from '@/Pages/Admins/TTHCGV/DanhSachHoSo/ThongTinChiTietHoSo/ThongTinChiTietHoSo.jsx'
import DanhSachHoSo from '@/Pages/Admins/TTHCGV/DanhSachHoSo/DanhSachHoSo.jsx'
import TheoDoiDeNghiTTHCGV from '@/Pages/Clients/ThuTucHanhChinhGiangVien/TheoDoiDeNghiTTHCGV/TheoDoiDeNghiTTHCGV.jsx'
import TheoDoiDeNghiTTHCGVChiTiet from '@/Pages/Clients/ThuTucHanhChinhGiangVien/TheoDoiDeNghiTTHCGV/TheoDoiDeNghiTTHCGVChiTiet.jsx'

// Page Hỗ trợ sử dụng phần mềm
import HoTroSuDungPhanMem from '@/Pages/Clients/HoTroSuDungPhanMem/HoTroSuDungPhanMem.jsx'

// page theo dõi đề nghị SV
import TheoDoiDeNghi from '@/Pages/Clients/TheoDoiDeNghi/TheoDoiDeNghi.jsx'
import TheoDoiDeNghiChiTiet from '@/Pages/Clients/TheoDoiDeNghi/TheoDoiDeNghiChiTiet/TheoDoiDeNghiChiTiet.jsx'

// Page học tập
import HomeHocTap from '@/Pages/Clients/HocTap/HocTap.jsx'
import HocTapKetQuaHocTap from '@/Pages/Clients/HocTap/KetQuaHocTap/KetQuaHocTap.jsx'
import HocTapOnLuyen from '@/Pages/Clients/HocTap/OnLuyen/OnLuyen.jsx'
import HocTapOnTap from '@/Pages/Clients/HocTap/OnLuyen/OnTap/OnTap.jsx'
import HocTapThiThu from '@/Pages/Clients/HocTap/OnLuyen/ThiThu/ThiThu.jsx'
import KetQuaHocTapChiTiet from '@/Pages/Clients/HocTap/KetQuaHocTap/KetQuaHocTapChiTiet/KetQuaHocTapChiTiet'
import DeThi from '@/Pages/Clients/HocTap/OnLuyen/ThiThu/DanhSachDeThi/DeThi/DeThi'
import ThiThuDanhSachDeThi from '@/Pages/Clients/HocTap/OnLuyen/ThiThu/DanhSachDeThi/DanhSachDeThi'
import OnTapDanhSachCauHoi from '@/Pages/Clients/HocTap/OnLuyen/OnTap/DanhSachCauHoi/DanhSachCauHoi'
import HomeTraCuu from '@/Pages/Clients/TraCuu'
import ThoiKhoaBieu from '@/Pages/Clients/TraCuu/ThoiKhoaBieu/ThoiKhoaBieu'
import DiemDanh from '@/Pages/Clients/TraCuu/DiemDanh/DiemDanh'
import RenLuyen from '@/Pages/Clients/TraCuu/RenLuyen/RenLuyen'
import DanhSachPhan from '@/Pages/Clients/HocTap/OnLuyen/OnTap/DanhSachPhan/DanhSachPhan'
import DanhSachChuong from '@/Pages/Clients/HocTap/OnLuyen/OnTap/DanhSachChuong/DanhSachChuong'

export const ROLES = {
  G0101: 'GV',
  S0202: 'SV',
}

export const ROLE_VIEW_ACTION_HTTB = {
  QT_XLSC: '14',
}

export const ROLE_VIEW_ACTION_TTHCGV = {
  QT_TTHCGV: '15',
  CBNV_TTHCGV: '16',
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
            path="can-bo-nghiep-vu"
            element={
              <RoleViewActionMiddleware
                allowedRoleViewAction={[ROLE_VIEW_ACTION_TTHCGV.CBNV_TTHCGV]}
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
    </Route>
  </>
)
