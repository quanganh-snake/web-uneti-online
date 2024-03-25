import SidebarTTHCGV from '../Sidebar/SidebarTTHCGV'
import {
  getAllLinhVuc,
  getListDonVi,
  getThuTucHanhChinhByKeyWords,
  putHienThiHoSoThuTuc,
} from '../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'
import { useState } from 'react'
import { useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { changeSlug } from '../../../../Services/Utils/stringUtils'
import { DebounceInput } from 'react-debounce-input'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import Loading from '../../../../Components/Loading/Loading'
import { typeEditThuTuc } from '../constants'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'

const PATH_TTHCGV = '/admin/quan-tri-TTHCGV/ho-so-thu-tuc'

function DanhSachHoSo() {
  const dataCBNV = DataCanBoGV()
  // variables
  const [listHoSoThuTuc, setListHoSoThuTuc] = useState([])
  const [listDepartments, setListDepartments] = useState([])
  const [listArea, setListArea] = useState([])

  const [phongBan, setPhongBan] = useState(dataCBNV?.TenPhongBan ?? '')
  //   const [phongBan, setPhongBan] = useState('')
  const [linhVuc, setLinhVuc] = useState('')
  const [keywords, setKeywords] = useState('')
  const [dieuKienLoc, setDieuKienLoc] = useState('')

  const [loading, setLoading] = useState(true)
  // paginates
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const pageCount = Math.ceil(listHoSoThuTuc.length / itemsPerPage)
  const displayData = listHoSoThuTuc?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  )

  const getListHoSoThuTuc = async () => {
    try {
      const resultGetSearchThuTuc = await getThuTucHanhChinhByKeyWords(
        phongBan,
        dieuKienLoc,
        keywords,
      )
      setLoading(false)
      if (resultGetSearchThuTuc.status === 200) {
        const dataSearchThuTuc = await resultGetSearchThuTuc?.data?.body
        if (dataSearchThuTuc.length) {
          setListHoSoThuTuc(dataSearchThuTuc)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  // event handlers
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected)
  }
  const handleChangeValue = (e) => {
    const { id, name, value } = e.target

    if (id == 'records-number' || name == 'records-number') {
      value ? setItemsPerPage(parseInt(value)) : setItemsPerPage(10)
    }

    if (id == 'donvi' || name == 'donvi') {
      if (value && value !== 'dvnull') {
        setDieuKienLoc('NoiTiepNhan')
        setPhongBan(value)
        setCurrentPage(0)
      } else {
        setDieuKienLoc('')
        setKeywords('')
        setPhongBan('')
      }
    }

    if (id == 'linhvuc' || name == 'linhvuc') {
      if (value && value !== 'lvnull') {
        setDieuKienLoc('LinhVuc')
        setLinhVuc(value)
        setKeywords(value)
        setCurrentPage(0)
      } else {
        setDieuKienLoc('')
        setKeywords('')
        setLinhVuc('')
      }
    }
  }
  const handleHienThiThuTuc = async (idThuTuc, type) => {
    if (type === typeEditThuTuc.typeHidden) {
      Swal.fire({
        icon: 'question',
        title: 'Bạn có chắc chắn muốn ẩn thủ tục này không?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true)
          const res = await putHienThiHoSoThuTuc(idThuTuc, type)
          if (res.status === 200) {
            setLoading(false)
            getListHoSoThuTuc()
            toast.success('Đã ẩn thành công thủ tục!')
          }
        }
      })
    }

    if (type === typeEditThuTuc.typeShow) {
      Swal.fire({
        icon: 'question',
        title: 'Bạn có chắc chắn muốn hiển thị thủ tục này không?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true)
          const res = await putHienThiHoSoThuTuc(idThuTuc, type)
          if (res.status === 200) {
            setLoading(false)
            getListHoSoThuTuc()
            toast.success('Đã hiển thị thành công thủ tục!')
          }
        }
      })
    }
  }
  // effects
  useEffect(() => {
    setCurrentPage(0)
  }, [itemsPerPage, loading])

  useEffect(() => {
    getListHoSoThuTuc()
    // return () => {
    //   setKeywords('')
    //   setDieuKienLoc('')
    // }
  }, [keywords, dieuKienLoc, phongBan, linhVuc])

  useEffect(() => {
    const getAllDepartments = async () => {
      try {
        const resultAllDepartments = await getListDonVi()
        if (resultAllDepartments.status === 200) {
          const dataDepartments = await resultAllDepartments?.data?.body
          if (dataDepartments) {
            setListDepartments([...dataDepartments])
          }
        }
      } catch (error) {
        console.info(error)
      }
    }

    const getAllAreas = async () => {
      try {
        const resultAllAreas = await getAllLinhVuc()
        if (resultAllAreas.status === 200) {
          const dataLinhnVuc = await resultAllAreas?.data?.body
          if (dataLinhnVuc.length) {
            setListArea([...dataLinhnVuc])
          }
        }
      } catch (error) {
        console.info(error.message)
      }
    }

    getAllDepartments()
    getAllAreas()
  }, [])

  return (
    <>
      {loading ? (
        <div className="relative left-0 right-0 w-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="px-5 lg:px-0 grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-2">
            <SidebarTTHCGV />
          </div>
          <div className="col-span-12 lg:col-span-10">
            <div className="w-full p-4 rounded-xl shadow-lg bg-white">
              <div className="flex flex-col gap-4 relative top-0 bottom-0 h-full">
                <div className="grid grid-cols-5 items-center gap-4 justify-between">
                  <div className="col-span-5">
                    <h3 className="text-xl lg:text-3xl text-center font-bold uppercase">
                      Danh sách quy trình hồ sơ
                    </h3>
                  </div>
                  <form className="col-span-5">
                    <div className="flex items-center gap-2  border border-slate-400 px-2 rounded-full">
                      <DebounceInput
                        type="text"
                        placeholder="Nhập mã thủ tục, tên thủ tục, ..."
                        className="px-3 py-1 bg-transparent w-full focus:outline-none"
                        onChange={(e) => {
                          setKeywords(e.target.value.toLowerCase())
                        }}
                      />

                      <label className="">
                        <FiSearch size={22} className="text-[#336699]" />
                      </label>
                    </div>
                  </form>
                  <select
                    className="hidden col-span-5 lg:col-span-1 rounded-full px-3 py-1  border border-slate-400 focus:outline-slate-300"
                    onChange={handleChangeValue}
                    value={phongBan}
                    name="donvi"
                    id="donvi"
                  >
                    <option value={'dvnull'}>Đơn vị/Tổ chức</option>
                    {listDepartments.map((item, index) => {
                      return (
                        <option value={item.MC_TTHC_GV_NoiTiepNhan} key={index}>
                          {item.MC_TTHC_GV_NoiTiepNhan}
                        </option>
                      )
                    })}
                  </select>
                  <select
                    className="col-span-5 lg:col-span-1 rounded-full px-3 py-1  border border-slate-400 focus:outline-slate-300"
                    onChange={handleChangeValue}
                    value={linhVuc}
                    name="linhvuc"
                    id="linhvuc"
                  >
                    <option value={'lvnull'}>Lĩnh vực</option>
                    {listArea.map((item, index) => {
                      return (
                        <option value={item.MC_TTHC_GV_LinhVuc} key={index}>
                          {item.MC_TTHC_GV_LinhVuc}
                        </option>
                      )
                    })}
                  </select>
                  <select
                    className="col-span-5 lg:col-span-1 rounded-full px-3 py-1  border border-slate-400 focus:outline-slate-300"
                    onChange={handleChangeValue}
                    name="records-number"
                    id="records-number"
                  >
                    <option value="">Số bản ghi</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </div>
                <table className="mb-5">
                  <thead className="bg-[#336699] text-white">
                    <tr>
                      <th className="px-2 py-1 rounded-tl-lg border-r">STT</th>
                      <th className="px-2 py-1 border-r">
                        <div className="w-20">Mã thủ tục</div>
                      </th>
                      <th className="px-2 py-1 border-r">Thủ tục</th>
                      <th className="px-2 py-1 border-r">Đơn vị</th>
                      <th className="px-2 py-1 border-r">Lĩnh vực</th>
                      <th className="px-2 py-1 rounded-tr-lg w-8">Tác vụ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayData?.length <= 0 ? (
                      <tr>
                        <td colSpan={6}>
                          <p className="font-semibold text-[#336699] text-center border">
                            Chưa có hồ sơ/thủ tục nào được tạo.
                          </p>
                        </td>
                      </tr>
                    ) : null}
                    {displayData &&
                      displayData.map((itemThuTuc, index) => {
                        const titleSlug = changeSlug(
                          itemThuTuc.MC_TTHC_GV_TenThuTuc,
                        )
                        return (
                          <tr
                            className="border-b"
                            key={itemThuTuc.MC_TTHC_GV_ID}
                          >
                            <td className="px-2 py-1 border-r border-l border-slate-300 text-center font-semibold">
                              {index + 1 + currentPage * itemsPerPage}
                            </td>
                            <td className="px-2 py-1 border-r border-slate-300 text-center">
                              <p className="inline-block w-20 line-clamp-2">
                                {itemThuTuc.MC_TTHC_GV_MaThuTuc}
                              </p>
                            </td>
                            <td className="px-2 py-1 border-r border-slate-300">
                              <div className="flex flex-col gap-1">
                                <Link
                                  to={`${PATH_TTHCGV}/xem/chi-tiet/${titleSlug}/${itemThuTuc.MC_TTHC_GV_ID}`}
                                  className="font-semibold text-sky-700 hover:opacity-70"
                                >
                                  {itemThuTuc.MC_TTHC_GV_TenThuTuc}
                                </Link>
                                <p className="flex flex-row items-center gap-2">
                                  <span className="text-sm">Mức độ:</span>
                                  <span
                                    className={clsx(
                                      'w-4 h-4 text-center text-white rounded-full text-xs font-semibold',
                                      parseInt(itemThuTuc.MC_TTHC_GV_IDMucDo) ==
                                        1
                                        ? 'bg-red-300'
                                        : '',
                                      parseInt(itemThuTuc.MC_TTHC_GV_IDMucDo) ==
                                        2
                                        ? 'bg-red-400'
                                        : '',
                                      parseInt(itemThuTuc.MC_TTHC_GV_IDMucDo) ==
                                        3
                                        ? 'bg-red-500'
                                        : '',
                                      parseInt(itemThuTuc.MC_TTHC_GV_IDMucDo) ==
                                        4
                                        ? 'bg-red-600'
                                        : '',
                                    )}
                                  >
                                    {parseInt(itemThuTuc.MC_TTHC_GV_IDMucDo)}
                                  </span>
                                </p>
                              </div>
                            </td>
                            <td className="px-2 py-1 border-r border-slate-300">
                              <p>{itemThuTuc.MC_TTHC_GV_NoiTiepNhan}</p>
                            </td>
                            <td className="px-2 py-1 border-r border-slate-300 text-center">
                              {itemThuTuc.MC_TTHC_GV_LinhVuc}
                            </td>
                            <td className="px-2 py-1 border-r border-slate-300">
                              <div className="flex flex-col gap-2 w-28">
                                <Link
                                  to={`${PATH_TTHCGV}/xem/chi-tiet/${titleSlug}/${itemThuTuc.MC_TTHC_GV_ID}`}
                                  className="block w-full bg-white text-[#336699] text-center font-semibold rounded-md border px-2 py-1 hover:bg-[#336699] hover:text-white"
                                >
                                  Sửa
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleHienThiThuTuc(
                                      itemThuTuc.MC_TTHC_GV_ID,
                                      itemThuTuc.MC_TTHC_GV_HienThi
                                        ? typeEditThuTuc.typeHidden
                                        : typeEditThuTuc.typeShow,
                                    )
                                  }}
                                  className={clsx(
                                    'block w-full text-white text-center font-semibold py-2 px-5 rounded-md hover:opacity-70',
                                    itemThuTuc.MC_TTHC_GV_HienThi
                                      ? 'bg-red-500'
                                      : 'bg-green-500',
                                  )}
                                >
                                  {itemThuTuc.MC_TTHC_GV_HienThi
                                    ? 'Ẩn'
                                    : 'Hiển thị'}
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
                {/* Phân trang */}
                <div
                  className={clsx(
                    'grid grid-cols-2 items-center justify-between',
                    listHoSoThuTuc?.length <= 0 && 'hidden',
                  )}
                >
                  {listHoSoThuTuc?.length == 0 ? null : (
                    <div className="flex flex-row items-center">
                      <p className="font-semibold text-[#336699]">
                        Tổng số:{' '}
                        <span>{listHoSoThuTuc?.length} hồ sơ/thủ tục</span>
                      </p>
                    </div>
                  )}
                  {listHoSoThuTuc?.length >= 5 ? (
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
                      className="w-full flex items-center justify-end gap-1"
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DanhSachHoSo
