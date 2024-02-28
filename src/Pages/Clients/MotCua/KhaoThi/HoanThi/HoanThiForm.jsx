import { dataLoaiThi } from '@/Services/Static/dataStatic'
import { LY_DO_KHAC, listLyDo } from './constants'

export const HoanThiForm = (props) => {
  const { listHocKy, handleChangeValue, lyDo } = props

  return (
    <>
      {/* Start: Tên đọt - Học kỳ */}
      <div className="w-[90%] md:w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <label htmlFor={'MC_KT_HoanThi_TenDot'} className="block pr-10">
          Học kỳ (*)
        </label>
        <select
          id={'MC_KT_HoanThi_TenDot'}
          onChange={handleChangeValue}
          className="flex-1 md:max-w-[75%] px-2 py-1 rounded-md border border-solid border-gray-300"
        >
          <option value={''}>Chọn học kỳ</option>
          {listHocKy?.map((option) => (
            <option value={option.TenDot} key={option.TenDot}>
              {option.TenDot}
            </option>
          ))}
        </select>
      </div>
      {/* END: Tên đợt - Học kỳ */}
      {/* Start: Tên đọt - Học kỳ */}
      <div className="w-[90%] md:w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <label htmlFor={'MC_KT_HoanThi_LoaiThi'} className="block pr-10">
          Loại thi (*)
        </label>
        <select
          id={'MC_KT_HoanThi_LoaiThi'}
          onChange={handleChangeValue}
          className="flex-1 md:max-w-[75%] px-2 py-1 rounded-md border border-solid border-gray-300"
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
      <div className="w-[90%] md:w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <label htmlFor={'MC_KT_HoanThi_YeuCau'} className="block pr-10">
          Lý do (*)
        </label>
        <select
          id={'MC_KT_HoanThi_YeuCau'}
          onChange={handleChangeValue}
          className="flex-1 md:max-w-[75%] px-2 py-1 rounded-md border border-solid border-gray-300"
        >
          <option value={''}>Chọn lý do</option>
          {listLyDo.map((itemLyDo) => (
            <option value={itemLyDo.value} key={itemLyDo.id}>
              {itemLyDo.title}
            </option>
          ))}
        </select>
      </div>

      {lyDo == LY_DO_KHAC && (
        <div className="w-[90%] md:w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <label
            htmlFor={'MC_KT_HoanThi_YeuCau_LyDoKhac_LyDoChiTiet'}
            className="block pr-10"
          >
            Lý do khác (*)
          </label>

          <textarea
            placeholder="Nhập lý do khác tại đây..."
            id="MC_KT_HoanThi_YeuCau_LyDoKhac_LyDoChiTiet"
            rows="3"
            className="flex-1 md:max-w-[75%] px-2 py-1 rounded-md border border-solid border-gray-300"
            onChange={handleChangeValue}
          />
        </div>
      )}
      {/* END: Lý do */}
    </>
  )
}
