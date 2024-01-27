import { useNamespace } from '@/Services/Hooks'
import PropTypes from 'prop-types'

export const SidebarItem = ({ name, onClick, active }) => {
  const bem = useNamespace('htsdpm-sidebar')

  return (
    <div
      onClick={onClick}
      className={`${bem.e('item')} ${bem.is('active', active)}`}
    >
      {name}
    </div>
  )
}

SidebarItem.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool,
}
