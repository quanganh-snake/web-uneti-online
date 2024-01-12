import React, { useEffect, useState } from 'react'
import HuyDangKyThiLaiView from './HuyDangKyThiLaiView'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import {
  getAllHocPhanHDKThiLai,
  getKiemTraTrungHDKThi,
  getTenDotHDKThiLai,
  postHDKThiLai,
} from '@/Apis/MotCua/KhaoThi/apiHuyDangKyThiLai'
import Swal from 'sweetalert2'

function HuyDangKyThiLai() {
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
      path: '/motcua/khaothi/huydangkythilai',
      title: 'Hủy đăng ký thi lại',
    },
  ]

  const [listHocKy, setListHocKy] = useState([])
  const [tenDot, setTenDot] = useState('')
  const loaiThi = 'Thi lại'
  const [listHocPhan, setListHocPhan] = useState([])
  const [lyDo, setLyDo] = useState('')
  const [lyDoKhac, setLyDoKhac] = useState('')
  const [selectedRows, setSelectedRows] = useState([])
  const [loading, setLoading] = useState(true)

  const listLyDo = [
    {
      value: 0,
      name: 'Đạt điểm HP sau khi phúc khảo',
    },
    {
      value: 1,
      name: 'Điều chỉnh điểm thường kỳ (quá trình)',
    },
    {
      value: 2,
      name: 'Hủy đăng ký thi lại để học lại',
    },
    {
      value: 3,
      name: 'Lý do khác',
    },
  ]

  const dataSV = DataSinhVien()

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

  const handleSubmitData = async () => {
    if (selectedRows.length > 1 || selectedRows.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn 1 học phần cần hủy đăng ký thi lại!',
      })
      return
    }

    const itemHocPhan = selectedRows[0]

    let dataHocPhan = {}
    if (itemHocPhan) {
      // dataSV
      dataHocPhan.MC_KT_HDKThiLai_TenCoSo = dataSV.CoSo ? dataSV.CoSo : 'null'
      dataHocPhan.MC_KT_HDKThiLai_TenDot = tenDot ?? 'null'
      dataHocPhan.MC_KT_HDKThiLai_MaSinhVien = dataSV.MaSinhVien
        ? dataSV.MaSinhVien
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_HoDem = dataSV.HoDem ? dataSV.HoDem : 'null'
      dataHocPhan.MC_KT_HDKThiLai_Ten = dataSV.Ten ? dataSV.Ten : 'null'
      dataHocPhan.MC_KT_HDKThiLai_GioiTinh =
        dataSV.GioiTinh !== null ? dataSV.GioiTinh.toString() : 'null'
      dataHocPhan.MC_KT_HDKThiLai_TenHeDaoTao = dataSV.BacDaoTao
        ? dataSV.BacDaoTao
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_TenLoaiHinhDT = dataSV.LoaiHinhDaoTao
        ? dataSV.LoaiHinhDaoTao
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_TenKhoaHoc = dataSV.KhoaHoc
        ? dataSV.KhoaHoc
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_TenNganh = dataSV.ChuyenNganh
        ? dataSV.ChuyenNganh
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_TenLop = dataSV.LopHoc
        ? dataSV.LopHoc
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_DienThoai = dataSV.SoDienThoai
        ? dataSV.SoDienThoai
        : dataSV.SoDienThoai2
          ? dataSV.SoDienThoai2
          : dataSV.SoDienThoai3
            ? dataSV.SoDienThoai3
            : 'null'
      dataHocPhan.MC_KT_HDKThiLai_Email = dataSV.Email_TruongCap
        ? dataSV.Email_TruongCap
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_YeuCau = lyDo
      dataHocPhan.MC_KT_HDKThiLai_NgaySinh2 = dataSV.NgaySinh
        ? new Date(
            `${dataSV.NgaySinh.split('/')[2]}-${
              dataSV.NgaySinh.split('/')[1]
            }-${dataSV.NgaySinh.split('/')[0]}`,
          ).toISOString()
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_IDSinhVien = dataSV.IdSinhVien
        ? dataSV.IdSinhVien.toString()
        : 'null'
      //data trong bảng
      dataHocPhan.MC_KT_HDKThiLai_LoaiThi = loaiThi
      dataHocPhan.MC_KT_HDKThiLai_TenHinhThucThi = itemHocPhan.TenHinhThucThi
        ? itemHocPhan.TenHinhThucThi
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_MaLopHocPhan = itemHocPhan.MaLopHocPhan
        ? itemHocPhan.MaLopHocPhan
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_TenMonHoc = itemHocPhan.TenMonHoc
        ? itemHocPhan.TenMonHoc
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_DiemThuongKy1 = itemHocPhan.DiemTBThuongKy
        ? itemHocPhan.DiemTBThuongKy.toString()
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_DiemThi = itemHocPhan.DiemThi
        ? itemHocPhan.DiemThi.toString()
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_DiemThi1 = itemHocPhan.DiemThi1
        ? itemHocPhan.DiemThi1.toString()
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_DiemThi2 = itemHocPhan.DiemThi2
        ? itemHocPhan.DiemThi2.toString()
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_DiemTongKet = itemHocPhan.DiemTongKet
        ? itemHocPhan.DiemTongKet.toString()
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_DiemTongKet1 = itemHocPhan.DiemTongKet1
        ? itemHocPhan.DiemTongKet1.toString()
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_DiemTongKet2 = itemHocPhan.DiemTongKet2
        ? itemHocPhan.DiemTongKet2.toString()
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_DiemTinChi = itemHocPhan.DiemTinChi
        ? itemHocPhan.DiemTinChi.toString()
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_DiemChu = itemHocPhan.DiemChu
        ? itemHocPhan.DiemChu
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_IsDat =
        itemHocPhan.IsDat !== null ? itemHocPhan.IsDat.toString() : 'null'
      dataHocPhan.MC_KT_HDKThiLai_KhoaChuQuanMon = itemHocPhan.KhoaChuQuanMon
        ? itemHocPhan.KhoaChuQuanMon
        : 'null'
      dataHocPhan.MC_KT_HDKThiLai_YeuCau_LyDoKhac_LyDoChiTiet = lyDoKhac.length
        ? lyDoKhac
        : 'null'
    }

    // handle post
    Swal.fire({
      title: 'Bạn chắc chắn muốn gửi yêu cầu hủy đăng ký thi lại?',
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
      const checkHDKThiTrung = await getKiemTraTrungHDKThi(
        dataHocPhan.MC_KT_HDKThiLai_MaSinhVien,
        dataHocPhan.MC_KT_HDKThiLai_TenCoSo,
        dataHocPhan.MC_KT_HDKThiLai_TenDot,
        dataHocPhan.MC_KT_HDKThiLai_MaLopHocPhan,
        dataHocPhan.MC_KT_HDKThiLai_LoaiThi,
      )
      if (checkHDKThiTrung.status === 200) {
        // kiểm tra trùng yêu cầu
        if (checkHDKThiTrung.data?.body[0]) {
          Swal.fire({
            icon: 'error',
            title: 'Thông báo trùng',
            text: `Học phần ${dataHocPhan.MC_KT_HDKThiLai_TenMonHoc} đã hết được gửi yêu cầu hủy đăng ký thi lại trước đây. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
          })
          return
        }
        const resPostData = await postHDKThiLai(dataHocPhan)

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
              text: `Học phần ${dataHocPhan.MC_KT_HDKThiLai_TenMonHoc} đã hết được gửi yêu cầu hủy đăng ký thi lại trước đây. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
            })
          } else {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: `Học phần ${dataHocPhan.MC_KT_HDKThiLai_TenMonHoc} đã được gửi yêu cầu hủy đăng ký thi lại. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
              showConfirmButton: false,
              timer: 1500,
            })

            setTimeout(() => {
              window.location.reload()
            }, 1000)
          }
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

  useEffect(() => {
    getTenDotHDKThiLai().then((res) => {
      setListHocKy(res?.data?.body)
    })

    setLoading(false)

    if (tenDot !== '' && lyDo !== '') {
      setLoading(true)
      getAllHocPhanHDKThiLai(dataSV.MaSinhVien, tenDot, loaiThi, lyDo).then(
        (res) => {
          setLoading(false)
          setListHocPhan(res?.data?.body)
        },
      )
    }

    return () => {
      setListHocPhan([])
      setSelectedRows([])
    }
  }, [tenDot, lyDo])

  return (
    <HuyDangKyThiLaiView
      home={home}
      breadcrumbs={breadcrumbs}
      listHocKy={listHocKy}
      tenDot={tenDot}
      setTenDot={setTenDot}
      loaiThi={loaiThi}
      listHocPhan={listHocPhan}
      lyDo={lyDo}
      setLyDo={setLyDo}
      lyDoKhac={lyDoKhac}
      setLyDoKhac={setLyDoKhac}
      listLyDo={listLyDo}
      handleRowSelection={handleRowSelection}
      handleSubmitData={handleSubmitData}
      loading={loading}
    />
  )
}

export default HuyDangKyThiLai
