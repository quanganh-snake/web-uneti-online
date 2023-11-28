import { useBem } from '@/Hooks'
import { Post } from './Post'
import PropTypes from 'prop-types'

import './Posts.scss'

export const Posts = ({ posts }) => {
  const bem = useBem('posts')

  return (
    <div className={bem.b()}>
      {posts.map((post) => (
        <Post key={post.DT_CVNB_TBGD_TL_ID} {...post} />
      ))}
    </div>
  )
}

Posts.propTypes = {
  posts: PropTypes.array,
}
