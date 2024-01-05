import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import Loading from '@/Components/Loading/Loading'
import { Checkbox, MenuItem, Select, TextareaAutosize } from '@mui/material'

function HuyDangKyThiLaiView(props) {
  const {
    loading,
    home,
    breadcrumbs,
    tenDot,
    setTenDot,
    loaiThi,
    setLoaiThi,
    lyDo,
    setLyDo,
    lyDoKhac,
    setLyDoKhac,
    listHocKy,
    listLyDo,
    listHocPhan,
    handleRowSelection,
    handleSubmitData,
  } = props

  return (
    <div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
        <div className="border-[#336699] border border-solid mt-5 rounded-md">
          <form className="py-8 flex flex-col justify-center items-center gap-4">
            <h2 className="text-center uppercase text-2xl font-bold text-sky-800 mb-6">
              TIẾP NHẬN YÊU CẦU ĐĂNG KÝ HỦY THI LẠI
            </h2>
            <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <span className="block pr-10">Học kỳ (*)</span>
              <Select
                value={tenDot}
                onChange={(e) => setTenDot(e.target.value)}
                className="flex-1 md:max-w-[75%] rounded-md border border-solid border-gray-300"
              >
                {listHocKy.map((e, index) => (
                  <MenuItem key={index} value={e.TenDot}>
                    {e.TenDot}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <span className="block pr-10">Loại thi</span>
              <Select
                inputProps={{ readOnly: true }}
                defaultValue="Thi Lại"
                className="flex-1 md:max-w-[75%] rounded-md border border-solid border-gray-300"
              >
                <MenuItem value="Thi Lại">Thi Lại</MenuItem>
              </Select>
            </div>
            <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <span className="block pr-10">Lý do (*)</span>
              <Select
                value={lyDo}
                onChange={(e) => {
                  setLyDo(e.target.value)
                  setLyDoKhac('')
                }}
                className="flex-1 md:max-w-[75%] rounded-md border border-solid border-gray-300"
              >
                {listLyDo.map((e, index) => (
                  <MenuItem key={index} value={e.value}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            {lyDo === 3 && (
              <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                <span className="block pr-10">Lý do khác (*)</span>
                <TextareaAutosize
                  className="flex-1 md:max-w-[75%] p-2 rounded-md border border-solid border-gray-300"
                  value={lyDoKhac}
                  onChange={(e) => setLyDoKhac(e.target.value)}
                  minRows="3"
                />
              </div>
            )}
          </form>

          {(tenDot === '' && lyDo != '') || (tenDot != '' && lyDo === '') ? (
            <div className="flex justify-center items-center pb-4">
              <span className="w-[75%] text-center font-bold block text-red-900 bg-red-200 p-3 rounded-md">
                Vui lòng chọn đầy đủ thông tin học kỳ và lý do để xem lịch thi
                cần đăng ký!
              </span>
            </div>
          ) : null}

          {loading ? (
            <div className="w-full flex justify-center">
              <Loading />
            </div>
          ) : (
            tenDot !== '' &&
            lyDo !== '' && (
              <div className="flex flex-col justify-center items-center pb-4">
                <div className="w-[75%] overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr>
                        <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                          STT
                        </th>
                        <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                          CHỌN
                        </th>
                        <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                          MÃ LỚP HỌC PHẦN
                        </th>
                        <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                          TÊN MÔN HỌC
                        </th>
                        <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                          HÌNH THỨC THI
                        </th>
                        <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                          ĐIỂM TB THƯỜNG KỲ
                        </th>
                        <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                          ĐIỂM THI
                        </th>
                        <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                          ĐIỂM TỔNG KẾT
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
                                onChange={(e) => {
                                  handleRowSelection(e, hocphan)
                                }}
                              />
                            </td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6]">
                              {hocphan.MaLopHocPhan}
                            </td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6]">
                              {hocphan.TenMonHoc}
                            </td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6]">
                              {hocphan.TenHinhThucThi}
                            </td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6]">
                              {hocphan.DiemTBThuongKy}
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
                <button
                  onClick={handleSubmitData}
                  className="mt-8 px-5 py-3 border-2 border-solid text-[#245D7C] border-[#245D7C] rounded-md font-bold transition-all duration-200 hover:bg-[#245D7C] hover:text-white"
                >
                  Gửi Yêu Cầu
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default HuyDangKyThiLaiView
