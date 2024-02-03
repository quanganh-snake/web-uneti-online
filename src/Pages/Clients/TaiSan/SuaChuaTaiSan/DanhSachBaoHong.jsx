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

const DanhSachBaoHong = (props) => {
  const {
    listBaoHong,
    itemPerPage,
    page,
    onSetPage,
    onSetItemPerPage,
    selected,
    filters,
    onSelected,
    onUpdateNgayXuLy,
    onChangeValueFilter,
    onClearFilter,
  } = props
  const handleChangePage = (event, newPage) => {
    onSetPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    onSetItemPerPage(parseInt(event.target.value, 10))
    onSetPage(0)
  }

  const totalPage = useMemo(
    () => Math.ceil(listBaoHong?.length / itemPerPage),
    [listBaoHong],
  )

  const filteredBaoHong = filterData(listBaoHong, filters)

  const postsShow = filteredBaoHong?.slice(
    itemPerPage * page,
    itemPerPage * page + itemPerPage,
  )

  // MUI table
  const isSelected = (row) =>
    selected?.some(
      (item) =>
        item.DT_QLTS_TS_HoTroThietBi_ID === row.DT_QLTS_TS_HoTroThietBi_ID,
    ) !== false
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
    onSelected(newSelected)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = listBaoHong?.map((n) => n)
      //   const newSelected = listBaoHong?.filter(
      //     (n) =>
      //       !n.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy ||
      //       n.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy === null,
      //   );

      onSelected(newSelected)
      return
    }
    onSelected([])
  }

  function EnhancedTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount } = props
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
            colSpan={6}
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
            <Checkbox
              color="warning"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
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
            Gửi email
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
                onClearFilter()
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
              onChange={onChangeValueFilter}
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
              onChange={onChangeValueFilter}
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
              onChange={onChangeValueFilter}
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
              onChange={onChangeValueFilter}
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
              onChange={onChangeValueFilter}
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
              onChange={onChangeValueFilter}
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
              onChange={onChangeValueFilter}
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
              onChange={onChangeValueFilter}
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
              onChange={onChangeValueFilter}
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
              onChange={onChangeValueFilter}
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
              onChange={onChangeValueFilter}
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
              onChange={onChangeValueFilter}
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
              onChange={onChangeValueFilter}
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
              onChange={onChangeValueFilter}
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
              onChange={onChangeValueFilter}
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
              onChange={onChangeValueFilter}
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
              onChange={onChangeValueFilter}
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
              onChange={onChangeValueFilter}
              placeholder="Tìm số điện thoại"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{ whiteSpace: 'nowrap', color: '#ffffff', minWidth: '80px' }}
          ></TableCell>
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
              onChange={onChangeValueFilter}
              placeholder="Tìm ngày xử lý"
            />
          </TableCell>
        </TableRow>
      </TableHead>
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={'small'}>
            <EnhancedTableHead
              numSelected={selected?.length}
              onSelectAllClick={handleSelectAllClick}
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
                    <TableCell align="center">
                      <Checkbox
                        id="DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail"
                        name="DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail"
                        onChange={(e) => {
                          onUpdateNgayXuLy(row, {
                            DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail:
                              e.target.checked,
                          })
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: '280px' }}>
                      {row.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy ? (
                        dayjs(row.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy).format(
                          'DD/MM/YYYY HH:mm:ss',
                        )
                      ) : (
                        <DateTimePicker
                          id="DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy"
                          name="DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy"
                          label="Xác nhận ngày xử lý"
                          slotProps={{
                            openPickerIcon: { fontSize: 'medium' },
                            openPickerButton: { color: 'info' },
                            textField: {
                              variant: 'filled',
                              focused: true,
                              color: 'info',
                            },
                          }}
                          views={['day', 'month', 'year', 'hours', 'minutes']}
                          minDateTime={dayjs()}
                          disabled={isObjectInArray ? false : true}
                          onChange={(newValue) => {
                            onUpdateNgayXuLy(row, {
                              DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy: moment(
                                newValue.$d,
                              ).format('YYYY-MM-DDTHH:mm:00.000Z'),
                            })
                          }}
                        />
                      )}
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
          count={listBaoHong.length}
          rowsPerPage={itemPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default DanhSachBaoHong
