// import PropTypes from 'prop-types'
import { convertDataFileToBase64 } from '@/Services/Utils/stringUtils'
import clsx from 'clsx'
import { useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import Swal from 'sweetalert2'
import { FaTrash } from 'react-icons/fa6'
import { NguonTiepNhan_WEB } from '@/Services/Static/dataStatic'
import {
  TEMPLATE_SUBJECT_CANCEL_EMAIL,
  TEMPLATE_SUBJECT_PENDING_EMAIL,
  TEMPLATE_SUBJECT_RECEIVED_EMAIL,
  sendEmailTTHCGiangVien,
} from '@/Services/Utils/emailUtils'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import { putHoSoThuTucGuiYeuCauById } from '@/Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'
import { getTrangThaiIDBySTTYeuCauId } from '@/Apis/ThuTucHanhChinhGiangVien/apiTrangThai'
import { MC_TTHC_GV_DoiTuongXuLy_PheDuyet } from '../constants'

const FormGuiEmailThongBaoXuLy = (props) => {
  const {
    infoStatus,
    dataDetailYeuCau,
    dataDetailTPHSYeuCau,
    currentStatusId,
    stepHandle,
    listStatus,
    mucDoId,
    contentEmail,
    onContentEmail,
    linkAttachedFile,
    dataAttachedFile,
    onLinkAttachedFile,
    onAttachedFile,
    isTPXacNhanPheDuyet,
    onTPXacNhanPheDuyet,
    isBGHXacNhanPheDuyet,
    onBGHXacNhanPheDuyet,
  } = props

  const dataCBGV = DataCanBoGV()

  // Event handlers
  // Tiếp nhận hồ sơ
  const handleTiepNhanHoSo = () => {
    let newDataUpdate
    if (currentStatusId === 0) {
      Swal.fire({
        icon: 'question',
        title: 'Bạn chắc chắn muốn tiếp nhận hồ sơ này?',
        html: `
            <ul style='display: flex; flex-direction: column; align-items: flex-start'>
                ${contentEmail.trim() === '' ? '<li>- Nội dung thông báo email không có.</li>' : ''}
                ${linkAttachedFile.trim() === '' ? '<li>- Link tệp đính kèm không có.</li>' : ''}
                ${dataAttachedFile.MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile.trim() === '' ? '<li>- Tệp đính kèm không có.</li>' : ''}
            </ul>
            <b style='color: red'>${contentEmail.trim() === '' || linkAttachedFile.trim() === '' || dataAttachedFile.MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile.trim() === '' ? 'Bạn vẫn muốn gửi thông báo email mà không cần đầy đủ thông tin trên?' : 'Gửi email thông báo đến người nộp hồ sơ'}</b>
        `,
        showConfirmButton: true,
        confirmButtonText: 'Đồng ý',
        showCancelButton: true,
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resNewTrangThaiID = await getTrangThaiIDBySTTYeuCauId(
            dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_YeuCau_ID,
            1,
          )
          if (resNewTrangThaiID.status === 200) {
            const dataTrangThaiIDNew = await resNewTrangThaiID.data?.body[0]

            newDataUpdate = {
              MC_TTHC_GV_GuiYeuCau_ID: dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_ID,
              MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu:
                dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu,
              MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email:
                dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email,
              MC_TTHC_GV_GuiYeuCau_NhanSuGui_SDT:
                dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NhanSuGui_SDT,
              MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa:
                dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa,
              MC_TTHC_GV_GuiYeuCau_YeuCau_ID:
                dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_YeuCau_ID,
              MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu:
                dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu,
              MC_TTHC_GV_GuiYeuCau_TrangThai_ID:
                dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_ID,
              MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu:
                dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_TenTrangThai,
              MC_TTHC_GV_GuiYeuCau_NgayGui:
                dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NgayGui,
              MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong:
                dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong,
              MC_TTHC_GV_GuiYeuCau_DaNop:
                dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_DaNop,
              MC_TTHC_GV_GuiYeuCau_NgayHenTra:
                dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NgayHenTra,
              MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile: '',
              MC_TTHC_GV_GuiYeuCau_TraKetQua_DataFile: null,
              MC_TTHC_GV_GuiYeuCau_TrangThaiPheDuyetTruongPhong: null,
              MC_TTHC_GV_GuiYeuCau_MoTaTTPheDuyetTruongPhong: '',
              MC_TTHC_GV_GuiYeuCau_TrangThaiPheDuyetBGH: null,
              MC_TTHC_GV_GuiYeuCau_MoTaTTPheDuyetBGH: '',
              MC_TTHC_GV_GuiYeuCau_NgayGiaoTra:
                dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NgayGiaoTra,
              MC_TTHC_GV_GuiYeuCau_NoiTraKetQua:
                dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NoiTraKetQua,
              MC_TTHC_GV_GuiYeuCau_NguonTiepNhan: NguonTiepNhan_WEB,
            }
          }

          const resPutHoSoThuTuc =
            await putHoSoThuTucGuiYeuCauById(newDataUpdate)
          if (resPutHoSoThuTuc.status === 200) {
            Swal.fire({
              title: 'Thông báo',
              text: 'Đã tiếp nhận hồ sơ! Tiếp tục xử lý yêu cầu!',
              icon: 'success',
            })

            sendEmailTTHCGiangVien(
              TEMPLATE_SUBJECT_RECEIVED_EMAIL,
              'tiếp nhận',
              { ...dataDetailYeuCau, ...newDataUpdate },
              dataCBGV,
              dataDetailTPHSYeuCau,
              contentEmail,
              newDataUpdate?.MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile.trim() !==
                ''
                ? newDataUpdate?.MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile.trim()
                : null,
              newDataUpdate?.MC_TTHC_GV_GuiYeuCau_TraKetQua_DataFile
                ? newDataUpdate?.MC_TTHC_GV_GuiYeuCau_TraKetQua_DataFile
                : null,
            ).then(() => console.log('SEND EMAIL OK'))
          } else {
            return Swal.fire({
              icon: 'error',
              title:
                'Không tìm thấy trạng thái được thiết lập cho hồ sơ này để tiến hành cập nhật!',
            })
          }
        } else {
          Swal.fire('Đã dừng việc tiếp nhận hồ sơ', '', 'info')
        }
      })
    } else {
      return Swal.fire({
        icon: 'error',
        title: 'Hồ sơ đã được tiếp nhận!',
        text: 'Vui lòng thao tác xử lý tại các bước tiếp theo!',
      })
    }
  }

  // Gửi thông báo xử lý yêu cầu
  const handleThongBaoXuLyHoSo = () => {
    let newDataUpdate
    if (currentStatusId !== 0) {
      // Trường hợp Trạng thái không có đối tượng phê duyệt
      if (
        !infoStatus.MC_TTHC_GV_TrangThai_DoiTuongXuLy ||
        infoStatus.MC_TTHC_GV_TrangThai_DoiTuongXuLy === 0
      ) {
        Swal.fire({
          icon: 'question',
          title: 'Xác nhận hoàn thành bước này và chuyển tới bước tiếp theo?',
          html: `
                <ul style='display: flex; flex-direction: column; align-items: flex-start'>
                    ${contentEmail.trim() === '' ? '<li>- Nội dung thông báo email không có.</li>' : ''}
                    ${linkAttachedFile.trim() === '' ? '<li>- Link tệp đính kèm không có.</li>' : ''}
                    ${dataAttachedFile.MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile.trim() === '' ? '<li>- Tệp đính kèm không có.</li>' : ''}
                </ul>
                <b style='color: red'>${contentEmail.trim() === '' || linkAttachedFile.trim() === '' || dataAttachedFile.MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile.trim() === '' ? 'Bạn vẫn muốn gửi thông báo email mà không cần đầy đủ thông tin trên?' : 'Gửi email thông báo đến người nộp hồ sơ'}</b>
            `,
          showConfirmButton: true,
          confirmButtonText: 'Đồng ý',
          showCancelButton: true,
          cancelButtonText: 'Hủy',
        }).then(async (result) => {
          if (result.isConfirmed) {
            const resNewTrangThaiID = await getTrangThaiIDBySTTYeuCauId(
              dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_YeuCau_ID,
              dataDetailYeuCau.MC_TTHC_GV_TrangThai_STT + 1,
            )
            if (resNewTrangThaiID.status === 200) {
              const dataTrangThaiIDNew = await resNewTrangThaiID.data?.body[0]

              newDataUpdate = {
                MC_TTHC_GV_GuiYeuCau_ID:
                  dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_ID,
                MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu:
                  dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu,
                MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email:
                  dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email,
                MC_TTHC_GV_GuiYeuCau_NhanSuGui_SDT:
                  dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NhanSuGui_SDT,
                MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa:
                  dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa,
                MC_TTHC_GV_GuiYeuCau_YeuCau_ID:
                  dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_YeuCau_ID,
                MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu:
                  dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu,
                MC_TTHC_GV_GuiYeuCau_TrangThai_ID:
                  dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_ID,
                MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu:
                  dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_TenTrangThai,
                MC_TTHC_GV_GuiYeuCau_NgayGui:
                  dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NgayGui,
                MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong:
                  dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong,
                MC_TTHC_GV_GuiYeuCau_DaNop:
                  dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_DaNop,
                MC_TTHC_GV_GuiYeuCau_NgayHenTra:
                  dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NgayHenTra,
                MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile: '',
                MC_TTHC_GV_GuiYeuCau_TraKetQua_DataFile: null,
                MC_TTHC_GV_GuiYeuCau_TrangThaiPheDuyetTruongPhong:
                  dataDetailYeuCau.MC_TTHC_GV_IsTruongPhongPheDuyet,
                MC_TTHC_GV_GuiYeuCau_MoTaTTPheDuyetTruongPhong: '',
                MC_TTHC_GV_GuiYeuCau_TrangThaiPheDuyetBGH:
                  dataDetailYeuCau.MC_TTHC_GV_IsBGHPheDuyet,
                MC_TTHC_GV_GuiYeuCau_MoTaTTPheDuyetBGH: '',
                MC_TTHC_GV_GuiYeuCau_NgayGiaoTra:
                  dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NgayGiaoTra,
                MC_TTHC_GV_GuiYeuCau_NoiTraKetQua:
                  dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NoiTraKetQua,
                MC_TTHC_GV_GuiYeuCau_NguonTiepNhan: NguonTiepNhan_WEB,
              }
            }

            const resPutHoSoThuTuc =
              await putHoSoThuTucGuiYeuCauById(newDataUpdate)
            if (resPutHoSoThuTuc.status === 200) {
              Swal.fire({
                title: 'Thông báo',
                text: `Đã tiếp hoàn thành bước ${infoStatus.MC_TTHC_GV_TrangThai_TenTrangThai} sơ! Tiếp tục xử lý yêu cầu!`,
                icon: 'success',
              })

              sendEmailTTHCGiangVien(
                TEMPLATE_SUBJECT_PENDING_EMAIL,
                infoStatus.MC_TTHC_GV_TrangThai_TenTrangThai,
                { ...dataDetailYeuCau, ...newDataUpdate },
                dataCBGV,
                dataDetailTPHSYeuCau,
                contentEmail,
                newDataUpdate?.MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile.trim() !==
                  ''
                  ? newDataUpdate?.MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile.trim()
                  : null,
                newDataUpdate?.MC_TTHC_GV_GuiYeuCau_TraKetQua_DataFile
                  ? newDataUpdate?.MC_TTHC_GV_GuiYeuCau_TraKetQua_DataFile
                  : null,
              ).then(() => console.log('SEND EMAIL OK'))
            } else {
              return Swal.fire({
                icon: 'error',
                title:
                  'Không tìm thấy trạng thái được thiết lập cho hồ sơ này để tiến hành cập nhật!',
              })
            }
          } else {
            Swal.fire('Đã dừng việc tiếp nhận hồ sơ', '', 'info')
          }
        })
      } else if (
        infoStatus.MC_TTHC_GV_TrangThai_DoiTuongXuLy ===
        parseInt(MC_TTHC_GV_DoiTuongXuLy_PheDuyet[0].id)
      ) {
        //   TH: Trạng thái có đối tượng phê duyệt là Trưởng phòng
        console.log(isTPXacNhanPheDuyet)
        return alert('Bước này cần TP phê duyệt!')
      } else if (
        infoStatus.MC_TTHC_GV_TrangThai_DoiTuongXuLy ===
        parseInt(MC_TTHC_GV_DoiTuongXuLy_PheDuyet[1].id)
      ) {
        //   TH: Trạng thái có đối tượng phê duyệt là Trưởng phòng

        return alert('Bước này cần BGH phê duyệt!')
      }
    } else {
      return Swal.fire({
        icon: 'error',
        title: 'Hồ sơ chưa được tiếp nhận!',
        text: 'Vui lòng tiếp nhận hồ sơ và thực hiện xử lý tuần tự theo các bước!',
      })
    }
  }

  // Hủy trả hồ sơ
  const handleCancelHoSo = () => {
    let newDataUpdate
    if (currentStatusId !== -1) {
      Swal.fire({
        icon: 'question',
        title: 'Bạn chắc chắn muốn hủy trả hồ sơ này?',
        html: `
            <ul style='display: flex; flex-direction: column; align-items: flex-start'>
                ${contentEmail.trim() === '' ? '<li>- Nội dung thông báo email không có.</li>' : ''}
                ${linkAttachedFile.trim() === '' ? '<li>- Link tệp đính kèm không có.</li>' : ''}
                ${dataAttachedFile.MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile.trim() === '' ? '<li>- Tệp đính kèm không có.</li>' : ''}
            </ul>
            <b style='color: red'>${contentEmail.trim() === '' || linkAttachedFile.trim() === '' || dataAttachedFile.MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile.trim() === '' ? 'Bạn vẫn muốn gửi thông báo email mà không cần đầy đủ thông tin trên?' : 'Gửi email thông báo đến người nộp hồ sơ'}</b>
        `,
        showConfirmButton: true,
        confirmButtonText: 'Đồng ý',
        showCancelButton: true,
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          newDataUpdate = {
            MC_TTHC_GV_GuiYeuCau_ID: dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_ID,
            MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu:
              dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu,
            MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email:
              dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email,
            MC_TTHC_GV_GuiYeuCau_NhanSuGui_SDT:
              dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NhanSuGui_SDT,
            MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa:
              dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa,
            MC_TTHC_GV_GuiYeuCau_YeuCau_ID:
              dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_YeuCau_ID,
            MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu:
              dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu,
            MC_TTHC_GV_GuiYeuCau_TrangThai_ID: -1,
            MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu: 'Hủy trả hồ sơ',
            MC_TTHC_GV_GuiYeuCau_NgayGui:
              dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NgayGui,
            MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong:
              dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong,
            MC_TTHC_GV_GuiYeuCau_DaNop:
              dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_DaNop,
            MC_TTHC_GV_GuiYeuCau_NgayHenTra:
              dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NgayHenTra,
            MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile: '',
            MC_TTHC_GV_GuiYeuCau_TraKetQua_DataFile: null,
            MC_TTHC_GV_GuiYeuCau_TrangThaiPheDuyetTruongPhong: null,
            MC_TTHC_GV_GuiYeuCau_MoTaTTPheDuyetTruongPhong: '',
            MC_TTHC_GV_GuiYeuCau_TrangThaiPheDuyetBGH: null,
            MC_TTHC_GV_GuiYeuCau_MoTaTTPheDuyetBGH: '',
            MC_TTHC_GV_GuiYeuCau_NgayGiaoTra:
              dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NgayGiaoTra,
            MC_TTHC_GV_GuiYeuCau_NoiTraKetQua:
              dataDetailYeuCau.MC_TTHC_GV_GuiYeuCau_NoiTraKetQua,
            MC_TTHC_GV_GuiYeuCau_NguonTiepNhan: NguonTiepNhan_WEB,
          }

          const resPutHoSoThuTuc =
            await putHoSoThuTucGuiYeuCauById(newDataUpdate)
          if (resPutHoSoThuTuc.status === 200) {
            Swal.fire({
              title: 'Thông báo',
              text: 'Đã hủy trả hồ sơ!',
              icon: 'success',
            })

            sendEmailTTHCGiangVien(
              TEMPLATE_SUBJECT_CANCEL_EMAIL,
              '',
              { ...dataDetailYeuCau, ...newDataUpdate },
              dataCBGV,
              dataDetailTPHSYeuCau,
              contentEmail,
              newDataUpdate?.MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile,
              newDataUpdate?.MC_TTHC_GV_GuiYeuCau_TraKetQua_DataFile,
            ).then(() => console.log('SEND EMAIL OK'))
          } else {
            return Swal.fire({
              icon: 'error',
              title:
                'Không tìm thấy trạng thái được thiết lập cho hồ sơ này để tiến hành cập nhật!',
            })
          }
        } else {
          Swal.fire('Đã dừng việc tiếp nhận hồ sơ', '', 'info')
        }
      })
    } else {
      return Swal.fire({
        icon: 'error',
        title: 'Hồ sơ đã được hủy trả!',
        text: 'Vui lòng thao tác xử lý tại các bước tiếp theo!',
      })
    }
  }

  console.log(isTPXacNhanPheDuyet)
  return (
    <div className="my-4">
      <div className="form__content border border-gray-400 p-4 rounded-lg mb-4">
        <h4 className="text-center font-bold mb-2">Thông báo (Gửi Email)</h4>
        {/* START: Chọn Thời gian - Địa điểm (đối với hồ sơ mức độ 2, 3) */}
        {mucDoId === 2 && <p>Thêm mục chọn thời gian và địa điểm tại đây</p>}
        {/* START: Chọn phê duyệt */}
        {infoStatus.MC_TTHC_GV_TrangThai_DoiTuongXuLy === 24 && (
          <div className="flex items-center gap-10 mb-2">
            <label htmlFor="isPheDuyet" className="flex items-center gap-2">
              <input
                onChange={() => {
                  onTPXacNhanPheDuyet({
                    ...isTPXacNhanPheDuyet,
                    isPheDuyet: 0,
                  })
                }}
                type="radio"
                id="isPheDuyet"
                name="isTPXacNhanPheDuyet"
              />
              <span>Phê duyệt</span>
            </label>
            <label
              htmlFor="isKhongPheDuyet"
              className="flex items-center gap-2"
            >
              <input
                onChange={() => {
                  onTPXacNhanPheDuyet({
                    ...isTPXacNhanPheDuyet,
                    isPheDuyet: 1,
                  })
                }}
                type="radio"
                id="isKhongPheDuyet"
                name="isTPXacNhanPheDuyet"
              />
              <span>Không duyệt</span>
            </label>
            {infoStatus.MC_TTHC_GV_TrangThai_DoiTuongXuLy === 25 && (
              <label htmlFor="isTrinhDuyet" className="flex items-center gap-2">
                <input
                  onChange={(e) => {
                    onTPXacNhanPheDuyet(2)
                  }}
                  type="radio"
                  id="isTrinhDuyet"
                  name="isTPXacNhanPheDuyet"
                />
                <span>Trình duyệt</span>
              </label>
            )}
          </div>
        )}
        {infoStatus.MC_TTHC_GV_TrangThai_DoiTuongXuLy === 25 && (
          <div className="flex items-center gap-10 mb-2">
            <label htmlFor="isPheDuyet" className="flex items-center gap-2">
              <input
                onChange={() => {
                  onBGHXacNhanPheDuyet(0)
                }}
                type="radio"
                id="isPheDuyet"
                name="isBGHXacNhanPheDuyet"
              />
              <span>Phê duyệt</span>
            </label>
            <label
              htmlFor="isKhongPheDuyet"
              className="flex items-center gap-2"
            >
              <input
                onChange={() => {
                  onBGHXacNhanPheDuyet(1)
                }}
                type="radio"
                id="isKhongPheDuyet"
                name="isBGHXacNhanPheDuyet"
              />
              <span>Không duyệt</span>
            </label>
          </div>
        )}
        {/* START: Nhập nội dung */}
        <div className="form__content--desc mb-2">
          <label htmlFor="form__content--desc">Nội dung:</label>
          <DebounceInput
            id="form__content--desc"
            element="textarea"
            className="w-full border border-slate-200 focus:outline-slate-400 px-3 py-2 rounded-lg"
            debounceTimeout={300}
            placeholder={'Nhập nội dung thông báo đến người gửi hồ sơ...'}
            onChange={(e) => {
              onContentEmail(e.target.value)
            }}
          />
        </div>
        {/* START: Tài liệu kèm theo */}
        <div className="mb-2">
          <label htmlFor="">Tài liệu kèm theo</label>
          <div className="ml-6">
            <div className="flex flex-col mb-2">
              <label htmlFor="">Link tệp đính kèm:</label>
              <input
                type="text"
                className="px-3 py-2 border border-slate-200 focus:outline-slate-400"
                onChange={(e) => {
                  onLinkAttachedFile(e.target.value)
                }}
              />
            </div>
            <span className="mb-2">hoặc</span>
            <div className="flex flex-col mb-2">
              <label htmlFor="">Tệp đính kèm:</label>
              <input
                type="file"
                className={clsx(
                  'px-3 py-2 border border-slate-200 focus:outline-slate-400',
                  dataAttachedFile.MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile.trim() ===
                    ''
                    ? 'block'
                    : 'hidden',
                )}
                value={''}
                onChange={async (e) => {
                  const file = e.target.files[0]
                  const dataFile = await convertDataFileToBase64(file)
                  const maxSizeInBytes = 5 * 1024 * 1024 // 5MB
                  if (!file.name.match(/\.(pdf)$/i)) {
                    Swal.fire({
                      icon: 'error',
                      title:
                        'Tệp tải lên không đúng định dạng yêu cầu. Vui lòng kiểm tra lại.',
                      text: 'Tệp tải lên phải có dạng PDF (Kích thước tối đa 5MB)',
                    })
                    // setDataFilesTepThuTuc(null)
                    return
                  } else {
                    if (file.size > maxSizeInBytes) {
                      Swal.fire({
                        icon: 'error',
                        title: 'Tệp tải lên vượt quá kích thước cho phép!',
                        text: 'Kích thước tối đa 5MB.',
                      })
                      onAttachedFile({
                        MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile: '',
                        MC_TTHC_GV_GuiYeuCau_TraKetQua_DataFile: '',
                      })
                      return
                    } else {
                      onAttachedFile({
                        MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile: file.name,
                        MC_TTHC_GV_GuiYeuCau_TraKetQua_DataFile: dataFile,
                      })
                    }
                  }
                }}
              />
              <div
                className={clsx(
                  dataAttachedFile.MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile.trim() ===
                    ''
                    ? 'hidden'
                    : 'block',
                )}
              >
                <p>File đã chọn:</p>
                <div className="p-2 border flex items-center justify-between">
                  <span className="font-semibold inline-block">
                    {dataAttachedFile.MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile}
                  </span>
                  <FaTrash
                    onClick={() => {
                      onAttachedFile({
                        MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile: '',
                        MC_TTHC_GV_GuiYeuCau_TraKetQua_DataFile: '',
                      })
                    }}
                    className="cursor-pointer hover:text-red-500"
                  />
                </div>
              </div>
              <span className="text-sm font-medium">
                Tệp đính kèm phải có dạng PDF (Kích thước tối đa 5MB)
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="form__action flex gap-4 justify-center">
        {currentStatusId === 0 && stepHandle === 1 && (
          <button
            onClick={handleTiepNhanHoSo}
            className="px-10 py-1 rounded-full font-medium border border-[#0484AC] focus:outline-[#0484AC] bg-[#0484AC] text-white shadow-sm hover:opacity-80 hover:shadow-xl"
          >
            Tiếp nhận
          </button>
        )}
        {stepHandle !== 1 && (
          <button
            onClick={handleThongBaoXuLyHoSo}
            className="px-10 py-1 rounded-full font-medium border border-[#0484AC] focus:outline-[#0484AC] bg-[#0484AC] text-white shadow-sm hover:opacity-80 hover:shadow-xl"
          >
            Gửi
          </button>
        )}
        <button
          onClick={handleCancelHoSo}
          className={clsx(
            'px-10 py-1 rounded-full font-medium border border-red-500 focus:outline-red-500 bg-red-500 text-white shadow-sm hover:opacity-80 hover:shadow-xl',
            infoStatus.MC_TTHC_GV_TrangThai_DoiTuongXuLy === 24 ||
              infoStatus.MC_TTHC_GV_TrangThai_DoiTuongXuLy === 25
              ? 'hidden'
              : null,
          )}
        >
          Hủy trả
        </button>
      </div>
    </div>
  )
}

FormGuiEmailThongBaoXuLy.propTypes = {}

export default FormGuiEmailThongBaoXuLy
