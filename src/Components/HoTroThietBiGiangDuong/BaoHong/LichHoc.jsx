import { Checkbox } from '@mui/material'
import dayjs from 'dayjs'
import { useState } from 'react'

export default function LichHoc(props) {
  const { listLichHoc, selectedLichHoc, handleSelectLichHoc } = props

  return (
    <div className="w-full overflow-x-auto">
      <h3 className="mb-4 font-bold text-vs-danger text-xl italic">
        LỊCH HỌC:
      </h3>
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
              #
            </th>
            <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6] min-w-[100px]">
              Tên phòng
            </th>
            <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6] min-w-[100px]">
              Mã lớp học phần
            </th>
            <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6] min-w-[100px]">
              Tên môn học
            </th>
            <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6] min-w-[100px]">
              Tên lớp học
            </th>
            <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6] min-w-[50px]">
              Tiết
            </th>
          </tr>
        </thead>
        <tbody>
          {listLichHoc.length ? (
            listLichHoc.map((lh, index) => (
              <tr key={index}>
                <td className="p-2 border border-solid border-[#dee2e6] text-center">
                  <Checkbox
                    checked={
                      selectedLichHoc.DT_CVNB_TBGD_LichHoc_MaLopHocPhan ===
                      lh.DT_CVNB_TBGD_LichHoc_MaLopHocPhan
                    }
                    onChange={(e) => handleSelectLichHoc(e, lh)}
                  />
                </td>
                <td className="p-2 border border-solid border-[#dee2e6]">
                  {lh.DT_CVNB_TBGD_LichHoc_TenPhong}
                </td>
                <td className="p-2 border border-solid border-[#dee2e6] text-center">
                  {lh.DT_CVNB_TBGD_LichHoc_MaLopHocPhan}
                </td>
                <td className="p-2 border border-solid border-[#dee2e6]">
                  {lh.DT_CVNB_TBGD_LichHoc_TenHocPhan}
                </td>
                <td className="p-2 border border-solid border-[#dee2e6] text-center">
                  {lh.DT_CVNB_TBGD_LichHoc_TenLopHoc}
                </td>
                <td className="p-2 border border-solid border-[#dee2e6] text-center">
                  {`${lh.DT_CVNB_TBGD_LichHoc_TuTiet} - ${lh.DT_CVNB_TBGD_LichHoc_DenTiet}`}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="text-center p-3 border border-solid border-[#dee2e6]"
              >
                Hiện tại chưa có dữ liệu để hiển thị
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
