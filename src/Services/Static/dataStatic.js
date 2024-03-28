// icons - images homeMain
import icoHTTBGD from '@/assets/Icons/icoHTTBGD.png'
import icoTTHCSV from '@/assets/Icons/icoTTHCSV.png'
import icoHTTBSP from '@/assets/Icons/icoHTTBSP.png'
import icoHTSDPM from '@/assets/Icons/icoHTSDPM.png'
import icoTCTTTS from '@/assets/Icons/icoTCTTTS.png'
import icoQLCTCV from '@/assets/Icons/icoQLCTCV.png'
import icoHocTap from '@/assets/Icons/icoHocTap.png'
import iconDiemDanh from '@/assets/Icons/iconDiemDanh.png'
import iconLich from '@/assets/Icons/iconLich.png'

// icons - thumbnails homeMotCua
import icoKhaoThi from '@/assets/Icons/icoKhaoThi.png'
import icoDaoTao from '@/assets/Icons/icoDaoTao.png'
import icoCTSV from '@/assets/Icons/icoCTSV.png'
import icoHanhChinh from '@/assets/Icons/icoHanhChinh.png'

import thumbnailKhaoThi from '@/assets/Icons/icoThumbnailKhaoThi.png'
import thumbnailDaoTao from '@/assets/Icons/icoThumbnailDaoTao.png'
import thumbnailHanhChinh from '@/assets/Icons/icoThumbnailHanhChinh.png'
import thumbnailCTSV from '@/assets/Icons/icoThumbnailCTSV.png'

// icons - thumbnails HTTBGD
import iconHTTBGDBaoHong from '@/assets/Icons/icoHTTBGDBaoHong.png'
import iconHTTBGDXuLySuCo from '@/assets/Icons/icoHTTBGDXuLySuCo.png'
import iconHTTBGDDangKySuDungThietBi from '@/assets/Icons/icoHTTBGDDangKySuDungThietBi.png'
import iconHTTBGDGopY from '@/assets/Icons/icoHTTBGDGopY.png'

// icons - homeTaiSan
import icoTeamView from '@/assets/Icons/icoTeamviewer.png'
import icoUltraView from '@/assets/Icons/icoUltraview.png'
import icoZalo from '@/assets/Icons/icoZalo.png'
import icoTraCuuTS from '@/assets/Icons/icoTraCuuTS.png'

// icons - thumbnails Module Học Tập
import icoKetQuaHocTapOnLuyen from '@/assets/Icons/icoKetQuaHocTapOnLuyen.png'
import icoOnLuyenTracNghiem from '@/assets/Icons/icoOnLuyenTracNghiem.png'
import { ROLES } from '@/Routers/privateRoutes'

// data Static NguonTiepNhan
export const NguonTiepNhan_WEB = 1

// data Static WEB Version
export const WEB_VERSION = '2.0.0.2'

// data Static homeMain
export const homeMain = [
  {
    title: 'Hỗ trợ thiết bị giảng đường',
    desc: 'Theo dõi và báo hỏng thiết bị trong phòng học.',
    icon: icoHTTBGD,
    path: '/ho-tro-thiet-bi-giang-duong',
    moduleActive: true,
    roleActive: [ROLES.G0101],
  },
  {
    title: 'Thủ tục hành chính',
    desc: 'Tiếp nhận giải quyết các thủ tục hành chính cho sinh viên.',
    icon: icoTTHCSV,
    path: '/mot-cua',
    moduleActive: true,
    roleActive: [ROLES.S0202],
  },
  {
    title: 'Học tập',
    desc: 'Tra cứu kết quả học tập; Chương trình đào tạo; Ôn luyện; Dự kiến kết quả học tập.',
    icon: icoHocTap,
    path: '/hoc-tap',
    moduleActive: true,
    roleActive: [ROLES.S0202],
  },
  {
    title: 'Tra cứu',
    desc: 'Tra cứu thông tin: Lịch học - Lịch thi; Điểm danh; Rèn luyện; Lịch thi; Công nợ.',
    icon: icoTCTTTS,
    path: '/tra-cuu',
    moduleActive: true,
    roleActive: [ROLES.S0202],
  },
  {
    title: 'Hỗ trợ thiết bị',
    desc: 'Theo dõi và báo hỏng thiết bị ở sảnh, hành lang và phòng làm việc.',
    icon: icoTCTTTS,
    path: '/ho-tro-thiet-bi',
    moduleActive: true,
    roleActive: [ROLES.G0101],
  },
  {
    title: 'Hỗ trợ sử dụng phần mềm',
    desc: 'Tổng hợp file cài đặt, tài liệu hướng dẫn sử dụng các phần mềm.',
    icon: icoHTSDPM,
    path: '/ho-tro-su-dung-phan-mem',
    moduleActive: false,
    roleActive: [ROLES.G0101, ROLES.S0202],
  },
  {
    title: 'Quản lý chi tiết công việc',
    desc: 'Hệ thống quản lý chi tiết công việc cán bộ phòng, ban.',
    icon: icoQLCTCV,
    path: '/uneti',
    moduleActive: false,
    roleActive: [ROLES.G0101],
  },
  {
    title: 'Thủ tục hành chính',
    desc: 'Tiếp nhận giải quyết các thủ tục hành chính cho giảng viên.',
    icon: icoTTHCSV,
    path: '/tthc-giang-vien',
    moduleActive: true,
    roleActive: [ROLES.G0101],
  },
  {
    title: 'Kiểm định chất lượng',
    desc: 'Kiểm định chất lượng, Khảo sát và đánh giá chất lượng, Cơ sở dữ liệu đơn vị, Quản lý minh chứng, Tiện ích, Quản trị hệ thống.',
    icon: icoTTHCSV,
    path: '/kiem-dinh-chat-luong',
    moduleActive: true,
    roleActive: [ROLES.G0101],
  },
]

export const homeMotCua = [
  {
    title: 'Một cửa - Khảo thí',
    name: 'Khảo thí',
    desc: '',
    path: '/khao-thi',
    thumbnail: thumbnailKhaoThi,
    ico: icoKhaoThi,
    moduleActive: true,
    childrens: [
      {
        title: 'Miễn học, thi Tiếng Anh',
        desc: `<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">A. Mô tả:</span></span></strong></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Nếu người học cần đề nghị giải quyết các vấn đề sau:</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">1. Xin miễn học, miễn thi học phần đã đăng ký trong cùng học kỳ </span><em><span style=\"background-color:white\"><span style=\"color:red\">(chức năng này bị giới hạn không cho phép đề nghị trực tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)</span></span></em></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">B. Hướng dẫn thao tác:</span></span></strong></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 1: Click vào nút \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\"</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 2: Người học in đơn và điền các thông tin vào mẫu đơn</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 3: Người học mang đơn và bản chứng chỉ photo công chứng nộp tại Bộ phận hành chính Một cửa. </span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:14pt\"><strong><span style=\"color:red\">C. Ghi chú:</span></strong><strong> </strong></span></p>\n\n<p style=\"text-align:justify\"><span style=\"color:#000000\"><span style=\"font-size:16px\"><span style=\"font-family:Arial,Helvetica,sans-serif\">- Phần này chỉ tiếp nhận trước 2 tuần và sau 1 tuần kể từ thời điểm bắt đầu học kỳ.</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:14pt\"><span style=\"color:#000000\"><span style=\"font-size:12.0pt\">- Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ được mở lại trong một số trường hợp mà người học không thể đến trực tiếp như: Dịch bệnh, thiên tai …</span></span></span></p>\n\n<p><a style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-khao-thi-va-dam-bao-chat-luong/'> - Xem chi tiết quy trình thực hiện tại đây.</a></p>\n`,
        path: '/mien-hoc-thi-tieng-anh',
        limited: true,
        visiable: true,
        stt: 1,
      },
      {
        title: 'Phúc khảo',
        desc: `<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">A. Mô tả:</span></span></strong></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Nếu người học cần đề nghị giải quyết các vấn đề sau:</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">1. Phúc khảo bài thi lần 1 </span><span style=\"color:#3498db\"><em><span style=\"background-color:white\">(cho phép đề nghị trực tuyến)</span></em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">2. Phúc khảo bài thi lại </span><span style=\"color:#3498db\"><em><span style=\"background-color:white\">(cho phép đề nghị trực tuyến)</span></em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">B. Hướng dẫn thao tác:</span></span></strong></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 1: Click vào nút \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\"</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 2: Chọn hoặc điền dữ liệu và các ô cần nhập dữ liệu</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 3: Tại lưới dữ liệu => Click \"</span><strong><span style=\"color:red\">Chọn</span></strong><span style=\"color:black\">\" dòng dữ liệu tương ứng với học phần và click \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\".</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:14pt\"><strong><span style=\"color:red\">C. Ghi chú:</span></strong><strong> </strong></span></p>\n\n<p style=\"text-align:justify\"><span style=\"color:#000000\"><span style=\"font-size:14pt\"><span style=\"font-size:12.0pt\">- <span style=\"background-color:white\">Người học thực hiện phúc khảo theo kế hoạch tổ chức thi (Ngày nộp đơn phúc khảo) trong từng học kỳ.</span></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"color:#000000\"><span style=\"font-size:14pt\"><span style=\"font-size:12.0pt\"><span style=\"background-color:white\">- Lệ phí phúc khảo kết quả học tập: Có mức thu theo quy định, được chuyển trực tiếp vào công nợ, người học nộp cùng học phí kỳ kế tiếp.</span></span></span></span></p>\n\n<p><a style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-khao-thi-va-dam-bao-chat-luong/'> - Xem chi tiết quy trình thực hiện tại đây.</a></p>\n`,
        path: '/phuc-khao',
        limited: false,
        visiable: true,
        stt: 2,
      },
      {
        title: 'Lịch thi',
        desc: `<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">A. Mô tả:</span></span></strong></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Nếu người học cần đề nghị giải quyết các vấn đề sau:</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">1. Xem lịch thi </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">2. Trùng lịch thi </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">3. Không có lịch thi </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">B. Hướng dẫn thao tác:</span></span></strong></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 1: Click vào nút \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\"</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 2: Chọn hoặc điền dữ liệu và các ô cần nhập dữ liệu</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 3: Tại lưới dữ liệu => Click \"</span><strong><span style=\"color:red\">Chọn</span></strong><span style=\"color:black\">\" dòng dữ liệu tương ứng với học phần và click \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\".</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:14pt\"><strong><span style=\"color:red\">C. Ghi chú:</span></strong><strong> </strong><span style=\"color:#000000\"><span style=\"font-size:12.0pt\">Loading…</span></span></span></p>\n\n<p><a style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-khao-thi-va-dam-bao-chat-luong/'> - Xem chi tiết quy trình thực hiện tại đây.</a></p>\n`,
        path: '/lich-thi',
        limited: false,
        visiable: true,
        stt: 3,
      },
      {
        title: 'Đăng ký thi lại',
        desc: `<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">A. Mô tả:</span></span></strong></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Nếu người học cần đề nghị giải quyết các vấn đề sau:</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">1. Trùng lịch thi </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">2. Lỗi website Sinhvien.uneti.edu.vn </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">3. Khác hệ, loại hình đào tạo </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">4. Thi không theo kế hoạch </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">5. Lý do khác </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">B. Hướng dẫn thao tác:</span></span></strong></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 1: Click vào nút \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\"</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 2: Chọn hoặc điền dữ liệu và các ô cần nhập dữ liệu</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 3: Tại lưới dữ liệu => Click \"</span><strong><span style=\"color:red\">Chọn</span></strong><span style=\"color:black\">\" dòng dữ liệu tương ứng với học phần và click \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\".</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">C. Ghi chú: </span></span></strong><strong><span style=\"background-color:white\"><span style=\"color:red\"> </span></span></strong></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:16px\"><span style=\"background-color:white\"><span style=\"color:#000000\"><span style=\"background-color:white\">- Lệ phí thi lại sẽ nộp cùng học phí kỳ tiếp</span> theo.</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:#000000\">- Người học chỉ nên đăng ký thi lại tại đây, nếu gặp phải một số trường hợp như mục A.</span></span></span></p>\n\n<p><a style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-khao-thi-va-dam-bao-chat-luong/'> - Xem chi tiết quy trình thực hiện tại đây.</a></p>\n`,
        path: '/dang-ky-thi-lai',
        limited: false,
        visiable: true,
        stt: 4,
      },
      {
        title: 'Hoãn thi',
        desc: `<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">A. Mô tả:</span></span></strong></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Nếu người học cần đề nghị giải quyết các vấn đề sau:</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">1. Đi viện hoặc theo yêu cầu bác sĩ </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">2. Thực hiện nhiệm vụ nhà trường giao </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">3. Lý do khác </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">B. Hướng dẫn thao tác:</span></span></strong></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 1: Click vào nút \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\"</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 2: Chọn hoặc điền dữ liệu và các ô cần nhập dữ liệu</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 3: Tại lưới dữ liệu => Click \"</span><strong><span style=\"color:red\">Chọn</span></strong><span style=\"color:black\">\" dòng dữ liệu tương ứng với học phần, up ảnh và click \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\".</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:14pt\"><strong><span style=\"color:red\">C. Ghi chú:</span></strong><strong> </strong><p style=\"color:#000000\"><span style=\"font-size:12.0pt\">- Ng<span style=\"font-size:16px\"><span style=\"font-family:Arial,Helvetica,sans-serif\">ười học làm đơn theo mẫu và giấy tờ minh chứn</span></span>g kèm theo.</span></p></span></p>\n\n<p><a style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-khao-thi-va-dam-bao-chat-luong/'> - Xem chi tiết quy trình thực hiện tại đây.</a></p>\n`,
        path: '/hoan-thi',
        limited: false,
        visiable: true,
        stt: 5,
      },
      {
        title: 'Hủy đăng ký thi lại',
        desc: `<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">A. Mô tả:</span></span></strong></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Nếu người học cần đề nghị giải quyết các vấn đề sau:</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">1. Đạt điểm học phần sau khi phúc khảo </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">2. Điều chỉnh điểm thường kỳ (quá trình) </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">3. Hủy đăng ký thi lại để học lại </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">4. Lý do khác </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">B. Hướng dẫn thao tác:</span></span></strong></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 1: Click vào nút \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\"</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 2: Chọn hoặc điền dữ liệu và các ô cần nhập dữ liệu</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 3: Tại lưới dữ liệu => Click \"</span><strong><span style=\"color:red\">Chọn</span></strong><span style=\"color:black\">\" dòng dữ liệu tương ứng với học phần và click \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\".</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:14pt\"><strong><span style=\"color:red\">C. Ghi chú:</span></strong><strong> </strong></span><span style=\"color:#000000\"><p style=\"font-size:14pt\"><span style=\"font-size:12.0pt\">- Thời điểm người học xin hủy đăng ký thi lại trước ngày thi 5 ngày và người học<span style=\"background-color:white\"> chưa nộp lệ phí thi lại.</span></span></p></span></p>\n\n<p><a style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-khao-thi-va-dam-bao-chat-luong/'> - Xem chi tiết quy trình thực hiện tại đây.</a></p>\n`,
        path: '/huy-dang-ky-thi-lai',
        limited: false,
        visiable: true,
        stt: 6,
      },
      {
        title: 'Kết quả học tập',
        desc: `<div style=\"text-align:left\">\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">A. Mô tả:</span></span></strong></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Nếu người học cần đề nghị giải quyết các vấn đề sau:</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">1. Xem kết quả học tập </span><span style=\"color:#3498db\"><em><span style=\"background-color:white\">(cho phép đề nghị trực tuyến)</span></em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">2. Điều chỉnh, bổ sung điểm thường kỳ </span><span style=\"color:#3498db\"><em><span style=\"background-color:white\">(cho phép đề nghị trực tuyến)</span></em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">3. Điều chỉnh, bổ sung điểm thi </span><span style=\"color:#3498db\"><em><span style=\"background-color:white\">(cho phép đề nghị trực tuyến)</span></em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">B. Hướng dẫn thao tác:</span></span></strong></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 1: Click vào nút \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\"</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 2: Chọn hoặc điền dữ liệu và các ô cần nhập dữ liệu</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 3: </span><span style=\"background-color:white\"><span style=\"color:black\">Tại lưới dữ liệu => Click \"</span></span><strong><span style=\"background-color:white\"><span style=\"color:red\">Chọn</span></span></strong><span style=\"background-color:white\"><span style=\"color:black\">\" dòng dữ liệu tương ứng với học phần và click \"</span></span><span style=\"color:#3498db\"><strong><span style=\"background-color:white\">Gửi yêu cầu</span></strong></span><span style=\"background-color:white\"><span style=\"color:black\">\".</span></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:14pt\"><strong><span style=\"color:red\">C. Ghi chú:</span></strong></span><p style=\"font-size:14pt\"><span style=\"font-size:12.0pt\"><span style=\"background-color:white\"><span style=\"color:#000000\">- Người học được thắc mắc điểm quá trình trong vòng 7 ngày kể từ khi điểm quá trình được công bố trên trang cá nhân và sau khi người học đã phản hồi với giảng viên giảng dạy.</span></span></span></p></p>\n\n<p><a style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-khao-thi-va-dam-bao-chat-luong/'> - Xem chi tiết quy trình thực hiện tại đây.</a></p>\n</div>\n`,
        path: '/ket-qua-hoc-tap',
        limited: false,
        visiable: true,
        stt: 7,
      },
      {
        title: 'Miễn học, thi tin học',
        desc: `<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">A. Mô tả:</span></span></strong></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Nếu người học cần đề nghị giải quyết các vấn đề sau:</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">1. Xin miễn học, miễn thi học phần đã đăng ký trong cùng học kỳ </span><em><span style=\"background-color:white\"><span style=\"color:red\">(chức năng này bị giới hạn không cho phép đề nghị trực tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)</span></span></em></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">B. Hướng dẫn thao tác:</span></span></strong></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 1: Click vào nút \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\"</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 2: Người học in đơn và điền các thông tin vào mẫu đơn</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 3: Người học mang đơn và bản chứng chỉ photo công chứng nộp tại Bộ phận hành chính Một cửa. </span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:14pt\"><strong><span style=\"color:red\">C. Ghi chú:</span></strong><strong> </strong></span></p>\n\n<p style=\"text-align:justify\"><span style=\"color:#000000\"><span style=\"font-size:16px\"><span style=\"font-family:Arial,Helvetica,sans-serif\">- Phần này chỉ tiếp nhận trước 2 tuần và sau 1 tuần kể từ thời điểm bắt đầu học kỳ.</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:14pt\"><span style=\"color:#000000\"><span style=\"font-size:12.0pt\">- Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ được mở lại trong một số trường hợp mà người học không thể đến trực tiếp như: Dịch bệnh, thiên tai …</span></span></span></p>\n\n<p> </p>\n`,
        path: '/mienhocthiTH',
        limited: true,
        visiable: false,
        stt: 8,
      },
    ],
  },
  {
    title: 'Một cửa - Đào tạo',
    name: 'Đào tạo',
    desc: '',
    path: '/dao-tao',
    thumbnail: thumbnailDaoTao,
    ico: icoDaoTao,
    moduleActive: true,
    childrens: [
      {
        title: 'Cấp bảng điểm',
        desc: `
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            A. Mô tả:
          </p>
          <p style="padding-bottom: 1rem; ">
            Nếu người học cần đề nghị giải quyết các vấn đề sau:
          </p>
          <p style="padding-bottom: 1rem; ">
            1. Cấp bảng điểm tạm thời hệ 4, hệ 10
            <span style="color: #0ea5e9; padding-left: 0.5rem; padding-right: 0.5rem; font-style: italic; ">
              (cho phép đề nghị trực tuyến)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            2. Cấp bảng điểm tốt nghiệp hệ 4, hệ 10
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.
          </p>
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            B. Hướng dẫn thao tác:
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 1: Click vào nút "
            <span style="font-weight: 700; color: #0ea5e9; ">
              Gửi yêu cầu
            </span>
            "
          </p>
          <p style="padding-bottom: 1rem; ">Bước 2:</p>
          <p style="padding-bottom: 1rem; ">
            - Đối với bảng điểm tạm thời hệ 4, hệ 10: Người học chọn và
            điền dữ liệu vào ô tương ứng và gửi yêu cầu.
          </p>
          <p style="padding-bottom: 1rem; ">
            - Đối với bảng điểm tốt nghiệp hệ 4, hệ 10: Người học in đơn
            và điền các thông tin vào mẫu đơn, photo 1 bản Bằng tốt nghiệp
            Đại học nộp tại Bộ phận hành chính Một cửa.
          </p>
          <p style="padding-bottom: 1rem; ">
            <span style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444;">
              C. Ghi chú:
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            - Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ
            được mở lại trong một số trường hợp mà người học không thể đến
            trực tiếp như: Dịch bệnh, thiên tai …
          </p>
          <p>
            <a style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-dao-tao/'>
            - Xem chi tiết quy trình thực hiện tại đây.
            </a>
          </p>
        `,
        path: '/cap-bang-diem',
        limited: false,
        visiable: true,
        stt: 1,
      },
      {
        title: 'Xác nhận',
        desc: `
        <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
          A. Mô tả:
        </p>
        <p style="padding-bottom: 1rem; ">
          Nếu người học cần đề nghị giải quyết các vấn đề sau:
        </p>
        <p style="padding-bottom: 1rem; ">
          1. Xác nhận đang chờ xét tốt nghiệp
          <span style="color: #0ea5e9; padding-left: 0.5rem; padding-right: 0.5rem; font-style: italic; ">
            (cho phép đề nghị trực tuyến)
          </span>
        </p>
        <p style="padding-bottom: 1rem; ">
          2. Xác nhận nợ môn (chưa tốt nghiệp)
          <span style="color: #0ea5e9; padding-left: 0.5rem; padding-right: 0.5rem; font-style: italic; ">
            (cho phép đề nghị trực tuyến)
          </span>
        </p>
        <p style="padding-bottom: 1rem; ">
          3. Xác nhận thời khóa biểu theo học kỳ
          <span style="color: #0ea5e9; padding-left: 0.5rem; padding-right: 0.5rem; font-style: italic; ">
            (cho phép đề nghị trực tuyến)
          </span>
        </p>
        <p style="padding-bottom: 1rem; ">
          4. Xác nhận hoàn thành khóa học
          <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
            (chức năng này bị giới hạn không cho phép đề nghị trực
            tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
          </span>
        </p>
        <p style="padding-bottom: 1rem; ">
          Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.
        </p>
        <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
          B. Hướng dẫn thao tác:
        </p>
        <p style="padding-bottom: 1rem; ">
          Bước 1: Click vào nút "
          <span style="color: #0ea5e9; font-weight: 700; ">
            Gửi yêu cầu
          </span>
          "
        </p>
        <p style="padding-bottom: 1rem; ">Bước 2:</p>
        <p style="padding-bottom: 1rem; ">
          - Đối với bảng điểm tạm thời hệ 4, hệ 10: Người học chọn và
          điền dữ liệu vào ô tương ứng và gửi yêu cầu.
        </p>
        <p style="padding-bottom: 1rem; ">
          - Đối với giấy xác nhận hoàn thành khóa học: Người học in đơn
          và điền các thông tin vào mẫu đơn, nộp tại Bộ phận hành chính
          một cửa.
        </p>
        <p style="padding-bottom: 1rem; ">
            <span style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444;">
              C. Ghi chú:
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            - Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ
            được mở lại trong một số trường hợp mà người học không thể đến
            trực tiếp như: Dịch bệnh, thiên tai …
          </p>
          <p>
            <a style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-dao-tao/'>
            - Xem chi tiết quy trình thực hiện tại đây.
            </a>
          </p>
        `,
        path: '/xac-nhan',
        limited: false,
        visiable: true,
        stt: 2,
      },
      {
        title: 'Đăng ký tốt nghiệp (xét, hoãn, thi)',
        desc: `
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            A. Mô tả:
          </p>
          <p style="padding-bottom: 1rem; ">
            Nếu người học cần đề nghị giải quyết các vấn đề sau:
          </p>
          <p style="padding-bottom: 1rem; ">
            1. Xét tốt nghiệp
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            2. Thi tốt nghiệp (chưa tốt nghiệp)
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            3. Hoãn tốt nghiệp
            <span style="color: #0ea5e9; padding-left: 0.5rem; padding-right: 0.5rem; font-style: italic; ">
              (cho phép đề nghị trực tuyến)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.
          </p>
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            B. Hướng dẫn thao tác:
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 1: Click vào nút "
            <span style="color: #0ea5e9; font-weight: 700; ">
              Gửi yêu cầu
            </span>
            "
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 2: Người học in đơn và điền các thông tin vào mẫu đơn
          </p>
          <p style="padding-bottom: 1rem; ">Bước 3:</p>
          <p style="padding-bottom: 1rem; ">
            - Đối với xin xét tốt nghiệp: Người học mang đơn kèm giấy xác
            nhận nhân sự và bản giấy khai sinh công chứng nộp tại Bộ phận
            hành chính Một cửa.
          </p>
          <p style="padding-bottom: 1rem; ">
            - Đối với xin hoãn xét tốt nghiệp: Người học xin xác nhận của
            CVHT nộp tại Bộ phận hành chính Một cửa theo thời gian quy
            định.
          </p>
          <p style="padding-bottom: 1rem; ">
            <span style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444;">
              C. Ghi chú:
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            - Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ
            được mở lại trong một số trường hợp mà người học không thể đến
            trực tiếp như: Dịch bệnh, thiên tai …
          </p>
          <p>
            <a style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-dao-tao/'>
            - Xem chi tiết quy trình thực hiện tại đây.
            </a>
          </p>
        `,
        path: '/dang-ky-tot-nghiep',
        limited: false,
        visiable: true,
        stt: 3,
      },
      {
        title: 'Cấp bản sao',
        desc: `
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            A. Mô tả:
          </p>
          <p style="padding-bottom: 1rem; ">
            Nếu người học cần đề nghị giải quyết các vấn đề sau:
          </p>
          <p style="padding-bottom: 1rem; ">
          1. Cấp bảng sao từ sổ gốc cấp bằng tốt nghiệp
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.
          </p>
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            B. Hướng dẫn thao tác:
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 1: Click vào nút "
            <span style="color: #0ea5e9; font-weight: 700; ">
              Gửi yêu cầu
            </span>
            "
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 2: Người học in đơn và điền các thông tin vào mẫu đơn
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 3: Người học mang đơn và bản giấy khai sinh công chứng nộp tại Bộ phận hành chính Một cửa.
          </p>
          <p style="padding-bottom: 1rem; ">
            <span style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444;">
              C. Ghi chú:
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            - Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ
            được mở lại trong một số trường hợp mà người học không thể đến
            trực tiếp như: Dịch bệnh, thiên tai …
          </p>
          <p>
            <a style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-dao-tao/'>
            - Xem chi tiết quy trình thực hiện tại đây.
            </a>
          </p>
        `,
        path: '/cap-ban-sao',
        limited: true,
        visiable: true,
        stt: 4,
      },
      {
        title: 'Sửa thông tin (Văn bằng, chứng chỉ)',
        desc: `
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            A. Mô tả:
          </p>
          <p style="padding-bottom: 1rem; ">
            Nếu người học cần đề nghị giải quyết các vấn đề sau:
          </p>
          <p style="padding-bottom: 1rem; ">
            1. Sửa thông tin văn bằng
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            2. Sửa thông tin chứng chỉ
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.
          </p>
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            B. Hướng dẫn thao tác:
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 1: Click vào nút "
            <span style="color: #0ea5e9; font-weight: 700; ">
              Gửi yêu cầu
            </span>
            "
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 2: Người học in đơn và điền các thông tin vào mẫu đơn
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 3: Người học mang đơn và photo bằng Tốt nghiệp hoặc chứng chỉ bị sai nộp tại Bộ phận hành chính Một cửa.
          </p>
          <p style="padding-bottom: 1rem; ">
            <span style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444;">
              C. Ghi chú:
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            - Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ
            được mở lại trong một số trường hợp mà người học không thể đến
            trực tiếp như: Dịch bệnh, thiên tai …
          </p>
          <p>
            <a style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-dao-tao/'>
            - Xem chi tiết quy trình thực hiện tại đây.
            </a>
          </p>
        `,
        path: '/sua-thong-tin',
        limited: true,
        visiable: true,
        stt: 5,
      },
      {
        title: 'Miễn chứng chỉ',
        desc: `
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            A. Mô tả:
          </p>
          <p style="padding-bottom: 1rem; ">
            Nếu người học cần đề nghị giải quyết các vấn đề sau:
          </p>
          <p style="padding-bottom: 1rem; ">
            1. Miễn chứng chỉ tiếng anh
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            2. Miễn chứng chỉ Giáo dục Quốc phòng – An ninh
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.
          </p>
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            B. Hướng dẫn thao tác:
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 1: Click vào nút "
            <span style="color: #0ea5e9; font-weight: 700; ">
              Gửi yêu cầu
            </span>
            "
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 2: Người học in đơn và điền các thông tin vào mẫu đơn
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 3: Người học mang đơn và photo bằng Tốt nghiệp hoặc chứng chỉ bị sai nộp tại Bộ phận hành chính Một cửa.
          </p>
          <p style="padding-bottom: 1rem; ">
            <span style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444;">
              C. Ghi chú:
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            - Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ
            được mở lại trong một số trường hợp mà người học không thể đến
            trực tiếp như: Dịch bệnh, thiên tai …
          </p>
          <p>
            <a style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-dao-tao/'>
            - Xem chi tiết quy trình thực hiện tại đây.
            </a>
          </p>
        `,
        path: '/mien-chung-chi',
        limited: true,
        visiable: true,
        stt: 6,
      },
      {
        title: 'Chuyển điểm',
        desc: `
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            A. Mô tả:
          </p>
          <p style="padding-bottom: 1rem; ">
            Nếu người học cần đề nghị giải quyết các vấn đề sau:
          </p>
          <p style="padding-bottom: 1rem; ">
            1. Chuyển điểm học phần tương đương
            <span style="color: #0ea5e9; padding-left: 0.5rem; padding-right: 0.5rem; font-style: italic; ">
              (cho phép đề nghị trực tuyến)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            2. Chuyển trường (từ trường khác về)
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            3. Chuyển điểm khác hệ đào tạo
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.
          </p>
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            B. Hướng dẫn thao tác:
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 1: Click vào nút "
            <span style="color: #0ea5e9; font-weight: 700; ">
              Gửi yêu cầu
            </span>
            "
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 2: Chọn hoặc điền dữ liệu và các ô cần nhập dữ liệu
          </p>
          <p style="padding-bottom: 1rem; ">Bước 3:</p>
          <p style="padding-bottom: 1rem; padding-left: 2rem;">
            3.1: Đối với yêu cầu "
            <span style="color: #EF4444; font-weight: 700; font-style: italic; ">
              Chuyển điểm học phần tương đương và khác hệ đào tạo
            </span>
            "
          </p>
          <p style="padding-bottom: 1rem; padding-left: 3rem;">
            - Tại lưới dữ liệu =>
            <span style="color: #EF4444; font-weight: 700; font-style: italic; ">
              Tick chọn một học phần
            </span>
            muốn chuyển điểm => click "
            <span style="color: #0ea5e9; font-weight: 700; ">
              Tìm học phần tương đương
            </span>
            ".
          </p>
          <p style="padding-bottom: 1rem; padding-left: 3rem;">
            - Tiếp theo chọn 
            <span style="color: #EF4444; font-weight: 700; font-style: italic; ">
              1 học phần tương đương
            </span>
            muốn chuyển và chọn hình ảnh "
            <span style="color: #EF4444; font-weight: 700; font-style: italic; ">
              Đơn xin chuyển điểm
            </span>
            " => click "
            <span style="color: #0ea5e9; font-weight: 700; ">
              Gửi yêu cầu
            </span>
            ".
          </p>
          <p style="padding-bottom: 1rem; padding-left: 2rem;">
            3.2: Đối với yêu cầu Chuyển trường (chuyển từ trường khác về):
          </p>
          <p style="padding-bottom: 1rem; padding-left: 3rem;">
            - Người học in đơn và điền các thông tin vào mẫu đơn, nộp tại Bộ phận hành chính Một cửa.
          </p>
          <p style="padding-bottom: 1rem; ">
            <span style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444;">
              C. Ghi chú:
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            - Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ
            được mở lại trong một số trường hợp mà người học không thể đến
            trực tiếp như: Dịch bệnh, thiên tai …
          </p>
          <p>
            <a style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-dao-tao/'>
            - Xem chi tiết quy trình thực hiện tại đây.
            </a>
          </p>
        `,
        path: '/chuyen-diem',
        limited: false,
        visiable: true,
        stt: 7,
      },
      {
        title: 'Xử lý vấn đề Email/LMS',
        desc: `
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            A. Mô tả:
          </p>
          <p style="padding-bottom: 1rem; ">
            Nếu người học cần đề nghị giải quyết các vấn đề sau:
          </p>
          <p style="padding-bottom: 1rem; ">
            1. Cấp mới, đổi tên, reset mật khẩu, mở khóa vô hiệu hóa, mở khóa bảo mật 2 lớp và thay đổi số điện thoại xác minh 2 bước cho tài khoản Email UNETI
            <span style="color: #0ea5e9; padding-left: 0.5rem; padding-right: 0.5rem; font-style: italic; ">
              (cho phép đề nghị trực tuyến)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            2. Cấp mới, reset mật khẩu LMS UNETI 
            <span style="color: #0ea5e9; padding-left: 0.5rem; padding-right: 0.5rem; font-style: italic; ">
              (cho phép đề nghị trực tuyến)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.
          </p>
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            B. Hướng dẫn thao tác:
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 1: Click vào nút "
            <span style="color: #0ea5e9; font-weight: 700; ">
              Gửi yêu cầu
            </span>
            "
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 2: Tại form yêu cầu, sinh viên chọn và điền dữ liệu tương ứng, cung cấp thông tin kèm theo bắt buộc => click "
            <span style="color: #0ea5e9; font-weight: 700; ">
              Gửi yêu cầu
            </span>
            "
          </p>
          <p style="padding-bottom: 1rem; ">
            <span style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
              C. Ghi chú:
            </span>
            Loading...
          </p>
          <p>
            <a style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-dao-tao/'>
            - Xem chi tiết quy trình thực hiện tại đây.
            </a>
          </p>
        `,
        path: '/email-lms',
        limited: false,
        visiable: true,
        stt: 8,
      },
      {
        title: 'Đăng ký học lớp chất lượng',
        desc: `
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            A. Mô tả:
          </p>
          <p style="padding-bottom: 1rem; ">
            Nếu người học cần đề nghị giải quyết các vấn đề sau:
          </p>
          <p style="padding-bottom: 1rem; ">
            1. Đăng ký lớp học chương trình chất lượng
            <span style="color: #0ea5e9; padding-left: 0.5rem; padding-right: 0.5rem; font-style: italic; ">
              (cho phép đề nghị trực tuyến)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.
          </p>
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            B. Hướng dẫn thao tác:
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 1: Click vào nút "
            <span style="color: #0ea5e9; font-weight: 700; ">
              Gửi yêu cầu
            </span>
            "
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 2: Tại form yêu cầu, sinh viên chọn và điền dữ liệu tương ứng, cung cấp thông tin kèm theo bắt buộc => click "
            <span style="color: #0ea5e9; font-weight: 700; ">
              Gửi yêu cầu
            </span>
            "
          </p>
          <p style="padding-bottom: 1rem; ">
            <span style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
              C. Ghi chú:
            </span>
            Loading...
          </p>
          <p>
            <a style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-dao-tao/'>
            - Xem chi tiết quy trình thực hiện tại đây.
            </a>
          </p>
        `,
        path: '/dang-ky-lop-chat-luong',
        limited: false,
        visiable: true,
        stt: 9,
      },
    ],
  },
  {
    title: 'Một cửa - CT&CTSV',
    name: 'CT&CTSV',
    desc: '',
    path: '/ct&ctsv',
    thumbnail: thumbnailCTSV,
    ico: icoCTSV,
    moduleActive: true,
    childrens: [
      {
        title: 'Xác nhận',
        desc: `
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            A. Mô tả:
          </p>
          <p style="padding-bottom: 1rem; ">
            Nếu người học cần đề nghị giải quyết các vấn đề sau:
          </p>
          <p style="padding-bottom: 1rem; ">
            1. Làm vé tháng xe bus
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            2. Đang học tại trường
            <span style="color: #0ea5e9; padding-left: 0.5rem; padding-right: 0.5rem; font-style: italic; ">
              (cho phép đề nghị trực tuyến)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            3. Thuê nhà ở sinh viên
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            4. Cấp lại thẻ BHYT
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            5. Đối tượng chính sách
            <span style="color: #0ea5e9; padding-left: 0.5rem; padding-right: 0.5rem; font-style: italic; ">
              (cho phép đề nghị trực tuyến)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            6. Sổ ưu đãi
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            7. Vay vốn
            <span style="color: #0ea5e9; padding-left: 0.5rem; padding-right: 0.5rem; font-style: italic; ">
              (cho phép đề nghị trực tuyến)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.
          </p>
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            B. Hướng dẫn thao tác:
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 1: Click vào nút "
            <span style="color: #0ea5e9; font-weight: 700; ">
              Gửi yêu cầu
            </span>
            "
          </p>
          <p style="padding-bottom: 1rem; ">Bước 2:</p>
          <p style="padding-bottom: 1rem; ">
            - Làm vé tháng xe bus: 
          </p>
          <p style="padding-bottom: 1rem; padding-left: 2rem;">
            + B1: Người học nhận mẫu đơn tại các điểm làm vé tháng xe bus.
          </p>
          <p style="padding-bottom: 1rem; padding-left: 2rem;">
            + B2: Người học ghi đầy đủ các thông tin và dán 02 ảnh theo yêu cầu của đơn đăng ký.
          </p>
          <p style="padding-bottom: 1rem; padding-left: 2rem;">
            + B3: Người học nộp lại Bộ phận hành chính Một cửa.
          </p>
          <p style="padding-bottom: 1rem; ">
            - Đang học tại trường, vay vốn, đối tượng chính sách: Chọn hoặc điền dữ liệu vào các ô cần nhập dữ liệu.
          </p>
          <p style="padding-bottom: 1rem; ">
            - Thuê nhà ở Sinh viên: 
          </p>
          <p style="padding-bottom: 1rem; padding-left: 2rem;">
            + B1. Người học nhận mẫu đơn tại BQL nhà ở Sinh viên.
          </p>
          <p style="padding-bottom: 1rem; padding-left: 2rem;">
            + B2. Người học ghi đầy đủ các thông tin và dán ảnh theo yêu cầu của đơn đăng ký.
          </p>
          <p style="padding-bottom: 1rem; padding-left: 2rem;">
            + B3. Người học nộp lại Bộ phận hành chính Một cửa.
          </p>
          <p style="padding-bottom: 1rem; ">
            - Cấp lại thẻ BHYT: Người học in đơn và điền các thông tin vào mẫu đơn, nộp tại Bộ phận hành chính Một cửa. 
          </p>
          <p style="padding-bottom: 1rem; ">
            - Sổ ưu đãi: Người học mang sổ đến nộp lại Bộ phận hành chính Một cửa.
          </p>
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            C. Ghi chú:
          </p>
          <p style="padding-bottom: 1rem; ">
            - Không cấp giấy xác nhận đối với người học đã vượt quá thời gian đào tạo theo quy định hiện hành.
          </p>
          <p style="padding-bottom: 1rem; ">
          - Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ được mở lại trong một số trường hợp mà người học không thể đến trực tiếp như: Dịch bệnh, thiên tai …
          </p>
          <p>
           <a target="_blank" style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-cong-tac-sinh-vien/'>- Xem chi tiết quy trình thực hiện tại đây.</a>
          </p>
        `,
        path: '/xac-nhan',
        limited: false,
        visiable: true,
        stt: 1,
      },
      {
        title: 'Quá trình học',
        desc: `
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            A. Mô tả:
          </p>
          <p style="padding-bottom: 1rem; ">
            Nếu người học cần đề nghị giải quyết các vấn đề sau:
          </p>
          <p style="padding-bottom: 1rem; ">
            1. Bảo lưu kết quả học tập
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            2. Xin thôi học
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            3. Trở lại học tập
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.
          </p>
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            B. Hướng dẫn thao tác:
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 1: Click vào nút "
            <span style="color: #0ea5e9; font-weight: 700; ">
              Gửi yêu cầu
            </span>
            "
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 2: Người học in đơn và điền các thông tin vào mẫu đơn, nộp tại Bộ phận hành chính một cửa.
          </p>
          <p style="padding-bottom: 1rem; ">
            <span style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
              C. Ghi chú:
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            - Đối với bảo lưu kết quả học tập: Người học nộp kèm thêm giấy tờ minh chứng.
          </p>
          <p style="padding-bottom: 1rem; ">
            - Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ được mở lại trong một số trường hợp mà người học không thể đến trực tiếp như: Dịch bệnh, thiên tai …
          </p>
          <p>
           <a target="_blank" style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-cong-tac-sinh-vien/'>- Xem chi tiết quy trình thực hiện tại đây.</a>
          </p>
        `,
        path: '/qua-trinh-hoc',
        limited: true,
        visiable: true,
        stt: 2,
      },
      {
        title: 'Nghỉ học tạm thời',
        desc: `
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            A. Mô tả:
          </p>
          <p style="padding-bottom: 1rem; ">
            Nếu người học cần đề nghị giải quyết các vấn đề sau:
          </p>
          <p style="padding-bottom: 1rem; ">
            1. Xin nghỉ học để điều trị bệnh
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.
          </p>
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            B. Hướng dẫn thao tác:
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 1: Click vào nút "
            <span style="color: #0ea5e9; font-weight: 700; ">
              Gửi yêu cầu
            </span>
            "
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 2: Người học in đơn và điền các thông tin vào mẫu đơn
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 3: Người học mang đơn và photo giấy tờ minh chứng kèm theo nộp tại Bộ phận hành chính một cửa.
          </p>
          <p style="padding-bottom: 1rem; ">
            <span style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
              C. Ghi chú:
            </span>
          </p>
          <p style="padding-bottom: 1rem;>
           - Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ được mở lại trong một số trường hợp mà người học không thể đến trực tiếp như: Dịch bệnh, thiên tai …
          </p>
          <p style="padding-bottom: 1rem;>
           <a target="_blank" style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-cong-tac-sinh-vien/'>- Xem chi tiết quy trình thực hiện tại đây.</a>
          </p>
        `,
        path: '/nghi-hoc-tam-thoi',
        limited: true,
        visiable: true,
        stt: 3,
      },
      {
        title: 'Xin chuyển',
        desc: `
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            A. Mô tả:
          </p>
          <p style="padding-bottom: 1rem; ">
            Nếu người học cần đề nghị giải quyết các vấn đề sau:
          </p>
          <p style="padding-bottom: 1rem; ">
            1. Địa điểm học
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            2. Trường học
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.
          </p>
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            B. Hướng dẫn thao tác:
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 1: Click vào nút "
            <span style="color: #0ea5e9; font-weight: 700; ">
              Gửi yêu cầu
            </span>
            "
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 2: Người học in đơn và điền các thông tin vào mẫu đơn, nộp tại Bộ phận hành chính Một cửa.
          </p>
          <p style="padding-bottom: 1rem; ">
            <span style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
              C. Ghi chú:
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            - Đối với chuyển địa điểm học chỉ áp dụng với người học cơ sở Hà Nội xin chuyển về cơ sở Nam Định học tập.          </p>
          <p style="padding-bottom: 1rem; ">
            - Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ được mở lại trong một số trường hợp mà người học không thể đến trực tiếp như: Dịch bệnh, thiên tai …
          </p>
          <p>
           <a target="_blank" style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-cong-tac-sinh-vien/'>- Xem chi tiết quy trình thực hiện tại đây.</a>
          </p>
        `,
        path: '/xin-chuyen',
        limited: true,
        visiable: true,
        stt: 4,
      },
    ],
  },
  {
    title: 'Một cửa - Hành chính',
    name: 'Hành chính',
    desc: '',
    path: '/hanh-chinh',
    thumbnail: thumbnailHanhChinh,
    ico: icoHanhChinh,
    moduleActive: true,
    childrens: [
      {
        title: 'Giấy giới thiệu',
        desc: `
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            A. Mô tả:
          </p>
          <p style="padding-bottom: 1rem; ">
            Nếu người học cần đề nghị giải quyết các vấn đề sau:
          </p>
          <p style="padding-bottom: 1rem; ">
            1. Liên hệ thực tập tốt nghiệp
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            2. Đăng ký xe máy
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            3. Công việc khác
            <span style="padding-left: 0.5rem;padding-right: 0.5rem; font-style: italic; color: #EF4444; ">
              (chức năng này bị giới hạn không cho phép đề nghị trực
              tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)
            </span>
          </p>
          <p style="padding-bottom: 1rem; ">
            Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.
          </p>
          <p style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            B. Hướng dẫn thao tác:
          </p>
          <p style="padding-bottom: 1rem; ">
            Bước 1: Click vào nút "
            <span style="color: #0ea5e9; font-weight: 700; ">
              Gửi yêu cầu
            </span>
            "
          </p>
          <p style="padding-bottom: 1rem; ">Bước 2:</p>
          <p style="padding-bottom: 1rem; ">
            - Liên hệ thực tập tốt nghiệp: 
          </p>
          <p style="padding-bottom: 1rem; padding-left: 2rem;">
            + B1; Người học liên hệ CVHT/Nhóm CVHT chuyên trách đăng ký.
          </p>
          <p style="padding-bottom: 1rem; padding-left: 2rem;">
            + B2: CVHT/Nhóm CVHT chuyên trách gửi Bộ phận hành chính Một cửa để cập nhật đề nghị vào phần mềm.
          </p>
          <p style="padding-bottom: 1rem; padding-left: 2rem;">
            + B3: Người học đến Bộ phận hành chính Một cửa nhận giấy giới thiệu theo thông báo (email, web, app).
          </p>
          <p style="padding-bottom: 1rem; ">
            - Đăng ký xe máy, Công việc khác: Người học in đơn và điền các thông tin vào mẫu đơn, nộp tại Bộ phận hành chính Một cửa.
          </p>
          <p style="padding-bottom: 1rem; ">
            <span style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
              C. Ghi chú:
            </span>
          </p>
          <p>
                - Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ
            được mở lại trong một số trường hợp mà người học không thể đến
            trực tiếp như: Dịch bệnh, thiên tai …
          </p>
          <p><a target="_blank" style="color: #336699; font-weight: 500" href='https://uneti.edu.vn/cac-thu-tuc-hanh-chinh-giai-quyet-tai-bo-phan-mot-cua-phong-hanh-chinh-quan-tri/'>- Xem chi tiết quy trình thực hiện tại đây.</a></p>
        `,
        path: '/giay-gioi-thieu',
        limited: true,
        visiable: true,
        stt: 1,
      },
    ],
  },
  {
    title: 'Hướng dẫn',
    name: 'Hướng dẫn',
    desc: 'Hướng dẫn biểu mẫu tham khảo; Quy trình, thủ tục.',
    path: '/huong-dan',
    thumbnail: thumbnailKhaoThi,
    ico: icoKhaoThi,
    moduleActive: true,
    childrens: [
      {
        title: 'Biểu mẫu tham khảo',
        desc: `Biểu mẫu tham khảo`,
        path: 'https://uneti.edu.vn/bieu-mau-bo-phan-hanh-chinh-mot-cua/',
        limited: true,
        visiable: true,
        stt: 1,
      },
      {
        title: 'Quy trình, thủ tục',
        desc: `Quy trình, thủ tục`,
        path: 'https://uneti.edu.vn/category/quy-trinh-bo-phan-mot-cua/',
        limited: true,
        visiable: true,
        stt: 1,
      },
    ],
  },
]

export const homeHTTBGD = [
  {
    title: 'Báo hỏng',
    name: 'Báo hỏng',
    desc: '<b>Tiếp nhận</b>: Báo hỏng các thiết bị giảng đường',
    path: '/bao-hong',
    thumbnail: iconHTTBGDBaoHong,
    ico: iconHTTBGDBaoHong,
    moduleActive: true,
  },
  {
    title: 'Xử lý sự cố',
    name: 'Xử lý sự cố',
    desc: '<b>Tiếp nhận</b>: Xử lý sự cố giảng đường',
    path: '/xu-ly-su-co',
    thumbnail: iconHTTBGDXuLySuCo,
    ico: iconHTTBGDXuLySuCo,
    moduleActive: true,
  },
  {
    title: 'Đăng ký sử dụng thiết bị',
    name: 'Đăng ký sử dụng thiết bị',
    desc: '<b>Tiếp nhận</b>: Đăng ký sử dụng thiết bị giảng đường',
    path: '/dang-ky-su-dung-thiet-bi',
    thumbnail: iconHTTBGDDangKySuDungThietBi,
    ico: iconHTTBGDDangKySuDungThietBi,
    moduleActive: true,
  },
  {
    title: 'Góp ý',
    name: 'Góp ý',
    desc: '<b>Tiếp nhận</b>: Góp ý',
    path: '/gop-y',
    thumbnail: iconHTTBGDGopY,
    ico: iconHTTBGDGopY,
    moduleActive: true,
  },
]

export const homeTaiSan = {
  listFeatures: [
    {
      id: 1,
      title: 'Báo hỏng tài sản',
      name: 'Báo hỏng tài sản',
      path: '/bao-hong-tai-san',
      desc: '<b>Báo hỏng</b>: Các thiết bị đang sử dụng, đang quản lý.',
      thumbnail: iconHTTBGDBaoHong,
      roleActive: [ROLES.A0000, ROLES.G0101, ROLES.CBNV0],
      moduleActive: true,
    },
    {
      id: 2,
      title: 'Tra cứu tài sản',
      name: 'Tra cứu tài sản',
      path: '/tra-cuu-tai-san',
      desc: '<b>Tra cứu</b>: Thông tin tài sản, thông tin nhóm thiết bị đi kèm, nhân sự quản lý, nhân sự sử dụng.',
      thumbnail: icoTraCuuTS,
      roleActive: [ROLES.A0000, ROLES.G0101, ROLES.CBNV0],
      moduleActive: true,
    },
    {
      id: 3,
      title: 'Sửa chữa tài sản',
      name: 'Sửa chữa tài sản',
      path: '/sua-chua-tai-san',
      desc: '<b>Sửa chữa</b>: Những tài sản được báo hỏng.',
      thumbnail: iconHTTBGDXuLySuCo,
      roleActive: [ROLES.A0000, ROLES.G0101, ROLES.CBNV0],
      moduleActive: true,
    },
    {
      id: 4,
      title: 'Cập nhật thông tin tài sản',
      name: 'Cập nhật thông tin tài sản',
      path: '/cap-nhat-tai-san',
      desc: '<b>Cập nhật</b>: Thông tin tài sản, thông tin nhóm thiết bị đi kèm, nhân sự quản lý, nhân sự sử dụng.',
      thumbnail: iconHTTBGDGopY,
      roleActive: [ROLES.A0000, ROLES.G0101, ROLES.CBNV0],
      moduleActive: false,
    },
  ],
  listCanBoHoTro: [
    {
      id: 1,
      name: 'Tống Bá Quang Anh',
      position: 'KT',
      phone: '0334350166',
    },
    {
      id: 2,
      name: 'Nguyễn Mạnh Quân',
      position: 'KT',
      phone: '0334350166',
    },

    {
      id: 3,
      name: 'Nguyễn Thành Trung',
      position: 'KT',
      phone: '0334350166',
    },

    {
      id: 4,
      name: 'Ngô Mạnh Cường',
      phone: '0334350166',
      position: 'QTM',
      phone: '0334350166',
    },

    {
      id: 5,
      name: 'Tô Thành Công',
      position: 'QTM',
      phone: '0334350166',
    },
    {
      id: 6,
      name: 'Hà Đăng Huy',
      position: 'KT',
      phone: '0334350166',
    },
    {
      id: 7,
      name: 'Vũ Xuân Tuấn',
      position: 'STU',
      phone: '0334350166',
    },
    {
      id: 8,
      name: 'Giang Thị Thùy Lương',
      position: 'KT',
      phone: '0334350166',
    },
    {
      id: 9,
      name: 'Nguyễn Thị Ngọc Thùy',
      position: 'KT',
      phone: '0334350166',
    },
  ],
  listHotlines: [
    {
      id: 1,
      name: 'Phòng Đào Tạo',
      phone: '0334350166',
    },
    {
      id: 2,
      name: 'Phòng TCCB',
      phone: '0334350166',
    },
    {
      id: 3,
      name: 'Phòng CT&CTSV',
      phone: '0334350166',
    },
    {
      id: 4,
      name: 'Phòng Hành Chính',
      phone: '0334350166',
    },
    {
      id: 5,
      name: 'Phòng Khảo Thí',
      phone: '0334350166',
    },
  ],
  listAppSupport: [
    {
      id: 1,
      name: 'Teamviewer',
      logo: icoTeamView,
      link: '',
    },
    {
      id: 2,
      name: 'Ultraview',
      logo: icoUltraView,
      link: '',
    },
    {
      id: 3,
      name: 'Zalo App',
      logo: icoZalo,
      link: '',
    },
  ],
}

export const homeTTHCGV = [
  {
    id: 1,
    title: 'Trang chủ',
    name: 'Trang chủ',
    path: '/tthc-giang-vien',
    roleActive: [ROLES.A0000, ROLES.G0101, ROLES.CBNV0],
  },
  {
    id: 2,
    title: 'Xử lý nghiệp vụ',
    name: 'Xử lý nghiệp vụ',
    path: '/admin/xu-ly-nghiep-vu',
    roleActive: [ROLES.CBNV0],
  },
  {
    id: 3,
    title: 'Quản trị đơn vị',
    name: 'Quản trị đơn vị',
    path: '/admin/quan-tri-TTHCGV',
    roleActive: [ROLES.A0000],
  },
]

export const homeHocTap = [
  {
    id: 1,
    title: 'Kết quả học tập',
    desc: 'Kết quả đánh giá chi tiết của từng môn học trong học kỳ.',
    path: '/ket-qua-hoc-tap',
    thumbnail: icoHTTBGD,
    roleActive: [ROLES.S0202],
    moduleActive: true,
  },

  {
    id: 2,
    title: 'Ôn luyện trắc nghiệm',
    desc: 'Ôn tập: Thi thử : Dành cho các học phần đã đăng ký.',
    path: '/on-luyen',
    moduleActive: true,
    thumbnail: icoTTHCSV,
    roleActive: [ROLES.S0202],
  },
]

export const homeTraCuu = [
  {
    id: 1,
    title: 'Điểm danh',
    desc: 'Theo dõi toàn bộ quá trình điểm danh đối với các môn học tương ứng tại các học kỳ',
    path: '/diem-danh',
    thumbnail: iconDiemDanh,
    roleActive: [ROLES.S0202],
    moduleActive: true,
  },

  {
    id: 2,
    title: 'Rèn luyện',
    desc: 'Theo dõi toàn bộ kết quả rèn luyện theo học kỳ',
    path: '/ren-luyen',
    moduleActive: true,
    thumbnail: icoTTHCSV,
    roleActive: [ROLES.S0202],
  },
  {
    id: 3,
    title: 'Thời khóa biểu',
    desc: 'Theo dõi toàn bộ lịch học và lịch thi theo ngày, tuần, tháng đối với từng môn học trong học kỳ',
    path: '/thoi-khoa-bieu',
    moduleActive: true,
    thumbnail: iconLich,
    roleActive: [ROLES.S0202],
  },

  {
    id: 4,
    title: 'Chương trình đào tạo',
    desc: 'Theo dõi chương trình đào tạo',
    path: '/chuong-trinh-dao-tao',
    moduleActive: false,
    thumbnail: iconLich,
    roleActive: [ROLES.S0202],
  },
  {
    id: 4,
    title: 'Dự kiến kết quả học tập',
    desc: 'Dự kiến kết quả học tập bla bla ...',
    path: '/du-kien-ket-qua-hoc-tap',
    moduleActive: true,
    thumbnail: icoHocTap,
    roleActive: ['SV'],
  },
]

export const homeOnLuyen = [
  {
    id: 1,
    title: 'Ôn tập',
    desc: 'Ôn tập lý thuyết',
    path: '/on-tap',
    thumbnail: icoHTTBGD,
    roleActive: [ROLES.S0202],
    moduleActive: true,
  },

  {
    id: 2,
    title: 'Thi thử',
    desc: 'Thi thử đánh giá',
    path: '/thi-thu',
    moduleActive: true,
    thumbnail: icoTTHCSV,
    roleActive: [ROLES.S0202],
  },
]

// Data Loại Thi
export const dataLoaiThi = [
  {
    id: 1,
    title: 'Thi lần 1',
    value: 'Thi lần 1',
  },
  {
    id: 2,
    title: 'Thi lại',
    value: 'Thi lại',
  },
]

export const listCoSo = [
  {
    id: 1,
    title: 'Hà Nội',
    value: 'Hà Nội',
  },
  {
    id: 2,
    title: 'Nam Định',
    value: 'Nam Định',
  },
]

export const listDiaDiem = {
  haNoi: [
    {
      id: 1,
      title: '1 - 456 Minh Khai',
      value: '1 - 456 Minh Khai',
    },
    {
      id: 2,
      title: '2 - 454 Minh Khai',
      value: '2 - 454 Minh Khai',
    },
    {
      id: 3,
      title: '3 - 218 Lĩnh Nam',
      value: '3 - 218 Lĩnh Nam',
    },
  ],
  namDinh: [
    {
      id: 4,
      title: '4 - 353 Trần Hưng Đạo',
      value: '4 - 353 Trần Hưng Đạo',
    },
    {
      id: 5,
      title: '5 - Mỹ Xá',
      value: '5 - Mỹ Xá',
    },
  ],
}
