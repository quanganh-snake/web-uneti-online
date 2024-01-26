import DataTable from '@/Components/Base/DataTable/DataTable'
import { useNamespace } from '@/Services/Hooks'
import { useMemo, useState } from 'react'
import { Checkbox, Pagination } from '@mui/material'

const DanhSachTaiSan = (props) => {
  const { listTaiSan, taiSan, onSelectTaiSan } = props

  const [page, setPage] = useState(1)
  const postsPerPage = 10

  const handleChange = (e, value) => {
    setPage(value)
  }

  const totalPage = useMemo(
    () => Math.ceil(listTaiSan.length / postsPerPage),
    [listTaiSan],
  )

  const postsShow = listTaiSan.slice(
    postsPerPage * (page - 1),
    postsPerPage * (page - 1) + postsPerPage,
  )

  const bem = useNamespace('data-table')

  const thead = () => (
    <>
      <tr className="text-center">
        <th scope="col" className={bem.is('sticky')}>
          <div className="h-full">STT</div>
        </th>
        <th scope="col" className={bem.is('sticky')}>
          Chọn
        </th>
        <th scope="col" className={bem.is('sticky')}>
          Tên tài sản
        </th>
        <th scope="col">Mã tài sản</th>
        <th scope="col">Xem chi tiết</th>
      </tr>
    </>
  )

  const tbody = () =>
    listTaiSan && listTaiSan.length > 0 ? (
      postsShow.map((iTaiSan, index) => {
        return (
          <tr key={index}>
            <td scope="row" className={bem.is('sticky')}>
              <div>{(page - 1) * postsPerPage + index + 1}</div>
            </td>
            <td className="text-center p-3 border border-solid border-[#dee2e6]">
              <Checkbox
                onChange={(e) => {
                  onSelectTaiSan(e, iTaiSan)
                }}
                checked={
                  iTaiSan.DT_QLTS_TS_MaTaiSan === taiSan.DT_QLTS_TS_MaTaiSan
                }
              />
            </td>
            <td scope="row" className={[bem.is('sticky'), 'text-left']}>
              {iTaiSan?.DT_QLTS_TS_TenTaiSan ?? ''}
            </td>
            <td scope="row" className="text-center">
              {iTaiSan?.DT_QLTS_TS_MaTaiSan ?? ''}
            </td>
            <td scope="row">
              <div className="flex items-center justify-center">
                <p className="px-3 py-2 bg-sky-600 text-center text-white rounded-full cursor-pointer hover:opacity-80">
                  Xem chi tiết
                </p>
              </div>
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
            page={page}
            onChange={handleChange}
          />
        )}
      </div>
    )

  return (
    <>
      <DataTable
        scrollX
        scrollY
        thead={thead()}
        tbody={tbody()}
        footer={footer()}
      />
    </>
  )
}

export default DanhSachTaiSan
