import { Link } from 'react-router-dom'
import { useNamespace } from '@/Services/Hooks'
import DropdownProfileItemIcon from './DropdownProfileItemIcon'
import DropdownProfileItemText from './DropdownProfileItemText'

import './DropdownProfileItem.scss'

const DropdownProfileItem = (props) => {
  const { icon, text, to, onClick, children } = props

  const ns = useNamespace('dropdown-profile-item')

  return (
    <>
      <Link onClick={onClick} to={to} className={ns.b()}>
        {children ? (
          children
        ) : (
          <>
            {icon && <DropdownProfileItemIcon>{icon}</DropdownProfileItemIcon>}

            <DropdownProfileItemText>{text}</DropdownProfileItemText>
          </>
        )}
      </Link>
    </>
  )
}

export default DropdownProfileItem
