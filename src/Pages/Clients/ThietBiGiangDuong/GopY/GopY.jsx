import { postGopY } from '@/Apis/HoTroThietBiGiangDuong/apiGopY'
import { GopYView } from '@/Components/HoTroThietBiGiangDuong/GopY/GopYView'
import { convertDataFileToBase64 } from '@/Services/Utils/stringUtils'
import { useState } from 'react'
import Swal from 'sweetalert2'

export default function GopY() {
  const [tieuDe, setTieuDe] = useState('')
  const [noiDung, setNoiDung] = useState('')

  const [files, setFiles] = useState([])

  const handleRemoveFile = (file) => {
    setFiles([])
  }

  const handleFilesChange = (file) => {
    setFiles([file])
  }

  const handleChangeValue = (e) => {
    if (e.target.id == 'HTTBGD_TieuDe') {
      setTieuDe(e.target.value)
    }
    if (e.target.id == 'HTTBGD_NoiDung') {
      setNoiDung(e.target.value)
    }
  }

  const handleSubmitData = async () => {
    if (tieuDe.length === 0 || noiDung.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng nhập đầy đủ thông tin',
      })
      return
    }

    let dataGopY = {}

    let fileToBase64 = await convertDataFileToBase64(files[0])

    dataGopY.DT_CVNB_TBGD_GY_TieuDe = tieuDe
    dataGopY.DT_CVNB_TBGD_GY_NoiDung = noiDung
    dataGopY.DT_CVNB_TBGD_GY_TenFile = files.length ? files[0].name : 'null'
    dataGopY.DT_CVNB_TBGD_GY_DataFile = files.length ? fileToBase64 : 'null'

    // handle post
    Swal.fire({
      title: 'Bạn chắc chắn muốn gửi góp ý?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Gửi',
      denyButtonText: `Hủy`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handlePostData(dataGopY)
      } else if (result.isDenied) {
        Swal.fire('Đã hủy gửi góp ý', '', 'info')
      }
    })
  }

  const handlePostData = async (dataGopY) => {
    try {
      const resPostData = await postGopY(dataGopY)

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

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Gửi góp ý thành công!`,
          showConfirmButton: false,
          timer: 1500,
        })

        setTimeout(() => {
          window.location.reload()
        }, 1000)
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
    <GopYView
      tieuDe={tieuDe}
      noiDung={noiDung}
      files={files}
      handleRemoveFile={handleRemoveFile}
      handleFilesChange={handleFilesChange}
      handleChangeValue={handleChangeValue}
      handleSubmitData={handleSubmitData}
    />
  )
}
