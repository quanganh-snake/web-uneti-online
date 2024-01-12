import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
    MdFormatListNumbered,
    MdInsertDriveFile,
    MdLogout,
    MdNotificationImportant,
} from 'react-icons/md'
import { FaYoutube } from 'react-icons/fa6'

function DropdownProfileTeacher(props) {
    const { handleLogout } = props
    return (
        <React.Fragment>
            <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                    <Link
                        to="tthcgiangvien/theodoiquytrinh"
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

DropdownProfileTeacher.propTypes = {
    handleLogout: PropTypes.func.isRequired,
}

export default DropdownProfileTeacher
