import FileSelect from '@/Components/Base/FileSelect/FileSelect'
import { listDeNghiYeuCau, listNoiNhanKetQua } from './constants'

export const XacNhanForm = (props) => {
    const {
        handleChangeValue,
        handleFilesChange,
        lyDo,
        giayToKemTheo,
        noiNhanKetQua,
        files,
    } = props

    return (
        <>
            <div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
                <label
                    htmlFor={'MC_HSSV_XacNhan_YeuCau'}
                    className="md:w-[30%] mb-2 md:mb-0"
                >
                    Đề nghị xác nhận (*)
                </label>
                <select
                    id={'MC_HSSV_XacNhan_YeuCau'}
                    onChange={handleChangeValue}
                    className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800"
                >
                    <option value={''}>Chọn yêu cầu</option>
                    {listDeNghiYeuCau?.map((option) => (
                        <option value={option.value} key={option.id}>
                            {option.title}
                        </option>
                    ))}
                </select>
            </div>

            <div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
                <label
                    htmlFor={'MC_HSSV_XacNhan_YeuCau_LyDo'}
                    className="md:w-[30%] mb-2 md:mb-0"
                >
                    Lý do (*)
                </label>

                <textarea
                    id="MC_HSSV_XacNhan_YeuCau_LyDo"
                    rows="3"
                    value={lyDo}
                    className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800"
                    onChange={handleChangeValue}
                />
            </div>

            <div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
                <label
                    htmlFor={'MC_HSSV_XacNhan_YeuCau_KemTheo'}
                    className="md:w-[30%] mb-2 md:mb-0"
                >
                    Giấy tờ kèm theo
                </label>

                <textarea
                    id="MC_HSSV_XacNhan_YeuCau_KemTheo"
                    rows="3"
                    value={giayToKemTheo}
                    className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800"
                    onChange={handleChangeValue}
                />
            </div>

            <div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
                <label className="md:w-[30%] mb-2 md:mb-0">
                    Ảnh giấy tờ kèm theo
                </label>

                {/* Files area */}
                <div className="w-full md:w-[70%] flex flex-wrap items-center gap-2">
                    {/* Preview image */}
                    {files.map((file) => (
                        <img
                            className="w-32 h-32 rounded-xl object-cover"
                            key={file.uniqueIdentifier}
                            src={URL.createObjectURL(file)}
                        />
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

            <div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
                <label
                    htmlFor={'MC_HSSV_XacNhan_NoiNhan'}
                    className="md:w-[30%] mb-2 md:mb-0"
                >
                    Đăng ký nơi nhận kết quả (*)
                </label>
                <select
                    id={'MC_HSSV_XacNhan_NoiNhan'}
                    onChange={handleChangeValue}
                    value={noiNhanKetQua}
                    className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800"
                >
                    <option value={''}>Chọn nơi nhận kết quả</option>
                    {listNoiNhanKetQua?.map((option) => (
                        <option value={option.value} key={option.id}>
                            {option.title}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}
