import { useState } from 'react'

import { useBem } from '@/Hooks'
import { SearchBox } from './search-box.jsx'
import { Posts } from '../posts'
import { Sidebar } from '../sidebar'

import './main.scss'

export const Main = () => {
  const bem = useBem('main')

  const [category, setCategory] = useState()

  const [search, setSearch] = useState('')

  const onCategoryChange = (item) => {
    setCategory(item)
  }

  const handleSearch = (text) => {
    setSearch(text)
  }

  return (
    <>
      <h2 className={bem.e('title')}>Hỗ trợ sử dụng phần mềm</h2>
      <main className={bem.b()}>
        <Sidebar onCategoryChange={onCategoryChange} />

        <div className={bem.e('content')}>
          <SearchBox search={search} onSearch={handleSearch} />

          <Posts search={search} category={category} />
        </div>
      </main>
    </>
  )
}

Main.propTypes = {}
