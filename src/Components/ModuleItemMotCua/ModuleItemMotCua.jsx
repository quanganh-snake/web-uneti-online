import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'

function ModuleItemMotCua(props) {
  const { moduleItemMotCua } = props
  const location = useLocation()
  const { pathname } = location

  return (
    <Link
      to={`${pathname}${moduleItemMotCua.path}`}
      className="uneti-motcua__module "
    >
      <div className="bg-white p-8 rounded-[22px] w-full h-full flex md:flex-col md:justify-start flex-row justify-center items-center shadow-module-item hover:shadow-none transition-all hover:border-uneti-primary-lighter border">
        <img
          src={moduleItemMotCua.thumbnail}
          className="inline-block w-20 h-20"
          title={moduleItemMotCua.title}
          alt={moduleItemMotCua.title}
        />
        <div className="w-full h-[2px] md:w-[1px] md:h-full bg-[#336699] my-4 md:my-0 mx-6"></div>
        <div className="uneti-motcua__content px-4 w-full">
          <h2 className="uppercase font-semibold text-[#336699] text-center text-2xl mb-4">
            {moduleItemMotCua.title}
          </h2>
          <p className="text-justify">
            {moduleItemMotCua.childrens.map((feature, index) => (
              <span key={index}>
                {index + 1 < moduleItemMotCua.childrens.length
                  ? feature.title + ', '
                  : feature.title + '.'}
              </span>
            ))}
          </p>
        </div>
      </div>
    </Link>
  )
}

ModuleItemMotCua.propTypes = {
  moduleItemMotCua: PropTypes.object.isRequired,
}

export default ModuleItemMotCua
