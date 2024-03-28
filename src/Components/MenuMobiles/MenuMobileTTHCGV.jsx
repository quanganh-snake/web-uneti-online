import React, { useState } from 'react'
import clsx from 'clsx'
import { IoMdMenu, IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import { simpleSHA256 } from '@/Services/Utils/stringUtils'
import { ROLE_VIEW_ACTION_TTHCGV } from '@/Routers/privateRoutes'

function MenuMobileTTHCGV() {
  const [showMenu, setShowMenu] = useState(false)
  const dataCBGV = DataCanBoGV()
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
              to={'/admin/xu-ly-nghiep-vu'}
              onClick={() => {
                setShowMenu(false)
              }}
              className={clsx(
                'block w-full p-3 text-white font-medium hover:text-black hover:bg-gray-200 hover:border hover:boder-slate-600',
                dataCBGV.HT_GROUPUSER_ID?.includes('16') === false && 'hidden',
              )}
            >
              Xử lý nghiệp vụ
            </Link>
          </li>
          <li>
            <Link
              to={'/admin/quan-tri-TTHCGV'}
              onClick={() => {
                setShowMenu(false)
              }}
              className={clsx(
                'block w-full p-3 text-white font-medium hover:text-black hover:bg-gray-200 hover:border hover:boder-slate-600',
                dataCBGV.HT_GROUPUSER_ID?.includes('15') === false && 'hidden',
              )}
            >
              Quản trị đơn vị
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default MenuMobileTTHCGV
