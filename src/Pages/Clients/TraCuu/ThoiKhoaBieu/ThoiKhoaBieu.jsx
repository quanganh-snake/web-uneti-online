import { getLichHocSinhVien } from '@/Apis/TraCuu/apiLichHoc'
import LichBieu from '@/Components/TraCuu/ThoiKhoaBieu/LichBieu'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { useEffect, useState } from 'react'

function ThoiKhoaBieu() {
  const [lichHoc, setLichHoc] = useState([])

  const dataSV = DataSinhVien()

  useEffect(() => {
    const getLichHoc = async () => {
      const res = await getLichHocSinhVien({
        MaSinhVien: dataSV.MaSinhVien,
      })

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
      {lichHoc.map((e, index) => (
        <LichBieu key={index} {...e} />
      ))}
    </div>
  )
}

export default ThoiKhoaBieu
