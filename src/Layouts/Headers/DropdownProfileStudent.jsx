import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  MdFormatListNumbered,
  MdInsertDriveFile,
  MdLogout,
  MdNotificationImportant,
  MdArrowDropDown,
} from 'react-icons/md'
import { FiFileText } from 'react-icons/fi'
import { FaYoutube } from 'react-icons/fa6'
import clsx from 'clsx'

function DropdownProfileStudent(props) {
  const { handleLogout } = props
  const [openMenuHuongDan, setOpenMenuHuongDan] = useState(false)
  return (
    <React.Fragment>
      <ul className="py-2" aria-labelledby="user-menu-button">
        <li>
          <Link
            to="theodoidenghi"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white hover:font-bold hover:text-white hover:bg-sky-800"
          >
            <MdNotificationImportant className="text-xl" />
            <span>Theo dõi đề nghị</span>
          </Link>
        </li>

        <li>
          <Link
            to="https://www.youtube.com/playlist?list=PLtaZam4oqTqBgIrLn2LBviw4nQArnNYqJ"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white hover:font-bold hover:text-white hover:bg-sky-800"
          >
            <FaYoutube className="text-xl" />
            Hướng dẫn sử dụng
          </Link>
        </li>
        <li>
          <Link
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white  hover:font-bold hover:text-white hover:bg-sky-800"
          >
            <MdLogout className="text-xl" />
            Đăng xuất
          </Link>
        </li>
      </ul>
    </React.Fragment>
  )
}

DropdownProfileStudent.propTypes = {
  dropdownProfiles: PropTypes.array,
  handleLogout: PropTypes.func.isRequired,
}

export default DropdownProfileStudent
