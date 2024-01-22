import { useEffect, useState } from 'react'

import CommonLayout from '@/Layouts/Common/CommonLayout'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { getAllMonHocThiThu } from '@/Apis/HocTap/apiOnLuyenThiThu'

import { breadcrumbs, home, sidebar } from './constants'
import HocKy from '@/Components/HocTap/OnTap/HocKy'
import { useMemo } from 'react'

export default function ThiThu() {
  const [listMonHoc, setListMonHoc] = useState([])

  const dataSV = DataSinhVien()

  const danhSachMonHocTheoHocKy = useMemo(() => {
    return listMonHoc.reduce((result, monHoc) => {
      if (Object.prototype.hasOwnProperty.call(result, monHoc.TenDot)) {
        result[monHoc.TenDot].push(monHoc)
      } else {
        result[monHoc.TenDot] = [monHoc]
      }

      return result
    }, {})
  }, [listMonHoc])

  useEffect(() => {
    getAllMonHocThiThu(dataSV.MaSinhVien).then((res) => {
      setListMonHoc(res?.data?.body)
    })

    return () => {
      setListMonHoc([])
    }
  }, [])

  return (
    <>
      <CommonLayout sidebar={sidebar} breadcrumbs={breadcrumbs} home={home}>
        {Object.keys(danhSachMonHocTheoHocKy).map((hk, index) => (
          <HocKy
            key={index}
            hocKy={hk}
            linkTo="danhsachdethi"
            listMonHoc={danhSachMonHocTheoHocKy[hk]}
          />
        ))}
      </CommonLayout>
    </>
  )
}
