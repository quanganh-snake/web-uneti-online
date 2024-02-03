import Button from '@/Components/Base/Button/Button'
import Dialog from '@/Components/Base/Dialog/Dialog'
import { useRef } from 'react'
import { useState } from 'react'

export default function XacNhanNopBai(props) {
  const [isOpen, setIsOpen] = useState(false)

  const dialogRef = useRef()

  const { TenMonHoc, onConfirm, DaLam, TongCauHoi } = props

  const handleClose = () => {
    dialogRef.current.close()
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Nộp bài</Button>

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
            <Button type="transparent" color="danger" onClick={handleClose}>
              Quay lại làm
            </Button>
            <Button type="transparent" onClick={onConfirm}>
              Nộp bài làm
            </Button>
          </div>
        }
      >
        {DaLam < TongCauHoi ? (
          <p>
            Bạn đã làm {DaLam}/{TongCauHoi} câu
          </p>
        ) : null}
        <p>Thời gian làm bài của bạn vẫn còn. </p>

        <p>Bạn vẫn muốn tiếp tục nộp bài?</p>
      </Dialog>
    </>
  )
}
