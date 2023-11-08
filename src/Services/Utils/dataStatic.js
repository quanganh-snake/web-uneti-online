// icons - images homeMain
import icoHTTBGD from "../../assets/Icons/icoHTTBGD.png";
import icoTTHCSV from "../../assets/Icons/icoTTHCSV.png";
import icoHTTBSP from "../../assets/Icons/icoHTTBSP.png";
import icoHTSDPM from "../../assets/Icons/icoHTSDPM.png";
import icoTCTTTS from "../../assets/Icons/icoTCTTTS.png";
import icoQLCTCV from "../../assets/Icons/icoQLCTCV.png";

// icons - thumbnails homeMotCua
import icoKhaoThi from "../../assets/Icons/icoKhaoThi.png";
import icoDaoTao from "../../assets/Icons/icoDaoTao.png";
import icoCTSV from "../../assets/Icons/icoCTSV.png";
import icoHanhChinh from "../../assets/Icons/icoHanhChinh.png";

import thumbnailKhaoThi from "../../assets/Icons/icoThumbnailKhaoThi.png";
import thumbnailDaoTao from "../../assets/Icons/icoThumbnailDaoTao.png";
import thumbnailHanhChinh from "../../assets/Icons/icoThumbnailHanhChinh.png";
import thumbnailCTSV from "../../assets/Icons/icoThumbnailCTSV.png";

// data Static homeMain
export const homeMain = [
	{
		title: "Hỗ trợ thiết bị giảng đường",
		desc: "Theo dõi và báo hỏng thiết bị trong phòng học.",
		icon: icoHTTBGD,
		path: "/hotrothietbigiangduong",
		moduleActive: true,
		roleActive: ["GV"],
	},
	{
		title: "Thủ tục hành chính sinh viên",
		desc: "Tiếp nhận giải quyết các thủ tục hành chính cho sinh viên.",
		icon: icoTTHCSV,
		path: "/motcua",
		moduleActive: true,
		roleActive: ["SV"],
	},
	{
		title: "Hỗ trợ thiết bị sảnh phòng",
		desc: "Theo dõi và báo hỏng thiết bị ở sảnh, hành lang và phòng làm việc.",
		icon: icoHTTBSP,
		path: "/hotrothietbisanhphong",
		moduleActive: true,
		roleActive: ["GV"],
	},
	{
		title: "Hỗ trợ sử dụng phần mềm",
		desc: "Tổng hợp file cài đặt, tài liệu hướng dẫn sử dụng các phần mềm.",
		icon: icoHTSDPM,
		path: "https://demosupportphanmem.uneti.edu.vn/Pages/Home.aspx",
		moduleActive: true,
		roleActive: ["GV, SV"],
	},
	{
		title: "Tra cứu thông tin tài sản",
		desc: "Quét QR để tra cứu thông tin tài sản.",
		icon: icoTCTTTS,
		path: "/tracuuttts",
		moduleActive: true,
		roleActive: ["GV, SV"],
	},
	{
		title: "Quản lý chi tiết công việc",
		desc: "Hệ thống quản lý chi tiết công việc cán bộ phòng, ban.",
		icon: icoQLCTCV,
		path: "https://uneti.edu.vn/",
		moduleActive: true,
		roleActive: ["GV"],
	},
];

export const homeMotCua = [
	{
		title: "Một cửa - Khảo thí",
		desc: "",
		path: "/khaothi",
		thumbnail: thumbnailKhaoThi,
		ico: icoKhaoThi,
		moduleActive: true,
		childrens: [
			{
				title: "Miễn học, thi Tiếng Anh",
				desc: ``,
				path: "/mienhocthiTA",
				limited: true,
				visiable: true,
				stt: 1,
			},
			{
				title: "Phúc khảo",
				desc: ``,
				path: "/phuckhao",
				limited: false,
				visiable: true,
				stt: 2,
			},
			{
				title: "Lịch thi",
				desc: ``,
				path: "/lichthi",
				limited: false,
				visiable: true,
				stt: 3,
			},
			{
				title: "Đăng ký thi lại",
				desc: ``,
				path: "/dangkythilai",
				limited: false,
				visiable: true,
				stt: 4,
			},
			{
				title: "Hoãn thi",
				desc: ``,
				path: "/hoanthi",
				limited: false,
				visiable: true,
				stt: 5,
			},
			{
				title: "Hủy đăng ký thi lại",
				desc: ``,
				path: "/huydangkythilai",
				limited: false,
				visiable: true,
				stt: 6,
			},
			{
				title: "Kết quả học tập",
				desc: ``,
				path: "/ketquahoctap",
				limited: false,
				visiable: true,
				stt: 7,
			},
			{
				title: "Miễn học, thi tin học",
				desc: ``,
				path: "/mienhocthiTH",
				limited: true,
				visiable: false,
				stt: 8,
			},
		],
	},
	{
		title: "Một cửa - Đào tạo",
		desc: "",
		path: "/daotao",
		thumbnail: thumbnailDaoTao,
		ico: icoDaoTao,
		moduleActive: true,
		childrens: [
			{
				title: "Cấp bảng điểm",
				desc: ``,
				path: "/capbangdiem",
				limited: false,
				visiable: true,
				stt: 1,
			},
			{
				title: "Xác nhận",
				desc: ``,
				path: "/xacnhan",
				limited: false,
				visiable: true,
				stt: 2,
			},
			{
				title: "Đăng ký tốt nghiệp (xét, hoãn, thi)",
				desc: ``,
				path: "/dangkytotnghiep",
				limited: false,
				visiable: true,
				stt: 3,
			},
			{
				title: "Cấp bản sao",
				desc: ``,
				path: "/capbansao",
				limited: true,
				visiable: true,
				stt: 4,
			},
			{
				title: "Sửa thông tin (Văn bằng, chứng chỉ)",
				desc: ``,
				path: "/suathongtin",
				limited: true,
				visiable: true,
				stt: 5,
			},
			{
				title: "Miễn chứng chỉ",
				desc: ``,
				path: "/mienchungchi",
				limited: true,
				visiable: true,
				stt: 6,
			},
			{
				title: "Chuyển điểm",
				desc: ``,
				path: "/chuyendiem",
				limited: false,
				visiable: true,
				stt: 7,
			},
			{
				title: "Xử lý vấn đề Email/LMS",
				desc: ``,
				path: "/emaillms",
				limited: false,
				visiable: true,
				stt: 8,
			},
			{
				title: "Đăng ký học lớp chất lượng",
				desc: ``,
				path: "/dangkylopchatluong",
				limited: false,
				visiable: true,
				stt: 9,
			},
		],
	},
	{
		title: "Một cửa - CT&CTSV",
		desc: "",
		path: "/ct&ctsv",
		thumbnail: thumbnailCTSV,
		ico: icoCTSV,
		moduleActive: true,
		childrens: [
			{
				title: "Cấp lại",
				desc: ``,
				path: "/caplai",
				limited: true,
				visiable: true,
				stt: 1,
			},
			{
				title: "Xác nhận",
				desc: ``,
				path: "/xacnhan",
				limited: false,
				visiable: true,
				stt: 2,
			},
			{
				title: "Quá trình học",
				desc: ``,
				path: "/quatrinhhoc",
				limited: true,
				visiable: true,
				stt: 3,
			},
			{
				title: "Nghỉ học tạm thời",
				desc: ``,
				path: "/nghihoctamthoi",
				limited: true,
				visiable: true,
				stt: 4,
			},
			{
				title: "Xin chuyển",
				desc: ``,
				path: "/xinchuyen",
				limited: true,
				visiable: true,
				stt: 5,
			},
		],
	},
	{
		title: "Một cửa - Hành chính",
		desc: "",
		path: "/hanhchinh",
		thumbnail: thumbnailHanhChinh,
		ico: icoHanhChinh,
		moduleActive: true,
		childrens: [
			{
				title: "Giấy giới thiệu",
				desc: ``,
				path: "/giaygioithieu",
				limited: true,
				visiable: true,
				stt: 1,
			},
		],
	},
];

export const homeTTBGD = [{}];
