import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { TextareaAutosize, Checkbox } from '@mui/material'
import PropTypes from 'prop-types'

function DangKyLopChatLuongView(props) {
  const {
    home,
    breadcrumbs,
    listHocKy,
    hocKy,
    setHocKy,
    listLyDo,
    lyDo,
    setLyDo,
    lyDoKhac,
    setLyDoKhac,
    listHocPhan,
    hocPhan,
    setHocPhan,
    handleSelectHocPhan,
    handleSubmitData,
  } = props
  return (
    <div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
      <div className="p-4 flex flex-col">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

        <div className="border-[#336699] border border-solid mt-5 rounded-md">
          <form
            onSubmit={handleSubmitData}
            className="py-8 flex flex-col justify-center items-center gap-4"
          >
            <h2 className="mx-6 text-center uppercase text-2xl font-semibold text-sky-800 mb-6">
              TIẾP NHẬN - ĐĂNG KÝ LỚP HỌC CHƯƠNG TRÌNH CHẤT LƯỢNG
            </h2>
            <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <span className="block pr-10 w-[175px]">Học kỳ (*)</span>
              <select
                value={hocKy}
                onChange={(e) => setHocKy(e.target.value)}
                className="flex-1 px-2 py-1 md:max-w-[75%] rounded-md border border-solid border-gray-300"
              >
                <option value="">Chọn học kỳ</option>
                {listHocKy.map((e, index) => (
                  <option key={index} value={e.TenDot}>
                    {e.TenDot}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <span className="block pr-10 w-[175px]">Lý do (*)</span>
              <select
                defaultValue={listLyDo[0].value}
                value={lyDo}
                onChange={(e) => setLyDo(e.target.value)}
                className="flex-1 px-2 py-1 md:max-w-[75%] rounded-md border border-solid border-gray-300"
              >
                {listLyDo.map((e, index) => (
                  <option key={index} value={e.value}>
                    <span className="whitespace-normal">{e.text}</span>
                  </option>
                ))}
              </select>
            </div>

            {lyDo === '1' && (
              <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                <span className="block pr-10 w-[175px]">Lý do khác (*)</span>
                <TextareaAutosize
                  value={lyDoKhac}
                  onChange={(e) => setLyDoKhac(e.target.value)}
                  className="flex-1 md:max-w-[75%] p-2 rounded-md border border-solid border-gray-300"
                  minRows="3"
                />
              </div>
            )}
            {hocKy !== '' && (
              <div className="w-[75%] overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr>
                      <th className="p-2 font-semibold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                        STT
                      </th>
                      <th className="p-2 font-semibold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                        CHỌN
                      </th>
                      <th className="p-2 font-semibold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                        MÃ LỚP HỌC
                      </th>
                      <th className="p-2 font-semibold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                        TÊN LỚP HỌC
                      </th>
                      <th className="p-2 font-semibold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                        KHOA CHỦ QUẢN
                      </th>
                      <th className="p-2 font-semibold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                        SĨ SỐ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listHocPhan.length ? (
                      listHocPhan.map((hp, index) => (
                        <tr key={index}>
                          <td className="text-center p-3 border border-solid border-[#dee2e6]">
                            {index + 1}
                          </td>
                          <td className="text-center p-3 border border-solid border-[#dee2e6]">
                            <Checkbox
                              onChange={(e) => {
                                handleSelectHocPhan(e, hp)
                              }}
                              checked={
                                hp.MC_DT_DKHocChatLuong_MaLopHoc ===
                                hocPhan.MC_DT_DKHocChatLuong_MaLopHoc
                              }
                            />
                          </td>
                          <td className="text-center p-3 border border-solid border-[#dee2e6]">
                            {hp.MC_DT_DKHocChatLuong_MaLopHoc}
                          </td>
                          <td className="text-center p-3 border border-solid border-[#dee2e6]">
                            {hp.MC_DT_DKHocChatLuong_TenLop}
                          </td>
                          <td className="text-center p-3 border border-solid border-[#dee2e6]">
                            {hp.MC_DT_DKHocChatLuong_KhoaChuQuanLHP}
                          </td>
                          <td className="text-center p-3 border border-solid border-[#dee2e6]">
                            {hp.MC_DT_DKHocChatLuong_SiSo}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center p-3 border border-solid border-[#dee2e6]"
                        >
                          Hiện tại chưa có dữ liệu học phần cho học kỳ này!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            <button className="mt-8 px-5 py-3 border-2 border-solid text-[#245D7C] border-[#245D7C] rounded-md font-semibold transition-all duration-200 hover:bg-[#245D7C] hover:text-white">
              Gửi Yêu Cầu
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

DangKyLopChatLuongView.propTypes = {
  home: PropTypes.object,
  breadcrumbs: PropTypes.array,
  listHocKy: PropTypes.array,
  hocKy: PropTypes.string,
  setHocKy: PropTypes.func,
  listLyDo: PropTypes.array,
  lyDo: PropTypes.string,
  setLyDo: PropTypes.func,
  lyDoKhac: PropTypes.string,
  setLyDoKhac: PropTypes.func,
  listHocPhan: PropTypes.array,
  hocPhan: PropTypes.object,
  setHocPhan: PropTypes.func,
  handleSelectHocPhan: PropTypes.func,
  handleSubmitData: PropTypes.func,
}

export default DangKyLopChatLuongView
