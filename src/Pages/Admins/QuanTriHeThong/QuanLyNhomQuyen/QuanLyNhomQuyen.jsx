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
import AdvanceSearch from '@/Components/KiemDinhChatLuong/AdvanceSearch'

const permissions = [
  {
    Ten: 'Admin',
    MoTa: 'Không xóa',
  },
  {
    Ten: 'Quản lý',
    MoTa: '',
  },
  {
    Ten: 'Giảng viên',
    MoTa: '',
  },
  {
    Ten: 'Hỗ trợ',
    MoTa: '',
  },
  {
    Ten: 'Thành viên ĐGN',
    MoTa: '',
  },
]

export const QuanLyNhomQuyen = () => {
  const ns = useNamespace('kiem-dinh-chat-luong')

  return (
    <div className="box">
      {/* header */}
      <div className={ns.e('header')}>
        <h3 className={ns.em('header', 'title')}>DANH SÁCH NHÓM QUYỀN</h3>

        <div className={ns.e('actions')}>
          <AdvanceSearch />

          <Tooltip title="Tải lại dữ liệu">
            <button className={ns.em('actions', 'reload')}>
              <Icon>
                <RotateLeft />
              </Icon>
            </button>
          </Tooltip>
          <button className="base-button bg-uneti-primary text-white">
            Thêm mới
          </button>
        </div>
      </div>

      {/* divider */}
      <div className="uneti-divider" />

      {/* table */}
      <div className={ns.e('main')}>
        <table className="w-full">
          <tr className="tr">
            <th className="th">STT</th>
            <th className="th">Tên nhóm quyền</th>
            <th className="th">Mô tả</th>
            <th className="th">Thao tác</th>
          </tr>

          {permissions.map((user, i) => (
            <tr key={i} className="tr">
              <td className="td">
                <div className="text-center">{i + 1}</div>
              </td>
              <td className="td">{user.Ten}</td>
              <td className="td">{user.MoTa}</td>
              <td className="td">
                <div className="flex gap-2 items-center justify-center">
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
              <div className="py-2">
                Có tổng cộng {permissions.length} nhóm quyền
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default QuanLyNhomQuyen
