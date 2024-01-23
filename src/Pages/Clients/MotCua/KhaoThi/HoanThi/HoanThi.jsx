import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { useState } from 'react'
import { useEffect } from 'react'
import { postHoanThi } from '@/Apis/MotCua/KhaoThi/apiHoanThi'
import { getAllHocPhanHoanThi } from '@/Apis/MotCua/KhaoThi/apiHoanThi'
import Swal from 'sweetalert2'
import { isEqual } from 'lodash-unified'
import { LY_DO_KHAC, breadcrumbs, home } from './constants'
import { HoanThiForm } from './HoanThiForm'
import { HoanThiTable } from './HoanThiTable'
import { usePrevious } from '@/Services/Hooks/usePrevious'
import { getTenDot } from '@/Apis/MotCua/apiTenDot'
import { required } from '@/Services/Middlewares/required'
import {
  makeDataImages,
  makeDataSv,
  makePostDataSv,
  transformSubmitValue,
} from '@/Services/Utils/dataSubmitUtils'

const HOAN_THI_PREFIX = 'MC_KT_HoanThi_'

function HoanThi() {
  const [loading, setLoading] = useState(false)
  const [listHocKy, setListHocKy] = useState([])
  const [tenDot, setTenDot] = useState(null)
  const [loaiThi, setLoaiThi] = useState(null)
  const [lyDo, setLyDo] = useState(null)
  const [lyDoChiTiet, setLyDoChiTiet] = useState(null)
  const [listHocPhan, setListHocPhan] = useState([])
  const [files, setFiles] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)

  const prevState = usePrevious({
    tenDot,
  })

  const dataSV = DataSinhVien()

  const handleChangeValue = (e) => {
    if (e.target.id === 'MC_KT_HoanThi_TenDot') {
      setTenDot(e.target.value)
    }

    if (e.target.id === 'MC_KT_HoanThi_LoaiThi') {
      setLoaiThi(e.target.value)
    }

    if (e.target.id === 'MC_KT_HoanThi_YeuCau') {
      setLyDo(e.target.value)
    }

    if (e.target.id === 'MC_KT_HoanThi_YeuCau_LyDoKhac_LyDoChiTiet') {
      setLyDoChiTiet(e.target.value)
    }
  }

  const handleRowSelection = (row) => {
    setSelectedRow(isEqual(selectedRow, row) ? null : row)
  }

  const handleFilesChange = (file) => {
    if (files.length >= 5) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Chỉ được chọn tối đa 5 ảnh!',
      })
      return
    }

    setFiles((_files) => [..._files, file])
  }

  const middlewareSubmitData = () => {
    return [
      required(tenDot, 'Vui lòng chọn học kỳ!'),
      required(loaiThi, 'Vui lòng chọn loại thi!'),
      required(lyDo, 'Vui lòng chọn lý do!'),
      required(selectedRow, 'Vui lòng chọn 1 học phần cần gửi yêu cầu!'),
    ].every((e) => e == true)
  }

  const handleSubmitData = async (event) => {
    event.preventDefault()

    if (!middlewareSubmitData()) {
      return
    }

    const itemHocPhan = selectedRow

    let dataHocPhan = {}
    if (itemHocPhan) {
      dataHocPhan = makePostDataSv(
        makeDataSv(dataSV, HOAN_THI_PREFIX),
        {
          TenDot: transformSubmitValue(tenDot),
          MaLopHocPhan: transformSubmitValue(itemHocPhan.MaLopHocPhan),
          MaMonHoc: transformSubmitValue(itemHocPhan.MaMonHoc),
          TenMonHoc: transformSubmitValue(itemHocPhan.TenMonHoc),
          KhoaChuQuanMon: transformSubmitValue(itemHocPhan.KhoaChuQuanMon),
          TenHinhThucThi: transformSubmitValue(itemHocPhan.TenHinhThucThi),
          NgayThi: transformSubmitValue(itemHocPhan.NgayThi),
          Thu: transformSubmitValue(itemHocPhan.Thu),
          Nhom: transformSubmitValue(itemHocPhan.Nhom),
          TuTiet: transformSubmitValue(itemHocPhan.TuTiet),
          DenTiet: transformSubmitValue(itemHocPhan.DenTiet),
          LoaiThi: transformSubmitValue(itemHocPhan.LoaiThi),
          TenPhong: transformSubmitValue(itemHocPhan.TenPhong),
          YeuCau: `${lyDo}`,
          YeuCau_XemLich_LyDo: `${lyDo}`,
          YeuCau_LyDoKhac_LyDoChiTiet: `${lyDoChiTiet}`,
        },
        HOAN_THI_PREFIX,
      )

      // images
      dataHocPhan.images = await makeDataImages(files, 'MC_KT_HoanThi_YeuCau_')
    }

    // handle post
    Swal.fire({
      title: `Bạn chắc chắn muốn gửi yêu cầu hoãn thi môn ${dataHocPhan.MC_KT_HoanThi_TenMonHoc}`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Gửi',
      denyButtonText: `Hủy`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        handlePostData(dataHocPhan)
      } else if (result.isDenied) {
        Swal.fire(
          `Đã hủy gửi yêu cầu hoãn thi môn ${dataHocPhan.MC_KT_HoanThi_TenMonHoc}`,
          '',
          'info',
        )
      }
    })
  }

  const handlePostData = async (dataHocPhan) => {
    try {
      const resPostData = await postHoanThi(dataHocPhan)

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
            text: `Học phần ${dataHocPhan.MC_KT_HoanThi_TenMonHoc} đã được gửi yêu cầu trước đấy. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
          })
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Học phần ${dataHocPhan.MC_KT_HoanThi_TenMonHoc} đã được gửi yêu cầu thành công. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
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
    ;(async () => {
      const res = await getTenDot()
      setListHocKy(res?.data?.body)
    })()

    // --
    ;(async () => {
      if (lyDo == LY_DO_KHAC) return

      if (!tenDot || !loaiThi || !lyDo) {
        setListHocPhan([])
        setSelectedRow(null)

        return
      }

      setLoading(true)
      const res = await getAllHocPhanHoanThi(
        dataSV.MaSinhVien,
        tenDot,
        loaiThi,
        lyDo,
      )

      setLoading(false)
      setListHocPhan(res?.data?.body)

      if (prevState.tenDot != tenDot) {
        setSelectedRow(null)
      }
    })()
  }, [tenDot, loaiThi, lyDo])

  return (
    <div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

        <div className="form-submit flex flex-col w-full justify-center">
          <h2 className="text-center uppercase text-2xl font-bold text-sky-800 mb-6">
            Tiếp nhận yêu cầu hoãn thi
          </h2>
          <div className="lg:px-36">
            <HoanThiForm
              listHocKy={listHocKy}
              handleChangeValue={handleChangeValue}
              lyDo={lyDo}
            />

            {/* START: Table học phần */}
            <HoanThiTable
              loading={loading}
              tenDot={tenDot}
              loaiThi={loaiThi}
              lyDo={lyDo}
              listHocPhan={listHocPhan}
              selectedRow={selectedRow}
              files={files}
              handleRowSelection={handleRowSelection}
              handleFilesChange={handleFilesChange}
              handleSubmitData={handleSubmitData}
            />
            {/* END: Table học phần */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HoanThi
