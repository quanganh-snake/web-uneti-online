// import PropTypes from 'prop-types'
import { DebounceInput } from 'react-debounce-input'

const FormGuiEmailThongBaoXuLy = (props) => {
  const {
    // currentStatusId,
    stepHandle,
    // listStatus,
    isTPPheDuyet,
    // isBGHPheDuyet,
    // mucDoId,
  } = props

  console.log(
    '🚀 ~ file: FormGuiEmailThongBaoXuLy.jsx:15 ~ FormGuiEmailThongBaoXuLy ~ isTPPheDuyet:',
    isTPPheDuyet,
  )

  return (
    <div className="my-4">
      <div className="form__content border border-gray-400 p-4 rounded-lg mb-4">
        <h4 className="text-center font-bold mb-2">Thông báo (Gửi Email)</h4>
        {/* START: Chọn Thời gian - Địa điểm (đối với hồ sơ mức độ 2, 3) */}
        {/* START: Chọn phê duyệt */}
        {isTPPheDuyet && (
          <div className="flex items-center gap-4">
            <label htmlFor="">
              <input type="radio" name="isXacNhanPheDuyet" />
              <span>Phê duyệt</span>
            </label>
            <label htmlFor="">
              <input type="radio" name="isXacNhanPheDuyet" />
              <span>Không duyệt</span>
            </label>
            <label htmlFor="">
              <input type="radio" name="isXacNhanPheDuyet" />
              <span>Trình duyệt</span>
            </label>
          </div>
        )}
        {/* START: Nhập nội dung */}
        <div className="form__content--desc mb-2">
          <label htmlFor="form__content--desc">Nội dung:</label>
          <DebounceInput
            id="form__content--desc"
            element="textarea"
            className="w-full border border-slate-200 focus:outline-slate-400 px-3 py-2 rounded-lg"
            debounceTimeout={300}
            placeholder={'Nhập nội dung thông báo đến người gửi hồ sơ...'}
          />
        </div>
        {/* START: Tài liệu kèm theo */}
        <div className="mb-2">
          <label htmlFor="">Tài liệu kèm theo</label>
          <div className="ml-6">
            <div className="flex flex-col mb-2">
              <label htmlFor="">Link tệp đính kèm:</label>
              <input
                type="text"
                className="px-3 py-2 border border-slate-200 focus:outline-slate-400"
              />
            </div>
            <span className="mb-2">hoặc</span>
            <div className="flex flex-col mb-2">
              <label htmlFor="">Tệp đính kèm:</label>
              <input
                type="file"
                className="px-3 py-2 border border-slate-200 focus:outline-slate-400"
              />
              <span className="text-sm font-medium">
                Tệp đính kèm phải có dạng PDF (Kích thước tối đa 5MB)
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="form__action flex gap-4 justify-center">
        <button className="px-3 py-1 rounded-full font-medium border border-[#0484AC] focus:outline-[#0484AC] bg-[#0484AC] text-white shadow-sm hover:opacity-80 hover:shadow-xl">
          {stepHandle === 1 ? 'Tiếp nhận' : 'Gửi'}
        </button>
        <button className="px-3 py-1 rounded-full font-medium border border-red-500 focus:outline-red-500 bg-red-500 text-white shadow-sm hover:opacity-80 hover:shadow-xl">
          Hủy trả
        </button>
      </div>
    </div>
  )
}

FormGuiEmailThongBaoXuLy.propTypes = {}

export default FormGuiEmailThongBaoXuLy
