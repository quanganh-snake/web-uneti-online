import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'

function FeatureItem(props) {
  const { icon, featureItem } = props
  const location = useLocation()
  const { pathname } = location

  return (
    <div className="text-vs-text feature__item min-h-[200px] h-full bg-white p-4 pb-20 rounded-exclude-tl shadow-sm flex flex-col relative">
      <div className="feature--header flex items-center gap-4 border-b-2 pb-2 border-uneti-primary">
        <img src={icon} className="w-14" alt={featureItem.title} />
        <h2 className="text-xl font-semibold">{featureItem.title}</h2>
      </div>
      <div className="feature--body my-4">
        <p dangerouslySetInnerHTML={{ __html: featureItem.desc }}></p>
      </div>
      <div className="feature--footer flex justify-end absolute bottom-3 right-3">
        <Link
          to={pathname + featureItem.path}
          className="px-3 py-2 bg-white text-uneti-primary font-semibold border border-sky-900 rounded-xl hover:bg-uneti-primary hover:text-white"
        >
          Gửi yêu cầu
        </Link>
      </div>
    </div>
  )
}

FeatureItem.propTypes = {
  featureItem: PropTypes.object.isRequired,
}

export default FeatureItem
