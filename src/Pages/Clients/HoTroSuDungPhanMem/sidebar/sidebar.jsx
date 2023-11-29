import { SidebarItem } from './SidebarItem/SidebarItem'
import { useBem } from '@/Hooks'
import PropTypes from 'prop-types'

import './Sidebar.scss'
import { useEffect, useState } from 'react'
import { getDataMenu } from '@/Apis/HoTroSuDungPhanMem/apiHoTroSuDungPhanMem'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import { useDispatch } from 'react-redux'
import { createAxiosJWT } from '@/Configs/http'
import { tokenSuccess } from '@/Services/Redux/Slice/authSlice'

export const Sidebar = ({ onCategoryChange, setSearch }) => {
  const bem = useBem('sidebar')

  const dataSv = DataSinhVien()
  const dataCBGV = DataCanBoGV()

  const dataToken = dataSv.dataToken ?? dataCBGV.dataToken

  const dispatch = useDispatch()
  let axiosJWT = createAxiosJWT(dataToken, dispatch, tokenSuccess)

  const [categories, setCategories] = useState([])

  const handleSidebarItemClick = (category) => {
    onCategoryChange(category)
    setSearch('')
  }

  useEffect(() => {
    getDataMenu(axiosJWT, dataToken.token).then((res) => {
      setCategories(res.data.body)
    })
  }, [])

  return (
    <div className={bem.b()}>
      <h3 className={bem.e('title')}>Danh mục tài liệu</h3>

      {categories?.map((e, index) => (
        <SidebarItem
          key={index}
          name={e.DT_CVNB_TBGD_TL_Nhom3}
          onClick={() => handleSidebarItemClick(e.DT_CVNB_TBGD_TL_Nhom3)}
        />
      ))}
    </div>
  )
}

Sidebar.props = {
  onCategoryChange: PropTypes.func,
  setSearch: PropTypes.func,
}
