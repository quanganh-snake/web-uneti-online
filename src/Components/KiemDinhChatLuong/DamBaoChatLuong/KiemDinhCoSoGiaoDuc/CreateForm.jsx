import Button from '@/Components/Base/Button/Button'
import Dialog from '@/Components/Base/Dialog/Dialog'
import { Checkbox } from '@mui/material'
import { useRef } from 'react'
import { useState } from 'react'

export default function CreateForm(props) {
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef()

  const onCancel = () => {
    dialogRef.current.close()
  }

  const onSave = () => {
    dialogRef.current.close()
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="base-button bg-uneti-primary-lighter"
      >
        Thêm mới
      </button>

      <Dialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        ref={dialogRef}
        headerCenter={false}
        headerClass="bg-uneti-primary"
        header={
          <div className="font-semibold ml-7 py-2 text-gray-100 text-lg">
            <h3>Tạo hồ sơ kiểm định chất lượng CSGD</h3>
          </div>
        }
        footer={
          <div className="flex justify-end gap-3">
            <button onClick={onCancel} className="base-button bg-gray-500">
              Huỷ
            </button>
            <button onClick={onSave} className="base-button bg-uneti-primary">
              Lưu
            </button>
          </div>
        }
      >
        <div className="flex flex-col gap-4 my-2">
          <div className="flex gap-6">
            <span className="inline-block w-[200px]">CSGD</span>
            <span className="font-semibold">
              Trường Đại học Kinh tế - Kỹ thuật Công nghiệp
            </span>
          </div>
          <div className="flex gap-6">
            <span className="inline-block w-[200px]">
              Bộ tiêu chuẩn <span className="text-red-500">(*)</span>:
            </span>
            <div className="flex-1">
              <select className="w-full py-2 px-3 border border-gray-300 outline-none hover:border-blue-400 focus:ring-2 flex-1 rounded-lg">
                <option>Bộ GD&ĐT</option>
              </select>
            </div>
          </div>
          <div className="flex gap-6">
            <span className="inline-block w-[200px]">
              Mẫu báo cáo <span className="text-red-500">(*)</span>:
            </span>
            <div className="">
              <select className="py-2 px-3 border border-gray-300 outline-none hover:border-blue-400 focus:ring-2 flex-1 rounded-lg">
                <option>Mẫu báo cáo theo tiêu chuẩn bộ giáo dục</option>
              </select>
            </div>
          </div>
          <div className="flex gap-6">
            <span className="inline-block w-[200px]">
              Nhân bản dữ liệu của hồ sơ kiểm định khác
              <span className="text-red-500">(*)</span>:
            </span>
            <select className="py-2 px-3 border border-gray-300 outline-none hover:border-blue-400 focus:ring-2 flex-1 rounded-lg">
              <option>Chọn hồ sơ</option>
            </select>
          </div>
        </div>
      </Dialog>
    </>
  )
}
