import { useState } from 'react'
import { DangKyTotNghiepView } from './DangKyTotNghiepView'
import { useEffect } from 'react'
import { getTenDot } from '@/Apis/MotCua/apiTenDot'
import Swal from 'sweetalert2'
import { convertDataFileToBase64 } from '@/Services/Utils/stringUtils'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { postDangKyTotNghiep } from '@/Apis/MotCua/DaoTao/apiDangKyTotNghiep'
import { required } from '@/Services/Validators/required'
import {
  makeDataImages,
  makeDataSv,
  makePostDataSv,
} from '@/Services/Utils/dataSubmitUtils'

const MC_DT_DangKyTotNghiep_PREFIX = 'MC_DT_TotNghiepXetThi_'
const MC_DT_DangKyTotNghiep_FILE_PREFIX = `${MC_DT_DangKyTotNghiep_PREFIX}YeuCau_`

function DangKyTotNghiep() {
  const [listTenDot, setListTenDot] = useState([])
  const [tenDot, setTenDot] = useState('')
  const [lyDo, setLyDo] = useState(
    'Hoãn tốt nghiệp (Do: 1. Có nguyện vọng học cải thiện một số học phần để có kết quả học tập tốt hơn).',
  )
  const [yeuCau, setYeuCau] = useState('')
  const [giayToKemTheo, setGiayToKemTheo] = useState(
    '1. Đơn xin hoãn xét công nhận tốt nghiệp.',
  )
  const [files, setFiles] = useState([])

  const dataSV = DataSinhVien()

  const handleFilesChange = (file) => {
    setFiles((_files) => [..._files, file])
  }

  const handleRemoveFile = (file) => {
    setFiles((_files) => _files.filter((e) => e !== file))
  }

  const handleChangeValue = (e) => {
    if (e.target.id === 'MC_DT_TotNghiepXetThi_TenDot') {
      setTenDot(e.target.value)
    }
    if (e.target.id === 'MC_DT_TotNghiepXetThi_YeuCau_LyDo') {
      setLyDo(e.target.value)
      console.log(lyDo)
    }
    if (e.target.id === 'MC_DT_TotNghiepXetThi_YeuCau_KemTheo') {
      setGiayToKemTheo(e.target.value)
    }
    if (e.target.id === 'MC_DT_TotNghiepXetThi_YeuCau') {
      setYeuCau(e.target.value)
    }
  }

  const validateSubmitData = () => {
    return [
      required(lyDo, 'Vui lòng nhập lý do!'),
      required(yeuCau, 'Vui lòng chọn yêu cầu!'),
      required(tenDot, 'Vui lòng chọn học kỳ!'),
    ].every((e) => e === true)
  }

  const handleSubmitData = async (e) => {
    e.preventDefault()

    if (!validateSubmitData()) return

    const data = makePostDataSv(
      makeDataSv(dataSV, MC_DT_DangKyTotNghiep_PREFIX),
      {
        YeuCau: yeuCau,
        YeuCau_LyDo: lyDo,
        YeuCau_KemTheo: giayToKemTheo,
        TenDot: tenDot,
        TenDotXet: ' ',
      },
      MC_DT_DangKyTotNghiep_PREFIX,
    )

    // images
    data.images = await makeDataImages(files, MC_DT_DangKyTotNghiep_FILE_PREFIX)

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
      const resPostData = await postDangKyTotNghiep(data)

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

          setTimeout(() => {
            window.location.reload()
          }, 1000)
        }
      }
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

  useEffect(() => {
    const getListTenDot = async () => {
      const res = await getTenDot()
      setListTenDot(res.data.body)
    }

    getListTenDot()
  }, [])

  return (
    <DangKyTotNghiepView
      lyDo={lyDo}
      yeuCau={yeuCau}
      tenDot={tenDot}
      giayToKemTheo={giayToKemTheo}
      files={files}
      listTenDot={listTenDot}
      handleFilesChange={handleFilesChange}
      handleChangeValue={handleChangeValue}
      handleSubmitData={handleSubmitData}
      handleRemoveFile={handleRemoveFile}
    />
  )
}

export default DangKyTotNghiep
