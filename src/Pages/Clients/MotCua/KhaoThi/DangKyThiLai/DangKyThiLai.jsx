import { useEffect, useState } from 'react'
import DangKyThiLaiView from './DangKyThiLaiView'
import {
  getAllHocPhanDKThiLai,
  postDangKyThiLai,
} from '@/Apis/MotCua/KhaoThi/apiDangKyThiLai'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import Swal from 'sweetalert2'
import { getTenDot } from '@/Apis/MotCua/apiTenDot'
import { required } from '@/Services/Validators/required'
import {
  makeDataSv,
  makePostDataSv,
  transformSubmitValue,
} from '@/Services/Utils/dataSubmitUtils'

function DangKyThiLai() {
  const DANG_KY_THI_LAI_PREFIX = 'MC_KT_DangKyThi_'

  const dataSV = DataSinhVien()

  const home = {
    path: '/mot-cua',
    title: 'Bộ phận một cửa',
  }

  const breadcrumbs = [
    {
      path: '/mot-cua/khao-thi',
      title: 'Khảo thí',
    },
    {
      path: '/mot-cua/khao-thi/dang-ky-thi-lai',
      title: 'Đăng ký thi lại',
    },
  ]

  const [loading, setLoading] = useState(true)
  const [listHocKy, setListHocKy] = useState([])
  const [hocKy, setHocKy] = useState('')
  const [lyDo, setLyDo] = useState('0')
  const [listHocPhan, setListHocPhan] = useState([])
  const loaiThi = 'Thi Lại'
  const [lyDoKhac, setLyDoKhac] = useState('')
  const [selectedRow, setSelectedRow] = useState(null)

  useEffect(() => {
    getTenDot().then((res) => {
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
      setSelectedRow(null)
    }
  }, [hocKy, loaiThi, lyDo])

  const middlewareSubmitData = () => {
    return [
      required(selectedRow, 'Vui lòng chọn 1 học phần cần gửi yêu cầu!'),
    ].every((e) => e == true)
  }

  const handleSubmitData = async () => {
    if (!middlewareSubmitData()) {
      return
    }

    let dataHocPhan = {}

    dataHocPhan = makePostDataSv(
      makeDataSv(dataSV, DANG_KY_THI_LAI_PREFIX),
      {
        LoaiThi: transformSubmitValue(loaiThi),
        TenDot: transformSubmitValue(hocKy),
        YeuCau: transformSubmitValue(lyDo.toString()),
        MaLopHocPhan: transformSubmitValue(selectedRow.MaLopHocPhan),
        TenMonHoc: transformSubmitValue(selectedRow.TenMonHoc),
        TenHinhThucThi: transformSubmitValue(selectedRow.TenHinhThucThi),
        DiemThi: transformSubmitValue(selectedRow.DiemThi),
        DiemThi1: transformSubmitValue(selectedRow.DiemThi1),
        DiemThi2: transformSubmitValue(selectedRow.DiemThi2),
        DiemTongKet: transformSubmitValue(selectedRow.DiemTongKet),
        DiemTongKet1: transformSubmitValue(selectedRow.DiemTongKet1),
        DiemTongKet2: transformSubmitValue(selectedRow.DiemTongKet2),
        YeuCau_LyDoKhacChiTiet: transformSubmitValue(lyDoKhac),
      },
      DANG_KY_THI_LAI_PREFIX,
    )

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
      const resPostData = await postDangKyThiLai(dataHocPhan)

      if (resPostData.status === 200) {
        const data = await resPostData.data

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
            text: `Vui lòng chờ kết quả xử lý từ phòng Khảo thí và Đảm bảo chất lượng`,
            showConfirmButton: false,
            timer: 1500,
          })
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi hệ thống',
          text: `Vui lòng thử lại và gửi thông báo lỗi cho bộ phận hỗ trợ phần mềm!`,
        })
        return
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

  const handleRowSelection = (item) => {
    setSelectedRow(item)
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
      selectedRow={selectedRow}
    />
  )
}

export default DangKyThiLai
