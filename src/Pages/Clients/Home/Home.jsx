import { homeMain } from '@/Services/Static/dataStatic'
import { Link, useNavigate } from 'react-router-dom'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import Swal from 'sweetalert2'

function Home() {
  const navigate = useNavigate()
  const dataSV = DataSinhVien()
  const dataCBGV = DataCanBoGV()

  const handleInactiveModule = () => {
    return Swal.fire({
      icon: 'info',
      title: 'Chức năng này đang trong quá trình phát triển!',
      text: 'Vui lòng quay lại sau khi có thông báo chức năng hoàn thiện.',
    })
  }

  let role = null
  if (dataSV) {
    role = dataSV.Role
  } else if (dataCBGV) {
    role = dataCBGV.Role
  } else {
    role = null
  }

  if (role) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-20 px-4 xl:px-0">
        {homeMain.map((module, index) => {
          return module.moduleActive
            ? module.roleActive.includes(role) && (
                <Link
                  to={`${module.path}`}
                  key={index}
                  className="flex flex-col items-center p-10 bg-white cursor-pointer hover:shadow-sm rounded-[22px] border-2 border-uneti-primary/80 shadow-lg"
                >
                  <img
                    src={module.icon}
                    className="w-20 mb-4"
                    alt={module.title}
                  />
                  <h2 className="uppercase text-2xl font-semibold text-center text-sky-900 mb-4">
                    {module.title}
                  </h2>
                  <div className="line w-full h-[2px] bg-sky-900 mb-4"></div>
                  <p className="text-center text-sky-700">{module.desc}</p>
                </Link>
              )
            : module.roleActive.includes(role) && (
                <div
                  onClick={handleInactiveModule}
                  key={index}
                  className="flex flex-col items-center p-10 bg-white cursor-pointer hover:shadow-sm rounded-[22px] border-2 border-uneti-primary/80 shadow-lg"
                >
                  <img
                    src={module.icon}
                    className="w-20 mb-4"
                    alt={module.title}
                  />
                  <h2 className="uppercase text-2xl font-semibold text-center text-sky-900 mb-4">
                    {module.title}
                  </h2>
                  <div className="line w-full h-[2px] bg-sky-900 mb-4"></div>
                  <p className="text-center text-sky-700">{module.desc}</p>
                </div>
              )
        })}
      </div>
    )
  } else {
    navigate('/dang-nhap')
    return
  }
}

export default Home
