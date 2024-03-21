import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa6'
import { useState } from 'react'
import clsx from 'clsx'

export const getMenus = (menus = [], menuIndex = 0) => {
  const [activeMenuIndex, setActiveMenuIndex] = useState(0)
  const navigate = useNavigate()

  const handleOpenMenu = () => {}

  const handleActive = (path, index) => {
    if (activeMenuIndex === index) {
      setActiveMenuIndex(null)
    } else {
      setActiveMenuIndex(index)
    }
    if (path) {
      navigate(path)
    }
  }

  if (menus.length > 0) {
    return (
      <ul className="flex flex-col gap-2">
        {menus.map(({ path, label, children, sidebarActive }, index) => {
          const isActive = index === activeMenuIndex
          if (!sidebarActive) return null

          if (children?.length > 0) {
            return (
              <li key={index}>
                <div
                  onClick={() => handleActive(path, index)}
                  className={clsx(
                    'flex rounded-lg cursor-pointer items-center justify-between p-2 font-semibold hover:bg-uneti-primary hover:text-white',
                    isActive &&
                      'bg-uneti-primary text-white rounded-[10px_10px_0_0]',
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
                </div>

                <div
                  className={clsx(
                    isActive
                      ? 'cursor-pointer overflow-hidden rounded-[0_0_10px_10px] bg-uneti-primary-lighter text-white transition delay-300 ease-in-out'
                      : 'hidden',
                  )}
                >
                  {getMenus(children, menuIndex + 1)}
                </div>
              </li>
            )
          }

          return (
            <li key={index}>
              <div
                onClick={() => handleActive(path, index)}
                className={clsx(
                  'text-md cursor-pointer p-2 font-semibold hover:bg-uneti-primary hover:text-white',
                  menuIndex == 0 && 'rounded-lg',
                )}
              >
                {label}
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
}
