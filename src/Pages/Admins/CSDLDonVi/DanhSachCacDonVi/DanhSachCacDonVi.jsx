import { Link } from 'react-router-dom'

const DATA1 = [
  {
    Id: '1',
    Khoa: 'Nghiên cứu sinh',
    DaiHocSoCTDT: '102',
    DaiHocSoSinhVien: '44',
    ThacSiSoCTDT: '67',
    ThacSiSoNguoiHoc: '48',
    KhacSoCTDT: '30',
    KhacSoNguoiHoc: '57',
    SoLuongNguoiHocQuocTe: '15',
  },
  {
    Id: '2',
    Khoa: 'Cao học',
    DaiHocSoCTDT: '15',
    DaiHocSoSinhVien: '15',
    ThacSiSoCTDT: '100',
    ThacSiSoNguoiHoc: '24',
    KhacSoCTDT: '30',
    KhacSoNguoiHoc: '160',
    SoLuongNguoiHocQuocTe: '36',
  },
  {
    Id: '3',
    Khoa: 'Đại học',
    DaiHocSoCTDT: '2140',
    DaiHocSoSinhVien: '1470',
    ThacSiSoCTDT: '35',
    ThacSiSoNguoiHoc: '1472',
    KhacSoCTDT: '30',
    KhacSoNguoiHoc: '175',
    SoLuongNguoiHocQuocTe: '57',
  },
]

const DS_DON_VI = []

export default function DanhSachCacDonVi() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Link to="/csdl-don-vi/tong-quan">
          <button className="base-button bg-uneti-primary">Quay lại</button>
        </Link>

        <h3>
          Thống kê người học -{' '}
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
        <h3 className="uppercase font-semibold mb-2">
          Danh sách các đơn vị đào tạo
        </h3>

        <div className="overflow-x-scroll">
          <table className="border w-full">
            <thead>
              <tr className="bg-uneti-primary-light text-white">
                <th rowSpan={2} className="px-2 py-3 border-r min-w-[80px]">
                  STT
                </th>
                <th rowSpan={2} className="px-2 py-3 border-r min-w-[160px]">
                  Khoa/Viện đào tạo
                </th>
                <th colSpan={2} className="px-2 py-3 border-r border-b">
                  Đại học
                </th>
                <th colSpan={2} className="px-2 py-3 border-r border-b">
                  Thạc sĩ
                </th>
                <th colSpan={2} className="px-2 py-3 border-r border-b">
                  Khác
                </th>
                <th rowSpan={2} className="px-2 min-w-[80px]">
                  Tác vụ
                </th>
              </tr>

              <tr className="bg-uneti-primary-light text-white">
                <th className="px-2 py-3 border-r min-w-[100px]">Số CTĐT</th>
                <th className="px-2 py-3 border-r min-w-[100px]">
                  Số sinh viên
                </th>
                <th className="px-2 py-3 border-r min-w-[100px]">Số CTĐT</th>
                <th className="px-2 py-3 border-r min-w-[100px]">
                  Số người học
                </th>
                <th className="px-2 py-3 border-r min-w-[100px]">Số CTĐT</th>
                <th className="px-2 py-3 border-r min-w-[100px]">
                  Số người học
                </th>
              </tr>
            </thead>

            <tbody>
              {DATA1.map((e, i) => (
                <tr key={i} className={`${i % 2 == 1 ? 'bg-gray-100' : ''}`}>
                  <td className="border-r px-2 py-3 text-center">{i + 1}</td>
                  <td className="border-r px-2 py-3">{e.Khoa}</td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.DaiHocSoCTDT}
                  </td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.DaiHocSoSinhVien}
                  </td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.ThacSiSoCTDT}
                  </td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.ThacSiSoNguoiHoc}
                  </td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.KhacSoCTDT}
                  </td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.KhacSoNguoiHoc}
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="my-4">
        <h3 className="uppercase font-semibold mb-2">
          Danh sách các đơn vị trực thuộc
        </h3>
        <div className="overflow-x-scroll">
          <table className="border w-full">
            <thead>
              <tr className="bg-uneti-primary-light text-white">
                <th className="px-2 py-3 border-r min-w-[80px]">STT</th>
                <th className="px-2 py-3 border-r min-w-[300px]">Tên đơn vị</th>
                <th className="px-2 py-3 border-r min-w-[140px]">
                  Năm thành lập
                </th>
                <th className="px-2 py-3 border-r min-w-[120px]">
                  Lĩnh vực hoạt động
                </th>
                <th className="px-2 py-3 border-r min-w-[120px]">
                  Số lượng nghiên cứu viên
                </th>
                <th className="px-2 py-3 border-r min-w-[120px]">
                  Số lượng cán bộ/nhân viên
                </th>
                <th className="px-2 py-3 min-w-[80px]">Tác vụ</th>
              </tr>
            </thead>

            <tbody>
              {DS_DON_VI.map((e, i) => (
                <tr key={i} className={`${i % 2 == 1 ? 'bg-gray-100' : ''}`}>
                  <td className="border-r px-2 py-3 text-center">{i + 1}</td>
                  <td className="border-r px-2 py-3">{e.TenDonVi}</td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.NamThanhLap}
                  </td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.LinhVucHoatDong}
                  </td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.SoNghienCuuVien}
                  </td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.SoCanBoNhanVien}
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
