import FileSelect from '@/Components/Base/FileSelect/FileSelect'
import { listYeuCau } from './constants'
import Button from '@/Components/Base/Button/Button'
import IconTrash from './IconTrash'

export const DangKyTotNghiepForm = (props) => {
  const {
    handleChangeValue,
    handleFilesChange,
    lyDo,
    listTenDot,
    giayToKemTheo,
    files,
    handleRemoveFile,
  } = props

  return (
    <>
      <div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
        <label
          htmlFor={'MC_DT_TotNghiepXetThi_TenDot'}
          className="md:w-[30%] mb-2 md:mb-0"
        >
          Học kỳ (*)
        </label>

        <select
          id={'MC_DT_TotNghiepXetThi_TenDot'}
          className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800"
          onChange={handleChangeValue}
        >
          <option value={''}>Chọn học kỳ</option>
          {listTenDot?.map((option) => (
            <option value={option.TenDot} key={option.TenDot}>
              {option.TenDot}
            </option>
          ))}
        </select>
      </div>

      <div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
        <label
          htmlFor={'MC_DT_TotNghiepXetThi_YeuCau'}
          className="md:w-[30%] mb-2 md:mb-0"
        >
          Đăng ký (*)
        </label>

        <select
          onChange={handleChangeValue}
          id={'MC_DT_TotNghiepXetThi_YeuCau'}
          className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800"
        >
          <option>Chọn yêu cầu</option>
          {listYeuCau?.map((option) => (
            <option value={option.value} key={option.id}>
              {option.title}
            </option>
          ))}
        </select>
      </div>

      <div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
        <label
          htmlFor={'MC_DT_TotNghiepXetThi_YeuCau_LyDo'}
          className="md:w-[30%] mb-2 md:mb-0"
        >
          Lý do (*)
        </label>

        <textarea
          id="MC_DT_TotNghiepXetThi_YeuCau_LyDo"
          rows="3"
          value={lyDo}
          placeholder="Nhập lý do tại đây"
          className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800"
          onChange={handleChangeValue}
        />
      </div>

      <div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
        <label
          htmlFor={'MC_DT_TotNghiepXetThi_YeuCau_KemTheo'}
          className="md:w-[30%] mb-2 md:mb-0"
        >
          Giấy tờ kèm theo
        </label>

        <textarea
          id="MC_DT_TotNghiepXetThi_YeuCau_KemTheo"
          rows="3"
          value={giayToKemTheo}
          className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800"
          onChange={handleChangeValue}
        />
      </div>

      <div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
        <label className="md:w-[30%] mb-2 md:mb-0">Ảnh giấy tờ kèm theo</label>

        {/* Files area */}
        <div className="w-full md:w-[70%] flex flex-wrap items-center gap-2">
          {/* Preview image */}
          {files.map((file) => (
            <div>
              <Button
                onClick={() => handleRemoveFile(file)}
                type="transparent"
                icon={true}
              >
                <div className="scale-75">
                  <IconTrash />
                </div>
              </Button>
              <img
                className="w-32 h-32 rounded-xl object-cover"
                key={file.uniqueIdentifier}
                src={URL.createObjectURL(file)}
              />
            </div>
          ))}

          {files.length < 5 && (
            <FileSelect
              width="128"
              height="128"
              maxFiles={5}
              label="Ấn để chọn ảnh hoặc kéo thả ảnh vào đây"
              handleFilesChange={handleFilesChange}
            />
          )}
        </div>
      </div>
    </>
  )
}
