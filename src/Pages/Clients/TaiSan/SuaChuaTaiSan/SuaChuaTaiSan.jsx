import { useEffect, useState } from 'react'
import SuaChuaTaiSanView from './SuaChuaTaiSanView'
import {
  getDanhSachBaoHong,
  putNgayXuLyYeuCauBaoHong,
} from '@/Apis/HoTroThietBi/apiTaiSan'
import Swal from 'sweetalert2'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'

const SuaChuaTaiSan = () => {
  const [loading, setLoading] = useState(true)
  const initialItemPerPage = 5
  const [listBaoHong, setListBaoHong] = useState([])
  const [itemPerPage, setItemPerPage] = useState(initialItemPerPage)
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState([])
  const [zoom, setZoom] = useState(false)
  const [filters, setFilters] = useState({
    DT_QLTS_TS_HoTroThietBi_BaoHong_MaTaiSan: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_CoSo: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_DiaDiem: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_ToaNha: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_Tang: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhong: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_HoTen: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhongBan: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_SoDienThoai: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_HoTen: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_TenPhongBan: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_SoDienThoai: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy: '',
  })

  const dataCBGV = DataCanBoGV()
  // event handlers

  const handleChangeValueFilter = (e) => {
    const { id, value } = e.target
    setFilters((prevData) => {
      return { ...prevData, [id]: value }
    })
  }

  const handleUpdateItemSelected = (obj, updateData) => {
    const updatedArr = selected?.map((item) => {
      if (item.DT_QLTS_TS_HoTroThietBi_ID === obj.DT_QLTS_TS_HoTroThietBi_ID) {
        // Chỉ cập nhật thuộc tính tương ứng nếu khớp
        return {
          ...item,
          ...updateData,
          DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu: dataCBGV.MaNhanSu,
          DT_QLTS_TS_HoTroThietBi_XuLy_HoTen:
            dataCBGV.HoDem + ' ' + dataCBGV.Ten,
          DT_QLTS_TS_HoTroThietBi_XuLy_SoDienThoai: dataCBGV.SoDienThoai,
          DT_QLTS_TS_HoTroThietBi_XuLy_TenPhongBan: dataCBGV.HienTaiPhongBan,
        }
      }
      return item
    })
    setSelected(updatedArr)
  }

  const handleConfirmNgayXuLy = async () => {
    if (selected.length === 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn ít nhất 1 yêu cầu để xử lý!',
      })
    }
    let hasError = false // Biến để kiểm tra xem có lỗi nào không
    // let hasAlreadyProcessed = false // Biến để kiểm tra xem đã xử lý trước đó chưa
    try {
      const fetchListUpdate = selected.map((obj) => {
        if (!obj.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy) {
          hasError = true
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Vui lòng nhập ngày xử lý!',
          })
          return Promise.resolve()
        }

        const shouldConfirmEmail =
          obj.DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail === null ||
          obj.DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail === false ||
          obj.DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail === undefined

        if (shouldConfirmEmail) {
          return Swal.fire({
            icon: 'question',
            title: 'Bạn muốn xác nhận xử lý mà không gửi email thông báo?',
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Đồng ý',
          }).then((result) => {
            if (result.isConfirmed) {
              const data = {
                DT_QLTS_TS_HoTroThietBi_ID:
                  obj.DT_QLTS_TS_HoTroThietBi_ID.toString(),
                DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu: dataCBGV.MaNhanSu,
                DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy:
                  obj.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy,
                DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail:
                  obj.DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail,
              }

              return putNgayXuLyYeuCauBaoHong(data).then(() => {
                getListBaoHongTS()
                setSelected([])
                Swal.fire({
                  icon: 'success',
                  title: 'Đã xác nhận xử lý yêu cầu báo hỏng thành công!',
                })
              })
            }
          })
        } else {
          // Nếu không cần xác nhận gửi email, thực hiện trực tiếp mà không hiển thị Swal.fire
          const data = {
            DT_QLTS_TS_HoTroThietBi_ID:
              obj.DT_QLTS_TS_HoTroThietBi_ID.toString(),
            DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu: dataCBGV.MaNhanSu,
            DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy:
              obj.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy,
            DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail:
              obj.DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail,
          }

          return putNgayXuLyYeuCauBaoHong(data)
        }
      })

      if (!hasError) {
        await Promise.all(fetchListUpdate)
        getListBaoHongTS()
        setSelected([])
      }
    } catch (error) {
      console.error('Error fetching data:', error.message)
    }
  }

  const handleClearFilter = () => {
    setFilters({
      DT_QLTS_TS_HoTroThietBi_BaoHong_MaTaiSan: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_CoSo: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_DiaDiem: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_ToaNha: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_Tang: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhong: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_HoTen: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhongBan: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_SoDienThoai: '',
      DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu: '',
      DT_QLTS_TS_HoTroThietBi_XuLy_HoTen: '',
      DT_QLTS_TS_HoTroThietBi_XuLy_TenPhongBan: '',
      DT_QLTS_TS_HoTroThietBi_XuLy_SoDienThoai: '',
      DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy: '',
    })
  }

  // fetach data
  const getListBaoHongTS = async () => {
    setLoading(true)
    getDanhSachBaoHong()
      .then((res) => {
        setLoading(false)
        setListBaoHong(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // effect
  useEffect(() => {
    getListBaoHongTS()
  }, [])

  return (
    <SuaChuaTaiSanView
      audio={audio}
      loading={loading}
      page={page}
      onSetPage={setPage}
      itemPerPage={itemPerPage}
      onSetItemPerPage={setItemPerPage}
      listBaoHong={listBaoHong}
      zoom={zoom}
      filters={filters}
      onZoom={setZoom}
      selected={selected}
      onSelected={setSelected}
      onConfirmNgayXuLy={handleConfirmNgayXuLy}
      onUpdateNgayXuLy={handleUpdateItemSelected}
      onChangeValueFilter={handleChangeValueFilter}
      onClearFilter={handleClearFilter}
    />
  )
}

export default SuaChuaTaiSan
