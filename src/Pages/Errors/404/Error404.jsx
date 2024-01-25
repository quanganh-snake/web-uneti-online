import React from 'react'
import { Link } from 'react-router-dom'
import logoUNETI from '../../../assets/Images/LOGO_UNETI.ico'

function Error404() {
  return (
    <div className="max-w-7xl mx-auto text-slate-700">
      <div className="px-20 flex items-center justify-evenly w-full h-96">
        <div className="h-full relative">
          <div className="flex flex-col">
            <div className="flex items-center gap-5 relative top-0 left-0">
              <span className="text-[140px] font-bold text-slate-300">4</span>
              <span className="text-[140px] font-bold text-slate-300">0</span>
              <span className="text-[140px] font-bold text-slate-300">4</span>
              <h3 className="text-[90px] font-bold text-slate-600 absolute bottom-0 right-0">
                Oops!
              </h3>
            </div>
          </div>
          <div className="mt-4">
            <div>
              <h3 className="text-2xl">Uneti - Page not found</h3>
              <div className="max-w-sm mt-1">
                Trang bạn đang truy cập không tồn tại, vui lòng kiểm tra lại
                đường dẫn!
              </div>
            </div>
            <Link to="/uneti">
              <button className="mt-8 border-none outline-none rounded-xl bg-[#336699] text-white px-8 py-2">
                Về trang chủ
              </button>
            </Link>
          </div>
        </div>
        <div className="uneti-logo flex justify-center mb-5">
          <img src={logoUNETI} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Error404
