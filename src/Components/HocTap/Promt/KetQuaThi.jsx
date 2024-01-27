import Button from '@/Components/Base/Button/Button'
import Dialog from '@/Components/Base/Dialog/Dialog'
import { useState } from 'react'

export default function KetQuaThi(props) {
  const [isOpen, setIsOpen] = useState(false)

  const { TongCauHoi, ThoiGianLamBai = 60, TenMonHoc } = props

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Xem kết quả</Button>

      <Dialog
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
            <Button type="transparent" color="danger">
              Huỷ
            </Button>
            <Button type="transparent">Xem đáp án</Button>
          </div>
        }
      >
        <div className="flex justify-between">
          <span>Tổng số câu:</span>
          <span>{TongCauHoi}</span>
        </div>
        <div className="flex justify-between">
          <span>Đã hoàn thành:</span>
          <span>{ThoiGianLamBai}</span>
        </div>
        <div className="flex justify-between">
          <span>Số câu đúng:</span>
          <span>{ThoiGianLamBai}</span>
        </div>
        <div className="flex justify-between">
          <span>Số câu sai:</span>
          <span>{ThoiGianLamBai}</span>
        </div>
      </Dialog>
    </>
  )
}
