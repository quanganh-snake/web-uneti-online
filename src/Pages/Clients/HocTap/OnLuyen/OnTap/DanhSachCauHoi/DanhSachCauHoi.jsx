import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import {
  LOAD_CAU_HOI_DIEU_KIEN_LOC,
  getCauHoiTheoMonHoc,
  getTongSoTrangCauHoiTheoMonHoc,
} from '@/Apis/HocTap/apiOnLuyenThiThu'
import CauHoi from '@/Components/HocTap/OnTap/CauHoi'

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
      <div className="flex">
        <div className="md:col-span-9 w-full">
          <div className="flex flex-col gap-3 bg-white rounded-[26px] p-4">
            {listCauHoi.map((e, index) => (
              <CauHoi key={index} STT={index + 1} {...e} />
            ))}
          </div>
        </div>

        <div className="md:w-0 col-span-3">ddknj</div>
      </div>
    </>
  )
}

export default DanhSachDeThi
