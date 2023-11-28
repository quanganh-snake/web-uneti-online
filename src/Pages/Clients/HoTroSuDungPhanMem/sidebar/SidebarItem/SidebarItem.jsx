import { useBem } from '@/Hooks'
import PropTypes from 'prop-types'

export const SidebarItem = ({ name, onClick }) => {
  const bem = useBem('sidebar')

  return (
    <div onClick={onClick} className={bem.e('item')}>
      {name}
    </div>
  )
}

SidebarItem.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
}
