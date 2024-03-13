import { useEffect, useState } from 'react'
import HuyDangKyThiLaiView from './HuyDangKyThiLaiView'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import {
  getAllHocPhanHDKThiLai,
  postHDKThiLai,
} from '@/Apis/MotCua/KhaoThi/apiHuyDangKyThiLai'
import Swal from 'sweetalert2'
import { getTenDot } from '@/Apis/MotCua/apiTenDot'
import { required } from '@/Services/Validators/required'
import {
  makeDataSv,
  makePostDataSv,
  transformSubmitValue,
} from '@/Services/Utils/dataSubmitUtils'

function HuyDangKyThiLai() {
  const HUY_DANG_KY_THI_LAI_PREFIX = 'MC_KT_HDKThiLai_'

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
      path: '/mot-cua/khao-thi/huy-dang-ky-thi-lai',
      title: 'Hủy đăng ký thi lại',
    },
  ]

  const listLyDo = [
    {
      value: '0',
      name: 'Đạt điểm HP sau khi phúc khảo',
    },
    {
      value: '1',
      name: 'Điều chỉnh điểm thường kỳ (quá trình)',
    },
    {
      value: '2',
      name: 'Hủy đăng ký thi lại để học lại',
    },
    {
      value: '3',
      name: 'Lý do khác',
    },
  ]

  const [listHocKy, setListHocKy] = useState([])
  const [tenDot, setTenDot] = useState('')
  const loaiThi = 'Thi lại'
  const [listHocPhan, setListHocPhan] = useState([])
  const [lyDo, setLyDo] = useState(listLyDo[0].value)
  const [lyDoKhac, setLyDoKhac] = useState('')
  const [selectedRow, setSelectedRow] = useState(null)
  const [loading, setLoading] = useState(true)

  const dataSV = DataSinhVien()

  const handleRowSelection = (item) => {
    setSelectedRow(item)
  }

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
      makeDataSv(dataSV, HUY_DANG_KY_THI_LAI_PREFIX),
      {
        TenDot: transformSubmitValue(tenDot),
        YeuCau: transformSubmitValue(lyDo),
        LoaiThi: transformSubmitValue(loaiThi),
        TenHinhThucThi: transformSubmitValue(selectedRow.TenHinhThucThi),
        MaLopHocPhan: transformSubmitValue(selectedRow.MaLopHocPhan),
        TenMonHoc: transformSubmitValue(selectedRow.TenMonHoc),
        DiemThuongKy1: transformSubmitValue(selectedRow.DiemTBThuongKy),
        DiemThi: transformSubmitValue(selectedRow.DiemThi),
        DiemThi1: transformSubmitValue(selectedRow.DiemThi1),
        DiemThi2: transformSubmitValue(selectedRow.DiemThi2),
        DiemTongKet: transformSubmitValue(selectedRow.DiemTongKet),
        DiemTongKet1: transformSubmitValue(selectedRow.DiemTongKet1),
        DiemTongKet2: transformSubmitValue(selectedRow.DiemTongKet2),
        DiemTinChi: transformSubmitValue(selectedRow.DiemTinChi),
        DiemChu: transformSubmitValue(selectedRow.DiemChu),
        IsDat: transformSubmitValue(selectedRow.IsDat),
        KhoaChuQuanMon: transformSubmitValue(selectedRow.KhoaChuQuanMon),
        YeuCau_LyDoKhac_LyDoChiTiet: transformSubmitValue(lyDoKhac),
      },
      HUY_DANG_KY_THI_LAI_PREFIX,
    )

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
    getTenDot().then((res) => {
      setListHocKy(res?.data?.body)
    })

    setLoading(false)

    if (tenDot !== '') {
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
      setSelectedRow(null)
    }
  }, [tenDot])

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
      selectedRow={selectedRow}
    />
  )
}

export default HuyDangKyThiLai
