import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { breadcrumbs, home } from './constants'
import { Link } from 'react-router-dom'
import { Autocomplete, Checkbox, TextField } from '@mui/material'
import HuongDanSuDung from './HuongDanSuDung'
import { useEffect, useState } from 'react'
import {
  getAllKhacPhucXuLySuCo,
  getAllLichDayXuLySuCo,
  getAllNguyenNhanXuLySuCo,
  updateXuLySuCo,
} from '@/Apis/HoTroThietBiGiangDuong/apiXuLySuCo'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import { dayjs } from '@/Services/Utils/dayjs'
import { isEmpty } from 'lodash-unified'
import Swal from 'sweetalert2'

function XuLySuCoView() {
  const [listLichDay, setListLichDay] = useState([])
  const [selectedRow, setSelectedRow] = useState({})
  const [listKhacPhuc, setListKhacPhuc] = useState([])
  const [listNguyenNhan, setListNguyenNhan] = useState([])
  const [khacPhuc, setKhacPhuc] = useState([])
  const [nguyenNhan, setNguyenNhan] = useState([])

  const dataCBGV = DataCanBoGV()

  const handleSelectedRow = (e, ld) => {
    e.preventDefault()
    setSelectedRow(ld)
  }

  useEffect(() => {
    const getData = () => {
      setListLichDay([])
      getAllLichDayXuLySuCo(
        dayjs(new Date()).format('MM/DD/YYYY hh:mm:ss A'),
        // dayjs(new Date()).format('YYYY/MM/DD'),
        // '2024-01-05T00:00:00.000Z',
        '',
        '',
      ).then((res) => {
        setListLichDay(res?.data?.body)
      })
    }

    getAllKhacPhucXuLySuCo().then((res) => {
      setListKhacPhuc(res?.data?.body)
    })

    getAllNguyenNhanXuLySuCo().then((res) => {
      setListNguyenNhan(res?.data?.body)
    })

    getData()

    // 30s load lai 1 lan
    const autoReloadData = setInterval(getData, 1000 * 30)

    return () => {
      setListLichDay([])
      setListKhacPhuc([])
      setListNguyenNhan([])
      setSelectedRow({})
      clearInterval(autoReloadData)
    }
  }, [])

  const handleCancel = (e) => {
    e.preventDefault()
    setSelectedRow({})
    setNguyenNhan([])
    setKhacPhuc([])
  }

  const handleSubmitData = () => {
    let dataSuLySuCo = {}

    let danhSachNguyenNhan = selectedRow.DT_CVNB_TBGD_SuCo_NguyenNhan
      ? selectedRow.DT_CVNB_TBGD_SuCo_NguyenNhan
      : ''
    nguyenNhan.forEach((nn) => {
      danhSachNguyenNhan +=
        nn + '_' + dayjs(new Date()).format('MM/DD/YYYY hh:mm:ss A') + ';'
    })

    let danhSachKhacPhuc = selectedRow.DT_CVNB_TBGD_SuCo_KetQuaKhacPhuc
      ? selectedRow.DT_CVNB_TBGD_SuCo_KetQuaKhacPhuc
      : ''
    khacPhuc.forEach((kp) => {
      danhSachKhacPhuc +=
        kp + '_' + dayjs(new Date()).format('MM/DD/YYYY hh:mm:ss A') + ';'
    })

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
          <h2 className="text-center uppercase text-lg md:text-2xl font-semibold text-sky-800 mb-3 md:mb-6">
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
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="p-2 text-xs md:text-base font-medium bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      #
                    </th>
                    <th className="p-2 text-xs md:text-base font-medium bg-[#245D7C] text-white border border-solid border-[#dee2e6] min-w-[100px]">
                      Cơ sở
                    </th>
                    <th className="p-2 text-xs md:text-base font-medium bg-[#245D7C] text-white border border-solid border-[#dee2e6] min-w-[100px]">
                      Tên địa điểm
                    </th>
                    <th className="p-2 text-xs md:text-base font-medium bg-[#245D7C] text-white border border-solid border-[#dee2e6] min-w-[100px]">
                      Tên dãy nhà
                    </th>
                    <th className="p-2 text-xs md:text-base font-medium bg-[#245D7C] text-white border border-solid border-[#dee2e6] min-w-[100px]">
                      Tên phòng
                    </th>
                    <th className="p-2 text-xs md:text-base font-medium bg-[#245D7C] text-white border border-solid border-[#dee2e6] min-w-[100px]">
                      Mã giảng viên
                    </th>
                    <th className="p-2 text-xs md:text-base font-medium bg-[#245D7C] text-white border border-solid border-[#dee2e6] min-w-[100px]">
                      Họ tên
                    </th>
                    <th className="p-2 text-xs md:text-base font-medium bg-[#245D7C] text-white border border-solid border-[#dee2e6] min-w-[50px]">
                      Tiết
                    </th>
                    <th className="p-2 text-xs md:text-base font-medium bg-[#245D7C] text-white border border-solid border-[#dee2e6] min-w-[100px]">
                      Ngày
                    </th>
                    <th className="p-2 text-xs md:text-base font-medium bg-[#245D7C] text-white border border-solid border-[#dee2e6] min-w-[100px]">
                      Danh sách sự cố
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listLichDay.length ? (
                    listLichDay.map((ld, index) => (
                      <tr key={index}>
                        <td className="p-2 border border-solid border-[#dee2e6] text-center">
                          <Checkbox
                            checked={
                              selectedRow.DT_CVNB_TBGD_LichHoc_MaLopHocPhan ===
                              ld.DT_CVNB_TBGD_LichHoc_MaLopHocPhan
                            }
                            onChange={(e) => handleSelectedRow(e, ld)}
                          />
                        </td>
                        <td className="p-2 border border-solid border-[#dee2e6] text-center">
                          {ld.DT_CVNB_TBGD_LichHoc_CoSo}
                        </td>
                        <td className="p-2 border border-solid border-[#dee2e6] text-center">
                          {ld.DT_CVNB_TBGD_LichHoc_TenDiaDiem}
                        </td>
                        <td className="p-2 border border-solid border-[#dee2e6] text-center">
                          {ld.DT_CVNB_TBGD_LichHoc_TenDayNha}
                        </td>
                        <td className="p-2 border border-solid border-[#dee2e6]">
                          {ld.DT_CVNB_TBGD_LichHoc_TenPhong}
                        </td>
                        <td className="p-2 border border-solid border-[#dee2e6] text-center">
                          {ld.DT_CVNB_TBGD_Giao_MaNhanSu}
                        </td>
                        <td className="p-2 border border-solid border-[#dee2e6]">
                          {ld.DT_CVNB_TBGD_LichHoc_HoTenGiangVien}
                        </td>
                        <td className="p-2 border border-solid border-[#dee2e6] text-center">
                          {`${ld.DT_CVNB_TBGD_LichHoc_TuTiet} - ${ld.DT_CVNB_TBGD_LichHoc_DenTiet}`}
                        </td>
                        <td className="p-2 border border-solid border-[#dee2e6] text-center">
                          {dayjs(ld.DT_CVNB_TBGD_LichHoc_NgayBatDau).format(
                            'DD-MM-YYYY',
                          )}
                        </td>
                        <td className="p-2 border border-solid border-[#dee2e6]">
                          {ld.DT_CVNB_TBGD_SuCo_DanhSachSuCo.split(';').map(
                            (e, index) => {
                              if (e.length) {
                                return (
                                  <p key={index} className="p-1">
                                    - {e}
                                  </p>
                                )
                              }
                            },
                          )}
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

                <Link to={'/ho-tro-thiet-bi-giang-duong'}>
                  <button className="duration-200 px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-xl hover:bg-sky-800 hover:text-white">
                    Trở lại
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-4">
              <p>
                <span className="w-full font-semibold text-sky-800">
                  Danh sách sự cố:
                </span>
                <span className="ml-2">
                  {selectedRow.DT_CVNB_TBGD_SuCo_DanhSachSuCo &&
                    selectedRow.DT_CVNB_TBGD_SuCo_DanhSachSuCo.split(';').map(
                      (e, index) => {
                        if (e.length) {
                          return (
                            <span key={index} className="p-1 ml-2 block">
                              - {e}
                            </span>
                          )
                        }
                      },
                    )}
                </span>
              </p>
              <div className="w-full flex flex-col md:flex-row justify-between md:items-center gap-2">
                <span className="text-red-500 block md:w-[30%] font-semibold">
                  Nguyên nhân*:
                </span>
                <Autocomplete
                  disabled={isEmpty(selectedRow)}
                  className="w-full"
                  size="small"
                  multiple
                  options={listNguyenNhan.map((nn) => nn.DT_CVNB_TBGD_TL_Ten)}
                  value={nguyenNhan}
                  onChange={(event, newValue) => {
                    setNguyenNhan([...newValue])
                  }}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox checked={selected} />
                      {option}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Chọn nguyên nhân" />
                  )}
                />
              </div>
              <div className="w-full flex flex-col md:flex-row justify-between md:items-center gap-2">
                <span className="text-red-500 block md:w-[30%] font-semibold">
                  Kết quả khắc phục*:
                </span>
                <Autocomplete
                  disabled={isEmpty(selectedRow)}
                  className="w-full"
                  size="small"
                  multiple
                  options={listKhacPhuc.map((kp) => kp.DT_CVNB_TBGD_TL_Ten)}
                  value={khacPhuc}
                  onChange={(event, newValue) => {
                    setKhacPhuc([...newValue])
                  }}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox checked={selected} />
                      {option}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Chọn kết quả khắc phục"
                    />
                  )}
                />
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
