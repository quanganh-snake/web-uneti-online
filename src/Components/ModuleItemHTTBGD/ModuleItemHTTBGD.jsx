import { Link, useLocation } from 'react-router-dom'

function ModuleItemHTTBGD(props) {
  const { item } = props
  const location = useLocation()
  const { pathname } = location

  return (
    <Link to={`${pathname}${item.path}`}>
      <div className="bg-white p-8 rounded-[22px] h-full flex flex-col justify-center md:flex-row md:justify-start items-center shadow-sm">
        <img
          src={item.thumbnail}
          className="inline-block w-20 h-20"
          title={item.title}
          alt={item.title}
        />
        <div className="w-full h-[2px] md:w-[1px] md:h-full bg-uneti-primary my-4 md:my-0 ml-16"></div>
        <div className="px-4 w-full">
          <h2 className="uppercase font-semibold text-uneti-primary text-center text-lg mb-4">
            {item.title}
          </h2>
          <p
            className="text-uneti-primary text-center text-sm"
            dangerouslySetInnerHTML={{ __html: item.desc }}
          ></p>
        </div>
      </div>
    </Link>
  )
}

export default ModuleItemHTTBGD
