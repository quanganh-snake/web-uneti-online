import Icon from '@/Components/Base/Icon/Icon'
import { useNamespace } from '@/Services/Hooks'
import { Checkbox } from '@mui/material'
import { BiPlus, BiX } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { sidebarTree } from './sidebarTree'
import { useState } from 'react'
import { SimpleTreeView } from '@mui/x-tree-view'
import { data } from './faker'

export default function ThemMoiMinhChung() {
  const ns = useNamespace('kiem-dinh-chat-luong')

  const [selectedItems, setSelectedItems] = useState([])

  const handleSelectedItemsChange = (event, ids) => {
    setSelectedItems(ids)
  }

  return (
    <div className="box">
      <div className={ns.e('header')}>
        <h3 className={ns.em('header', 'title')}>THÊM MỚI MINH CHỨNG</h3>

        <div className={ns.e('actions')}>
          <Link to="/quan-ly-minh-chung/minh-chung-dung-chung-don-vi">
            <button className="base-button border text-uneti-primary border-uneti-primary">
              Quay lại
            </button>
          </Link>
          <button className="base-button border border-uneti-primary bg-uneti-primary">
            Lưu
          </button>
        </div>
      </div>

      <div className="uneti-divider" />

      <div>
        <div className="flex items-start md:items-center flex-col md:flex-row gap-2 mb-2">
          <p className="md:w-[30%] w-full">
            Tên minh chứng <span className="text-red-500">(*)</span>
          </p>
          <input type="text" className="base-input w-full" />
        </div>
        <div className="flex items-start md:items-center flex-col md:flex-row gap-2 mb-2">
          <p className="md:w-[30%] w-full">
            Số, ngày ban hành, hoặc thời điểm khảo sát, điều tra, phỏng vấn{' '}
            <span className="text-red-500">(*)</span>
          </p>
          <input type="text" className="base-input w-full" />
        </div>
        <div className="flex items-start md:items-center flex-col md:flex-row gap-2 mb-2">
          <p className="md:w-[30%] w-full">
            Nơi ban hành hoặc nhóm cá nhân thực hiện
            <span className="text-red-500">(*)</span>
          </p>
          <select className="base-input w-full">
            <option>Chọn nơi ban hành</option>
            <option>Bộ GD&ĐT</option>
          </select>
        </div>
        <div className="flex items-start md:items-center flex-col md:flex-row gap-2 mb-2">
          <p className="md:w-[30%] w-full">Trích yếu</p>
          <textarea className="base-input w-full"></textarea>
        </div>
        <div className="flex items-start md:items-center flex-col md:flex-row gap-2 mb-2">
          <p className="md:w-[30%] w-full">Trạng thái sử dụng</p>
          <div className="w-full -ml-4">
            <Checkbox />
          </div>
        </div>
        <div className="flex items-start md:items-center flex-col md:flex-row gap-2 mb-2">
          <p className="md:w-[30%] w-full">Nhập link</p>
          <div className="w-full -ml-4">
            <Checkbox />
          </div>
        </div>
        <div className="flex items-start md:items-center flex-col md:flex-row gap-2 mb-2">
          <p className="md:w-[30%] w-full">
            Link đính kèm
            <span className="text-red-500">(*)</span>
          </p>
          <input
            type="text"
            className="base-input w-full"
            onChange={() => {}}
            value="https://uneti.edu.vn/"
          />
        </div>
        <div className="flex items-start md:items-center flex-col md:flex-row gap-2 mb-2">
          <p className="md:w-[30%] w-full">
            File đính kèm <span className="text-red-500">(*):</span>
          </p>
          <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-3 bg-gray-100">
              <button className="base-button bg-uneti-primary-lighter">
                <span className="flex items-center gap-2">
                  <Icon>
                    <BiPlus />
                  </Icon>
                  Chọn file
                </span>
              </button>
              <button className="base-button bg-uneti-primary-lighter ml-2 opacity-70 cursor-default pointer-events-none">
                <span className="flex items-center gap-2">
                  <Icon>
                    <BiX />
                  </Icon>
                  Hủy
                </span>
              </button>
            </div>
            <div className="p-4"></div>
          </div>
        </div>
        <div className="flex items-start md:items-center flex-col md:flex-row gap-2 mb-2">
          <p className="md:w-[30%] w-full">
            Được sử dụng cho tiêu chuẩn{' '}
            <span className="text-red-500">(*):</span>
          </p>
          <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4">
              <SimpleTreeView
                selectedItems={selectedItems}
                onSelectedItemsChange={handleSelectedItemsChange}
              >
                {sidebarTree(data)}
              </SimpleTreeView>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
