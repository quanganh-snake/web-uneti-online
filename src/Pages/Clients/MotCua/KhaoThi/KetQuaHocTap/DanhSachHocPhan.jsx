import { Checkbox } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import { isEqual } from 'lodash-unified'

function DanhSachHocPhan(props) {
  const {
    tenDot,
    lyDo,
    listHocPhan,
    listLyDoDTK,
    listLyDoDT,
    handleRowSelection,
    currentPage,
    setCurrentPage,
    selectedRow,
  } = props

  const itemPerPage = 5

  const totalPage = Math.ceil(listHocPhan.length / itemPerPage)

  const listHocPhanShow = listHocPhan.slice(
    itemPerPage * (currentPage - 1),
    itemPerPage * (currentPage - 1) + itemPerPage,
  )

  return (
    <div className="flex flex-col justify-center items-center pb-4">
      <div className="w-[75%] overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr>
              <th className="p-2 text-xs md:text-base font-medium bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                STT
              </th>
              {lyDo !== 'Xem kết quả học tập' && (
                <th className="p-2 text-xs md:text-base font-medium bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                  CHỌN
                </th>
              )}
              <th className="p-2 text-xs md:text-base font-medium bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                MÃ MÔN HỌC
              </th>
              <th className="p-2 text-xs md:text-base font-medium bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                TÊN HỌC PHẦN
              </th>
              <th className="p-2 text-xs md:text-base font-medium bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                ĐIỂM THƯỜNG KỲ
              </th>
              <th className="p-2 text-xs md:text-base font-medium bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                ĐIỂM THI
              </th>
              <th className="p-2 text-xs md:text-base font-medium bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                ĐIỂM TỔNG KẾT
              </th>
            </tr>
          </thead>
          <tbody>
            {listHocPhanShow.length ? (
              listHocPhanShow.map((hocphan, index) => (
                <tr key={index}>
                  <td className="text-center p-3 border border-solid border-[#dee2e6]">
                    {(currentPage - 1) * itemPerPage + index + 1}
                  </td>
                  {lyDo !== 'Xem kết quả học tập' && (
                    <td className="text-center p-3 border border-solid border-[#dee2e6]">
                      <Checkbox
                        checked={isEqual(selectedRow, hocphan)}
                        onChange={() => {
                          handleRowSelection(hocphan)
                        }}
                      />
                    </td>
                  )}
                  <td className="text-center p-3 border border-solid border-[#dee2e6]">
                    {hocphan.MaMonHoc}
                  </td>
                  <td className="text-center p-3 border border-solid border-[#dee2e6]">
                    {hocphan.TenMonHoc}
                  </td>
                  <td className="text-center p-3 border border-solid border-[#dee2e6]">
                    {hocphan.DiemThuongKy1}
                  </td>
                  <td className="text-center p-3 border border-solid border-[#dee2e6]">
                    {hocphan.DiemThi}
                  </td>
                  <td className="text-center p-3 border border-solid border-[#dee2e6]">
                    {hocphan.DiemTongKet}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center p-3 border border-solid border-[#dee2e6]"
                >
                  Hiện tại chưa có dữ liệu học phần cho học kỳ này!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPage > 1 && (
        <div className="w-full flex justify-center items-center mt-4">
          <Pagination
            count={totalPage}
            page={currentPage}
            variant="outlined"
            shape="rounded"
            color="primary"
            onChange={(e, value) => setCurrentPage(value)}
          />
        </div>
      )}
    </div>
  )
}

export default DanhSachHocPhan
