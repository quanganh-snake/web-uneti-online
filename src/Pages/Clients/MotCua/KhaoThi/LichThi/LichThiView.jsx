import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import Loading from '@/Components/Loading/Loading'
import LichThiViewXemDanhSach from './LichThiViewXemLich'
import LichThiViewTrungLichThi from './LichThiViewTrungLich'
import LichThiViewKhongCoLich from './LichThiViewKhongCoLich'

function LichThiView(props) {
  const {
    home,
    breadcrumbs,
    loading,
    listHocKy,
    listLyDo,
    tenDot,
    dataLoaiThi,
    loaiThi,
    lyDo,
    handleChangeValue,
  } = props

  return (
    <div className="bg-white shadow-module-item rounded-md">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

        <div className="form-submit flex flex-col w-full justify-center">
          <h2 className="text-center uppercase text-2xl font-semibold text-sky-800 mb-6">
            Tiếp nhận yêu cầu lịch thi
          </h2>
          <div className="lg:px-36">
            {/* Start: Tên đọt - Học kỳ */}
            <div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
              <label
                htmlFor={'MC_KT_LichThi_TenDot'}
                className="md:w-[30%] mb-2 md:mb-0"
              >
                Học kỳ (*)
              </label>
              <select
                id={'MC_KT_LichThi_TenDot'}
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
                htmlFor={'MC_KT_LichThi_LoaiThi'}
                className="md:w-[30%] mb-2 md:mb-0"
              >
                Loại thi (*)
              </label>
              <select
                id={'MC_KT_LichThi_LoaiThi'}
                onChange={handleChangeValue}
                className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800"
              >
                <option value={''}>Chọn loại thi</option>
                {dataLoaiThi.map((option) => (
                  <option value={option.id} key={option.id}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
            {/* END: Tên đợt - Học kỳ */}
            {/* START: Lý do */}
            <div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
              <label
                htmlFor={'MC_KT_LichThi_YeuCau'}
                className="md:w-[30%] mb-2 md:mb-0"
              >
                Lý do (*)
              </label>
              <select
                id={'MC_KT_LichThi_YeuCau'}
                onChange={handleChangeValue}
                className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800"
              >
                <option value={''}>Chọn lý do</option>
                {listLyDo.map((itemLyDo) => (
                  <option value={itemLyDo.value} key={itemLyDo.id}>
                    {itemLyDo.title}
                  </option>
                ))}
              </select>
            </div>
            {/* END: Lý do */}

            {/* START: Table học phần */}
            <div className="relative shadow-md sm:rounded-lg my-6">
              {loading ? (
                <div className="w-full flex justify-center">
                  <Loading />
                </div>
              ) : tenDot !== '' && loaiThi !== '' && lyDo !== '' ? (
                <>
                  {lyDo == 0 && <LichThiViewXemDanhSach {...props} />}
                  {lyDo == 1 && <LichThiViewTrungLichThi {...props} />}
                  {lyDo == 2 && <LichThiViewKhongCoLich {...props} />}
                </>
              ) : null}
            </div>
            {/* END: Table học phần */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LichThiView
