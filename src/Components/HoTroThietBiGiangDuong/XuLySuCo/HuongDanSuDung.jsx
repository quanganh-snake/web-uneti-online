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
                className="duration-200 px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-xl hover:bg-sky-800 hover:text-white"
            >
                Hướng dẫn sử dụng
            </button>

            <Dialog
                ref={dialogRef}
                isOpen={isOpenDialog}
                setIsOpen={setIsOpenDialog}
                header={
                    <h2 className="uppercase text-uneti-primary text-lg font-semibold">
                        HƯỚNG DẪN THAO TÁC GỬI YÊU CẦU XỬ LÝ SỰ CỐ
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
                    1. Chức năng: Xử lý sự cố:
                </h2>
                <div>
                    <div>
                        <h3 className="font-semibold italic py-2">
                            1.1 Giới thiệu: Để xử lý các sự cố trong các phòng
                            học tại thời điểm đó.
                        </h3>
                    </div>
                    <div>
                        <h3 className="font-semibold italic py-2">
                            1.2 Các bước thực hiện và minh họa thao tác xử lý sự
                            cố:
                        </h3>
                        <ul className="flex flex-col gap-4 mb-4">
                            <li>
                                - Bước 1: Tích chọn vào ô tròn trước lớp học
                                đang có thiết bị hỏng vừa được xử lý.
                            </li>

                            <li>
                                - Bước 2: Ấn nút
                                <span className="text-vs-danger">
                                    "Xác nhận sửa chữa"
                                </span>{' '}
                                để xác nhận nguyên nhân và kết quả khắc phục.
                            </li>

                            <li>
                                - Bước 3: Ấn vào hộp nguyên nhân, lúc này danh
                                sách nguyên nhân đổ ra. Ấn chọn nguyên nhân gây
                                ra sự cố.
                            </li>

                            <li>
                                - Bước 4: Ấn vào hộp kết quả khắc phục, lúc này
                                danh sách kết quả khắc phục đổ ra. Ấn chọn kết
                                quả khắc phục sự cố.
                            </li>
                            <li>
                                - Bước 5: Ấn nút
                                <span className="text-vs-danger">
                                    "Xác nhận hoàn thành"
                                </span>{' '}
                                để xác nhận hoàn thành cập nhật nguyên nhân và
                                kết quả khắc phục của sự cố.
                            </li>
                        </ul>
                        <div>
                            <p className="text-vs-danger italic font-semibold">
                                Lưu ý: Sau khi xử lý sự cố thành công thì thông
                                báo sẽ hiển thị.
                            </p>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
