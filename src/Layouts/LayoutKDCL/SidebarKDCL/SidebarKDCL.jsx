import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { IoMenu, IoClose } from 'react-icons/io5'
import { getMenus } from '@/Services/Utils/menuUtils'

const SidebarKDCL = (props) => {
  const { titleSidebar, sidebarList, openSidebar, onOpenSidebar } = props

  return (
    <>
      <div
        className={clsx(
          'h-full p-3 overflow-hidden rounded-2xl bg-white shadow-module-item',
          openSidebar ? 'w-full' : 'hidden',
        )}
      >
        <div className="mb-4 flex items-center justify-between border-b p-3 text-uneti-primary">
          {titleSidebar && (
            <h3 className="text-lg font-bold uppercase">{titleSidebar}</h3>
          )}
          {openSidebar ? (
            <IoMenu
              onClick={onOpenSidebar}
              size={26}
              className="cursor-pointer hover:opacity-70"
            />
          ) : (
            <IoClose
              onClick={onOpenSidebar}
              size={26}
              className="cursor-pointer text-red-600 hover:opacity-70"
            />
          )}
        </div>
        {getMenus(sidebarList)}
      </div>
    </>
  )
}

SidebarKDCL.propTypes = {}

export default SidebarKDCL
