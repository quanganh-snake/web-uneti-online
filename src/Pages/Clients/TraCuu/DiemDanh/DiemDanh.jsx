import { useEffect, useState } from 'react'
import DiemDanhView from './DiemDanhView'
import { getAllDiemDanh } from '@/Apis/TraCuu/apiDiemDanh'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'

function DiemDanh() {
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
      path: '/tra-cuu/diem-danh',
      title: 'Điểm danh',
    },
  ]

  const dataSV = DataSinhVien()

  const [listDiemDanh, setListDiemDanh] = useState([])
  const [listHocKy, setListHocKy] = useState([])

  useEffect(() => {
    getAllDiemDanh(dataSV.MaSinhVien).then((res) => {
      setListDiemDanh(res?.data?.body)
    })

    return () => {
      setListDiemDanh([])
    }
  }, [])

  useEffect(() => {
    setListHocKy(
      listDiemDanh
        .map((e) => ({
          hocKy: e.TC_SV_KetQuaHocTap_DiemDanhSinhVien_TenDot,
          coPhep: e.TC_SV_KetQuaHocTap_DiemDanhSinhVien_CoPhep_TheoKy,
          khongPhep: e.TC_SV_KetQuaHocTap_DiemDanhSinhVien_KhongPhep_TheoKy,
          tong: e.TC_SV_KetQuaHocTap_DiemDanhSinhVien_TongNghi_TheoKy,
        }))
        .filter((v, i, s) => {
          return (
            i ===
            s.findIndex((obj) => {
              return JSON.stringify(obj) === JSON.stringify(v)
            })
          )
        })
        .reverse(),
    )
    return () => {
      setListHocKy([])
    }
  }, [listDiemDanh])

  return (
    <DiemDanhView
      home={home}
      breadcrumbs={breadcrumbs}
      listDiemDanh={listDiemDanh}
      listHocKy={listHocKy}
    />
  )
}

export default DiemDanh
