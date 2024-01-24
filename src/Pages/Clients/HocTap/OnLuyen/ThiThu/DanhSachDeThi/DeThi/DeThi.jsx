import {
  getAllDeThiThiThu,
  getAllMonHocThiThu,
} from '@/Apis/HocTap/apiOnLuyenThiThu'
import {
  getCauHoiTheoDe,
  getTongSoTrangTheoDe,
} from '@/Apis/HocTap/apiOnLuyenTracNghiem'
import XacNhanNopBai from '@/Components/HocTap/Promt/XacNhanNopBai'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
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
  const [deThi, setDeThi] = useState()

  const [totalPage, setTotalPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

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
    const getCauHoi = async () => {}

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
  }, [deThi, pageSize])

  const handleXacNhanNopBai = () => {
    console.log('Nộp bài')
  }

  return (
    <div>
      <div className="flex justify-center items-center flex-col gap-4 rounded-md bg-white p-4">
        <h3 className="text-uneti-primary text-center font-semibold text-2xl">
          {monHoc.TenMonHoc}
        </h3>
        <span className="text-uneti-primary text-sm">
          Mã Môn Học: {monHoc.MaMonHoc}
        </span>
      </div>
      <div>
        <XacNhanNopBai
          TenMonHoc={monHoc.TenMonHoc}
          onConfirm={handleXacNhanNopBai}
        />
        <div>Câu Hỏi</div>
        <div>Điều khiển</div>
      </div>
    </div>
  )
}

export default DeThi
