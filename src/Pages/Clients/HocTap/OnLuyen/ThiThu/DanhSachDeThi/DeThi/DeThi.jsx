import {
  getAllDeThiThiThu,
  getAllMonHocThiThu,
} from '@/Apis/HocTap/apiOnLuyenThiThu'
import {
  getCauHoiTheoDe,
  getTongSoTrangTheoDe,
} from '@/Apis/HocTap/apiOnLuyenTracNghiem'
import Col from '@/Components/Base/Col/Col'
import Row from '@/Components/Base/Row/Row'
import CauHoi from '@/Components/HocTap/OnTap/CauHoi'
import XacNhanNopBai from '@/Components/HocTap/Promt/XacNhanNopBai'
import { OnTapContext } from '@/Services/Tokens'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { Pagination } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function DeThi() {
  const uLocation = useLocation()
  const dataSV = DataSinhVien()
  const navigate = useNavigate()

  const maMonHoc = uLocation.pathname.split('/').at(-3).toString()
  const maDe = uLocation.pathname.split('/').at(-1).toString()

  const [monHoc, setMonHoc] = useState({})
  const [listCauHoi, setListCauHoi] = useState([])
  const [listCauTraLoi, setListCauTraLoi] = useState([])
  const [deThi, setDeThi] = useState()

  const [totalPage, setTotalPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)

  const handleChangeCauTraLoi = (IDCauHoi, IDCauTraLoi) => {
    setListCauTraLoi({
      ...listCauTraLoi,
      [IDCauHoi]: IDCauTraLoi,
    })
  }

  const handleChangeCurrentPage = (event, value) => {
    setCurrentPage(value)
  }

  useEffect(() => {
    const getMonThi = async () => {
      const listMonThi = await getAllMonHocThiThu(dataSV.MaSinhVien)
      const _monHoc = listMonThi?.data?.body.find(
        (mh) => mh.MaMonHoc === maMonHoc,
      )

      if (!_monHoc) {
        navigate('/hoctap/onluyen/thithu')
      }

      setMonHoc(_monHoc)
    }

    const getDeThi = async () => {
      const _listDeThi = await getAllDeThiThiThu(maMonHoc)
      const _deThi = _listDeThi.data.body.find((e) => e.MaDeThi == maDe)

      if (!_deThi) {
        navigate('/hoctap/onluyen/thithu')
      }

      setDeThi(_deThi)
    }

    getMonThi()
    getDeThi()
  }, [maMonHoc, maDe])

  useEffect(() => {
    const getTongSoTrang = async () => {
      if (deThi) {
        const _tongSoTrangResponse = await getTongSoTrangTheoDe({
          IDDeThi: deThi.Id,
          SoCauTrenTrang: pageSize,
        })

        setTotalPage(_tongSoTrangResponse.data.body[0].TongSoTrang)
      }
    }

    const getListCauHoi = async () => {
      if (deThi) {
        const res = await getCauHoiTheoDe({
          IDDeThi: deThi.Id,
          SoCauTrenTrang: pageSize,
          SoTrang: currentPage,
        })

        setListCauHoi(res.data.body)
      }
    }

    getTongSoTrang()
    getListCauHoi()
  }, [deThi, pageSize, currentPage])

  const handleXacNhanNopBai = () => {
    console.log('Nộp bài')
  }

  return (
    <OnTapContext.Provider
      value={{
        selected: listCauTraLoi,
        handleSelected: handleChangeCauTraLoi,
      }}
    >
      <div className="flex justify-center items-center flex-col gap-4 rounded-md bg-white p-4">
        <h3 className="text-uneti-primary text-center font-semibold text-2xl">
          {monHoc.TenMonHoc}
        </h3>
        <span className="text-uneti-primary text-sm">
          Mã Môn Học: {monHoc.MaMonHoc}
        </span>
      </div>
      <div className="mt-6">
        <Row gutter={30}>
          <Col span={9}>
            <div className="flex flex-col gap-3 p-6 bg-white rounded-[26px] shadow-sm">
              {listCauHoi.map((e, index) => (
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
          </Col>
          <Col span={3}>
            <XacNhanNopBai
              TenMonHoc={monHoc.TenMonHoc}
              onConfirm={handleXacNhanNopBai}
            />
          </Col>
        </Row>
      </div>
    </OnTapContext.Provider>
  )
}

export default DeThi
