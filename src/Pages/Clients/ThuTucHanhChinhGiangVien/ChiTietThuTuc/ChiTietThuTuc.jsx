import { useEffect, useState } from 'react'
import ChiTietThuTucView from './ChiTietThuTucView'
import { useParams } from 'react-router-dom'
import { getThuTucHanhChinhByID } from '@/Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'

function ChiTietThuTuc() {
  const { tieude, id } = useParams()

  const home = {
    path: '/tthc-giang-vien',
    title: 'TTHC Giảng Viên',
  }

  const breadcrumbs = [
    {
      path: `/tthc-giang-vien/chi-tiet/${tieude}/${id}`,
      title: 'Chi tiết thủ tục',
    },
  ]

  const [dataThuTuc, setDataThuTuc] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getHoSoThuTucByID = async () => {
      const resultGetThuTucByID = await getThuTucHanhChinhByID(id)
      if (resultGetThuTucByID.status === 200) {
        const dataGetThuTucByID = await resultGetThuTucByID.data
        if (dataGetThuTucByID) {
          setDataThuTuc(dataGetThuTucByID)
          setLoading(false)
        }
      }
    }
    getHoSoThuTucByID()
  }, [])

  return (
    <ChiTietThuTucView
      idThuTuc={id}
      home={home}
      breadcrumbs={breadcrumbs}
      loading={loading}
      dataThuTuc={dataThuTuc}
    />
  )
}

ChiTietThuTuc.propTypes = {}

export default ChiTietThuTuc
