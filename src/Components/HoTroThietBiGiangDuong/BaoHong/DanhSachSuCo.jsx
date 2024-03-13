import { Checkbox } from '@mui/material'
import React from 'react'

export default function DanhSachSuCo(props) {
  const { listSuCo, selectedSuCo, handleSelectSuCo } = props
  return (
    <div className="mt-4 w-full overflow-x-auto">
      <h3 className="mb-4 font-semibold text-vs-danger text-xl italic">
        DANH SÁCH SỰ CỐ:
      </h3>
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2 text-xs md:text-base font-medium bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
              #
            </th>
            <th className="p-2 text-xs md:text-base font-medium bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
              Tên sự cố
            </th>
            <th className="p-2 text-xs md:text-base font-medium bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
              Đề xuất phương án khắc phục
            </th>
          </tr>
        </thead>
        <tbody>
          {listSuCo.length ? (
            listSuCo.map((sc, index) => (
              <tr key={index}>
                <td className="px-2 border border-solid border-[#dee2e6] text-center">
                  <Checkbox
                    checked={selectedSuCo.includes(sc)}
                    onChange={(e) => handleSelectSuCo(e, sc)}
                  />
                </td>
                <td className="px-2 border border-solid border-[#dee2e6]">
                  {sc.DT_CVNB_TBGD_TL_Ten}
                  abc
                </td>
                <td className="px-2 border border-solid border-[#dee2e6]">
                  {sc.DT_CVNB_TBGD_TL_GhiChu}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
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
