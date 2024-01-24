import { getLichHocSinhVien } from '@/Apis/TraCuu/apiLichHoc'
import LichBieu from '@/Components/TraCuu/ThoiKhoaBieu/LichBieu'
import { useEffect, useState } from 'react'

function ThoiKhoaBieu() {
  const [lichHoc, setLichHoc] = useState([])

  useEffect(() => {
    const getLichHoc = async () => {
      const res = await getLichHocSinhVien()

      setLichHoc(res.data.body)
    }

    getLichHoc()
  }, [])

  useEffect(() => {
    // transform lich hoc
    // useMap
  }, [lichHoc])

  return (
    <div>
      <LichBieu />
    </div>
  )
}

export default ThoiKhoaBieu
