import React from 'react'
import PropTypes from 'prop-types'
import SidebarTTHCGV from '../Sidebar/SidebarTTHCGV'
import { Link } from 'react-router-dom'
import { changeSlug } from '../../../../Services/Utils/stringUtils'
import ReactPaginate from 'react-paginate'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import moment from 'moment'
import Loading from './../../../../Components/Loading/Loading'
import { DebounceInput } from 'react-debounce-input'
function CanBoNghiepVuView({
  loading,
  listHoSoYeuCau,
  listTrangThaiHoSo,
  handleTiepNhanHoSo,
  paginatedData,
  itemsPerPage,
  setPage,
  setItemsPerPage,
  keywordSearch,
  onSearch,
  setSelectedTrangThai,
}) {
  const pageCount = Math.ceil(listHoSoYeuCau?.length / itemsPerPage)

  return (
    <>
      {loading ? (
        <div className="relative right-0 left-0 w-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-2">
            <SidebarTTHCGV />
          </div>
          {/* START: Danh sách các thủ tục/yêu cầu hỗ trợ */}
          <div className="col-span-12 lg:col-span-10">
            <div className="bg-white w-full rounded-xl px-2 py-4">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="uneti-tthc__timkiem col-span-4 lg:col-span-2">
                  <DebounceInput
                    value={keywordSearch}
                    placeholder="Nhập nội dung tìm kiếm..."
                    className="block w-full h-full px-3 py-1 rounded-full border border-slate-300 focus:outline-none"
                    onChange={(e) => {
                      onSearch(e.target.value)
                    }}
                  />
                </div>
                <div className="uneti-tthc__timkiem col-span-4 lg:col-span-1">
                  <select
                    onChange={(e) => {
                      setSelectedTrangThai(e.target.value)
                    }}
                    className="w-full border border-[#336699] rounded-lg px-3 py-1 focus:outline-slate-300"
                    name=""
                    id=""
                  >
                    <option value="">Tất cả hồ sơ</option>
                    {listTrangThaiHoSo?.map((iTrangThai, index) => {
                      return (
                        <option
                          value={iTrangThai.MC_TTHC_GV_TrangThai_TenTrangThai}
                          key={iTrangThai.MC_TTHC_GV_TrangThai_TenTrangThai}
                        >
                          {iTrangThai.MC_TTHC_GV_TrangThai_TenTrangThai}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div className="uneti-tthc__timkiem col-span-4 lg:col-span-1">
                  <select
                    onChange={(e) => {
                      setItemsPerPage(e.target.value)
                    }}
                    className="w-full border border-[#336699] rounded-lg px-3 py-1 focus:outline-slate-300"
                  >
                    <option value="">Số lượng hồ sơ hiển thị</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </div>
              </div>
              {/* END: Bộ lọc */}

              <div className="w-full mb-4 overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#336699] text-white">
                    <tr>
                      <th className="px-2 py-1 rounded-tl-lg border-r">STT</th>
                      <th className="px-2 py-1 border-r">Thông tin hồ sơ</th>
                      <th className="px-2 py-1 border-r">Đơn vị/Cá nhân gửi</th>
                      <th className="px-2 py-1 border-r">
                        Đơn vị/Cá nhân tiếp nhận
                      </th>
                      <th className="px-2 py-1 rounded-tr-lg">
                        Trạng thái hồ sơ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData?.length > 0 ? (
                      paginatedData?.map((itemYeuCau, index) => {
                        const titleSlug = changeSlug(
                          itemYeuCau.MC_TTHC_GV_TenThuTuc,
                        )
                        return (
                          <tr className="border" key={index}>
                            <td className="px-2 py-1 text-center border-r">
                              {index + 1}
                            </td>
                            <td className="px-2 py-1 border-r">
                              <div className="flex flex-col gap-3 p-2">
                                <p className="font-semibold uppercase">
                                  {itemYeuCau.MC_TTHC_GV_TenThuTuc}
                                </p>
                                <ul>
                                  <li>
                                    - Số biên tiếp nhận:{' '}
                                    {
                                      itemYeuCau?.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong
                                    }
                                  </li>
                                  <li>
                                    - Tổ chức/Cá nhân nộp HS:{' '}
                                    <span className="font-semibold capitalize">
                                      {itemYeuCau?.HoTen}
                                    </span>
                                  </li>
                                  <li>
                                    - Ngày tiếp nhận:{' '}
                                    {moment(
                                      itemYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayGui,
                                    ).format('DD/MM/YYYY')}
                                  </li>
                                  <li>
                                    - Ngày hẹn trả:{' '}
                                    {itemYeuCau.ngayHenTra
                                      ? itemYeuCau.ngayHenTra
                                      : 'Chưa thực hiện'}
                                  </li>
                                </ul>
                                <div className="flex flex-wrap items-center gap-4">
                                  <Link
                                    to={`/admin/can-bo-nghiep-vu/chi-tiet-yeu-cau/${titleSlug}/${itemYeuCau.MC_TTHC_GV_GuiYeuCau_ID}`}
                                    className="whitespace-nowrap lg:whitespace-normal text-white font-semibold bg-[#336699] px-3 py-1 rounded-full hover:opacity-70"
                                  >
                                    Xử lý/Xem chi tiết
                                  </Link>
                                  {itemYeuCau.MC_TTHC_GV_GuiYeuCau_TrangThai_ID ==
                                    0 ||
                                  !itemYeuCau.MC_TTHC_GV_GuiYeuCau_TrangThai_ID ? (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        handleTiepNhanHoSo(itemYeuCau)
                                      }}
                                      className="whitespace-nowrap lg:whitespace-normal text-white font-semibold bg-[#0484AC] px-3 py-1 rounded-full hover:opacity-70"
                                    >
                                      Tiếp nhận
                                    </button>
                                  ) : (
                                    <p className="whitespace-nowrap lg:whitespace-normal text-white font-semibold bg-green-700 px-3 py-1 rounded-full">
                                      Đã tiếp nhận
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-2 py-1 text-center border-r">
                              <p className="font-semibold">
                                {itemYeuCau?.HoTen}
                              </p>
                            </td>
                            <td className="px-2 py-1 text-center border-r">
                              <p className="font-semibold">
                                {itemYeuCau?.MC_TTHC_GV_NoiTiepNhan}
                              </p>
                            </td>
                            <td className="px-2 py-1">
                              <p className="font-semibold flex flex-col">
                                <span className="text-center">
                                  {
                                    itemYeuCau?.MC_TTHC_GV_TrangThai_TenTrangThai
                                  }
                                </span>
                              </p>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan={6}>
                          <p className="p-2 font-medium text-center w-full">
                            Chưa có yêu cầu nào được gửi lên.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Phân trang */}
              {paginatedData?.length > 0 ? (
                <div className="flex items-center justify-between">
                  {paginatedData?.length > 0 && (
                    <div className="">
                      <p className="text-[#336699] font-medium whitespace-nowrap">
                        Tổng số: {listHoSoYeuCau?.length} yêu cầu
                      </p>
                    </div>
                  )}
                  <ReactPaginate
                    previousLabel={<FaCaretLeft color="#336699" size={32} />}
                    nextLabel={<FaCaretRight color="#336699" size={32} />}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={setPage}
                    containerClassName={'pagination'}
                    pageClassName={
                      'px-2 py-1 hover:text-white hover:font-semibold hover:bg-[#336699]'
                    }
                    activeClassName={
                      'px-2 py-1 text-white font-semibold bg-[#336699]'
                    }
                    className="w-full flex items-center justify-end gap-1"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

CanBoNghiepVuView.propTypes = {}

export default CanBoNghiepVuView
