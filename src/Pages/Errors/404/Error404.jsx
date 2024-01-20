import React from 'react'
import { Link } from 'react-router-dom'
import logoUNETI from '../../../assets/Images/LOGO_UNETI.ico'

function Error404() {
    return (
        <div className="relative right-0 left-0 w-full h-screen bg-sky-300 rounded-lg shadow-md">
            <div className="px-20 h-full flex items-center justify-center">
                <div className="grid grid-cols-12 flex-row justify-center items-center gap-16">
                    <div className="col-span-8">
                        <div className="flex flex-col justify-center items-center">
                            <div className="uneti-logo flex justify-center mb-5">
                                <img src={logoUNETI} alt="" />
                            </div>
                            <h2 className="text-5xl text-white font-bold mb-4">
                                UNETI - Page Not Found...
                            </h2>
                            <p className="text-white">
                                Không tìm thấy trang mà bạn cần tìm!
                            </p>
                            <div className="my-6">
                                <Link
                                    to="/uneti"
                                    className="px-3 py-2 text-sky-800 bg-slate-100 border border-slate-200 rounded-full hover:opacity-70"
                                >
                                    Quay về trang chủ &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="w-full h-full ">
                            <div className="w-[300px] h-[300px] rounded-full bg-white flex justify-center items-center shadow-lg">
                                <p className="text-9xl font-bold">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 ">
                                        4
                                    </span>
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 ">
                                        0
                                    </span>
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 ">
                                        4
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error404
