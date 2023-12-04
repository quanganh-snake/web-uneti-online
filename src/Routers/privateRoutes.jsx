import { Route } from "react-router-dom";
import AuthMiddleware from "../Middlewares/AuthMiddleware";
import Home from "../Pages/Clients/Home/Home";
import HomeMotCua from "../Pages/Clients/MotCua";

// Pages MC - Khảo Thí
import HomeKhaoThi from "../Pages/Clients/MotCua/KhaoThi";
import MienHocThiTiengAnh from "../Pages/Clients/MotCua/KhaoThi/MienHocThiTiengAnh/MienHocThiTiengAnh.jsx";
import PhucKhao from "../Pages/Clients/MotCua/KhaoThi/PhucKhao/PhucKhao";
import LichThi from "../Pages/Clients/MotCua/KhaoThi/LichThi/LichThi";
import DangKyThiLai from "../Pages/Clients/MotCua/KhaoThi/DangKyThiLai/DangKyThiLai";
import HoanThi from "../Pages/Clients/MotCua/KhaoThi/HoanThi/HoanThi";
import HuyDangKyThiLai from "../Pages/Clients/MotCua/KhaoThi/HuyDangKyThilai/HuyDangKyThiLai";
import KetQuaHocTap from "../Pages/Clients/MotCua/KhaoThi/KetQuaHocTap/KetQuaHocTap";

// Pages MC - Đào Tạo
import HomeDaoTao from "../Pages/Clients/MotCua/DaoTao";
import CapBangDiem from "../Pages/Clients/MotCua/DaoTao/CapBangDiem/CapBangDiem";
import XacNhanDT from "../Pages/Clients/MotCua/DaoTao/XacNhanDT/XacNhanDT";
import DangKyTotNghiep from "../Pages/Clients/MotCua/DaoTao/DangKyTotNghiep/DangKyTotNghiep";
import CapBanSao from "../Pages/Clients/MotCua/DaoTao/CapBanSao/CapBanSao";
import SuaThongTin from "../Pages/Clients/MotCua/DaoTao/SuaThongTin/SuaThongTin";
import MienChungChi from "../Pages/Clients/MotCua/DaoTao/MienChungChi/MienChungChi";
import ChuyenDiem from "../Pages/Clients/MotCua/DaoTao/ChuyenDiem/ChuyenDiem";
import EmailLMS from "../Pages/Clients/MotCua/DaoTao/EmailLMS/EmailLMS";
import DangKyLopChatLuong from "../Pages/Clients/MotCua/DaoTao/DangKyLopChatLuong/DangKyLopChatLuong";

// Pages MC - CT&CTSV
import HomeCTSV from "../Pages/Clients/MotCua/CTSV";
import CapLai from "../Pages/Clients/MotCua/CTSV/CapLai/CapLai";
import XacNhanCTSV from "../Pages/Clients/MotCua/CTSV/XacNhanCTSV/XacNhanCTSV";
import QuaTrinhHoc from "../Pages/Clients/MotCua/CTSV/QuaTrinhHoc/QuaTrinhHoc";
import NghiHocTamThoi from "../Pages/Clients/MotCua/CTSV/NghiHocTamThoi/NghiHocTamThoi";
import XinChuyen from "../Pages/Clients/MotCua/CTSV/XinChuyen/XinChuyen";

// Pages MC - Hành Chính
import HomeHanhChinh from "../Pages/Clients/MotCua/HanhChinh";
import GiayGioiThieu from "../Pages/Clients/MotCua/HanhChinh/GiayGioiThieu/GiayGioiThieu";

// Pages Thiết Bị Giảng Đường
import HomeTBGD from "../Pages/Clients/ThietBiGiangDuong/index";

// Pages Tài Sản
import HomeTaiSan from "../Pages/Clients/TaiSan/index";
import RoleMiddleware from "../Middlewares/RoleMiddleware.jsx";
import HomeTTHCGV from "../Pages/Clients/ThuTucHanhChinhGiangVien/HomeTTHCGV.jsx";
import ChiTietThuTuc from "../Pages/Clients/ThuTucHanhChinhGiangVien/ChiTietThuTuc/ChiTietThuTuc.jsx";
import SoanHoSo from "./../Pages/Clients/ThuTucHanhChinhGiangVien/SoanHoSo/SoanHoSo";
import HomeAdmin from "../Pages/Admins/Home/HomeAdmin.jsx";
import AdminTTHCGV from "../Pages/Admins/TTHCGV/AdminTTHCGV.jsx";
import CanBoNghiepVu from "../Pages/Admins/TTHCGV/CanBoNghiepVu/CanBoNghiepVu.jsx";
import ChiTietHoSoYeuCau from "../Pages/Admins/TTHCGV/ChiTietHoSoYeuCau/ChiTietHoSoYeuCau.jsx";

const ROLES = ["GV", "SV"];

export const privateRoutes = (
	<>
		<Route element={<AuthMiddleware />}>
			<Route path="/uneti">
				<Route index element={<Home />} />
			</Route>
			{/* ADMIN */}
			<Route element={<RoleMiddleware allowedRoles={["GV"]} />}>
				<Route path="admin">
					<Route index element={<HomeAdmin />} />
					<Route path="canbonghiepvu">
						<Route index element={<CanBoNghiepVu />} />
						<Route path="chitietyeucau/:yeucau/:id" element={<ChiTietHoSoYeuCau />} />
					</Route>
					<Route path="quantriTTHCGV" element={<AdminTTHCGV />} />
				</Route>
			</Route>
			{/* Thủ tục hành chính giảng viên */}
			<Route element={<RoleMiddleware allowedRoles={["GV"]} />}>
				<Route path="tthcgiangvien">
					<Route index element={<HomeTTHCGV />} />
					<Route path="chitiet/:tieude/:id" element={<ChiTietThuTuc />} />
					<Route path="soanhoso/:tieude/:id/submit" element={<SoanHoSo />} />
				</Route>
			</Route>
			{/* Tài sản */}
			<Route element={<RoleMiddleware allowedRoles={ROLES} />}>
				<Route path="taisan">
					<Route index element={<HomeTaiSan />} />
				</Route>
			</Route>
			{/* Một cửa */}
			<Route element={<RoleMiddleware allowedRoles={["SV"]} />}>
				<Route path="motcua">
					<Route index element={<HomeMotCua />} />
					<Route path="khaothi">
						<Route index element={<HomeKhaoThi />} />
						<Route path="mienhocthiTA" element={<MienHocThiTiengAnh />} />
						<Route path="phuckhao" element={<PhucKhao />} />
						<Route path="lichthi" element={<LichThi />} />
						<Route path="dangkythilai" element={<DangKyThiLai />} />
						<Route path="hoanthi" element={<HoanThi />} />
						<Route path="huydangkythilai" element={<HuyDangKyThiLai />} />
						<Route path="ketquahoctap" element={<KetQuaHocTap />} />
					</Route>
					<Route path="daotao">
						<Route index element={<HomeDaoTao />} />
						<Route path="capbangdiem" element={<CapBangDiem />} />
						<Route path="xacnhan" element={<XacNhanDT />} />
						<Route path="dangkytotnghiep" element={<DangKyTotNghiep />} />
						<Route path="capbansao" element={<CapBanSao />} />
						<Route path="suathongtin" element={<SuaThongTin />} />
						<Route path="mienchungchi" element={<MienChungChi />} />
						<Route path="chuyendiem" element={<ChuyenDiem />} />
						<Route path="emaillms" element={<EmailLMS />} />
						<Route path="dangkylopchatluong" element={<DangKyLopChatLuong />} />
					</Route>
					<Route path="ct&ctsv">
						<Route index element={<HomeCTSV />} />
						<Route path="caplai" element={<CapLai />} />
						<Route path="xacnhan" element={<XacNhanCTSV />} />
						<Route path="quatrinhhoc" element={<QuaTrinhHoc />} />
						<Route path="nghihoctamthoi" element={<NghiHocTamThoi />} />
						<Route path="xinchuyen" element={<XinChuyen />} />
					</Route>
					<Route path="hanhchinh">
						<Route index element={<HomeHanhChinh />} />
						<Route path="giaygioithieu" element={<GiayGioiThieu />} />
					</Route>
				</Route>
			</Route>
			{/* Hỗ trợ TBGD */}
			<Route element={<RoleMiddleware allowedRoles={["GV"]} />}>
				<Route index path="hotrothietbigiangduong" element={<HomeTBGD />} />
			</Route>
		</Route>
	</>
);
