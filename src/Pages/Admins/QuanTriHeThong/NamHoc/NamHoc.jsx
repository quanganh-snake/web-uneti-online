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
import CreateForm from './CreateForm'

const namHoc = [
  {
    NamHoc: '2018-2019',
    NamHienTai: '',
  },
  {
    NamHoc: '2019-2020',
    NamHienTai: '',
  },
  {
    NamHoc: '2020-2021',
    NamHienTai: '',
  },
  {
    NamHoc: '2021-2022',
    NamHienTai: '',
  },
  {
    NamHoc: '2022-2023',
    NamHienTai: '2024',
  },
]

export const NamHoc = () => {
  const ns = useNamespace('kiem-dinh-chat-luong')

  return (
    <div className="box">
      {/* header */}
      <div className={ns.e('header')}>
        <h3 className={ns.em('header', 'title')}>DANH SÁCH NĂM HỌC</h3>

        <div className={ns.e('actions')}>
          <CreateForm />
        </div>
      </div>

      {/* divider */}
      <div className="uneti-divider" />

      {/* table */}
      <div className={ns.e('main')}>
        <table className="w-full">
          <tr className="tr">
            <th className="th">STT</th>
            <th className="th">Năm học</th>
            <th className="th">Năm hiện tại</th>
            <th className="th">Thao tác</th>
          </tr>

          {namHoc.map((user, i) => (
            <tr key={i} className="tr">
              <td className="td">
                <div className="text-center">{i + 1}</div>
              </td>
              <td className="td">{user.NamHoc}</td>
              <td className="td">{user.NamHienTai}</td>
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
                Có tổng cộng {namHoc.length} nhóm quyền
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default NamHoc
