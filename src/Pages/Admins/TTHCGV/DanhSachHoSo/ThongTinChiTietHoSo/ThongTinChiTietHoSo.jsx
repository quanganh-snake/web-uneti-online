import SidebarTTHCGV from '../../Sidebar/SidebarTTHCGV'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import {
  getKiemTraTrungMaTTHCGV,
  getThuTucHanhChinhByID,
  putThongTinHoSoThuTuc,
} from '@/Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'
import Swal from 'sweetalert2'
import clsx from 'clsx'
import Loading from '@/Components/Loading/Loading'

// icons
import { FaAngleRight } from 'react-icons/fa'
import {
  MdDelete,
  MdOutlineZoomInMap,
  MdOutlineZoomOutMap,
} from 'react-icons/md'
import { TfiReload } from 'react-icons/tfi'
import { NguonTiepNhan_WEB } from '@/Services/Static/dataStatic'
import { toast } from 'react-toastify'
import { checkConditionObject } from '@/Services/Utils/objectUtils'
import {
  delTrinhTuThucHienTTHCGV,
  putTrinhTuThucHienTTHCGV,
} from '@/Apis/ThuTucHanhChinhGiangVien/apiTrinhTuThucHien'
import {
  deleteTrangThaiTTHCGV,
  putTrangthaiTTHCGV,
} from '@/Apis/ThuTucHanhChinhGiangVien/apiTrangThai'
import {
  delThanhPhanHoSoTTHCGV,
  putThanhPhanHoSoTTHCGV,
} from '@/Apis/ThuTucHanhChinhGiangVien/apiThanhPhanHoSo'
import { delPhanQuyenTTHCGV } from '@/Apis/ThuTucHanhChinhGiangVien/apiPhanQuyen'
import {
  convertBufferToBase64,
  convertDataFileToBase64,
} from '@/Services/Utils/stringUtils'
import { handlePreviewFileBase64 } from '@/Services/Utils/fileUtils'
import { DebounceInput } from 'react-debounce-input'
import { EditPhanQuyenThuTuc } from './EditPhanQuyenThuTuc/EditPhanQuyenThuTuc'

function ThongTinChiTietHoSo() {
  const { id } = useParams()
  const [detailHoSoThuTuc, setDetailHoSoThuTuc] = useState({})
  const [loading, setLoading] = useState(true)

  const [showThongTinHoSo, setShowThongTinHoSo] = useState(true)
  const [showTPHSDeNghi, setShowTPHSDeNghi] = useState(false)
  const [showTrinhTuThucHien, setShowTrinhTuThucHien] = useState(false)
  const [showPhanQuyen, setShowPhanQuyen] = useState(false)
  const [showTrangThai, setShowTrangThai] = useState(false)
  const [showEditPhanQuyen, setShowEditPhanQuyen] = useState(false)

  const [zoomView, setZoomView] = useState(false)
  const [updatetepThuTuc, setUpdatetepThuTuc] = useState(false)

  const [editRowIndex, setEditRowIndex] = useState(-1)
  const [editValueRow, setEditValueRow] = useState({})
  const [editType, setEditType] = useState('')
  const [editThongTinChung, setEditThongTinChung] = useState({})

  const TABS = {
    tabThongTinHoSo: 'ThongTinHoSo',
    tabTPHSDeNghi: 'ThanhPhanHoSoDeNghi',
    tabTrinhTuThucHien: 'TrinhTuThucHien',
    tabPhanQuyen: 'PhanQuyen',
    tabTrangThai: 'TrangThai',
  }

  const getDataDetailHoSoThuTuc = async () => {
    try {
      const resultDataHoSoThuTuc = await getThuTucHanhChinhByID(id)
      setLoading(true)
      if (resultDataHoSoThuTuc.status === 200) {
        const dataDetailHoSoThuTuc = await resultDataHoSoThuTuc.data
        if (dataDetailHoSoThuTuc) {
          const { ThongTinHoSo } = dataDetailHoSoThuTuc
          setDetailHoSoThuTuc(dataDetailHoSoThuTuc)
          setEditThongTinChung(ThongTinHoSo)
          setLoading(false)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  // Events handlers
  const handleShowView = (tab) => {
    if (tab === TABS.tabThongTinHoSo) {
      setShowThongTinHoSo(!showThongTinHoSo)
    }
    if (tab === TABS.tabTPHSDeNghi) {
      setShowTPHSDeNghi(!showTPHSDeNghi)
    }
    if (tab === TABS.tabTrinhTuThucHien) {
      setShowTrinhTuThucHien(!showTrinhTuThucHien)
    }
    if (tab === TABS.tabPhanQuyen) {
      setShowPhanQuyen(!showPhanQuyen)
    }
    if (tab === TABS.tabTrangThai) {
      setShowTrangThai(!showTrangThai)
    }
  }

  const handleDeleteRow = async (type, valueRow) => {
    // DELETE TrangThai
    if (type === TABS.tabTrangThai) {
      Swal.fire({
        icon: 'question',
        html: `Bạn chắc chắn muốn xóa trạng thái <p class="font-semibold uppercase text-red-600">${valueRow?.MC_TTHC_GV_TrangThai_TenTrangThai}</p> không?`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const dataIDDelete = {
              MC_TTHC_GV_TrangThai_ID:
                valueRow?.MC_TTHC_GV_TrangThai_ID.toString(),
            }
            setLoading(true)
            const resDelete = await deleteTrangThaiTTHCGV(dataIDDelete)
            if (resDelete.status === 200) {
              setLoading(false)
              return toast.success(
                `Xóa thành công công việc ${valueRow?.MC_TTHC_GV_TrangThai_TenTrangThai}!`,
              )
            }
          } catch (error) {
            console.log(error.message)
          }
        }
      })
    }

    // DELETE TrinhTuThucHien
    if (type === TABS.tabTrinhTuThucHien) {
      Swal.fire({
        icon: 'question',
        html: `Bạn chắc chắn muốn xóa công việc <p class="font-semibold uppercase text-red-600">${valueRow?.MC_TTHC_GV_TrinhTuThucHien_TenCongViec}</p> không?`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const dataIDDelete = {
              MC_TTHC_GV_TrinhTuThucHien_ID:
                valueRow?.MC_TTHC_GV_TrinhTuThucHien_ID.toString(),
            }
            setLoading(true)
            const resDelete = await delTrinhTuThucHienTTHCGV(dataIDDelete)
            if (resDelete.status === 200) {
              setLoading(false)
              return toast.success(
                `Xóa thành công công việc ${valueRow?.MC_TTHC_GV_TrinhTuThucHien_TenCongViec}!`,
              )
            }
          } catch (error) {
            console.log(error.message)
          }
        }
      })
    }

    // DELETE TPHSDeNghi
    if (type === TABS.tabTPHSDeNghi) {
      Swal.fire({
        icon: 'question',
        html: `Bạn chắc chắn muốn xóa mẫu giấy tờ kèm theo <p class="font-semibold uppercase text-red-600">${valueRow?.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo}</p> không?`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setLoading(true)
            const resDelete = await delThanhPhanHoSoTTHCGV(
              valueRow?.MC_TTHC_GV_ThanhPhanHoSo_ID.toString(),
            )
            if (resDelete.status === 200) {
              setLoading(false)
              return toast.success(`Xóa thành công mẫu giấy tờ kèm theo!`)
            }
          } catch (error) {
            console.log(error.message)
          }
        }
      })
    }

    // DELETE PhanQuyen
    if (type === TABS.tabPhanQuyen) {
      Swal.fire({
        icon: 'question',
        html: `Bạn chắc chắn muốn xóa quyền của nhân sự <p class="font-semibold uppercase text-red-600">${valueRow?.MC_TTHC_GV_PhanQuyen_HoTen}</p> không?`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setLoading(true)
            const resDelete = await delPhanQuyenTTHCGV(
              valueRow?.MC_TTHC_GV_PhanQuyen_ID.toString(),
            )
            if (resDelete.status === 200) {
              setLoading(false)
              return toast.success(
                `Xóa thành công phân quyền của nhân sự ${valueRow?.MC_TTHC_GV_PhanQuyen_HoTen} khỏi hồ sơ!`,
              )
            }
          } catch (error) {
            console.log(error.message)
          }
        }
      })
    }
  }

  const handleEditRow = async (index, type, valueRow) => {
    setEditType(type)
    setEditRowIndex(index)
    setEditValueRow(valueRow)
  }

  const handleCancelUpdateRow = () => {
    setEditType('')
    setEditRowIndex(-1)
    setEditValueRow({})
  }

  const handleChangeValue = (tab, e) => {
    const { value, checked, type, files, name } = e.target

    if (tab === TABS.tabThongTinHoSo) {
      setEditThongTinChung((prevObject) => ({
        ...prevObject,
        [name]: value,
      }))
    } else {
      if (type === 'checkbox') {
        console.log(name, checked)
        setEditValueRow((prevEditValueRow) => ({
          ...prevEditValueRow,
          [name]: checked,
        }))
      } else if (type === 'file') {
        if (files && files.length > 0) {
          if (tab === TABS.tabTPHSDeNghi) {
            setEditValueRow((prevEditValueRow) => ({
              ...prevEditValueRow,
              MC_TTHC_GV_ThanhPhanHoSo_TenFile: files[0].name,
            }))
            convertDataFileToBase64(files[0]).then((dataFileBase64) => {
              setEditValueRow((prevEditValueRow) => ({
                ...prevEditValueRow,
                MC_TTHC_GV_ThanhPhanHoSo_DataFile: dataFileBase64.split(',')[1],
              }))
            })
          }
        }
      } else {
        setEditValueRow((prevEditValueRow) => ({
          ...prevEditValueRow,
          [name]: value,
        }))
      }
    }
  }

  const handleUpdate = async (type, valueRow) => {
    if (type === TABS.tabThongTinHoSo) {
      const newDataUpdateThongTinHoSo = {
        MC_TTHC_GV_ID: editThongTinChung?.MC_TTHC_GV_ID,
        MC_TTHC_GV_ThuTu: editThongTinChung?.MC_TTHC_GV_ThuTu,
        MC_TTHC_GV_MaThuTuc: editThongTinChung?.MC_TTHC_GV_MaThuTuc,
        MC_TTHC_GV_TenThuTuc: editThongTinChung?.MC_TTHC_GV_TenThuTuc,
        MC_TTHC_GV_GhiChu: editThongTinChung?.MC_TTHC_GV_GhiChu,
        MC_TTHC_GV_IDMucDo: editThongTinChung?.MC_TTHC_GV_IDMucDo,
        MC_TTHC_GV_LinhVuc: editThongTinChung?.MC_TTHC_GV_LinhVuc,
        MC_TTHC_GV_IsTruongPhongPheDuyet:
          editThongTinChung?.MC_TTHC_GV_IsTruongPhongPheDuyet,
        MC_TTHC_GV_IsBGHPheDuyet: editThongTinChung?.MC_TTHC_GV_IsBGHPheDuyet,
        MC_TTHC_GV_ThuTucLienThong:
          editThongTinChung?.MC_TTHC_GV_ThuTucLienThong,
        MC_TTHC_GV_ThuTucKhongApDungTrucTuyen:
          editThongTinChung?.MC_TTHC_GV_ThuTucKhongApDungTrucTuyen,
        MC_TTHC_GV_SoBoHoSo: editThongTinChung?.MC_TTHC_GV_SoBoHoSo,
        MC_TTHC_GV_TongThoiGianGiaiQuyet:
          editThongTinChung?.MC_TTHC_GV_TongThoiGianGiaiQuyet,
        MC_TTHC_GV_DoiTuongThucHien:
          editThongTinChung?.MC_TTHC_GV_DoiTuongThucHien,
        MC_TTHC_GV_CanCuPhapLyCuaTTHC:
          editThongTinChung?.MC_TTHC_GV_CanCuPhapLyCuaTTHC,
        MC_TTHC_GV_DieuKienThucHien:
          editThongTinChung?.MC_TTHC_GV_DieuKienThucHien,
        MC_TTHC_GV_TepThuTuc_TenFile:
          editThongTinChung?.MC_TTHC_GV_TepThuTuc_TenFile,
        MC_TTHC_GV_TepThuTuc_DataFileFile:
          editThongTinChung?.MC_TTHC_GV_TepThuTuc_DataFileFile,
        MC_TTHC_GV_NguonTiepNhan: NguonTiepNhan_WEB,
        MC_TTHC_GV_NoiTiepNhan: editThongTinChung?.MC_TTHC_GV_NoiTiepNhan,
        MC_TTHC_GV_NoiTraKetQua: editThongTinChung?.MC_TTHC_GV_NoiTraKetQua,
      }

      //   const checkMaThuTucResponse = await getKiemTraTrungMaTTHCGV(
      //     editThongTinChung?.MC_TTHC_GV_MaThuTuc,
      //   )
      //   if (checkMaThuTucResponse.status === 200) {
      //     const dataTrungMaTTHCGV = await checkMaThuTucResponse.data.body
      //     if (dataTrungMaTTHCGV?.length > 0) {
      //       return Swal.fire({
      //         icon: 'error',
      //         title: 'Lỗi',
      //         text: 'Mã thủ tục này đã tồn tại',
      //       })
      //     }
      //   }

      const isEqualValue = checkConditionObject(
        detailHoSoThuTuc?.ThongTinHoSo,
        newDataUpdateThongTinHoSo,
      )
      if (isEqualValue == true) {
        Swal.fire({
          icon: 'question',
          title: 'Bạn có chắc chắn muốn cập nhật thông tin này không?',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Đồng ý',
          cancelButtonText: 'Hủy',
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const resUpdateThongTinHoSo = await putThongTinHoSoThuTuc(
                newDataUpdateThongTinHoSo,
              )
              if (resUpdateThongTinHoSo.status === 200) {
                setLoading(false)
                setEditType('')
                Swal.fire({
                  icon: 'success',
                  title: 'Cập nhật thông tin hồ sơ thành công!',
                })
                getDataDetailHoSoThuTuc()
                return
              }
            } catch (error) {
              console.log(error.message)
            }
          }
        })
      } else {
        return toast.warning(
          'Không có thay đổi nào để cập nhật thông tin hồ sơ!',
        )
      }
    }

    if (type === TABS.tabTPHSDeNghi) {
      let dataTPHPUpdate = {
        MC_TTHC_GV_ThanhPhanHoSo_ID: valueRow?.MC_TTHC_GV_ThanhPhanHoSo_ID,
        MC_TTHC_GV_ThanhPhanHoSo_IDTTHC:
          valueRow?.MC_TTHC_GV_ThanhPhanHoSo_IDTTHC,
        MC_TTHC_GV_ThanhPhanHoSo_STT: valueRow?.MC_TTHC_GV_ThanhPhanHoSo_STT,
        MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo:
          valueRow?.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo,
        MC_TTHC_GV_ThanhPhanHoSo_TenFile:
          valueRow?.MC_TTHC_GV_ThanhPhanHoSo_TenFile,
        MC_TTHC_GV_ThanhPhanHoSo_DataFile:
          valueRow?.MC_TTHC_GV_ThanhPhanHoSo_DataFile,
        MC_TTHC_GV_ThanhPhanHoSo_BanChinh:
          valueRow?.MC_TTHC_GV_ThanhPhanHoSo_BanChinh,
        MC_TTHC_GV_ThanhPhanHoSo_BanSao:
          valueRow?.MC_TTHC_GV_ThanhPhanHoSo_BanSao,
        MC_TTHC_GV_ThanhPhanHoSo_BatBuoc:
          valueRow?.MC_TTHC_GV_ThanhPhanHoSo_BatBuoc,
      }

      try {
        Swal.fire({
          icon: 'question',
          title:
            'Bạn chắc chắn muốn cập nhật thông tin mẫu hồ sơ/hướng dẫn này chứ?',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Đồng ý',
          cancelButtonText: 'Hủy',
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const resUpdateTPHSDeNghi =
                await putThanhPhanHoSoTTHCGV(dataTPHPUpdate)
              if (resUpdateTPHSDeNghi.status === 200) {
                getDataDetailHoSoThuTuc()
                setEditRowIndex(-1)
                setEditValueRow({})
                Swal.fire({
                  icon: 'success',
                  title: `Cập nhật thông tin thành phần hồ sơ ${valueRow?.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo} thành công!`,
                })
              }
            } catch (error) {
              console.log(error.message)
            }
          }
        })
      } catch (error) {
        console.log(error.message)
      }
    }

    if (type === TABS.tabTrinhTuThucHien) {
      let dataTrinhTuUpdate = {
        MC_TTHC_GV_TrinhTuThucHien_ID: valueRow?.MC_TTHC_GV_TrinhTuThucHien_ID,
        MC_TTHC_GV_TrinhTuThucHien_IDTTHC:
          valueRow?.MC_TTHC_GV_TrinhTuThucHien_IDTTHC,
        MC_TTHC_GV_TrinhTuThucHien_Buoc:
          valueRow?.MC_TTHC_GV_TrinhTuThucHien_Buoc,
        MC_TTHC_GV_TrinhTuThucHien_TenCongViec:
          valueRow?.MC_TTHC_GV_TrinhTuThucHien_TenCongViec,
        MC_TTHC_GV_TrinhTuThucHien_CachThucThucHien:
          valueRow?.MC_TTHC_GV_TrinhTuThucHien_CachThucThucHien,
        MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra:
          valueRow?.MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra,
        MC_TTHC_GV_TrinhTuThucHien_DonViThucHien:
          valueRow?.MC_TTHC_GV_TrinhTuThucHien_DonViThucHien,
        MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop:
          valueRow?.MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop,
        MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay:
          valueRow?.MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay,
        MC_TTHC_GV_TrinhTuThucHien_KetQua:
          valueRow?.MC_TTHC_GV_TrinhTuThucHien_KetQua,
      }

      try {
        Swal.fire({
          icon: 'question',
          title:
            'Bạn chắc chắn muốn cập nhật thông tin trình tự thực hiện này chứ?',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Đồng ý',
          cancelButtonText: 'Hủy',
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const resUpdateTrinhTuThucHien =
                await putTrinhTuThucHienTTHCGV(dataTrinhTuUpdate)
              if (resUpdateTrinhTuThucHien.status === 200) {
                getDataDetailHoSoThuTuc()
                setEditType('')
                setEditRowIndex(-1)
                setEditValueRow({})
                Swal.fire({
                  icon: 'success',
                  title: `Cập nhật thông tin trình tự thực hiện ${valueRow?.MC_TTHC_GV_TrinhTuThucHien_TenCongViec} thành công!`,
                })
              }
            } catch (error) {
              console.log(error.message)
            }
          }
        })
      } catch (error) {
        console.log(error.message)
      }
    }

    if (type === TABS.tabTrangThai) {
      let dataTrangThaiUpdate = {
        MC_TTHC_GV_TrangThai_ID: valueRow?.MC_TTHC_GV_TrangThai_ID,
        MC_TTHC_GV_TrangThai_IDTTHC: valueRow?.MC_TTHC_GV_TrangThai_IDTTHC,
        MC_TTHC_GV_TrangThai_STT: valueRow?.MC_TTHC_GV_TrangThai_STT,
        MC_TTHC_GV_TrangThai_TenTrangThai:
          valueRow?.MC_TTHC_GV_TrangThai_TenTrangThai,
        MC_TTHC_GV_TrangThai_MoTa: valueRow?.MC_TTHC_GV_TrangThai_MoTa,
      }
      try {
        Swal.fire({
          icon: 'question',
          title: 'Bạn chắc chắn muốn cập nhật thông tin trạng thái này chứ?',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Đồng ý',
          cancelButtonText: 'Hủy',
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const resUpdateTPHSDeNghi =
                await putTrangthaiTTHCGV(dataTrangThaiUpdate)
              if (resUpdateTPHSDeNghi.status === 200) {
                getDataDetailHoSoThuTuc()
                setEditRowIndex(-1)
                setEditValueRow({})
                Swal.fire({
                  icon: 'success',
                  title: `Cập nhật thông tin trạng thái ${valueRow?.MC_TTHC_GV_TrangThai_TenTrangThai} thành công!`,
                })
              }
            } catch (error) {
              console.log(error.message)
            }
          }
        })
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  // Effects
  useEffect(() => {
    getDataDetailHoSoThuTuc()
  }, [loading])

  const { ThongTinHoSo, ThanhPhanHoSo, TrinhTuThucHien, PhanQuyen, TrangThai } =
    detailHoSoThuTuc ?? null

  return (
    <div className="px-5 lg:px-0 grid grid-cols-12 flex-row gap-4">
      <div className="col-span-12 lg:col-span-2">
        <SidebarTTHCGV />
      </div>
      <div
        className={clsx(
          'col-span-12 lg:col-span-10 w-full p-4 rounded-xl shadow-lg bg-white',
          zoomView ? 'absolute left-0 right-0' : '',
        )}
      >
        <div className="flex flex-col">
          <div className="flex justify-between">
            <h3 className="font-semibold text-md lg:text-2xl uppercase mb-6 text-[#336699] underline">
              Chi tiết quy trình hồ sơ - thủ tục
            </h3>
            {zoomView ? (
              <MdOutlineZoomInMap
                size={24}
                onClick={() => {
                  setZoomView(false)
                }}
                className="text-sky-800 cursor-pointer"
              />
            ) : (
              <MdOutlineZoomOutMap
                size={24}
                onClick={() => {
                  setZoomView(true)
                }}
                className="text-sky-800 cursor-pointer"
              />
            )}
          </div>
          {loading ? (
            <div className="w-full flex justify-center">
              <Loading />
            </div>
          ) : (
            <>
              {/* Thông tin hồ sơ */}
              <div className="TTHC-GV_ThongTinHoSo mb-4">
                <div className="flex flex-row items-center lg:justify-between bg-gray-100 shadow-md p-2 rounded-md mb-4">
                  <div className="flex flex-row items-center gap-2 text-sky-700">
                    {showThongTinHoSo ? (
                      <FaAngleRight
                        size={20}
                        className="cursor-pointer hover:opacity-70 mt-1 rotate-90"
                        onClick={() => {
                          handleShowView(TABS.tabThongTinHoSo)
                        }}
                      />
                    ) : (
                      <FaAngleRight
                        size={20}
                        className="cursor-pointer hover:opacity-70 mt-1"
                        onClick={() => {
                          handleShowView(TABS.tabThongTinHoSo)
                        }}
                      />
                    )}
                    <h4 className="lg:text-xl uppercase font-medium">
                      Thông tin hồ sơ
                    </h4>
                  </div>
                  <button
                    type="button"
                    className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
                    onClick={() => {
                      handleUpdate(TABS.tabThongTinHoSo, ThongTinHoSo)
                    }}
                  >
                    <TfiReload className="mx-2 font-semibold" />
                    Cập nhật thông tin
                  </button>
                </div>
                <div
                  className={clsx(
                    showThongTinHoSo ? 'grid grid-cols-4 gap-4' : 'hidden',
                  )}
                >
                  {/* Tên thủ tục */}
                  <div className="col-span-4">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="MC_TTHC_GV_TenThuTuc"
                        className="font-semibold"
                      >
                        Tên thủ tục{' '}
                        <span className="text-red-600 font-semibold">*</span>
                      </label>
                      <input
                        type="text"
                        className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-none"
                        defaultValue={ThongTinHoSo?.MC_TTHC_GV_TenThuTuc}
                        placeholder="Nhập tên thủ tục"
                        name="MC_TTHC_GV_TenThuTuc"
                        id="MC_TTHC_GV_TenThuTuc"
                        onChange={(e) => {
                          handleChangeValue(TABS.tabThongTinHoSo, e)
                        }}
                      />
                    </div>
                  </div>
                  {/* Mã thủ tục */}
                  <div className="col-span-4 lg:col-span-2">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="MC_TTHC_GV_MaThuTuc"
                        className="font-semibold"
                      >
                        Mã thủ tục
                      </label>
                      <input
                        type="text"
                        className="px-3 py-1 w-full bg-slate-300 border border-slate-200 rounded-md focus:outline-none"
                        defaultValue={ThongTinHoSo?.MC_TTHC_GV_MaThuTuc}
                        placeholder="Nhập mã thủ tục"
                        name="MC_TTHC_GV_MaThuTuc"
                        id="MC_TTHC_GV_MaThuTuc"
                        disabled
                        onChange={(e) => {
                          handleChangeValue(TABS.tabThongTinHoSo, e)
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-2">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="MC_TTHC_GV_IDMucDo"
                        className="font-semibold"
                      >
                        Mức độ{' '}
                        <span className="text-red-600 font-semibold">*</span>
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={4}
                        className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-none"
                        defaultValue={
                          ThongTinHoSo?.MC_TTHC_GV_IDMucDo
                            ? ThongTinHoSo?.MC_TTHC_GV_IDMucDo
                            : ''
                        }
                        placeholder="Nhập mức độ"
                        name="MC_TTHC_GV_IDMucDo"
                        id="MC_TTHC_GV_IDMucDo"
                        onChange={(e) => {
                          handleChangeValue(TABS.tabThongTinHoSo, e)
                        }}
                      />
                    </div>
                  </div>
                  {/* Tổng thời gian giải quyết */}
                  <div className="col-span-4 lg:col-span-2">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="MC_TTHC_GV_TongThoiGianGiaiQuyet"
                        className="font-semibold"
                      >
                        Tổng thời gian giải quyết (ngày){' '}
                        <span className="text-red-600 font-semibold">*</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-none"
                          defaultValue={
                            ThongTinHoSo?.MC_TTHC_GV_TongThoiGianGiaiQuyet
                          }
                          name="MC_TTHC_GV_TongThoiGianGiaiQuyet"
                          id="MC_TTHC_GV_TongThoiGianGiaiQuyet"
                          onChange={(e) => {
                            handleChangeValue(TABS.tabThongTinHoSo, e)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Lĩnh vực */}
                  <div className="col-span-4 lg:col-span-2">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="MC_TTHC_GV_LinhVuc"
                        className="font-semibold"
                      >
                        Lĩnh vực
                      </label>
                      <input
                        type="text"
                        className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-none"
                        defaultValue={ThongTinHoSo?.MC_TTHC_GV_LinhVuc}
                        placeholder="Nhập tên lĩnh vực"
                        name="MC_TTHC_GV_LinhVuc"
                        id="MC_TTHC_GV_LinhVuc"
                        onChange={(e) => {
                          handleChangeValue(TABS.tabThongTinHoSo, e)
                        }}
                      />
                    </div>
                  </div>
                  {/* Đối tượng thực hiện */}
                  <div className="col-span-4">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="MC_TTHC_GV_DoiTuongThucHien"
                        className="font-semibold"
                      >
                        Đối tượng thực hiện
                      </label>
                      <input
                        type="text"
                        className="px-3 py-1 w-full bg-slate-300 border border-slate-200 rounded-md focus:outline-none"
                        defaultValue={ThongTinHoSo?.MC_TTHC_GV_DoiTuongThucHien}
                        disabled={true}
                        name="MC_TTHC_GV_DoiTuongThucHien"
                        id="MC_TTHC_GV_DoiTuongThucHien"
                        title="Không thể chỉnh sửa đối tượng thực hiện"
                      />
                    </div>
                  </div>
                  {/* Căn cứ pháp lý của Thủ tục hành chính */}
                  <div className="col-span-4 lg:col-span-2">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="MC_TTHC_GV_CanCuPhapLyCuaTTHC"
                        className="font-semibold"
                      >
                        Căn cứ pháp lý của Thủ tục hành chính
                      </label>
                      <input
                        type="text"
                        className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-slate-400"
                        defaultValue={
                          ThongTinHoSo?.MC_TTHC_GV_CanCuPhapLyCuaTTHC ??
                          'Không có'
                        }
                        name="MC_TTHC_GV_CanCuPhapLyCuaTTHC"
                        id="MC_TTHC_GV_CanCuPhapLyCuaTTHC"
                        onChange={(e) => {
                          handleChangeValue(TABS.tabThongTinHoSo, e)
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-2">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="MC_TTHC_GV_DieuKienThucHien"
                        className="font-semibold"
                      >
                        Điều kiện thực hiện
                      </label>
                      <input
                        type="text"
                        className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-slate-400"
                        defaultValue={
                          ThongTinHoSo?.MC_TTHC_GV_DieuKienThucHien ??
                          'Không có'
                        }
                        name="MC_TTHC_GV_DieuKienThucHien"
                        id="MC_TTHC_GV_DieuKienThucHien"
                        onChange={(e) => {
                          handleChangeValue(TABS.tabThongTinHoSo, e)
                        }}
                      />
                    </div>
                  </div>
                  {/* START: Thủ tục cần trưởng phòng phê duyệt */}
                  <div className="col-span-4 lg:col-span-2 w-full flex-1 flex items-center gap-4 border px-3 py-1 rounded-md">
                    <input
                      type="checkbox"
                      className="w-4 h-4 px-3 py-1 bg-slate-300 border border-slate-200 rounded-md focus:outline-none"
                      defaultChecked={
                        ThongTinHoSo?.MC_TTHC_GV_IsTruongPhongPheDuyet
                      }
                      name="MC_TTHC_GV_IsTruongPhongPheDuyet"
                      id="MC_TTHC_GV_IsTruongPhongPheDuyet"
                      onChange={(e) => {
                        setEditThongTinChung({
                          ...editThongTinChung,
                          MC_TTHC_GV_IsTruongPhongPheDuyet: e.target.checked,
                        })
                      }}
                    />
                    <label htmlFor="MC_TTHC_GV_IsTruongPhongPheDuyet">
                      Thủ tục cần trưởng phòng phê duyệt
                    </label>
                  </div>
                  {/* END: Thủ tục cần trưởng phòng phê duyệt */}

                  {/* START: Thủ tục cần BGH phê duyệt */}
                  <div className="col-span-4 lg:col-span-2 w-full flex items-center gap-4 border px-3 py-1 rounded-md">
                    <input
                      type="checkbox"
                      className="w-4 h-4 px-3 py-1 bg-slate-300 border border-slate-200 rounded-md focus:outline-none"
                      defaultChecked={ThongTinHoSo?.MC_TTHC_GV_IsBGHPheDuyet}
                      name="MC_TTHC_GV_IsBGHPheDuyet"
                      id="MC_TTHC_GV_IsBGHPheDuyet"
                      onChange={(e) => {
                        setEditThongTinChung({
                          ...editThongTinChung,
                          MC_TTHC_GV_IsBGHPheDuyet: e.target.checked,
                        })
                      }}
                    />
                    <label htmlFor="MC_TTHC_GV_IsBGHPheDuyet">
                      Thủ tục cần Ban giám hiệu phê duyệt
                    </label>
                  </div>
                  {/* END: Thủ tục cần BGH phê duyệt */}

                  {/* START: Thủ tục liên thông */}
                  <div className="col-span-4 lg:col-span-2 w-full flex items-center gap-4 border px-3 py-1 rounded-md">
                    <input
                      type="checkbox"
                      className="w-4 h-4 px-3 py-1 bg-slate-300 border border-slate-200 rounded-md focus:outline-none"
                      defaultChecked={ThongTinHoSo?.MC_TTHC_GV_ThuTucLienThong}
                      name="MC_TTHC_GV_ThuTucLienThong"
                      id="MC_TTHC_GV_ThuTucLienThong"
                      onChange={(e) => {
                        setEditThongTinChung({
                          ...editThongTinChung,
                          MC_TTHC_GV_ThuTucLienThong: e.target.checked,
                        })
                      }}
                    />
                    <label htmlFor="MC_TTHC_GV_ThuTucLienThong">
                      Thủ tục liên thông
                    </label>
                  </div>
                  {/* END: Thủ tục liên thông */}

                  {/* START: Thủ tục không áp dụng trực tuyến */}
                  <div className="col-span-4 lg:col-span-2 w-full flex items-center gap-4 border px-3 py-1 rounded-md">
                    <input
                      type="checkbox"
                      className="w-4 h-4 px-3 py-1 bg-slate-300 border border-slate-200 rounded-md focus:outline-none"
                      defaultChecked={
                        ThongTinHoSo?.MC_TTHC_GV_ThuTucKhongApDungTrucTuyen
                      }
                      name="MC_TTHC_GV_ThuTucKhongApDungTrucTuyen"
                      id="MC_TTHC_GV_ThuTucKhongApDungTrucTuyen"
                      onChange={(e) => {
                        setEditThongTinChung({
                          ...editThongTinChung,
                          MC_TTHC_GV_ThuTucKhongApDungTrucTuyen:
                            e.target.checked,
                        })
                      }}
                    />
                    <label htmlFor="MC_TTHC_GV_ThuTucKhongApDungTrucTuyen">
                      Thủ tục không áp dụng trực tuyến
                    </label>
                  </div>
                  {/* END: thủ tục không áp dụng trực tuyến */}
                  {/* START: Tệp thủ tục kèm theo */}
                  <div className="col-span-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="MC_TTHC_GV_TepThuTuc_TenFile">
                        <span className="font-semibold">
                          Tệp thủ tục kèm theo
                        </span>{' '}
                        <button
                          className="text-red-600 font-medium hover:opacity-70"
                          onClick={() => {
                            setUpdatetepThuTuc(!updatetepThuTuc)
                            setEditThongTinChung({
                              ...editThongTinChung,
                              MC_TTHC_GV_TepThuTuc_TenFile: '',
                              MC_TTHC_GV_TepThuTuc_DataFileFile: '',
                            })
                          }}
                        >
                          {updatetepThuTuc ? '(Hủy)' : '(Thay đổi)'}
                        </button>
                      </label>
                      {updatetepThuTuc ? (
                        <p className="flex items-center justify-between gap-2 p-2 border">
                          <span
                            className="text-sky-800 font-semibold hover:opacity-70 cursor-pointer"
                            onClick={() => {
                              handlePreviewFileBase64(
                                editThongTinChung?.MC_TTHC_GV_TepThuTuc_TenFile,
                                editThongTinChung?.MC_TTHC_GV_TepThuTuc_DataFileFile,
                              )
                            }}
                          >
                            {editThongTinChung?.MC_TTHC_GV_TepThuTuc_TenFile}
                          </span>
                          <span>
                            <MdDelete
                              className="cursor-pointer hover:text-red-600"
                              onClick={() => {
                                setEditThongTinChung((prevState) => {
                                  return {
                                    ...prevState,
                                    MC_TTHC_GV_TepThuTuc_DataFileFile: null,
                                    MC_TTHC_GV_TepThuTuc_TenFile: null,
                                  }
                                })
                              }}
                            />
                          </span>
                        </p>
                      ) : null}
                      {updatetepThuTuc ? (
                        <>
                          <label
                            htmlFor="MC_TTHC_GV_TepThuTuc"
                            className="block w-full cursor-pointer hover:bg-slate-600 hover:text-white p-2 border border-gray-600 hover:border-gray-600"
                          >
                            <span className="font-semibold p-1 border">
                              Chọn tệp
                            </span>{' '}
                            <span className="text-sm ml-2">
                              Chưa có tệp nào được tải lên
                            </span>
                          </label>
                          <input
                            type="file"
                            className="hidden w-full text-sm text-gray-900 border border-gray-300 p-2 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 hover:bg-sky-800 hover:text-white"
                            onChange={async (e) => {
                              const file = e.target.files[0]
                              const dataFile =
                                await convertDataFileToBase64(file)
                              const maxSizeInBytes = 5 * 1024 * 1024 // 5MB
                              if (
                                !file.name.match(
                                  /\.(pdf|docx|doc|jpeg|jpg|png|gif)$/i,
                                )
                              ) {
                                Swal.fire({
                                  icon: 'error',
                                  title:
                                    'Tệp tải lên không đúng định dạng yêu cầu. Vui lòng kiểm tra lại.',
                                  text: 'Các loại file tải lên phải có dạng PDF, DOC, DOCX, PNG, JPG, JPEG hoặc GIF(Kích thước tối đa 5MB)',
                                })
                                return
                              } else {
                                if (file.size > maxSizeInBytes) {
                                  Swal.fire({
                                    icon: 'error',
                                    title:
                                      'Tệp tải lên vượt quá kích thước cho phép!',
                                    text: 'Kích thước tối đa 5MB.',
                                  })
                                  return
                                } else {
                                  setEditThongTinChung({
                                    ...editThongTinChung,
                                    MC_TTHC_GV_TepThuTuc_TenFile: file.name,
                                    MC_TTHC_GV_TepThuTuc_DataFileFile:
                                      dataFile.split(',')[1],
                                  })
                                }
                              }
                            }}
                            name=""
                            id="MC_TTHC_GV_TepThuTuc"
                          />
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                            Các loại file tải lên phải có dạng{' '}
                            <span className="font-medium">PDF</span>,{' '}
                            <span className="font-medium">DOC</span>,{' '}
                            <span className="font-medium">DOCX</span>,{' '}
                            <span className="font-medium">PNG</span>,{' '}
                            <span className="font-medium">JPG</span>,{' '}
                            <span className="font-medium">JPEG</span> hoặc{' '}
                            <span className="font-medium">GIF</span>
                            <span className="ml-1 font-medium text-red-600">
                              (Kích thước tối đa 5MB)
                            </span>
                          </p>
                        </>
                      ) : null}
                      {ThongTinHoSo?.MC_TTHC_GV_TepThuTuc_TenFile ? (
                        <div className="flex justify-between border p-2">
                          <p>{ThongTinHoSo?.MC_TTHC_GV_TepThuTuc_TenFile}</p>
                          <button
                            type="button"
                            onClick={async () => {
                              const dataFileBase64WithoutPrefix =
                                convertBufferToBase64(
                                  ThongTinHoSo
                                    ?.MC_TTHC_GV_TepThuTuc_DataFileFile?.data,
                                )
                              handlePreviewFileBase64(
                                ThongTinHoSo?.MC_TTHC_GV_TepThuTuc_TenFile,
                                dataFileBase64WithoutPrefix,
                              )
                            }}
                            className="text-red-700 hover:opacity-70 font-semibold"
                          >
                            (Xem chi tiết file)
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {/* END: Tệp thủ tục kèm theo */}
                  {/* START: Đơn vị tiếp nhận */}
                  <div className="col-span-4 lg:col-span-2">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="MC_TTHC_GV_NoiTiepNhan"
                        className="font-semibold"
                      >
                        Đơn vị tiếp nhận{' '}
                        <span className="text-red-600 font-semibold">*</span>
                      </label>
                      <input
                        type="text"
                        className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-slate-400"
                        defaultValue={ThongTinHoSo?.MC_TTHC_GV_NoiTiepNhan}
                        name="MC_TTHC_GV_NoiTiepNhan"
                        id="MC_TTHC_GV_NoiTiepNhan"
                        onChange={(e) => {
                          handleChangeValue(TABS.tabThongTinHoSo, e)
                        }}
                      />
                    </div>
                  </div>
                  {/* END: Đơn vị tiếp nhận */}

                  {/* START: Nơi trả kết quả */}
                  <div className="hidden col-span-4 lg:col-span-2">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="MC_TTHC_GV_NoiTraKetQua"
                        className="font-semibold"
                      >
                        Nơi trả kết quả{' '}
                        <span className="text-red-600 font-semibold">*</span>
                      </label>
                      <input
                        type="text"
                        className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-slate-400"
                        defaultValue={ThongTinHoSo?.MC_TTHC_GV_NoiTraKetQua}
                        name="MC_TTHC_GV_NoiTraKetQua"
                        id="MC_TTHC_GV_NoiTraKetQua"
                        onChange={(e) => {
                          handleChangeValue(TABS.tabThongTinHoSo, e)
                        }}
                      />
                    </div>
                  </div>
                  {/* END: Nơi trả kết quả */}
                </div>
              </div>
              {/* Thành phần hồ sơ */}
              {ThanhPhanHoSo.length ? (
                <div className="TTHC-GV_ThanhPhanHoSoDeNghi mb-4">
                  {/* header */}
                  <div className="flex flex-row items-center lg:justify-between bg-gray-100 shadow-md p-2 rounded-md mb-4">
                    <div className="flex flex-row items-center gap-2 text-sky-700">
                      {showTPHSDeNghi ? (
                        <FaAngleRight
                          onClick={() => {
                            handleShowView(TABS.tabTPHSDeNghi)
                          }}
                          size={20}
                          className="cursor-pointer hover:opacity-70 mt-1 rotate-90"
                        />
                      ) : (
                        <FaAngleRight
                          onClick={() => {
                            handleShowView(TABS.tabTPHSDeNghi)
                          }}
                          size={20}
                          className="cursor-pointer hover:opacity-70 mt-1"
                        />
                      )}
                      <h4 className="text-xl uppercase font-medium">
                        Thành phần hồ sơ đề nghị
                      </h4>
                    </div>
                  </div>
                  {/* content */}
                  <div
                    className={clsx(
                      showTPHSDeNghi ? 'flex flex-col gap-4' : 'hidden',
                    )}
                  >
                    <table className="w-full">
                      <thead className="bg-[#075985] text-white rounded-t-xl">
                        <tr>
                          <th className="border-r px-2 py-1 rounded-tl-xl">
                            STT
                          </th>
                          <th className="border-r px-2 py-1">Tên giấy tờ</th>
                          <th className="border-r px-2 py-1">
                            Mẫu hồ sơ/Hướng dẫn
                          </th>
                          <th className="border-r px-2 py-1">Bản chính</th>
                          <th className="border-r px-2 py-1">Bản sao</th>
                          <th className="border-r px-2 py-1">Bắt buộc</th>
                          <th className="px-2 py-1 rounded-tr-xl"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {ThanhPhanHoSo.map((iThanhPhan, index) => (
                          <tr
                            className="border-b"
                            key={iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_ID}
                          >
                            {editType === TABS.tabTPHSDeNghi &&
                            editRowIndex === index ? (
                              <>
                                <td className="border-r border-l px-2 py-1 text-center">
                                  {index + 1}
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <textarea
                                    type="text"
                                    className="w-full border border-slate-300 rounded-md px-2 focus:outline-slate-300"
                                    placeholder="Nhập tên giấy tờ..."
                                    value={
                                      editValueRow.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo ||
                                      ''
                                    }
                                    name="MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo"
                                    onChange={(e) => {
                                      handleChangeValue(TABS.tabTPHSDeNghi, e)
                                    }}
                                  ></textarea>
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <div className="">
                                    <p className="font-semibold ">
                                      Xem mẫu hồ sơ/hướng dẫn (trước đấy):{' '}
                                      <span
                                        to={
                                          iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenFile
                                        }
                                        target="_blank"
                                        className="text-[#336699] cursor-pointer hover:opacity-70"
                                        onClick={() => {
                                          const dataFileBase64WithoutPrefix =
                                            convertBufferToBase64(
                                              iThanhPhan
                                                .MC_TTHC_GV_ThanhPhanHoSo_DataFile
                                                ?.data,
                                            )
                                          handlePreviewFileBase64(
                                            iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenFile,
                                            dataFileBase64WithoutPrefix,
                                          )
                                        }}
                                      >
                                        {
                                          iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo
                                        }
                                      </span>
                                    </p>
                                    {editValueRow?.MC_TTHC_GV_ThanhPhanHoSo_DataFile ? (
                                      <p className="border p-1 flex items-center justify-between gap-2 my-2">
                                        <span className="text-left">
                                          {
                                            editValueRow?.MC_TTHC_GV_ThanhPhanHoSo_TenFile
                                          }
                                        </span>
                                        <MdDelete
                                          className="hover:text-red-600 cursor-pointer"
                                          onClick={() => {
                                            setEditValueRow({
                                              ...editValueRow,
                                              MC_TTHC_GV_ThanhPhanHoSo_TenFile:
                                                null,
                                              MC_TTHC_GV_ThanhPhanHoSo_DataFile:
                                                null,
                                            })
                                          }}
                                        />
                                      </p>
                                    ) : (
                                      <label
                                        htmlFor="MC_TTHC_GV_ThanhPhanHoSo_TenFile_Update"
                                        className="block my-4 text-left border bg-slate-200 hover:opacity-70 cursor-pointer"
                                      >
                                        <input
                                          type="file"
                                          name="MC_TTHC_GV_ThanhPhanHoSo_TenFile_Update"
                                          id="MC_TTHC_GV_ThanhPhanHoSo_TenFile_Update"
                                          onChange={async (e) => {
                                            const file = e.target.files[0]
                                            const base64String =
                                              await convertDataFileToBase64(
                                                file,
                                              )

                                            const maxSizeInBytes =
                                              5 * 1024 * 1024 // 5MB
                                            if (
                                              !file.name.match(
                                                /\.(pdf|docx|doc|jpeg|jpg|png|gif)$/i,
                                              )
                                            ) {
                                              Swal.fire({
                                                icon: 'error',
                                                title:
                                                  'Tệp tải lên không đúng định dạng yêu cầu. Vui lòng kiểm tra lại.',
                                                text: 'Các loại file tải lên phải có dạng PDF, DOC, DOCX, PNG, JPG, JPEG hoặc GIF(Kích thước tối đa 5MB)',
                                              })
                                              return
                                            } else {
                                              if (file.size > maxSizeInBytes) {
                                                Swal.fire({
                                                  icon: 'error',
                                                  title:
                                                    'Tệp tải lên vượt quá kích thước cho phép!',
                                                  text: 'Kích thước tối đa 5MB.',
                                                })
                                                return
                                              } else {
                                                setEditValueRow({
                                                  ...editValueRow,
                                                  MC_TTHC_GV_ThanhPhanHoSo_TenFile:
                                                    file.name,
                                                  MC_TTHC_GV_ThanhPhanHoSo_DataFile:
                                                    base64String.split(',')[1],
                                                })
                                              }
                                            }
                                          }}
                                        />
                                      </label>
                                    )}

                                    <p className="text-sm text-left text-slate-500">
                                      Các loại file tải lên phải có dạng{' '}
                                      <span className="font-medium">PDF</span>,{' '}
                                      <span className="font-medium">DOC</span>,{' '}
                                      <span className="font-medium">DOCX</span>,{' '}
                                      <span className="font-medium">PNG</span>,{' '}
                                      <span className="font-medium">JPG</span>,{' '}
                                      <span className="font-medium">JPEG</span>{' '}
                                      hoặc{' '}
                                      <span className="font-medium">GIF</span>
                                      <span className="ml-1 font-medium text-red-600">
                                        (Kích thước tối đa 5MB)
                                      </span>
                                    </p>
                                  </div>
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <div className="">
                                    <input
                                      type="number"
                                      className="w-12 border border-slate-200 focus:outline-slate-400"
                                      value={
                                        +editValueRow.MC_TTHC_GV_ThanhPhanHoSo_BanChinh ??
                                        0
                                      }
                                      name="MC_TTHC_GV_ThanhPhanHoSo_BanChinh"
                                      id="MC_TTHC_GV_ThanhPhanHoSo_BanChinh"
                                      onChange={(e) => {
                                        handleChangeValue(TABS.tabTPHSDeNghi, e)
                                      }}
                                    />
                                  </div>
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <div className="">
                                    <input
                                      type="number"
                                      className="w-12 border border-slate-200 focus:outline-slate-400"
                                      value={
                                        +editValueRow.MC_TTHC_GV_ThanhPhanHoSo_BanSao ??
                                        0
                                      }
                                      name="MC_TTHC_GV_ThanhPhanHoSo_BanSao"
                                      id="MC_TTHC_GV_ThanhPhanHoSo_BanSao"
                                      onChange={(e) => {
                                        handleChangeValue(TABS.tabTPHSDeNghi, e)
                                      }}
                                    />
                                  </div>
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <div className="">
                                    <input
                                      type="checkbox"
                                      defaultChecked={
                                        editValueRow.MC_TTHC_GV_ThanhPhanHoSo_BatBuoc
                                      }
                                      name="MC_TTHC_GV_ThanhPhanHoSo_BatBuoc"
                                      id="MC_TTHC_GV_ThanhPhanHoSo_BatBuoc"
                                      onChange={(e) => {
                                        handleChangeValue(TABS.tabTPHSDeNghi, e)
                                      }}
                                    />
                                  </div>
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <div className="flex flex-col items-center justify-center gap-2">
                                    <button
                                      type="button"
                                      className="px-3 py-1 w-full bg-[#336699] text-white hover:opacity-70"
                                      onClick={() =>
                                        handleUpdate(
                                          TABS.tabTPHSDeNghi,
                                          editValueRow,
                                        )
                                      }
                                    >
                                      Lưu
                                    </button>
                                    <button
                                      type="button"
                                      className="px-3 py-1 w-full bg-[#336699] text-white hover:opacity-70"
                                      onClick={handleCancelUpdateRow}
                                    >
                                      Hủy
                                    </button>
                                    <button
                                      type="button"
                                      className="px-3 py-1 w-full bg-[#336699] text-white hover:opacity-70"
                                      onClick={() =>
                                        handleDeleteRow(
                                          TABS.tabTPHSDeNghi,
                                          iThanhPhan,
                                        )
                                      }
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="border-r border-l px-2 py-1 text-center">
                                  {index + 1}
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  {
                                    iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo
                                  }
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  {iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenFile &&
                                  iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_DataFile ? (
                                    <p className="font-semibold ">
                                      Xem mẫu hồ sơ/hướng dẫn:{' '}
                                      <span
                                        onClick={() => {
                                          const dataFileBase64WithoutPrefix =
                                            convertBufferToBase64(
                                              iThanhPhan
                                                .MC_TTHC_GV_ThanhPhanHoSo_DataFile
                                                ?.data,
                                            )
                                          handlePreviewFileBase64(
                                            iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenFile,
                                            dataFileBase64WithoutPrefix,
                                          )
                                        }}
                                        className="text-[#336699] cursor-pointer hover:opacity-70"
                                      >
                                        {
                                          iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenFile
                                        }
                                      </span>
                                    </p>
                                  ) : null}
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <input
                                    type="number"
                                    disabled={true}
                                    className="w-10 text-center"
                                    value={
                                      iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_BanChinh ??
                                      0
                                    }
                                    name=""
                                    id=""
                                  />
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <input
                                    type="number"
                                    disabled={true}
                                    className="w-10 text-center"
                                    value={
                                      iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_BanSao ??
                                      0
                                    }
                                    name=""
                                    id=""
                                  />
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <input
                                    type="checkbox"
                                    disabled={true}
                                    defaultChecked={
                                      iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_BatBuoc
                                    }
                                    name=""
                                    id=""
                                  />
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                                    <button
                                      type="button"
                                      className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                      onClick={() =>
                                        handleEditRow(
                                          index,
                                          TABS.tabTPHSDeNghi,
                                          iThanhPhan,
                                        )
                                      }
                                    >
                                      Sửa
                                    </button>
                                    <button
                                      type="button"
                                      className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                      onClick={() =>
                                        handleDeleteRow(
                                          TABS.tabTPHSDeNghi,
                                          iThanhPhan,
                                        )
                                      }
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
                </div>
              ) : null}
              {/* Trình tự thực hiện */}
              {TrinhTuThucHien.length ? (
                <div className="TTHC-GV_TrinhTuThucHien mb-4">
                  {/* header */}
                  <div className="flex flex-row items-center lg:justify-between bg-gray-100 shadow-md p-2 rounded-md mb-4">
                    <div className="flex flex-row items-center gap-2 text-sky-700">
                      {showTrinhTuThucHien ? (
                        <FaAngleRight
                          onClick={() => {
                            handleShowView(TABS.tabTrinhTuThucHien)
                          }}
                          size={20}
                          className="cursor-pointer hover:opacity-70 mt-1 rotate-90"
                        />
                      ) : (
                        <FaAngleRight
                          onClick={() => {
                            handleShowView(TABS.tabTrinhTuThucHien)
                          }}
                          size={20}
                          className="cursor-pointer hover:opacity-70 mt-1"
                        />
                      )}
                      <h4 className="text-xl uppercase font-medium">
                        Trình tự thực hiện
                      </h4>
                    </div>
                  </div>
                  {/* contents */}
                  <div
                    className={clsx(
                      showTrinhTuThucHien ? 'flex flex-col gap-4' : 'hidden',
                    )}
                  >
                    <div className="max-w-full overflow-x-scroll">
                      <table className="w-full">
                        <thead className="bg-[#075985] text-white rounded-t-xl">
                          <tr>
                            <th className="border-r px-2 py-1 rounded-tl-xl w-[40px]">
                              <p className=" w-[40px]">Bước</p>
                            </th>
                            <th className="border-r px-2 py-1">
                              <p className="w-[100px]">Tên công việc</p>
                            </th>
                            <th className="border-r px-2 py-1">
                              <p className="w-[120px]">Cách thức thực hiện</p>
                            </th>
                            <th className="border-r px-2 py-1">
                              Địa chỉ nhận/trả hồ sơ
                            </th>
                            <th className="border-r px-2 py-1">
                              Đơn vị thực hiện
                            </th>
                            <th className="border-r px-2 py-1">
                              Đơn vị phối hợp
                            </th>
                            <th className="border-r px-2 py-1">
                              <p className="w-[120px]">Thời gian thực hiện</p>
                            </th>
                            <th className="border-r px-2 py-1">
                              <p className="w-[140px]">Kết quả</p>
                            </th>
                            <th className="px-2 py-1 rounded-tr-xl"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {TrinhTuThucHien?.map((iTrinhTu, index) => {
                            let listKetQuaTrinhTu =
                              iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_KetQua?.split(
                                /[-+]/,
                              ).filter((item) => item.trim() !== '')
                            return (
                              <tr
                                className="border-b"
                                key={iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_ID}
                              >
                                {editType === TABS.tabTrinhTuThucHien &&
                                editRowIndex === index ? (
                                  <>
                                    <td className="border-r border-l px-2 py-1 text-center">
                                      {index + 1}
                                    </td>
                                    <td className="border-r px-2 py-1 text-left">
                                      <div className="">
                                        <DebounceInput
                                          className="block border-2 border-slate-400 px-3 py-2 focus:outline-slate-400"
                                          minLength={2}
                                          debounceTimeout={300}
                                          value={
                                            iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_TenCongViec
                                          }
                                          name="MC_TTHC_GV_TrinhTuThucHien_TenCongViec"
                                          onChange={(e) => {
                                            handleChangeValue(
                                              TABS.tabTrinhTuThucHien,
                                              e,
                                            )
                                          }}
                                        />
                                      </div>
                                    </td>
                                    <td className="border-r px-2 py-1 text-left">
                                      <div className="">
                                        <DebounceInput
                                          element={'textarea'}
                                          className="block w-full max-h-full border-2 border-slate-400 px-3 py-2 focus:outline-slate-400"
                                          style={{
                                            minHeight: '200px',
                                          }}
                                          minLength={2}
                                          debounceTimeout={300}
                                          value={
                                            iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_CachThucThucHien
                                          }
                                          name="MC_TTHC_GV_TrinhTuThucHien_CachThucThucHien"
                                          onChange={(e) => {
                                            handleChangeValue(
                                              TABS.tabTrinhTuThucHien,
                                              e,
                                            )
                                          }}
                                        />
                                      </div>
                                    </td>
                                    <td className="border-r px-2 py-1 text-left">
                                      <div className="">
                                        <DebounceInput
                                          className="block border-2 border-slate-400 px-3 py-2 focus:outline-slate-400"
                                          minLength={2}
                                          debounceTimeout={300}
                                          value={
                                            iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra
                                          }
                                          name="MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra"
                                          onChange={(e) => {
                                            handleChangeValue(
                                              TABS.tabTrinhTuThucHien,
                                              e,
                                            )
                                          }}
                                        />
                                      </div>
                                    </td>
                                    <td className="border-r px-2 py-1 text-left">
                                      <div className="">
                                        <DebounceInput
                                          className="block border-2 border-slate-400 px-3 py-2 focus:outline-slate-400"
                                          minLength={2}
                                          debounceTimeout={300}
                                          value={
                                            iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_DonViThucHien
                                          }
                                          name="MC_TTHC_GV_TrinhTuThucHien_DonViThucHien"
                                          onChange={(e) => {
                                            handleChangeValue(
                                              TABS.tabTrinhTuThucHien,
                                              e,
                                            )
                                          }}
                                        />
                                      </div>
                                    </td>
                                    <td className="border-r px-2 py-1 text-center">
                                      <div className="">
                                        <DebounceInput
                                          className="block border-2 border-slate-400 px-3 py-2 focus:outline-slate-400"
                                          minLength={2}
                                          debounceTimeout={300}
                                          value={
                                            iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop
                                          }
                                          name="MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop"
                                          onChange={(e) => {
                                            handleChangeValue(
                                              TABS.tabTrinhTuThucHien,
                                              e,
                                            )
                                          }}
                                        />
                                      </div>
                                    </td>
                                    <td className="border-r px-2 py-1 text-center">
                                      <div className="">
                                        <DebounceInput
                                          type={'number'}
                                          className="block w-full border-2 border-slate-400 px-3 py-2 focus:outline-slate-400"
                                          min={0}
                                          step={0.1}
                                          value={
                                            iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay
                                          }
                                          name="MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay"
                                          onChange={(e) => {
                                            handleChangeValue(
                                              TABS.tabTrinhTuThucHien,
                                              e,
                                            )
                                          }}
                                        />
                                      </div>
                                    </td>
                                    <td className="border-r px-2 py-1 text-left">
                                      <div className="">
                                        <DebounceInput
                                          element={'textarea'}
                                          className="block w-full border-2 border-slate-400 px-3 py-2 focus:outline-slate-400"
                                          style={{
                                            minHeight: '200px',
                                          }}
                                          minLength={2}
                                          debounceTimeout={300}
                                          value={
                                            iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_KetQua
                                          }
                                          name="MC_TTHC_GV_TrinhTuThucHien_KetQua"
                                          onChange={(e) => {
                                            handleChangeValue(
                                              TABS.tabTrinhTuThucHien,
                                              e,
                                            )
                                          }}
                                        />
                                      </div>
                                    </td>
                                    <td className="border-r px-2 py-1 text-center">
                                      <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                                        <button
                                          type="button"
                                          className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                          onClick={() =>
                                            handleUpdate(
                                              TABS.tabTrinhTuThucHien,
                                              editValueRow,
                                            )
                                          }
                                        >
                                          Lưu
                                        </button>
                                        <button
                                          type="button"
                                          className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                          onClick={handleCancelUpdateRow}
                                        >
                                          Hủy
                                        </button>
                                        <button
                                          type="button"
                                          className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                          onClick={() =>
                                            handleDeleteRow(
                                              TABS.tabTrinhTuThucHien,
                                              iTrinhTu,
                                            )
                                          }
                                        >
                                          Xóa
                                        </button>
                                      </div>
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="border-r border-l px-2 py-1 text-center">
                                      {index + 1}
                                    </td>
                                    <td className="border-r px-2 py-1 text-left">
                                      {
                                        iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_TenCongViec
                                      }
                                    </td>
                                    <td className="border-r px-2 py-1 text-left">
                                      {
                                        iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_CachThucThucHien
                                      }
                                    </td>
                                    <td className="border-r px-2 py-1 text-left">
                                      {
                                        iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra
                                      }
                                    </td>
                                    <td className="border-r px-2 py-1 text-left">
                                      {
                                        iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_DonViThucHien
                                      }
                                    </td>
                                    <td className="border-r px-2 py-1 text-center">
                                      {
                                        iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop
                                      }
                                    </td>
                                    <td className="border-r px-2 py-1 text-center">
                                      {
                                        iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay
                                      }
                                    </td>
                                    <td className="border-r px-2 py-1 text-left">
                                      {
                                        <div className="w-full">
                                          {listKetQuaTrinhTu?.map(
                                            (item, index) => (
                                              <p key={index}>
                                                {'- ' + item.trim()}
                                              </p>
                                            ),
                                          )}
                                        </div>
                                      }
                                    </td>
                                    <td className="border-r px-2 py-1 text-center">
                                      <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                                        <button
                                          type="button"
                                          className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                          onClick={() =>
                                            handleEditRow(
                                              index,
                                              TABS.tabTrinhTuThucHien,
                                              iTrinhTu,
                                            )
                                          }
                                        >
                                          Sửa
                                        </button>
                                        <button
                                          type="button"
                                          className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                          onClick={() =>
                                            handleDeleteRow(
                                              TABS.tabTrinhTuThucHien,
                                              iTrinhTu,
                                            )
                                          }
                                        >
                                          Xóa
                                        </button>
                                      </div>
                                    </td>
                                  </>
                                )}
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : null}
              {/* Phân quyền */}
              {PhanQuyen.length ? (
                <div className="TTHC-GV_PhanQuyen mb-4">
                  {/* header */}
                  <div className="flex flex-row items-center lg:justify-between bg-gray-100 shadow-md p-2 rounded-md mb-4">
                    <div className="flex flex-row items-center gap-2 text-sky-700">
                      {showPhanQuyen ? (
                        <FaAngleRight
                          onClick={() => {
                            handleShowView(TABS.tabPhanQuyen)
                          }}
                          size={20}
                          className="cursor-pointer hover:opacity-70 mt-1 rotate-90"
                        />
                      ) : (
                        <FaAngleRight
                          onClick={() => {
                            handleShowView(TABS.tabPhanQuyen)
                          }}
                          size={20}
                          className="cursor-pointer hover:opacity-70 mt-1"
                        />
                      )}
                      <h4 className="text-xl uppercase font-medium">
                        Phân quyền
                      </h4>
                    </div>
                  </div>
                  {/* contents */}

                  <div
                    className={clsx(
                      showPhanQuyen
                        ? 'flex flex-col gap-4 overflow-x-auto'
                        : 'hidden',
                    )}
                  >
                    <div className="">
                      <button
                        onClick={() => {
                          setShowEditPhanQuyen(true)
                        }}
                        className="px-3 py-2 bg-sky-800 text-white hover:opacity-70 rounded-md"
                      >
                        Thêm phân quyền mới
                      </button>

                      {showEditPhanQuyen ? (
                        <EditPhanQuyenThuTuc
                          idTTHCGoc={ThongTinHoSo?.MC_TTHC_GV_ID}
                          onLoading={setLoading}
                          onGetDataDetailHoSoThuTuc={getDataDetailHoSoThuTuc}
                          onShowEditPhanQuyen={setShowEditPhanQuyen}
                        />
                      ) : null}
                    </div>
                    <table className="w-full">
                      <thead className="bg-[#075985] text-white rounded-t-xl">
                        <tr>
                          <th className="border-r px-2 py-1 rounded-tl-xl">
                            STT
                          </th>
                          <th className="border-r px-2 py-1">Mã nhân sự</th>
                          <th className="border-r px-2 py-1">Họ và tên</th>
                          <th className="border-r px-2 py-1">Đơn vị</th>
                          <th className="border-r px-2 py-1">Tổ</th>
                          <th className="border-r px-2 py-1">Nhóm</th>
                          <th className="px-2 py-1 rounded-tr-xl"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {PhanQuyen.map((iPhanQuyen, index) => (
                          <tr
                            className="border-b"
                            key={iPhanQuyen.MC_TTHC_GV_PhanQuyen_ID}
                          >
                            <td className="border-r border-l px-2 py-1 text-center">
                              {index + 1}
                            </td>
                            <td className="border-r px-2 py-1 text-center">
                              {iPhanQuyen.MC_TTHC_GV_PhanQuyen_MaNhanSu}
                            </td>
                            <td className="border-r px-2 py-1 text-center">
                              {iPhanQuyen.MC_TTHC_GV_PhanQuyen_HoTen}
                            </td>
                            <td className="border-r px-2 py-1 text-center">
                              {iPhanQuyen.MC_TTHC_GV_PhanQuyen_DonVi}
                            </td>
                            <td className="border-r px-2 py-1 text-center">
                              {iPhanQuyen.MC_TTHC_GV_PhanQuyen_To}
                            </td>
                            <td className="border-r px-2 py-1 text-center">
                              {iPhanQuyen.MC_TTHC_GV_PhanQuyen_Nhom}
                            </td>
                            <td className="border-r px-2 py-1 text-center">
                              <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                                <button
                                  type="button"
                                  className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                  onClick={() =>
                                    handleDeleteRow(
                                      TABS.tabPhanQuyen,
                                      iPhanQuyen,
                                    )
                                  }
                                >
                                  Xóa
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="">
                  <button
                    onClick={() => {
                      setShowEditPhanQuyen(true)
                    }}
                    className="px-3 py-2 bg-sky-800 text-white hover:opacity-70 rounded-md"
                  >
                    Thêm phân quyền mới
                  </button>
                  {showEditPhanQuyen ? (
                    <EditPhanQuyenThuTuc
                      idTTHCGoc={ThongTinHoSo?.MC_TTHC_GV_ID}
                      onLoading={setLoading}
                      onGetDataDetailHoSoThuTuc={getDataDetailHoSoThuTuc}
                      onShowEditPhanQuyen={setShowEditPhanQuyen}
                    />
                  ) : null}
                </div>
              )}
              {/* Trạng thái */}
              {TrangThai.length ? (
                <div className="TTHC-GV_TrangThai mb-4">
                  {/* header */}
                  <div className="flex flex-row items-center lg:justify-between bg-gray-100 shadow-md p-2 rounded-md mb-4">
                    <div className="flex flex-row items-center gap-2 text-sky-700">
                      {showTrangThai ? (
                        <FaAngleRight
                          onClick={() => {
                            handleShowView(TABS.tabTrangThai)
                          }}
                          size={20}
                          className="cursor-pointer hover:opacity-70 mt-1 rotate-90"
                        />
                      ) : (
                        <FaAngleRight
                          onClick={() => {
                            handleShowView(TABS.tabTrangThai)
                          }}
                          size={20}
                          className="cursor-pointer hover:opacity-70 mt-1"
                        />
                      )}
                      <h4 className="text-xl uppercase font-medium">
                        Trạng thái
                      </h4>
                    </div>
                  </div>
                  {/* contents */}
                  <div
                    className={clsx(
                      showTrangThai ? 'flex flex-col gap-4' : 'hidden',
                    )}
                  >
                    <table className="w-full">
                      <thead className="bg-[#075985] text-white rounded-t-xl">
                        <tr>
                          <th className="border-r px-2 py-1 rounded-tl-xl">
                            STT
                          </th>
                          <th className="border-r px-2 py-1">Tên trạng thái</th>
                          <th className="border-r px-2 py-1">Mô tả</th>
                          <th className="px-2 py-1 rounded-tr-xl"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {TrangThai.map((iTrangThai, index) => (
                          <tr
                            className="border-b"
                            key={iTrangThai.MC_TTHC_GV_TrangThai_ID}
                          >
                            {editType === TABS.tabTrangThai &&
                            editRowIndex === index ? (
                              <>
                                <td className="border-r border-l px-2 py-1 text-center">
                                  {index + 1}
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <div className="">
                                    <input
                                      type="text"
                                      className="w-full focus:outline-slate-400 px-3 py-2 border-2 border-gray-400 bg-gray-50"
                                      value={
                                        editValueRow.MC_TTHC_GV_TrangThai_TenTrangThai ||
                                        ''
                                      }
                                      name="MC_TTHC_GV_TrangThai_TenTrangThai"
                                      id="MC_TTHC_GV_TrangThai_TenTrangThai"
                                      onChange={(e) => {
                                        handleChangeValue(TABS.tabTrangThai, e)
                                      }}
                                    />
                                  </div>
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <div className="">
                                    <input
                                      type="text"
                                      className="w-full focus:outline-slate-400 px-3 py-2 border-2 border-gray-400 bg-gray-50"
                                      value={
                                        editValueRow.MC_TTHC_GV_TrangThai_MoTa ||
                                        ''
                                      }
                                      name="MC_TTHC_GV_TrangThai_MoTa"
                                      id="MC_TTHC_GV_TrangThai_MoTa"
                                      onChange={(e) => {
                                        handleChangeValue(TABS.tabTrangThai, e)
                                      }}
                                    />
                                  </div>
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                                    <button
                                      type="button"
                                      className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                      onClick={() =>
                                        handleUpdate(
                                          TABS.tabTrangThai,
                                          editValueRow,
                                        )
                                      }
                                    >
                                      Lưu
                                    </button>
                                    <button
                                      type="button"
                                      className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                      onClick={handleCancelUpdateRow}
                                    >
                                      Hủy
                                    </button>
                                    <button
                                      type="button"
                                      className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                      onClick={() =>
                                        handleDeleteRow(
                                          TABS.tabTrangThai,
                                          iTrangThai,
                                        )
                                      }
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="border-r border-l px-2 py-1 text-center">
                                  {index + 1}
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  {iTrangThai.MC_TTHC_GV_TrangThai_TenTrangThai}
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  {iTrangThai.MC_TTHC_GV_TrangThai_MoTa}
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                                    <button
                                      type="button"
                                      className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                      onClick={() =>
                                        handleEditRow(
                                          index,
                                          TABS.tabTrangThai,
                                          iTrangThai,
                                        )
                                      }
                                    >
                                      Sửa
                                    </button>
                                    <button
                                      type="button"
                                      className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                      onClick={() =>
                                        handleDeleteRow(
                                          TABS.tabTrangThai,
                                          iTrangThai,
                                        )
                                      }
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
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ThongTinChiTietHoSo
