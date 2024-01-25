import React from 'react'
import PropTypes from 'prop-types'
import SidebarTTHCGV from '../SidebarTTHCGV/SidebarTTHCGV'
import Breadcrumb from '../../../../Components/Breadcumb/Breadcrumb'
import { Link, useParams } from 'react-router-dom'
import Loading from './../../../../Components/Loading/Loading'
import { convertBufferToBase64 } from '../../../../Services/Utils/stringUtils'
import { handlePreviewFileBase64 } from '../../../../Services/Utils/fileUtils'

function ChiTietThuTucView({ home, breadcrumbs, loading, dataThuTuc }) {
  const { tieude, id } = useParams()
  let totalTime = 0

  for (let i = 0; i < dataThuTuc?.TrinhTuThucHien.length; i++) {
    totalTime =
      totalTime +
      parseFloat(
        dataThuTuc?.TrinhTuThucHien[i]?.MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay,
      )
  }

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-grow-1 bg-white p-4">
            <SidebarTTHCGV />
          </div>
          <div className="flex-grow-2 bg-white w-full p-4">
            <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
            <div className="mt-4 mb-2 flex flex-row justify-between">
              <p className="px-3 py-1 bg-white text-[#336699] border border-[#336699] rounded-md font-semibold">
                Thông tin thủ tục
              </p>
              <Link
                to={`/tthcgiangvien/soanhoso/${tieude}/${id}/submit`}
                className="px-3 py-1 bg-[#336699] text-white rounded-md hover:opacity-70"
              >
                Nộp hồ sơ
              </Link>
            </div>
            <div className="">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="px-4 py-1 border border-slate-500 font-semibold">
                      <p className="min-w-[120px]">Lĩnh vực</p>
                    </td>
                    <td className="px-4 py-1 border border-slate-500">
                      {dataThuTuc?.ThongTinHoSo?.MC_TTHC_GV_LinhVuc}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-slate-500 font-semibold">
                      Mã thủ tục
                    </td>
                    <td className="px-4 py-1 border border-slate-500">
                      {dataThuTuc?.ThongTinHoSo?.MC_TTHC_GV_MaThuTuc}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-slate-500 font-semibold">
                      Tên thủ tục
                    </td>
                    <td className="px-4 py-1 border border-slate-500">
                      <div className="uppercase font-semibold text-[#0C4A6E]">
                        {dataThuTuc?.ThongTinHoSo?.MC_TTHC_GV_TenThuTuc}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-slate-500 font-semibold">
                      Thủ tục liên thông
                    </td>
                    <td className="px-4 py-1 border border-slate-500">
                      <input
                        type="checkbox"
                        defaultChecked={
                          dataThuTuc?.ThongTinHoSo?.MC_TTHC_GV_ThuTucLienThong
                        }
                        disabled
                        name=""
                        id=""
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-slate-500 font-semibold">
                      Thủ tục không áp dụng Một cửa
                    </td>
                    <td className="px-4 py-1 border border-slate-500">
                      <input
                        type="checkbox"
                        defaultChecked={
                          dataThuTuc?.ThongTinHoSo
                            ?.MC_TTHC_GV_ThuTucKhongApDungMC
                        }
                        disabled
                        name=""
                        id=""
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-slate-500 font-semibold">
                      <p>Thành phần hồ sơ đề nghị</p>
                    </td>
                    <td className="px-4 py-1 border border-slate-500">
                      <div className="hidden lg:block ">
                        {dataThuTuc?.ThanhPhanHoSo &&
                        dataThuTuc?.ThanhPhanHoSo.length > 0 ? (
                          <table className="table-auto w-full">
                            <thead className="bg-[#075985] text-white">
                              <tr>
                                <th className="rounded-tl-xl px-2 py-1">STT</th>
                                <th className="border border-slate-300 px-2 py-1">
                                  Tên giấy tờ
                                </th>
                                <th className="border border-slate-300 px-2 py-1 lg:whitespace-nowrap">
                                  Mẫu hồ sơ/Hướng dẫn
                                </th>
                                <th className="border border-slate-300 px-2 py-1 lg:whitespace-nowrap">
                                  Bản chính
                                </th>
                                <th className="border border-slate-300 px-2 py-1 lg:whitespace-nowrap">
                                  Bản sao
                                </th>
                                <th className="rounded-tr-xl px-2 py-1 lg:whitespace-nowrap">
                                  Bắt buộc
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {dataThuTuc?.ThanhPhanHoSo?.map(
                                (iThanhPhanHoSo, index) => {
                                  return (
                                    <tr key={index}>
                                      <td className="border border-slate-300 text-center">
                                        {index + 1}
                                      </td>
                                      <td className="border border-slate-300">
                                        <p className="px-2 min-w-[180px]">
                                          {
                                            iThanhPhanHoSo.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo
                                          }
                                        </p>
                                      </td>
                                      <td className="border border-slate-300">
                                        <div className="px-2">
                                          <ol>
                                            <li>
                                              {iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_TenFile ? (
                                                <p>
                                                  Xem mẫu/hướng dẫn: (
                                                  <p
                                                    onClick={() => {
                                                      const base64StringWithoutPrefix =
                                                        convertBufferToBase64(
                                                          iThanhPhanHoSo
                                                            ?.MC_TTHC_GV_ThanhPhanHoSo_DataFile
                                                            ?.data,
                                                        )
                                                      handlePreviewFileBase64(
                                                        iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_TenFile,
                                                        base64StringWithoutPrefix,
                                                      )
                                                    }}
                                                    className="text-[#336699] cursor-pointer font-medium hover:opacity-70"
                                                  >
                                                    {
                                                      iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_TenFile
                                                    }
                                                  </p>
                                                  )
                                                </p>
                                              ) : null}
                                            </li>
                                          </ol>
                                        </div>
                                      </td>
                                      <td className="border border-slate-300 text-center">
                                        <input
                                          type="checkbox"
                                          defaultChecked={
                                            iThanhPhanHoSo.MC_TTHC_GV_ThanhPhanHoSo_BanChinh
                                          }
                                          disabled={true}
                                        />
                                      </td>
                                      <td className="border border-slate-300 text-center">
                                        <input
                                          type="checkbox"
                                          defaultChecked={
                                            iThanhPhanHoSo.MC_TTHC_GV_ThanhPhanHoSo_BanSao
                                          }
                                          disabled={true}
                                        />
                                      </td>
                                      <td className="border border-slate-300 text-center">
                                        <input
                                          type="checkbox"
                                          defaultChecked={
                                            iThanhPhanHoSo.MC_TTHC_GV_ThanhPhanHoSo_BatBuoc
                                          }
                                          disabled={true}
                                        />
                                      </td>
                                    </tr>
                                  )
                                },
                              )}
                            </tbody>
                          </table>
                        ) : (
                          <p className="px-2 font-semibold text-center">
                            Không có thành phần hồ sơ đề nghị
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 lg:hidden">
                        {dataThuTuc?.ThanhPhanHoSo.length > 0 ? (
                          <>
                            {dataThuTuc?.ThanhPhanHoSo.map(
                              (iThanhPhanHoSo, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="w-full border mb-2"
                                  >
                                    <div className="flex items-center gap-4 p-2 border-b">
                                      <p className="font-semibold w-full border-r">
                                        STT
                                      </p>
                                      <p className="w-full">{index + 1}</p>
                                    </div>
                                    <div className="flex items-center gap-4 p-2 border-b">
                                      <p className="font-semibold w-full border-r">
                                        Tên giấy tờ
                                      </p>
                                      <p className="w-full">
                                        {
                                          iThanhPhanHoSo.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo
                                        }
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-4 p-2 border-b">
                                      <p className="font-semibold w-full border-r">
                                        Mẫu hồ sơ/Hướng dẫn
                                      </p>
                                      <p className="w-full">
                                        {iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_TenFile ? (
                                          <p>
                                            Xem mẫu/hướng dẫn: (
                                            <p
                                              onClick={() => {
                                                const base64StringWithoutPrefix =
                                                  convertBufferToBase64(
                                                    iThanhPhanHoSo
                                                      ?.MC_TTHC_GV_ThanhPhanHoSo_DataFile
                                                      ?.data,
                                                  )
                                                handlePreviewFileBase64(
                                                  iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_TenFile,
                                                  base64StringWithoutPrefix,
                                                )
                                              }}
                                              className="text-[#336699] cursor-pointer font-medium hover:opacity-70"
                                            >
                                              {
                                                iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_TenFile
                                              }
                                            </p>
                                            )
                                          </p>
                                        ) : null}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-4 p-2 border-b">
                                      <p className="font-semibold w-full border-r">
                                        Bản chính
                                      </p>
                                      <p className="w-full">
                                        <input
                                          type="checkbox"
                                          defaultChecked={
                                            iThanhPhanHoSo.MC_TTHC_GV_ThanhPhanHoSo_BanChinh
                                          }
                                          disabled={true}
                                        />
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-4 p-2 border-b">
                                      <p className="font-semibold w-full border-r">
                                        Bản sao
                                      </p>
                                      <p className="w-full">
                                        <input
                                          type="checkbox"
                                          defaultChecked={
                                            iThanhPhanHoSo.MC_TTHC_GV_ThanhPhanHoSo_BanSao
                                          }
                                          disabled={true}
                                        />
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-4 p-2 border-b">
                                      <p className="font-semibold w-full border-r">
                                        Bắt buộc
                                      </p>
                                      <p className="w-full">
                                        <input
                                          type="checkbox"
                                          defaultChecked={
                                            iThanhPhanHoSo.MC_TTHC_GV_ThanhPhanHoSo_BatBuoc
                                          }
                                          disabled={true}
                                        />
                                      </p>
                                    </div>
                                  </div>
                                )
                              },
                            )}
                          </>
                        ) : (
                          <p className="px-2 font-semibold text-center">
                            Không có thành phần hồ sơ đề nghị
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-slate-500 font-semibold">
                      Số bộ hồ sơ
                    </td>
                    <td className="px-4 py-1 border border-slate-500">
                      <p>
                        {dataThuTuc?.ThanhPhanHoSo?.length > 0
                          ? dataThuTuc?.ThanhPhanHoSo?.length + ' bộ'
                          : '0'}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-slate-500 font-semibold">
                      Tổng thời gian giải quyết
                    </td>
                    <td className="px-4 py-1 border border-slate-500">
                      <p>
                        {totalTime
                          ? totalTime + ' ngày kể từ khi nhận đủ hồ sơ hợp lệ'
                          : '0'}
                      </p>
                      {/* <p>{ThongTinHoSo?.MC_TTHC_GV_TongThoiGianGiaiQuyet ? ThongTinHoSo?.MC_TTHC_GV_TongThoiGianGiaiQuyet + " ngày kể từ khi nhận đủ hồ sơ hợp lệ" : "0"}</p> */}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-slate-500 font-semibold">
                      Mô tả trình tự thực hiện
                    </td>
                    <td className="px-4 py-1 border border-slate-500">
                      {/* START: View Desktop - Trình Tực Thực Hiện */}
                      <div className="hidden lg:block">
                        {dataThuTuc?.TrinhTuThucHien &&
                        dataThuTuc?.TrinhTuThucHien.length > 0 ? (
                          <table className="table-auto w-full">
                            <thead className="bg-[#075985] text-white rounded-t-xl">
                              <tr>
                                <th className="rounded-tl-xl px-2 py-1">
                                  Bước
                                </th>
                                <th className="border border-slate-300 px-2 py-1">
                                  Tên công việc
                                </th>
                                <th className="border border-slate-300 px-2 py-1">
                                  Cách thức thực hiện
                                </th>
                                <th className="border border-slate-300 px-2 py-1">
                                  Địa chỉ tiếp nhận / trả hồ sơ
                                </th>
                                <th className="border border-slate-300 px-2 py-1">
                                  Đơn vị thực hiện / được ủy quyền thực hiện
                                </th>
                                <th className="border border-slate-300 px-2 py-1">
                                  Đơn vị phối hợp
                                </th>
                                <th className="border border-slate-300 px-2 py-1">
                                  Thời gian (ngày)
                                </th>
                                <th className="rounded-tr-xl px-2 py-1">
                                  Kết quả
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {dataThuTuc?.TrinhTuThucHien?.map(
                                (iTrinhTu, index) => {
                                  let listKetQuaTrinhTu =
                                    iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_KetQua?.split(
                                      /[-+]/,
                                    ).filter((item) => item.trim() !== '')
                                  return (
                                    <tr key={index}>
                                      <td className="border border-slate-300 text-center">
                                        {index + 1}
                                      </td>
                                      <td className="border border-slate-300">
                                        <div className="px-2 text-[#245D7C] font-semibold">
                                          <p className="min-w-[100px]">
                                            {
                                              iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_TenCongViec
                                            }
                                          </p>
                                        </div>
                                      </td>
                                      <td className="border border-slate-300">
                                        <div className="px-2">
                                          <p className="min-w-[140px]">
                                            {
                                              iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_CachThucThucHien
                                            }
                                          </p>
                                        </div>
                                      </td>
                                      <td className="border border-slate-300">
                                        <div className="text-center">
                                          <p className="min-w-[120px]">
                                            {
                                              iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra
                                            }
                                          </p>
                                        </div>
                                      </td>
                                      <td className="border border-slate-300">
                                        <div className="text-center">
                                          {
                                            iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_DonViThucHien
                                          }
                                        </div>
                                      </td>
                                      <td className="border border-slate-300 text-center">
                                        <div>
                                          {
                                            iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop
                                          }
                                        </div>
                                      </td>
                                      <td className="border border-slate-300 text-center">
                                        <div>
                                          {
                                            iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay
                                          }
                                        </div>
                                      </td>
                                      <td className="border border-slate-300 text-left px-1">
                                        <div>
                                          {
                                            <div className="w-full">
                                              {listKetQuaTrinhTu?.map(
                                                (item, index) => (
                                                  <p key={index}>
                                                    {'- ' + item.trim()}
                                                  </p>
                                                ),
                                              )}
                                            </div>
                                          }
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                },
                              )}
                            </tbody>
                          </table>
                        ) : (
                          <p>Không có trình tự thực hiện</p>
                        )}
                      </div>
                      {/* END: View Desktop - Trình Tực Thực Hiện */}

                      {/* START: View Mobile - Trình Tực Thực Hiện */}
                      <div className="flex flex-col gap-2 lg:hidden">
                        {dataThuTuc?.TrinhTuThucHien.length > 0 ? (
                          <>
                            {dataThuTuc?.TrinhTuThucHien.map(
                              (iTrinhTu, index) => {
                                let listKetQuaTrinhTu =
                                  iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_KetQua?.split(
                                    /[-+]/,
                                  ).filter((item) => item.trim() !== '')
                                return (
                                  <div key={index} className="w-full border">
                                    <div className="flex items-center gap-4 p-2 border-b">
                                      <p className="font-semibold w-full border-r">
                                        STT
                                      </p>
                                      <p className="w-full">{index + 1}</p>
                                    </div>
                                    <div className="flex items-center gap-4 p-2 border-b">
                                      <p className="font-semibold w-full border-r">
                                        Tên công việc
                                      </p>
                                      <p className="w-full">
                                        {
                                          iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_TenCongViec
                                        }
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-4 p-2 border-b">
                                      <p className="font-semibold w-full border-r">
                                        Cách thức thực hiện
                                      </p>
                                      <p className="w-full">
                                        {
                                          iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_CachThucThucHien
                                        }
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-4 p-2 border-b">
                                      <p className="font-semibold w-full border-r">
                                        Địa chỉ tiếp nhận / trả hồ sơ
                                      </p>
                                      <p className="w-full">
                                        {
                                          iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra
                                        }
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-4 p-2 border-b">
                                      <p className="font-semibold w-full border-r">
                                        Đơn vị thực hiện / được ủy quyền thực
                                        hiện
                                      </p>
                                      <p className="w-full">
                                        {
                                          iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_DonViThucHien
                                        }
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-4 p-2 border-b">
                                      <p className="font-semibold w-full border-r">
                                        Đơn vị phối hợp
                                      </p>
                                      <p className="w-full">
                                        {
                                          iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop
                                        }
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-4 p-2 border-b">
                                      <p className="font-semibold w-full border-r">
                                        Thời gian (ngày)
                                      </p>
                                      <p className="w-full">
                                        {
                                          iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay
                                        }
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-4 p-2 border-b">
                                      <p className="font-semibold w-full border-r">
                                        Kết quả
                                      </p>
                                      <div className="w-full">
                                        {listKetQuaTrinhTu?.map(
                                          (item, index) => (
                                            <p key={index}>
                                              {'- ' + item.trim()}
                                            </p>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )
                              },
                            )}
                          </>
                        ) : (
                          <p>Không có trình tự thực hiện</p>
                        )}
                      </div>
                      {/* END: View Mobile - Trình Tực Thực Hiện */}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-slate-500 font-semibold">
                      Phí, lệ phí
                    </td>
                    <td className="px-4 py-1 border border-slate-500">
                      <p>Không tính phí.</p>
                      {/* <table className="table-auto w-full">
													<thead className="bg-[#075985] text-white rounded-t-xl">
														<tr>
															<th className="rounded-tl-xl px-2 py-1">STT</th>
															<th className="border border-slate-300 px-2 py-1">Mức phí</th>
															<th className="rounded-tr-xl px-2 py-1">Mô tả</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td colSpan={3} className="border border-slate-300">
																<span className="px-2 py-1 font-semibold">Không có phí</span>
															</td>
														</tr>
													</tbody>
												</table> */}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-slate-500 font-semibold">
                      Đối tượng thực hiện
                    </td>
                    <td className="px-4 py-1 border border-slate-500">
                      <div>
                        <p>
                          {
                            dataThuTuc?.ThongTinHoSo
                              ?.MC_TTHC_GV_DoiTuongThucHien
                          }
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-slate-500 font-semibold">
                      Căn cứ pháp lý của TTHC
                    </td>
                    <td className="px-4 py-1 border border-slate-500">
                      <div>
                        <p>
                          {
                            dataThuTuc?.ThongTinHoSo
                              ?.MC_TTHC_GV_CanCuPhapLyCuaTTHC
                          }
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-slate-500 font-semibold">
                      Yêu cầu hoặc điều kiện để thực hiện TTHC
                    </td>
                    <td className="px-4 py-1 border border-slate-500">
                      <div>
                        {dataThuTuc?.ThongTinHoSo?.MC_TTHC_GV_DieuKienThucHien}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-slate-500 font-semibold">
                      Tệp thủ tục
                    </td>
                    <td className="px-4 py-1 border border-slate-500">
                      <div>
                        <p
                          className="font-semibold text-[#336699] cursor-pointer hover:opacity-70"
                          onClick={() => {
                            const base64StringWithoutPrefix =
                              convertBufferToBase64(
                                dataThuTuc?.ThongTinHoSo
                                  ?.MC_TTHC_GV_TepThuTuc_DataFileFile?.data,
                              )
                            handlePreviewFileBase64(
                              dataThuTuc?.ThongTinHoSo
                                ?.MC_TTHC_GV_TepThuTuc_TenFile,
                              base64StringWithoutPrefix,
                            )
                          }}
                        >
                          {
                            dataThuTuc?.ThongTinHoSo
                              ?.MC_TTHC_GV_TepThuTuc_TenFile
                          }
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

ChiTietThuTucView.propTypes = {}

export default ChiTietThuTucView
