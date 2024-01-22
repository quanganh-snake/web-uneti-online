import { getAllMonHocThiThu } from '@/Apis/HocTap/apiOnLuyenThiThu'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { at } from 'lodash-unified'
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

  useEffect(() => {
    getAllMonHocThiThu(dataSV.MaSinhVien).then((res) => {
      if (
        !res?.data?.body.filter((mh) => mh.MaMonHoc.toString() === maMonHoc)
          .length
      ) {
        navigate('/hoctap/onluyen/thithu')
      }
      setMonHoc(
        res?.data?.body.filter((mh) => mh.MaMonHoc.toString() === maMonHoc)[0],
      )
    })
  }, [])

  return (
    <div>
      <div className="flex justify-center items-center flex-col gap-4 rounded-md bg-white p-4">
        <h3 className="text-uneti-primary font-bold text-4xl">
          {monHoc.TenMonHoc}
        </h3>
        <span className="text-uneti-primary text-sm">
          Mã Môn Học: {monHoc.MaMonHoc}
        </span>
      </div>
      <div>
        <div>Câu Hỏi</div>
        <div>Điều khiển</div>
      </div>
    </div>
  )
}

export default DeThi
