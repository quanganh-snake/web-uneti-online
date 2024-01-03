import clsx from 'clsx'
import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { MdAdd } from 'react-icons/md'
import Swal from 'sweetalert2'

function TrinhTuThucHien(props) {
  const {
    quyTrinh,
    setQuyTrinh,
    donVi,
    handleAddQuyTrinh,
    setTPHoSoDeNghiActive,
    setTrinhTuThucHienActive,
    setPhanQuyenActive,
  } = props
  const [editRowIndex, setEditRowIndex] = useState(-1)
  const [editValueRow, setEditValueRow] = useState({})

  const [donViSelected, setDonViSelected] = useState('')
  const [searchDonVi, setSearchDonVi] = useState('')

  const [donViPhoiHopSelected, setDonViPhoiHopSelected] = useState('')
  const [searchDonViPhoiHop, setSearchDonViPhoiHop] = useState('')

  const handleEditRow = (index) => {
    setEditRowIndex(index)
    setEditValueRow(quyTrinh[index])
  }

  const handleSaveDataRow = () => {
    setQuyTrinh((prevDataRow) => {
      const newDataRow = [...prevDataRow]
      newDataRow[editRowIndex] = {
        ...editValueRow,
        MC_TTHC_GV_TrinhTuThucHien_Buoc: editRowIndex + 1,
      }
      return newDataRow
    })

    setEditRowIndex(-1)
    setEditValueRow({})
  }

  const handleCancelEditDataRow = () => {
    setEditRowIndex(-1)
  }

  const handleDeleteRow = (rowIndex) => {
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa dữ liệu này?',
      text: 'Sau khi xóa sẽ không thể khôi phục lại được',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Xóa!',
          text: 'Xóa thành công dữ liệu',
          icon: 'success',
        })
        setThanhPhanHoSo((prevDataRow) => {
          const newData = [...prevDataRow]
          newData.splice(rowIndex, 1)
          return newData
        })
      }
    })
  }

  const handleChangeValue = (e, fieldName) => {
    const { value, checked, type, files } = e.target
    let fieldValue
    if (type === 'checkbox') {
      fieldValue = checked
      setEditValueRow((prevEditValueRow) => ({
        ...prevEditValueRow,
        [fieldName]: fieldValue,
      }))
    } else if (type === 'file') {
      if (files && files.length > 0) {
        setEditValueRow((prevEditValueRow) => ({
          ...prevEditValueRow,
          MC_TTHC_GV_ThanhPhanHoSo_TenFile: files[0].name,
        }))
        getDataFileToBase64(files[0]).then((dataFileBase64) => {
          setEditValueRow((prevEditValueRow) => ({
            ...prevEditValueRow,
            MC_TTHC_GV_ThanhPhanHoSo_DataFile: dataFileBase64,
          }))
        })
      }
    } else {
      fieldValue = value
      setEditValueRow((prevEditValueRow) => ({
        ...prevEditValueRow,
        [fieldName]: fieldValue,
      }))
    }

    if (fieldName === 'MC_TTHC_GV_TrinhTuThucHien_DonViThucHien') {
      setEditValueRow((prevEditValueRow) => ({
        ...prevEditValueRow,
        [fieldName]: e.target.textContent,
      }))
    }

    if (fieldName === 'MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop') {
      setEditValueRow((prevEditValueRow) => ({
        ...prevEditValueRow,
        [fieldName]: e.target.textContent,
      }))
    }
  }

  return (
    <div className="uneti-tthcgv__trinhtuthuchien mb-5">
      <h2 className="text-2xl font-semibold uppercase mb-4">
        Thiết lập trình tự thực hiện
      </h2>

      <div className="block w-full overflow-x-auto mb-4 border border-slate-300 rounded-xl ">
        <table className="w-[1400px] relative">
          <thead className="bg-[#075985] text-white rounded-t-xl">
            <tr>
              <th className="border-r px-2 py-1 rounded-tl-xl">
                <p className="w-6">STT</p>
              </th>
              <th className="border-r px-2 py-1">
                <p className="w-52">Tên công việc</p>
              </th>
              <th className="border-r px-2 py-1">
                <p className="w-56">Cách thức thực hiện</p>
              </th>
              <th className="border-r px-2 py-1">
                <p className="w-[200px]">Địa chỉ tiếp nhận/trả hồ sơ</p>
              </th>
              <th className="border-r px-2 py-1">
                <p className="w-56">Đơn vị thực hiện/được ủy quyền thực hiện</p>
              </th>
              <th className="border-r px-2 py-1">
                <p className="w-56">Đơn vị phối hợp</p>
              </th>
              <th className="border-r px-2 py-1">
                <p className="w-44">Thời gian (ngày)</p>
              </th>
              <th className="border-r px-2 py-1">Kết quả</th>
              <th className="px-2 py-1 rounded-tr-xl sticky right-0 bg-[#336699] text-white z-[1]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {quyTrinh.length === 0 && (
              <tr className="text-center">
                <td colSpan={7}>
                  <p className="px-2 py-2 font-semibold text-red-500">
                    Chưa có trình tự thực hiện nào
                  </p>
                </td>
              </tr>
            )}
            {quyTrinh.map((row, index) => (
              <tr
                key={index}
                className={clsx(editRowIndex === index ? 'bg-slate-200' : null)}
              >
                {/* Dữ liệu hiển thị */}
                {editRowIndex === index ? (
                  <>
                    {/* Hiển thị dữ liệu cho phép chỉnh sửa */}
                    <td className="border-r px-2 py-1 text-center">
                      {index + 1}
                    </td>
                    <td className="border-r py-1">
                      <textarea
                        type="text"
                        className="w-full h-full border border-slate-300 px-3 py-1 focus:outline-slate-300"
                        placeholder="Nhập tên công việc..."
                        rows={3}
                        value={
                          editValueRow.MC_TTHC_GV_TrinhTuThucHien_TenCongViec ||
                          ''
                        }
                        onChange={(e) =>
                          handleChangeValue(
                            e,
                            'MC_TTHC_GV_TrinhTuThucHien_TenCongViec',
                          )
                        }
                      ></textarea>
                    </td>
                    <td className="border-r py-1">
                      <textarea
                        type="text"
                        rows={3}
                        className="min-w-[300px] border border-slate-300 px-3 py-1 focus:outline-slate-300"
                        placeholder="Nhập mô tả thực hiện..."
                        value={
                          editValueRow.MC_TTHC_GV_TrinhTuThucHien_CachThucThucHien ||
                          ''
                        }
                        onChange={(e) =>
                          handleChangeValue(
                            e,
                            'MC_TTHC_GV_TrinhTuThucHien_CachThucThucHien',
                          )
                        }
                      />
                    </td>
                    <td className="border-r py-1">
                      <select
                        className="border border-slate-300 px-3 py-1 w-full focus:outline-slate-200"
                        value={
                          editValueRow.MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra ||
                          ''
                        }
                        name="MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra"
                        id="MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra"
                        onChange={(e) =>
                          handleChangeValue(
                            e,
                            'MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra',
                          )
                        }
                      >
                        <option value="">
                          Chọn địa chỉ tiếp nhận/trả hồ sơ
                        </option>
                        <option value="Phòng Đào tạo HN">
                          Phòng Đào tạo HN
                        </option>
                        <option value="Phòng Đào tạo NĐ">
                          Phòng Đào tạo NĐ
                        </option>
                        <option value="Phòng Tổ chức cán bộ">
                          Phòng Tổ chức cán bộ
                        </option>
                      </select>
                    </td>
                    <td className="border-r py-1">
                      <div className="w-full relative">
                        {donViSelected ? (
                          <p className="text-center text-red-600 font-medium">
                            {donViSelected}
                          </p>
                        ) : (
                          ''
                        )}
                        <ul
                          className={clsx(
                            'bg-white mt-2 border shadow-sm overflow-y-auto',
                            !editRowIndex === index ? 'hidden' : 'max-h-40',
                          )}
                        >
                          <div className="flex items-center px-2 sticky top-0 bg-white shadow-md">
                            <AiOutlineSearch
                              size={18}
                              className="text-gray-700"
                            />
                            <input
                              type="text"
                              onChange={(e) => {
                                setSearchDonVi(e.target.value.toLowerCase())
                              }}
                              placeholder="Nhập tên đơn vị"
                              className="w-full placeholder:text-gray-500 p-2 outline-none"
                            />
                          </div>
                          {donVi &&
                            donVi?.map((iDonVi, index) => {
                              return (
                                <li
                                  key={index}
                                  className={clsx(
                                    'p-2 text-sm cursor-pointer hover:bg-sky-600 hover:text-white',
                                    iDonVi?.TenPhongBan.toLowerCase().includes(
                                      searchDonVi,
                                    )
                                      ? 'block'
                                      : 'hidden',
                                  )}
                                  onClick={(e) => {
                                    handleChangeValue(
                                      e,
                                      'MC_TTHC_GV_TrinhTuThucHien_DonViThucHien',
                                    )
                                    setDonViSelected(iDonVi?.TenPhongBan)
                                    setSearchDonVi('')
                                  }}
                                >
                                  {iDonVi?.TenPhongBan}
                                </li>
                              )
                            })}
                        </ul>
                      </div>
                    </td>
                    <td className="border-r px-2 py-1">
                      <div className="w-full relative">
                        {donViPhoiHopSelected ? (
                          <p className="text-center text-red-600 font-medium">
                            {donViPhoiHopSelected}
                          </p>
                        ) : (
                          ''
                        )}
                        <ul
                          className={clsx(
                            'bg-white mt-2 border shadow-sm overflow-y-auto',
                            !editRowIndex === index ? 'hidden' : 'max-h-40',
                          )}
                        >
                          <div className="flex items-center px-2 sticky top-0 bg-white shadow-md">
                            <AiOutlineSearch
                              size={18}
                              className="text-gray-700"
                            />
                            <input
                              type="text"
                              onChange={(e) => {
                                setSearchDonViPhoiHop(
                                  e.target.value.toLowerCase(),
                                )
                              }}
                              placeholder="Nhập tên đơn vị"
                              className="w-full placeholder:text-gray-500 p-2 outline-none"
                            />
                          </div>
                          {donVi &&
                            donVi?.map((iDonVi, index) => {
                              return (
                                <li
                                  key={index}
                                  className={clsx(
                                    'p-2 text-sm cursor-pointer hover:bg-sky-600 hover:text-white',
                                    iDonVi?.TenPhongBan.toLowerCase().includes(
                                      searchDonViPhoiHop,
                                    )
                                      ? 'block'
                                      : 'hidden',
                                  )}
                                  onClick={(e) => {
                                    handleChangeValue(
                                      e,
                                      'MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop',
                                    )
                                    setDonViPhoiHopSelected(iDonVi?.TenPhongBan)
                                    setSearchDonViPhoiHop('')
                                  }}
                                >
                                  {iDonVi?.TenPhongBan}
                                </li>
                              )
                            })}
                        </ul>
                      </div>
                    </td>
                    <td className="border-r py-1">
                      <input
                        type="number"
                        className="w-full border border-slate-300 px-3 py-1 focus:outline-slate-300"
                        placeholder="Nhập thời gian thực hiện"
                        step={0.1}
                        value={
                          editValueRow.MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay ||
                          ''
                        }
                        onChange={(e) =>
                          handleChangeValue(
                            e,
                            'MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay',
                          )
                        }
                      />
                    </td>
                    <td className="border-r py-1">
                      <textarea
                        type="text"
                        className="min-w-[300px] border border-slate-300 px-3 py-1 focus:outline-slate-300"
                        placeholder="Nhập thông báo kết quả"
                        rows="3"
                        value={
                          editValueRow.MC_TTHC_GV_TrinhTuThucHien_KetQua || ''
                        }
                        onChange={(e) =>
                          handleChangeValue(
                            e,
                            'MC_TTHC_GV_TrinhTuThucHien_KetQua',
                          )
                        }
                      />
                    </td>
                    <td className="border-r px-2 py-1 text-center flex flex-col lg:flex-row justify-center gap-2 sticky right-0 z-[1] bg-slate-300 shadow-md top-0 bottom-0 h-[100px]">
                      <div className="flex flex-col lg:flex-row items-center justify-center gap-2 h-full">
                        <button
                          type="button"
                          className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                          onClick={handleSaveDataRow}
                        >
                          Lưu
                        </button>
                        <button
                          type="button"
                          className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                          onClick={handleCancelEditDataRow}
                        >
                          Hủy
                        </button>
                        <button
                          type="button"
                          className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                          onClick={() => handleDeleteRow(index)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="text-center border-r px-2 py-1 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="text-center border-r px-2 py-1 min-w-[250px]">
                      {row.MC_TTHC_GV_TrinhTuThucHien_TenCongViec ?? ''}
                    </td>
                    <td className="text-left border-r px-2 py-1 w-[150px]">
                      {row.MC_TTHC_GV_TrinhTuThucHien_CachThucThucHien ?? ''}
                    </td>
                    <td className="text-center border-r px-2 py-1">
                      {row.MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra ?? ''}
                    </td>
                    <td className="text-center border-r px-2 py-1">
                      {row.MC_TTHC_GV_TrinhTuThucHien_DonViThucHien ?? ''}
                    </td>
                    <td className="text-center border-r px-2 py-1">
                      {row.MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop ?? ''}
                    </td>
                    <td className="text-center border-r px-2 py-1">
                      {row.MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay ?? ''}
                    </td>
                    <td className="text-center border-r px-2 py-1 min-w-[300px]">
                      <p className="w-full text-left">
                        {row.MC_TTHC_GV_TrinhTuThucHien_KetQua ?? ''}
                      </p>
                    </td>
                    <td className="text-center border-r px-2 py-1 sticky right-0 z-[1] bg-slate-300 shadow-md top-0 bottom-0 h-full">
                      <div className="flex flex-col lg:flex-row items-center justify-center gap-2 h-full">
                        <button
                          type="button"
                          className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                          onClick={() => handleEditRow(index)}
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                          onClick={() => handleDeleteRow(index)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setTPHoSoDeNghiActive(true)
            setTrinhTuThucHienActive(false)
          }}
          className="font-semibold text-md flex items-center gap-2 px-3 py-2 bg-teal-600 text-white rounded-lg hover:opacity-70"
        >
          <FaArrowLeft />
          <span className="text-md">Quay lại</span>
        </button>
        <button
          type="button"
          className="flex flex-row gap-2 items-center font-semibold text-md text-white bg-[#245D7C] px-3 py-2 rounded-md hover:opacity-70"
          onClick={handleAddQuyTrinh}
        >
          <MdAdd size={24} className="font-bold" />
          Thêm trình tự thực hiện
        </button>
        <button
          type="button"
          onClick={() => {
            setPhanQuyenActive(true)
            setTrinhTuThucHienActive(false)
          }}
          className="font-semibold text-md flex items-center gap-2 px-3 py-2 bg-teal-600 text-white rounded-lg hover:opacity-70"
        >
          <span className="text-md">Tiếp theo</span>
          <FaArrowRight />
        </button>
      </div>
    </div>
  )
}

export default TrinhTuThucHien
