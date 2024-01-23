import Button from '@/Components/Base/Button/Button'
import Dialog from '@/Components/Base/Dialog/Dialog'
import { useRef } from 'react'
import { useState } from 'react'

export default function XacNhanThi(props) {
  const [isOpen, setIsOpen] = useState(false)

  const dialogRef = useRef()

  const {
    TenMonHoc,
    TongCauHoi,
    ThoiGianThi = 60,
    onConfirm = () => null,
  } = props

  const onClose = () => {
    dialogRef.current.close()
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Vào thi</Button>

      <Dialog
        ref={dialogRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        header={
          <div className="text-center">
            <span className="font-medium">Bài thi môn</span>
            <p className="font-semibold text-lg">{TenMonHoc}</p>
          </div>
        }
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button type="transparent" color="danger" onClick={onClose}>
              Thôi
            </Button>
            <Button type="transparent" onClick={() => onConfirm(props)}>
              Bắt đầu thi
            </Button>
          </div>
        }
      >
        <div className="flex justify-between">
          <span>Tổng số câu:</span>
          <span className="font-medium">{TongCauHoi}</span>
        </div>
        <div className="flex justify-between">
          <span>Thời gian làm bài:</span>
          <span className="font-medium">{ThoiGianThi} phút</span>
        </div>
      </Dialog>
    </>
  )
}
