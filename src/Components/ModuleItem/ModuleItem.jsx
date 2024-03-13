import { Link, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'

function ModuleItem(props) {
  const { item } = props
  const location = useLocation()
  const { pathname } = location

  const handleInactiveModule = () => {
    return Swal.fire({
      icon: 'info',
      title: 'Chức năng này đang trong quá trình phát triển!',
      text: 'Vui lòng quay lại sau khi có thông báo chức năng hoàn thiện.',
    })
  }

  return (
    <>
      {item.moduleActive ? (
        <Link to={`${pathname}${item.path}`}>
          <div className="bg-white p-8 rounded-[22px] w-full h-full flex md:flex-col md:justify-start flex-row justify-center items-center shadow-module-item hover:shadow-none transition-all hover:border-uneti-primary-lighter border">
            <img
              src={item.thumbnail}
              className="inline-block w-8 h-8 md:w-20 md:h-20"
              title={item.title}
              alt={item.title}
            />
            <div className="w-[1px] h-full rounded-full bg-opacity-50 bg-uneti-primary my-0 ml-4 md:hidden"></div>

            <div className="px-4 w-full">
              <h2 className="uppercase mt-2 font-semibold text-uneti-primary text-center text-lg mb-4">
                {item.title}
              </h2>
              <div className="hidden md:block w-full h-[1px] rounded-full bg-opacity-50 bg-uneti-primary my-4"></div>
              <p
                className="text-uneti-primary text-center text-sm"
                dangerouslySetInnerHTML={{ __html: item.desc }}
              ></p>
            </div>
          </div>
        </Link>
      ) : (
        <div onClick={handleInactiveModule}>
          <div className="bg-white p-8 rounded-[22px] w-full h-full flex md:flex-col md:justify-start flex-row justify-center items-center shadow-sm">
            <img
              src={item.thumbnail}
              className="inline-block w-8 h-8 md:w-20 md:h-20"
              title={item.title}
              alt={item.title}
            />
            <div className="w-[1px] h-full rounded-full bg-opacity-50 bg-uneti-primary my-0 ml-4 md:hidden"></div>

            <div className="px-4 w-full">
              <h2 className="uppercase mt-2 font-semibold text-uneti-primary text-center text-lg mb-4">
                {item.title}
              </h2>
              <div className="hidden md:block w-full h-[1px] rounded-full bg-opacity-50 bg-uneti-primary my-4"></div>
              <p
                className="text-uneti-primary text-center text-sm"
                dangerouslySetInnerHTML={{ __html: item.desc }}
              ></p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ModuleItem
