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
        >
          <div className="w-full bg-uneti-primary p-2 text-white flex justify-between items-center">
            <span className="text-white flex justify-center items-center gap-2 text-center">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8V13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 2H15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.75 9.5C3.65 10.96 3 12.78 3 14.75C3 19.58 6.92 23.5 11.75 23.5C16.58 23.5 20.5 19.58 20.5 14.75C20.5 9.92 16.58 6 11.75 6C10.49 6 9.3 6.26 8.22 6.74"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>90:00</span>
            </span>
            <button
              onClick={() => {
                setShowMenu((_showMenu) => !_showMenu)
              }}
              className={`duration-200 ml-10 md:ml-0 ${
                showMenu ? '-rotate-90' : 'rotate-0'
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.1897 7.93994L8.56969 10.5599C7.79969 11.3299 7.79969 12.5899 8.56969 13.3599L15.0897 19.8799"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.0898 4.04004L14.0498 5.08004"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className={`transition-all duration-200`}>show</div>
          <div className="w-full bg-uneti-primary p-2 text-white flex justify-center items-center border-t-2 border-solid border-t-white">
            <button>Nộp Bài</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DanhSachDeThi
