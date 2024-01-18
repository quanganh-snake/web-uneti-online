import { SidebarItem } from '../SidebarItem/SidebarItem'
import { useBem } from '@/Services/Hooks'

import './Sidebar.scss'
import { useState } from 'react'

export const Sidebar = ({ showSidebar, setShowSidebar, items, title }) => {
  const bem = useBem('sidebar')

  const [sidebarItem, setSidebarItem] = useState('')

  const handleSidebarItemClick = (item) => {
    if (!item?.children?.length) setSidebarItem(item.name)
    setShowSidebar(false)
  }

  return (
    <div className={`${bem.b()} ${bem.is('active', showSidebar)}`}>
      {title ? <h3 className={bem.e('title')}>{title}</h3> : null}

      {items?.map((e, index) => (
        <SidebarItem
          key={index}
          item={e}
          onClick={handleSidebarItemClick}
          modelValue={sidebarItem}
        />
      ))}
    </div>
  )
}

Sidebar.props = {}
