import DataTable from '@/Components/Base/DataTable/DataTable'
import { useNamespace } from '@/Services/Hooks'
import { useEffect, useMemo, useState } from 'react'
import { Checkbox, Pagination } from '@mui/material'

const DanhSachTaiSanTraCuu = (props) => {
  const { listTaiSan, itemPerPage, textSearch } = props
  const [currentPage, setCurrentPage] = useState(1)

  const handleChange = (e, value) => {
    setCurrentPage(value)
  }

  const totalPage = useMemo(
    () => Math.ceil(listTaiSan?.length / itemPerPage),
    [listTaiSan],
  )

  const filteredTaiSan = listTaiSan?.filter((item) => {
    return item?.DT_QLTS_TS_TenTaiSan.toLowerCase().includes(
      textSearch.toLowerCase(),
    )
  })

  const postsShow = filteredTaiSan?.slice(
    itemPerPage * (currentPage - 1),
    itemPerPage * (currentPage - 1) + itemPerPage,
  )

  const bem = useNamespace('data-table')

  const thead = () => (
    <>
      <tr className="text-center">
        <th scope="col" className={bem.is('sticky')}>
          <div className="h-full">STT</div>
        </th>
        <th scope="col" className={bem.is('sticky')}>
          Tên tài sản
        </th>
        <th scope="col">Mã tài sản</th>
        <th scope="col">Loại tài sản</th>
        <th scope="col">Phòng hiện tại</th>
        <th scope="col">Tên kho</th>
        <th scope="col">Tình trạng</th>
        <th scope="col">SerialNumber</th>
      </tr>
    </>
  )

  const tbody = () =>
    postsShow && postsShow.length > 0 ? (
      postsShow.map((iTaiSan, index) => {
        return (
          <tr key={index}>
            <td scope="row" className={bem.is('sticky')}>
              <div>{(currentPage - 1) * itemPerPage + index + 1}</div>
            </td>
            <td scope="row" className={[bem.is('sticky'), 'text-left']}>
              {iTaiSan?.DT_QLTS_TS_TenTaiSan ?? ''}
            </td>
            <td scope="row" className="text-center">
              {iTaiSan?.DT_QLTS_TS_MaTaiSan ?? ''}
            </td>
            <td scope="row" className="text-center">
              {iTaiSan?.DT_QLTS_TS_LoaiTaiSan ?? ''}
            </td>
            <td scope="row" className="text-center">
              {iTaiSan?.DT_QLTS_TS_TenPhongHienTai ?? ''}
            </td>
            <td scope="row" className="text-center">
              {iTaiSan?.DT_QLTS_TS_NhapKho_TenKho_Ten ?? ''}
            </td>
            <td scope="row" className="text-center">
              {iTaiSan?.DT_QLTS_TS_TinhTrang ?? ''}
            </td>
            <td scope="row" className="text-center">
              {iTaiSan?.DT_QLTS_TS_SerialNumber ?? ''}
            </td>
          </tr>
        )
      })
    ) : (
      <tr>
        <td colSpan={`10`}>
          <p className="p-4 text-center font-bold text-red-600">
            Không có dữ liệu!
          </p>
        </td>
      </tr>
    )

  const footer = () =>
    listTaiSan &&
    listTaiSan.length > 10 && (
      <div className={[bem.e('pagination')]} style={{ margin: '20px 0' }}>
        {totalPage > 1 && (
          <Pagination
            color="primary"
            count={totalPage}
            page={currentPage}
            onChange={handleChange}
          />
        )}
      </div>
    )

  useEffect(() => {}, [textSearch])

  return (
    <div>
      <DataTable scrollX thead={thead()} tbody={tbody()} footer={footer()} />
    </div>
  )
}

export default DanhSachTaiSanTraCuu
