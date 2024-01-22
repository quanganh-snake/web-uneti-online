import {
  getAllDeThiThiThu,
  getAllMonHocThiThu,
} from '@/Apis/HocTap/apiOnLuyenThiThu'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import iconThiThu from '@/assets/Icons/icon-thithu.png'

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

  return (
    <div className="flex flex-col justify-start items-center gap-4">
      <h3 className="text-uneti-primary font-bold text-4xl">
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
              <span className="font-bold">{dt.TenDeThi}</span>
              <span className="text-sm">Mã đề: {dt.MaDeThi}</span>
            </div>
            <div>
              <Link to={`dethi/${dt.MaDeThi}`}>
                <button className="rounded-lg text-white bg-uneti-primary px-4 py-2 bg-opacity-80 hover:bg-opacity-100 duration-200">
                  Bắt Đầu Thi
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DanhSachDeThi
