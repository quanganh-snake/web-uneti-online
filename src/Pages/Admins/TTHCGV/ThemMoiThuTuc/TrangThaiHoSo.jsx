import clsx from 'clsx'
import React from 'react'
import { useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { MdAdd } from 'react-icons/md'
import Swal from 'sweetalert2'

function TrangThaiHoSo(props) {
  const {
    trangThai,
    setTrangThai,
    handleAddTrangThai,
    setThongTinActive,
    setTPHoSoDeNghiActive,
    setTrinhTuThucHienActive,
    setPhanQuyenActive,
    setTrangThaiActive,
  } = props
  const [editRowIndex, setEditRowIndex] = useState(-1)
  const [editValueRow, setEditValueRow] = useState({})
  // event handlers
  const handleEditRow = (index) => {
    setEditRowIndex(index)
    setEditValueRow(trangThai[index])
  }

  const handleSaveDataRow = () => {
    setTrangThai((prevDataRow) => {
      const newDataRow = [...prevDataRow]
      newDataRow[editRowIndex] = {
        ...editValueRow,
        MC_TTHC_GV_TrangThai_STT: editRowIndex + 1,
      }
      return newDataRow
    })

    setEditRowIndex(-1)
    setEditValueRow({})
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
        setTrangThai((prevDataRow) => {
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
        convertDataFileToBase64(files[0]).then((dataFileBase64) => {
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
  }

  return (
    <div className="uneti-tthcgv__tphosodenghi mb-5 w-full">
      <h2 className="text-2xl font-semibold uppercase mb-4">
        Thiết lập thành phần hồ sơ đề nghị
      </h2>

      <div className="w-full overflow-x-auto mb-4 border border-slate-300 rounded-xl ">
        <table className="w-full">
          <thead className="bg-[#075985] text-white rounded-t-xl">
            <tr>
              <th className="border-r px-2 py-1 rounded-tl-xl">STT</th>
              <th className="border-r px-2 py-1">Tên trạng thái</th>
              <th className="border-r px-2 py-1">Mô tả</th>
              <th className="px-2 py-1 rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trangThai.length === 0 && (
              <tr className="text-center">
                <td colSpan={7}>
                  <p className="px-2 py-2 font-semibold text-red-500">
                    Chưa có trạng thái nào được thiết lập
                  </p>
                </td>
              </tr>
            )}
            {trangThai.map((row, index) => (
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
                    <td className="border-r px-2 py-1">
                      <input
                        type="text"
                        className="w-full border border-slate-300 rounded-md px-2 focus:outline-slate-300"
                        placeholder="Nhập tên trạng thái..."
                        value={
                          editValueRow.MC_TTHC_GV_TrangThai_TenTrangThai || ''
                        }
                        onChange={(e) =>
                          handleChangeValue(
                            e,
                            'MC_TTHC_GV_TrangThai_TenTrangThai',
                          )
                        }
                      />
                    </td>
                    <td className="border-r px-2 py-1">
                      <textarea
                        type="text"
                        className="w-full border border-slate-300 rounded-md px-2 focus:outline-slate-300"
                        placeholder="Nhập mô tả..."
                        value={editValueRow.MC_TTHC_GV_TrangThai_MoTa || ''}
                        onChange={(e) =>
                          handleChangeValue(e, 'MC_TTHC_GV_TrangThai_MoTa')
                        }
                      ></textarea>
                    </td>

                    <td className="border-r px-2 py-1 text-center flex flex-col lg:flex-row justify-center gap-2">
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
                        onClick={handleSaveDataRow}
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
                    </td>
                  </>
                ) : (
                  <>
                    <td className="text-center border-r px-2 py-1">
                      {index + 1}
                    </td>
                    <td className="text-center border-r px-2 py-1">
                      {row.MC_TTHC_GV_TrangThai_TenTrangThai ?? ''}
                    </td>
                    <td className="text-center border-r px-2 py-1">
                      {row.MC_TTHC_GV_TrangThai_MoTa ?? ''}
                    </td>
                    <td className="text-center border-r px-2 py-1">
                      <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
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
            setTrangThaiActive(false)
            setPhanQuyenActive(true)
          }}
          className="font-semibold text-md flex items-center gap-2 px-3 py-2 bg-teal-600 text-white rounded-lg hover:opacity-70"
        >
          <FaArrowLeft />
          <span className="text-md">Quay lại</span>
        </button>
        <button
          type="button"
          className="flex flex-row gap-2 items-center font-semibold text-md text-white bg-[#245D7C] px-3 py-2 rounded-md hover:opacity-70"
          onClick={handleAddTrangThai}
        >
          <MdAdd size={24} className="font-bold" />
          Thêm trạng thái
        </button>
      </div>
    </div>
  )
}

export default TrangThaiHoSo
