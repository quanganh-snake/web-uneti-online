import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Checkbox,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'

import moment from 'moment'
import Loading from '@/Components/Loading/Loading'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import Swal from 'sweetalert2'
import { DebounceInput } from 'react-debounce-input'
import { filterData } from '@/Services/Utils/filterData'
import {
  deleteYeuCauBaoHongTaiSan,
  getDanhSachBaoHong,
} from '@/Apis/HoTroThietBi/apiTaiSan'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'

const ThongKeBaoHong = () => {
  // VARIABLES
  const initialItemPerPage = 10
  const [itemPerPage, setItemPerPage] = useState(initialItemPerPage)
  const [currentPage, setCurrentPage] = useState(0)

  const [dataSelect, setDataSelect] = useState('all')
  const [loading, setLoading] = useState(true)
  const [listBaoHong, setListBaoHong] = useState([])
  const [selected, setSelected] = useState([])
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
  const dataSV = DataSinhVien()
  const dataMaNhanSu = dataCBGV?.MaNhanSu ?? dataSV?.MaSinhVien
  // MUI TABLE
  const isSelected = (row) =>
    selected?.some(
      (item) =>
        item.DT_QLTS_TS_HoTroThietBi_ID === row.DT_QLTS_TS_HoTroThietBi_ID,
    ) !== false
  const totalPage = useMemo(() => {
    return Math.ceil(listBaoHong?.length / itemPerPage)
  }, [listBaoHong])
  const filteredBaoHong = filterData(listBaoHong, filters)

  const postsShow = useMemo(() => {
    return filteredBaoHong?.slice(
      itemPerPage * currentPage,
      itemPerPage * currentPage + itemPerPage,
    )
  }, [filteredBaoHong, itemPerPage, currentPage])

  // fetch data
  const getListBaoHong = (maNhanSu = '') => {
    getDanhSachBaoHong(maNhanSu).then((res) => {
      setLoading(false)
      setListBaoHong(res)
      setCurrentPage(0)
    })
  }

  // event handlers
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setItemPerPage(parseInt(event.target.value, 10))
    setCurrentPage(0)
  }
  const handleClick = (event, row) => {
    const selectedIndex = selected.some(
      (item) =>
        item.DT_QLTS_TS_HoTroThietBi_ID === row.DT_QLTS_TS_HoTroThietBi_ID,
    )
    let newSelected = []
    if (selectedIndex === false && row.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy) {
      return Swal.fire({
        icon: 'warning',
        title: 'Lỗi',
        text: 'Yêu cầu báo hỏng đã được xác nhận ngày xử lý!',
      })
    }

    if (selectedIndex === false && !row.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy) {
      newSelected = newSelected.concat(selected, row)
    } else if (selectedIndex === true) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    }
    setSelected(newSelected)
  }
  const handleChangeValueFilter = (e) => {
    const { id, value } = e.target
    setFilters((prevData) => {
      return { ...prevData, [id]: value }
    })
  }
  const handleChangeDataSelect = (e) => {
    const { id, value } = e.target
    if (id === 'filter-data') {
      setDataSelect(value)
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

  const handleDeleteRequest = async () => {
    if (selected.length < 1) {
      return Swal.fire({
        icon: 'error',
        title: 'Vui lòng chọn ít nhất 1 yêu cầu cần xóa!',
      })
    }

    const yeuCauCuaNguoiKhac = selected.filter(
      (item) => item.DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu !== dataMaNhanSu,
    )

    const yeuCauCuaToi = selected.filter(
      (item) => item.DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu === dataMaNhanSu,
    )

    if (yeuCauCuaNguoiKhac.length > 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Vui lòng không chọn yêu cầu của người khác để xóa!',
      })
    }

    if (yeuCauCuaToi.length > 0) {
      let hasError = false
      try {
        const deleteYeuCauCuaToi = yeuCauCuaToi.map((item) => {
          if (item.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy) {
            hasError = true
            Swal.fire({
              icon: 'error',
              title: 'Lỗi',
              text: 'Yêu cầu của bạn đã được xác nhận xử lý. Không thể xóa yêu cầu này!',
            })
            return Promise.resolve()
          }
          return deleteYeuCauBaoHongTaiSan(
            item.DT_QLTS_TS_HoTroThietBi_ID,
          ).then(() => {
            getListBaoHong()
            setSelected([])
            Swal.fire({
              icon: 'success',
              title: 'Đã xóa yêu cầu báo hỏng thành công!',
            })
          })
        })
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  // Table Head MUI
  function EnhancedTableHead(props) {
    const { numSelected, rowCount } = props
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property)
    }

    return (
      <TableHead sx={{ backgroundColor: '#336699' }}>
        <TableRow>
          <TableCell
            align="center"
            sx={{
              fontWeight: '700',
              textTransform: 'uppercase',
              color: '#ffffff',
              borderRight: '1px solid #ccc',
            }}
          >
            STT
          </TableCell>
          <TableCell
            align="center"
            sx={{
              fontWeight: '700',
              textTransform: 'uppercase',
              color: '#ffffff',
              borderRight: '1px solid #ccc',
            }}
          >
            Chọn
          </TableCell>
          <TableCell
            align="center"
            colSpan={7}
            sx={{
              fontWeight: '700',
              textTransform: 'uppercase',
              color: '#ffffff',
              borderRight: '1px solid #ccc',
            }}
          >
            Thông tin tài sản
          </TableCell>
          <TableCell
            align="center"
            colSpan={3}
            sx={{
              fontWeight: '700',
              textTransform: 'uppercase',
              color: '#ffffff',
              borderRight: '1px solid #ccc',
            }}
          >
            Nội dung báo hỏng
          </TableCell>
          <TableCell
            align="center"
            colSpan={4}
            sx={{
              fontWeight: '700',
              textTransform: 'uppercase',
              color: '#ffffff',
              borderRight: '1px solid #ccc',
            }}
          >
            Thông tin người báo hỏng
          </TableCell>
          <TableCell
            align="center"
            colSpan={5}
            sx={{
              fontWeight: '700',
              textTransform: 'uppercase',
              color: '#ffffff',
            }}
          >
            Thông tin người xử lý
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            align="center"
            sx={{ color: '#ffffff', borderRight: '1px solid #ccc' }}
          >
            #
          </TableCell>
          <TableCell
            align="center"
            padding="checkbox"
            sx={{ color: '#ffffff', borderRight: '1px solid #ccc' }}
          >
            ##
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff' }}
          >
            Mã tài sản
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff' }}
          >
            Tên tài sản
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff' }}
          >
            Cơ sở
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff' }}
          >
            Địa điểm
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff' }}
          >
            Tòa nhà
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff' }}
          >
            Tầng
          </TableCell>
          <TableCell
            align="center"
            sx={{
              whiteSpace: 'nowrap',
              color: '#ffffff',
              borderRight: '1px solid #ccc',
            }}
          >
            Phòng
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff' }}
          >
            Tên sự cố
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff' }}
          >
            Mô tả sự cố
          </TableCell>
          <TableCell
            align="center"
            sx={{
              whiteSpace: 'nowrap',
              color: '#ffffff',
              borderRight: '1px solid #ccc',
            }}
          >
            Ngày báo hỏng
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff' }}
          >
            Mã nhân sự
            <hr />
            Mã sinh viên
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff' }}
          >
            Họ và tên
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff' }}
          >
            Phòng ban <hr /> Khoa
          </TableCell>
          <TableCell
            align="center"
            sx={{
              whiteSpace: 'nowrap',
              color: '#ffffff',
              borderRight: '1px solid #ccc',
            }}
          >
            Số điện thoại
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff' }}
          >
            Mã nhân sự
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff' }}
          >
            Họ và tên
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff' }}
          >
            Phòng ban <hr /> Khoa
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff' }}
          >
            Số điện thoại
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff' }}
          >
            Ngày xử lý
          </TableCell>
        </TableRow>
        <TableRow sx={{ backgroundColor: '#ffffff' }}>
          <TableCell
            align="center"
            sx={{ color: '#ccc', borderRight: '1px solid #ccc' }}
          >
            #
          </TableCell>
          <TableCell
            align="center"
            sx={{ color: '#ccc', borderRight: '1px solid #ccc' }}
          >
            <button
              type="button"
              onClick={() => {
                handleClearFilter()
              }}
              className="text-red whitespace-nowrap rounded-lg border border-red-600 bg-white px-3 py-2 font-bold text-red-600 hover:bg-red-100"
            >
              Xóa lọc
            </button>
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ccc', minWidth: '140px' }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200"
              id="DT_QLTS_TS_HoTroThietBi_BaoHong_MaTaiSan"
              minLength={0}
              debounceTimeout={1000}
              value={
                filters.DT_QLTS_TS_HoTroThietBi_BaoHong_MaTaiSan
                  ? filters.DT_QLTS_TS_HoTroThietBi_BaoHong_MaTaiSan
                  : ''
              }
              onChange={handleChangeValueFilter}
              placeholder="Tìm mã tài sản"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#333', minWidth: '140px' }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200"
              id="DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan"
              minLength={0}
              debounceTimeout={200}
              value={filters.DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan}
              onChange={handleChangeValueFilter}
              placeholder="Tìm tên tài sản"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#333', minWidth: '120px' }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200"
              id="DT_QLTS_TS_HoTroThietBi_BaoHong_CoSo"
              minLength={0}
              debounceTimeout={1000}
              value={
                filters.DT_QLTS_TS_HoTroThietBi_BaoHong_CoSo
                  ? filters.DT_QLTS_TS_HoTroThietBi_BaoHong_CoSo
                  : ''
              }
              onChange={handleChangeValueFilter}
              placeholder="Tìm cơ sở"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#333', minWidth: '140px' }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200"
              id="DT_QLTS_TS_HoTroThietBi_BaoHong_DiaDiem"
              minLength={0}
              debounceTimeout={1000}
              value={
                filters.DT_QLTS_TS_HoTroThietBi_BaoHong_DiaDiem
                  ? filters.DT_QLTS_TS_HoTroThietBi_BaoHong_DiaDiem
                  : ''
              }
              onChange={handleChangeValueFilter}
              placeholder="Tìm địa điểm"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff', minWidth: '120px' }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200"
              id="DT_QLTS_TS_HoTroThietBi_BaoHong_ToaNha"
              minLength={0}
              debounceTimeout={1000}
              value={
                filters.DT_QLTS_TS_HoTroThietBi_BaoHong_ToaNha
                  ? filters.DT_QLTS_TS_HoTroThietBi_BaoHong_ToaNha
                  : ''
              }
              onChange={handleChangeValueFilter}
              placeholder="Tìm tòa nhà"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ccc', minWidth: '120px' }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200"
              id="DT_QLTS_TS_HoTroThietBi_BaoHong_Tang"
              minLength={0}
              debounceTimeout={1000}
              value={
                filters.DT_QLTS_TS_HoTroThietBi_BaoHong_Tang
                  ? filters.DT_QLTS_TS_HoTroThietBi_BaoHong_Tang
                  : ''
              }
              onChange={handleChangeValueFilter}
              placeholder="Tìm tầng"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{
              whiteSpace: 'nowrap',
              color: '#ccc',
              borderRight: '1px solid #ccc',
            }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200"
              id="DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhong"
              minLength={0}
              debounceTimeout={1000}
              value={
                filters.DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhong
                  ? filters.DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhong
                  : ''
              }
              onChange={handleChangeValueFilter}
              placeholder="Tìm phòng"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff' }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200"
              id="DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo"
              minLength={0}
              debounceTimeout={1000}
              value={
                filters.DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo
                  ? filters.DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo
                  : ''
              }
              onChange={handleChangeValueFilter}
              placeholder="Tìm tên sự cố"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff' }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200"
              id="DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa"
              minLength={0}
              debounceTimeout={1000}
              value={
                filters.DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa
                  ? filters.DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa
                  : ''
              }
              onChange={handleChangeValueFilter}
              placeholder="Tìm mô tả sự cố"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{
              whiteSpace: 'nowrap',
              color: '#333',
              borderRight: '1px solid #ccc',
            }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200"
              id="DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui"
              type="date"
              minLength={0}
              debounceTimeout={1000}
              value={
                filters.DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui
                  ? filters.DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui
                  : ''
              }
              onChange={handleChangeValueFilter}
              placeholder="Tìm ngày báo hỏng"
            />
          </TableCell>
          {/* End: Nội dung báo hỏng */}
          {/* Start: Thông tin người báo hỏng */}
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff', minWidth: '120px' }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200"
              id="DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu"
              minLength={0}
              debounceTimeout={1000}
              value={
                filters.DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu
                  ? filters.DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu
                  : ''
              }
              onChange={handleChangeValueFilter}
              placeholder="Tìm MNS báo hỏng"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff', minWidth: '120px' }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200"
              id="DT_QLTS_TS_HoTroThietBi_BaoHong_HoTen"
              minLength={0}
              debounceTimeout={1000}
              value={
                filters.DT_QLTS_TS_HoTroThietBi_BaoHong_HoTen
                  ? filters.DT_QLTS_TS_HoTroThietBi_BaoHong_HoTen
                  : ''
              }
              onChange={handleChangeValueFilter}
              placeholder="Tìm tên nhân sự báo hỏng"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff', minWidth: '120px' }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200"
              id="DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhongBan"
              minLength={0}
              debounceTimeout={1000}
              value={
                filters.DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhongBan
                  ? filters.DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhongBan
                  : ''
              }
              onChange={handleChangeValueFilter}
              placeholder="Tìm tên phòng ban"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{
              whiteSpace: 'nowrap',
              color: '#ffffff',
              borderRight: '1px solid #ccc',
              minWidth: '140px',
            }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200"
              id="DT_QLTS_TS_HoTroThietBi_BaoHong_SoDienThoai"
              minLength={0}
              debounceTimeout={1000}
              value={
                filters.DT_QLTS_TS_HoTroThietBi_BaoHong_SoDienThoai
                  ? filters.DT_QLTS_TS_HoTroThietBi_BaoHong_SoDienThoai
                  : ''
              }
              onChange={handleChangeValueFilter}
              placeholder="Tìm số điện thoại"
            />
          </TableCell>
          {/* End: Thông Tin Người Báo Hỏng */}
          {/* Start: Thông tin người xử lý */}
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff', minWidth: '120px' }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200"
              id="DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu"
              minLength={0}
              debounceTimeout={1000}
              value={
                filters.DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu
                  ? filters.DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu
                  : ''
              }
              onChange={handleChangeValueFilter}
              placeholder="Tìm MNS người xử lý"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff', minWidth: '120px' }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200"
              id="DT_QLTS_TS_HoTroThietBi_XuLy_HoTen"
              minLength={0}
              debounceTimeout={1000}
              value={
                filters.DT_QLTS_TS_HoTroThietBi_XuLy_HoTen
                  ? filters.DT_QLTS_TS_HoTroThietBi_XuLy_HoTen
                  : ''
              }
              onChange={handleChangeValueFilter}
              placeholder="Tìm tên người xử lý"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ccc', minWidth: '160px' }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200"
              id="DT_QLTS_TS_HoTroThietBi_XuLy_TenPhongBan"
              minLength={0}
              debounceTimeout={1000}
              value={
                filters.DT_QLTS_TS_HoTroThietBi_XuLy_TenPhongBan
                  ? filters.DT_QLTS_TS_HoTroThietBi_XuLy_TenPhongBan
                  : ''
              }
              onChange={handleChangeValueFilter}
              placeholder="Tìm tên phòng ban"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ccc', minWidth: '140px' }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200"
              id="DT_QLTS_TS_HoTroThietBi_XuLy_SoDienThoai"
              minLength={0}
              debounceTimeout={1000}
              value={
                filters.DT_QLTS_TS_HoTroThietBi_XuLy_SoDienThoai
                  ? filters.DT_QLTS_TS_HoTroThietBi_XuLy_SoDienThoai
                  : ''
              }
              onChange={handleChangeValueFilter}
              placeholder="Tìm số điện thoại"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ccc', minWidth: '120px' }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200"
              id="DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy"
              type="date"
              minLength={0}
              debounceTimeout={1000}
              value={
                filters.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy
                  ? filters.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy
                  : ''
              }
              onChange={handleChangeValueFilter}
              placeholder="Tìm ngày xử lý"
            />
          </TableCell>
        </TableRow>
      </TableHead>
    )
  }
  // effect
  useEffect(() => {
    if (dataSelect == 'all') {
      getListBaoHong()
    } else {
      getListBaoHong(dataMaNhanSu)
    }
  }, [dataSelect])

  console.log(postsShow)
  return (
    <>
      {listBaoHong?.length > 0 ? (
        <Box sx={{ width: '100%', padding: '3rem 1rem' }}>
          <Paper
            sx={{
              width: '100%',
              mb: 2,
              overflow: 'hidden',
              backgroundColor: '#ffffff',
            }}
          >
            <div className="flex items-center gap-4 p-4">
              <select
                className="cursor-pointer rounded-lg border border-slate-200 px-3 py-2 focus:outline-slate-400"
                onChange={handleChangeDataSelect}
                name="filter-data"
                id="filter-data"
              >
                <option value="all">Tất cả</option>
                <option value="me">Yêu cầu của tôi</option>
              </select>
              <button
                type="button"
                onClick={handleDeleteRequest}
                className="text-red cursor-pointer whitespace-nowrap rounded-lg border border-red-600 bg-white px-3 py-2 font-bold text-red-600 hover:bg-red-100"
              >
                Xóa
              </button>
            </div>
            <TableContainer>
              <Table aria-labelledby="tableTitle" size={'small'}>
                <EnhancedTableHead
                  numSelected={selected?.length}
                  rowCount={listBaoHong?.length}
                />
                <TableBody>
                  {postsShow?.map((row, index) => {
                    const isItemSelected = isSelected(row)
                    const labelId = `enhanced-table-checkbox-${index}`
                    const isObjectInArray = selected.some(
                      (item) =>
                        item.DT_QLTS_TS_HoTroThietBi_ID ===
                        row.DT_QLTS_TS_HoTroThietBi_ID,
                    )
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.DT_QLTS_TS_HoTroThietBi_ID}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell
                          align="right"
                          sx={{ borderRight: '1px solid #ccc' }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          padding="checkbox"
                          align="center"
                          sx={{ borderRight: '1px solid #ccc' }}
                        >
                          <Checkbox
                            color="primary"
                            onClick={(event) => handleClick(event, row)}
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {row.DT_QLTS_TS_HoTroThietBi_BaoHong_MaTaiSan}
                        </TableCell>
                        <TableCell align="left">
                          {row.DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan}
                        </TableCell>
                        <TableCell align="center">
                          {row.DT_QLTS_TS_HoTroThietBi_BaoHong_CoSo}
                        </TableCell>
                        <TableCell align="center">
                          {row.DT_QLTS_TS_HoTroThietBi_BaoHong_DiaDiem}
                        </TableCell>
                        <TableCell align="center">
                          {row.DT_QLTS_TS_HoTroThietBi_BaoHong_ToaNha}
                        </TableCell>
                        <TableCell align="center">
                          {row.DT_QLTS_TS_HoTroThietBi_BaoHong_Tang}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            whiteSpace: 'nowrap',
                            borderRight: '1px solid #ccc',
                          }}
                        >
                          {row.DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhong}
                        </TableCell>
                        <TableCell align="center">
                          {row.DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo}
                        </TableCell>
                        <TableCell align="center">
                          {row.DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            whiteSpace: 'nowrap',
                            borderRight: '1px solid #ccc',
                          }}
                        >
                          {moment(
                            row.DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui,
                          ).format('DD/MM/YYYY HH:mm')}
                        </TableCell>
                        <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                          {row.DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu}
                        </TableCell>
                        <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                          {row.DT_QLTS_TS_HoTroThietBi_BaoHong_HoTen}
                        </TableCell>
                        <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                          {row.DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhongBan}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ borderRight: '1px solid #ccc' }}
                        >
                          {row.DT_QLTS_TS_HoTroThietBi_BaoHong_SoDienThoai}
                        </TableCell>
                        <TableCell align="center">
                          {row.DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu}
                        </TableCell>
                        <TableCell align="center">
                          {row.DT_QLTS_TS_HoTroThietBi_XuLy_HoTen}
                        </TableCell>
                        <TableCell align="center">
                          {row.DT_QLTS_TS_HoTroThietBi_XuLy_TenPhongBan}
                        </TableCell>
                        <TableCell align="center">
                          {row.DT_QLTS_TS_HoTroThietBi_XuLy_SoDienThoai}
                        </TableCell>
                        <TableCell align="center" sx={{ minWidth: '280px' }}>
                          {row.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy
                            ? dayjs(
                                row.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy,
                              ).format('DD/MM/YYYY HH:mm:ss')
                            : null}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              labelRowsPerPage="Số yêu cầu hiển thị"
              rowsPerPageOptions={[5, 10, 15, 25]}
              component="div"
              count={listBaoHong?.length}
              rowsPerPage={itemPerPage}
              page={currentPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      ) : null}
    </>
  )
}

export default ThongKeBaoHong
