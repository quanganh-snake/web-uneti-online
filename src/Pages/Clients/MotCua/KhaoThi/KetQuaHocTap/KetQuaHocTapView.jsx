import Breadcrumb from "@/Components/Breadcumb/Breadcrumb";
import DanhSachHocPhan from "./DanhSachHocPhan";
import FormYeuCauSuaDiem from "./FormYeuCauSuaDiem";
import { MenuItem, Select } from "@mui/material";
import Loading from "@/Components/Loading/Loading";

function KetQuaHocTapView(props) {
  const {
    loading,
    home,
    breadcrumbs,
    tenDot,
    setTenDot,
    lyDo,
    setLyDo,
    listHocKy,
    listLyDo,
    listHocPhan,
    listLyDoDTK,
    listLyDoDT,
    lyDoChiTiet,
    setLyDoChiTiet,
    diemSua,
    setDiemSua,
    handleRowSelection,
    handleSubmitData,
    currentPage,
    setCurrentPage,
  } = props;

  return (
    <div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
        <div className="border-[#336699] border border-solid mt-5 rounded-md">
          <form className="py-8 flex flex-col justify-center items-center gap-4">
            <h2 className="text-center uppercase text-2xl font-bold text-sky-800 mb-6">
              TIẾP NHẬN KẾT QUẢ HỌC TẬP
            </h2>
            <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <span className="block pr-10 w-[300px]">Học kỳ (*)</span>
              <Select
                value={tenDot}
                onChange={(e) => setTenDot(e.target.value)}
                className="flex-1 md:max-w-[75%] rounded-md border border-solid border-gray-300"
              >
                <MenuItem value="Tất cả học kỳ">Tất cả học kỳ</MenuItem>
                {listHocKy.map((e, index) => (
                  <MenuItem key={index} value={e.TenDot}>
                    {e.TenDot}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <span className="block pr-10 w-[300px]">Lý do (*)</span>
              <Select
                value={lyDo}
                onChange={(e) => {
                  setLyDo(e.target.value);
                }}
                className="flex-1 md:max-w-[75%] rounded-md border border-solid border-gray-300"
              >
                {listLyDo.map((e, index) => (
                  <MenuItem key={index} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </form>
          {loading ? (
            <div className="w-full flex justify-center">
              <Loading />
            </div>
          ) : null}

          {!loading && tenDot !== "" && lyDo !== "" && (
            <DanhSachHocPhan
              tenDot={tenDot}
              lyDo={lyDo}
              listHocPhan={listHocPhan}
              handleRowSelection={handleRowSelection}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          {!loading &&
            tenDot !== "" &&
            lyDo !== "" &&
            lyDo !== "Xem kết quả học tập" && (
              <FormYeuCauSuaDiem
                lyDo={lyDo}
                listLyDoDTK={listLyDoDTK}
                listLyDoDT={listLyDoDT}
                lyDoChiTiet={lyDoChiTiet}
                setLyDoChiTiet={setLyDoChiTiet}
                diemSua={diemSua}
                setDiemSua={setDiemSua}
                handleRowSelection={handleRowSelection}
                handleSubmitData={handleSubmitData}
              />
            )}
        </div>
      </div>
    </div>
  );
}

KetQuaHocTapView.propTypes = {};

export default KetQuaHocTapView;