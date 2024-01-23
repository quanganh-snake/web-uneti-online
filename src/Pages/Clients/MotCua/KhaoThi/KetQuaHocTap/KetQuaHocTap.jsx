import React, { useEffect, useState } from 'react'
import KetQuaHocTapView from './KetQuaHocTapView'
import {
  getAllHocPhanKQHT,
  getKiemTraTrungKQHT,
  getTenDotKQHT,
  postKQHT,
} from '@/Apis/MotCua/KhaoThi/apiKetQuaHocTap'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import Swal from 'sweetalert2'
import { isEmpty } from 'lodash-unified'
import { required } from '@/Services/Validators/required'
import {
  makeDataSv,
  makePostDataSv,
  transformSubmitValue,
} from '@/Services/Utils/dataSubmitUtils'

function KetQuaHocTap() {
  const KET_QUA_HOC_TAP_PREFIX = 'MC_KT_KetQuaHT_'

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
      path: '/motcua/khaothi/ketquahoctap',
      title: 'Kết quả học tập',
    },
  ]

  const listLyDo = [
    'Xem kết quả học tập',
    'Điều chỉnh, bổ sung: Điểm thường kỳ',
    'Điều chỉnh, bổ sung: Điểm thi',
  ]

  const listLyDoDTK = [
    'Có đi học nhưng không có điểm thường kỳ',
    'Tự nhận thấy điểm thường kỳ chưa phản ánh đúng năng lực học tập. Đề nghị kiểm tra lại điểm thường kỳ',
    'Điểm thường kỳ thay đổi so với trước đây đã xem',
  ]

  const listLyDoDT = [
    'Bị mất điểm thi trên trang cá nhân',
    'Điểm thi thay đổi so với trước đây đã xem',
  ]

  const [loading, setLoading] = useState(true)
  const [listHocKy, setListHocKy] = useState([])
  const [tenDot, setTenDot] = useState('')
  const [lyDo, setLyDo] = useState(listLyDo[0])
  const [listHocPhan, setListHocPhan] = useState([])
  const [diemSua, setDiemSua] = useState(0)
  const [lyDoChiTiet, setLyDoChiTiet] = useState('')
  const [selectedRow, setSelectedRow] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const dataSV = DataSinhVien()

  const handleRowSelection = (item) => {
    setSelectedRow(item)
  }

  const middlewareSubmitData = () => {
    return [
      required(diemSua, 'Vui lòng điền vào điểm muốn yêu cầu!'),
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
      makeDataSv(dataSV, KET_QUA_HOC_TAP_PREFIX),
      {
        YeuCau: listLyDo.indexOf(lyDo).toString(),
        YeuCau_DiemThuongKy_SVYeuCauLyDo:
          lyDo === 'Điều chỉnh, bổ sung: Điểm thường kỳ' ? lyDoChiTiet : 'null',
        YeuCau_DiemThuongKy_SVYeuCau:
          lyDo === 'Điều chỉnh, bổ sung: Điểm thường kỳ'
            ? diemSua.toString()
            : 'null',
        TenDot: transformSubmitValue(selectedRow.tenDot),
        TenMonHoc: transformSubmitValue(selectedRow.TenMonHoc),
        DiemThuongKy1: transformSubmitValue(selectedRow.DiemThuongKy1),
        DiemThi: transformSubmitValue(selectedRow.DiemThi),
        DiemThi1: transformSubmitValue(selectedRow.DiemThi1),
        DiemThi2: transformSubmitValue(selectedRow.DiemThi2),
        DiemTongKet: transformSubmitValue(selectedRow.DiemTongKet),
        DiemTongKet1: transformSubmitValue(selectedRow.DiemTongKet1),
        DiemTongKet2: transformSubmitValue(selectedRow.DiemTongKet2),
        DiemTinChi: transformSubmitValue(selectedRow.DiemTinChi),
        DiemChu: transformSubmitValue(selectedRow.DiemChu),
        IsDat: transformSubmitValue(selectedRow.IsDat),
        IDLopHocPhan: transformSubmitValue(selectedRow.IDLopHocPhan),
        MaMonHoc: transformSubmitValue(selectedRow.MaMonHoc),
        KhoaChuQuanMon: transformSubmitValue(selectedRow.KhoaChuQuanMon),
        YeuCau_XemKetQuaHT_LyDo: listLyDo.indexOf(lyDo).toString(),
        YeuCau_XemKetQuaHT_LyDoChiTiet: 'null',
        YeuCau_DiemThi_SVYeuCau:
          lyDo === 'Điều chỉnh, bổ sung: Điểm thi'
            ? diemSua.toString()
            : 'null',
        YeuCau_DiemThi_SVYeuCauLyDo:
          lyDo === 'Điều chỉnh, bổ sung: Điểm thi' ? lyDoChiTiet : 'null',
      },
      KET_QUA_HOC_TAP_PREFIX,
    )

    // handle post
    Swal.fire({
      title: 'Bạn chắc chắn muốn gửi yêu cầu sửa điểm?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Gửi',
      denyButtonText: `Hủy`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handlePostData(dataHocPhan)
      } else if (result.isDenied) {
        Swal.fire('Đã hủy gửi yêu cầu sửa điểm', '', 'info')
      }
    })
  }

  const handlePostData = async (dataHocPhan) => {
    try {
      const resPostData = await postKQHT(dataHocPhan)

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
            title: 'Thông báo trùng',
            text: `Học phần ${dataHocPhan.MC_KT_KetQuaHT_TenMonHoc} đã được gửi yêu cầu sửa điểm trước đây. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng`,
          })
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Học phần ${dataHocPhan.MC_KT_KetQuaHT_TenMonHoc} đã được gửi yêu cầu sửa điểm thành công. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
            showConfirmButton: false,
            timer: 1500,
          })

          setTimeout(() => {
            window.location.reload()
          }, 1000)
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
    getTenDotKQHT().then((res) => {
      setListHocKy(res?.data?.body)
    })

    setLoading(false)

    if (tenDot !== '' && lyDo !== '') {
      setLoading(true)
      getAllHocPhanKQHT(dataSV.MaSinhVien).then((res) => {
        setLoading(false)
        if (tenDot !== 'Tất cả học kỳ') {
          setListHocPhan(() =>
            (res?.data?.body).filter((hocPhan) => hocPhan.TenDot === tenDot),
          )
        } else {
          setListHocPhan(() => res?.data?.body)
        }
      })
      // thay đổi list lý do chi tiết
      if (listLyDo.indexOf(lyDo) == 1) {
        setLyDoChiTiet(listLyDoDT[0])
      } else if (listLyDo.indexOf(lyDo) == 2) {
        setLyDoChiTiet(listLyDoDTK[0])
      }
    }

    return () => {
      setListHocPhan([])
      setSelectedRow(null)
      setDiemSua(0)
      setLyDoChiTiet('')
    }
  }, [tenDot, lyDo])

  useEffect(() => {
    setCurrentPage(1)
  }, [tenDot])

  // check điểm từ 0 -> 10
  useEffect(() => {
    if (diemSua < 0) {
      setDiemSua(() => 0)
    } else if (diemSua > 10) {
      setDiemSua(() => 10)
    }
  }, [diemSua])

  return (
    <KetQuaHocTapView
      loading={loading}
      home={home}
      breadcrumbs={breadcrumbs}
      tenDot={tenDot}
      setTenDot={setTenDot}
      lyDo={lyDo}
      setLyDo={setLyDo}
      listHocKy={listHocKy}
      listLyDo={listLyDo}
      listHocPhan={listHocPhan}
      listLyDoDTK={listLyDoDTK}
      listLyDoDT={listLyDoDT}
      lyDoChiTiet={lyDoChiTiet}
      setLyDoChiTiet={setLyDoChiTiet}
      diemSua={diemSua}
      setDiemSua={setDiemSua}
      handleRowSelection={handleRowSelection}
      handleSubmitData={handleSubmitData}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      selectedRow={selectedRow}
    />
  )
}

export default KetQuaHocTap
