import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { breadcrumbs, home } from './constants'
import { XacNhanForm } from './XacNhanForm'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { postYeuCauXacNhan } from '@/Apis/MotCua/CTSV/apiXacNhan'
import { GiayToKemTheoAlert } from '@/Components/MotCua/GiayToKemTheoAlert'
import { VanBanMauID } from '@/Services/Tokens/filesId'
import { required } from '@/Services/Validators/required'
import {
  makeDataImages,
  makeDataSv,
  makePostDataSv,
} from '@/Services/Utils/dataSubmitUtils'

const XAC_NHAN_CTSV_PREFIX = 'MC_HSSV_XacNhan_'
const XAC_NHAN_CTSV_FILE_PREFIX = `${XAC_NHAN_CTSV_PREFIX}YeuCau_`

function XacNhanCTSV() {
  const [lyDo, setLyDo] = useState('')
  const [giayToKemTheo, setGiayToKemTheo] = useState('Không có')
  const [yeuCau, setYeuCau] = useState('')
  const [noiNhanKetQua, setNoiNhanKetQua] = useState('')
  const [files, setFiles] = useState([])

  const dataSV = DataSinhVien()

  const handleChangeValue = (e) => {
    const id = e.target.id
    const value = e.target.value

    switch (id) {
      case 'MC_HSSV_XacNhan_YeuCau':
        setYeuCau(value)
        break
      case 'MC_HSSV_XacNhan_YeuCau_LyDo':
        setLyDo(value)
        break
      case 'MC_HSSV_XacNhan_YeuCau_KemTheo':
        setGiayToKemTheo(value)
        break

      case 'MC_HSSV_XacNhan_NoiNhan':
        setNoiNhanKetQua(value)
        break
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
      required(yeuCau, 'Vui lòng chọn yêu cầu!'),
      required(noiNhanKetQua, 'Vui lòng chọn nơi nhận kết quả!'),
    ].every((e) => e === true)
  }

  const handleSubmitData = async (e) => {
    e.preventDefault()

    if (!validateSubmitData()) return

    const data = makePostDataSv(
      makeDataSv(dataSV, XAC_NHAN_CTSV_PREFIX),
      {
        YeuCau: yeuCau,
        YeuCau_LyDo: lyDo,
        YeuCau_KemTheo: giayToKemTheo,
        DangKyNoiNhanKetQua: noiNhanKetQua,
      },
      XAC_NHAN_CTSV_PREFIX,
    )

    // images
    data.images = await makeDataImages(files, XAC_NHAN_CTSV_FILE_PREFIX)

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
      const resPostData = await postYeuCauXacNhan(data)

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
            text: `Vui lòng chờ kết quả xử lý từ phòng Chính trị và Công tác sinh viên`,
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
    <div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

        <div className="form-submit flex flex-col w-full justify-center">
          <h2 className="text-center uppercase text-2xl font-semibold text-sky-800 mb-6">
            Tiếp nhận yêu cầu xác nhận
          </h2>
          <div className="lg:px-36">
            <XacNhanForm
              lyDo={lyDo}
              yeuCau={yeuCau}
              giayToKemTheo={giayToKemTheo}
              noiNhanKetQua={noiNhanKetQua}
              files={files}
              handleChangeValue={handleChangeValue}
              handleFilesChange={handleFilesChange}
              handleRemoveFile={handleRemoveFile}
            />

            <div className="relative sm:rounded-lg my-6">
              <div className="pb-10 uneti-action flex justify-center">
                <button
                  onClick={handleSubmitData}
                  className="px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-full hover:bg-sky-800 hover:text-white"
                >
                  Gửi yêu cầu
                </button>
              </div>
            </div>
          </div>

          <GiayToKemTheoAlert
            downloadId={VanBanMauID.MotCua.CTSV.XacNhan}
            downloadText="Xác nhận"
          />
        </div>
      </div>
    </div>
  )
}

export default XacNhanCTSV
