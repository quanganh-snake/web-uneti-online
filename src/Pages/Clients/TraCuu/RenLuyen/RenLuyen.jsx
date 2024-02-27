import { useEffect, useState } from 'react'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import RenLuyenView from './RenLuyenView'
import { getAllDiemRenLuyen } from '@/Apis/TraCuu/apiRenLuyen'

function RenLuyen() {
  const home = {
    path: '/uneti',
    title: 'Trang chủ',
  }

  const breadcrumbs = [
    {
      path: '/tra-cuu',
      title: 'Tra cứu',
    },
    {
      path: '/tra-cuu/ren-luyen',
      title: 'Rèn luyện',
    },
  ]

  const dataSV = DataSinhVien()

  const [listRenLuyen, setListRenLuyen] = useState([])

  useEffect(() => {
    // lấy danh sách điểm rèn luyện
    getAllDiemRenLuyen(dataSV.MaSinhVien).then((res) => {
      setListRenLuyen(res?.data?.body.reverse())
    })

    return () => {
      setListRenLuyen([])
    }
  }, [])

  return (
    <RenLuyenView
      home={home}
      breadcrumbs={breadcrumbs}
      listRenLuyen={listRenLuyen}
    />
  )
}

export default RenLuyen
