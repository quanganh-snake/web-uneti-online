import { useBem } from '@/Hooks'
import { Post } from './Post'
import PropTypes from 'prop-types'

import './Posts.scss'
import { useState } from 'react'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import { useDispatch } from 'react-redux'
import { createAxiosJWT } from '@/Configs/http'
import { tokenSuccess } from '@/Services/Redux/Slice/authSlice'
import { useEffect } from 'react'
import { getDataHoTroSuDungPhanMem } from '@/Apis/HoTroSuDungPhanMem/apiHoTroSuDungPhanMem'
import { useMemo } from 'react'

export const Posts = ({ category, search }) => {
  const bem = useBem('posts')

  const dataSv = DataSinhVien()
  const dataCBGV = DataCanBoGV()

  const dataToken = dataSv.dataToken ?? dataCBGV.dataToken

  const dispatch = useDispatch()
  let axiosJWT = createAxiosJWT(dataToken, dispatch, tokenSuccess)

  const [posts, setPosts] = useState([])

  useEffect(() => {
    getDataHoTroSuDungPhanMem(axiosJWT, dataToken.token, search).then((res) => {
      setPosts(res.data.body)
    })
  }, [search])

  const getPosts = useMemo(() => {
    return posts.filter((e) => e.DT_CVNB_TBGD_TL_Nhom3?.includes(category))
  }, [category, posts])

  return (
    <div className={bem.b()}>
      {getPosts.map((post) => (
        <Post key={post.DT_CVNB_TBGD_TL_ID} {...post} />
      ))}
    </div>
  )
}

Posts.propTypes = {
  category: PropTypes.string,
  search: PropTypes.string,
}
