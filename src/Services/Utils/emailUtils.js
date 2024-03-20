import { apiSendEmailUNETI } from '../../Apis/Emails/apiEmail'

export const emailRegexCheckByGroup =
  /^(([\w-]+\.)+[\w-]+|([a-zA-Z]{1}|[\w-]{2,}))@((([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\.([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\.([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\.([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])){1}|([a-zA-Z0-9]+[\w-]+\.)+[a-zA-Z]{1}[a-zA-Z0-9-]{1,23})$/gm

export const isValidEmail = (email = '') => {
  return emailRegexCheckByGroup.test(email)
}

export const validateEmail = (email) => {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return regex.test(email)
}

// CONTENT SEND EMAIL
export const TEMPLATE_SUBJECT_RECEIVED_EMAIL = 'RECEIVED'
export const TEMPLATE_SUBJECT_PENDING_EMAIL = 'PENDING'
export const TEMPLATE_SUBJECT_SUCCESS_EMAIL = 'SUCCESS'
export const TEMPLATE_SUBJECT_CANCEL_EMAIL = 'CANCEL'
// 1. Trả lời yêu cầu gửi lên
// 2. Trả lời tiếp nhận yêu cầu
// 3. Trả lời cập nhật trạng thái xử lý
// 4. Trả lời hoàn thành
export const sendEmailTTHCGiangVien = async (
  action = '',
  contentSubject = '',
  dataUserSuggest = {},
  dataUserHandle = {},
  listThanhPhanHoSo = [],
  contentReply = '',
  linkFileKemTheo = '',
  tenFileKemTheo = '',
  dataFileKemTheo = '',
  toEmail = null,
) => {
  if (contentReply == '') {
    contentReply = `Chúng tôi sẽ hồi âm lại kết quả ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()} hoặc hướng giải quyết phù hợp trong thời gian sớm nhất.`
  }

  let listThanhPhanHoSoHtml = ``

  for (let i = 0; i < listThanhPhanHoSo.length; i++) {
    listThanhPhanHoSoHtml += `<p> &#160;&#160;&#160;&#160;&#160; &#8722; ${listThanhPhanHoSo[i]?.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo}</p>`
  }

  let subjectEmail = ''
  let contentTitle = ''
  if (action == TEMPLATE_SUBJECT_RECEIVED_EMAIL) {
    subjectEmail = `Thông báo ${contentSubject.toUpperCase()} - Đề nghị ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()} (Email tự động, vui lòng không trả lời)`
    contentTitle = 'tiếp nhận'
  } else if (action == TEMPLATE_SUBJECT_PENDING_EMAIL) {
    subjectEmail = `Thông báo trả lời ${contentSubject.toUpperCase()} - Đề nghị ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()} (Email tự động, vui lòng không trả lời)`
    contentTitle = 'xử lý'
  } else if (action == TEMPLATE_SUBJECT_SUCCESS_EMAIL) {
    subjectEmail = `Thông báo HOÀN THÀNH - Đề nghị ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()} (Email tự động, vui lòng không trả lời)`
    contentTitle = 'hoàn thành'
  } else if (action == TEMPLATE_SUBJECT_CANCEL_EMAIL) {
    subjectEmail = `Thông báo HỦY/TRẢ HỒ SƠ - Đề nghị ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()} (Email tự động, vui lòng không trả lời)`
    contentTitle = 'hủy/trả'
  }

  let emailHtml = `
        <div>
            <p>Kính gửi thầy/cô: <b>${dataUserSuggest?.HoTen}</b>,</p>
        </div>
        <div>
            <p>Chúng tôi đã ${contentTitle} đề nghị ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()} của quý thầy/cô, với thông tin như sau:</p>
        </div>
        <div>
            <h4 style="margin-bottom: 0;">A. THÔNG TIN NGƯỜI GỬI:</h4>
            <p style="margin: 0;">1.1. Mã nhân sự: <b>${
              dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu
            }</b></p>
            <p style="margin: 0;">1.2. Họ và tên: <b>${dataUserSuggest?.HoTen}</b></p>
            <p style="margin: 0;">1.3. Đơn vị quản lý nhân sự: <b>${
              dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa
            }</b></p>
        </div>
        <div>
            <h4 style="margin-bottom: 0;">B. NỘI DUNG ĐỀ NGHỊ: ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()}</h4>
            <p style="margin: 0;">2.1. Danh sách hồ sơ tiếp nhận: ${listThanhPhanHoSoHtml}</p>
            <p style="margin: 0;">2.2. Nội dung yêu cầu: ${
              dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu
            }</p>
            <p style="margin: 0;">2.3. Số lượng bản in kết quả đề nghị: ${
              dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong
            }</p>
        </div>
        <div>
            <h4 style="margin-bottom: 0;">C. NỘI DUNG TRẢ LỜI:</h4>
            <p style="margin: 0;">&emsp;&emsp;${contentReply}</p>
            ${linkFileKemTheo !== '' ? `<p>Quý Thầy/Cô vui lòng tải tệp tại đây: ${linkFileKemTheo}</p>` : ''}
        </div>
        <div>
            <p>Thân chào!</p>
        </div>
        <div>
            <h4 style="margin-bottom: 0;">LƯU Ý:</h4>
            <p style="margin: 0;">- Đây là email tự động, vui lòng không trả lời (no reply), chúng tôi sẽ không nhận được email của Thầy/Cô,</p>
            <p style="margin: 0;">- Nếu cần tư vấn hoặc giải đáp thắc mắc về NỘI DUNG GIẢI QUYẾT ĐỀ NGHỊ. Thầy/Cô vui lòng liên hệ (trong giờ hành chính) với nhân sự sau:</p>
            <p style="margin: 0;">&emsp;+ Họ và tên: ${
              dataUserHandle?.HoDem + ' ' + dataUserHandle?.Ten
            }</p>
            <p style="margin: 0;">&emsp;+ Điện thoại: ${dataUserHandle?.SoDienThoai}</p>
            <p style="margin: 0;">&emsp;+ Email: ${dataUserHandle?.Email}</p>
        </div>
    `

  const dataSendEmail = {
    to: toEmail
      ? toEmail
      : dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email,
    subject: subjectEmail,
    text: '',
    tenfile: tenFileKemTheo,
    dulieu: dataFileKemTheo,
    html: emailHtml,
  }
  const res = await apiSendEmailUNETI(dataSendEmail)
  return res
}

export const sendEmailTTHCGV_MucDo2 = async (
  contentSubject,
  dataUserSuggest,
  dataUserHandle,
  contentReply,
  toEmail,
  timeWork,
  locationWork,
  linkFileKemTheo,
  tenFileKemTheo,
  dataFileKemTheo,
  listThanhPhanHoSo,
) => {
  let subjectEmail = `Thông báo ${contentSubject.toUpperCase()} - Đề nghị ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()} (Email tự động, vui lòng không trả lời)`

  let listThanhPhanHoSoHtml = ``

  for (let i = 0; i < listThanhPhanHoSo.length; i++) {
    listThanhPhanHoSoHtml += `<p> &#160;&#160;&#160;&#160;&#160; &#8722; ${listThanhPhanHoSo[i]?.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo}</p>`
  }

  let emailHtml = `
        <div>
            <p>Kính gửi thầy/cô: <b>${dataUserSuggest?.HoTen}</b>,</p>
        </div>
        <div>
            <p>Chúng tôi đã ${contentSubject.toLowerCase()} đề nghị ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()} của quý thầy/cô, với thông tin như sau:</p>
        </div>
        <div>
            <h4 style="margin-bottom: 0;">A. THÔNG TIN NGƯỜI GỬI:</h4>
            <p style="margin: 0;">1.1. Mã nhân sự: <b>${
              dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu
            }</b></p>
            <p style="margin: 0;">1.2. Họ và tên: <b>${dataUserSuggest?.HoTen}</b></p>
            <p style="margin: 0;">1.3. Đơn vị quản lý nhân sự: <b>${
              dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa
            }</b></p>
        </div>
        <div>
            <h4 style="margin-bottom: 0;">B. NỘI DUNG ĐỀ NGHỊ: ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()}</h4>
            <p style="margin: 0;">2.1. Danh sách hồ sơ tiếp nhận: ${listThanhPhanHoSoHtml}</p>
            <p style="margin: 0;">2.2. Nội dung yêu cầu: ${
              dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu
            }</p>
        </div>
        <div>
            <h4 style="margin-bottom: 0;">C. NỘI DUNG TRẢ LỜI:</h4>
            ${locationWork || timeWork ? `<p>- Quý thầy/cô vui lòng đến địa điểm: <b>${locationWork}</b>, ngày ${timeWork.slice(0, 10)} - lúc ${timeWork.slice(10)}</p>` : ''}
            ${contentReply ? `<p>- ${contentReply} <p>` : ''}
            ${linkFileKemTheo !== '' ? `<p>Quý Thầy/Cô vui lòng tải tệp tại đây: ${linkFileKemTheo}</p>` : ''}
        </div>
        <div>
            <p>Thân chào!</p>
        </div>
        <div>
            <h4 style="margin-bottom: 0;">LƯU Ý:</h4>
            <p style="margin: 0;">- Đây là email tự động, vui lòng không trả lời (no reply), chúng tôi sẽ không nhận được email của bạn,</p>
            <p style="margin: 0;">- Nếu cần tư vấn hoặc giải đáp thắc mắc về NỘI DUNG GIẢI QUYẾT ĐỀ NGHỊ. Thầy/Cô vui lòng liên hệ (trong giờ hành chính) với nhân sự sau:</p>
            <p>&emsp;+ Họ và tên: ${
              dataUserHandle?.HoDem + ' ' + dataUserHandle?.Ten
            }</p>
            <p style="margin: 0;">&emsp;+ Điện thoại: ${dataUserHandle?.SoDienThoai ?? dataUserHandle?.SoDiDong}</p>
            <p style="margin: 0;">&emsp;+ Email: ${dataUserHandle?.Email ?? dataUserHandle?.EmailUneti}</p>
        </div>
    `

  const dataSendEmail = {
    to: toEmail,
    subject: subjectEmail,
    text: '',
    tenfile: tenFileKemTheo,
    dulieu: dataFileKemTheo,
    html: emailHtml,
  }
  const res = await apiSendEmailUNETI(dataSendEmail)
  return res
}

export const sendEmailTTHCGV_CBNV_TP = async (
  contentSubject = '',
  dataUserSuggest = {},
  dataUserHandle = {},
  listThanhPhanHoSo = [],
  contentEmail,
  linkFileKemTheo = '',
  tenFileKemTheo = '',
  dataFileKemTheo = '',
  toEmailTruongPhong = null,
) => {
  let listThanhPhanHoSoHtml = ``

  for (let i = 0; i < listThanhPhanHoSo.length; i++) {
    listThanhPhanHoSoHtml += `<p> &#160;&#160;&#160;&#160;&#160; &#8722; ${listThanhPhanHoSo[i]?.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo}</p>`
  }

  let subjectEmail = `Thông báo ${contentSubject.toUpperCase()} - Đề nghị ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()} (Email tự động, vui lòng không trả lời)`

  let emailHtml = `
        <div>
            <p>Kính gửi Thầy/Cô Trưởng phòng,</p>
        </div>
        <div>
            <p>Chúng tôi đã xem xét đề nghị ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()} của quý Thầy/Cô ${dataUserSuggest?.HoTen}, với thông tin như sau:</p>
        </div>
        <div>
            <h4 style="margin-bottom: 0;">A. THÔNG TIN ĐỀ NGHỊ:</h4>
            <p style="margin: 0;">&emsp;&emsp;1. Mã nhân sự: <b>${
              dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu
            }</b></p>
            <p style="margin: 0;">&emsp;&emsp;2. Họ và tên: <b>${dataUserSuggest?.HoTen}</b></p>
            <p style="margin: 0;">&emsp;&emsp;3. Đơn vị quản lý nhân sự: <b>${
              dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa
            }</b></p>

            <h4 style="margin-bottom: 0;">B. NỘI DUNG ĐỀ NGHỊ:</h4>
            <p style="margin: 0;">&emsp;&emsp;1. Danh sách hồ sơ tiếp nhận: <b>${listThanhPhanHoSoHtml}</b></p>
            <p style="margin: 0;">&emsp;&emsp;2. Nội dung đề nghị: ${
              dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu
            }</p>
            <p style="margin: 0;">&emsp;&emsp;3. Số lượng bản in kết quả đề nghị: <b>${
              dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong
            }</b></p>

            <h4 style="margin-bottom: 0;">C. NỘI DUNG TRẢ LỜI: ĐÃ TRÌNH TRƯỜNG/PHÓ ĐƠN VỊ PHÊ DUYỆT</h4>
            <p>&emsp;&emsp;${contentEmail}</p>
            ${linkFileKemTheo !== '' ? `<p>Quý Thầy/Cô Trưởng/Phó đơn vị vui lòng tải tệp tại đây: ${linkFileKemTheo}</p>` : ''}
        </div>
        <div>
            <p>Trân trọng!</p>
        </div>
        <div>
            <h4 style="margin-bottom: 0;">LƯU Ý:</h4>
            <p style="margin: 0;">- Đây là email tự động, vui lòng không trả lời (no reply), chúng tôi sẽ không nhận được email của Thầy/Cô,</p>
            <p style="margin: 0;">- Nếu cần tư vấn hoặc giải đáp thắc mắc về NỘI DUNG GIẢI QUYẾT ĐỀ NGHỊ. Thầy/Cô vui lòng liên hệ (trong giờ hành chính) với nhân sự sau:</p>
            <p style="margin: 0;">&emsp;+ Họ và tên: ${
              dataUserHandle?.HoDem + ' ' + dataUserHandle?.Ten
            }</p>
            <p style="margin: 0;">&emsp;+ Điện thoại: ${dataUserHandle?.SoDienThoai}</p>
            <p style="margin: 0;">&emsp;+ Email: ${dataUserHandle?.Email}</p>
        </div>
    `

  const dataSendEmail = {
    to: toEmailTruongPhong,
    subject: subjectEmail,
    text: '',
    tenfile: tenFileKemTheo,
    dulieu: dataFileKemTheo,
    html: emailHtml,
  }
  const res = await apiSendEmailUNETI(dataSendEmail)
  return res
}

export const sendEmailTTHCGV_TP_CBNV = async (
  contentSubject = '',
  dataUserSuggest = {},
  dataUserHandle = {},
  listThanhPhanHoSo = [],
  noiDungLyDo,
  linkFileKemTheo,
  tenFileKemTheo = '',
  dataFileKemTheo = '',
  toEmailCBNV = null,
) => {
  let listThanhPhanHoSoHtml = ``

  for (let i = 0; i < listThanhPhanHoSo.length; i++) {
    listThanhPhanHoSoHtml += `<p> &#160;&#160;&#160;&#160;&#160; &#8722; ${listThanhPhanHoSo[i]?.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo}</p>`
  }

  let subjectEmail = `Thông báo ${contentSubject.toUpperCase()} - Đề nghị ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()} (Email tự động, vui lòng không trả lời)`

  let emailHtml = `
        <div>
            <p>Kính gửi Thầy/Cô Cán bộ nghiệp vụ,</p>
        </div>
        <div>
            <p>Tôi đã xem xét đề nghị ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()} của quý Thầy/Cô ${dataUserSuggest?.HoTen}, với thông tin như sau:</p>
        </div>
        <div>
            <h4 style="margin-bottom: 0;">A. THÔNG TIN ĐỀ NGHỊ:</h4>
            <p style="margin: 0;"><b>1. Người đề nghị</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.1. Mã nhân sự: <b>${
              dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu
            }</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.2. Họ và tên: <b>${dataUserSuggest?.HoTen}</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.3. Đơn vị quản lý nhân sự: <b>${
              dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa
            }</b></p>

            <h4 style="margin-bottom: 0;">2. Nội dung đề nghị:</h4>
            <p style="margin: 0;">&emsp;&emsp;2.1. Danh sách hồ sơ tiếp nhận: <b>${listThanhPhanHoSoHtml}</b></p>
            <p style="margin: 0;">&emsp;&emsp;2.2. Nội dung đề nghị: ${
              dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu
            }</p>
            <p style="margin: 0;">&emsp;&emsp;2.3. Số lượng bản in kết quả đề nghị: <b>${
              dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong
            }</b></p>
        </div>
        <div>
            <h4 style="margin-bottom: 0;">B. THÔNG TIN PHÊ DUYỆT:</h4>
            <p style="margin: 0;"><b>1. Trạng thái phê duyệt: ${contentSubject}</b></p>
            <p style="margin: 0;"><b>2. Lý do:</b></p>
            <p style="margin: 0;">&emsp;&emsp;${noiDungLyDo}</p>
            ${linkFileKemTheo !== '' ? `<p>Quý Thầy/Cô vui lòng tải tệp tại đây: ${linkFileKemTheo}</p>` : ''}
        </div>
        <div>
            <p>Trân trọng!</p>
        </div>
        <div>
            <h4 style="margin-bottom: 0;">LƯU Ý:</h4>
            <p style="margin: 0;">- Đây là email tự động, vui lòng không trả lời (no reply), chúng tôi sẽ không nhận được email của Thầy/Cô,</p>
            <p style="margin: 0;">- Nếu cần tư vấn hoặc giải đáp thắc mắc về NỘI DUNG GIẢI QUYẾT ĐỀ NGHỊ. Thầy/Cô vui lòng liên hệ (trong giờ hành chính) với nhân sự sau:</p>
            <p style="margin: 0;">&emsp;+ Họ và tên: ${
              dataUserHandle?.HoDem + ' ' + dataUserHandle?.Ten
            }</p>
            <p style="margin: 0;">&emsp;+ Điện thoại: ${dataUserHandle?.SoDienThoai}</p>
            <p style="margin: 0;">&emsp;+ Email: ${dataUserHandle?.Email}</p>
        </div>
    `

  const dataSendEmail = {
    to: toEmailCBNV,
    subject: subjectEmail,
    text: '',
    tenfile: tenFileKemTheo,
    dulieu: dataFileKemTheo,
    html: emailHtml,
  }
  const res = await apiSendEmailUNETI(dataSendEmail)
  return res
}

export const sendEmailTTHCGV_TP_BGH = async (
  contentSubject = 'Trình duyệt',
  dataUserSuggest = {},
  dataUserHandle = {},
  listThanhPhanHoSo = [],
  noiDungTrinhDuyet,
  linkFileKemTheo,
  tenFileKemTheo = '',
  dataFileKemTheo = '',
  toEmailCBNV = null,
) => {
  let listThanhPhanHoSoHtml = ``

  for (let i = 0; i < listThanhPhanHoSo.length; i++) {
    listThanhPhanHoSoHtml += `<p> &#160;&#160;&#160;&#160;&#160; &#8722; ${listThanhPhanHoSo[i]?.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo}</p>`
  }

  let subjectEmail = `Thông báo ${contentSubject.toUpperCase()} - Đề nghị ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()} (Email tự động, vui lòng không trả lời)`

  let emailHtml = `
        <div>
            <p>Kính gửi Ban giám hiệu,</p>
        </div>
        <div>
            <p>${dataUserSuggest.MC_TTHC_GV_NoiTiepNhan} đã xem xét và xử lý đề nghị ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()} của quý Thầy/Cô ${dataUserSuggest?.HoTen}, với thông tin như sau:</p>
        </div>
        <div>
            <h4 style="margin-bottom: 0;">A. THÔNG TIN ĐỀ NGHỊ:</h4>
            <p style="margin: 0;"><b>1. Người đề nghị</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.1. Mã nhân sự: <b>${
              dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu
            }</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.2. Họ và tên: <b>${dataUserSuggest?.HoTen}</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.3. Đơn vị quản lý nhân sự: <b>${
              dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa
            }</b></p>

            <b>2. Nội dung đề nghị:</b>
            <p style="margin: 0;">&emsp;&emsp;2.1. Danh sách hồ sơ tiếp nhận: <b>${listThanhPhanHoSoHtml}</b></p>
            <p style="margin: 0;">&emsp;&emsp;2.2. Nội dung đề nghị: ${
              dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu
            }</p>
            <p style="margin: 0;">&emsp;&emsp;2.3. Số lượng bản in kết quả đề nghị: <b>${
              dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong
            }</b></p>
        </div>
        <div>
            <h4 style="margin-bottom: 0;">B. THÔNG TIN TRÌNH DUYỆT:</h4>
            <p style="margin: 0;"><b>1. Người trình duyệt</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.1. Mã nhân sự: <b>${
              dataUserHandle?.MaNhanSu
            }</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.2. Họ và tên: <b>${dataUserHandle?.HoDem + ' ' + dataUserHandle?.Ten}</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.3. Đơn vị quản lý nhân sự: <b>${
              dataUserHandle?.HienTaiPhongBan
            }</b></p>

            <b>2. Nội dung trình duyệt:</b>
            <p style="margin: 0;">&emsp;&emsp;${noiDungTrinhDuyet}</p>
            ${linkFileKemTheo !== '' ? `<p>Quý Thầy/Cô Ban giám hiệu vui lòng tải tệp tại đây: ${linkFileKemTheo}</p>` : ''}
        </div>
        <div>
            <p>Trân trọng!</p>
        </div>
        <div>
            <b>LƯU Ý:</b>
            <p style="margin: 0;">- Đây là email tự động, vui lòng không trả lời (no reply), chúng tôi sẽ không nhận được email của Thầy/Cô,</p>
            <p style="margin: 0;">- Nếu cần tư vấn hoặc giải đáp thắc mắc về NỘI DUNG GIẢI QUYẾT ĐỀ NGHỊ. Thầy/Cô vui lòng liên hệ (trong giờ hành chính) với nhân sự sau:</p>
            <p style="margin: 0;">&emsp;+ Họ và tên: ${
              dataUserHandle?.HoDem + ' ' + dataUserHandle?.Ten
            }</p>
            <p style="margin: 0;">&emsp;+ Điện thoại: ${dataUserHandle?.SoDienThoai}</p>
            <p style="margin: 0;">&emsp;+ Email: ${dataUserHandle?.Email}</p>
        </div>
    `

  const dataSendEmail = {
    to: toEmailCBNV,
    subject: subjectEmail,
    text: '',
    tenfile: tenFileKemTheo,
    dulieu: dataFileKemTheo,
    html: emailHtml,
  }
  const res = await apiSendEmailUNETI(dataSendEmail)
  return res
}
