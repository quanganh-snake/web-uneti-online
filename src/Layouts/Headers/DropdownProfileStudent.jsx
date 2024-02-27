import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { MdLogout, MdNotificationImportant } from 'react-icons/md'
import { FaYoutube } from 'react-icons/fa6'
import DropdownProfileItem from './DropdownProfileItem'

function DropdownProfileStudent(props) {
  const { handleLogout } = props
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
      </div>
    </>
  )
}

DropdownProfileStudent.propTypes = {
  dropdownProfiles: PropTypes.array,
  handleLogout: PropTypes.func.isRequired,
}

export default DropdownProfileStudent
