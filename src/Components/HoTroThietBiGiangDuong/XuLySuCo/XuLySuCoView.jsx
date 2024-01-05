import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { breadcrumbs, home } from './constants'
import { Link } from 'react-router-dom'
import { MenuItem, Select } from '@mui/material'

function XuLySuCoView() {
  return (
    <div className="bg-vs-theme-layout rounded-2xl mx-4 lg:mx-0">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

        <div className="form-submit flex flex-col w-full justify-center">
          <h2 className="text-center uppercase text-2xl font-bold text-sky-800 mb-6">
            XỬ LÝ SỰ CỐ
          </h2>
          <div className="lg:px-36">
            {/* form */}
            <div>
              <Select
                defaultValue="0"
                disabled
                className="w-full rounded-md border border-solid border-gray-300"
              >
                <MenuItem value="0">Thiết bị giảng đường</MenuItem>
              </Select>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      #
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      Cơ sở
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      Tên địa điểm
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      Tên dãy nhà
                    </th>
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
                  <tr>
                    <td
                      colSpan="10"
                      className="text-center p-3 border border-solid border-[#dee2e6]"
                    >
                      Hiện tại chưa có dữ liệu để hiển thị
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="relative sm:rounded-lg my-6">
              <div className="pb-10 uneti-action flex justify-center gap-2">
                {/* hướng dẫn sử dụng */}

                <button
                  //   onClick={handleSubmitData}
                  className="px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-xl hover:bg-sky-800 hover:text-white"
                >
                  Gửi yêu cầu
                </button>

                <Link to={'/hotrothietbigiangduong'}>
                  <button className="px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-xl hover:bg-sky-800 hover:text-white">
                    Trở lại
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-4">
              <span className="w-full font-bold text-sky-800">
                Danh sách sự cố:
              </span>
              <div className="w-full flex justify-between items-center gap-10">
                <span className="text-red-500 block w-[30%] font-bold">
                  Nguyên nhân*:
                </span>
                <Select
                  defaultValue="0"
                  disabled
                  className="flex-1 rounded-md border border-solid border-gray-300"
                >
                  <MenuItem value=""></MenuItem>
                </Select>
              </div>
              <div className="w-full flex justify-between items-center gap-10">
                <span className="text-red-500 block w-[30%] font-bold">
                  Kết quả khắc phục*:
                </span>
                <Select
                  defaultValue="0"
                  disabled
                  className="flex-1 rounded-md border border-solid border-gray-300"
                >
                  <MenuItem value=""></MenuItem>
                </Select>
              </div>
              <div className="w-full flex justify-center items-center gap-2">
                <button
                  disabled
                  className="px-3 py-2 font-semibold border rounded-xl bg-sky-800 text-white opacity-50"
                >
                  Xác nhận hoàn thành
                </button>

                <button
                  disabled
                  className="px-3 py-2 font-semibold border rounded-xl bg-sky-800 text-white opacity-50"
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
