import { Route } from "react-router-dom";
import AuthMiddleware from "../Middlewares/AuthMiddleware";
import Home from "../Pages/Home/Home";
import HomeMotCua from "../Pages/MotCua";

// Pages MC - Khảo Thí
import HomeKhaoThi from "../Pages/MotCua/KhaoThi";
import MienHocThiTiengAnh from "../Pages/MotCua/KhaoThi/MienHocThiTiengAnh/MienHocThiTiengAnh";
import PhucKhao from "../Pages/MotCua/KhaoThi/PhucKhao/PhucKhao";
import LichThi from "../Pages/MotCua/KhaoThi/LichThi/LichThi";
import DangKyThiLai from "../Pages/MotCua/KhaoThi/DangKyThiLai/DangKyThiLai";
import HoanThi from "../Pages/MotCua/KhaoThi/HoanThi/HoanThi";
import HuyDangKyThiLai from "../Pages/MotCua/KhaoThi/HuyDangKyThilai/HuyDangKyThiLai";
import KetQuaHocTap from "../Pages/MotCua/KhaoThi/KetQuaHocTap/KetQuaHocTap";

// Pages MC - Đào Tạo
import HomeDaoTao from "../Pages/MotCua/DaoTao";
import CapBangDiem from "../Pages/MotCua/DaoTao/CapBangDiem/CapBangDiem";
import XacNhanDT from "../Pages/MotCua/DaoTao/XacNhanDT/XacNhanDT";
import DangKyTotNghiep from "../Pages/MotCua/DaoTao/DangKyTotNghiep/DangKyTotNghiep";
import CapBanSao from "../Pages/MotCua/DaoTao/CapBanSao/CapBanSao";
import SuaThongTin from "../Pages/MotCua/DaoTao/SuaThongTin/SuaThongTin";
import MienChungChi from "../Pages/MotCua/DaoTao/MienChungChi/MienChungChi";
import ChuyenDiem from "../Pages/MotCua/DaoTao/ChuyenDiem/ChuyenDiem";
import EmailLMS from "../Pages/MotCua/DaoTao/EmailLMS/EmailLMS";
import DangKyLopChatLuong from "../Pages/MotCua/DaoTao/DangKyLopChatLuong/DangKyLopChatLuong";

// Pages MC - CT&CTSV
import HomeCTSV from "../Pages/MotCua/CTSV";
import CapLai from "../Pages/MotCua/CTSV/CapLai/CapLai";
import XacNhanCTSV from "../Pages/MotCua/CTSV/XacNhanCTSV/XacNhanCTSV";
import QuaTrinhHoc from "../Pages/MotCua/CTSV/QuaTrinhHoc/QuaTrinhHoc";
import NghiHocTamThoi from "../Pages/MotCua/CTSV/NghiHocTamThoi/NghiHocTamThoi";
import XinChuyen from "../Pages/MotCua/CTSV/XinChuyen/XinChuyen";

// Pages MC - Hành Chính
import HomeHanhChinh from "../Pages/MotCua/HanhChinh";
import GiayGioiThieu from "../Pages/MotCua/HanhChinh/GiayGioiThieu/GiayGioiThieu";

// Pages Thiết Bị Giảng Đường
import HomeTBGD from "../Pages/ThietBiGiangDuong/index";

// Pages Tài Sản
import HomeTaiSan from "../Pages/TaiSan/index";

export const privateRoutes = (
	<>
		<Route element={<AuthMiddleware />}>
			<Route path="/" element={<Home />} />
		</Route>
		<Route path="/motcua" element={<AuthMiddleware />}>
			<Route path="" element={<HomeMotCua />} />
			<Route path="khaothi" element={<HomeKhaoThi />}>
				<Route path="mienhocthiTA" element={<MienHocThiTiengAnh />} />
				<Route path="phuckhao" element={<PhucKhao />} />
				<Route path="lichthi" element={<LichThi />} />
				<Route path="dangkythilai" element={<DangKyThiLai />} />
				<Route path="hoanthi" element={<HoanThi />} />
				<Route path="huydangkythilai" element={<HuyDangKyThiLai />} />
				<Route path="ketquahoctap" element={<KetQuaHocTap />} />
			</Route>
			<Route path="daotao" element={<HomeDaoTao />}>
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
			<Route path="ct&ctsv" element={<HomeCTSV />}>
				<Route path="caplai" element={<CapLai />} />
				<Route path="xacnhan" element={<XacNhanCTSV />} />
				<Route path="quatrinhhoc" element={<QuaTrinhHoc />} />
				<Route path="nghihoctamthoi" element={<NghiHocTamThoi />} />
				<Route path="xinchuyen" element={<XinChuyen />} />
			</Route>
			<Route path="hanhchinh" element={<HomeHanhChinh />}>
				<Route path="giaygioithieu" element={<GiayGioiThieu />} />
			</Route>
		</Route>
		<Route path="/hotrothietbigiangduong" element={<AuthMiddleware />}>
			<Route path="" element={<HomeTBGD />} />
		</Route>
		<Route path="/taisan" element={<AuthMiddleware />}>
			<Route path="" element={<HomeTaiSan />} />
		</Route>
	</>
);
