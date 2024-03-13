import { useState } from 'react'
import { homeTTHCGV } from '../../Services/Static/dataStatic.js'
import { NavLink } from 'react-router-dom'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV.js'
import { ROLE_VIEW_ACTION_TTHCGV } from '@/Routers/privateRoutes.jsx'

function NavbarTTHCGV() {
  const [activeIndex, setActiveIndex] = useState(0)
  const dataCBGV = DataCanBoGV()
  const { HT_GROUPUSER_ID } = dataCBGV

  let roleViewAction
  if (HT_GROUPUSER_ID?.includes(ROLE_VIEW_ACTION_TTHCGV.QT_TTHCGV)) {
    roleViewAction = 'Admin'
  } else if (HT_GROUPUSER_ID?.includes(ROLE_VIEW_ACTION_TTHCGV.CBNV_TTHCGV)) {
    roleViewAction = 'CBNV'
  } else {
    roleViewAction = null
  }

  return (
    <div
      className="items-center justify-between hidden w-full lg:flex md:w-auto md:order-1"
      id="navbar-user"
    >
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {homeTTHCGV &&
          homeTTHCGV.map((module, index) => {
            const handleActive = () => {
              if (activeIndex === index) {
                setActiveIndex(null)
              } else {
                setActiveIndex(index)
              }
            }
            return (
              <li key={module.id}>
                <NavLink
                  to={module.path}
                  className={
                    module?.roleActive.includes(roleViewAction)
                      ? ({ isActive }) => {
                          return isActive
                            ? 'bg-sky-800 text-white px-3 py-2 rounded-full'
                            : 'hover:bg-sky-800 hover:text-white px-3 py-2 rounded-full'
                        }
                      : 'hidden'
                  }
                  aria-current="page"
                  onClick={handleActive}
                >
                  {module.name}
                </NavLink>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default NavbarTTHCGV
