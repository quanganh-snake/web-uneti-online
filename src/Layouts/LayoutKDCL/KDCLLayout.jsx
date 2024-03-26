import { useState } from 'react'
import PropTypes from 'prop-types'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import SidebarKDCL from './SidebarKDCL/SidebarKDCL'
import clsx from 'clsx'
import { IoMenu } from 'react-icons/io5'
import { Outlet } from 'react-router-dom'
import { kiemdinhSidebar as sidebarList } from './constants'

import './KDCLLayout.scss'
import { transformCls } from '@/Services/Utils/reactUtils'

const KDCLLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(true)
  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar)
  }
  return (
    <>
      <div className="grid -mt-20 w-full grid-cols-12 items-start px-0 md:gap-4">
        {sidebarList.length ? (
          <div className="hidden h-max lg:col-span-2 lg:block">
            <SidebarKDCL
              titleSidebar={'Kiểm định chất lượng'}
              sidebarList={sidebarList}
              openSidebar={openSidebar}
              onOpenSidebar={handleOpenSidebar}
            />
          </div>
        ) : null}

        <div
          className={transformCls([
            'h-max',
            openSidebar ? 'col-span-12 lg:col-span-10' : 'col-span-12',
          ])}
        >
          <div className="flex items-center gap-10">
            {!openSidebar && (
              <div className="p-4">
                <IoMenu
                  size={24}
                  onClick={handleOpenSidebar}
                  className="cursor-pointer hover:opacity-50"
                />
              </div>
            )}
          </div>
          <Outlet />
        </div>
      </div>
    </>
  )
}

KDCLLayout.propTypes = {}

export default KDCLLayout
