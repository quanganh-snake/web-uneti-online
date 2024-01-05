import React, { useEffect, useState } from 'react'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import FormDangKyThiLai from './FormDangKyThiLai'
import DangKyThiLaiView from './DangKyThiLaiView'
import {
  getAllHocPhanDKThiLai,
  getKiemTraTrung,
  getTenDotDKThiLai,
  postDangKyThiLai,
} from '@/Apis/MotCua/KhaoThi/apiDangKyThiLai'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import Swal from 'sweetalert2'

function DangKyThiLai() {
  const dataSV = DataSinhVien()

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
      path: '/motcua/khaothi/dangkythilai',
      title: 'Đăng ký thi lại',
    },
  ]

  const [loading, setLoading] = useState(true)
  const [lichThi, setLichThi] = useState([])
  const [listHocKy, setListHocKy] = useState([])
  const [hocKy, setHocKy] = useState('')
  const [lyDo, setLyDo] = useState('')
  const [listHocPhan, setListHocPhan] = useState([])
  const loaiThi = 'Thi Lại'
  const [lyDoKhac, setLyDoKhac] = useState('')
  const [selectedRows, setSelectedRows] = useState([])

  useEffect(() => {
    getTenDotDKThiLai().then((res) => {
      setListHocKy(res?.data?.body)
    })

    setLoading(false)

    if (hocKy !== '') {
      setLoading(true)
      getAllHocPhanDKThiLai(dataSV.MaSinhVien, hocKy, loaiThi).then((res) => {
        setListHocPhan(res?.data?.body)
        setLoading(false)
      })
    }

    return () => {
      setListHocPhan([])
      setSelectedRows([])
    }
  }, [hocKy, loaiThi, lyDo])

  const handleSubmitData = async () => {
    if (selectedRows.length > 1 || selectedRows.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn 1 học phần cần phúc khảo!',
      })
      return
    }

    const itemHocPhan = selectedRows[0]

    let dataHocPhan = {}
    if (itemHocPhan) {
      dataHocPhan.MC_KT_DangKyThi_LoaiThi = loaiThi
      dataHocPhan.MC_KT_DangKyThi_TenDot = hocKy ?? 'null'
      ;(dataHocPhan.MC_KT_DangKyThi_TenCoSo = dataSV.CoSo
        ? dataSV.CoSo
        : 'null'),
        (dataHocPhan.MC_KT_DangKyThi_MaSinhVien = dataSV.MaSinhVien
          ? dataSV.MaSinhVien
          : 'null')
      dataHocPhan.MC_KT_DangKyThi_HoDem = dataSV.HoDem ? dataSV.HoDem : 'null'
      ;(dataHocPhan.MC_KT_DangKyThi_Ten = dataSV.Ten ? dataSV.Ten : 'null'),
        (dataHocPhan.MC_KT_DangKyThi_GioiTinh = dataSV.GioiTinh ?? 'null'),
        (dataHocPhan.MC_KT_DangKyThi_TenHeDaoTao = dataSV.BacDaoTao
          ? dataSV.BacDaoTao
          : 'null')
      dataHocPhan.MC_KT_DangKyThi_TenLoaiHinhDT = dataSV.LoaiHinhDaoTao
        ? dataSV.LoaiHinhDaoTao
        : 'null'
      dataHocPhan.MC_KT_DangKyThi_TenKhoaHoc = dataSV.KhoaHoc
        ? dataSV.KhoaHoc
        : 'null'
      dataHocPhan.MC_KT_DangKyThi_TenNganh = dataSV.ChuyenNganh
        ? dataSV.ChuyenNganh
        : 'null'
      dataHocPhan.MC_KT_DangKyThi_TenNghe = dataSV.ChuyenNganh
        ? dataSV.ChuyenNganh
        : 'null'
      dataHocPhan.MC_KT_DangKyThi_TenLop = dataSV.LopHoc
        ? dataSV.LopHoc
        : 'null'
      dataHocPhan.MC_KT_DangKyThi_DienThoai = dataSV.SoDienThoai
        ? dataSV.SoDienThoai
        : dataSV.SoDienThoai2
          ? dataSV.SoDienThoai2
          : dataSV.SoDienThoai3
            ? dataSV.SoDienThoai3
            : ''
      ;(dataHocPhan.MC_KT_DangKyThi_YeuCau = +lyDo),
        (dataHocPhan.MC_KT_DangKyThi_Email = dataSV.Email_TruongCap
          ? dataSV.Email_TruongCap
          : 'null')
      dataHocPhan.MC_KT_DangKyThi_NgaySinh2 = dataSV.NgaySinh
        ? new Date(
            `${dataSV.NgaySinh.split('/')[2]}-${
              dataSV.NgaySinh.split('/')[1]
            }-${dataSV.NgaySinh.split('/')[0]}`,
          ).toISOString()
        : 'null'
      dataHocPhan.MC_KT_DangKyThi_IDSinhVien = dataSV.IdSinhVien
        ? dataSV.IdSinhVien.toString()
        : 'null'
      dataHocPhan.MC_KT_DangKyThi_MaLopHocPhan = itemHocPhan.MaLopHocPhan
        ? itemHocPhan.MaLopHocPhan
        : 'null'
      dataHocPhan.MC_KT_DangKyThi_TenMonHoc = itemHocPhan.TenMonHoc
        ? itemHocPhan.TenMonHoc
        : 'null'
      dataHocPhan.MC_KT_DangKyThi_TenHinhThucThi = itemHocPhan.TenHinhThucThi
        ? itemHocPhan.TenHinhThucThi
        : 'null'
      dataHocPhan.MC_KT_DangKyThi_DiemThi = itemHocPhan.DiemThi
        ? itemHocPhan.DiemThi
        : 'null'
      dataHocPhan.MC_KT_DangKyThi_DiemThi1 = itemHocPhan.DiemThi1
        ? itemHocPhan.DiemThi1
        : 'null'
      dataHocPhan.MC_KT_DangKyThi_DiemThi2 = itemHocPhan.DiemThi2
        ? itemHocPhan.DiemThi2
        : 'null'
      dataHocPhan.MC_KT_DangKyThi_DiemTongKet = itemHocPhan.DiemTongKet
        ? itemHocPhan.DiemTongKet
        : 'null'
      dataHocPhan.MC_KT_DangKyThi_DiemTongKet1 = itemHocPhan.DiemTongKet1
        ? itemHocPhan.DiemTongKet1
        : 'null'
      dataHocPhan.MC_KT_DangKyThi_DiemTongKet2 = itemHocPhan.DiemTongKet2
        ? itemHocPhan.DiemTongKet2
        : 'null'
      dataHocPhan.MC_KT_DangKyThi_YeuCau_LyDoKhacChiTiet = lyDoKhac.length
        ? lyDoKhac
        : 'null'
    }

    // handle post
    Swal.fire({
      title: 'Bạn chắc chắn muốn đăng ký thi lại?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Gửi',
      denyButtonText: `Hủy`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handlePostData(dataHocPhan)
      } else if (result.isDenied) {
        Swal.fire('Đã đăng ký thi lại', '', 'info')
      }
    })
  }

  const handlePostData = async (dataHocPhan) => {
    try {
      const CheckDangKyTrung = await getKiemTraTrung(
        dataHocPhan.MC_KT_DangKyThi_MaSinhVien,
        dataHocPhan.MC_KT_DangKyThi_TenDot,
        dataHocPhan.MC_KT_DangKyThi_TenMonHoc,
        dataHocPhan.MC_KT_DangKyThi_MaLopHocPhan,
        dataHocPhan.MC_KT_DangKyThi_YeuCau,
      )
      if (CheckDangKyTrung.status === 200) {
        const body = CheckDangKyTrung.data?.body[0]
        if (body) {
          Swal.fire({
            icon: 'error',
            title: 'Thông báo đăng ký trùng',
            text: `Học phần ${dataHocPhan.MC_KT_DangKyThi_TenMonHoc} đăng ký bị trùng!`,
          })
          return
        }
        const resPostData = await postDangKyThiLai(dataHocPhan)

        if (resPostData.status === 200) {
          const data = await resPostData.data

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Học phần ${dataHocPhan.MC_KT_DangKyThi_TenMonHoc} đã được gửi yêu cầu thi lại thành công. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
            showConfirmButton: false,
            timer: 1500,
          })

          setTimeout(() => {
            window.location.reload()
          }, 1000)
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi hệ thống',
            text: `Vui lòng thử lại và gửi thông báo lỗi cho bộ phận hỗ trợ phần mềm!`,
          })
          return
        }
      }
    } catch (error) {
      console.log(error)
      if (!error.response) {
        console.log(`Server not response.`)
      } else {
        console.log(`Error `, {
          errorResponse: error.response,
          errorMessage: error.message,
        })
      }
    }
  }

  const handleRowSelection = async (event, item) => {
    if (event.target.checked) {
      // Thêm vào mảng yeucau
      setSelectedRows([...selectedRows, item])
    } else {
      // Xóa khỏi mảng yeucau
      const updatedYeucau = selectedRows.filter(
        (yeucauItem) => yeucauItem !== item,
      )
      setSelectedRows(updatedYeucau)
    }
  }

  return (
    <DangKyThiLaiView
      home={home}
      breadcrumbs={breadcrumbs}
      listHocPhan={listHocPhan}
      hocKy={hocKy}
      setHocKy={setHocKy}
      lyDo={lyDo}
      setLyDo={setLyDo}
      listHocKy={listHocKy}
      lyDoKhac={lyDoKhac}
      setLyDoKhac={setLyDoKhac}
      handleRowSelection={handleRowSelection}
      handleSubmitData={handleSubmitData}
      loading={loading}
    />
  )
}

export default DangKyThiLai
