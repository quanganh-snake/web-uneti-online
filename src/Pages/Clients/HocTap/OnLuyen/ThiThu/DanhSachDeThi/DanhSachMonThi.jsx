import {
  getAllDeThiThiThu,
  getAllMonHocThiThu,
} from '@/Apis/HocTap/apiOnLuyenThiThu'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import iconThiThu from '@/assets/Icons/icon-thithu.png'
import XacNhanThi from '@/Components/HocTap/Promt/XacNhanThi'
import MonHoc from '@/Components/HocTap/OnTap/MonHoc'

function DanhSachDeThi() {
  const uLocation = useLocation()

  const navigate = useNavigate()

  const id = uLocation.pathname.split('/').pop()

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
      <div className="w-full flex flex-col gap-4 p-6 rounded-[30px] shadow-sm bg-white">
        {listDeThi.map((dt, index) => (
          <MonHoc
            key={index}
            icon={iconThiThu}
            TenMonHoc={dt.TenDeThi}
            MaMonHoc={`Mã đề: ${dt.MaDeThi}`}
          >
            <XacNhanThi
              onConfirm={handleBatDauThi}
              TenMonHoc={monHoc.TenMonHoc}
              {...dt}
            />
          </MonHoc>
        ))}
      </div>
    </div>
  )
}

export default DanhSachDeThi
