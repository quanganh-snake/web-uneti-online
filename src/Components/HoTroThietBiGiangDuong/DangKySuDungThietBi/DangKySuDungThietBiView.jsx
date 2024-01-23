import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { breadcrumbs, home } from './constants'

function DangKySuDungThietBiView() {
    return (
        <div className="bg-vs-theme-layout rounded-2xl mx-4 lg:mx-0">
            <div className="p-4 flex flex-col gap-4">
                <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

                <div className="form-submit flex flex-col w-full justify-center bg-[#fff3cd] min-h-[500px]">
                    <h2 className="text-center uppercase text-2xl text-red-500 font-bold mb-6">
                        THÔNG BÁO GIỚI HẠN TÍNH NĂNG
                    </h2>
                    <p className="mx-4 font-bold text-[#856404] text-center">
                        Tính năng "Đăng ký sử dụng thiết bị" đang được phát
                        triển và sẽ được triển khai trong thời gian sắp tới !
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DangKySuDungThietBiView
