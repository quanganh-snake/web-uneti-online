import React, { useEffect, useState } from 'react'

const ModalChiTietTaiSan = (props) => {
  const { onShowModal, dataTaiSan } = props
  return (
    <div className="bg-slate-400/40 fixed z-[100] inset-0 w-full min-h-screen">
      <div className="px-4 md:w-3/6 mx-auto h-full flex items-center justify-center">
        <div className="w-full min-h-min bg-white p-4 rounded-lg modal">
          <div className="modal__header mb-4">
            <h2 className="text-center font-bold text-xl md:text-2xl uppercase text-uneti-primary">
              Thông tin chi tiết tài sản
            </h2>
          </div>
          <div className="modal__body mb-4">
            <table className="table border-collapse border border-slate-400  w-full">
              <tbody>
                <tr>
                  <td scope="col" className="border border-slate-300 px-2 py-1">
                    Tên tài sản
                  </td>
                  <td className="border border-slate-300 px-2 py-1">
                    {dataTaiSan?.DT_QLTS_TS_TenTaiSan}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-2 py-1">
                    Mã tài sản
                  </td>
                  <td className="border border-slate-300 px-2 py-1">
                    {dataTaiSan?.DT_QLTS_TS_MaTaiSan}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-2 py-1">
                    Thương hiệu
                  </td>
                  <td className="border border-slate-300 px-2 py-1">
                    {dataTaiSan?.DT_QLTS_TS_ThuongHieu}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-2 py-1">
                    Năm sản xuất
                  </td>
                  <td className="border border-slate-300 px-2 py-1">
                    {dataTaiSan?.DT_QLTS_TS_NamSanXuat}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-2 py-1">Xuất sứ</td>
                  <td className="border border-slate-300 px-2 py-1">
                    {dataTaiSan?.DT_QLTS_TS_XuatXu}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-2 py-1">
                    Serial Number
                  </td>
                  <td className="border border-slate-300 px-2 py-1">
                    {dataTaiSan?.DT_QLTS_TS_SerialNumber}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal__footer flex justify-center">
            <button
              type="button"
              onClick={() => {
                onShowModal(false)
              }}
              className="px-3 py-1 rounded-full bg-white border border-sky-700 text-sky-700 hover:bg-sky-700 hover:text-white"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalChiTietTaiSan
