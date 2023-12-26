import { useState } from 'react'
import Swal from 'sweetalert2'
import LichThiView from './LichThiView'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { dataLoaiThi } from '@/Services/Static/dataStatic'
import { useEffect } from 'react'
import { getTenDot } from '@/Apis/MotCua/apiTenDot'
import {
  getAllHocPhanLichThi,
  postYeuCauLichThi,
} from '@/Apis/MotCua/KhaoThi/apiLichThi'

function LichThi() {
  const home = {
    path: '/motcua',
    title: 'Bộ phận một cửa',
  }

  const breadcrumbs = [
    {
      path: '/motcua/khaothi',
      title: 'Khảo thí',
    },
    {
      path: '/motcua/khaothi/lichthi',
      title: 'Lịch thi',
    },
  ]

  const listLyDo = [
    {
      id: 1,
      title: 'Xem lịch thi',
      value: 0,
    },
    {
      id: 2,
      title: 'Trùng lịch thi',
      value: 1,
    },
    {
      id: 3,
      title: 'Không có lịch thi',
      value: 2,
    },
  ]

  const [loading, setLoading] = useState(true)
  const [listHocKy, setListHocKy] = useState([])
  const [tenDot, setTenDot] = useState('')
  const [loaiThi, setLoaiThi] = useState('')
  const [lyDo, setLyDo] = useState('')
  const [listHocPhan, setListHocPhan] = useState([])
  const [files, setFiles] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const dataSV = DataSinhVien()

  // event handlers
  const handleChangeValue = (e) => {
    if (e.target.id === 'MC_KT_LichThi_TenDot') {
      setTenDot(e.target.value)
    }

    if (e.target.id === 'MC_KT_LichThi_LoaiThi') {
      setLoaiThi(e.target.value)
    }

    if (e.target.id === 'MC_KT_LichThi_YeuCau') {
      setLyDo(e.target.value)
    }
  }

  const handleRowSelection = async (event, item) => {
    if (event.target.checked) {
      // Thêm vào mảng yeucau
      setSelectedRows([...selectedRows, item])
    } else {
      // Xóa khỏi mảng yeucau
      const updatedYeucau = selectedRows.filter(
        (yeucauItem) => yeucauItem !== item
      )
      setSelectedRows(updatedYeucau)
    }
  }

  const handleFilesChange = (file) => {
    setFiles((_files) => [..._files, file])
  }

  const handleSubmitData = (event) => {
    event.preventDefault()

    if (tenDot === '') {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn học kỳ!',
      })
      return
    }

    if (loaiThi === '') {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn loại thi!',
      })
      return
    }

    if (lyDo === '') {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn lý do!',
      })
      return
    }

    if (selectedRows.length > 1 || selectedRows.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn 1 học phần cần gửi yêu cầu!',
      })
      return
    }

    const itemHocPhan = selectedRows[0]
    console.log(
      '🚀 ~ file: LichThi.jsx:96 ~ handleSubmitData ~ itemHocPhan:',
      itemHocPhan
    )

    let dataHocPhan = {}
    if (itemHocPhan) {
      // Data post API
      dataHocPhan.MC_KT_LichThi_TenCoSo = dataSV.CoSo ? dataSV.CoSo : 'null'
      dataHocPhan.MC_KT_LichThi_TenDot = tenDot ?? 'null'
      dataHocPhan.MC_KT_LichThi_MaSinhVien = dataSV.MaSinhVien
        ? dataSV.MaSinhVien
        : 'null'
      dataHocPhan.MC_KT_LichThi_HoDem = dataSV.HoDem ? dataSV.HoDem : 'null'
      dataHocPhan.MC_KT_LichThi_Ten = dataSV.Ten ? dataSV.Ten : 'null'
      dataHocPhan.MC_KT_LichThi_GioiTinh = dataSV.GioiTinh ?? 'null'
      dataHocPhan.MC_KT_LichThi_TenHeDaoTao = dataSV.BacDaoTao
        ? dataSV.BacDaoTao
        : 'null'
      dataHocPhan.MC_KT_LichThi_TenLoaiHinhDT = dataSV.LoaiHinhDaoTao
        ? dataSV.LoaiHinhDaoTao
        : 'null'
      dataHocPhan.MC_KT_LichThi_TenKhoaHoc = dataSV.KhoaHoc
        ? dataSV.KhoaHoc
        : 'null'
      dataHocPhan.MC_KT_LichThi_TenNganh = dataSV.ChuyenNganh
        ? dataSV.ChuyenNganh
        : 'null'
      dataHocPhan.MC_KT_LichThi_TenNghe = dataSV.ChuyenNganh
        ? dataSV.ChuyenNganh
        : 'null'
      dataHocPhan.MC_KT_LichThi_TenLop = dataSV.LopHoc ? dataSV.LopHoc : 'null'
      dataHocPhan.MC_KT_LichThi_DienThoai = dataSV.SoDienThoai
        ? dataSV.SoDienThoai
        : dataSV.SoDienThoai2
        ? dataSV.SoDienThoai2
        : dataSV.SoDienThoai3
        ? dataSV.SoDienThoai3
        : ''
      dataHocPhan.MC_KT_LichThi_Email = dataSV.Email_TruongCap
        ? dataSV.Email_TruongCap
        : 'null'
      dataHocPhan.MC_KT_LichThi_IDSinhVien = dataSV.IdSinhVien
        ? dataSV.IdSinhVien.toString()
        : 'null'
      dataHocPhan.MC_KT_LichThi_NgaySinh2 = dataSV.NgaySinh
        ? new Date(
            `${dataSV.NgaySinh.split('/')[2]}-${
              dataSV.NgaySinh.split('/')[1]
            }-${dataSV.NgaySinh.split('/')[0]}`
          ).toISOString()
        : 'null'

      // data trong Tables
      dataHocPhan.MC_KT_LichThi_MaLopHocPhan = itemHocPhan.MaLopHocPhan
        ? itemHocPhan.MaLopHocPhan
        : 'null'
      dataHocPhan.MC_KT_LichThi_TenMonHoc = itemHocPhan.TenMonHoc
        ? itemHocPhan.TenMonHoc
        : 'null'
      dataHocPhan.MC_KT_LichThi_KhoaChuQuanMon = itemHocPhan.KhoaChuQuanMon
        ? itemHocPhan.KhoaChuQuanMon
        : 'null'
      dataHocPhan.MC_KT_LichThi_TenHinhThucThi = itemHocPhan.TenHinhThucThi
        ? itemHocPhan.TenHinhThucThi
        : 'null'
      dataHocPhan.MC_KT_LichThi_NgayThi = itemHocPhan.NgayThi
        ? itemHocPhan.NgayThi
        : 'null'
      dataHocPhan.MC_KT_LichThi_Thu = itemHocPhan.Thu
        ? itemHocPhan.Thu.toString()
        : 'null'
      dataHocPhan.MC_KT_LichThi_Nhom = itemHocPhan.Nhom
        ? itemHocPhan.Nhom.toString()
        : 'null'
      dataHocPhan.MC_KT_LichThi_TuTiet = itemHocPhan.TuTiet
        ? itemHocPhan.TuTiet.toString()
        : 'null'
      dataHocPhan.MC_KT_LichThi_DenTiet = itemHocPhan.DenTiet
        ? itemHocPhan.DenTiet.toString()
        : 'null'
      dataHocPhan.MC_KT_LichThi_LoaiThi = itemHocPhan.LoaiThi
        ? itemHocPhan.LoaiThi
        : 'null'
      dataHocPhan.MC_KT_LichThi_TenPhong = itemHocPhan.TenPhong
        ? itemHocPhan.TenPhong
        : 'null'
      dataHocPhan.MC_KT_LichThi_SBD = itemHocPhan.SBD
        ? itemHocPhan.SBD.toString()
        : 'null'
      dataHocPhan.MC_KT_LichThi_DiemThi = itemHocPhan.DiemThi
        ? itemHocPhan.DiemThi.toString()
        : 'null'
      dataHocPhan.MC_KT_LichThi_DiemThi1 = itemHocPhan.DiemThi1
        ? itemHocPhan.DiemThi1.toString()
        : 'null'
      dataHocPhan.MC_KT_LichThi_DiemThi2 = itemHocPhan.DiemThi2
        ? itemHocPhan.DiemThi2.toString()
        : 'null'
      dataHocPhan.MC_KT_LichThi_DiemTongKet = itemHocPhan.DiemTongKet
        ? itemHocPhan.DiemTongKet.toString()
        : 'null'
      dataHocPhan.MC_KT_LichThi_DiemTongKet1 = itemHocPhan.DiemTongKet1
        ? itemHocPhan.DiemTongKet1.toString()
        : 'null'
      dataHocPhan.MC_KT_LichThi_DiemTongKet2 = itemHocPhan.DiemTongKet2
        ? itemHocPhan.DiemTongKet2.toString()
        : 'null'
      dataHocPhan.MC_KT_LichThi_TuiBaiThi = itemHocPhan.TuiBaiThi
        ? itemHocPhan.TuiBaiThi.toString()
        : 'null'
      dataHocPhan.MC_KT_LichThi_SoPhach = itemHocPhan.SoPhach
        ? itemHocPhan.SoPhach.toString()
        : 'null'

      dataHocPhan.MC_KT_LichThi_LyDo = listLyDo.find(
        (e) => e.value == lyDo
      ).title
    }

    // handle post
    Swal.fire({
      title: `Bạn chắc chắn muốn gửi yêu cầu ${dataHocPhan.MC_KT_LichThi_LyDo}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Gửi',
      denyButtonText: `Hủy`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handlePostData(dataHocPhan)
      } else if (result.isDenied) {
        Swal.fire(
          `Đã hủy gửi yêu cầu ${dataHocPhan.MC_KT_LichThi_LyDo}`,
          '',
          'info'
        )
      }
    })
  }

  const handlePostData = async (dataHocPhan) => {
    console.log(
      '🚀 ~ file: LichThi.jsx ~ handlePostData ~ dataHocPhan:',
      dataHocPhan
    )
    try {
      const resPostData = await postYeuCauLichThi(dataHocPhan)

      if (resPostData == 'ERR_BAD_REQUEST') {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi hệ thống',
          text: `Vui lòng thử lại và gửi thông báo lỗi cho bộ phận hỗ trợ phần mềm!`,
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
            text: `Học phần ${dataHocPhan.MC_KT_LichThi_TenMonHoc} đã được gửi yêu cầu trước đấy. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
          })
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Học phần ${dataHocPhan.MC_KT_LichThi_TenMonHoc} đã được gửi yêu cầu thành công. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
            showConfirmButton: false,
            timer: 1500,
          })

          setTimeout(() => {
            window.location.reload()
          }, 1000)
        }
      }
    } catch (error) {
      console.log(error)
      if (!error.response) {
        console.log(`Server not response.`)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi hệ thống',
          text: `Vui lòng thử lại và gửi thông báo lỗi cho bộ phận hỗ trợ phần mềm!`,
        })
        console.log(`Error `, {
          errorResponse: error.response,
          errorMessage: error.message,
        })
      }
    }
  }

  useEffect(() => {
    getTenDot().then((res) => {
      setListHocKy(res?.data?.body)
    })

    if (tenDot !== '' && loaiThi !== '' && lyDo !== '') {
      setLoading(true)
      getAllHocPhanLichThi(dataSV.MaSinhVien, tenDot, loaiThi, lyDo).then(
        (res) => {
          setLoading(false)
          setListHocPhan(res?.data?.body)
        }
      )
    }
    setLoading(false)
  }, [tenDot, loaiThi, lyDo])

  return (
    <LichThiView
      home={home}
      breadcrumbs={breadcrumbs}
      loading={loading}
      listHocKy={listHocKy}
      listLyDo={listLyDo}
      tenDot={tenDot}
      dataLoaiThi={dataLoaiThi}
      loaiThi={loaiThi}
      lyDo={lyDo}
      files={files}
      listHocPhan={listHocPhan}
      handleChangeValue={handleChangeValue}
      handleFilesChange={handleFilesChange}
      handleRowSelection={handleRowSelection}
      handleSubmitData={handleSubmitData}
      handlePostData={handlePostData}
    />
  )
}

export default LichThi
