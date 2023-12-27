import dayjs from 'dayjs'
import DataTable from '@/Components/DataTable/DataTable'
import { useBem } from '@/Services/Hooks'
import { Checkbox } from '@mui/material'
import { isEqual } from 'lodash-unified'
import FileSelect from '@/Components/FileSelect/FileSelect'
import { FaPlus } from 'react-icons/fa6'
import { useState } from 'react'

export const LichThiViewKhongCoLich = ({
  listHocPhan,
  selectedRows,
  handleRowSelection,
  handleSubmitData,
}) => {
  const bem = useBem('lich-thi')

  const [files, setFiles] = useState([])

  const handleFilesChange = (file) => {
    setFiles((_files) => [..._files, file])
  }

  return (
    <>
      <DataTable
        maxHeight='400px'
        scrollX
        scrollY
        thead={
          <tr>
            <th scope='col' className={bem.is('sticky')}>
              STT
            </th>
            <th scope='col'>Chọn</th>
            <th scope='col'>Mã lớp</th>
            <th scope='col' className={bem.is('sticky')}>
              Tên môn
            </th>
            <th scope='col'>Hình thức thi</th>
            <th scope='col'>Ngày thi</th>
            <th scope='col'>Thứ</th>
            <th scope='col'>Nhóm</th>
            <th scope='col'>Tiết</th>
            <th scope='col'>Phòng thi</th>
          </tr>
        }
        tbody={
          <>
            {listHocPhan?.map((hocphan, index) => (
              <tr key={index}>
                <td className={bem.is('sticky')}>{index}</td>
                <td>
                  <Checkbox
                    checked={selectedRows?.includes((row) =>
                      isEqual(row, hocphan)
                    )}
                    onClick={() => handleRowSelection(hocphan)}
                  />
                </td>
                <td>{hocphan.MaLopHocPhan}</td>
                <td className={bem.is('sticky')}>{hocphan.TenMonHoc}</td>
                <td>{hocphan.TenHinhThucThi}</td>
                <td>
                  {hocphan.NgayThi &&
                    dayjs(hocphan.NgayThi).format('DD/MM/YYYY')}
                </td>
                <td>{hocphan.Thu}</td>
                <td>{hocphan.Nhom}</td>
                <td>{hocphan.Tiet}</td>
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

        {/* file area */}
        <div className='w-full md:w-2/3 flex flex-wrap items-center gap-2 px-3'>
          {/* Preview image */}
          {files.map((file) => (
            <img
              className='w-32 h-32 rounded-xl object-cover'
              key={file.uniqueIdentifier}
              src={URL.createObjectURL(file)}
            />
          ))}

          <FileSelect
            width='128'
            height='128'
            maxFiles={5}
            label='Ấn để chọn ảnh hoặc kéo thả ảnh vào đây'
            icon={<FaPlus />}
            handleFilesChange={handleFilesChange}
          />
        </div>
      </div>

      <div className='pb-10 uneti-action flex justify-center'>
        <button
          onClick={(e) => handleSubmitData(e, files)}
          className='px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-full hover:bg-sky-800 hover:text-white'
        >
          Gửi yêu cầu
        </button>
      </div>
    </>
  )
}

export default LichThiViewKhongCoLich
