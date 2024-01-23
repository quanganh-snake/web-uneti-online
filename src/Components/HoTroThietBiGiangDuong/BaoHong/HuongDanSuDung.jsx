import Dialog from '@/Components/Base/Dialog/Dialog'
import { useRef } from 'react'
import { useState } from 'react'

export default function HuongDanSuDung() {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const dialogRef = useRef()

  return (
    <>
      <button
        onClick={() => setIsOpenDialog(true)}
        className="cursor-pointer duration-200 px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-xl hover:bg-sky-800 hover:text-white"
      >
        Hướng dẫn sử dụng
      </button>

      <Dialog
        ref={dialogRef}
        isOpen={isOpenDialog}
        setIsOpen={setIsOpenDialog}
        header={
          <h2 className="uppercase text-uneti-primary text-lg font-semibold">
            Hướng dẫn thao tác báo hỏng
          </h2>
        }
        footer={
          <div className="flex justify-end">
            <button
              onClick={() => dialogRef.current.close()}
              className="rounded-xl outline-none border-none px-8 py-2 bg-uneti-primary text-white"
            >
              OK
            </button>
          </div>
        }
      >
        <h2 className="text-uneti-primary text-opacity-80 italic font-semibold">
          1. Chức năng: báo hỏng
        </h2>
        <div>
          <div>
            <h3 className="font-semibold italic py-2">
              1.1: Giới thiệu: Để báo hỏng các thiết bị phòng học
            </h3>
          </div>
          <div>
            <h3 className="font-semibold italic py-2">
              1.2: Các bước thực hiện và minh hoạ thao tác
            </h3>
            <ul className="flex flex-col gap-4 mb-4">
              <li>
                - Bước 1: Thực hiện theo phương án khắc phục nếu có. Trường hợp
                ô phương án khắc phục trống hoặc đã thực hiện theo nhưng không
                thành công thì thực hiện sang bước 2. Ảnh
              </li>

              <li>
                - Bước 2: Tích chọn vào ô tròn trước lớp học chứa thiết bị muốn
                báo hỏng.
              </li>

              <li>
                - Bước 3: Tích chọn vào các ô vuông trước các sự cố trong danh
                sách sự cố.
              </li>

              <li>
                - Bước 4: Ấn nút &quot;Báo hỏng&quot; để hoàn tất báo hòng thiết
                bị.
              </li>
            </ul>
            <div>
              <p className="text-vs-danger italic font-semibold">
                Lưu ý quan trọng: Sau khi hiện thông báo báo hỏng thành công,
                thông tin cán bộ kỹ thuật trực thời gian đó sẽ được hiển thị.
                Giảng viên có thể liên hệ theo số điện thoại nếu cần.
              </p>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}
