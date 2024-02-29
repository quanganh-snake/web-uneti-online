import PropTypes from 'prop-types'
// import { useLocation } from 'react-router-dom'
import { MdLogout, MdNotificationImportant } from 'react-icons/md'
// import { FaYoutube } from 'react-icons/fa6'
import DropdownProfileItem from './DropdownProfileItem'

function DropdownProfileTeacher(props) {
  const { handleLogout } = props
  //   const { pathname } = useLocation()
  return (
    <>
      <div className="p-3" aria-labelledby="user-menu-button">
        <DropdownProfileItem
          to="tthc-giang-vien/theo-doi-quy-trinh"
          icon={<MdNotificationImportant className="text-xl" />}
          text="Theo dõi đề nghị"
        />
        {/* <DropdownProfileItem
          to="https://www.youtube.com/playlist?list=PLtaZam4oqTqBgIrLn2LBviw4nQArnNYqJ"
          icon={<FaYoutube className="text-xl" />}
          text="Hướng dẫn sử dụng"
        /> */}
        <DropdownProfileItem
          onClick={handleLogout}
          icon={<MdLogout className="text-xl" />}
          text="Đăng xuất"
        />
      </div>
    </>
  )
}

DropdownProfileTeacher.propTypes = {
  handleLogout: PropTypes.func.isRequired,
}

export default DropdownProfileTeacher
