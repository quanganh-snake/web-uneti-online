import { useState } from 'react'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { tokenSuccess } from '@/Services/Redux/Slice/authSlice'

import { useBem } from '@/Hooks'
import { SearchBox } from './search-box.jsx'
import { Posts } from '../posts'
import { Sidebar } from '../sidebar'

import './main.scss'
import { useDispatch } from 'react-redux'
import { createAxiosJWT } from '@/Configs/http.js'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV.js'
import { useEffect } from 'react'
import { getDataHoTroSuDungPhanMem } from '@/Apis/HoTroSuDungPhanMem/apiHoTroSuDungPhanMem.js'

export const Main = () => {
  const bem = useBem('main')

  const dataSv = DataSinhVien()
  const dataCBGV = DataCanBoGV()

  const dataToken = dataSv.dataToken ?? dataCBGV.dataToken

  const dispatch = useDispatch()
  let axiosJWT = createAxiosJWT(dataToken, dispatch, tokenSuccess)

  const [category, setCategory] = useState()

  const [search, setSearch] = useState('a')

  const onCategoryChange = (item) => {
    setCategory(item)
  }

  const handleSearch = (text) => {
    setSearch(text)
  }

  useEffect(() => {
    getDataHoTroSuDungPhanMem(axiosJWT, dataToken.token, search).then((res) => {
      console.log(res)
    })
  }, [search])

  return (
    <>
      <h2 className={bem.e('title')}>Hỗ trợ sử dụng phần mềm</h2>
      <main className={bem.b()}>
        <Sidebar onCategoryChange={onCategoryChange} />

        <div className={bem.e('content')}>
          <SearchBox search={search} onSearch={handleSearch} />

          <Posts search={search} category={category} />
        </div>
      </main>
    </>
  )
}

Main.propTypes = {}
