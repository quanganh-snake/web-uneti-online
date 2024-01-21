import { SidebarItem } from '../SidebarItem/SidebarItem'
import { useBem } from '@/Services/Hooks'

import './Sidebar.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Sidebar = ({
  showSidebar,
  setShowSidebar = () => null,
  items,
  title,
}) => {
  const bem = useBem('sidebar')

  const router = useNavigate()

  const [sidebarItem, setSidebarItem] = useState('')

  const handleSidebarItemClick = (item) => {
    setSidebarItem(item.name)
    setShowSidebar(false)
  }

  useEffect(() => {
    if (sidebarItem) router(sidebarItem)
  }, [sidebarItem])

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
