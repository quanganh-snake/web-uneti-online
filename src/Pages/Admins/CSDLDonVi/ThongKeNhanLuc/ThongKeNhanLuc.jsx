import Icon from '@/Components/Base/Icon/Icon'
import { RotateLeft } from '@/Components/Base/Icons/RotateLeft'
import AdvanceSearch from '@/Components/KiemDinhChatLuong/AdvanceSearch'
import { useNamespace } from '@/Services/Hooks'
import { transformCls } from '@/Services/Utils/reactUtils'
import { Pagination, Tooltip } from '@mui/material'
import { BiChevronDown } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const DATA = [
  {
    Id: '1',
    HoTen: 'Phó chủ tịch',
    SoDT: '01223564',
    HocVi: 'Tiến sĩ khoa học',
    ChucDanh: 'Giảng viên',
    ChucVuChuyenMon: 'Giảng viên',
    DonVi: 'Khoa Điện tử',
  },
  {
    Id: '2',
    HoTen: 'Trưởng ban thư ký',
    SoDT: '01223564',
    HocVi: 'Tiến sĩ',
    ChucDanh: 'Giảng viên',
    ChucVuChuyenMon: 'Giảng viên',
    DonVi: 'Khoa Điện tử',
  },
]

export default function ThongKeNhanLuc() {
  const ns = useNamespace('kiem-dinh-chat-luong')

  return (
    <div className="box">
      <div className="flex justify-between items-center">
        <Link to="/csdl-don-vi/tong-quan">
          <button className="base-button bg-uneti-primary">Quay lại</button>
        </Link>

        <h3>
          Thống kê nhân lực -{' '}
          <span className="font-semibold">
            Trường Đại học Kinh tế - Kỹ thuật Công nghiệp
          </span>
        </h3>
      </div>

      <div className="uneti-divider" />

      <div className="flex justify-end items-center gap-2">
        <span>Năm: </span>
        <select className="base-input">
          <option>2022 - 2023</option>
          <option>2023 - 2024</option>
        </select>
      </div>

      <div className="my-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="uppercase font-semibold">
            Danh sách các bộ giảng viên / nhân viên
          </h3>

          <div className={ns.e('actions')}>
            <AdvanceSearch />

            <Tooltip title="Tải lại dữ liệu">
              <button className="icon-btn">
                <Icon>
                  <RotateLeft />
                </Icon>
              </button>
            </Tooltip>
            <button className="base-button bg-uneti-primary-lighter">
              Xuất file
            </button>
          </div>
        </div>

        <div className="overflow-x-scroll">
          <table className="border w-full">
            <thead>
              <tr className="tr">
                <th className="th min-w-[80px]">STT</th>
                <th className="th min-w-[160px]">Họ tên</th>
                <th className="th">Số ĐT</th>
                <th className="th">Học hàm học vị</th>
                <th className="th">Chức danh</th>
                <th className="th">Chức vụ chuyên môn</th>
                <th className="th">Đơn vị</th>
                <th className="th min-w-[80px]">Tác vụ</th>
              </tr>
            </thead>

            <tbody>
              {DATA.map((e, i) => (
                <tr key={i} className="tr">
                  <td className="td text-center">{i + 1}</td>
                  <td className="td">{e.HoTen}</td>
                  <td className="td text-center">{e.SoDT}</td>
                  <td className="td text-center">{e.HocVi}</td>
                  <td className="td text-center">{e.ChucDanh}</td>
                  <td className="td text-center">{e.ChucVuChuyenMon}</td>
                  <td className="td text-center">{e.DonVi}</td>
                  <td className="td text-center">{e.KhacSoNguoiHoc}</td>
                  <td></td>
                </tr>
              ))}

              <tr>
                <td colSpan={8}>
                  <div className="flex justify-center my-2">
                    <Pagination />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
