import React from 'react'
import img_error403 from '@/assets/Images/error403.png'

export const Error403 = () => {
    return (
        <div className="bg-[#ecf4f7] w-full h-full">
            <div className="container">
                <div className="p-6">
                    <h1 className="text-3xl uppercase font-bold text-center my-6">
                        Bạn không có quyền truy cập vào trang này!
                    </h1>
                    <div className="w-full">
                        <img src={img_error403} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
