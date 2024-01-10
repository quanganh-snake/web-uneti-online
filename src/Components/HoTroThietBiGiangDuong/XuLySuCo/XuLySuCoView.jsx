import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { breadcrumbs, home } from './constants'
import { Link, useParams } from 'react-router-dom'
import { Checkbox, MenuItem, Select } from '@mui/material'
import HuongDanSuDung from './HuongDanSuDung'
import { useEffect, useState } from 'react'
import {
  getAllKhacPhucXuLySuCo,
  getAllLichDayXuLySuCo,
  getAllNguyenNhanXuLySuCo,
  getTTPhongXuLySuCo,
  updateXuLySuCo,
} from '@/Apis/HoTroThietBiGiangDuong/apiXuLySuCo'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash-unified'
import Swal from 'sweetalert2'

function XuLySuCoView() {
  const { id } = useParams()

  const [thongTinPhong, setThongTinPhong] = useState({})
  const [listLichDay, setListLichDay] = useState([])
  const [selectedRow, setSelectedRow] = useState({})
  const [listKhacPhuc, setListKhacPhuc] = useState([])
  const [listNguyenNhan, setListNguyenNhan] = useState([])
  const [khacPhuc, setKhacPhuc] = useState('')
  const [nguyenNhan, setNguyenNhan] = useState('')

  const dataCBGV = DataCanBoGV()

  const handleSelectedRow = (e, ld) => {
    e.preventDefault()
    setSelectedRow({ ...ld })
  }

  useEffect(() => {
    const getData = () => {
      getTTPhongXuLySuCo(id).then((res) => {
        setThongTinPhong(res?.data?.body[0])
      })

      getAllKhacPhucXuLySuCo().then((res) => {
        setListKhacPhuc(res?.data?.body)
      })

      getAllNguyenNhanXuLySuCo().then((res) => {
        setListNguyenNhan(res?.data?.body)
      })
    }

    getData()

    // 5 phut load lai 1 lan
    const autoReloadData = setInterval(getData, 1000 * 60 * 5)

    return () => {
      setThongTinPhong({})
      setListKhacPhuc([])
      setListNguyenNhan([])
      setSelectedRow({})
      clearInterval(autoReloadData)
    }
  }, [])

  useEffect(() => {
    if (!isEmpty(thongTinPhong)) {
      getAllLichDayXuLySuCo(
        dayjs(new Date()).format('YYYY-MM-DD'),
        // '2024-01-05',
        thongTinPhong.DT_QLP_Phong_DiaDiem,
        thongTinPhong.DT_QLP_Phong_ToaNha,
      ).then((res) => {
        setListLichDay(res?.data?.body)
      })
    }

    return () => {
      setSelectedRow({})
    }
  }, [thongTinPhong])

  const handleCancel = (e) => {
    e.preventDefault()
    setSelectedRow({})
    setNguyenNhan('')
    setKhacPhuc('')
  }

  const handleSubmitData = () => {
    let dataSuLySuCo = {}

    let danhSachNguyenNhan = selectedRow.DT_CVNB_TBGD_SuCo_NguyenNhan
      ? selectedRow.DT_CVNB_TBGD_SuCo_NguyenNhan
      : ''
    danhSachNguyenNhan +=
      nguyenNhan + '_' + dayjs(new Date()).format('MM/DD/YYYY hh:mm:ss A') + ';'

    let danhSachKhacPhuc = selectedRow.DT_CVNB_TBGD_SuCo_KetQuaKhacPhuc
      ? selectedRow.DT_CVNB_TBGD_SuCo_KetQuaKhacPhuc
      : ''
    danhSachKhacPhuc +=
      khacPhuc + '_' + dayjs(new Date()).format('MM/DD/YYYY hh:mm:ss A') + ';'

    dataSuLySuCo.DT_CVNB_TBGD_ID = selectedRow.DT_CVNB_TBGD_ID
      ? selectedRow.DT_CVNB_TBGD_ID.toString()
      : 'null'
    dataSuLySuCo.DT_CVNB_TBGD_SuCo_MaNhanSu = dataCBGV.MaNhanSu
      ? dataCBGV.MaNhanSu.toString()
      : 'null'
    dataSuLySuCo.DT_CVNB_TBGD_SuCo_HoTen = dataCBGV.HoDem + ' ' + dataCBGV.Ten
    dataSuLySuCo.DT_CVNB_TBGD_SuCo_NguyenNhan = danhSachNguyenNhan.length
      ? danhSachNguyenNhan
      : 'null'
    dataSuLySuCo.DT_CVNB_TBGD_SuCo_KetQuaKhacPhuc = danhSachKhacPhuc.length
      ? danhSachKhacPhuc
      : 'null'

    // handle post
    Swal.fire({
      title: 'Bạn chắc chắn muốn báo cáo xử lý sự cố?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Gửi',
      denyButtonText: `Hủy`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handlePostData(dataSuLySuCo)
      } else if (result.isDenied) {
        Swal.fire('Đã hủy gửi báo cáo xử lý sự cố', '', 'info')
      }
    })
  }

  const handlePostData = async (dataSuLySuCo) => {
    try {
      const resPostData = await updateXuLySuCo(dataSuLySuCo)

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
          title: `Báo cáo xử lý sự cố thành công!`,
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
    <div className="bg-vs-theme-layout rounded-2xl mx-4 lg:mx-0">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

        <div className="form-submit flex flex-col w-full justify-center">
          <h2 className="text-center uppercase text-2xl font-bold text-sky-800 mb-6">
            XỬ LÝ SỰ CỐ
          </h2>
          <div className="lg:px-36">
            <div>
              <select
                defaultValue="0"
                disabled
                className="w-full px-2 py-1 rounded-md border border-solid border-gray-300"
              >
                <option value="0">Thiết bị giảng đường</option>
              </select>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      #
                    </th>
                    {/* <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      Cơ sở
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      Tên địa điểm
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      Tên dãy nhà
                    </th> */}
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      Tên phòng
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      Mã giảng viên
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      Họ tên
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      Tiết
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      Ngày
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      Danh sách sự cố
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listLichDay.length ? (
                    listLichDay.map((ld, index) => (
                      <tr key={index}>
                        <td className="p-2 border border-solid border-[#dee2e6]">
                          <Checkbox
                            checked={
                              selectedRow.DT_CVNB_TBGD_LichHoc_MaLopHocPhan ===
                              ld.DT_CVNB_TBGD_LichHoc_MaLopHocPhan
                            }
                            onChange={(e) => handleSelectedRow(e, ld)}
                          />
                        </td>
                        {/* <td className="p-2 border border-solid border-[#dee2e6]">
                          {ld.DT_CVNB_TBGD_LichHoc_CoSo}
                        </td>
                        <td className="p-2 border border-solid border-[#dee2e6]">
                          {ld.DT_CVNB_TBGD_LichHoc_TenDiaDiem}
                        </td>
                        <td className="p-2 border border-solid border-[#dee2e6]">
                          {ld.DT_CVNB_TBGD_LichHoc_TenDayNha}
                        </td> */}
                        <td className="p-2 border border-solid border-[#dee2e6]">
                          {ld.DT_CVNB_TBGD_LichHoc_TenPhong}
                        </td>
                        <td className="p-2 border border-solid border-[#dee2e6]">
                          {ld.DT_CVNB_TBGD_Giao_MaNhanSu}
                        </td>
                        <td className="p-2 border border-solid border-[#dee2e6]">
                          {ld.DT_CVNB_TBGD_LichHoc_HoTenGiangVien}
                        </td>
                        <td className="p-2 border border-solid border-[#dee2e6]">
                          {`${ld.DT_CVNB_TBGD_LichHoc_TuTiet} - ${ld.DT_CVNB_TBGD_LichHoc_DenTiet}`}
                        </td>
                        <td className="p-2 border border-solid border-[#dee2e6]">
                          {dayjs(ld.DT_CVNB_TBGD_LichHoc_NgayBatDau).format(
                            'DD-MM-YYYY',
                          )}
                        </td>
                        <td className="p-2 border border-solid border-[#dee2e6]">
                          {ld.DT_CVNB_TBGD_SuCo_DanhSachSuCo}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="10"
                        className="text-center p-3 border border-solid border-[#dee2e6]"
                      >
                        Hiện tại chưa có dữ liệu để hiển thị
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="relative sm:rounded-lg my-6">
              <div className="pb-10 uneti-action flex justify-center gap-2">
                {/* hướng dẫn sử dụng */}
                <HuongDanSuDung />

                <Link to={'/hotrothietbigiangduong'}>
                  <button className="duration-200 px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-xl hover:bg-sky-800 hover:text-white">
                    Trở lại
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-4">
              <p>
                <span className="w-full font-bold text-sky-800">
                  Danh sách sự cố:
                </span>
                <span className="ml-2">
                  {selectedRow.DT_CVNB_TBGD_SuCo_DanhSachSuCo}
                </span>
              </p>
              <div className="w-full flex flex-col md:flex-row justify-between md:items-center gap-2">
                <span className="text-red-500 block md:w-[30%] font-bold">
                  Nguyên nhân*:
                </span>
                <select
                  disabled={isEmpty(selectedRow)}
                  value={nguyenNhan}
                  onChange={(e) => setNguyenNhan(e.target.value.toString())}
                  className="flex-1 w-full px-2 py-1 rounded-md border border-solid border-gray-300"
                >
                  <option value="">Chọn nguyên nhân</option>
                  {listNguyenNhan.length
                    ? listNguyenNhan.map((nn, index) => (
                        <option key={index} value={nn.DT_CVNB_TBGD_TL_Ten}>
                          {nn.DT_CVNB_TBGD_TL_Ten}
                        </option>
                      ))
                    : null}
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row justify-between md:items-center gap-2">
                <span className="text-red-500 block md:w-[30%] font-bold">
                  Kết quả khắc phục*:
                </span>
                <select
                  disabled={isEmpty(selectedRow)}
                  value={khacPhuc}
                  onChange={(e) => setKhacPhuc(e.target.value.toString())}
                  className="flex-1 w-full px-2 py-1 rounded-md border border-solid border-gray-300"
                >
                  <option value="">Chọn kết quả khắc phục</option>
                  {listKhacPhuc.length
                    ? listKhacPhuc.map((kp, index) => (
                        <option key={index} value={kp.DT_CVNB_TBGD_TL_Ten}>
                          {kp.DT_CVNB_TBGD_TL_Ten}
                        </option>
                      ))
                    : null}
                </select>
              </div>
              <div className="w-full flex justify-center items-center gap-2">
                <button
                  onClick={handleSubmitData}
                  disabled={khacPhuc.length === 0 || nguyenNhan.length === 0}
                  className={`px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-xl duration-200 ${
                    khacPhuc.length === 0 || nguyenNhan.length === 0
                      ? 'opacity-50'
                      : 'cursor-pointer hover:bg-sky-800 hover:text-white'
                  }`}
                >
                  Xác nhận hoàn thành
                </button>

                <button
                  onClick={handleCancel}
                  className="px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-xl duration-200 cursor-pointer hover:bg-sky-800 hover:text-white"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default XuLySuCoView
