import dayjs from 'dayjs'
import DataTable from '@/Components/DataTable/DataTable'

export const LichThiViewKhongCoLich = ({ listHocPhan }) => {
  return (
    <>
      <DataTable
        thead={
          <tr>
            <th scope='col' className='p-4 border border-r'>
              STT
            </th>
            <th scope='col' className='p-4 border border-r'>
              Mã lớp
            </th>
            <th
              scope='col'
              className='px-6 py-3 whitespace-nowrap border border-r'
            >
              Tên môn
            </th>
            <th
              scope='col'
              className='px-6 py-3 whitespace-nowrap border border-r'
            >
              Hình thức thi
            </th>
            <th
              scope='col'
              className='px-6 py-3 whitespace-nowrap border border-r'
            >
              Ngày thi
            </th>
            <th
              scope='col'
              className='px-6 py-3 whitespace-nowrap border border-r'
            >
              Thứ
            </th>
            <th
              scope='col'
              className='px-6 py-3 whitespace-nowrap border border-r'
            >
              Nhóm
            </th>
            <th
              scope='col'
              className='px-6 py-3 whitespace-nowrap border border-r'
            >
              Tiết
            </th>
            <th
              scope='col'
              className='px-6 py-3 whitespace-nowrap border border-r'
            >
              Phòng thi
            </th>
          </tr>
        }
        tbody={
          listHocPhan?.length > 0 ? (
            listHocPhan.map((hocphan, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{hocphan.MaLopHocPhan}</td>
                <td>{hocphan.TenMonHoc}</td>
                <td>{hocphan.TenHinhThucThi}</td>
                <td>{dayjs(hocphan.NgayThi).format('DD/MM/YYYY')}</td>
                <td>{hocphan.Thu}</td>
                <td>{hocphan.Nhom}</td>
                <td>{hocphan.Tiet}</td>
                <td>{hocphan.TenPhong}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={`10`}>
                <p className='p-4 text-center font-bold text-red-600'>
                  Không có dữ liệu!
                </p>
              </td>
            </tr>
          )
        }
      />
    </>
  )
}

export default LichThiViewKhongCoLich
