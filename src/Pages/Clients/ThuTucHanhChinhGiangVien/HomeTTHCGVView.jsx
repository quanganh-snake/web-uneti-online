import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import SidebarTTHCGV from './SidebarTTHCGV/SidebarTTHCGV'
import { changeSlug } from '@/Services/Utils/stringUtils'
import ReactPaginate from 'react-paginate'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import clsx from 'clsx'
import { DebounceInput } from 'react-debounce-input'
import Loading from '@/Components/Loading/Loading'
function HomeTTHCGVView(props) {
  const { home, loading, dataListHoSoThuTuc, setKeywords, setDieuKienLoc } =
    props

  // paginates
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const pageCount = Math.ceil(dataListHoSoThuTuc?.length / itemsPerPage)
  const displayData = dataListHoSoThuTuc?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  )

  // events handlers
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected)
  }
  const handleChangeValue = (e) => {
    const { id, name, value } = e.target
    if (id == 'records-number' || name == 'records-number') {
      setItemsPerPage(parseInt(value))
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
  }

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-2">
          <div className="bg-white p-4">
            <SidebarTTHCGV
              setKeywords={setKeywords}
              setDieuKienLoc={setDieuKienLoc}
            />
          </div>
          <div className="grow bg-white w-full p-4">
            <Breadcrumb home={home} breadcrumbs={[]} />
            {/* START: Form search */}
            <div className="mt-5">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <form className="w-full flex items-center gap-2 border px-2 rounded-full">
                  <DebounceInput
                    type="search"
                    placeholder="Nhập từ khóa tìm kiếm"
                    className="px-3 py-1 bg-transparent w-full focus:outline-none"
                    onChange={(e) => {
                      setKeywords(e.target.value.toLowerCase())
                      setDieuKienLoc('')
                    }}
                  />
                  <FiSearch size={24} className="font-semibold" />
                </form>
                <select
                  className="w-full md:w-auto px-3 py-2 border rounded-full font-semibold text-white bg-[#0484AC] focus:outline-none"
                  name="records-number"
                  id="records-number"
                  onChange={handleChangeValue}
                >
                  <option value="10">Số thủ tục hiển thị</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </div>
            </div>
            {/* END: Form search */}
            {/* START: Table DS Thủ tục */}
            <div className="my-5">
              {displayData?.length <= 0 && (
                <p className="text-center p-2 font-semibold border mb-2">
                  Hiện tại không có thủ tục nào.
                </p>
              )}
              {displayData?.length > 0 && (
                <>
                  <table className="w-full table-auto">
                    <thead className="bg-[#075985] text-white rounded-t-xl">
                      <tr>
                        <th className="border-r px-2 py-1 rounded-tl-xl">
                          STT
                        </th>
                        <th className="border-r px-2 py-1">Tên thủ tục</th>
                        <th className="px-2 py-1 rounded-tr-xl">Lĩnh vực</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayData &&
                        displayData.map((iData, index) => {
                          const nameSlug = changeSlug(
                            iData.MC_TTHC_GV_TenThuTuc,
                          )
                          return (
                            <tr key={index}>
                              <td className="border border-slate-300 text-center">
                                {index + 1}
                              </td>
                              <td className="border border-slate-300">
                                <div className="px-2">
                                  <ul>
                                    <li>
                                      <Link
                                        to={`/tthcgiangvien/chitiet/${nameSlug}/${iData.MC_TTHC_GV_ID}`}
                                        className="uppercase font-semibold text-[#0C4A6E]"
                                      >
                                        {iData.MC_TTHC_GV_TenThuTuc}
                                      </Link>
                                    </li>
                                    <li>
                                      <span className="flex items-center gap-2">
                                        Mức độ:{' '}
                                        <span
                                          className={clsx(
                                            'inline-block w-4 h-4 rounded-full text-center font-semibold text-white text-xs',
                                            parseInt(
                                              iData.MC_TTHC_GV_IDMucDo,
                                            ) == 1
                                              ? 'bg-red-300'
                                              : '',
                                            parseInt(
                                              iData.MC_TTHC_GV_IDMucDo,
                                            ) == 2
                                              ? 'bg-red-400'
                                              : '',
                                            parseInt(
                                              iData.MC_TTHC_GV_IDMucDo,
                                            ) == 3
                                              ? 'bg-red-500'
                                              : '',
                                            parseInt(
                                              iData.MC_TTHC_GV_IDMucDo,
                                            ) >= 4
                                              ? 'bg-red-600'
                                              : '',
                                          )}
                                        >
                                          {iData.MC_TTHC_GV_IDMucDo}
                                        </span>
                                      </span>
                                    </li>
                                    <li>
                                      <span className="font-semibold italic text-red-600">
                                        {'Nộp hồ sơ'}
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                              <td className="border border-slate-300">
                                <p className="px-2 text-center">
                                  {iData.MC_TTHC_GV_LinhVuc}
                                </p>
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                  <div className="grid grid-cols-2 mt-5 items-center justify-between">
                    <div className="col-span-2 lg:col-span-1 flex flex-row items-center mb-6">
                      <p className="font-semibold text-[#336699]">
                        Tổng số:{' '}
                        <span>{dataListHoSoThuTuc?.length} hồ sơ/thủ tục</span>
                      </p>
                    </div>
                    <ReactPaginate
                      previousLabel={<FaCaretLeft color="#336699" size={32} />}
                      nextLabel={<FaCaretRight color="#336699" size={32} />}
                      pageCount={pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={handlePageChange}
                      containerClassName={'pagination'}
                      pageClassName={
                        'px-2 py-1 hover:text-white hover:font-semibold hover:bg-[#336699]'
                      }
                      activeClassName={
                        'px-2 py-1 text-white font-semibold bg-[#336699]'
                      }
                      className="col-span-2 lg:col-span-1 w-full flex items-center justify-center lg:justify-end gap-1"
                    />
                  </div>
                </>
              )}
            </div>
            {/* END: Table DS Thủ tục */}
          </div>
        </div>
      )}
    </>
  )
}

HomeTTHCGVView.propTypes = {}

export default HomeTTHCGVView
