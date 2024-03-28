import { useState } from 'react'
import { homeTTHCGV } from '../../Services/Static/dataStatic.js'
import { NavLink } from 'react-router-dom'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV.js'
import { ROLE_VIEW_ACTION_TTHCGV } from '@/Routers/privateRoutes.jsx'
import clsx from 'clsx'
import { simpleSHA256 } from './../../Services/Utils/stringUtils'

function NavbarTTHCGV() {
  const dataCBGV = DataCanBoGV()
  const { HT_GROUPUSER_ID } = dataCBGV

  let roleViewAction = []
  if (HT_GROUPUSER_ID?.includes(ROLE_VIEW_ACTION_TTHCGV.QT_TTHCGV)) {
    roleViewAction.push(simpleSHA256('Admin'))
    roleViewAction.push(simpleSHA256('GV'))
  }

  if (
    HT_GROUPUSER_ID?.includes(ROLE_VIEW_ACTION_TTHCGV.CBNV_TTHCGV) ||
    HT_GROUPUSER_ID?.includes(ROLE_VIEW_ACTION_TTHCGV.TP_TTHCGV) ||
    HT_GROUPUSER_ID?.includes(ROLE_VIEW_ACTION_TTHCGV.BGH_TTHCGV)
  ) {
    roleViewAction.push(simpleSHA256('CBNV'))
    roleViewAction.push(simpleSHA256('GV'))
  }

  return (
    <div
      className="items-center justify-between hidden w-full lg:flex md:w-auto md:order-1"
      id="navbar-user"
    >
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {homeTTHCGV &&
          homeTTHCGV.map((module, index) => {
            let roleNav = module?.roleActive?.every((value) =>
              roleViewAction.includes(value),
            )
            return (
              <li
                key={module.id}
                className={clsx(roleNav === true ? '' : 'hidden')}
              >
                <NavLink
                  to={module.path}
                  className={({ isActive }) => {
                    return isActive
                      ? 'bg-sky-800 text-white px-3 py-2 rounded-full'
                      : 'hover:bg-sky-800 hover:text-white px-3 py-2 rounded-full'
                  }}
                  aria-current="page"
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
