import { dataLoaiThi } from "@/Services/Static/dataStatic";
import { LY_DO_KHAC, listLyDo } from "./constants";

export const HoanThiForm = (props) => {
  const { listHocKy, handleChangeValue, lyDo } = props;

  return (
    <>
      {/* Start: Tên đọt - Học kỳ */}
      <div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
        <label
          htmlFor={"MC_KT_HoanThi_TenDot"}
          className="md:w-[30%] mb-2 md:mb-0"
        >
          Học kỳ (*)
        </label>
        <select
          id={"MC_KT_HoanThi_TenDot"}
          onChange={handleChangeValue}
          className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800"
        >
          <option value={""}>Chọn học kỳ</option>
          {listHocKy?.map((option) => (
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
          htmlFor={"MC_KT_HoanThi_LoaiThi"}
          className="md:w-[30%] mb-2 md:mb-0"
        >
          Loại thi (*)
        </label>
        <select
          id={"MC_KT_HoanThi_LoaiThi"}
          onChange={handleChangeValue}
          className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800"
        >
          <option value={""}>Chọn loại thi</option>
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
          htmlFor={"MC_KT_HoanThi_YeuCau"}
          className="md:w-[30%] mb-2 md:mb-0"
        >
          Lý do (*)
        </label>
        <select
          id={"MC_KT_HoanThi_YeuCau"}
          onChange={handleChangeValue}
          className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800"
        >
          <option value={""}>Chọn lý do</option>
          {listLyDo.map((itemLyDo) => (
            <option value={itemLyDo.value} key={itemLyDo.id}>
              {itemLyDo.title}
            </option>
          ))}
        </select>
      </div>

      {lyDo == LY_DO_KHAC && (
        <div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
          <label
            htmlFor={"MC_KT_HoanThi_YeuCau_LyDoKhac_LyDoChiTiet"}
            className="md:w-[30%] mb-2 md:mb-0"
          >
            Lý do khác (*)
          </label>

          <textarea
            placeholder="Nhập lý do khác tại đây..."
            id="MC_KT_HoanThi_YeuCau_LyDoKhac_LyDoChiTiet"
            rows="3"
            className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800"
            onChange={handleChangeValue}
          />
        </div>
      )}
      {/* END: Lý do */}
    </>
  );
};
