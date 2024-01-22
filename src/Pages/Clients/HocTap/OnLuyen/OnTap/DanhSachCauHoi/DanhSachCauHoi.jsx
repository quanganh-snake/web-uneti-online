import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import {
  LOAD_CAU_HOI_DIEU_KIEN_LOC,
  getAllMonHocThiThu,
  getCauHoiTheoMonHoc,
  getTongSoTrangCauHoiTheoMonHoc,
} from '@/Apis/HocTap/apiOnLuyenThiThu'
import CauHoi from '@/Components/HocTap/OnTap/CauHoi'
import { getAllMonHoc } from '@/Apis/HocTap/apiHocTap'
import { useBem } from '@/Services/Hooks'
import './DanhSachCauHoi.scss'

function DanhSachDeThi() {
  const uLocation = useLocation()
  const navigate = useNavigate()
  const bem = useBem('DanhSachDeThi')

  const maMonHoc = uLocation.pathname.split('/').at(-1).toString()

  const routeParams = useParams()

  const maHocPhan = routeParams.id

  const dataSv = DataSinhVien()

  const [dieuKienLoc, setDieuKienLoc] = useState(
    LOAD_CAU_HOI_DIEU_KIEN_LOC.TatCa,
  )

  const [monHoc, setMonHoc] = useState({})

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [monHocPhan, setMonHocPhan] = useState()
  const [listCauHoi, setListCauHoi] = useState([])

  useEffect(() => {
    getAllMonHocThiThu(dataSv.MaSinhVien).then((res) => {
      if (
        !res?.data?.body.filter((mh) => mh.MaMonHoc.toString() === maMonHoc)
          .length
      ) {
        navigate('/hoctap/onluyen/ontap')
      }
      setMonHoc(
        res?.data?.body.filter((mh) => mh.MaMonHoc.toString() === maMonHoc)[0],
      )
    })
  }, [])

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

  const [showMenu, setShowMenu] = useState(false)

  return (
    <div>
      <div className="flex flex-col text-center justify-start items-center gap-4 bg-white rounded-[26px] mb-4 p-4">
        <h3 className="text-uneti-primary font-bold text-4xl">
          {monHoc.TenMonHoc}
        </h3>
        <span className="text-uneti-primary text-sm">
          Mã Môn Học: {monHoc.MaMonHoc}
        </span>
      </div>
      <div className="flex justify-center items-start gap-4">
        <div className="w-full border-b-2 border-solid border-b-white">
          <div className="flex flex-col gap-3 bg-white rounded-[26px] p-4">
            {listCauHoi.map((e, index) => (
              <CauHoi key={index} STT={index + 1} {...e} />
            ))}
          </div>
        </div>

        <div
          className={`fixed top-[240px] right-[20px] transition-all duration-200 bg-white rounded-xl overflow-hidden shadow-md flex flex-col md:w-[30%] md:static`}
        ></div>
      </div>
    </div>
  )
}

export default DanhSachDeThi
