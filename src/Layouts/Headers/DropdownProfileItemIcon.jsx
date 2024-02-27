import { useNamespace } from '@/Services/Hooks'

import './DropdownProfileItem.scss'

const DropdownProfileItemIcon = ({ children }) => {
  const ns = useNamespace('dropdown-profile-item')

  return (
    <div className={ns.e('icon')}>
      {children}
    </div>
  )
}

export default DropdownProfileItemIcon
