/* eslint-disable no-extra-semi */
import {
  getAllHocPhanHoanThi,
  hoanThikiemTraTrung,
  postHoanThi
} from '@/Apis/MotCua/KhaoThi/apiHoanThi'
import { getTenDot } from '@/Apis/MotCua/apiTenDot'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { isEqual, isNil } from 'lodash-unified'
import { useEffect } from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { LY_DO_KHAC } from './constants'
import { convertDataFileToBase64 } from '@/Services/Utils/stringUtils'

export const useHoanThiHandler = () => {
  const [loading, setLoading] = useState(false)
  const [listHocKy, setListHocKy] = useState([])
  const [tenDot, setTenDot] = useState(null)
  const [loaiThi, setLoaiThi] = useState(null)
  const [lyDo, setLyDo] = useState(null)
  const [lyDoChiTiet, setLyDoChiTiet] = useState(null)
  const [listHocPhan, setListHocPhan] = useState([])
  const [files, setFiles] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)

  const handleChangeValue = (e) => {
    if (e.target.id === 'MC_KT_HoanThi_TenDot') {
      setTenDot(e.target.value)
    }

    if (e.target.id === 'MC_KT_HoanThi_LoaiThi') {
      setLoaiThi(e.target.value)
    }

    if (e.target.id === 'MC_KT_HoanThi_YeuCau') {
      setLyDo(e.target.value)
    }

    if (e.target.id === 'MC_KT_HoanThi_YeuCau_LyDoKhac_LyDoChiTiet') {
      setLyDoChiTiet(e.target.value)
    }
  }

  const handleRowSelection = (row) => {
    setSelectedRow(isEqual(selectedRow, row) ? null : row)
  }

  const handleFilesChange = (file) => {
    if (files.length >= 5) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Chỉ được chọn tối đa 5 ảnh!'
      })
      return
    }

    setFiles((_files) => [..._files, file])
  }

  const handleSubmitData = async (event) => {
    event.preventDefault()

    if (isNil(tenDot)) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn học kỳ!'
      })
      return
    }

    if (isNil(loaiThi)) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn loại thi!'
      })
      return
    }

    if (isNil(lyDo)) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn lý do!'
      })
      return
    }

    if (isNil(selectedRow)) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn 1 học phần cần gửi yêu cầu!'
      })
      return
    }

    const itemHocPhan = selectedRow

    let dataHocPhan = {}
    if (itemHocPhan) {
      // Data post API
      dataHocPhan.MC_KT_HoanThi_TenCoSo = dataSV.CoSo ? dataSV.CoSo : 'null'
      dataHocPhan.MC_KT_HoanThi_TenDot = tenDot ?? 'null'
      dataHocPhan.MC_KT_HoanThi_MaSinhVien = dataSV.MaSinhVien
        ? dataSV.MaSinhVien
        : 'null'
      dataHocPhan.MC_KT_HoanThi_HoDem = dataSV.HoDem ? dataSV.HoDem : 'null'
      dataHocPhan.MC_KT_HoanThi_Ten = dataSV.Ten ? dataSV.Ten : 'null'
      dataHocPhan.MC_KT_HoanThi_GioiTinh = `${dataSV.GioiTinh}` ?? 'null'
      dataHocPhan.MC_KT_HoanThi_TenHeDaoTao = dataSV.BacDaoTao
        ? dataSV.BacDaoTao
        : 'null'
      dataHocPhan.MC_KT_HoanThi_TenLoaiHinhDT = dataSV.LoaiHinhDaoTao
        ? dataSV.LoaiHinhDaoTao
        : 'null'
      dataHocPhan.MC_KT_HoanThi_TenKhoaHoc = dataSV.KhoaHoc
        ? dataSV.KhoaHoc
        : 'null'
      dataHocPhan.MC_KT_HoanThi_TenNganh = dataSV.ChuyenNganh
        ? dataSV.ChuyenNganh
        : 'null'
      dataHocPhan.MC_KT_HoanThi_TenNghe = dataSV.ChuyenNganh
        ? dataSV.ChuyenNganh
        : 'null'
      dataHocPhan.MC_KT_HoanThi_TenLop = dataSV.LopHoc ? dataSV.LopHoc : 'null'
      dataHocPhan.MC_KT_HoanThi_DienThoai = dataSV.SoDienThoai
        ? dataSV.SoDienThoai
        : dataSV.SoDienThoai2
        ? dataSV.SoDienThoai2
        : dataSV.SoDienThoai3
        ? dataSV.SoDienThoai3
        : ''
      dataHocPhan.MC_KT_HoanThi_Email = dataSV.Email_TruongCap
        ? dataSV.Email_TruongCap
        : 'null'
      dataHocPhan.MC_KT_HoanThi_IDSinhVien = dataSV.IdSinhVien
        ? dataSV.IdSinhVien.toString()
        : 'null'
      dataHocPhan.MC_KT_HoanThi_NgaySinh2 = dataSV.NgaySinh
        ? new Date(
            `${dataSV.NgaySinh.split('/')[2]}-${
              dataSV.NgaySinh.split('/')[1]
            }-${dataSV.NgaySinh.split('/')[0]}`
          ).toISOString()
        : 'null'

      // data trong Tables
      dataHocPhan.MC_KT_HoanThi_MaLopHocPhan = itemHocPhan.MaLopHocPhan
        ? itemHocPhan.MaLopHocPhan
        : 'null'
      dataHocPhan.MC_KT_HoanThi_MaMonHoc = itemHocPhan.MaMonHoc || 'null'
      dataHocPhan.MC_KT_HoanThi_TenMonHoc = itemHocPhan.TenMonHoc
        ? itemHocPhan.TenMonHoc
        : 'null'
      dataHocPhan.MC_KT_HoanThi_KhoaChuQuanMon = itemHocPhan.KhoaChuQuanMon
        ? itemHocPhan.KhoaChuQuanMon
        : 'null'
      dataHocPhan.MC_KT_HoanThi_TenHinhThucThi = itemHocPhan.TenHinhThucThi
        ? itemHocPhan.TenHinhThucThi
        : 'null'
      dataHocPhan.MC_KT_HoanThi_NgayThi = itemHocPhan.NgayThi
        ? itemHocPhan.NgayThi
        : 'null'
      dataHocPhan.MC_KT_HoanThi_Thu = itemHocPhan.Thu
        ? itemHocPhan.Thu.toString()
        : 'null'
      dataHocPhan.MC_KT_HoanThi_Nhom = itemHocPhan.Nhom
        ? itemHocPhan.Nhom.toString()
        : 'null'
      dataHocPhan.MC_KT_HoanThi_TuTiet = itemHocPhan.TuTiet
        ? itemHocPhan.TuTiet.toString()
        : 'null'
      dataHocPhan.MC_KT_HoanThi_DenTiet = itemHocPhan.DenTiet
        ? itemHocPhan.DenTiet.toString()
        : 'null'
      dataHocPhan.MC_KT_HoanThi_LoaiThi = itemHocPhan.LoaiThi
        ? itemHocPhan.LoaiThi
        : 'null'
      dataHocPhan.MC_KT_HoanThi_TenPhong = itemHocPhan.TenPhong
        ? itemHocPhan.TenPhong
        : 'null'

      dataHocPhan.MC_KT_HoanThi_YeuCau = `${lyDo}`
      dataHocPhan.MC_KT_HoanThi_YeuCau_XemLich_LyDo = `${lyDo}`
      dataHocPhan.MC_KT_HoanThi_YeuCau_LyDoKhac_LyDoChiTiet = `${lyDoChiTiet}`

      // images
      dataHocPhan.images = []
      for (let i = 0; i < files.length; i++) {
        const fileBase64 = await convertDataFileToBase64(files[i])
        const fileURL = URL.createObjectURL(files[i])

        const fileName = fileURL.split('/').at(-1)

        dataHocPhan.images.push({
          MC_KT_HoanThi_YeuCau_DataFile: fileBase64,
          MC_KT_HoanThi_YeuCau_TenFile: fileName,
          urlTemp: fileURL,
          lastModified: ''
        })

        // URL temp chỉ tồn tại trên client, nên revoke
        URL.revokeObjectURL(fileURL)
      }
    }

    // handle post
    Swal.fire({
      title: `Bạn chắc chắn muốn gửi yêu cầu hoãn thi môn ${dataHocPhan.MC_KT_HoanThi_TenMonHoc}`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Gửi',
      denyButtonText: `Hủy`
    }).then(async (result) => {
      if (result.isConfirmed) {
        handlePostData(dataHocPhan)
      } else if (result.isDenied) {
        Swal.fire(
          `Đã hủy gửi yêu cầu hoãn thi môn ${dataHocPhan.MC_KT_HoanThi_TenMonHoc}`,
          '',
          'info'
        )
      }
    })
  }

  const handlePostData = async (dataHocPhan) => {
    try {
      const kiemTraTrung = await hoanThikiemTraTrung({
        maSinhVien: dataHocPhan.MC_KT_HoanThi_MaSinhVien,
        tenCoSo: dataHocPhan.MC_KT_HoanThi_TenCoSo,
        loaiThi: dataHocPhan.MC_KT_HoanThi_LoaiThi,
        maLopHocPhan: dataHocPhan.MC_KT_HoanThi_MaLopHocPhan,
        tenDot: dataHocPhan.MC_KT_HoanThi_TenDot
      })

      if (kiemTraTrung.status === 200) {
        const records = kiemTraTrung.data.body.length
        if (records > 0) {
          Swal.fire({
            icon: 'error',
            title: 'Thông báo quá hạn',
            text: `Học phần ${dataHocPhan.MC_KT_HoanThi_TenMonHoc} đã được gửi yêu cầu trước đấy. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`
          })
          return
        }

        const resPostData = await postHoanThi(dataHocPhan)

        if (resPostData == 'ERR_BAD_REQUEST') {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi hệ thống',
            text: `Vui lòng thử lại và gửi thông báo lỗi cho bộ phận hỗ trợ phần mềm!`
          })
          return
        }
        if (resPostData.status === 200) {
          const data = await resPostData.data

          // Check bản ghi trùng
          if (data.message === 'Bản ghi bị trùng.') {
            Swal.fire({
              icon: 'error',
              title: 'Thông báo quá hạn',
              text: `Học phần ${dataHocPhan.MC_KT_HoanThi_TenMonHoc} đã được gửi yêu cầu trước đấy. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`
            })
          } else {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: `Học phần ${dataHocPhan.MC_KT_HoanThi_TenMonHoc} đã được gửi yêu cầu thành công. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
              showConfirmButton: false,
              timer: 1500
            })

            // setTimeout(() => {
            //   window.location.reload()
            // }, 1000)
          }
        }
      }
    } catch (error) {
      if (!error.response) {
        console.log(`Server not response.`)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi hệ thống',
          text: `Vui lòng thử lại và gửi thông báo lỗi cho bộ phận hỗ trợ phần mềm!`
        })
        console.log(`Error `, {
          errorResponse: error.response,
          errorMessage: error.message
        })
      }
    }
  }

  useEffect(() => {
    ;(async () => {
      const res = await getTenDot()
      setListHocKy(res?.data?.body)
    })()

    // --
    ;(async () => {
      if (lyDo == LY_DO_KHAC) return

      if (isNil(tenDot) || isNil(loaiThi) || isNil(lyDo)) return

      setLoading(true)
      const res = await getAllHocPhanHoanThi(
        dataSV.MaSinhVien,
        tenDot,
        loaiThi,
        lyDo
      )

      setLoading(false)
      setListHocPhan(res?.data?.body)
    })()
  }, [tenDot, loaiThi, lyDo])

  return {
    handleChangeValue,
    handleRowSelection,
    handleFilesChange,
    handleSubmitData,
    handlePostData,

    listHocPhan,
    setListHocPhan,

    listHocKy,
    setListHocKy,

    loading,
    setLoading,

    tenDot,
    setTenDot,

    lyDo,
    setLyDo,

    loaiThi,
    setLoaiThi,

    selectedRow,
    setSelectedRow,

    files,
    setFiles
  }
}
