import React from "react";
import PropTypes from "prop-types";
import Breadcrumb from "@/Components/Breadcumb/Breadcrumb";
import {
  Checkbox,
  MenuItem,
  Pagination,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";

function ChuyenDiemView(props) {
  const {
    home,
    breadcrumbs,
    xinChuyen,
    listLoaiDiem,
    loaiDiem,
    setLoaiDiem,
    lyDo,
    setLyDo,
    giayToKemTheo,
    setGiayToKemTheo,
    listHocPhan,
    currentPage,
    setCurrentPage,
    hocPhan,
    setHocPhan,
    handleSelectHocPhan,
    listHocPhanTuongDuong,
    handleChangePage,
    hocPhanTuongDuong,
    setHocPhanTuongDuong,
    handleSelectHocPhanTuongDuong,
    handleDownloadFile,
  } = props;

  const itemPerPage = 5;

  const totalPage = Math.ceil(listHocPhan.length / itemPerPage);

  const listHocPhanShow = listHocPhan.slice(
    itemPerPage * (currentPage - 1),
    itemPerPage * (currentPage - 1) + itemPerPage
  );

  return (
    <div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
      <div className="p-4 flex flex-col">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
        <div className="border-[#336699] border border-solid mt-5 rounded-md">
          <form className="py-8 flex flex-col justify-center items-center gap-4">
            <h2 className="text-center uppercase text-2xl font-bold text-sky-800 mb-6">
              TIẾP NHẬN YÊU CẦU CHUYỂN ĐIỂM
            </h2>
            <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <span className="block pr-10">Xin chuyển (*)</span>
              <Select
                defaultValue={xinChuyen.value}
                disabled
                className="flex-1 md:max-w-[75%] rounded-md border border-solid border-gray-300"
              >
                <MenuItem value={xinChuyen.value}>{xinChuyen.text}</MenuItem>
              </Select>
            </div>
            <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <span className="block pr-10">Loại điểm (*)</span>
              <Select
                defaultValue="loaiDiem"
                value={loaiDiem}
                onChange={(e) => setLoaiDiem(e.target.value)}
                className="flex-1 md:max-w-[75%] rounded-md border border-solid border-gray-300"
              >
                {listLoaiDiem.map((e, index) => (
                  <MenuItem key={index} value={e.value}>
                    {e.text}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-start gap-2">
              <span className="block pr-10">Lý do (*)</span>
              <TextareaAutosize
                className="flex-1 md:max-w-[75%] p-2 rounded-md border border-solid border-gray-300"
                value={lyDo}
                onChange={(e) => setLyDo(e.target.value)}
                minRows="3"
              />
            </div>
            <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <span className="block pr-10">Giấy tờ kèm theo</span>
              <TextField
                value={giayToKemTheo}
                onChange={(e) => setGiayToKemTheo(e.target.value)}
                className="flex-1 md:max-w-[75%] px-2 rounded-md border border-solid border-gray-300"
              />
            </div>
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
                      NĂM HỌC
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      HỌC KỲ
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      MÃ HỌC PHẦN
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      MÃ MÔN HỌC
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      TÊN HỌC PHẦN
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      SỐ TÍN CHỈ
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      ĐIỂM TỔNG KẾT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listHocPhanShow.length ? (
                    listHocPhanShow.map((hp, index) => (
                      <tr key={index}>
                        <td className="text-center p-3 border border-solid border-[#dee2e6]">
                          {(currentPage - 1) * itemPerPage + index + 1}
                        </td>
                        <td className="text-center p-3 border border-solid border-[#dee2e6]">
                          <Checkbox
                            onChange={(e) => {
                              handleSelectHocPhan(e, hp);
                            }}
                            checked={
                              hp.MC_DT_ChuyenDiem_ChiTiet_MaHocPhan ===
                              hocPhan.MC_DT_ChuyenDiem_ChiTiet_MaHocPhan
                            }
                          />
                        </td>
                        <td className="text-center p-3 border border-solid border-[#dee2e6]">
                          {hp.MC_DT_ChuyenDiem_ChiTiet_NamHoc}
                        </td>
                        <td className="text-center p-3 border border-solid border-[#dee2e6]">
                          {hp.MC_DT_ChuyenDiem_ChiTiet_HocKy}
                        </td>
                        <td className="text-center p-3 border border-solid border-[#dee2e6]">
                          {hp.MC_DT_ChuyenDiem_ChiTiet_MaHocPhan}
                        </td>
                        <td className="text-center p-3 border border-solid border-[#dee2e6]">
                          {hp.MC_DT_ChuyenDiem_ChiTiet_MaMonHoc}
                        </td>
                        <td className="text-center p-3 border border-solid border-[#dee2e6]">
                          {hp.MC_DT_ChuyenDiem_ChiTiet_TenMonHoc}
                        </td>
                        <td className="text-center p-3 border border-solid border-[#dee2e6]">
                          {hp.MC_DT_ChuyenDiem_ChiTiet_SoTinChi}
                        </td>
                        <td className="text-center p-3 border border-solid border-[#dee2e6]">
                          {hp.MC_DT_ChuyenDiem_ChiTiet_DiemTongKet}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="10"
                        className="text-center p-3 border border-solid border-[#dee2e6]"
                      >
                        Hiện tại chưa có dữ liệu học phần cho học kỳ này!
                      </td>
                    </tr>
                  )}
                  {totalPage > 1 && (
                    <tr>
                      <td
                        colSpan={10}
                        className="text-center p-3 border border-solid border-[#dee2e6]"
                      >
                        <div className="flex justify-center items-center">
                          <Pagination
                            count={totalPage}
                            page={currentPage}
                            variant="outlined"
                            shape="rounded"
                            color="primary"
                            onChange={(e, value) => handleChangePage(e, value)}
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </form>
          <div className="py-8 flex flex-col justify-center items-center gap-4">
            <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
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
                      TÊN KHOA
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      MÃ MÔN HỌC
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      TÊN MÔN HỌC
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      SỐ TÍN CHỈ
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                      BẬC ĐÀO TẠO
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listHocPhanTuongDuong.length ? (
                    listHocPhanTuongDuong.map((hp, index) => (
                      <tr key={index}>
                        <td className="text-center p-3 border border-solid border-[#dee2e6]">
                          {(currentPage - 1) * itemPerPage + index + 1}
                        </td>
                        <td className="text-center p-3 border border-solid border-[#dee2e6]">
                          <Checkbox
                            onChange={(e) => {
                              handleSelectHocPhanTuongDuong(e, hp);
                            }}
                            checked={
                              hp.HT_HPTD_MTD_MaMonHoc ===
                              hocPhanTuongDuong.HT_HPTD_MTD_MaMonHoc
                            }
                          />
                        </td>
                        <td className="text-center p-3 border border-solid border-[#dee2e6]">
                          {hp.HT_HPTD_TenKhoa}
                        </td>
                        <td className="text-center p-3 border border-solid border-[#dee2e6]">
                          {hp.HT_HPTD_MCD_MaMonHoc}
                        </td>
                        <td className="text-center p-3 border border-solid border-[#dee2e6]">
                          {hp.HT_HPTD_MTD_TenMonHoc}
                        </td>
                        <td className="text-center p-3 border border-solid border-[#dee2e6]">
                          {hp.HT_HPTD_MTD_SoTinChi}
                        </td>
                        <td className="text-center p-3 border border-solid border-[#dee2e6]">
                          {hp.HT_HPTD_MTD_BacDaoTao}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center p-3 border border-solid border-[#dee2e6]"
                      >
                        Hiện tại không có học phần tương đương cho môn này. Vui
                        lòng thử lại sau.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className=""></div>
            </div>
          </div>
          <div className="py-8 flex flex-col justify-center items-center gap-4">
            <div className="w-[75%] flex flex-col justify-start items-start gap-4">
              <p className="text-red-500 font-bold italic">
                <span className="underline">GHI CHÚ:</span> ĐỐI VỚI CÁC CHỨC
                NĂNG BỊ GIỚI HẠN KHÔNG CHO PHÉP ĐỀ NGHỊ TRỰC TUYẾN, NGƯỜI HỌC
                CẦN ĐẾN BỘ PHẬN MỘT CỬA ĐỂ ĐỀ NGHỊ TRỰC TIẾP.
              </p>
              <p>Các giấy tờ kèm theo (click vào tên giấy tờ để tải file):</p>
              <p>
                1. Mẫu đề nghị giải quyết thủ tục hành chính:
                <span
                  onClick={handleDownloadFile}
                  className="mx-2 cursor-pointer text-[#245D7C] duration-200 hover:text-[#0056b3]"
                >
                  Chuyển điểm
                </span>
                (Người học cần in, điền thông tin vào mẫu và nộp tại bộ phận Một
                cửa hoặc đến trực tiếp bộ phận Một cửa để lấy mẫu đề nghị giải
                quyết thủ tục hành chính).
              </p>
              <p>
                2. Mẫu giấy tờ kèm theo đề nghị (nếu trong đề nghị yêu cầu),
                người học tải file mẫu tại địa chỉ sau
                <a
                  className="mx-2 text-[#245D7C] duration-200 hover:text-[#0056b3]"
                  href="https://uneti.edu.vn/bieu-mau-bo-phan-hanh-chinh-mot-cua/"
                >
                  https://uneti.edu.vn/bieu-mau-bo-phan-hanh-chinh-mot-cua/
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ChuyenDiemView.propTypes = {
  home: PropTypes.object,
  breadcrumbs: PropTypes.array,
  xinChuyen: PropTypes.object,
  listLoaiDiem: PropTypes.array,
  loaiDiem: PropTypes.string,
  setLoaiDiem: PropTypes.func,
  lyDo: PropTypes.string,
  setLyDo: PropTypes.func,
  giayToKemTheo: PropTypes.string,
  setGiayToKemTheo: PropTypes.func,
  listHocPhan: PropTypes.array,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  hocPhan: PropTypes.object,
  setHocPhan: PropTypes.func,
  handleSelectHocPhan: PropTypes.func,
  listHocPhanTuongDuong: PropTypes.array,
  handleChangePage: PropTypes.func,
  hocPhanTuongDuong: PropTypes.object,
  setHocPhanTuongDuong: PropTypes.func,
  handleSelectHocPhanTuongDuong: PropTypes.func,
  handleDownloadFile: PropTypes.func,
};

export default ChuyenDiemView;
