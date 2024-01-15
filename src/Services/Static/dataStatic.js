// icons - images homeMain
import icoHTTBGD from '../../assets/Icons/icoHTTBGD.png'
import icoTTHCSV from '../../assets/Icons/icoTTHCSV.png'
import icoHTTBSP from '../../assets/Icons/icoHTTBSP.png'
import icoHTSDPM from '../../assets/Icons/icoHTSDPM.png'
import icoTCTTTS from '../../assets/Icons/icoTCTTTS.png'
import icoQLCTCV from '../../assets/Icons/icoQLCTCV.png'

// icons - thumbnails homeMotCua
import icoKhaoThi from '../../assets/Icons/icoKhaoThi.png'
import icoDaoTao from '../../assets/Icons/icoDaoTao.png'
import icoCTSV from '../../assets/Icons/icoCTSV.png'
import icoHanhChinh from '../../assets/Icons/icoHanhChinh.png'

import thumbnailKhaoThi from '../../assets/Icons/icoThumbnailKhaoThi.png'
import thumbnailDaoTao from '../../assets/Icons/icoThumbnailDaoTao.png'
import thumbnailHanhChinh from '../../assets/Icons/icoThumbnailHanhChinh.png'
import thumbnailCTSV from '../../assets/Icons/icoThumbnailCTSV.png'

// icons - thumbnails HTTBGD
import iconHTTBGDBaoHong from '@/assets/Icons/icoHTTBGDBaoHong.png'
import iconHTTBGDXuLySuCo from '@/assets/Icons/icoHTTBGDXuLySuCo.png'
import iconHTTBGDDangKySuDungThietBi from '@/assets/Icons/icoHTTBGDDangKySuDungThietBi.png'
import iconHTTBGDGopY from '@/assets/Icons/icoHTTBGDGopY.png'

// icons - homeTaSan
import icoTeamView from '../../assets/Icons/icoTeamviewer.png'
import icoUltraView from '../../assets/Icons/icoUltraview.png'
import icoZalo from '../../assets/Icons/icoZalo.png'

// data Static NguonTiepNhan
export const NguonTiepNhan_WEB = 1
// data Static homeMain
export const homeMain = [
  {
    title: 'Hỗ trợ thiết bị giảng đường',
    desc: 'Theo dõi và báo hỏng thiết bị trong phòng học.',
    icon: icoHTTBGD,
    path: '/hotrothietbigiangduong',
    moduleActive: true,
    roleActive: ['GV'],
  },
  {
    title: 'Thủ tục hành chính sinh viên',
    desc: 'Tiếp nhận giải quyết các thủ tục hành chính cho sinh viên.',
    icon: icoTTHCSV,
    path: '/motcua',
    moduleActive: true,
    roleActive: ['SV'],
  },
  {
    title: 'Hỗ trợ thiết bị sảnh phòng',
    desc: 'Theo dõi và báo hỏng thiết bị ở sảnh, hành lang và phòng làm việc.',
    icon: icoHTTBSP,
    path: '/hotrothietbisanhphong',
    moduleActive: true,
    roleActive: ['GV'],
  },
  {
    title: 'Ôn luyện thi thử',
    desc: 'Tiếp nhận ôn luyện, thi thử cho sinh viên.',
    icon: icoTTHCSV,
    path: '/hoctap',
    moduleActive: true,
    roleActive: ['SV'],
  },
  {
    title: 'Hỗ trợ sử dụng phần mềm',
    desc: 'Tổng hợp file cài đặt, tài liệu hướng dẫn sử dụng các phần mềm.',
    icon: icoHTSDPM,
    path: '/hotrosudungphanmem',
    moduleActive: true,
    roleActive: ['GV', 'SV'],
  },
  {
    title: 'Tra cứu thông tin tài sản',
    desc: 'Quét QR để tra cứu thông tin tài sản.',
    icon: icoTCTTTS,
    path: '/taisan',
    moduleActive: true,
    roleActive: ['GV', 'SV'],
  },
  {
    title: 'Quản lý chi tiết công việc',
    desc: 'Hệ thống quản lý chi tiết công việc cán bộ phòng, ban.',
    icon: icoQLCTCV,
    path: 'https://uneti.edu.vn/',
    moduleActive: true,
    roleActive: ['GV'],
  },
  {
    title: 'Thủ tục hành chính giảng viên',
    desc: 'Tiếp nhận giải quyết các thủ tục hành chính cho giảng viên.',
    icon: icoTTHCSV,
    path: '/tthcgiangvien',
    moduleActive: true,
    roleActive: ['GV'],
  },
]

export const homeMotCua = [
  {
    title: 'Một cửa - Khảo thí',
    name: 'Khảo thí',
    desc: '',
    path: '/khaothi',
    thumbnail: thumbnailKhaoThi,
    ico: icoKhaoThi,
    moduleActive: true,
    childrens: [
      {
        title: 'Miễn học, thi Tiếng Anh',
        desc: `<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">A. Mô tả:</span></span></strong></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Nếu người học cần đề nghị giải quyết các vấn đề sau:</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">1. Xin miễn học, miễn thi học phần đã đăng ký trong cùng học kỳ </span><em><span style=\"background-color:white\"><span style=\"color:red\">(chức năng này bị giới hạn không cho phép đề nghị trực tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp)</span></span></em></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">B. Hướng dẫn thao tác:</span></span></strong></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 1: Click vào nút \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\"</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 2: Người học in đơn và điền các thông tin vào mẫu đơn</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 3: Người học mang đơn và bản chứng chỉ photo công chứng nộp tại Bộ phận hành chính Một cửa. </span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:14pt\"><strong><span style=\"color:red\">C. Ghi chú:</span></strong><strong> </strong></span></p>\n\n<p style=\"text-align:justify\"><span style=\"color:#000000\"><span style=\"font-size:16px\"><span style=\"font-family:Arial,Helvetica,sans-serif\">- Phần này chỉ tiếp nhận trước 2 tuần và sau 1 tuần kể từ thời điểm bắt đầu học kỳ.</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:14pt\"><span style=\"color:#000000\"><span style=\"font-size:12.0pt\">- Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ được mở lại trong một số trường hợp mà người học không thể đến trực tiếp như: Dịch bệnh, thiên tai …</span></span></span></p>\n\n<p> </p>\n`,
        path: '/mienhocthiTA',
        limited: true,
        visiable: true,
        stt: 1,
      },
      {
        title: 'Phúc khảo',
        desc: `<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">A. Mô tả:</span></span></strong></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Nếu người học cần đề nghị giải quyết các vấn đề sau:</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">1. Phúc khảo bài thi lần 1 </span><span style=\"color:#3498db\"><em><span style=\"background-color:white\">(cho phép đề nghị trực tuyến)</span></em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">2. Phúc khảo bài thi lại </span><span style=\"color:#3498db\"><em><span style=\"background-color:white\">(cho phép đề nghị trực tuyến)</span></em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">B. Hướng dẫn thao tác:</span></span></strong></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 1: Click vào nút \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\"</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 2: Chọn hoặc điền dữ liệu và các ô cần nhập dữ liệu</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 3: Tại lưới dữ liệu => Click \"</span><strong><span style=\"color:red\">Chọn</span></strong><span style=\"color:black\">\" dòng dữ liệu tương ứng với học phần và click \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\".</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:14pt\"><strong><span style=\"color:red\">C. Ghi chú:</span></strong><strong> </strong></span></p>\n\n<p style=\"text-align:justify\"><span style=\"color:#000000\"><span style=\"font-size:14pt\"><span style=\"font-size:12.0pt\">- <span style=\"background-color:white\">Người học thực hiện phúc khảo theo kế hoạch tổ chức thi (Ngày nộp đơn phúc khảo) trong từng học kỳ.</span></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"color:#000000\"><span style=\"font-size:14pt\"><span style=\"font-size:12.0pt\"><span style=\"background-color:white\">- Lệ phí phúc khảo kết quả học tập: Có mức thu theo quy định, được chuyển trực tiếp vào công nợ, người học nộp cùng học phí kỳ kế tiếp.</span></span></span></span></p>\n\n<p style=\"text-align:justify\"> </p>\n`,
        path: '/phuckhao',
        limited: false,
        visiable: true,
        stt: 2,
      },
      {
        title: 'Lịch thi',
        desc: `<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">A. Mô tả:</span></span></strong></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Nếu người học cần đề nghị giải quyết các vấn đề sau:</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">1. Xem lịch thi </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">2. Trùng lịch thi </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">3. Không có lịch thi </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">B. Hướng dẫn thao tác:</span></span></strong></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 1: Click vào nút \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\"</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 2: Chọn hoặc điền dữ liệu và các ô cần nhập dữ liệu</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 3: Tại lưới dữ liệu => Click \"</span><strong><span style=\"color:red\">Chọn</span></strong><span style=\"color:black\">\" dòng dữ liệu tương ứng với học phần và click \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\".</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:14pt\"><strong><span style=\"color:red\">C. Ghi chú:</span></strong><strong> </strong><span style=\"color:#000000\"><span style=\"font-size:12.0pt\">Loading…</span></span></span></p>\n\n<p style=\"margin-left:.0001pt; margin-right:0\"> </p>\n`,
        path: '/lichthi',
        limited: false,
        visiable: true,
        stt: 3,
      },
      {
        title: 'Đăng ký thi lại',
        desc: `<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">A. Mô tả:</span></span></strong></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Nếu người học cần đề nghị giải quyết các vấn đề sau:</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">1. Trùng lịch thi </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">2. Lỗi website Sinhvien.uneti.edu.vn </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">3. Khác hệ, loại hình đào tạo </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">4. Thi không theo kế hoạch </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">5. Lý do khác </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">B. Hướng dẫn thao tác:</span></span></strong></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 1: Click vào nút \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\"</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 2: Chọn hoặc điền dữ liệu và các ô cần nhập dữ liệu</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 3: Tại lưới dữ liệu => Click \"</span><strong><span style=\"color:red\">Chọn</span></strong><span style=\"color:black\">\" dòng dữ liệu tương ứng với học phần và click \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\".</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">C. Ghi chú: </span></span></strong><strong><span style=\"background-color:white\"><span style=\"color:red\"> </span></span></strong></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:16px\"><span style=\"background-color:white\"><span style=\"color:#000000\"><span style=\"background-color:white\">- Lệ phí thi lại sẽ nộp cùng học phí kỳ tiếp</span> theo.</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:#000000\">- Người học chỉ nên đăng ký thi lại tại đây, nếu gặp phải một số trường hợp như mục A.</span></span></span></p>\n\n<p style=\"text-align:justify\"> </p>\n`,
        path: '/dangkythilai',
        limited: false,
        visiable: true,
        stt: 4,
      },
      {
        title: 'Hoãn thi',
        desc: `<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">A. Mô tả:</span></span></strong></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Nếu người học cần đề nghị giải quyết các vấn đề sau:</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">1. Đi viện hoặc theo yêu cầu bác sĩ </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">2. Thực hiện nhiệm vụ nhà trường giao </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">3. Lý do khác </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">B. Hướng dẫn thao tác:</span></span></strong></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 1: Click vào nút \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\"</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 2: Chọn hoặc điền dữ liệu và các ô cần nhập dữ liệu</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 3: Tại lưới dữ liệu => Click \"</span><strong><span style=\"color:red\">Chọn</span></strong><span style=\"color:black\">\" dòng dữ liệu tương ứng với học phần, up ảnh và click \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\".</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:14pt\"><strong><span style=\"color:red\">C. Ghi chú:</span></strong><strong> </strong><span style=\"color:#000000\"><span style=\"font-size:12.0pt\">Ng<span style=\"font-size:16px\"><span style=\"font-family:Arial,Helvetica,sans-serif\">ười học làm đơn theo mẫu và giấy tờ minh chứn</span></span>g kèm theo.</span></span></span></p>\n\n<p> </p>\n`,
        path: '/hoanthi',
        limited: false,
        visiable: true,
        stt: 5,
      },
      {
        title: 'Hủy đăng ký thi lại',
        desc: `<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">A. Mô tả:</span></span></strong></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Nếu người học cần đề nghị giải quyết các vấn đề sau:</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">1. Đạt điểm học phần sau khi phúc khảo </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">2. Điều chỉnh điểm thường kỳ (quá trình) </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">3. Hủy đăng ký thi lại để học lại </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">4. Lý do khác </span><span style=\"color:#3498db\"><em>(cho phép đề nghị trực tuyến)</em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">B. Hướng dẫn thao tác:</span></span></strong></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 1: Click vào nút \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\"</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 2: Chọn hoặc điền dữ liệu và các ô cần nhập dữ liệu</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 3: Tại lưới dữ liệu => Click \"</span><strong><span style=\"color:red\">Chọn</span></strong><span style=\"color:black\">\" dòng dữ liệu tương ứng với học phần và click \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\".</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:14pt\"><strong><span style=\"color:red\">C. Ghi chú:</span></strong><strong> </strong></span><span style=\"color:#000000\"><span style=\"font-size:14pt\"><span style=\"font-size:12.0pt\">Thời điểm người học xin hủy đăng ký thi lại trước ngày thi 5 ngày và người học<span style=\"background-color:white\"> chưa nộp lệ phí thi lại.</span></span></span></span></p>\n\n<p> </p>\n`,
        path: '/huydangkythilai',
        limited: false,
        visiable: true,
        stt: 6,
      },
      {
        title: 'Kết quả học tập',
        desc: `<div style=\"text-align:left\">\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">A. Mô tả:</span></span></strong></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Nếu người học cần đề nghị giải quyết các vấn đề sau:</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">1. Xem kết quả học tập </span><span style=\"color:#3498db\"><em><span style=\"background-color:white\">(cho phép đề nghị trực tuyến)</span></em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">2. Điều chỉnh, bổ sung điểm thường kỳ </span><span style=\"color:#3498db\"><em><span style=\"background-color:white\">(cho phép đề nghị trực tuyến)</span></em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">3. Điều chỉnh, bổ sung điểm thi </span><span style=\"color:#3498db\"><em><span style=\"background-color:white\">(cho phép đề nghị trực tuyến)</span></em></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Người học tham khảo cách thực hiện theo hướng dẫn tại mục B.</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><strong><span style=\"font-size:14.0pt\"><span style=\"color:red\">B. Hướng dẫn thao tác:</span></span></strong></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 1: Click vào nút \"</span><span style=\"color:#3498db\"><strong>Gửi yêu cầu</strong></span><span style=\"color:black\">\"</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 2: Chọn hoặc điền dữ liệu và các ô cần nhập dữ liệu</span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:12pt\"><span style=\"background-color:white\"><span style=\"color:black\">Bước 3: </span><span style=\"background-color:white\"><span style=\"color:black\">Tại lưới dữ liệu => Click \"</span></span><strong><span style=\"background-color:white\"><span style=\"color:red\">Chọn</span></span></strong><span style=\"background-color:white\"><span style=\"color:black\">\" dòng dữ liệu tương ứng với học phần và click \"</span></span><span style=\"color:#3498db\"><strong><span style=\"background-color:white\">Gửi yêu cầu</span></strong></span><span style=\"background-color:white\"><span style=\"color:black\">\".</span></span></span></span></p>\n\n<p style=\"text-align:justify\"><span style=\"font-size:14pt\"><strong><span style=\"color:red\">C. Ghi chú:</span></strong></span><span style=\"font-size:14pt\"><span style=\"font-size:12.0pt\"><span style=\"background-color:white\"><span style=\"color:#000000\"> Người học được thắc mắc điểm quá trình trong vòng 7 ngày kể từ khi điểm quá trình được công bố trên trang cá nhân và sau khi người học đã phản hồi với giảng viên giảng dạy.</span></span></span></span></p>\n\n<p style=\"text-align:justify\"> </p>\n</div>\n`,
        path: '/ketquahoctap',
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
    path: '/daotao',
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
            Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ
            được mở lại trong một số trường hợp mà người học không thể đến
            trực tiếp như: Dịch bệnh, thiên tai …
          </p>
        `,
        path: '/capbangdiem',
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
          <span style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
            C. Ghi chú:
          </span>
          Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ
          được mở lại trong một số trường hợp mà người học không thể đến
          trực tiếp như: Dịch bệnh, thiên tai …
        </p>
        `,
        path: '/xacnhan',
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
            <span style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
              C. Ghi chú:
            </span>
            Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ
            được mở lại trong một số trường hợp mà người học không thể đến
            trực tiếp như: Dịch bệnh, thiên tai …
          </p>
        `,
        path: '/dangkytotnghiep',
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
            <span style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
              C. Ghi chú:
            </span>
            Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ
            được mở lại trong một số trường hợp mà người học không thể đến
            trực tiếp như: Dịch bệnh, thiên tai …
          </p>
        `,
        path: '/capbansao',
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
            <span style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
              C. Ghi chú:
            </span>
            Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ
            được mở lại trong một số trường hợp mà người học không thể đến
            trực tiếp như: Dịch bệnh, thiên tai …
          </p>
        `,
        path: '/suathongtin',
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
            <span style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
              C. Ghi chú:
            </span>
            Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ
            được mở lại trong một số trường hợp mà người học không thể đến
            trực tiếp như: Dịch bệnh, thiên tai …
          </p>
        `,
        path: '/mienchungchi',
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
            <span style="padding-bottom: 1rem; font-size: 1.25rem;line-height: 1.75rem; font-weight: 700; color: #EF4444; ">
              C. Ghi chú:
            </span>
            Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ
            được mở lại trong một số trường hợp mà người học không thể đến
            trực tiếp như: Dịch bệnh, thiên tai …
          </p>
        `,
        path: '/chuyendiem',
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
        `,
        path: '/emaillms',
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
        `,
        path: '/dangkylopchatluong',
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
        `,
        path: '/xacnhan',
        limited: false,
        visiable: true,
        stt: 2,
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
        `,
        path: '/quatrinhhoc',
        limited: true,
        visiable: true,
        stt: 3,
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
            Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ được mở lại trong một số trường hợp mà người học không thể đến trực tiếp như: Dịch bệnh, thiên tai …
          </p>
        `,
        path: '/nghihoctamthoi',
        limited: true,
        visiable: true,
        stt: 4,
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
        `,
        path: '/xinchuyen',
        limited: true,
        visiable: true,
        stt: 5,
      },
    ],
  },
  {
    title: 'Một cửa - Hành chính',
    name: 'Hành chính',
    desc: '',
    path: '/hanhchinh',
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
            Việc giải quyết thủ tục hành chính thực hiện trực tuyến sẽ
            được mở lại trong một số trường hợp mà người học không thể đến
            trực tiếp như: Dịch bệnh, thiên tai …
          </p>
        `,
        path: '/giaygioithieu',
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
    path: '/baohong',
    thumbnail: iconHTTBGDBaoHong,
    ico: icoKhaoThi,
    moduleActive: true,
  },
  {
    title: 'Xử lý sự cố',
    name: 'Xử lý sự cố',
    desc: '<b>Tiếp nhận</b>: Xử lý sự cố giảng đường',
    path: '/xulysuco',
    thumbnail: iconHTTBGDXuLySuCo,
    ico: icoKhaoThi,
    moduleActive: true,
  },
  {
    title: 'Đăng ký sử dụng thiết bị',
    name: 'Đăng ký sử dụng thiết bị',
    desc: '<b>Tiếp nhận</b>: Đăng ký sử dụng thiết bị giảng đường',
    path: '/dangkysudungthietbi',
    thumbnail: iconHTTBGDDangKySuDungThietBi,
    ico: icoKhaoThi,
    moduleActive: true,
  },
  {
    title: 'Góp ý',
    name: 'Góp ý',
    desc: '<b>Tiếp nhận</b>: Góp ý',
    path: '/gopy',
    thumbnail: iconHTTBGDGopY,
    ico: icoKhaoThi,
    moduleActive: true,
  },
]

export const homeTaiSan = {
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
    path: '/tthcgiangvien',
    roleActive: ['Admin', 'GV', 'CBNV'],
  },
  {
    id: 2,
    title: 'Cán bộ nghiệp vụ',
    name: 'Cán bộ nghiệp vụ',
    path: '/admin/canbonghiepvu',
    roleActive: ['Admin', 'CBNV'],
  },
  {
    id: 3,
    title: 'Quản trị hệ thống',
    name: 'Quản trị hệ thống',
    path: '/admin/quantriTTHCGV',
    roleActive: ['Admin'],
  },
]

export const homeHocTap = [
  {
    id: 1,
    title: 'Kết quả học tập',
    desc: 'Theo dõi toàn bộ quá trình điểm danh đối với các môn học tương ứng tại các học kỳ',
    path: '/ketquahoctap',
    thumbnail: icoHTTBGD,
    roleActive: ['SV'],
    moduleActive: true,
  },

  {
    id: 2,
    title: 'Ôn tập',
    desc: 'Theo dõi toàn bộ lịch học theo ngày, tuần, tháng đối với từng môn học trong học kỳ',
    path: '/ontap',
    moduleActive: true,
    thumbnail: icoTTHCSV,
    roleActive: ['SV'],
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
