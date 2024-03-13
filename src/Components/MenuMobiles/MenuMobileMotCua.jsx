import clsx from 'clsx'
import React, { useState } from 'react'
import { IoMdMenu, IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'

function MenuMobileMotCua() {
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
              to={'/mot-cua'}
              onClick={() => {
                setShowMenu(false)
              }}
              className="block w-full p-3 text-white font-medium hover:text-black hover:bg-gray-200 hover:border hover:boder-slate-600"
            >
              Trang chủ
            </Link>
          </li>
          <li>
            <Link
              to={'/mot-cua/khao-thi'}
              onClick={() => {
                setShowMenu(false)
              }}
              className="block w-full p-3 text-white font-medium hover:text-black hover:bg-gray-200 hover:border hover:boder-slate-600"
            >
              Khảo thí
            </Link>
          </li>
          <li>
            <Link
              to={'/mot-cua/dao-tao'}
              onClick={() => {
                setShowMenu(false)
              }}
              className="block w-full p-3 text-white font-medium hover:text-black hover:bg-gray-200 hover:border hover:boder-slate-600"
            >
              Đào tạo
            </Link>
          </li>
          <li>
            <Link
              to={'/mot-cua/ct&ctsv'}
              onClick={() => {
                setShowMenu(false)
              }}
              className="block w-full p-3 text-white font-medium hover:text-black hover:bg-gray-200 hover:border hover:boder-slate-600"
            >
              CT&CTSV
            </Link>
          </li>
          <li>
            <Link
              to={'/mot-cua/hanh-chinh'}
              onClick={() => {
                setShowMenu(false)
              }}
              className="block w-full p-3 text-white font-medium hover:text-black hover:bg-gray-200 hover:border hover:boder-slate-600"
            >
              Hành chính
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default MenuMobileMotCua
