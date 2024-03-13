import {
  getMonHocTheoSinhVien,
  getPhanTheoMonHoc,
} from '@/Apis/HocTap/apiOnLuyenTracNghiem'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { isNil } from 'lodash-unified'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import IconOnLuyen from '@/assets/Icons/icon-onluyen.png'

function DanhSachPhan() {
  // lấy mã môn học
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const maMonHoc = pathname.split('/').at(-1).toString()

  const [listPhanCauHoi, setListPhanCauHoi] = useState([])

  const [monHoc, setMonHoc] = useState(null)

  const dataSV = DataSinhVien()

  useEffect(() => {
    // lấy thông tin môn học
    const getThongTinMonHoc = async () => {
      const resData = await getMonHocTheoSinhVien(dataSV.MaSinhVien)
      const data = await resData?.data?.body
      const filterData = data.filter(
        (element) => element.MaMonHoc.toString() === maMonHoc,
      )[0]

      if (isNil(filterData)) {
        //   nếu không tìm thấy môn học nào thì trở lại trang danh sách
        navigate('/hoc-tap/on-luyen/on-tap')
      } else {
        setMonHoc(filterData)
      }
    }

    const getAllPhanCauHoi = async () => {
      const resData = await getPhanTheoMonHoc(maMonHoc)
      const data = await resData?.data?.body

      setListPhanCauHoi(data)
    }

    getThongTinMonHoc()
    getAllPhanCauHoi()
  }, [])

  useEffect(() => {
    if (listPhanCauHoi.some((e) => isNil(e.MaPhan))) {
      navigate(pathname + '/danh-sach-chuong/all/danh-sach-cau-hoi/all')
    }
  }, [listPhanCauHoi])

  return (
    <div>
      <div className="flex flex-col text-center justify-start items-center gap-4 bg-white shadow-sm rounded-[26px] mb-4 p-4">
        <h3 className="text-uneti-primary text-center font-semibold text-xl">
          {monHoc?.TenMonHoc}
        </h3>
        <span className="text-uneti-primary text-sm">
          Mã Môn Học: {monHoc?.MaMonHoc}
        </span>
      </div>
      <div className="flex flex-col text-center justify-start items-center gap-4 bg-white shadow-sm rounded-[26px] mb-4 p-4">
        {listPhanCauHoi.map((element, index) => (
          <Link
            to={`danh-sach-chuong/${element.Id}`}
            // to={`danh-sach-chuong/774`}
            key={index}
            className="w-full"
          >
            <div className="cursor-pointer rounded-[32px] border-2 border-slate-200 transition-all hover:border-vs-primary hover:shadow-sm duration-200 w-full flex p-4 justify-between items-center gap-4">
              <div>
                <img src={IconOnLuyen} />
              </div>
              <div className="flex-1 flex flex-col justify-between items-start gap-4">
                <span className="font-semibold">{element.TenPhan}</span>
                <span className="text-sm">{element.MaPhan}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DanhSachPhan
