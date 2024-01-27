import React from 'react'
import PropTypes from 'prop-types'
import SidebarTTHCGV from '../SidebarTTHCGV/SidebarTTHCGV'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { Link } from 'react-router-dom'
import { FaUpload, FaSave } from 'react-icons/fa'
import { FcCancel } from 'react-icons/fc'
import { BsSend } from 'react-icons/bs'
import { MdCancel } from 'react-icons/md'
import Loading from '@/Components/Loading/Loading'
import { IoMdClose } from 'react-icons/io'
import { convertBufferToBase64 } from '@/Services/Utils/stringUtils'
import { handlePreviewFileBase64 } from '@/Services/Utils/fileUtils'
import Swal from 'sweetalert2'
function SoanHoSoView({
  home,
  breadcrumbs,
  tieude,
  id,
  loading,
  dataChiTietThuTuc,
  dataHoSoYeuCau,
  setDataHoSoYeuCau,
  itemThanhPhanHoSoFile,
  inputTextRef,
  handleChangeInputFileTPHS,
  handleSubmitForm,
  handleCancelSubmit,
}) {
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-2">
          <div className="bg-white p-4">
            <SidebarTTHCGV />
          </div>
          <div className="grow bg-white w-full p-4">
            <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
            <form
              onSubmit={handleSubmitForm}
              className="grid grid-cols-2 gap-4 mt-5"
            >
              <h2 className="text-lg col-span-2">
                <span className="font-semibold">Tên thủ tục: </span>
                <span className="uppercase font-semibold">
                  {dataChiTietThuTuc?.ThongTinHoSo?.MC_TTHC_GV_TenThuTuc}
                </span>
                <Link
                  to={`/tthcgiangvien/chitiet/${tieude}/${id}`}
                  className="font-semibold text-[#245D7C] hover:opacity-70 mx-3"
                >
                  (Xem chi tiết)
                </Link>
              </h2>
              <div className="flex flex-col gap-4 form-group mb-4 col-span-2 md:col-span-2">
                <p className="font-semibold">
                  <span className="underline">Đơn vị tiếp nhận</span>:{' '}
                  {dataChiTietThuTuc?.ThongTinHoSo?.MC_TTHC_GV_NoiTiepNhan}
                </p>
                <p className="font-semibold">
                  <span className="underline">Nơi trả kết quả</span>:{' '}
                  {dataChiTietThuTuc?.ThongTinHoSo?.MC_TTHC_GV_NoiTraKetQua}
                </p>
              </div>
              <div className="flex flex-col form-group mb-4 col-span-1">
                <label
                  htmlFor="MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email"
                  className="font-semibold mb-2"
                >
                  Email liên hệ{' '}
                  <span className="font-semibold text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="border border-slate-300 px-2 py-1 rounded-xl focus:outline-1 focus:outline-slate-300"
                  rows={4}
                  name="MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email"
                  id="MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email"
                  placeholder="Ví dụ: example@example.com"
                  required={true}
                  onChange={(e) => {
                    setDataHoSoYeuCau({
                      ...dataHoSoYeuCau,
                      MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email: e.target.value,
                    })
                  }}
                />
              </div>
              <div className="flex flex-col form-group mb-4 col-span-1">
                <label
                  htmlFor="MC_TTHC_GV_GuiYeuCau_NhanSuGui_SDT"
                  className="font-semibold mb-2"
                >
                  Số điện thoại liên hệ{' '}
                  <span className="font-semibold text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  className="border border-slate-300 px-2 py-1 rounded-xl focus:outline-1 focus:outline-slate-300"
                  rows={4}
                  name="MC_TTHC_GV_GuiYeuCau_NhanSuGui_SDT"
                  id="MC_TTHC_GV_GuiYeuCau_NhanSuGui_SDT"
                  placeholder="Ví dụ: +8434350166 hoặc 0334350166"
                  pattern="^(\+84|0)\d{9}$"
                  required={true}
                  onChange={(e) => {
                    setDataHoSoYeuCau({
                      ...dataHoSoYeuCau,
                      MC_TTHC_GV_GuiYeuCau_NhanSuGui_SDT: e.target.value,
                    })
                  }}
                />
              </div>
              <div className="flex flex-col form-group mb-4 col-span-2">
                <label htmlFor="noidungyc" className="font-semibold mb-2">
                  Nội dung yêu cầu
                </label>
                <textarea
                  className="border border-slate-300 px-2 py-1 rounded-xl focus:outline-1 focus:outline-slate-300"
                  rows={4}
                  name="noidungyc"
                  id="noidungyc"
                  placeholder="Nhập nội dung"
                  onChange={(e) => {
                    setDataHoSoYeuCau({
                      ...dataHoSoYeuCau,
                      MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu: e.target.value,
                    })
                  }}
                ></textarea>
              </div>
              <div className="flex flex-col form-group mb-4 col-span-2 md:col-span-1">
                <label htmlFor="quantity" className="font-semibold mb-2">
                  Nhập số lượng bản{' '}
                  <span className="font-semibold text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="px-2 py-1 border rounded-full focus:outline-[0.2px] focus:outline-slate-300"
                  min={0}
                  defaultValue={0}
                  name="quantity"
                  id="quantity"
                  onChange={(e) => {
                    setDataHoSoYeuCau({
                      ...dataHoSoYeuCau,
                      MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong: e.target.value,
                    })
                  }}
                />
              </div>
              {/* START: Nơi trả kết quả SELECT */}
              {/* <div className="flex flex-col form-group mb-4 col-span-2 md:col-span-1">
                                <label htmlFor="MC_TTHC_GV_NoiTraKetQua">
                                    <p className="font-semibold mb-2">
                                        Nơi trả kết quả{' '}
                                        <span className="text-red-500">*</span>
                                    </p>
                                    <select
                                        className="px-2 py-1 w-full rounded-full border border-slate-300 focus:outline-slate-300"
                                        name="MC_TTHC_GV_NoiTraKetQua"
                                        id="MC_TTHC_GV_NoiTraKetQua"
                                        required={true}
                                        onChange={(e) => {
                                            setDataHoSoYeuCau({
                                                ...dataHoSoYeuCau,
                                                MC_TTHC_GV_GuiYeuCau_NoiTraKetQua:
                                                    e.target.value,
                                            })
                                        }}
                                    >
                                        <option value="">
                                            Chọn nơi trả kết quả
                                        </option>
                                        <option value="Trả online - Email">
                                            Trả online - Email
                                        </option>
                                        <option value="1 - Minh Khai">
                                            1 - Minh Khai
                                        </option>
                                        <option value="2 - Lĩnh Nam">
                                            2 - Lĩnh Nam
                                        </option>
                                        <option value="3 - Nam Định">
                                            3 - Nam Định
                                        </option>
                                    </select>
                                </label>
                            </div> */}
              {/* END: Nơi trả kết quả SELECT */}

              {/* START: Danh sách giấy tờ kèm theo */}
              <div className="flex flex-col form-group mb-4 col-span-2">
                <label htmlFor="price" className="font-semibold mb-2">
                  Danh sách giấy tờ kèm theo{' '}
                  <span className="font-semibold text-red-500">*</span>
                </label>
                {dataChiTietThuTuc?.ThanhPhanHoSo?.length ? (
                  <>
                    <table className="hidden lg:block rounded-xl">
                      <thead className="bg-[#0C4A6E] text-white">
                        <tr className=" rounded-xl border-b">
                          <th className="px-2 py-1 border-r md:whitespace-nowrap rounded-tl-lg">
                            STT
                          </th>
                          <th className="px-2 py-1 border-r md:whitespace-nowrap ">
                            Tên giấy tờ
                          </th>
                          <th className="px-2 py-1 border-r md:whitespace-nowrap ">
                            Bản chính
                          </th>
                          <th className="px-2 py-1 border-r md:whitespace-nowrap ">
                            Bản sao
                          </th>
                          <th className="px-2 py-1 border-r md:whitespace-nowrap ">
                            Bắt buộc
                          </th>
                          <th className="px-2 py-1 md:whitespace-nowrap rounded-tr-lg">
                            Tệp đính kèm
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataChiTietThuTuc?.ThanhPhanHoSo?.map(
                          (iThanhPhanHoSo, index) =>
                            iThanhPhanHoSo.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo ? (
                              <tr
                                className="border border-slate-300"
                                key={index}
                              >
                                <td className="px-2 py-1 border border-slate-300 text-center">
                                  {index + 1}
                                </td>
                                <td className="px-2 py-1 border border-slate-300">
                                  <p className="w-[320px]">
                                    {
                                      iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo
                                    }
                                  </p>
                                  {iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_TenFile ? (
                                    <p className="w-[320px] text-sm text-[#336699]">
                                      <span className="font-medium">
                                        Xem/tải mẫu:{' '}
                                      </span>
                                      <span
                                        className="cursor-pointer hover:opacity-70"
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
                                      >
                                        {
                                          iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_TenFile
                                        }
                                      </span>
                                    </p>
                                  ) : null}
                                </td>
                                <td className="px-2 py-1 border border-slate-300 text-center">
                                  <input
                                    type="checkbox"
                                    defaultChecked={
                                      iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_BanChinh
                                    }
                                    disabled
                                    name=""
                                    id=""
                                  />
                                </td>
                                <td className="px-2 py-1 border border-slate-300 text-center">
                                  <input
                                    type="checkbox"
                                    defaultChecked={
                                      iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_BanSao
                                    }
                                    disabled
                                    name=""
                                    id=""
                                  />
                                </td>
                                <td className="px-2 py-1 border border-slate-300 text-center">
                                  <input
                                    type="checkbox"
                                    defaultChecked={
                                      iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_BatBuoc
                                    }
                                    disabled
                                    name=""
                                    id=""
                                  />
                                </td>
                                <td className="px-2 py-1 border border-slate-300">
                                  <div className="flex flex-col gap-2">
                                    <input
                                      type="file"
                                      accept="*/,.jpg,.jpeg,.pdf,.png"
                                      onChange={(e) => {
                                        const file = e.target.files[0]
                                        const maxSizeInBytes = 5 * 1024 * 1024 // 5MB
                                        if (
                                          !file.name.match(
                                            /\.(pdf|jpeg|jpg|png|gif)$/i,
                                          )
                                        ) {
                                          Swal.fire({
                                            icon: 'error',
                                            title:
                                              'Tệp tải lên không đúng định dạng yêu cầu. Vui lòng kiểm tra lại.',
                                            text: 'Các loại file tải lên phải có dạng PDF, PNG, JPG, JPEG hoặc GIF(Kích thước tối đa 5MB)',
                                          })
                                          return
                                        } else {
                                          if (file.size > maxSizeInBytes) {
                                            Swal.fire({
                                              icon: 'error',
                                              title:
                                                'Tệp tải lên vượt quá kích thước cho phép!',
                                              text: 'Kích thước tối đa 5MB.',
                                            })
                                            return
                                          } else {
                                            handleChangeInputFileTPHS(
                                              iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_ID,
                                              e,
                                            )
                                          }
                                        }
                                      }}
                                    />
                                    <span className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                      Các loại file tải lên phải có dạng{' '}
                                      <span className="font-medium">PDF</span>,{' '}
                                      <span className="font-medium">PNG</span>,{' '}
                                      <span className="font-medium">JPG</span>,{' '}
                                      <span className="font-medium">JPEG</span>{' '}
                                      hoặc{' '}
                                      <span className="font-medium">GIF</span>
                                      <span className="ml-1 font-medium text-red-600">
                                        (Kích thước tối đa 5MB)
                                      </span>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ) : null,
                        )}
                      </tbody>
                    </table>

                    <div className="flex flex-col w-full lg:hidden">
                      {dataChiTietThuTuc?.ThanhPhanHoSo?.map(
                        (iThanhPhanHoSo, index) => {
                          return (
                            <div key={index}>
                              <div className="flex items-center gap-4 border">
                                <p className="p-2 font-semibold w-full border-r">
                                  STT
                                </p>
                                <p className="p-2 w-full">{index + 1}</p>
                              </div>
                              <div className="flex items-center gap-4 border">
                                <p className="p-2 font-semibold w-full border-r">
                                  Tên giấy tờ
                                </p>
                                <p className="p-2 w-full">
                                  {
                                    iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo
                                  }
                                  {iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_TenFile ? (
                                    <p className="text-sm text-[#336699]">
                                      <span className="font-medium">
                                        Xem/tải mẫu:{' '}
                                      </span>
                                      <span
                                        className="cursor-pointer hover:opacity-70"
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
                                      >
                                        {
                                          iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_TenFile
                                        }
                                      </span>
                                    </p>
                                  ) : null}
                                </p>
                              </div>
                              <div className="flex items-center gap-4 border">
                                <p className="p-2 font-semibold w-full border-r">
                                  Bản chính
                                </p>
                                <p className="p-2 w-full">
                                  <input
                                    type="checkbox"
                                    defaultChecked={
                                      iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_BanChinh
                                    }
                                    disabled
                                    name=""
                                    id=""
                                  />
                                </p>
                              </div>
                              <div className="flex items-center gap-4 border">
                                <p className="p-2 font-semibold w-full border-r">
                                  Bản sao
                                </p>
                                <p className="p-2 w-full">
                                  <input
                                    type="checkbox"
                                    defaultChecked={
                                      iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_BanSao
                                    }
                                    disabled
                                    name=""
                                    id=""
                                  />
                                </p>
                              </div>
                              <div className="flex items-center gap-4 border">
                                <p className="p-2 font-semibold w-full border-r">
                                  Bắt buộc
                                </p>
                                <p className="p-2 w-full">
                                  <input
                                    type="checkbox"
                                    defaultChecked={
                                      iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_BatBuoc
                                    }
                                    disabled
                                    name=""
                                    id=""
                                  />
                                </p>
                              </div>
                              <div className="flex items-center gap-4 border">
                                <p className="p-2 font-semibold w-full border-r">
                                  Chọn tệp đính kèm *
                                </p>
                                <p className="p-2 w-full">
                                  <input
                                    className="w-full"
                                    type="file"
                                    accept="*/,.jpg,.jpeg,.pdf,.png"
                                    onChange={(e) => {
                                      const file = e.target.files[0]
                                      const maxSizeInBytes = 5 * 1024 * 1024 // 5MB
                                      if (
                                        !file.name.match(
                                          /\.(pdf|docx|doc|jpeg|jpg|png|gif)$/i,
                                        )
                                      ) {
                                        Swal.fire({
                                          icon: 'error',
                                          title:
                                            'Tệp tải lên không đúng định dạng yêu cầu. Vui lòng kiểm tra lại.',
                                          text: 'Các loại file tải lên phải có dạng PDF, DOC, DOCX, PNG, JPG, JPEG hoặc GIF(Kích thước tối đa 5MB)',
                                        })
                                        return
                                      } else {
                                        if (file.size > maxSizeInBytes) {
                                          Swal.fire({
                                            icon: 'error',
                                            title:
                                              'Tệp tải lên vượt quá kích thước cho phép!',
                                            text: 'Kích thước tối đa 5MB.',
                                          })
                                          return
                                        } else {
                                          handleChangeInputFileTPHS(
                                            iThanhPhanHoSo?.MC_TTHC_GV_ThanhPhanHoSo_ID,
                                            e,
                                          )
                                        }
                                      }
                                    }}
                                  />
                                  <span className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                    Các loại file tải lên phải có dạng{' '}
                                    <span className="font-medium">PDF</span>,{' '}
                                    <span className="font-medium">DOC</span>,{' '}
                                    <span className="font-medium">DOCX</span>,{' '}
                                    <span className="font-medium">PNG</span>,{' '}
                                    <span className="font-medium">JPG</span>,{' '}
                                    <span className="font-medium">JPEG</span>{' '}
                                    hoặc{' '}
                                    <span className="font-medium">GIF</span>
                                    <span className="ml-1 font-medium text-red-600">
                                      (Kích thước tối đa 5MB)
                                    </span>
                                  </span>
                                </p>
                              </div>
                            </div>
                          )
                        },
                      )}
                    </div>
                  </>
                ) : (
                  <p className="italic text-red-700 border p-2 font-medium rounded-md">
                    Không có thành phần hồ sơ kèm theo!
                  </p>
                )}
              </div>
              {/* END: Danh sách giấy tờ kèm theo */}

              {/* START: Button handler */}
              <div className="flex flex-row gap-4 col-span-2">
                <button
                  type="submit"
                  className="flex flex-row gap-2 items-center cursor-pointer hover:opacity-70 bg-green-700 text-white border border-slate-100 px-2 py-1 rounded-xl"
                >
                  <BsSend />
                  <span>Nộp hồ sơ</span>
                </button>
                <button
                  type="reset"
                  onClick={handleCancelSubmit}
                  className="flex flex-row gap-2 items-center cursor-pointer hover:opacity-70 bg-red-500 text-white border border-slate-100 px-2 py-1 rounded-xl"
                >
                  <MdCancel className="text-white" />
                  <span>Hủy</span>
                </button>
              </div>
              {/* END: Button handler */}
            </form>
          </div>
        </div>
      )}
    </>
  )
}

SoanHoSoView.propTypes = {
  home: PropTypes.object.isRequired,
  breadcrumbs: PropTypes.array,
  tieude: PropTypes.string,
  id: PropTypes.string,
  loading: PropTypes.bool,
  dataChiTietThuTuc: PropTypes.object || PropTypes.array,
  dataHoSoYeuCau: PropTypes.object,
  setDataHoSoYeuCau: PropTypes.func,
  listThanhPhanHoSoFiles: PropTypes.array,
  setListThanhPhanHoSoFiles: PropTypes.func,
  handleSubmitForm: PropTypes.func,
}

export default SoanHoSoView
