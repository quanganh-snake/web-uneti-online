import React, { useEffect, useState } from 'react'
import ChuyenDiemView from './ChuyenDiemView'
import {
  getAllHocPhanChuyenDiem,
  getAllHocPhanTuongDuongChuyenDiem,
  getKiemTraTrungChuyenDiem,
  postChuyenDiem,
  postChuyenDiemChiTiet,
} from '@/Apis/MotCua/DaoTao/apiChuyenDiem'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { convertDataFileToBase64 } from '@/Services/Utils/stringUtils'
import Swal from 'sweetalert2'

function ChuyenDiem() {
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
      path: '/motcua/daotao/chuyendiem',
      title: 'Chuyển điểm',
    },
  ]

  const listLoaiDiem = [
    {
      value: '0',
      text: 'Hệ 10',
    },
    {
      value: '1',
      text: 'Hệ 4',
    },
  ]

  const xinChuyen = {
    value: '0',
    text: 'Học phần tương đương',
  }

  const [listHocPhan, setListHocPhan] = useState([])

  const [loaiDiem, setLoaiDiem] = useState(listLoaiDiem[0].value)
  const [lyDo, setLyDo] = useState(
    'Đề nghị công nhận kết quả học tập các học phần đã học cho học phần tương đương khác',
  )
  const [giayToKemTheo, setGiayToKemTheo] = useState('Đơn xin chuyển điểm')

  const [currentPage, setCurrentPage] = useState(1)

  const [hocPhan, setHocPhan] = useState({})

  const [listHocPhanTuongDuong, setListHocPhanTuongDuong] = useState([])

  const [hocPhanTuongDuong, setHocPhanTuongDuong] = useState({})

  const [files, setFiles] = useState([])

  const dataSV = DataSinhVien()

  const handleSelectHocPhan = (e, hp) => {
    setHocPhan(() => hp)
  }

  const handleSelectHocPhanTuongDuong = (e, hp) => {
    setHocPhanTuongDuong(() => hp)
  }

  const handleDownloadFile = () => {
    console.log('download file here')
  }

  const handleFilesChange = (file) => {
    setFiles((_files) => [..._files, file])
  }

  useEffect(() => {
    getAllHocPhanChuyenDiem(dataSV.MaSinhVien).then((res) => {
      setListHocPhan(res?.data?.body)
    })

    return () => {
      setListHocPhan([])
      setListHocPhanTuongDuong([])
      setHocPhanTuongDuong({})
      setFiles([])
    }
  }, [])

  const handleChangePage = (e, page) => {
    setCurrentPage(() => page)
    setHocPhan(() => ({}))
    setHocPhanTuongDuong(() => ({}))
  }

  // check object null
  function isEmpty(obj) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) return false
    }
    return true
  }

  useEffect(() => {
    if (!isEmpty(hocPhan)) {
      getAllHocPhanTuongDuongChuyenDiem(
        dataSV.MaSinhVien,
        hocPhan.MC_DT_ChuyenDiem_ChiTiet_MaMonHoc,
      ).then((res) => {
        setListHocPhanTuongDuong(res?.data?.body)
      })
    }

    return () => {
      setListHocPhanTuongDuong([])
      setHocPhanTuongDuong({})
      setFiles([])
    }
  }, [hocPhan])

  const handleSubmitData = async (e) => {
    e.preventDefault()

    // if (isEmpty(hocPhan) || isEmpty(hocPhanTuongDuong)) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Lỗi",
    //     text: "Vui lòng chọn học phần và học phần tương đương để gửi yêu cầu",
    //   });
    //   return;
    // }

    const dataChuyenDiem = {}
    const dataChuyenDiemChiTiet = {}

    // dataChuyenDiem
    dataChuyenDiem.MC_DT_ChuyenDiem_TenCoSo = dataSV.CoSo ? dataSV.CoSo : 'null'
    dataChuyenDiem.MC_DT_ChuyenDiem_IDSinhVien = dataSV.IdSinhVien
      ? dataSV.IdSinhVien.toString()
      : 'null'
    dataChuyenDiem.MC_DT_ChuyenDiem_MaSinhVien = dataSV.MaSinhVien
      ? dataSV.MaSinhVien
      : 'null'
    dataChuyenDiem.MC_DT_ChuyenDiem_HoDem = dataSV.HoDem ? dataSV.HoDem : 'null'
    dataChuyenDiem.MC_DT_ChuyenDiem_Ten = dataSV.Ten ? dataSV.Ten : 'null'
    dataChuyenDiem.MC_DT_ChuyenDiem_GioiTinh = dataSV.GioiTinh ?? 'null'
    dataChuyenDiem.MC_DT_ChuyenDiem_NgaySinh2 = dataSV.NgaySinh
      ? new Date(
          `${dataSV.NgaySinh.split('/')[2]}-${dataSV.NgaySinh.split('/')[1]}-${
            dataSV.NgaySinh.split('/')[0]
          }`,
        ).toISOString()
      : 'null'
    dataChuyenDiem.MC_DT_ChuyenDiem_TenHeDaoTao = dataSV.BacDaoTao
      ? dataSV.BacDaoTao
      : 'null'
    dataChuyenDiem.MC_DT_ChuyenDiem_TenLoaiHinhDT = dataSV.LoaiHinhDaoTao
      ? dataSV.LoaiHinhDaoTao
      : 'null'
    dataChuyenDiem.MC_DT_ChuyenDiem_TenKhoaHoc = dataSV.KhoaHoc
      ? dataSV.KhoaHoc
      : 'null'
    dataChuyenDiem.MC_DT_ChuyenDiem_TenNganh = dataSV.ChuyenNganh
      ? dataSV.ChuyenNganh
      : 'null'
    dataChuyenDiem.MC_DT_ChuyenDiem_TenLop = dataSV.LopHoc
      ? dataSV.LopHoc
      : 'null'
    dataChuyenDiem.MC_DT_ChuyenDiem_KhoaChuQuanLop =
      hocPhanTuongDuong.HT_HPTD_TenKhoa
        ? hocPhanTuongDuong.HT_HPTD_TenKhoa
        : 'null'
    dataChuyenDiem.MC_DT_ChuyenDiem_DienThoai = dataSV.SoDienThoai
      ? dataSV.SoDienThoai
      : dataSV.SoDienThoai2
        ? dataSV.SoDienThoai2
        : dataSV.SoDienThoai3
          ? dataSV.SoDienThoai3
          : ''
    dataChuyenDiem.MC_DT_ChuyenDiem_Email = dataSV.Email_TruongCap
      ? dataSV.Email_TruongCap
      : 'null'
    dataChuyenDiem.MC_DT_ChuyenDiem_YeuCau = '0'
    dataChuyenDiem.MC_DT_ChuyenDiem_YeuCau_LyDo = lyDo.length
      ? lyDo.toString()
      : 'null'
    dataChuyenDiem.MC_DT_ChuyenDiem_YeuCau_LoaiBangDiem = loaiDiem.length
      ? loaiDiem.toString()
      : 'null'
    dataChuyenDiem.MC_DT_ChuyenDiem_YeuCau_KemTheo = giayToKemTheo.length
      ? giayToKemTheo
      : 'null'
    dataChuyenDiem.images = []
    for (let i = 0; i < files.length; i++) {
      const fileBase64 = await convertDataFileToBase64(files[i])
      const fileURL = URL.createObjectURL(files[i])

      const fileName = fileURL.split('/').at(-1)

      dataChuyenDiem.images.push({
        MC_DT_ChuyenDiem_YeuCau_DataFile: fileBase64,
        MC_DT_ChuyenDiem_YeuCau_TenFile: fileName,
        urlTemp: fileURL,
        lastModified: '',
      })

      // URL temp chỉ tồn tại trên client, nên revoke
      URL.revokeObjectURL(fileURL)
    }

    // dataChuyenDiemChiTiet
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ID = '1'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_IDDot =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_IDDot
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_IDDot.toString()
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_IDLopHocPhan =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_IDLopHocPhan
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_IDLopHocPhan.toString()
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_NamHoc =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_NamHoc
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_NamHoc.toString()
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_HocKy =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_HocKy
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_HocKy
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_MaMonHoc =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_MTD_MaMonHoc
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_MTD_MaMonHoc
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_MaHocPhan =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_MaHocPhan
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_MaHocPhan
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_TenMonHoc =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_TenMonHoc
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_TenMonHoc
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_GhiChuXetDuThi =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_GhiChuXetDuThi
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_GhiChuXetDuThi
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_TenLopHoc =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_TenLopHoc
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_TenLopHoc
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_SoTinChi =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_SoTinChi
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_SoTinChi.toString()
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_DiemTBThuongKy =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemTBThuongKy
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemTBThuongKy.toString()
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_KhongTinhDiemTBC =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_KhongTinhDiemTBC !== null
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_KhongTinhDiemTBC.toString()
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_TenTrangThai =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_TenTrangThai
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_TenTrangThai
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_DiemThi =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemThi
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemThi.toString()
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_DiemThi1 =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemThi1
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemThi1.toString()
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_DiemThi2 =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemThi2
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemThi2.toString()
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_DiemTongKet =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemTongKet
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemTongKet.toString()
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_DiemTongKet1 =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemTongKet1
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemTongKet1.toString()
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_DiemTongKet2 =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemTongKet2
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemTongKet2.toString()
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_DiemTinChi =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemTinChi
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemTinChi.toString()
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_DiemChu =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemChu
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemChu
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_XepLoai =
      hocPhan.MC_DT_ChuyenDiem_ChiTiet_XepLoai
        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_XepLoai
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_MTD_BacDaoTao =
      hocPhanTuongDuong.HT_HPTD_MCD_BacDaoTao
        ? hocPhanTuongDuong.HT_HPTD_MCD_BacDaoTao
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_MTD_MaMonHoc =
      hocPhanTuongDuong.HT_HPTD_MTD_MaMonHoc
        ? hocPhanTuongDuong.HT_HPTD_MTD_MaMonHoc
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_MTD_TenMonHoc =
      hocPhanTuongDuong.HT_HPTD_MCD_TenMonHoc
        ? hocPhanTuongDuong.HT_HPTD_MCD_TenMonHoc
        : 'null'
    dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_MTD_SoTinChi =
      hocPhanTuongDuong.HT_HPTD_MTD_SoTinChi
        ? hocPhanTuongDuong.HT_HPTD_MTD_SoTinChi.toString()
        : 'null'

    // handle post
    Swal.fire({
      title: `Bạn chắc chắn muốn gửi yêu cầu chuyển điểm môn ${dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_MTD_TenMonHoc}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Gửi',
      denyButtonText: `Hủy`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handlePostData(dataChuyenDiem, dataChuyenDiemChiTiet)
      } else if (result.isDenied) {
        Swal.fire('Đã hủy gửi yêu cầu hủy đăng ký chuyển điểm', '', 'info')
      }
    })
  }

  const handlePostData = async (dataChuyenDiem, dataChuyenDiemChiTiet) => {
    try {
      // kiểm tra trùng
      const checkTrungChuyenDiem = await getKiemTraTrungChuyenDiem(
        dataChuyenDiem.MC_DT_ChuyenDiem_MaSinhVien,
        dataChuyenDiem.MC_DT_ChuyenDiem_YeuCau,
        dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_HocKy,
        dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_MTD_MaMonHoc,
      )

      if (checkTrungChuyenDiem.status === 200) {
        if (checkTrungChuyenDiem.data?.body.length) {
          Swal.fire({
            icon: 'error',
            title: 'Thông báo trùng',
            text: `Yêu cầu chuyển điểm môn ${dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_MTD_TenMonHoc} đã được gửi trước đấy. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
          })
          return
        }
      }

      // post
      const resPostDataChuyenDiem = await postChuyenDiem(dataChuyenDiem)
      if (resPostDataChuyenDiem == 'ERR_BAD_REQUEST') {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi hệ thống',
          text: `Vui lòng thử lại và gửi thông báo lỗi cho bộ phận hỗ trợ phần mềm!`,
        })
        return
      }
      if (resPostDataChuyenDiem.status !== 200) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi hệ thống',
          text: `Vui lòng thử lại và gửi thông báo lỗi cho bộ phận hỗ trợ phần mềm!`,
        })
        return
      }
      const resPostDataChuyenDiemChiTiet = await postChuyenDiemChiTiet(
        dataChuyenDiemChiTiet,
      )
      if (resPostDataChuyenDiemChiTiet == 'ERR_BAD_REQUEST') {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi hệ thống',
          text: `Vui lòng thử lại và gửi thông báo lỗi cho bộ phận hỗ trợ phần mềm!`,
        })
        return
      }
      if (resPostDataChuyenDiemChiTiet.status !== 200) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi hệ thống',
          text: `Vui lòng thử lại và gửi thông báo lỗi cho bộ phận hỗ trợ phần mềm!`,
        })
        return
      }

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Yêu cầu chuyển điểm môn ${dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_MTD_TenMonHoc} đã được gửi thành công. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
        showConfirmButton: false,
        timer: 1500,
      })

      setTimeout(() => {
        window.location.reload()
      }, 1000)
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
    <ChuyenDiemView
      home={home}
      breadcrumbs={breadcrumbs}
      xinChuyen={xinChuyen}
      listLoaiDiem={listLoaiDiem}
      loaiDiem={loaiDiem}
      setLoaiDiem={setLoaiDiem}
      lyDo={lyDo}
      setLyDo={setLyDo}
      giayToKemTheo={giayToKemTheo}
      setGiayToKemTheo={setGiayToKemTheo}
      listHocPhan={listHocPhan}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      hocPhan={hocPhan}
      setHocPhan={setHocPhan}
      handleSelectHocPhan={handleSelectHocPhan}
      listHocPhanTuongDuong={listHocPhanTuongDuong}
      handleChangePage={handleChangePage}
      hocPhanTuongDuong={hocPhanTuongDuong}
      setHocPhanTuongDuong={setHocPhanTuongDuong}
      handleSelectHocPhanTuongDuong={handleSelectHocPhanTuongDuong}
      handleDownloadFile={handleDownloadFile}
      files={files}
      handleFilesChange={handleFilesChange}
      handleSubmitData={handleSubmitData}
      isEmpty={isEmpty}
    />
  )
}

export default ChuyenDiem
