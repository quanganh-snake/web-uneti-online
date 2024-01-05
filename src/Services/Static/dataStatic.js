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
    moduleActive: false,
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
    moduleActive: false,
    roleActive: ['GV'],
  },
  {
    title: 'Hỗ trợ sử dụng phần mềm',
    desc: 'Tổng hợp file cài đặt, tài liệu hướng dẫn sử dụng các phần mềm.',
    icon: icoHTSDPM,
    path: 'https://demosupportphanmem.uneti.edu.vn/Pages/Home.aspx',
    moduleActive: false,
    roleActive: ['GV', 'SV'],
  },
  {
    title: 'Tra cứu thông tin tài sản',
    desc: 'Quét QR để tra cứu thông tin tài sản.',
    icon: icoTCTTTS,
    path: '/taisan',
    moduleActive: false,
    roleActive: ['GV', 'SV'],
  },
  {
    title: 'Quản lý chi tiết công việc',
    desc: 'Hệ thống quản lý chi tiết công việc cán bộ phòng, ban.',
    icon: icoQLCTCV,
    path: 'https://uneti.edu.vn/',
    moduleActive: false,
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
        desc: ``,
        path: '/capbangdiem',
        limited: false,
        visiable: true,
        stt: 1,
      },
      {
        title: 'Xác nhận',
        desc: ``,
        path: '/xacnhan',
        limited: false,
        visiable: true,
        stt: 2,
      },
      {
        title: 'Đăng ký tốt nghiệp (xét, hoãn, thi)',
        desc: ``,
        path: '/dangkytotnghiep',
        limited: false,
        visiable: true,
        stt: 3,
      },
      {
        title: 'Cấp bản sao',
        desc: ``,
        path: '/capbansao',
        limited: true,
        visiable: true,
        stt: 4,
      },
      {
        title: 'Sửa thông tin (Văn bằng, chứng chỉ)',
        desc: ``,
        path: '/suathongtin',
        limited: true,
        visiable: true,
        stt: 5,
      },
      {
        title: 'Miễn chứng chỉ',
        desc: ``,
        path: '/mienchungchi',
        limited: true,
        visiable: true,
        stt: 6,
      },
      {
        title: 'Chuyển điểm',
        desc: ``,
        path: '/chuyendiem',
        limited: false,
        visiable: true,
        stt: 7,
      },
      {
        title: 'Xử lý vấn đề Email/LMS',
        desc: ``,
        path: '/emaillms',
        limited: false,
        visiable: true,
        stt: 8,
      },
      {
        title: 'Đăng ký học lớp chất lượng',
        desc: ``,
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
        title: 'Cấp lại',
        desc: ``,
        path: '/caplai',
        limited: true,
        visiable: true,
        stt: 1,
      },
      {
        title: 'Xác nhận',
        desc: ``,
        path: '/xacnhan',
        limited: false,
        visiable: true,
        stt: 2,
      },
      {
        title: 'Quá trình học',
        desc: ``,
        path: '/quatrinhhoc',
        limited: true,
        visiable: true,
        stt: 3,
      },
      {
        title: 'Nghỉ học tạm thời',
        desc: ``,
        path: '/nghihoctamthoi',
        limited: true,
        visiable: true,
        stt: 4,
      },
      {
        title: 'Xin chuyển',
        desc: ``,
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
        desc: ``,
        path: '/giaygioithieu',
        limited: true,
        visiable: true,
        stt: 1,
      },
    ],
  },
]

export const homeTTBGD = [{}]

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
