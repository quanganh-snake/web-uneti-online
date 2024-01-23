import FileSelect from '@/Components/Base/FileSelect/FileSelect'
import Tag from '@/Components/Base/Tag/Tag'
import { getFileType, humanFileSize } from '@/Services/Utils/fileUtils'
import IconTrash from './IconTrash'
import Button from '@/Components/Base/Button/Button'

const MAX_FILE_SELECT = 1
const ALLOW_FILE_PREVIEW = ['jpg', 'jpeg', 'png']
const ALLOW_FILE_TYPE = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export default function GopYForm(props) {
    const {
        tieuDe,
        noiDung,
        handleChangeValue,
        files,
        handleRemoveFile,
        handleFilesChange,
    } = props

    return (
        <>
            <div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
                <label
                    htmlFor={'HTTBGD_TieuDe'}
                    className="md:w-[30%] mb-2 md:mb-0"
                >
                    Tiêu đề (*)
                </label>

                <input
                    id="HTTBGD_TieuDe"
                    value={tieuDe}
                    placeholder="Nhập tiêu đề..."
                    className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800"
                    onChange={handleChangeValue}
                />
            </div>

            <div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
                <label
                    htmlFor={'HTTBGD_NoiDung'}
                    className="md:w-[30%] mb-2 md:mb-0"
                >
                    Nội dung (*)
                </label>

                <input
                    id="HTTBGD_NoiDung"
                    value={noiDung}
                    placeholder="Nhập nội dung..."
                    className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800"
                    onChange={handleChangeValue}
                />
            </div>

            <div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
                <label className="md:w-[30%] mb-2 md:mb-0">
                    File kèm theo (*)
                </label>

                {/* Files area */}
                <div className="w-full md:w-[70%] flex flex-wrap items-center gap-2">
                    {/* Preview image */}
                    {files.map((file) =>
                        ALLOW_FILE_PREVIEW.includes(getFileType(file)) ? (
                            <div
                                key={file.uniqueIdentifier}
                                className="flex justify-start items-start"
                            >
                                <img
                                    className="w-32 h-32 rounded-xl object-cover"
                                    src={URL.createObjectURL(file)}
                                />
                                <Button
                                    onClick={() => handleRemoveFile(file)}
                                    type="transparent"
                                    icon={true}
                                >
                                    <div className="scale-75">
                                        <IconTrash />
                                    </div>
                                </Button>
                            </div>
                        ) : (
                            // display file name
                            <div
                                key={file.uniqueIdentifier}
                                className="flex gap-1 items-center"
                            >
                                <Tag>{file?.name}</Tag>-
                                <Tag>{humanFileSize(file.size)}</Tag>
                                <Button
                                    onClick={() => handleRemoveFile(file)}
                                    type="transparent"
                                    icon={true}
                                >
                                    <div className="scale-75">
                                        <IconTrash />
                                    </div>
                                </Button>
                            </div>
                        ),
                    )}

                    {files.length < MAX_FILE_SELECT && (
                        <FileSelect
                            width="128"
                            height="128"
                            label="Ấn để chọn ảnh hoặc kéo thả ảnh vào đây"
                            maxFiles={MAX_FILE_SELECT}
                            fileType={ALLOW_FILE_TYPE}
                            maxFileSize={MAX_FILE_SIZE}
                            handleFilesChange={handleFilesChange}
                        />
                    )}
                </div>
            </div>
        </>
    )
}
