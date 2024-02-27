import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { MdLogout, MdNotificationImportant } from 'react-icons/md'
import { FaYoutube } from 'react-icons/fa6'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import DropdownProfileItem from './DropdownProfileItem'
import { homeHocTap, homeMotCua, homeTraCuu } from '@/Services/Static/dataStatic'

function DropdownProfileStudent(props) {
  const { handleLogout } = props
  const location = useLocation()
  const { pathname } = location

  const [moduleItems, setModuleItems] = useState([])

  useEffect(() => {
    setModuleItems([])
    if (pathname.includes('mot-cua')) 
      setModuleItems(homeMotCua.map(e => ({...e, path: `mot-cua${e.path}`})))
    if (pathname.includes('hoc-tap')) 
      setModuleItems(homeHocTap.map(e => ({...e, path: `hoc-tap${e.path}`})))
    if (pathname.includes('tra-cuu')) 
      setModuleItems(homeTraCuu.map(e => ({...e, path: `tra-cuu${e.path}`})))

  }, [pathname])

  return (
    <>
      <div className="p-3" aria-labelledby="user-menu-button">
        <DropdownProfileItem to="theo-doi-de-nghi" icon={<MdNotificationImportant className="text-xl" />} text="Theo dõi đề nghị" />

        <DropdownProfileItem
          to="https://www.youtube.com/playlist?list=PLtaZam4oqTqBgIrLn2LBviw4nQArnNYqJ"
          icon={<FaYoutube className="text-xl" />} text="Hướng dẫn sử dụng"
        />
        <DropdownProfileItem
          onClick={handleLogout}
          icon={<MdLogout className="text-xl" />} text="Đăng xuất"
        />

        {moduleItems.length > 0 &&
          <div className='h-[2px] w-full bg-gray-100 my-2' />
        }

        {moduleItems.map((item, index) => (
          item.moduleActive && <DropdownProfileItem
            key={index}
            to={item.path}
            icon={<img height="20" width="20" src={item.thumbnail} /> || item.ico}
            text={item.title}
          />
        ))}
      </div>
    </>
  )
}

DropdownProfileStudent.propTypes = {
  dropdownProfiles: PropTypes.array,
  handleLogout: PropTypes.func.isRequired,
}

export default DropdownProfileStudent
