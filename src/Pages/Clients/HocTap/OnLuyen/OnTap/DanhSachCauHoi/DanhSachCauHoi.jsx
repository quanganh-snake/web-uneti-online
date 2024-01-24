import { useMemo, useRef, useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import {
  getAllMonHocThiThu,
  getCauHoiTheoMonHoc,
  getTongSoTrangCauHoiTheoMonHoc,
} from '@/Apis/HocTap/apiOnLuyenThiThu'
import CauHoi from '@/Components/HocTap/OnTap/CauHoi'
import './DanhSachCauHoi.scss'
import Accordion from '@/Components/Base/Accordion/Accordion'
import { LOAD_CAU_HOI_DIEU_KIEN_LOC, OnTapContext } from '@/Services/Tokens'
import { Pagination } from '@mui/material'
import { values } from 'lodash-unified'

function DanhSachDeThi() {
  const uLocation = useLocation()
  const navigate = useNavigate()

  const maMonHoc = uLocation.pathname.split('/').at(-1).toString()

  const routeParams = useParams()

  const maHocPhan = routeParams.id

  const dataSv = DataSinhVien()

  const [dieuKienLoc, setDieuKienLoc] = useState(
    LOAD_CAU_HOI_DIEU_KIEN_LOC.TatCa,
  )

  const [monHoc, setMonHoc] = useState({})

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(15)
  const [totalPage, setTotalPage] = useState(0)

  const [listCauHoi, setListCauHoi] = useState([])
  const [listCauTraLoi, setListCauTraLoi] = useState({})

  const [tongSoCau] = useState(60)
  const [showMenu] = useState(false)

  const accordionRef = useRef()

  const soCauDaTraLoi = useMemo(
    () => values(listCauTraLoi).filter((e) => e != null),
    [listCauTraLoi],
  )

  const handleChangeCauTraLoi = (idCauHoi, idCauTraLoi) => {
    setListCauTraLoi({
      ...listCauTraLoi,
      [idCauHoi]: idCauTraLoi,
    })
  }

  const handleChangeCurrentPage = (event, value) => {
    setCurrentPage(value)
  }

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
      setTotalPage(data.data.body[0].TongSoTrang)
    })
  }, [maHocPhan, currentPage, pageSize])

  return (
    <OnTapContext.Provider
      value={{
        selected: listCauTraLoi,
        handleSelected: handleChangeCauTraLoi,
      }}
    >
      <div className="flex flex-col text-center justify-start items-center gap-4 bg-white shadow-sm rounded-[26px] mb-4 p-4">
        <h3 className="text-uneti-primary text-center font-semibold text-xl">
          {monHoc.TenMonHoc}
        </h3>
        <span className="text-uneti-primary text-sm">
          Mã Môn Học: {monHoc.MaMonHoc}
        </span>
      </div>
      <div className="flex justify-center items-start gap-4">
        <div className="w-full">
          <div className="flex flex-col gap-3 bg-white shadow-sm rounded-[26px] p-4">
            {listCauHoi?.map((e, index) => (
              <CauHoi
                key={index}
                STT={(currentPage - 1) * pageSize + index + 1}
                {...e}
              />
            ))}
          </div>
          <div className="p-4 bg-white my-5 rounded-xl shadow-sm">
            <Pagination
              count={totalPage}
              page={currentPage}
              onChange={handleChangeCurrentPage}
              shape="rounded"
            />
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
