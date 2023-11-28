import { useBem } from '@/Hooks'
import PropTypes from 'prop-types'

import './SearchBox.scss'

export const SearchBox = ({ search, onSearch }) => {
  const bem = useBem('search')

  return (
    <div className={bem.b()}>
      <input
        type='text'
        value={search}
        placeholder='Nhập từ khoá tìm kiếm'
        className={bem.e('input')}
        onChange={(e) => onSearch(e.target.value)}
      />

      <button className={bem.e('button')}>Search</button>
    </div>
  )
}

SearchBox.propTypes = {
  search: PropTypes.string,
  onSearch: PropTypes.func,
}
