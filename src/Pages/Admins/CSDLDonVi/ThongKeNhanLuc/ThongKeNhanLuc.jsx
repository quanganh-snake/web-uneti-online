import Icon from '@/Components/Base/Icon/Icon'
import { RotateLeft } from '@/Components/Base/Icons/RotateLeft'
import { useClickOutside, useNamespace } from '@/Services/Hooks'
import { transformCls } from '@/Services/Utils/reactUtils'
import { Pagination, Tooltip } from '@mui/material'
import { useState } from 'react'
import { useRef } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const DATA = [
  {
    Id: '1',
    HoTen: 'Phó chủ tịch',
    SoDT: '01223564',
    HocVi: 'Tiến sĩ khoa học',
    ChucDanh: 'Giảng viên',
    ChucVuChuyenMon: 'Giảng viên',
    DonVi: 'Khoa Điện tử',
  },
  {
    Id: '2',
    HoTen: 'Trưởng ban thư ký',
    SoDT: '01223564',
    HocVi: 'Tiến sĩ',
    ChucDanh: 'Giảng viên',
    ChucVuChuyenMon: 'Giảng viên',
    DonVi: 'Khoa Điện tử',
  },
]

export default function ThongKeNhanLuc() {
  const ns = useNamespace('cau-hinh-nhiem-vu')

  const [isOpenSearchAdvance, setIsOpenSearchAdvance] = useState(false)
  const searchAdvanceRef = useRef()
  const searchDropdownRef = useRef()

  useClickOutside(searchDropdownRef, (event) => {
    if (event.target !== searchAdvanceRef.current) {
      setIsOpenSearchAdvance(false)
    }
  })
  return (
    <div className="box">
      <div className="flex justify-between items-center">
        <Link to="/csdl-don-vi/tong-quan">
          <button className="base-button bg-uneti-primary">Quay lại</button>
        </Link>

        <h3>
          Thống kê nhân lực -{' '}
          <span className="font-semibold">
            Trường Đại học Kinh tế - Kỹ thuật Công nghiệp
          </span>
        </h3>
      </div>

      <div className="uneti-divider" />

      <div className="flex justify-end items-center gap-2">
        <span>Năm: </span>
        <select className="base-input">
          <option>2022 - 2023</option>
          <option>2023 - 2024</option>
        </select>
      </div>

      <div className="my-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="uppercase font-semibold">
            Danh sách các bộ giảng viên / nhân viên
          </h3>

          <div className={ns.e('actions')}>
            <div className={ns.em('actions', 'search')}>
              <div className={ns.em('search', 'controls')}>
                <input
                  className={ns.em('search', 'control')}
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
              <button className="base-button bg-uneti-primary">Tìm kiếm</button>
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

        <div className="overflow-x-scroll">
          <table className="border w-full">
            <thead>
              <tr className="bg-uneti-primary-light text-white">
                <th className="px-2 py-3 border-r min-w-[80px]">STT</th>
                <th className="px-2 py-3 border-r min-w-[160px]">Họ tên</th>
                <th className="px-2 py-3 border-r border-b">Số ĐT</th>
                <th className="px-2 py-3 border-r border-b">Học hàm học vị</th>
                <th className="px-2 py-3 border-r border-b">Chức danh</th>
                <th className="px-2 py-3 border-r border-b">
                  Chức vụ chuyên môn
                </th>
                <th className="px-2 py-3 border-r border-b">Đơn vị</th>
                <th className="px-2 min-w-[80px]">Tác vụ</th>
              </tr>
            </thead>

            <tbody>
              {DATA.map((e, i) => (
                <tr key={i} className={`${i % 2 == 1 ? 'bg-gray-100' : ''}`}>
                  <td className="border-r px-2 py-3 text-center">{i + 1}</td>
                  <td className="border-r px-2 py-3">{e.HoTen}</td>
                  <td className="border-r px-2 py-3 text-center">{e.SoDT}</td>
                  <td className="border-r px-2 py-3 text-center">{e.HocVi}</td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.ChucDanh}
                  </td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.ChucVuChuyenMon}
                  </td>
                  <td className="border-r px-2 py-3 text-center">{e.DonVi}</td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.KhacSoNguoiHoc}
                  </td>
                  <td></td>
                </tr>
              ))}

              <tr>
                <td colSpan={8}>
                  <div className="flex justify-center my-2">
                    <Pagination />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
