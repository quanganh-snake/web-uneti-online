import { useClickOutside, useNamespace } from '@/Services/Hooks'
import { Box, Pagination, Tooltip } from '@mui/material'
import Row from '@/Components/Base/Row/Row'
import Col from '@/Components/Base/Col/Col'
import { useMemo, useState } from 'react'
import { isNil } from 'lodash-unified'
import Icon from '@/Components/Base/Icon/Icon'
import { RotateLeft } from '@/Components/Base/Icons/RotateLeft'
import { useRef } from 'react'
import { BiChevronDown, BiPencil } from 'react-icons/bi'
import { transformCls } from '@/Services/Utils/reactUtils'
import CreateForm from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhCoSoGiaoDuc/CreateForm'
import Button from '@/Components/Base/Button/Button'
import { FiTrash } from 'react-icons/fi'
import { table, data, data2 } from './faker'

import './KiemDinhChatLuongCSGD.scss'

export default function KiemDinhChatLuongCSGD() {
  const ns = useNamespace('cau-hinh-nhiem-vu')

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [isOpenSearchAdvance, setIsOpenSearchAdvance] = useState(false)
  const searchAdvanceRef = useRef()
  const searchDropdownRef = useRef()

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleChangePage = (event, value) => {
    setPage(value)
  }

  useClickOutside(searchDropdownRef, (event) => {
    if (event.target !== searchAdvanceRef.current) {
      setIsOpenSearchAdvance(false)
    }
  })

  const [kiemDinh, setKiemDinh] = useState()

  const congViec = useMemo(() => {
    return data2.filter((item) => item.PID === kiemDinh)
  }, [kiemDinh, data, data2])

  return (
    <div className={`${ns.b()} box`}>
      {/* header */}
      <div className={ns.e('header')}>
        <h3 className={ns.em('header', 'title')}>
          Kiểm định chất lượng cơ sở giáo dục
        </h3>

        <div className={ns.e('actions')}>
          <CreateForm />
        </div>
      </div>

      {/* divider */}
      <div className="uneti-divider" />

      {/* table */}
      <div className={ns.e('main')}>
        <Row gutter={30}>
          <Col span={12} md={6}>
            <div className="border border-gray-300 rounded-lg flex flex-col gap-2">
              <div className="border-b p-2 w-full flex justify-between items-center">
                <h3 className="font-semibold uppercase text-uneti-primary">
                  CSGD KIỂM ĐỊNH ĐANG THAM GIA
                </h3>
                <div className="flex items-center gap-2">
                  <span>Phân loại: </span>
                  <select className="border rounded-lg outline-none px-4 py-2">
                    <option>Tự đánh giá</option>
                    <option>Label 2</option>
                    <option>Label 3</option>
                  </select>
                </div>
              </div>

              <div className="p-2 flex flex-col gap-3 max-h-[300px] overflow-y-scroll">
                {data.map((e, i) => (
                  <div
                    key={i}
                    onClick={() => setKiemDinh(e.Id)}
                    className={`cursor-pointer transition-all ${kiemDinh == e.Id ? 'border-blue-500 ring-2' : ''} hover:border-blue-500 border p-2 rounded-lg flex flex-col gap-1`}
                  >
                    <div className="flex">
                      <p className="w-[150px]">CTĐT:</p>
                      <span className="font-semibold">: {e.CTDT}</span>
                    </div>
                    <div className="flex">
                      <p className="w-[150px]">Tên đơn vị:</p>
                      <span className="font-semibold">: {e.DonVi}</span>
                    </div>
                    <div className="flex">
                      <p className="w-[150px]">Bộ tiêu chuẩn:</p>
                      <span className="font-semibold">: {e.BoTieuChuan}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          <Col span={12} md={6}>
            <div className="border border-gray-300 rounded-lg flex flex-col gap-2">
              <div className="border-b p-2 w-full flex justify-between items-center">
                <h3 className="font-semibold uppercase text-uneti-primary">
                  tiến độ công việc
                </h3>
              </div>

              <div className="p-2 flex flex-col gap-3 max-h-[300px] overflow-y-scroll">
                {isNil(kiemDinh) ? (
                  <>
                    <span>Vui lòng chọn công việc</span>
                  </>
                ) : congViec.length == 0 ? (
                  <span>Không có công việc</span>
                ) : (
                  congViec.map((e, i) => (
                    <div
                      key={i}
                      className="cursor-pointer hover:border-blue-500 border p-2 rounded-lg flex flex-col gap-1"
                    >
                      <div className="flex">
                        <p className="w-[150px]">CTĐT:</p>
                        <span className="font-semibold">
                          : {data.find((d) => d.Id == e.PID).CTDT}
                        </span>
                      </div>
                      <div className="flex">
                        <p className="w-[150px]">Đang thực hiện:</p>
                        <span className="font-semibold">
                          : {e.DangThucHien}
                        </span>
                      </div>
                      <div className="flex justify-end text-red-500 font-semibold">
                        Deadline: {e.KyHan}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Col>
        </Row>

        <div className="mt-5 border border-gray-300 rounded-lg p-2">
          <div className={ns.e('table-header')}>
            <h3 className={ns.em('table-header', 'title')}>
              Danh sách hồ sơ kiểm định CSGD của đơn vị
            </h3>

            <div className={ns.e('actions')}>
              <div className={ns.em('actions', 'search')}>
                <div className={ns.em('search', 'controls')}>
                  <input
                    className={ns.em('search', 'control')}
                    value={search}
                    onInput={handleSearch}
                    placeholder="Nhập từ khóa tìm kiếm"
                  />
                  <div className="relative">
                    <button
                      ref={searchAdvanceRef}
                      className={ns.em('search', 'advance')}
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        setIsOpenSearchAdvance((prev) => !prev)
                      }}
                    >
                      Tìm kiếm nâng cao
                      <Icon>
                        <BiChevronDown />
                      </Icon>
                    </button>

                    <div
                      ref={searchDropdownRef}
                      className={transformCls([
                        ns.em('search', 'dropdown'),
                        ns.is('open', isOpenSearchAdvance),
                      ])}
                    >
                      Dropdown
                    </div>
                  </div>
                </div>
                <button className="base-button bg-uneti-primary">
                  Tìm kiếm
                </button>
              </div>

              <Tooltip title="Tải lại dữ liệu">
                <button className="icon-btn">
                  <Icon>
                    <RotateLeft />
                  </Icon>
                </button>
              </Tooltip>
              <button className="base-button bg-uneti-primary-lighter">
                Xuất file
              </button>
            </div>
          </div>

          <div className="uneti-divider" />

          <div>
            <table className={ns.e('table')} border="1">
              <tr className={ns.em('table', 'header')}>
                <th>STT</th>
                <th>Đơn vị</th>
                <th>Năm kiểm định</th>
                <th>Bộ tiêu chuẩn</th>
                <th>Kết quả TĐG</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>

              {table.map((row, index) => (
                <tr key={row.Id} className={ns.em('table', 'row')}>
                  <td>
                    <div className="text-center">{index + 1}</div>
                  </td>
                  <td>
                    <span className="text-blue-700 font-semibold cursor-pointer">
                      {row.DonVi}
                    </span>
                  </td>
                  <td>{row.NamKiemDinh}</td>
                  <td>{row.BoTieuChuan}</td>
                  <td>{row.KetQuaTDG}</td>
                  <td>{row.TrangThai}</td>
                  <td>
                    <div className="flex gap-2">
                      <Button icon type="transparent">
                        <Icon>
                          <BiPencil />
                        </Icon>
                      </Button>
                      <Button icon type="flat" color="danger">
                        <Icon>
                          <FiTrash />
                        </Icon>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {table.length > pageSize && (
                <tr>
                  <td colSpan={8}>
                    <div className="py-2 flex justify-center items-center">
                      <Pagination
                        count={table.length}
                        page={page}
                        onChange={handleChangePage}
                      />
                    </div>
                  </td>
                </tr>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
