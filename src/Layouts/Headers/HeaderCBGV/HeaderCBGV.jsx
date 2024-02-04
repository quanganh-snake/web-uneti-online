import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MdKeyboardArrowDown } from 'react-icons/md'
// data
import noAvatar from '@/assets/Images/noavatar.png'
import logoUNETI from '@/assets/Images/LOGO_UNETI.ico'
import { useDispatch } from 'react-redux'
import DropdownProfileTeacher from '../DropdownProfileTeacher.jsx'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV.js'
import NavbarTTHCGV from '@/Components/Navbars/NavbarTTHCGV.jsx'
import { logOut } from '@/Apis/apiLogout.js'
import { persistor, store } from '@/Services/Redux/store.js'
import MenuMobileTTHCGV from '@/Components/MenuMobiles/MenuMobileTTHCGV.jsx'

function HeaderCBGV() {
  const dataCBGV = DataCanBoGV()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const state = store.getState()
  const refreshToken = state?.auth?.login?.currentToken?.refreshToken
  const handleLogout = () => {
    localStorage.removeItem('persist:root')
    localStorage.removeItem('currentUrl')
    logOut(dataCBGV.Role, dispatch, navigate, refreshToken)
    persistor.purge()
  }

  return (
    <header className="shadow-md fixed left-0 right-0 top-0 w-[100%] z-10">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto relative">
          {/* START: MENU - Mobile */}
          <div className="menu-mobile w-12 h-12 flex justify-center items-center lg:hidden">
            <MenuMobileTTHCGV />
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
              className="flex items-center gap-4 mr-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
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
                {dataCBGV.HoDem + ' ' + dataCBGV.Ten}
              </span>
              <MdKeyboardArrowDown className="text-2xl hidden md:inline-block" />
            </button>
            {/* Dropdown menu */}
            <div
              className={`min-w-[220px] z-50 absolute top-[80%] my-4 right-0 text-base list-none bg-white divide-y divide-gray-100 rounded-b-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
              id="user-dropdown"
            >
              <DropdownProfileTeacher handleLogout={handleLogout} />
            </div>
          </div>
          {/* END: USER - Profile */}

          {/* START: Navbar Pages */}
          {(pathname === '/hotrothietbi' ||
            pathname.includes('/hotrothietbi/')) && (
            <div className="col-span-8 lg:col-span-7">
              <p className="w-full text-center text-2xl font-bold uppercase text-uneti-primary">
                Hỗ trợ thiết bị
              </p>
            </div>
          )}
          {pathname.includes('/hotrothietbigiangduong') && (
            <div className="col-span-8 lg:col-span-7">
              <p className="w-full text-center text-2xl font-bold uppercase text-uneti-primary">
                Hỗ trợ thiết bị giảng đường
              </p>
            </div>
          )}
          {pathname.includes('/hotrosudungphanmem') && (
            <div className="col-span-8 lg:col-span-7">
              <p className="w-full text-center text-2xl font-bold uppercase text-uneti-primary">
                Hỗ trợ sử dụng phần mềm
              </p>
            </div>
          )}
          {pathname === '/uneti' && <div className="col-span-7"></div>}
          {(pathname.includes('/tthcgiangvien') ||
            pathname.includes('/admin')) && (
            <div className="col-span-7">
              <div className="flex items-center justify-center">
                <NavbarTTHCGV />
              </div>
            </div>
          )}
          {pathname.includes('/error') && (
            <div className="col-span-8 lg:col-span-7"></div>
          )}
          {/* END: Navbar Pages */}
        </div>
      </nav>
    </header>
  )
}

export default HeaderCBGV
