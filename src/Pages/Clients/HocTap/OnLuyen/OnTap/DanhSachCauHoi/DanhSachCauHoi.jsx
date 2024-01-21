import CommonLayout from '@/Layouts/Common/CommonLayout'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { breadcrumbs, sidebar } from './constants'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import {
  LOAD_CAU_HOI_DIEU_KIEN_LOC,
  getCauHoiTheoMonHoc,
  getTongSoTrangCauHoiTheoMonHoc,
} from '@/Apis/HocTap/apiOnLuyenThiThu'

function DanhSachDeThi() {
  const routeParams = useParams()

  const maHocPhan = routeParams.id

  const dataSv = DataSinhVien()

  const [dieuKienLoc, setDieuKienLoc] = useState(
    LOAD_CAU_HOI_DIEU_KIEN_LOC.TatCa,
  )

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [monHocPhan, setMonHocPhan] = useState()
  const [listCauHoi, setListCauHoi] = useState([])

  useEffect(() => {
    getCauHoiTheoMonHoc({
      IDSinhVien: dataSv.IdSinhVien,
      maMonHoc: maHocPhan,
      soTrang: currentPage,
      dieuKienLoc,
    }).then((data) => {
      setListCauHoi(data.data.body)
    })

    getTongSoTrangCauHoiTheoMonHoc({
      IDSinhVien: dataSv.IdSinhVien,
      maMonHoc: maHocPhan,
      dieuKienLoc,
    }).then((data) => {
      setTotalPage(data.data.body.TongSoTrang)
    })
  }, [maHocPhan])

  return (
    <>
      <CommonLayout
        sidebar={sidebar}
        breadcrumbs={[
          ...breadcrumbs,
          {
            path: `/hoctap/onluyen/ontap/danhsachcauhoi/${maHocPhan}`,
            title: 'Danh sách đề thi',
          },
        ]}
      >
        {maHocPhan}
      </CommonLayout>
    </>
  )
}

export default DanhSachDeThi
