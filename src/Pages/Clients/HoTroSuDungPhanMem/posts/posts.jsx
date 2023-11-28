import { useBem } from '@/Hooks'
import { Post } from './Post'
import PropTypes from 'prop-types'

import { useEffect, useMemo, useState } from 'react'

import './Posts.scss'

export const Posts = ({ category, search }) => {
  const bem = useBem('posts')

  const [posts, setPosts] = useState([])

  const getSearch = useMemo(() => {
    return posts.filter((post) => post.title.includes(search))
  }, [posts, search])

  useEffect(() => {
    // call api
  }, [category])

  return (
    <div className={bem.b()}>
      {getSearch.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  )
}

Posts.propTypes = {
  search: PropTypes.string,
  category: PropTypes.string,
}
