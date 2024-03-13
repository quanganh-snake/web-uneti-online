import img_error403 from '@/assets/Images/error403.png'
import { Link } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'

export const Error403 = () => {
  return (
    <div className="bg-[#ecf4f7] w-full h-full shadow-lg rounded-2xl">
      <div className="container">
        <div className="p-6 flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl uppercase font-bold text-center my-6">
            Bạn không có quyền truy cập vào trang này!
          </h1>
          <Link
            to="/uneti"
            className="py-2 px-4 bg-slate-400 text-white font-semibold rounded-lg flex items-center gap-2 hover:bg-slate-200 hover:text-slate-600 shadow-md"
          >
            <FaArrowLeftLong />
            Quay lại trang chủ
          </Link>
          <div className="w-full">
            <img src={img_error403} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
