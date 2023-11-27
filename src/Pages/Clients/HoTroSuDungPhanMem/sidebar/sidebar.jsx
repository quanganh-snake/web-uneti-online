import { useEffect, useState } from 'react'
import { SidebarItem } from './sidebar-item.jsx'
import { useBem } from '@/Hooks'
import PropTypes from 'prop-types'

import './sidebar.scss'

export const Sidebar = ({ onCategoryChange }) => {
  const bem = useBem('sidebar')

  const [categories, setCategories] = useState([])

  useEffect(() => {
    // call api
  }, [])

  return (
    <div className={bem.b()}>
      <h3 className={bem.e('title')}>Danh mục tài liệu</h3>

      {categories.map((e) => (
        <SidebarItem
          key={e.id}
          id={e.id}
          name={e.name}
          onClick={() => onCategoryChange(e)}
        />
      ))}
    </div>
  )
}

Sidebar.props = {
  onCategoryChange: PropTypes.func,
}
