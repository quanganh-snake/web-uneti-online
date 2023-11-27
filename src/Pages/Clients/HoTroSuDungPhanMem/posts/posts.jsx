import { useBem } from '@/Hooks'
import { PostItem } from './post-item'
import PropTypes from 'prop-types'

import { useEffect, useMemo, useState } from 'react'

import './posts.scss'

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
        <PostItem key={post.id} {...post} />
      ))}
    </div>
  )
}

Posts.propTypes = {
  search: PropTypes.string,
  category: PropTypes.string,
}
