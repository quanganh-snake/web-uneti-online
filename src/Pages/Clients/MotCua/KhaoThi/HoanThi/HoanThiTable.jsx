import { useBem } from '@/Services/Hooks'
import { isEqual, isNil } from 'lodash-unified'
import Loading from '@/Components/Loading/Loading'
import DataTable from '@/Components/DataTable/DataTable'
import { Checkbox } from '@mui/material'
import dayjs from 'dayjs'
import FileSelect from '@/Components/FileSelect/FileSelect'

export const HoanThiTable = (props) => {
  const bem = useBem('hoan-thi')

  const {
    loading,
    tenDot,
    loaiThi,
    lyDo,
    listHocPhan,
    selectedRow,
    files,
    handleRowSelection,
    handleFilesChange,
    handleSubmitData
  } = props

  return (
    <>
      <div className='relative shadow-md sm:rounded-lg my-6'>
        {loading ? (
          <div className='w-full flex justify-center'>
            <Loading />
          </div>
        ) : !isNil(tenDot) && !isNil(loaiThi) && !isNil(lyDo) ? (
          <>
            <DataTable
              maxHeight='500px'
              scrollX
              scrollY
              thead={
                <tr>
                  <th className={bem.is('sticky')}>STT</th>
                  <th>Chọn</th>
                  <th>Mã lớp học phần</th>
                  <th className={bem.is('sticky')}>Tên môn học</th>
                  <th>Hình thức thi</th>
                  <th>Ngày thi</th>
                  <th>Thứ</th>
                  <th>Nhóm</th>
                  <th>Tiết</th>
                  <th>Phòng thi</th>
                </tr>
              }
              tbody={
                <>
                  {listHocPhan?.map((hocphan, i) => (
                    <tr key={i}>
                      <td className={bem.is('sticky')}>{i}</td>
                      <td>
                        <Checkbox
                          checked={isEqual(selectedRow, hocphan)}
                          onChange={() => handleRowSelection(hocphan)}
                        />
                      </td>
                      <td>{hocphan.MaLopHocPhan}</td>
                      <td className={bem.is('sticky')}>{hocphan.TenMonHoc}</td>
                      <td>{hocphan.TenHinhThucThi}</td>
                      <td>
                        {hocphan.NgayThi &&
                          dayjs(hocphan.NgayThi).format('DD/MM/YYYY')}
                      </td>
                      <td>
                        <p>
                          {hocphan.Thu && hocphan.NgayThi
                            ? hocphan.Thu == 8
                              ? 'Chủ nhật'
                              : 'Thứ ' +
                                hocphan.Thu +
                                ', ' +
                                dayjs(hocphan.NgayThi).format('DD/MM/YYYY')
                            : ''}
                        </p>
                      </td>
                      <td>{hocphan.Nhom}</td>
                      <td>
                        <p>
                          {hocphan.TuTiet && hocphan.DenTiet
                            ? hocphan.TuTiet + ' - ' + hocphan.DenTiet
                            : ''}
                        </p>
                      </td>
                      <td>{hocphan.TenPhong}</td>
                    </tr>
                  ))}

                  {listHocPhan?.length == 0 && (
                    <tr>
                      <td colSpan={`10`}>
                        <p className='p-4 text-center font-bold text-red-600'>
                          Không có dữ liệu!
                        </p>
                      </td>
                    </tr>
                  )}
                </>
              }
            />

            <div className='flex flex-col md:flex-row gap-4 my-10'>
              {/* label */}
              <div className='w-full md:w-1/3'>
                <h3 className='pl-10 text-lg'>Ảnh giấy tờ kèm theo</h3>
              </div>

              {/* Files area */}
              <div className='w-full md:w-2/3 flex flex-wrap items-center gap-2 px-3'>
                {/* Preview image */}
                {files.map((file) => (
                  <img
                    className='w-32 h-32 rounded-xl object-cover'
                    key={file.uniqueIdentifier}
                    src={URL.createObjectURL(file)}
                  />
                ))}

                {files.length < 5 && (
                  <FileSelect
                    width='128'
                    height='128'
                    maxFiles={5}
                    label='Ấn để chọn ảnh hoặc kéo thả ảnh vào đây'
                    handleFilesChange={handleFilesChange}
                  />
                )}
              </div>
            </div>

            <div className='pb-10 uneti-action flex justify-center'>
              <button
                onClick={handleSubmitData}
                className='px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-full hover:bg-sky-800 hover:text-white'
              >
                Gửi yêu cầu
              </button>
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}
