import Dialog from '@/Components/Base/Dialog/Dialog'
import { useState } from 'react'

export default function HuongDanSuDung() {
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  return (
    <>
      <button className="px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-xl hover:bg-sky-800 hover:text-white">
        Hướng dẫn sử dụng
      </button>

      <Dialog isOpen={isOpenDialog} setIsOpen={setIsOpenDialog}>
        Dialog ontent
      </Dialog>
    </>
  )
}
