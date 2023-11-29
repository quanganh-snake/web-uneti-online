import { useState } from 'react'

import { useBem } from '@/Hooks'
import { SearchBox } from './SearchBox'
import { Posts } from '../Posts'
import { Sidebar } from '../Sidebar'

import './Main.scss'

export const Main = () => {
  const bem = useBem('main')

  const [category, setCategory] = useState('')

  const [search, setSearch] = useState('')

  const handleSearch = (searchStr) => {
    setSearch(searchStr)
  }

  return (
    <>
      <h2 className={bem.e('title')}>Hỗ trợ sử dụng phần mềm</h2>
      <main className={bem.b()}>
        <Sidebar onCategoryChange={setCategory} setSearch={setSearch} />

        <div className={bem.e('content')}>
          <SearchBox onSearch={handleSearch} />

          <Posts search={search} category={category} />
        </div>
      </main>
    </>
  )
}

Main.propTypes = {}
