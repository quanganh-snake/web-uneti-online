import PhucKhaoView from './PhucKhaoView'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import moment from 'moment'
import { required } from '@/Services/Validators/required'
import {
  makeDataSv,
  makePostDataSv,
  transformSubmitValue,
} from '@/Services/Utils/dataSubmitUtils'
import { dataLoaiThi } from '@/Services/Static/dataStatic'
import { getTenDot } from '@/Apis/MotCua/apiTenDot'
import {
  checkExpiredPhucKhao,
  getAllHocPhanPhucKhao,
  postYeuCauPhucKhao,
} from '@/Apis/MotCua/KhaoThi/apiPhucKhao'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'

function PhucKhao() {
  const PHUC_KHAO_PREFIX = 'MC_KT_PhucKhao_'
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
      path: '/motcua/khaothi/phuckhao',
      title: 'Phúc khảo',
    },
  ]

  const [loading, setLoading] = useState(true)
  const [listHocKy, setListHocKy] = useState([])
  const [tenDot, setTenDot] = useState('')
  const [loaiThi, setLoaiThi] = useState(dataLoaiThi[0].id.toString())
  const [listHocPhan, setListHocPhan] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)

  const dataSV = DataSinhVien()

  // event handlers
  const handleChangeValue = (e) => {
    if (e.target.id === 'MC_KT_PhucKhao_TenDot') {
      setTenDot(e.target.value)
    }

    if (e.target.id === 'MC_KT_PhucKhao_LoaiThi') {
      setLoaiThi(e.target.value)
    }
  }

  const handleRowSelection = (item) => {
    setSelectedRow(item)
  }

  const middlewareSubmitData = () => {
    return [
      required(selectedRow, 'Vui lòng chọn 1 học phần cần gửi yêu cầu!'),
    ].every((e) => e == true)
  }

  const handleSubmitData = async (e) => {
    e.preventDefault()

    if (!middlewareSubmitData()) {
      return
    }

    let dataHocPhan = {}

    dataHocPhan = makePostDataSv(
      makeDataSv(dataSV, PHUC_KHAO_PREFIX),
      {
        TenDot: transformSubmitValue(tenDot),
        MaLopHocPhan: transformSubmitValue(selectedRow.MaLopHocPhan),
        TenMonHoc: transformSubmitValue(selectedRow.TenMonHoc),
        KhoaChuQuanMon: transformSubmitValue(selectedRow.KhoaChuQuanMon),
        TenHinhThucThi: transformSubmitValue(selectedRow.TenHinhThucThi),
        NgayThi: transformSubmitValue(selectedRow.NgayThi),
        Thu: transformSubmitValue(selectedRow.Thu),
        Nhom: transformSubmitValue(selectedRow.Nhom),
        TuTiet: transformSubmitValue(selectedRow.TuTiet),
        DenTiet: transformSubmitValue(selectedRow.DenTiet),
        LoaiThi: transformSubmitValue(selectedRow.LoaiThi),
        TenPhong: transformSubmitValue(selectedRow.TenPhong),
        SBD: transformSubmitValue(selectedRow.SBD),
        DiemThi: transformSubmitValue(selectedRow.DiemThi),
        DiemThi1: transformSubmitValue(selectedRow.DiemThi1),
        DiemThi2: transformSubmitValue(selectedRow.DiemThi2),
        DiemTongKet: transformSubmitValue(selectedRow.DiemTongKet),
        DiemTongKet1: transformSubmitValue(selectedRow.DiemTongKet1),
        DiemTongKet2: transformSubmitValue(selectedRow.DiemTongKet2),
        TuiBaiThi: transformSubmitValue(selectedRow.TuiBaiThi),
        SoPhach: transformSubmitValue(selectedRow.SoPhach),
      },
      PHUC_KHAO_PREFIX,
    )

    // handle post
    Swal.fire({
      title: 'Bạn chắc chắn muốn gửi yêu cầu phúc khảo?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Gửi',
      denyButtonText: `Hủy`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handlePostData(dataHocPhan)
      } else if (result.isDenied) {
        Swal.fire('Đã hủy gửi yêu cầu phúc khảo', '', 'info')
      }
    })
  }

  const handlePostData = async (dataHocPhan) => {
    // Kiểm tra học phần đã quá hạn phúc khảo chưa
    try {
      const checkQuaHanPhucKhao = await checkExpiredPhucKhao(
        moment(dataHocPhan.MC_KT_PhucKhao_NgayThi).format('DD/MM/YYYY'),
      )
      if (checkQuaHanPhucKhao.status === 200) {
        const body = checkQuaHanPhucKhao.data?.body
        if (body?.[0].KetQua === 0) {
          Swal.fire({
            icon: 'error',
            title: 'Thông báo quá hạn',
            text: `Học phần ${dataHocPhan.MC_KT_PhucKhao_TenMonHoc} đã hết hạn gửi yêu cầu phúc khảo!`,
          })
          return
        }
        const resPostData = await postYeuCauPhucKhao(dataHocPhan)

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
      getAllHocPhanPhucKhao(dataSV.MaSinhVien, tenDot, loaiThi).then((res) => {
        setLoading(false)
        setListHocPhan(res?.data?.body)
      })
    }

    return () => {
      setListHocPhan([])
      setSelectedRow(null)
    }
  }, [tenDot, loaiThi])

  return (
    <PhucKhaoView
      home={home}
      breadcrumbs={breadcrumbs}
      loading={loading}
      listHocKy={listHocKy}
      tenDot={tenDot}
      dataLoaiThi={dataLoaiThi}
      loaiThi={loaiThi}
      listHocPhan={listHocPhan}
      handleChangeValue={handleChangeValue}
      handleRowSelection={handleRowSelection}
      handleSubmitData={handleSubmitData}
      handlePostData={handlePostData}
      selectedRow={selectedRow}
    />
  )
}

export default PhucKhao
