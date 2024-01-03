import { CapBangDiemView } from './CapBangDiemView'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { convertDataFileToBase64 } from '@/Services/Utils/stringUtils'
import {
  // capBangDiemKiemTraTrung,
  postCapBangDiem,
} from '@/Apis/MotCua/DaoTao/apiCapBangDiem'

function CapBangDiem() {
  const [yeuCau] = useState('1')
  const [loaiBangDiem, setLoaiBangDiem] = useState('')
  const [lyDo, setLyDo] = useState('')
  const [giayToKemTheo, setGiayToKemTheo] = useState(
    'Đơn xin bảng điểm tạm thời',
  )
  const [files, setFiles] = useState([])
  const [noiNhanKetQua, setNoiNhanKetQua] = useState('')

  const dataSV = DataSinhVien()

  const handleChangeValue = (e) => {
    if (e.target.id == 'MC_DT_CapBangDiem_LoaiBangDiem') {
      setLoaiBangDiem(e.target.value)
    }
    if (e.target.id == 'MC_DT_CapBangDiem_YeuCau_LyDo') {
      setLyDo(e.target.value)
    }
    if (e.target.id == 'MC_DT_CapBangDiem_YeuCau_KemTheo') {
      setGiayToKemTheo(e.target.value)
    }
    if (e.target.id == 'MC_DT_CapBangDiem_NoiNhan') {
      setNoiNhanKetQua(e.target.value)
    }
  }

  const handleFilesChange = (file) => {
    setFiles((_files) => [..._files, file])
  }

  const handleSubmitData = async (e) => {
    e.preventDefault()

    if (!lyDo) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng nhập lý do!',
      })
      return
    }

    if (!loaiBangDiem) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn loại bảng điểm!',
      })
      return
    }

    if (!yeuCau) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn yêu cầu!',
      })
      return
    }

    if (!noiNhanKetQua) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn nơi nhận kết quả!',
      })
      return
    }

    const data = {}
    // Data post API
    data.MC_DT_CapBangDiem_TenCoSo = dataSV.CoSo ? dataSV.CoSo : 'null'
    data.MC_DT_CapBangDiem_IDSinhVien = dataSV.IdSinhVien
      ? dataSV.IdSinhVien.toString()
      : 'null'
    data.MC_DT_CapBangDiem_MaSinhVien = dataSV.MaSinhVien
      ? dataSV.MaSinhVien
      : 'null'
    data.MC_DT_CapBangDiem_HoDem = dataSV.HoDem ? dataSV.HoDem : 'null'
    data.MC_DT_CapBangDiem_Ten = dataSV.Ten ? dataSV.Ten : 'null'
    data.MC_DT_CapBangDiem_GioiTinh = `${dataSV.GioiTinh}` ?? 'null'
    data.MC_DT_CapBangDiem_NgaySinh2 = dataSV.NgaySinh
      ? new Date(
          `${dataSV.NgaySinh.split('/')[2]}-${dataSV.NgaySinh.split('/')[1]}-${
            dataSV.NgaySinh.split('/')[0]
          }`,
        ).toISOString()
      : 'null'
    data.MC_DT_CapBangDiem_TenKhoaHoc = dataSV.KhoaHoc ? dataSV.KhoaHoc : 'null'
    data.MC_DT_CapBangDiem_TenNganh = dataSV.ChuyenNganh
      ? dataSV.ChuyenNganh
      : 'null'
    data.MC_DT_CapBangDiem_TenHeDaoTao = dataSV.BacDaoTao
      ? dataSV.BacDaoTao
      : 'null'
    data.MC_DT_CapBangDiem_KhoaChuQuanLop = dataSV.Khoa ? dataSV.Khoa : 'null'
    data.MC_DT_CapBangDiem_TenLoaiHinhDT = dataSV.LoaiHinhDaoTao
      ? dataSV.LoaiHinhDaoTao
      : 'null'
    data.MC_DT_CapBangDiem_TenLop = dataSV.LopHoc ? dataSV.LopHoc : 'null'
    data.MC_DT_CapBangDiem_DienThoai = dataSV.SoDienThoai
      ? dataSV.SoDienThoai
      : dataSV.SoDienThoai2
        ? dataSV.SoDienThoai2
        : dataSV.SoDienThoai3
          ? dataSV.SoDienThoai3
          : ''
    data.MC_DT_CapBangDiem_Email = dataSV.Email_TruongCap
      ? dataSV.Email_TruongCap
      : 'null'

    // Data form
    data.MC_DT_CapBangDiem_YeuCau = yeuCau
    data.MC_DT_CapBangDiem_YeuCau_LyDo = lyDo
    data.MC_DT_CapBangDiem_YeuCau_LoaiBangDiem = loaiBangDiem
    data.MC_DT_CapBangDiem_YeuCau_KemTheo = giayToKemTheo
    data.MC_DT_CapBangDiem_DangKyNoiNhanKetQua = noiNhanKetQua

    // images
    data.images = []
    for (let i = 0; i < files.length; i++) {
      const fileBase64 = await convertDataFileToBase64(files[i])
      const fileURL = URL.createObjectURL(files[i])

      const fileName = fileURL.split('/').at(-1)

      data.images.push({
        MC_DT_CapBangDiem_YeuCau_DataFile: fileBase64,
        MC_DT_CapBangDiem_YeuCau_TenFile: fileName,
        urlTemp: fileURL,
        lastModified: '',
      })

      // URL temp chỉ tồn tại trên client, nên revoke
      URL.revokeObjectURL(fileURL)
    }

    // handle post
    Swal.fire({
      title: `Bạn chắc chắn muốn gửi yêu cầu xác nhận`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Gửi',
      denyButtonText: `Hủy`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        handlePostData(data)
      } else if (result.isDenied) {
        Swal.fire(`Đã hủy gửi yêu cầu xác nhận`, '', 'info')
      }
    })
  }

  const handlePostData = async (data) => {
    try {
      // TODO: fix err api
      // const kiemTraTrung = await capBangDiemKiemTraTrung({
      //   maSinhVien: data.MC_DT_CapBangDiem_MaSinhVien,
      //   yeuCau: data.MC_DT_CapBangDiem_YeuCau,
      //   loaiBangDiem: data.MC_DT_CapBangDiem_YeuCau_LoaiBangDiem
      // })

      // if (kiemTraTrung.status === 200) {
      const resPostData = await postCapBangDiem(data)

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
            title: 'Yêu cầu quá nhiều',
            text: `Yêu cầu đã được gửi trước đó!`,
          })
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Đã gửi yêu cầu xác nhận thành công`,
            showConfirmButton: false,
            timer: 1500,
          })

          // setTimeout(() => {
          //   window.location.reload()
          // }, 1000)
        }
      }
      // }
    } catch (error) {
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

  return (
    <>
      <CapBangDiemView
        yeuCau={yeuCau}
        loaiBangDiem={loaiBangDiem}
        lyDo={lyDo}
        giayToKemTheo={giayToKemTheo}
        noiNhanKetQua={noiNhanKetQua}
        files={files}
        handleSubmitData={handleSubmitData}
        handleFilesChange={handleFilesChange}
        handleChangeValue={handleChangeValue}
      />
    </>
  )
}

export default CapBangDiem
