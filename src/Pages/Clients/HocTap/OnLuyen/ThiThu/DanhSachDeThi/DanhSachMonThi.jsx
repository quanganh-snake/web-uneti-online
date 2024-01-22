import {
  getAllDeThiThiThu,
  getAllMonHocThiThu,
} from '@/Apis/HocTap/apiOnLuyenThiThu'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import iconThiThu from '@/assets/Icons/icon-thithu.png'
import XacNhanThi from '@/Components/HocTap/Promt/XacNhanThi'

function DanhSachDeThi() {
  const uLocation = useLocation()

  const navigate = useNavigate()

  const id = uLocation.pathname.split('/').at(-1)?.toString()

  const [listDeThi, setListDeThi] = useState([])

  const [monHoc, setMonHoc] = useState({})

  const dataSV = DataSinhVien()

  useEffect(() => {
    getAllDeThiThiThu(id).then((res) => {
      if (!res?.data?.body[0]) {
        navigate('/hoctap/onluyen/thithu')
        return
      }

      setListDeThi(res?.data?.body)
    })

    getAllMonHocThiThu(dataSV.MaSinhVien).then((res) => {
      if (
        !res?.data?.body.filter((mh) => mh.MaMonHoc.toString() === id).length
      ) {
        navigate('/hoctap/onluyen/thithu')
      }
      setMonHoc(
        res?.data?.body.filter((mh) => mh.MaMonHoc.toString() === id)[0],
      )
    })

    return () => {
      setListDeThi([])
      setMonHoc({})
    }
  }, [])

  const handleBatDauThi = (deThi) => {
    navigate(`dethi/${deThi.MaDeThi}`)
  }

  return (
    <div className="flex flex-col justify-start items-center gap-4">
      <h3 className="text-uneti-primary text-center font-bold text-2xl">
        {monHoc.TenMonHoc}
      </h3>
      <span className="text-uneti-primary text-sm">
        Mã Môn Học: {monHoc.MaMonHoc}
      </span>
      <div className="w-full flex flex-col gap-4 pb-2">
        {listDeThi.map((dt, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-md duration-200 w-full flex p-4 justify-between items-center gap-4 text-vs-text"
          >
            <div>
              <img src={iconThiThu} />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <span className="font-semibold">{dt.TenDeThi}</span>
              <span className="text-sm">Mã đề: {dt.MaDeThi}</span>
            </div>
            <div>
              <XacNhanThi
                onConfirm={handleBatDauThi}
                TenMonHoc={monHoc.TenMonHoc}
                {...dt}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DanhSachDeThi
