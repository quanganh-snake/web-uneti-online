import { useLocation } from 'react-router-dom'
import TheoDoiDeNghiChiTietView from './TheoDoiDeNghiChiTietView'
import { useEffect, useState } from 'react'
import {
  getChiTietYeuCau,
  updateXemYeuCau,
} from '@/Apis/TheoDoiDeNghi/apiTheoDoiDeNghi'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'

function TheoDoiDeNghiChiTiet() {
  const home = {
    path: '/uneti',
    title: 'Trang chủ',
  }

  const breadcrumbs = [
    {
      path: '/theo-doi-de-nghi',
      title: 'Theo dõi đề nghị',
    },
    {
      path: '/theo-doi-de-nghi/theo-doi-de-nghi-chi-tiet',
      title: 'Theo dõi đề nghị chi tiết',
    },
  ]
  const uLocation = useLocation()
  const [yeuCau] = useState(uLocation.state?.yeuCau)
  const [chiTiet, setChiTiet] = useState({})
  const dataSV = DataSinhVien()

  if (!uLocation.state) {
    location.href = '/theo-doi-de-nghi'
    return
  }

  const handleXemYeuCau = async () => {
    if (yeuCau.MC_TrangThai_YeuCau_SinhVien_XemThongBao) {
      await updateXemYeuCau({
        MC_TrangThai_YeuCau_SinhVien_ID:
          yeuCau.MC_TrangThai_YeuCau_SinhVien_ID.toString(),
        MC_TrangThai_YeuCau_SinhVien_TrangThai:
          yeuCau.MC_TrangThai_YeuCau_SinhVien_TrangThai,
      })
    }
  }

  useEffect(() => {
    handleXemYeuCau()
    getChiTietYeuCau(
      yeuCau.MC_TrangThai_YeuCau_SinhVien_IDBang,
      yeuCau.MC_TrangThai_YeuCau_SinhVien_TenBang,
    ).then((res) => {
      setChiTiet(res?.data?.body[0])
    })

    return () => {
      setChiTiet({})
    }
  }, [])

  return (
    <TheoDoiDeNghiChiTietView
      home={home}
      breadcrumbs={breadcrumbs}
      yeuCau={yeuCau}
      chiTiet={chiTiet}
      dataSV={dataSV}
    />
  )
}

export default TheoDoiDeNghiChiTiet
