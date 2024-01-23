import Button from '@/Components/Base/Button/Button'
import Dialog from '@/Components/Base/Dialog/Dialog'
import { useRef } from 'react'
import { useState } from 'react'

export default function XacNhanNopBai(props) {
    const [isOpen, setIsOpen] = useState(false)

    const dialogRef = useRef()

    const { TenMonHoc, onConfirm } = props

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
                        <b>Bài thi môn</b>
                        <p>{TenMonHoc}</p>
                    </div>
                }
                footer={
                    <div className="flex items-center justify-end gap-2">
                        <Button
                            type="transparent"
                            color="danger"
                            onClick={handleClose}
                        >
                            Quay lại làm
                        </Button>
                        <Button type="transparent" onClick={onConfirm}>
                            Nộp bài làm
                        </Button>
                    </div>
                }
            >
                Thời gian làm bài của bạn vẫn còn. Bạn vẫn muốn tiếp tục nộp
                bài?
            </Dialog>
        </>
    )
}
