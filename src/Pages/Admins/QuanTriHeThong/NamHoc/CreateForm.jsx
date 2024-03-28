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
            <h3>Thêm năm học</h3>
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
        <div className="flex gap-6 items-center">
          <span className="inline-block w-[200px]">
            Năm học <span className="text-red-500">(*)</span>:
          </span>
          <input type="text" className="base-input w-full" />
        </div>
      </Dialog>
    </>
  )
}
