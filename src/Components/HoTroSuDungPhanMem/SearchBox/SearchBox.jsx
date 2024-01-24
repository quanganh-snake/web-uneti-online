import { useNamespace } from '@/Services/Hooks'
import PropTypes from 'prop-types'

import './SearchBox.scss'
import { useState } from 'react'

export const SearchBox = ({ onSearch }) => {
  const bem = useNamespace('search')

  const [search, setSearch] = useState('')

  const handleSearch = () => {
    onSearch(search)
  }

  const handleKeyDown = (e) => {
    if (e.key == 'Enter') onSearch(search)
  }

  return (
    <div className={bem.b()}>
      <input
        type="text"
        value={search}
        placeholder="Nhập từ khoá tìm kiếm"
        className={bem.e('input')}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={handleSearch} className={bem.e('button')}>
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
