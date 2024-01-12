import moment from 'moment'
import DataTable from '@/Components/Base/DataTable/DataTable'
import { useBem } from '@/Services/Hooks'

export const LichThiViewXemDanhSach = (props) => {
  const { listHocPhan } = props

  const bem = useBem('data-table')

  const thead = () => (
    <>
      <tr className="text-center">
        <th scope="col" className={bem.is('sticky')}>
          <div className="h-full">STT</div>
        </th>
        <th scope="col">Mã lớp học phần</th>
        <th scope="col" className={bem.is('sticky')}>
          Tên học phần
        </th>
        <th scope="col">Hình thức thi</th>
        <th scope="col">Ngày thi</th>
        <th scope="col" className="px-6 py-3 border border-r">
          Nhóm
        </th>
        <th scope="col" className="px-6 py-3 border border-r">
          Tiết
        </th>
        <th scope="col">Phòng thi</th>
        <th scope="col">Số báo danh</th>
        <th scope="col" className="whitespace-nowrap text-center border">
          <p className="border-b w-full py-3">Điểm</p>
          <table>
            <tbody>
              <tr>
                <td className="whitespace-nowrap border-r">
                  <p className="py-2 border-b">Điểm thi</p>
                  <table>
                    <tbody>
                      <tr>
                        <td className="whitespace-nowrap px-6 py-2 border-r">
                          Lần 1
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">Thi lại</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td className="whitespace-nowrap border-r">
                  <p className="py-2 border-b">Điểm tổng kết</p>
                  <table>
                    <tbody>
                      <tr>
                        <td className="whitespace-nowrap px-6 py-2 border-r">
                          Lần 1
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">Thi lại</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </th>
      </tr>
    </>
  )

  const tbody = () =>
    listHocPhan && listHocPhan.length > 0 ? (
      listHocPhan.map((hocphan, index) => {
        return (
          <tr key={index}>
            <td scope="row" className={bem.is('sticky')}>
              <div>{index + 1}</div>
            </td>
            <td scope="row">
              {hocphan.MaLopHocPhan
                ? hocphan.MaLopHocPhan
                : hocphan.KhongCoLich_MaHocPhan
                  ? hocphan.KhongCoLich_MaHocPhan
                  : ''}
            </td>
            <td className={bem.is('sticky')}>
              <p>
                {hocphan.TenMonHoc
                  ? hocphan.TenMonHoc
                  : hocphan.KhongCoLich_TenMonHoc}
              </p>
            </td>
            <td className="px-6 py-4">
              <p>{hocphan.TenHinhThucThi ? hocphan.TenHinhThucThi : ''}</p>
            </td>
            <td>
              <p>
                {hocphan.Thu && hocphan.NgayThi
                  ? hocphan.Thu == 8
                    ? 'Chủ nhật'
                    : 'Thứ ' +
                      hocphan.Thu +
                      ', ' +
                      moment(hocphan.NgayThi).format('DD/MM/YYYY')
                  : ''}
              </p>
            </td>
            <td className="px-6 py-4">
              <p className="text-center">{hocphan.Nhom}</p>
            </td>
            <td>
              <p>
                {hocphan.TuTiet && hocphan.DenTiet
                  ? hocphan.TuTiet + ' - ' + hocphan.DenTiet
                  : ''}
              </p>
            </td>
            <td>
              <p>{hocphan.TenPhong ? hocphan.TenPhong : ''}</p>
            </td>
            <td>
              <p className="text-center">{hocphan.SBD ? hocphan.SBD : ''}</p>
            </td>
            <td className="whitespace-nowrap">
              <div className="w-full flex items-center">
                <div className="w-1/2 flex items-center">
                  <p className="px-6 py-4 text-center w-1/2">
                    {hocphan.DiemThi
                      ? hocphan.DiemThi
                      : hocphan.DiemThi1
                        ? hocphan.DiemThi1
                        : ''}
                  </p>
                  <p className="px-6 py-4 text-center w-1/2">
                    {hocphan.DiemThi2 ? hocphan.DiemThi2 : ''}
                  </p>
                </div>
                <div className="w-1/2 flex items-center">
                  <p className="px-6 py-4 text-center w-1/2">
                    {hocphan.DiemTongKet
                      ? hocphan.DiemTongKet
                      : hocphan.DiemTongKet1
                        ? hocphan.DiemTongKet1
                        : ''}
                  </p>
                  <p className="px-6 py-4 text-center w-1/2">
                    {hocphan.DiemTongKet2 ? hocphan.DiemTongKet2 : ''}
                  </p>
                </div>
              </div>
            </td>
          </tr>
        )
      })
    ) : (
      <tr>
        <td colSpan={`10`}>
          <p className="p-4 text-center font-bold text-red-600">
            Không có dữ liệu!
          </p>
        </td>
      </tr>
    )

  return (
    <>
      <DataTable thead={thead()} tbody={tbody()} />
    </>
  )
}

export default LichThiViewXemDanhSach
