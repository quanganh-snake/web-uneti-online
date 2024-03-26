import { Link } from 'react-router-dom'

const DATA1 = [
  {
    Id: '1',
    DoiTuong: 'Nghiên cứu sinh',
    SoThiSinhDuTuyen: '102',
    SoTrungTuyen: '44',
    TiLeCanhTranh: '2.67',
    SoNhapHocThucTe: '48',
    DiemTuyenDauVao: null,
    DiemTBCuaNguoiHocDuocTuyen: '5.47',
    SoLuongNguoiHocQuocTe: '15',
  },
  {
    Id: '2',
    DoiTuong: 'Cao học',
    SoThiSinhDuTuyen: '15',
    SoTrungTuyen: '15',
    TiLeCanhTranh: '10.00',
    SoNhapHocThucTe: '24',
    DiemTuyenDauVao: null,
    DiemTBCuaNguoiHocDuocTuyen: '16.00',
    SoLuongNguoiHocQuocTe: '36',
  },
  {
    Id: '3',
    DoiTuong: 'Đại học',
    SoThiSinhDuTuyen: '2140',
    SoTrungTuyen: '1470',
    TiLeCanhTranh: '9.35',
    SoNhapHocThucTe: '1472',
    DiemTuyenDauVao: null,
    DiemTBCuaNguoiHocDuocTuyen: '17.75',
    SoLuongNguoiHocQuocTe: '57',
  },
]

const KY_TUC_XA = [
  {
    Id: 1,
    TieuChi: 'Tổng diện tích phòng ở (m2)',
    SoLuong: '300',
  },
  {
    Id: 2,
    TieuChi: 'Số lượng người học',
    SoLuong: '2403',
  },
  {
    Id: 3,
    TieuChi: 'Số sinh viên có nhu cầu ở ký túc xá',
    SoLuong: '200',
  },
  {
    Id: 4,
    TieuChi: 'Số lượng người học được ở ký túc xá',
    SoLuong: '522',
  },
]

const USERS_NCKH = [
  {
    Id: 1,
    TieuChi: 'Số lượng (người)',
    SoLuong: '32',
  },
  {
    Id: 2,
    TieuChi: 'Số đề tài',
    SoLuong: '50',
  },
]

export default function ThongKeNguoiHoc() {
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
          Thống kê số lượng người học
        </h3>

        <div className="overflow-x-scroll">
          <table className="border w-full">
            <thead>
              <tr className="bg-uneti-primary-light text-white">
                <th className="px-2 py-3 border-r min-w-[80px]">STT</th>
                <th className="px-2 py-3 border-r min-w-[160px]">Đối tượng</th>
                <th className="px-2 py-3 border-r min-w-[140px]">
                  Số thí sinh dự tuyển
                </th>
                <th className="px-2 py-3 border-r min-w-[140px]">
                  Số trúng tuyển
                </th>
                <th className="px-2 py-3 border-r min-w-[140px]">
                  Tỉ lệ cạnh tranh(%)
                </th>
                <th className="px-2 py-3 border-r min-w-[140px]">
                  Số nhập học thực tế
                </th>
                <th className="px-2 py-3 border-r min-w-[170px]">
                  Điểm tuyển đầu vào (Thang điểm 30)
                </th>
                <th className="px-2 py-3 border-r min-w-[180px]">
                  Điểm trung bình của người học được tuyển
                </th>
                <th className="px-2 py-3 border-r min-w-[180px]">
                  Số lượng người học quốc tế nhập học
                </th>
                <th className="px-2 min-w-[80px]">Tác vụ</th>
              </tr>
            </thead>

            <tbody>
              {DATA1.map((e, i) => (
                <tr key={i} className={`${i % 2 == 1 ? 'bg-gray-100' : ''}`}>
                  <td className="border-r px-2 py-3 text-center">{i + 1}</td>
                  <td className="border-r px-2 py-3">{e.DoiTuong}</td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.SoThiSinhDuTuyen}
                  </td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.SoTrungTuyen}
                  </td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.TiLeCanhTranh}
                  </td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.SoNhapHocThucTe}
                  </td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.DiemTuyenDauVao}
                  </td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.DiemTBCuaNguoiHocDuocTuyen}
                  </td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.SoNhapHocThucTe}
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
          Ký túc xá cho người học
        </h3>
        <div className="overflow-x-scroll">
          <table className="border w-full">
            <thead>
              <tr className="bg-uneti-primary-light text-white">
                <th className="px-2 py-3 border-r min-w-[80px]">STT</th>
                <th className="px-2 py-3 border-r min-w-[300px]">
                  Các tiêu chí
                </th>
                <th className="px-2 py-3 border-r min-w-[140px]">Số lượng</th>
                <th className="px-2 min-w-[80px]">Tác vụ</th>
              </tr>
            </thead>

            <tbody>
              {KY_TUC_XA.map((e, i) => (
                <tr key={i} className={`${i % 2 == 1 ? 'bg-gray-100' : ''}`}>
                  <td className="border-r px-2 py-3 text-center">{i + 1}</td>
                  <td className="border-r px-2 py-3">{e.TieuChi}</td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.SoLuong}
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="uppercase font-semibold mb-2">
          Thống kê lượng người học tham gia nghiên cứu khoa học
        </h3>
        <div className="overflow-x-scroll">
          <table className="border w-full">
            <thead>
              <tr className="bg-uneti-primary-light text-white">
                <th className="px-2 py-3 border-r min-w-[80px]">STT</th>
                <th className="px-2 py-3 border-r min-w-[300px]">
                  Các tiêu chí
                </th>
                <th className="px-2 py-3 border-r min-w-[140px]">Số lượng</th>
                <th className="px-2 min-w-[80px]">Tác vụ</th>
              </tr>
            </thead>

            <tbody>
              {USERS_NCKH.map((e, i) => (
                <tr key={i} className={`${i % 2 == 1 ? 'bg-gray-100' : ''}`}>
                  <td className="border-r px-2 py-3 text-center">{i + 1}</td>
                  <td className="border-r px-2 py-3">{e.TieuChi}</td>
                  <td className="border-r px-2 py-3 text-center">
                    {e.SoLuong}
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
