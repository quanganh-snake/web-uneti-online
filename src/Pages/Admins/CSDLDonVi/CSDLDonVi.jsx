import Col from '@/Components/Base/Col/Col'
import Icon from '@/Components/Base/Icon/Icon'
import Row from '@/Components/Base/Row/Row'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import { useState } from 'react'
import { BiMinus, BiPencil, BiPlus, BiSearch } from 'react-icons/bi'
import { data, THONG_KE_LIST } from './faker'
import { sidebarTree } from './sidebarTree'
import { BsEye, BsPencil } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function CSDLDonVi() {
  const [selectedItems, setSelectedItems] = useState([])
  const [editMode, setEditMode] = useState(false)

  const handleSelectedItemsChange = (event, ids) => {
    setSelectedItems(ids)
  }

  return (
    <Row gutter={10}>
      <Col span={12} md={4}>
        <div className="rounded-[12px_12px_0_0] h-[50px] text-white bg-uneti-primary flex items-center justify-between px-2 py-3">
          <h3 className="uppercase font-semibold">Danh sách CSGD và CT ĐT</h3>

          <div className="bg-slate-200 text-gray-800 flex items-center justify-center w-8 h-8 rounded-lg">
            <Icon>
              <BiMinus />
            </Icon>
          </div>
        </div>

        <div className="rounded-[0_0_12px_12px] shadow-sm bg-white p-2 border">
          <div className="relative mb-3">
            <input className="w-full base-input" />

            <button className="flex absolute right-1 top-1/2 -translate-y-1/2">
              <Icon>
                <BiSearch />
              </Icon>
            </button>
          </div>
          <SimpleTreeView
            selectedItems={selectedItems}
            onSelectedItemsChange={handleSelectedItemsChange}
          >
            {sidebarTree(data)}
          </SimpleTreeView>
        </div>
      </Col>

      <Col span={12} md={8}>
        <div className="rounded-[12px_12px_0_0] h-[50px] text-white bg-uneti-primary flex items-center justify-center px-2 py-3">
          <h3 className="uppercase font-semibold">Thông tin chi tiết</h3>
        </div>
        <div className="rounded-[0_0_12px_12px] shadow-sm bg-white p-4 border">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold uppercase">Thông tin chung</h4>

            <button
              onClick={() => setEditMode(!editMode)}
              className="icon-btn bg-gray-50"
            >
              <Icon>
                <BiPencil />
              </Icon>
            </button>
          </div>

          <div className="flex flex-col mt-4 gap-4">
            <div className="flex items-center">
              <p className="w-[170px] font-semibold">
                Tên tiếng Việt
                <span className="text-red-600">(*): </span>
              </p>
              <input
                className="base-input flex-1 "
                disabled={!editMode}
                value="Trường Đại học Kinh tế - Kỹ thuật Công nghiệp"
              />
            </div>
            <div className="flex items-center">
              <p className="w-[170px] font-semibold">
                Tên tiếng Anh
                <span className="text-red-600">(*): </span>
              </p>
              <input
                className="base-input flex-1 "
                disabled={!editMode}
                value="University of Economics - Technology for Industry"
              />
            </div>

            <div className="flex gap-6">
              <div className="flex-1 flex items-center">
                <p className="w-[170px] font-semibold">
                  Tên viết tắt tiếng Việt
                  <span className="text-red-600">(*): </span>
                </p>
                <input
                  className="base-input flex-1 flex-1"
                  disabled={!editMode}
                  value="UNETI"
                />
              </div>
              <div className="flex-1 flex items-center">
                <p className="w-[170px] font-semibold">
                  Tên viết tắt tiếng Anh
                  <span className="text-red-600">(*): </span>
                </p>
                <input
                  className="base-input flex-1 flex-1"
                  disabled={!editMode}
                  value="UNETI"
                />
              </div>
            </div>
            <div className="flex items-center">
              <p className="w-[170px] font-semibold">Tên trước đây</p>
              <input
                className="base-input flex-1 "
                disabled={!editMode}
                value="Trường Đại học Kinh tế - Kỹ thuật Công nghiệp"
              />
            </div>
            <div className="flex items-center">
              <p className="w-[170px] font-semibold">
                Cơ quan/bộ chủ quản
                <span className="text-red-600">(*): </span>
              </p>
              <input
                className="base-input flex-1 "
                disabled={!editMode}
                value="Bộ GD&ĐT"
              />
            </div>
            <div className="flex items-center">
              <p className="w-[170px] font-semibold">
                Địa chỉ
                <span className="text-red-600">(*): </span>
              </p>
              <input
                className="base-input flex-1 "
                disabled={!editMode}
                value="Số 456 Minh Khai, P.Vĩnh Tuy, Q.Hai Bà Trưng, TP.Hà Nội"
              />
            </div>
            <div className="flex gap-6">
              <div className="flex-1 flex items-center">
                <p className="w-[170px] font-semibold">
                  Điện thoại
                  <span className="text-red-600">(*): </span>
                </p>
                <input
                  className="base-input flex-1 flex-1"
                  disabled={!editMode}
                  value="024.38621504"
                />
              </div>
              <div className="flex-1 flex items-center">
                <p className="w-[170px] font-semibold">
                  Fax
                  <span className="text-red-600">(*): </span>
                </p>
                <input
                  className="base-input flex-1 flex-1"
                  disabled={!editMode}
                  value="024.38621504"
                />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-1 flex items-center">
                <p className="w-[170px] font-semibold">
                  Email
                  <span className="text-red-600">(*): </span>
                </p>
                <input
                  className="base-input flex-1 flex-1"
                  disabled={!editMode}
                  value="web@uneti.edu.vn"
                />
              </div>
              <div className="flex-1 flex items-center">
                <p className="w-[170px] font-semibold">
                  Website
                  <span className="text-red-600">(*): </span>
                </p>
                <input
                  className="base-input flex-1 flex-1"
                  disabled={!editMode}
                  value="https://uneti.edu.vn"
                />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-1 flex items-center">
                <p className="w-[170px] font-semibold">
                  Năm thành lập
                  <span className="text-red-600">(*): </span>
                </p>
                <input
                  className="base-input flex-1 flex-1"
                  disabled={!editMode}
                  value="09/12/1960"
                />
              </div>
              <div className="flex-1" />
            </div>
            <div className="flex gap-6">
              <div className="flex-1 flex items-center">
                <p className="w-[170px] font-semibold">
                  Thời gian bắt đầu đào tạo khóa 1
                  <span className="text-red-600">(*): </span>
                </p>
                <input
                  className="base-input flex-1 flex-1"
                  disabled={!editMode}
                  value="1960"
                />
              </div>
              <div className="flex-1 flex items-center">
                <p className="w-[170px] font-semibold">
                  Thời gian cấp bằng cho khóa 1
                  <span className="text-red-600">(*): </span>
                </p>
                <input
                  className="base-input flex-1 flex-1"
                  disabled={!editMode}
                  value="1964"
                />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-1 flex items-center">
                <p className="w-[170px] font-semibold">
                  Loại hình cơ sở giáo dục
                  <span className="text-red-600">(*): </span>
                </p>
                <select
                  className={`base-input flex-1 flex-1 ${editMode ? '' : 'bg-gray-100 bg-opacity-60'}`}
                  disabled={!editMode}
                >
                  <option>Công lập</option>
                </select>
              </div>
              <div className="flex-1 flex items-center">
                <p className="w-[170px] font-semibold">
                  Loại hình đào tạo
                  <span className="text-red-600">(*): </span>
                </p>
                <select
                  className={`base-input flex-1 flex-1 ${editMode ? '' : 'bg-gray-100 bg-opacity-60'}`}
                  disabled={!editMode}
                >
                  <option>Chính quy</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-end gap-2">
              <p className="uppercase font-semibold">
                Cập nhật kết quả kiểm định
              </p>
              <button className="icon-btn bg-gray-50">
                <Icon>
                  <BiPlus />
                </Icon>
              </button>
            </div>

            <Row gutter={60}>
              {THONG_KE_LIST.map((e, i) => (
                <Col key={i} span={12} md={6}>
                  <div className="flex justify-between items-center my-2">
                    <p className="uppercase font-semibold">{e.label}</p>

                    <div className="flex items-center gap-2">
                      <Link to={e.path} className="icon-btn bg-gray-50">
                        <Icon>
                          <BsEye />
                        </Icon>
                      </Link>
                      <button className="icon-btn bg-gray-50">
                        <Icon>
                          <BsPencil />
                        </Icon>
                      </button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  )
}
