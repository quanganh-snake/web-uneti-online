import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ChiTietThuTucView from './ChiTietThuTucView'
import { useParams } from 'react-router-dom'
import { getThuTucHanhChinhByID } from '../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'

function ChiTietThuTuc(props) {
  const { tieude, id } = useParams()

  const home = {
    path: '/tthcgiangvien',
    title: 'TTHC Giảng Viên',
  }

  const breadcrumbs = [
    {
      path: `/tthcgiangvien/chitiet/${tieude}/${id}`,
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
