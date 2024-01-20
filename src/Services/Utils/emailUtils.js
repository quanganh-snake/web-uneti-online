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
    dataUserSuggest = {},
    dataUserHandle = {},
    listThanhPhanHoSo = [],
    contentReply = '',
    tenFileKemTheo = '',
    dataFileKemTheo = '',
) => {
    if (contentReply == '') {
        contentReply = `Chúng tôi sẽ hồi âm lại kết quả ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()} hoặc hướng giải quyết phù hợp trong thời gian sớm nhất.`
    }

    let listThanhPhanHoSoHtml = ``

    for (let i = 0; i < listThanhPhanHoSo.length; i++) {
        listThanhPhanHoSoHtml += `<p>${listThanhPhanHoSo[i]?.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo}</p>`
    }

    let subjectEmail = ''

    if (action == TEMPLATE_SUBJECT_RECEIVED_EMAIL) {
        subjectEmail = `Thông báo trả lời tiếp nhận đề nghị ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()} (Email tự động, vui lòng không trả lời)`
    } else if (action == TEMPLATE_SUBJECT_PENDING_EMAIL) {
        subjectEmail = `Thông báo trả lời xử lý đề nghị ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()} (Email tự động, vui lòng không trả lời)`
    } else if (action == TEMPLATE_SUBJECT_SUCCESS_EMAIL) {
        subjectEmail = `Thông báo hoàn thành đề nghị ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()} (Email tự động, vui lòng không trả lời)`
    } else if (action == TEMPLATE_SUBJECT_CANCEL_EMAIL) {
        subjectEmail = `Thông báo hủy/trả hồ sơ đề nghị ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()} (Email tự động, vui lòng không trả lời)`
    }

    let emailHtml = `
        <div>
            <p>Kính gửi thầy/cô: <b>${dataUserSuggest?.HoTen}</b>,</p>
        </div>
        <div>
            <p>Chúng tôi đã tiếp nhận đề nghị ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()} của quý thầy/cô, với thông tin như sau:</p>
        </div>
        <div>
            <h4>A. THÔNG TIN NGƯỜI GỬI:</h4>
            <p>1.1. Mã nhân sự: <b>${
                dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu
            }</b></p>
            <p>1.2. Họ và tên: <b>${dataUserSuggest?.HoTen}</b></p>
            <p>1.3. Đơn vị quản lý nhân sự: <b>${
                dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa
            }</b></p>
        </div>
        <div>
            <h4>B. NỘI DUNG ĐỀ NGHỊ: ${dataUserSuggest?.MC_TTHC_GV_TenThuTuc.toUpperCase()}</h4>
            <p>2.1. Danh sách hồ sơ tiếp nhận: ${listThanhPhanHoSoHtml}</p>
            <p>2.2. Nội dung yêu cầu: ${
                dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu
            }</p>
            <p>2.3. Số lượng bản in: ${
                dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong
            }</p>
        </div>
        <div>
            <h4>C. NỘI DUNG TRẢ LỜI:</h4> <span>${contentReply}</span>
        </div>
        <div>
            <p>Thân chào!</p>
        </div>
        <div>
            <h4>LƯU Ý:</h4>
            <p>- Đây là email tự động, vui lòng không trả lời (no reply), chúng tôi sẽ không nhận được email của bạn,</p>
            <p>- Nếu bạn không hiểu nội dung email này, đơn giản hãy xóa nó đi. Hoặc liên hệ lại với chúng tôi theo thông tin bên dưới,</p>
            <p>- Nếu cần tư vấn hoặc giải đáp thắc mắc về NỘI DUNG GIẢI QUYẾT ĐỀ NGHỊ. Bạn vui lòng liên hệ (trong giờ hành chính) với Thầy/Cô sau:</p>
            <p>&emsp;+ Họ và tên: ${
                dataUserHandle?.HoDem + ' ' + dataUserHandle?.Ten
            }</p>
            <p>&emsp;+ Điện thoại: ${dataUserHandle?.SoDienThoai}</p>
            <p>&emsp;+ Email: ${dataUserHandle?.Email}</p>
        </div>
    `

    const dataSendEmail = {
        to: dataUserSuggest?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email,
        subject: subjectEmail,
        text: '',
        tenfile: tenFileKemTheo,
        dulieu: dataFileKemTheo,
        html: emailHtml,
    }
    const res = await apiSendEmailUNETI(dataSendEmail)
    return res
}
