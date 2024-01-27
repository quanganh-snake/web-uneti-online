import { useNamespace } from '@/Services/Hooks'
import { Post } from '../Post/Post'
import PropTypes from 'prop-types'

import './Posts.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import { getDataHoTroSuDungPhanMem } from '@/Apis/HoTroSuDungPhanMem/apiHoTroSuDungPhanMem'
import { useMemo } from 'react'
import { Pagination } from '@mui/material'

export const Posts = ({ category, search }) => {
  const bem = useNamespace('posts')

  const [posts, setPosts] = useState([])

  const [page, setPage] = useState(1)

  useEffect(() => {
    getDataHoTroSuDungPhanMem(search).then((res) => {
      setPosts(res.data.body)
    })
  }, [search])

  const postsPerPage = 3

  const handleChange = (e, value) => {
    setPage(value)
  }

  const getPosts = useMemo(() => {
    setPage(1)
    return posts.filter(
      (e) => !category || e.DT_CVNB_TBGD_TL_Nhom3 === category,
    )
  }, [category, posts])

  const totalPage = useMemo(
    () => Math.ceil(getPosts.length / postsPerPage),
    [getPosts],
  )

  const postsShow = getPosts.slice(
    postsPerPage * (page - 1),
    postsPerPage * (page - 1) + postsPerPage,
  )

  return (
    <div className={bem.b()}>
      {postsShow.length ? (
        postsShow.map((post, index) => <Post key={index} {...post} />)
      ) : (
        <h3 className={bem.e('empty')}>Hiện chưa có tài liệu hướng dẫn nào</h3>
      )}

      <div className={bem.e('pagination')}>
        {totalPage > 1 && (
          <Pagination count={totalPage} page={page} onChange={handleChange} />
        )}
      </div>
    </div>
  )
}

Posts.propTypes = {
  category: PropTypes.string,
  search: PropTypes.string,
}
