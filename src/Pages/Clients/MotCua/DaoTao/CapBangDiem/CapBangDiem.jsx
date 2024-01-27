import { CapBangDiemView } from './CapBangDiemView'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { postCapBangDiem } from '@/Apis/MotCua/DaoTao/apiCapBangDiem'
import { required } from '@/Services/Validators/required'
import {
  makeDataImages,
  makeDataSv,
  makePostDataSv,
} from '@/Services/Utils/dataSubmitUtils'

const CAP_BANG_DIEM_PREFIX = 'MC_DT_CapBangDiem_'
const CAP_BANG_DIEM_FILE_PREFIX = `${CAP_BANG_DIEM_PREFIX}YeuCau_`

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

  const handleRemoveFile = (file) => {
    setFiles((_files) => _files.filter((e) => e !== file))
  }

  const validateSubmitData = () => {
    return [
      required(lyDo, 'Vui lòng nhập lý do!'),
      required(loaiBangDiem, 'Vui lòng chọn loại bảng điểm!'),
      required(yeuCau, 'Vui lòng chọn yêu cầu!'),
      required(noiNhanKetQua, 'Vui lòng chọn nơi nhận kết quả!'),
    ].every((e) => e === true)
  }

  const handleSubmitData = async (e) => {
    e.preventDefault()

    if (!validateSubmitData()) {
      return
    }

    const data = makePostDataSv(
      makeDataSv(dataSV, CAP_BANG_DIEM_PREFIX),
      {
        YeuCau: yeuCau,
        YeuCau_LyDo: lyDo,
        YeuCau_LoaiBangDiem: loaiBangDiem,
        YeuCau_KemTheo: giayToKemTheo,
        DangKyNoiNhanKetQua: noiNhanKetQua,
      },
      CAP_BANG_DIEM_PREFIX,
    )

    // images
    data.images = await makeDataImages(files, CAP_BANG_DIEM_FILE_PREFIX)

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
            title: `Gửi yêu cầu thành công`,
            text: `Vui lòng chờ kết quả xử lý từ phòng Đào tạo`,
            showConfirmButton: false,
            timer: 1500,
          })
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
        handleRemoveFile={handleRemoveFile}
      />
    </>
  )
}

export default CapBangDiem
