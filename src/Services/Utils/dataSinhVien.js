import moment from "moment";
import { useSelector } from "react-redux";

export const DataSinhVien = () => {
	const student = useSelector((state) => state.user?.currentUser);
	const dataToken = useSelector((state) => state.auth?.login?.currentToken);

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
	} = student ?? "";
	let formatDate = NgayCapCMND ? NgayCapCMND?.slice(8, 10) + "/" + NgayCapCMND?.slice(5, 7) + "/" + NgayCapCMND?.slice(0, 4) : "";
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
		NgayCapCMND: formatDate,
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
	};
};
