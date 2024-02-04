import {
  getChuongTheoPhanCauHoi,
  getMonHocTheoSinhVien,
  getPhanTheoMonHoc,
} from '@/Apis/HocTap/apiOnLuyenTracNghiem'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { isNil } from 'lodash-unified'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import IconOnLuyen from '@/assets/Icons/icon-onluyen.png'

function DanhSachChuong() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dataSV = DataSinhVien()

  const IdPhan = pathname.split('/').at(-1)
  const maMonHoc = pathname.split('/').at(-3)

  const [monHoc, setMonHoc] = useState(null)
  const [phanCauHoi, setPhanCauHoi] = useState(null)
  const [listChuong, setListChuong] = useState([])

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
        navigate('/hoctap/onluyen/ontap')
      } else {
        setMonHoc(filterData)
      }
    }

    // lấy phần câu hỏi
    const getThongTinPhanCauHoi = async () => {
      const resData = await getPhanTheoMonHoc(maMonHoc)
      const data = await resData?.data?.body
      const filterData = data.filter(
        (element) => element.Id.toString() === IdPhan,
      )[0]

      if (isNil(filterData)) {
        //   nếu không tìm thấy môn học nào thì trở lại trang danh sách
        navigate(`/hoctap/onluyen/ontap/danhsachphan/${maMonHoc}`)
      } else {
        setPhanCauHoi(filterData)
      }
    }

    // lấy danh sách chương
    const getAllChuong = async () => {
      const resData = await getChuongTheoPhanCauHoi(IdPhan)
      const data = await resData?.data?.body

      setListChuong(data)
    }

    getThongTinMonHoc()
    getThongTinPhanCauHoi()
    getAllChuong()
  }, [])

  return (
    <div>
      <div className="flex flex-col text-center justify-start items-center gap-4 bg-white shadow-sm rounded-[26px] mb-4 p-4">
        <h3 className="text-uneti-primary uppercase text-center font-semibold text-xl">
          {monHoc?.TenMonHoc}
        </h3>
        <span className="text-uneti-primary uppercase text-sm">
          {phanCauHoi?.TenPhan}
        </span>
      </div>
      <div className="flex flex-col text-center justify-start items-center gap-4 bg-white shadow-sm rounded-[26px] mb-4 p-4">
        {listChuong.map((element, index) => (
          <div
            key={index}
            className="cursor-pointer rounded-[32px] border-2 border-slate-200 transition-all hover:border-vs-primary hover:shadow-sm duration-200 w-full flex p-4 justify-between items-center gap-4"
          >
            <div>
              <img src={IconOnLuyen} />
            </div>
            <div className="flex-1 flex flex-col justify-between items-start gap-4">
              <span className="font-semibold">{element.TenChuong}</span>
              <span className="text-sm">{element.MaChuong}</span>
            </div>
            <div>
              <Link
                to={`danhsachcauhoi/${element.Id}`}
                // to={`danhsachcauhoi/2415`}
                className="w-full"
              >
                <button>Ôn luyện</button>
              </Link>
              <Link
                to={`dapan/${element.Id}`}
                // to={`dapan/2415`}
                className="w-full"
              >
                <button>Đáp án</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DanhSachChuong
