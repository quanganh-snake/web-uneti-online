import { useBem } from '@/Hooks'
import PropTypes from 'prop-types'

import './Post.scss'

const LINK_YOUTUBE_REGEX =
  /https:\/\/www\.youtube\.com\/playlist\?list=([^\s]+)/

export const Post = ({ DT_CVNB_TBGD_TL_Ten, DT_CVNB_TBGD_TL_GhiChu }) => {
  const bem = useBem('post')

  let video = ''

  const linkYoutubeInDescription =
    DT_CVNB_TBGD_TL_GhiChu.match(LINK_YOUTUBE_REGEX)
  if (linkYoutubeInDescription) {
    video = linkYoutubeInDescription[0]
  }

  const handleOpenVideo = () => {
    if (!video) return
    window.open(video)
  }
  return (
    <div className={bem.b()}>
      <h3 className={bem.e('title')}>{DT_CVNB_TBGD_TL_Ten}</h3>

      <p className={bem.e('description')}>{DT_CVNB_TBGD_TL_GhiChu}</p>

      {video && (
        <button className={bem.e('button')} onClick={handleOpenVideo}>
          Xem video
        </button>
      )}
    </div>
  )
}

Post.propTypes = {
  DT_CVNB_TBGD_TL_Ten: PropTypes.string,
  DT_CVNB_TBGD_TL_GhiChu: PropTypes.string,
}
