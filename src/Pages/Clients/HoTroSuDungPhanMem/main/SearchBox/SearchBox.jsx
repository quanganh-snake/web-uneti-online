import { useBem } from '@/Hooks'
import PropTypes from 'prop-types'

import './SearchBox.scss'

export const SearchBox = ({ search, setSearch, onSearch }) => {
  const bem = useBem('search')

  return (
    <div className={bem.b()}>
      <input
        type='text'
        value={search}
        placeholder='Nhập từ khoá tìm kiếm'
        className={bem.e('input')}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={onSearch} className={bem.e('button')}>
        Search
      </button>
    </div>
  )
}

SearchBox.propTypes = {
  search: PropTypes.string,
  onSearch: PropTypes.func,
  setSearch: PropTypes.func,
}
