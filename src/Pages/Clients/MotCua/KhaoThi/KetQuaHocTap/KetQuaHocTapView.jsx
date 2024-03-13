import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import DanhSachHocPhan from './DanhSachHocPhan'
import FormYeuCauSuaDiem from './FormYeuCauSuaDiem'
import Loading from '@/Components/Loading/Loading'

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
    selectedRow,
  } = props

  return (
    <div className="bg-white shadow-module-item rounded-md">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
        <div className="mt-5 rounded-md">
          <form className="md:py-8 flex flex-col justify-center items-center gap-4">
            <h2 className="text-center uppercase text-lg md:text-2xl font-semibold text-sky-800 mb-3 md:mb-6">
              TIẾP NHẬN KẾT QUẢ HỌC TẬP
            </h2>
            <div className="w-[90%] md:w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <span className="block pr-10 w-[120px]">Học kỳ (*)</span>
              <select
                value={tenDot}
                onChange={(e) => setTenDot(e.target.value)}
                className="px-2 py-1 flex-1 md:max-w-[75%] rounded-md border border-solid border-gray-300"
              >
                <option value="">Chọn học kỳ</option>
                <option value="Tất cả học kỳ">Tất cả học kỳ</option>
                {listHocKy.map((e, index) => (
                  <option key={index} value={e.TenDot}>
                    {e.TenDot}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[90%] md:w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <span className="block pr-10 w-[120px]">Lý do (*)</span>
              <select
                value={lyDo}
                onChange={(e) => {
                  setLyDo(e.target.value)
                }}
                className="px-2 py-1 flex-1 md:max-w-[75%] rounded-md border border-solid border-gray-300"
              >
                {listLyDo.map((e, index) => (
                  <option key={index} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
          </form>
          {loading ? (
            <div className="w-full flex justify-center">
              <Loading />
            </div>
          ) : null}

          {!loading && tenDot !== '' && lyDo !== '' && (
            <DanhSachHocPhan
              tenDot={tenDot}
              lyDo={lyDo}
              listHocPhan={listHocPhan}
              handleRowSelection={handleRowSelection}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              selectedRow={selectedRow}
            />
          )}
          {!loading &&
            tenDot !== '' &&
            lyDo !== '' &&
            lyDo !== 'Xem kết quả học tập' && (
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
  )
}

KetQuaHocTapView.propTypes = {}

export default KetQuaHocTapView
