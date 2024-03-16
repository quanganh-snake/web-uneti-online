import { useState } from 'react'
import PropTypes from 'prop-types'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import SidebarKDCL from './SidebarKDCL/SidebarKDCL'
import clsx from 'clsx'
import { IoMenu } from 'react-icons/io5'

const KDCLLayout = (props) => {
  const { children, sidebarList = [], home = {}, breadcrumbs = [] } = props

  const [openSidebar, setOpenSidebar] = useState(true)
  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar)
  }
  return (
    <>
      <div className="grid w-full grid-cols-12 items-start px-0 md:gap-6 md:px-4">
        {sidebarList.length ? (
          <div className="hidden h-full lg:col-span-2 lg:block">
            <SidebarKDCL
              titleSidebar={'Kiểm định chất lượng'}
              sidebarList={sidebarList}
              openSidebar={openSidebar}
              onOpenSidebar={handleOpenSidebar}
            />
          </div>
        ) : null}

        <div
          className={clsx(
            'h-full rounded-2xl bg-white shadow-lg',
            openSidebar ? 'col-span-12 lg:col-span-10' : 'col-span-12',
          )}
        >
          <div className="flex items-center gap-10 p-4">
            {!openSidebar && (
              <IoMenu
                size={24}
                onClick={handleOpenSidebar}
                className="cursor-pointer hover:opacity-50"
              />
            )}
            <div className="flex-1">
              <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
            </div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}

KDCLLayout.propTypes = {}

export default KDCLLayout
