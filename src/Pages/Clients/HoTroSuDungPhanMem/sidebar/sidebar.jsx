import { SidebarItem } from './SidebarItem/SidebarItem'
import { useBem } from '@/Hooks'
import PropTypes from 'prop-types'

import './Sidebar.scss'

export const Sidebar = ({ onCategoryChange, categories }) => {
  const bem = useBem('sidebar')

  return (
    <div className={bem.b()}>
      <h3 className={bem.e('title')}>Danh mục tài liệu</h3>

      {categories?.map((e) => (
        <SidebarItem
          key={e.DT_CVNB_TBGD_TL_ID}
          id={e.DT_CVNB_TBGD_TL_ID}
          name={e.DT_CVNB_TBGD_TL_Nhom3}
          onClick={() => onCategoryChange(e)}
        />
      ))}
    </div>
  )
}

Sidebar.props = {
  onCategoryChange: PropTypes.func,
  categories: PropTypes.array,
}
