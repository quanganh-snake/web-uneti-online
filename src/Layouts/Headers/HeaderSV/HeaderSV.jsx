import { Link, useNavigate } from 'react-router-dom'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useBem } from '@/Services/Hooks/useBem.js'
// data
import noAvatar from '@/assets/Images/noavatar.png'
import logoUNETI from '@/assets/Images/LOGO_UNETI.ico'
import { useDispatch } from 'react-redux'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import NavbarMotCua from '@/Components/Navbars/NavbarMotCua.jsx'
import DropdownProfileStudent from '../DropdownProfileStudent.jsx'
import MenuMobileMotCua from '@/Components/MenuMobiles/MenuMobileMotCua.jsx'
import { logOut } from '@/Apis/apiLogout'
import { store } from '@/Services/Redux/store.js'

import './HeaderSV.scss'

function HeaderSV() {
  const bem = useBem('header')

  const dataSV = DataSinhVien()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const state = store.getState()
  const refreshToken = state?.auth?.login?.currentToken?.refreshToken
  console.log(
    '🚀 ~ file: HeaderCBGV.jsx:18 ~ HeaderCBGV ~ refreshToken:',
    refreshToken,
  )
  const handleLogout = () => {
    localStorage.removeItem('persist:root')
    logOut(role, dispatch, navigate, refreshToken)
    persistor.purge()
  }

  return (
    <header className={bem.b()}>
      <nav className={bem.e('nav')}>
        <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto relative">
          {/* START: MENU - Mobile */}
          <div className="menu-mobile w-12 h-12 flex justify-center items-center lg:hidden">
            <MenuMobileMotCua />
          </div>
          {/* END: MENU - Mobile */}

          {/* STARTL Logo */}
          <Link to="/uneti" className="flex items-center p-2">
            <img src={logoUNETI} className="h-20 mr-3" alt="UNETI Logo" />
          </Link>
          {/* END: Logo */}

          {/* START: USER - Profile */}
          <div
            className="flex items-center md:order-2 relative py-4"
            id="control-dropdown"
          >
            <button
              type="button"
              className="flex items-center gap-4 mr-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-14 h-14 rounded-full object-cover border border-slate-500"
                src={noAvatar}
                alt="user photo"
              />
              <span className="hidden md:block">
                {dataSV?.HoDem + ' ' + dataSV?.Ten}
              </span>
              <MdKeyboardArrowDown className="text-2xl hidden md:inline-block" />
            </button>
            {/* Dropdown menu */}
            <div
              className={`min-w-[220px] z-50 absolute top-[80%] my-4 right-0 text-base list-none bg-white divide-y divide-gray-100 rounded-b-lg shadow`}
              id="user-dropdown"
            >
              <DropdownProfileStudent handleLogout={handleLogout} />
            </div>
          </div>
          {/* END: USER - Profile */}
          {/* START: Navbar Pages */}
          <NavbarMotCua />
          {/* END: Navbar Pages */}
        </div>
      </nav>
    </header>
  )
}

export default HeaderSV
