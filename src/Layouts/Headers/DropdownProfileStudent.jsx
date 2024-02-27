import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { MdLogout, MdNotificationImportant } from 'react-icons/md'
import { FaYoutube } from 'react-icons/fa6'

function DropdownProfileStudent(props) {
  const { handleLogout } = props
  return (
    <>
      <ul className="py-2" aria-labelledby="user-menu-button">
        <li>
          <Link
            to="theo-doi-de-nghi"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:font-bold hover:text-white hover:bg-sky-800"
          >
            <MdNotificationImportant className="text-xl" />
            <span>Theo dõi đề nghị</span>
          </Link>
        </li>

        <li>
          <Link
            to="https://www.youtube.com/playlist?list=PLtaZam4oqTqBgIrLn2LBviw4nQArnNYqJ"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:font-bold hover:text-white hover:bg-sky-800"
          >
            <FaYoutube className="text-xl" />
            Hướng dẫn sử dụng
          </Link>
        </li>
        <li>
          <Link
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700  hover:font-bold hover:text-white hover:bg-sky-800"
          >
            <MdLogout className="text-xl" />
            Đăng xuất
          </Link>
        </li>
      </ul>
    </>
  )
}

DropdownProfileStudent.propTypes = {
  dropdownProfiles: PropTypes.array,
  handleLogout: PropTypes.func.isRequired,
}

export default DropdownProfileStudent
