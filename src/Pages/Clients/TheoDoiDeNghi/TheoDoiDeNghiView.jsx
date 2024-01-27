import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { Pagination } from '@mui/material'
import { dayjs } from '@/Services/Utils/dayjs'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function TheoDoiDeNghiView(props) {
  const {
    home,
    breadcrumbs,
    listLoaiYeuCau,
    loaiYeuCau,
    setLoaiYeuCau,
    listYeuCau,
    currentPage,
    handleChangePage,
  } = props
  const itemPerPage = 10

  const totalPage = Math.ceil(listYeuCau.length / itemPerPage)

  const listYeuCauView = listYeuCau.slice(
    itemPerPage * (currentPage - 1),
    itemPerPage * (currentPage - 1) + itemPerPage,
  )
  return (
    <div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
      <div className="p-4 flex flex-col">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
        <div className="w-full rounded-md mt-4 p-3 flex flex-col justify-center items-center">
          <h3 className="text-3xl uppercase text-center mb-4 font-semibold my-3 text-uneti-primary">
            DANH SÁCH THÔNG TIN XỬ LÝ GỬI YÊU CẦU TIẾP NHẬN
          </h3>
          <div className="my-4 w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <select
              value={loaiYeuCau}
              onChange={(e) => setLoaiYeuCau(e.target.value)}
              className="px-2 py-1 w-full rounded-md border border-solid border-gray-300"
            >
              {listLoaiYeuCau.map((e, index) => (
                <option key={index} value={e.value}>
                  {e.text}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[75%] overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr>
                  <th className="p-2 font-semibold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                    STT
                  </th>
                  <th className="p-2 font-semibold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                    NHÓM
                  </th>
                  <th className="p-2 font-semibold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                    TÊN YÊU CẦU XỬ LÝ
                  </th>
                  <th className="p-2 font-semibold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                    CHI TIẾT ĐỀ NGHỊ
                  </th>
                  <th className="p-2 font-semibold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                    NGÀY GỬI
                  </th>
                  <th className="p-2 font-semibold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                    TÌNH TRẠNG XỬ LÝ
                  </th>
                </tr>
              </thead>
              <tbody>
                {listYeuCauView.length ? (
                  listYeuCauView.map((yc, index) => (
                    <tr
                      key={index}
                      className={`${
                        yc.MC_TrangThai_YeuCau_SinhVien_XemThongBao
                          ? 'bg-stone-200 bg-opacity-50'
                          : 'null'
                      }`}
                    >
                      <td className="text-center p-3 border border-solid border-[#dee2e6]">
                        {(currentPage - 1) * itemPerPage + index + 1}
                      </td>
                      <td className="text-center p-3 border border-solid border-[#dee2e6]">
                        {yc.MC_TrangThai_YeuCau_SinhVien_NhomYeuCau}
                      </td>
                      <td className="text-center p-3 border border-solid border-[#dee2e6]">
                        {yc.MC_TrangThai_YeuCau_SinhVien_TenYeuCau}
                      </td>
                      <td className="text-center p-3 border border-solid border-[#dee2e6]">
                        {yc.MC_TrangThai_YeuCau_SinhVien_Cap1}
                      </td>
                      <td className="text-center p-3 border border-solid border-[#dee2e6]">
                        {dayjs(yc.MC_TrangThai_YeuCau_SinhVien_NgayGui).format(
                          'DD/MM/YYYY',
                        )}
                      </td>
                      <td
                        className={`text-center p-3 border border-solid border-[#dee2e6] ${
                          yc.MC_TrangThai_YeuCau_SinhVien_TrangThai ===
                          'Chờ xử lý'
                            ? 'text-red-500'
                            : 'text-green-500 cursor-pointer'
                        }`}
                      >
                        {yc.MC_TrangThai_YeuCau_SinhVien_TrangThai ===
                        'Đã xử lý' ? (
                          <Link
                            to={{
                              pathname: '/theodoidenghi/theodoidenghichitiet',
                            }}
                            state={{ yeuCau: yc }}
                          >
                            {yc.MC_TrangThai_YeuCau_SinhVien_TrangThai}
                          </Link>
                        ) : (
                          <span>
                            {yc.MC_TrangThai_YeuCau_SinhVien_TrangThai}
                          </span>
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
                      Hiện tại chưa có dữ liệu học phần cho học kỳ này!
                    </td>
                  </tr>
                )}
                {totalPage > 1 && (
                  <tr>
                    <td
                      colSpan={10}
                      className="text-center p-3 border border-solid border-[#dee2e6]"
                    >
                      <div className="flex justify-center items-center">
                        <Pagination
                          count={totalPage}
                          page={currentPage}
                          variant="outlined"
                          shape="rounded"
                          color="primary"
                          onChange={(e, value) => handleChangePage(e, value)}
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

TheoDoiDeNghiView.propTypes = {
  home: PropTypes.object,
  breadcrumbs: PropTypes.array,
  loaiYeuCau: PropTypes.string,
  setLoaiYeuCau: PropTypes.func,
  listYeuCau: PropTypes.array,
  currentPage: PropTypes.number,
  handleChangePage: PropTypes.func,
}

export default TheoDoiDeNghiView
