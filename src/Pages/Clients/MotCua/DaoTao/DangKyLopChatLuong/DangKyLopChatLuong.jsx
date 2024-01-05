import React, { useEffect, useState } from 'react'
import DangKyLopChatLuongView from './DangKyLopChatLuongView'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { getTenDot } from '@/Apis/MotCua/apiTenDot'
import {
  getAllHocPhanDKLopChatLuong,
  getKiemTraQuaHanDKLopChatLuong,
  getKiemTraTrungDKLopChatLuong,
  postDKLopChatLuong,
} from '@/Apis/MotCua/DaoTao/apiDangKyLopChatLuong'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'

function DangKyLopChatLuong() {
  const home = {
    path: '/motcua',
    title: 'Bộ phận một cửa',
  }

  const breadcrumbs = [
    {
      path: '/motcua/daotao',
      title: 'Đào tạo',
    },
    {
      path: '/motcua/daotao/dangkylopchatluong',
      title: 'Đăng ký lớp chất lượng',
    },
  ]

  const listLyDo = [
    {
      value: '0',
      text: 'Căn cứ năng lực, nguyện vọng của bản thân và điều kiện gia đình',
    },
    {
      value: '1',
      text: 'Lý do khác',
    },
  ]

  const [listHocKy, setListHocKy] = useState([])
  const [hocKy, setHocKy] = useState('')
  const [lyDo, setLyDo] = useState(listLyDo[0].value)
  const [lyDoKhac, setLyDoKhac] = useState('')
  const [listHocPhan, setListHocPhan] = useState([])
  const [hocPhan, setHocPhan] = useState({})
  const [ngayBatDau, setNgayBatDau] = useState('')
  const [ngayKetThuc, setNgayKetThuc] = useState('')

  const dataSV = DataSinhVien()

  // check object null
  function isEmpty(obj) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) return false
    }
    return true
  }

  const handleSelectHocPhan = (e, hp) => {
    setHocPhan(() => hp)
  }

  useEffect(() => {
    getKiemTraQuaHanDKLopChatLuong().then((res) => {
      setNgayBatDau(res?.data?.body[0].HT_TLGH_NgayBD)
      setNgayKetThuc(res?.data?.body[0].HT_TLGH_NgayKT)
    })

    getTenDot().then((res) => {
      setListHocKy(res?.data?.body)
    })

    if (hocKy !== '') {
      getAllHocPhanDKLopChatLuong(hocKy, dataSV.MaSinhVien).then((res) => {
        setListHocPhan(res?.data?.body)
      })
    }

    return () => {
      setListHocPhan([])
      setLyDoKhac('')
      setHocPhan({})
      setNgayBatDau('')
      setNgayKetThuc('')
    }
  }, [hocKy])

  useEffect(() => {
    setLyDoKhac('')
  }, [lyDo])

  const handleSubmitData = async (e) => {
    e.preventDefault()

    // check chưa chọn học kỳ hoặc học phần
    if (hocKy === '' || isEmpty(hocPhan)) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn học kỳ và học phần để gửi yêu cầu',
      })
      return
    }

    let dataHocPhan = {}

    //dataSV
    dataHocPhan.MC_DT_DKHocChatLuong_MaSinhVien = dataSV.MaSinhVien
      ? dataSV.MaSinhVien
      : 'null'
    dataHocPhan.MC_DT_DKHocChatLuong_GioiTinh =
      dataSV.GioiTinh !== null ? dataSV.GioiTinh.toString() : 'null'
    dataHocPhan.MC_DT_DKHocChatLuong_NgaySinh2 = dataSV.NgaySinh
      ? new Date(
          `${dataSV.NgaySinh.split('/')[2]}-${dataSV.NgaySinh.split('/')[1]}-${
            dataSV.NgaySinh.split('/')[0]
          }`,
        ).toISOString()
      : 'null'
    dataHocPhan.MC_DT_DKHocChatLuong_TenLop = dataSV.LopHoc
      ? dataSV.LopHoc
      : 'null'
    dataHocPhan.MC_DT_DKHocChatLuong_DienThoai = dataSV.SoDienThoai
      ? dataSV.SoDienThoai
      : dataSV.SoDienThoai2
        ? dataSV.SoDienThoai2
        : dataSV.SoDienThoai3
          ? dataSV.SoDienThoai3
          : 'null'
    dataHocPhan.MC_DT_DKHocChatLuong_Email = dataSV.Email_TruongCap
      ? dataSV.Email_TruongCap
      : 'null'
    dataHocPhan.MC_DT_DKHocChatLuong_TenDot = hocKy ?? 'null'
    dataHocPhan.MC_DT_DKHocChatLuong_MaLopHoc =
      hocPhan.MC_DT_DKHocChatLuong_MaLopHoc
        ? hocPhan.MC_DT_DKHocChatLuong_MaLopHoc
        : 'null'
    dataHocPhan.MC_DT_DKHocChatLuong_TenLopHoc =
      hocPhan.MC_DT_DKHocChatLuong_TenLop
        ? hocPhan.MC_DT_DKHocChatLuong_TenLop
        : 'null'
    dataHocPhan.MC_DT_DKHocChatLuong_KhoaChuQuanLHP =
      hocPhan.MC_DT_DKHocChatLuong_KhoaChuQuanLHP
        ? hocPhan.MC_DT_DKHocChatLuong_KhoaChuQuanLHP
        : 'null'
    dataHocPhan.MC_DT_DKHocChatLuong_SiSo = hocPhan.MC_DT_DKHocChatLuong_SiSo
      ? hocPhan.MC_DT_DKHocChatLuong_SiSo.toString()
      : 'null'
    dataHocPhan.MC_DT_DKHocChatLuong_GhiChu =
      hocPhan.MC_DT_DKHocChatLuong_GhiChu
        ? hocPhan.MC_DT_DKHocChatLuong_GhiChu
        : 'null'
    dataHocPhan.MC_DT_DKHocChatLuong_YeuCau_LoaiHocTap = '0'
    dataHocPhan.MC_DT_DKHocChatLuong_YeuCau_LyDo = lyDo
    dataHocPhan.MC_DT_DKHocChatLuong_YeuCau_LyDo_LyDoKhac_LyDoChiTiet =
      lyDoKhac.length ? lyDoKhac : 'null'

    // handle post
    Swal.fire({
      title: `Bạn chắc chắn muốn gửi yêu cầu đăng ký lớp chất lượng ${dataHocPhan.MC_DT_DKHocChatLuong_TenLop}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Gửi',
      denyButtonText: `Hủy`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handlePostData(dataHocPhan)
      } else if (result.isDenied) {
        Swal.fire('Đã hủy gửi yêu cầu hủy đăng ký thi lại', '', 'info')
      }
    })
  }

  const handlePostData = async (dataHocPhan) => {
    try {
      // check quá hạn
      if (ngayBatDau !== '' && ngayKetThuc !== '') {
        if (
          dayjs(ngayBatDau).isAfter(new Date()) ||
          dayjs(ngayKetThuc).isBefore(new Date())
        ) {
          Swal.fire({
            icon: 'error',
            title: 'Thông báo quá hạn',
            text: `Lớp chất lượng ${
              dataHocPhan.MC_DT_DKHocChatLuong_TenLop
            } hiện tại không thể đăng ký (Hạn đăng ký từ ngày ${dayjs(
              ngayBatDau,
            ).format('DD-MM-YYYY')} đến ngày ${dayjs(ngayKetThuc).format(
              'DD-MM-YYYY',
            )})`,
          })
          return
        }
      }

      //Kiểm tra trùng
      const checkTrungDKLopChatLuong = await getKiemTraTrungDKLopChatLuong(
        dataHocPhan.MC_DT_DKHocChatLuong_MaSinhVien,
        dataHocPhan.MC_DT_DKHocChatLuong_YeuCau_LyDo,
        dataHocPhan.MC_DT_DKHocChatLuong_MaLopHoc,
      )
      if (checkTrungDKLopChatLuong.status === 200) {
        if (checkTrungDKLopChatLuong.data?.body[0]) {
          Swal.fire({
            icon: 'error',
            title: 'Thông báo trùng',
            text: `Lớp chất lượng ${dataHocPhan.MC_DT_DKHocChatLuong_TenLop} đã được gửi yêu cầu đăng ký trước đây. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
          })
          return
        }
      }

      //POST DATA

      const resPostData = await postDKLopChatLuong(dataHocPhan)
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
            title: 'Thông báo trùng',
            text: `Lớp chất lượng ${dataHocPhan.MC_DT_DKHocChatLuong_TenLop} đã được gửi yêu cầu đăng ký trước đây. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
          })
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Lớp chất lượng ${dataHocPhan.MC_DT_DKHocChatLuong_TenLop} đã được được gửi yêu cầu đăng ký thành công. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
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
        console.log(`Error `, {
          errorResponse: error.response,
          errorMessage: error.message,
        })
      }
    }
  }

  return (
    <DangKyLopChatLuongView
      home={home}
      breadcrumbs={breadcrumbs}
      listHocKy={listHocKy}
      hocKy={hocKy}
      setHocKy={setHocKy}
      listLyDo={listLyDo}
      lyDo={lyDo}
      setLyDo={setLyDo}
      lyDoKhac={lyDoKhac}
      setLyDoKhac={setLyDoKhac}
      listHocPhan={listHocPhan}
      hocPhan={hocPhan}
      setHocPhan={setHocPhan}
      handleSelectHocPhan={handleSelectHocPhan}
      handleSubmitData={handleSubmitData}
    />
  )
}

export default DangKyLopChatLuong
