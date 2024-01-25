import React from 'react'
import Breadcrumb from '../../../../../Components/Breadcumb/Breadcrumb'
import Loading from '../../../../../Components/Loading/Loading'
import moment from 'moment/moment'
import PropTypes from 'prop-types'
import { isEqual } from 'lodash-unified'
import { Checkbox } from '@mui/material'

function PhucKhaoView(props) {
  const {
    home,
    breadcrumbs,
    loading,
    listHocKy,
    tenDot,
    dataLoaiThi,
    loaiThi,
    listHocPhan,
    handleChangeValue,
    handleRowSelection,
    handleSubmitData,
    selectedRow,
  } = props

  return (
    <div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
        <div className="form-submit flex flex-col w-full justify-center">
          <h2 className="text-center uppercase text-2xl font-bold text-sky-800 mb-6">
            Tiếp nhận yêu cầu phúc khảo kết quả học tập
          </h2>

          <form className="lg:px-36" onSubmit={handleSubmitData}>
            {/* Start: Tên đọt - Học kỳ */}
            <div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
              <label
                htmlFor={'MC_KT_PhucKhao_TenDot'}
                className="md:w-[30%] mb-2 md:mb-0"
              >
                Học kỳ (*)
              </label>
              <select
                id={'MC_KT_PhucKhao_TenDot'}
                onChange={handleChangeValue}
                className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800"
              >
                <option value={''}>Chọn học kỳ</option>
                {listHocKy.map((option) => (
                  <option value={option.TenDot} key={option.TenDot}>
                    {option.TenDot}
                  </option>
                ))}
              </select>
            </div>
            {/* END: Tên đợt - Học kỳ */}
            {/* Start: Tên đọt - Học kỳ */}
            <div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
              <label
                htmlFor={'MC_KT_PhucKhao_LoaiThi'}
                className="md:w-[30%] mb-2 md:mb-0"
              >
                Loại thi (*)
              </label>
              <select
                id={'MC_KT_PhucKhao_LoaiThi'}
                onChange={handleChangeValue}
                className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800"
              >
                {dataLoaiThi.map((option) => (
                  <option value={option.id} key={option.id}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
            {/* END: Tên đợt - Học kỳ */}
            {/* START: Table học phần */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-6">
              {loading ? (
                <div className="w-full flex justify-center">
                  <Loading />
                </div>
              ) : tenDot !== '' ? (
                <>
                  <table className="w-full ">
                    <thead>
                      <tr>
                        <th
                          rowSpan={3}
                          className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]"
                        >
                          STT
                        </th>
                        <th
                          rowSpan={3}
                          className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]"
                        >
                          CHỌN
                        </th>
                        <th
                          rowSpan={3}
                          className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]"
                        >
                          MÃ LỚP HỌC PHẦN
                        </th>
                        <th
                          rowSpan={3}
                          className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]"
                        >
                          TÊN HỌC PHẦN
                        </th>
                        <th
                          rowSpan={3}
                          className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]"
                        >
                          HÌNH THỨC THI
                        </th>
                        <th
                          rowSpan={3}
                          className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]"
                        >
                          NGÀY THI
                        </th>
                        <th
                          rowSpan={3}
                          className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]"
                        >
                          NHÓM
                        </th>
                        <th
                          rowSpan={3}
                          className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]"
                        >
                          TIẾT
                        </th>
                        <th
                          rowSpan={3}
                          className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]"
                        >
                          PHÒNG THI
                        </th>
                        <th
                          rowSpan={3}
                          className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]"
                        >
                          SỐ BÁO DANH
                        </th>
                        <th
                          colSpan={4}
                          className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]"
                        >
                          ĐIỂM
                        </th>
                      </tr>
                      <tr>
                        <th
                          colSpan={2}
                          className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]"
                        >
                          ĐIỂM THI
                        </th>
                        <th
                          colSpan={2}
                          className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]"
                        >
                          ĐIỂM TỔNG KẾT
                        </th>
                      </tr>
                      <tr>
                        <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                          LẦN 1
                        </th>
                        <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                          THI LẠI
                        </th>
                        <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                          LẦN 1
                        </th>
                        <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                          THI LẠI
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listHocPhan.length ? (
                        listHocPhan.map((hocphan, index) => (
                          <tr key={index}>
                            <td className="text-center p-3 border border-solid border-[#dee2e6]">
                              {index + 1}
                            </td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6]">
                              <Checkbox
                                checked={isEqual(selectedRow, hocphan)}
                                onChange={() => {
                                  handleRowSelection(hocphan)
                                }}
                              />
                            </td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6]">
                              {hocphan.MaLopHocPhan}
                            </td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6] min-w-[200px]">
                              {hocphan.TenMonHoc}
                            </td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6] min-w-[200px]">
                              {hocphan.TenHinhThucThi}
                            </td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6] min-w-[200px]">
                              {hocphan.Thu == 8
                                ? 'Chủ nhật'
                                : 'Thứ ' + hocphan.Thu}{' '}
                              {', '}
                              {moment(hocphan.NgayThi).format('DD/MM/YYYY')}
                            </td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6]">
                              {hocphan.Nhom}
                            </td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6] min-w-[100px]">
                              {`${hocphan.TuTiet} - ${hocphan.DenTiet}`}
                            </td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6] min-w-[200px]">
                              {hocphan.TenPhong}
                            </td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6] min-w-[100px]">
                              {hocphan.SBD}
                            </td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6] min-w-[100px]">
                              {hocphan.DiemThi
                                ? hocphan.DiemThi
                                : hocphan.DiemThi1
                                  ? hocphan.DiemThi1
                                  : ''}
                            </td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6] min-w-[100px]">
                              {hocphan.DiemThi2 ? hocphan.DiemThi2 : ''}
                            </td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6] min-w-[100px]">
                              {hocphan.DiemTongKet
                                ? hocphan.DiemTongKet
                                : hocphan.DiemTongKet1
                                  ? hocphan.DiemTongKet1
                                  : ''}
                            </td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6] min-w-[100px]">
                              {hocphan.DiemTongKet2 ? hocphan.DiemTongKet2 : ''}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="14"
                            className="text-center p-3 border border-solid border-[#dee2e6]"
                          >
                            Hiện tại chưa có dữ liệu học phần cho học kỳ này!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </>
              ) : null}
            </div>

            {/* END: Table học phần */}
            <div className="uneti-notify my-4">
              <p className="w-full font-bold text-red-600">
                *Lưu ý: Lệ phí phúc khảo kết quả học tập: Có mức thu theo quy
                định, được chuyển trực tiếp vào công nợ của SV.
              </p>
              {/* {listYeuCauTrung.length > 0 ? (
								<p className="w-full px-3 py-2 bg-red-700 rounded-lg text-white font-semibold text-center">
									Yêu cầu cho môn học đã được gửi đi trước đó. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!
								</p>
							) : null}
							{listYeuCauQuaHan.length > 0 ? (
								<p className="w-full px-3 py-2 bg-red-600 rounded-lg text-white font-semibold text-center">Môn học {listYeuCauQuaHan.join(", ")} đã quá hạn gửi yêu cầu phúc khảo !</p>
							) : null}
							{listYeuCauThanhCong.length > 0 ? (
								<p className="w-full px-3 py-2 bg-green-500 text-white font-semibold text-center">
									Môn học đã được gửi yêu cầu phúc khảo. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!
								</p>
							) : null} */}
            </div>
            <div className="uneti-action flex justify-center">
              <button
                type="submit"
                className="px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-full hover:bg-sky-800 hover:text-white"
              >
                Gửi yêu cầu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
PhucKhaoView.propTypes = {
  home: PropTypes.object,
  breadcrumbs: PropTypes.array,
  loading: PropTypes.bool,
  listHocKy: PropTypes.array,
  tenDot: PropTypes.string,
  dataLoaiThi: PropTypes.array,
  loaiThi: PropTypes.string,
  listHocPhan: PropTypes.array,
  handleChangeValue: PropTypes.func,
  handleRowSelection: PropTypes.func,
  handleSubmitData: PropTypes.func,
  selectedRow: PropTypes.object,
}
export default PhucKhaoView
