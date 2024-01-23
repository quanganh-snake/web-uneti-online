import React, { useState } from 'react'
import clsx from 'clsx'
import { IoMdMenu, IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'

function MenuMobile() {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <>
            {showMenu ? (
                <IoMdClose
                    size={32}
                    color="red"
                    className="hover:opacity-70"
                    onClick={() => {
                        setShowMenu(false)
                    }}
                />
            ) : (
                <IoMdMenu
                    size={32}
                    color="#336699"
                    className="hover:opacity-70"
                    onClick={() => {
                        setShowMenu(true)
                    }}
                />
            )}

            <div
                className={clsx(
                    'absolute left-0 right-0 top-[100%] w-full bg-[#336699]',
                    showMenu
                        ? 'block animate__animated animate__fadeInLeft'
                        : 'animate__animated animate__fadeOutLeft',
                )}
            >
                <ul>
                    <li>
                        <Link
                            to={'/uneti'}
                            className="block w-full p-3 text-white font-medium hover:text-black hover:bg-gray-200 hover:border hover:boder-slate-600"
                        >
                            Trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={'/admin/canbonghiepvu'}
                            className="block w-full p-3 text-white font-medium hover:text-black hover:bg-gray-200 hover:border hover:boder-slate-600"
                        >
                            Cán bộ nghiệp vụ
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={'/admin/quantriTTHCGV'}
                            className="block w-full p-3 text-white font-medium hover:text-black hover:bg-gray-200 hover:border hover:boder-slate-600"
                        >
                            Quản trị hệ thống
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default MenuMobile
