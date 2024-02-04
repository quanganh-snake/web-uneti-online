import { useState } from 'react'

import { useNamespace } from '@/Services/Hooks'
import { SearchBox } from '@/Components/HoTroSuDungPhanMem/SearchBox/SearchBox'
import { Posts } from '@/Components/HoTroSuDungPhanMem/Posts/Posts'
import { Sidebar } from '@/Components/HoTroSuDungPhanMem/Sidebar/Sidebar'

import './HoTroSuDungPhanMem.scss'

export const HoTroSuDungPhanMem = () => {
  const bem = useNamespace('main')

  const [category, setCategory] = useState('')

  const [search, setSearch] = useState('')

  const handleSearch = (searchStr) => {
    setSearch(searchStr)
  }

  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <>
      <main className={bem.b()}>
        <Sidebar
          category={category}
          onCategoryChange={setCategory}
          setSearch={setSearch}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />

        <div className={bem.e('content')}>
          <SearchBox onSearch={handleSearch} />

          <Posts search={search} category={category} />
        </div>
      </main>

      <button
        className={bem.e('toggle-sidebar')}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <svg
          className={`${bem.is('active', !showSidebar)} ${bem.e('show')}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 7H21"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M9.48999 12H21"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M3 12H5.99"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M3 17H21"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        <svg
          className={`${bem.is('active', showSidebar)} ${bem.e('close')}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 18V6"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 12H18"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 12H11.66"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 18V6"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  )
}

HoTroSuDungPhanMem.propTypes = {}

export default HoTroSuDungPhanMem
