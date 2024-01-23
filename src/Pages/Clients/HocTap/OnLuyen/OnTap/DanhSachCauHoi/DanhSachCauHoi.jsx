import { useRef, useState } from 'react'
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
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Accordion from '@/Components/Base/Accordion/Accordion'
import { OnTapContext } from '@/Services/Tokens'

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
  const [soCauDaTraLoi, setSoCauDaTraLoi] = useState(0)
  const [tongSoCau, setTongSoCau] = useState(60)

  const accordionRef = useRef()

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

  // useEffect(() => {
  //   console.log(accordionRef.current)
  //   setShowMenu(accordionRef.current?.isOpen)
  //   // check watchEffect
  // }, [accordionRef.current?.isOpen])

  return (
    <OnTapContext.Provider value={{}}>
      <div className="flex flex-col text-center justify-start items-center gap-4 bg-white rounded-[26px] mb-4 p-4">
        <h3 className="text-uneti-primary text-center font-bold text-xl">
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
          className={`fixed top-[200px] right-[20px] transition-all duration-200 overflow-hidden shadow-md flex flex-col md:w-[30%] md:static`}
        >
          <Accordion
            className={`${
              showMenu ? 'max-w-max' : 'max-w-[200px]'
            } md:max-w-none w-full`}
            ref={accordionRef}
          >
            <Accordion.Label className="bg-uneti-primary text-white justify-between">
              <div className="ml-auto">90:00</div>
            </Accordion.Label>
            <Accordion.Content>
              <div className="bg-white">
                {/* cau hoi */}
                <div className="grid grid-cols-5"></div>
                {/* so cau tra loi */}
                <div>
                  <span>Đã trả lời:</span>
                  <span>
                    {soCauDaTraLoi}/{tongSoCau}
                  </span>
                </div>
                {/* dieu kien loc */}
                <div>
                  <select
                    value={dieuKienLoc}
                    onChange={(e) => setDieuKienLoc(e.target.value)}
                  >
                    <option value={LOAD_CAU_HOI_DIEU_KIEN_LOC.TatCa}>
                      Tất cả câu hỏi
                    </option>
                    <option value={LOAD_CAU_HOI_DIEU_KIEN_LOC.ChuaLam}>
                      Câu hỏi chưa làm
                    </option>
                    <option value={LOAD_CAU_HOI_DIEU_KIEN_LOC.DaLam}>
                      Câu hỏi đã làm
                    </option>
                    <option value={LOAD_CAU_HOI_DIEU_KIEN_LOC.PhanVan}>
                      Câu hỏi đang phân vân
                    </option>
                  </select>
                </div>
                {/* nop bai */}
                <div>
                  <button>Nộp bài</button>
                </div>
              </div>
            </Accordion.Content>
          </Accordion>
        </div>
      </div>
    </OnTapContext.Provider>
  )
}

export default DanhSachDeThi
