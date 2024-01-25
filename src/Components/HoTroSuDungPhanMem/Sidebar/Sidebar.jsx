import { SidebarItem } from '../SidebarItem/SidebarItem'
import { useBem } from '@/Services/Hooks'
import PropTypes from 'prop-types'

import './Sidebar.scss'
import { useEffect, useState } from 'react'
import { getDataMenu } from '@/Apis/HoTroSuDungPhanMem/apiHoTroSuDungPhanMem'
import { useNavigate } from 'react-router-dom'

export const Sidebar = ({
  category,
  onCategoryChange,
  setSearch,
  showSidebar,
  setShowSidebar,
}) => {
  const bem = useBem('htsdpm-sidebar')

  const [categories, setCategories] = useState([])

  const handleSidebarItemClick = (category) => {
    onCategoryChange(category)

    if (category === 'Video hướng dẫn website Một cửa') {
      return window.open(
        'https://demosupportphanmem.uneti.edu.vn/Pages/VideoSComHuongDan/index.html',
        '_blank',
      )
    }

    setSearch('')
    setShowSidebar(false)
  }

  useEffect(() => {
    getDataMenu().then((res) => {
      setCategories(res.data.body)
    })
  }, [])

  return (
    <div className={`${bem.b()} ${bem.is('active', showSidebar)}`}>
      <h3 className={bem.e('title')}>Danh mục tài liệu</h3>

      {categories?.map((e, index) => (
        <SidebarItem
          key={index}
          name={e.DT_CVNB_TBGD_TL_Nhom3}
          onClick={() => handleSidebarItemClick(e.DT_CVNB_TBGD_TL_Nhom3)}
          active={category === e.DT_CVNB_TBGD_TL_Nhom3}
        />
      ))}
      <SidebarItem
        name={'Video hướng dẫn website Một cửa'}
        onClick={() =>
          handleSidebarItemClick('Video hướng dẫn website Một cửa')
        }
        active={category === 'Video hướng dẫn website Một cửa'}
      />
    </div>
  )
}

Sidebar.props = {
  category: PropTypes.string,
  onCategoryChange: PropTypes.func,
  setSearch: PropTypes.func,
  showSidebar: PropTypes.bool,
  setShowSidebar: PropTypes.func,
}
