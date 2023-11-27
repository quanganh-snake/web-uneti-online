import { useBem } from '@/Hooks'
import PropTypes from 'prop-types'

import './post.scss'

export const PostItem = ({ description, title, video }) => {
  const bem = useBem('post')

  const handleOpenVideo = () => {
    if (!video) return
    window.open(video)
  }
  return (
    <div className={bem.b()}>
      <h3 className={bem.e('title')}>{title}</h3>

      <p className={bem.e('description')}>{description}</p>

      {video && (
        <button className={bem.e('button')} onClick={handleOpenVideo}>
          Xem video
        </button>
      )}
    </div>
  )
}

PostItem.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  video: PropTypes.string,
}
