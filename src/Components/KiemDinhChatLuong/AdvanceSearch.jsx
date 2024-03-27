import { BiChevronDown } from 'react-icons/bi'
import Icon from '../Base/Icon/Icon'
import { useClickOutside, useNamespace } from '@/Services/Hooks'
import { useState } from 'react'
import { useRef } from 'react'
import { transformCls } from '@/Services/Utils/reactUtils'

export default function AdvanceSearch() {
  const nsLayoutKDCL = useNamespace('kiem-dinh-chat-luong')
  const [search, setSearch] = useState('')
  const [isOpenSearchAdvance, setIsOpenSearchAdvance] = useState(false)
  const searchAdvanceRef = useRef()
  const searchDropdownRef = useRef()
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  useClickOutside(searchDropdownRef, (event) => {
    if (event.target !== searchAdvanceRef.current) {
      setIsOpenSearchAdvance(false)
    }
  })
  return (
    <div className={nsLayoutKDCL.em('actions', 'search')}>
      <div className={nsLayoutKDCL.em('search', 'controls')}>
        <input
          className={nsLayoutKDCL.em('search', 'control')}
          value={search}
          onInput={handleSearch}
          placeholder="Nhập từ khóa tìm kiếm"
        />
        <div className="relative">
          <button
            ref={searchAdvanceRef}
            className={nsLayoutKDCL.em('search', 'advance')}
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              setIsOpenSearchAdvance((prev) => !prev)
            }}
          >
            Tìm kiếm nâng cao
            <Icon>
              <BiChevronDown />
            </Icon>
          </button>

          <div
            ref={searchDropdownRef}
            className={transformCls([
              nsLayoutKDCL.em('search', 'dropdown'),
              nsLayoutKDCL.is('open', isOpenSearchAdvance),
            ])}
          >
            Dropdown
          </div>
        </div>
      </div>
      <button className="base-button bg-uneti-primary">Tìm kiếm</button>
    </div>
  )
}
