import { useState } from 'react'
import { useRef } from 'react'
import { FiTrash } from 'react-icons/fi'
import { BiChevronDown, BiPencil } from 'react-icons/bi'
import { Tooltip } from '@mui/material'
import { useClickOutside, useNamespace } from '@/Services/Hooks'
import Button from '@/Components/Base/Button/Button'
import { RotateLeft } from '@/Components/Base/Icons/RotateLeft'
import Icon from '@/Components/Base/Icon/Icon'
import { transformCls } from '@/Services/Utils/reactUtils'

import './QuanLyNguoiDung.scss'

const users = [
  {
    Id: 1,
    HoTen: 'Trần Văn Thinh',
    Email: 'tranthinh.own@gmail.com',
    SoDienThoai: '0796 459 283',
    DonVi: 'Trường Đại học Kinh tế - Kỹ thuật Công nghiệp',
    PhanQuyen: 'Sinh viên',
    TrangThai: true,
  },
  {
    Id: 2,
    HoTen: 'Nguyễn Công Mạnh Khương',
    Email: 'ncmkhuong.dhti14a6hn@sv.uneti.edu.vn',
    SoDienThoai: '0123 456 789',
    DonVi: 'Trường Đại học Kinh tế - Kỹ thuật Công nghiệp',
    PhanQuyen: 'Sinh viên',
    TrangThai: true,
  },
]

export const QuanLyNguoiDung = () => {
  const ns = useNamespace('ql-nguoi-dung')

  const searchDropdownRef = useRef()
  const searchAdvanceRef = useRef()
  const [search, setSearch] = useState('')
  const [isOpenSearchAdvance, setIsOpenSearchAdvance] = useState(false)

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  useClickOutside(searchDropdownRef, (event) => {
    if (event.target !== searchAdvanceRef.current) {
      setIsOpenSearchAdvance(false)
    }
  })

  return (
    <div className={ns.b()}>
      {/* header */}
      <div className={ns.e('header')}>
        <h3 className={ns.em('header', 'title')}>Danh sách người dùng</h3>

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
            <button className={ns.em('search', 'button')}>Tìm kiếm</button>
          </div>

          <Tooltip title="Tải lại dữ liệu">
            <button className={ns.em('actions', 'reload')}>
              <Icon>
                <RotateLeft />
              </Icon>
            </button>
          </Tooltip>
          <button className={ns.em('actions', 'add')}>Thêm mới</button>
        </div>
      </div>

      {/* divider */}
      <div className="uneti-divider" />

      {/* table */}
      <div className={ns.e('main')}>
        <table className={ns.e('table')} border="1">
          <tr className={ns.em('table', 'header')}>
            <th>STT</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Đơn vị</th>
            <th>Phân quyền</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>

          {users.map((user, index) => (
            <tr key={user.Id} className={ns.em('table', 'row')}>
              <td>
                <div className="text-center">{index}</div>
              </td>
              <td>{user.HoTen}</td>
              <td>{user.Email}</td>
              <td>{user.SoDienThoai}</td>
              <td>{user.DonVi}</td>
              <td>{user.PhanQuyen}</td>
              <td>{user.TrangThai ? 'Hoạt động' : 'Ngưng hoạt động'}</td>
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
          <tr>
            <td colSpan={8}>
              <div className="py-2">Có tổng cộng {users.length} người dùng</div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default QuanLyNguoiDung
