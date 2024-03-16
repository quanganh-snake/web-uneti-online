import { Link, NavLink } from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa6'
import { useState } from 'react'
import clsx from 'clsx'

export const getMenus = (menus = []) => {
  const [activeMenuIndex, setActiveMenuIndex] = useState(0)

  const handleOpenMenu = () => {}

  if (menus.length > 0) {
    return (
      <ul className="flex flex-col gap-2">
        {menus.map(({ path, label, children }, index) => {
          const handleActive = () => {
            if (activeMenuIndex === index) {
              setActiveMenuIndex(null)
            } else {
              setActiveMenuIndex(index)
            }
          }
          const isActive = index === activeMenuIndex

          if (children?.length > 0) {
            return (
              <li key={index}>
                <Link
                  to={path}
                  onClick={handleActive}
                  className={clsx(
                    'flex items-center justify-between p-2 font-semibold hover:bg-uneti-primary hover:text-white',
                    isActive && 'bg-uneti-primary text-white',
                  )}
                >
                  <p className={clsx('text-md')}>{label}</p>
                  <FaAngleRight
                    className={
                      isActive
                        ? 'animate__animated rotate-90 transition ease-in-out'
                        : null
                    }
                  />
                </Link>

                <div
                  className={clsx(
                    isActive
                      ? 'block bg-uneti-primary-lighter text-white transition delay-300 ease-in-out'
                      : 'hidden',
                  )}
                >
                  {getMenus(children)}
                </div>
              </li>
            )
          }

          return (
            <li key={index}>
              <NavLink
                to={path}
                className={clsx(
                  'text-md block p-2 font-semibold hover:bg-uneti-primary hover:text-white',
                )}
              >
                {label}
              </NavLink>
            </li>
          )
        })}
      </ul>
    )
  }
}
