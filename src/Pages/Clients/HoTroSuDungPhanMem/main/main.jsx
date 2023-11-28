import { useState } from 'react'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { tokenSuccess } from '@/Services/Redux/Slice/authSlice'
import { useDispatch } from 'react-redux'
import { createAxiosJWT } from '@/Configs/http.js'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV.js'
import { useEffect } from 'react'
import { getDataHoTroSuDungPhanMem } from '@/Apis/HoTroSuDungPhanMem/apiHoTroSuDungPhanMem.js'

import { useBem } from '@/Hooks'
import { SearchBox } from './SearchBox'
import { Posts } from '../Posts'
import { Sidebar } from '../Sidebar'

import './Main.scss'

export const Main = () => {
  const bem = useBem('main')

  const dataSv = DataSinhVien()
  const dataCBGV = DataCanBoGV()

  const dataToken = dataSv.dataToken ?? dataCBGV.dataToken

  const dispatch = useDispatch()
  let axiosJWT = createAxiosJWT(dataToken, dispatch, tokenSuccess)

  const [category, setCategory] = useState({
    DT_CVNB_TBGD_TL_Nhom3: '',
    DT_CVNB_TBGD_TL_ID: null,
  })
  const [categories, setCategories] = useState([])
  const [posts, setPosts] = useState([])

  const [search, setSearch] = useState('')

  const onCategoryChange = (item) => {
    setCategory(item)
  }

  const handleSearch = (params = search) => {
    getDataHoTroSuDungPhanMem(axiosJWT, dataToken.token, params).then((res) => {
      const data = res.data.body

      const computeCategories = data.reduce((prev, curr) => {
        if (!prev.hasOwnProperty(curr['DT_CVNB_TBGD_TL_Nhom3'])) {
          prev[curr['DT_CVNB_TBGD_TL_Nhom3']] = true
          prev.push({
            DT_CVNB_TBGD_TL_ID: curr['DT_CVNB_TBGD_TL_ID'],
            DT_CVNB_TBGD_TL_Nhom3: curr['DT_CVNB_TBGD_TL_Nhom3'],
          })
        }
        return prev
      }, [])

      setPosts(data)

      if (!params) {
        setCategories(computeCategories)
      }
    })
  }

  useEffect(() => {
    handleSearch(category.DT_CVNB_TBGD_TL_Nhom3)
  }, [category])

  return (
    <>
      <h2 className={bem.e('title')}>Hỗ trợ sử dụng phần mềm</h2>
      <main className={bem.b()}>
        <Sidebar categories={categories} onCategoryChange={onCategoryChange} />

        <div className={bem.e('content')}>
          <SearchBox
            search={search}
            onSearch={handleSearch}
            setSearch={setSearch}
          />

          <Posts posts={posts} />
        </div>
      </main>
    </>
  )
}

Main.propTypes = {}
