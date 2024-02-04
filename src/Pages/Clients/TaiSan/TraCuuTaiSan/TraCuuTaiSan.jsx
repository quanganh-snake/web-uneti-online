import { useEffect, useState } from 'react'
import TraCuuTaiSanView from './TraCuuTaiSanView'
import { getDanhSachTaiSan } from '@/Apis/HoTroThietBi/apiTaiSan'

const TraCuuTaiSan = () => {
  // var
  const [loading, setLoading] = useState(true)
  const [textSearch, setTextSearch] = useState('')
  const [listTaiSan, setListTaiSan] = useState([])
  const initialItemPerPage = 10
  const [itemPerPage, setItemPerPage] = useState(initialItemPerPage)

  // fetach data
  const getListTaiSan = () => {
    setLoading(true)
    getDanhSachTaiSan().then((res) => {
      setLoading(false)
      setListTaiSan(res)
    })
  }

  // event handlers
  const handleSearch = (e) => {
    const { id, name, value } = e.target

    if (id === 'text-search') {
      setTextSearch(value)
    }
  }

  // effects
  useEffect(() => {
    getListTaiSan()
  }, [])

  return (
    <TraCuuTaiSanView
      loading={loading}
      listTaiSan={listTaiSan}
      itemPerPage={itemPerPage}
      textSearch={textSearch}
      onSearch={handleSearch}
    />
  )
}

export default TraCuuTaiSan
