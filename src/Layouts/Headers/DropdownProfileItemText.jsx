import { useNamespace } from '@/Services/Hooks'

import './DropdownProfileItem.scss'

const DropdownProfileItemText = ({ children }) => {
  const ns = useNamespace('dropdown-profile-item')

  return (
    <div className={ns.e('text')}>
      {children}
    </div>
  )
}

export default DropdownProfileItemText
