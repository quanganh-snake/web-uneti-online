import { useBem } from '@/Services/Hooks'
import DataTable from '@/Components/DataTable/DataTable'
import moment from 'moment'
import { Checkbox } from '@mui/material'
import FileSelect from '@/Components/FileSelect/FileSelect'
import dayjs from 'dayjs'
import { FaPlus } from 'react-icons/fa6'
import { isEqual } from 'lodash-unified'
import { useState } from 'react'

export const LichThiViewTrungLichThi = (props) => {
  const { handleSubmitData, handleRowSelection, listHocPhan, selectedRows } =
    props

  const bem = useBem('lich-thi')

  const [files, setFiles] = useState([])

  const handleFilesChange = (file) => {
    setFiles((_files) => [..._files, file])
  }

  return (
    <>
      <DataTable
        maxHeight="500px"
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
            {listHocPhan?.map((hocphan, index) => (
              <tr key={index}>
                <td className={bem.is('sticky')}>{index}</td>
                <td>
                  <Checkbox
                    checked={selectedRows?.includes((row) =>
                      isEqual(row, hocphan),
                    )}
                    onClick={() => handleRowSelection(hocphan)}
                  />
                </td>
                <td>
                  {hocphan.MaLopHocPhan
                    ? hocphan.MaLopHocPhan
                    : hocphan.KhongCoLich_MaHocPhan
                      ? hocphan.KhongCoLich_MaHocPhan
                      : ''}
                </td>

                <td className={bem.is('sticky')}>
                  <p>
                    {hocphan.TenMonHoc
                      ? hocphan.TenMonHoc
                      : hocphan.KhongCoLich_TenMonHoc}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <p>{hocphan.TenHinhThucThi ? hocphan.TenHinhThucThi : ''}</p>
                </td>

                <td>{dayjs(hocphan.NgayThi).format('DD/MM/YYYY')}</td>

                <td>
                  <p>
                    {hocphan.Thu && hocphan.NgayThi
                      ? hocphan.Thu == 8
                        ? 'Chủ nhật'
                        : 'Thứ ' +
                          hocphan.Thu +
                          ', ' +
                          moment(hocphan.NgayThi).format('DD/MM/YYYY')
                      : ''}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-center">{hocphan.Nhom}</p>
                </td>
                <td>
                  <p>
                    {hocphan.TuTiet && hocphan.DenTiet
                      ? hocphan.TuTiet + ' - ' + hocphan.DenTiet
                      : ''}
                  </p>
                </td>
                <td>
                  <p>{hocphan.TenPhong ? hocphan.TenPhong : ''}</p>
                </td>
              </tr>
            ))}

            {listHocPhan?.length == 0 && (
              <tr>
                <td colSpan={`10`}>
                  <p className="p-4 text-center font-bold text-red-600">
                    Không có dữ liệu!
                  </p>
                </td>
              </tr>
            )}
          </>
        }
      />

      <div className="flex flex-col md:flex-row gap-4 my-10">
        {/* label */}
        <div className="w-full md:w-1/3">
          <h3 className="pl-10 text-lg">Ảnh giấy tờ kèm theo</h3>
        </div>

        {/* file area */}
        <div className="w-full md:w-2/3 flex flex-wrap items-center gap-2 px-3">
          {/* Preview image */}
          {files.map((file) => (
            <img
              className="w-32 h-32 rounded-xl object-cover"
              key={file.uniqueIdentifier}
              src={URL.createObjectURL(file)}
            />
          ))}

          <FileSelect
            width="128"
            height="128"
            maxFiles={5}
            label="Ấn để chọn ảnh hoặc kéo thả ảnh vào đây"
            icon={<FaPlus />}
            handleFilesChange={handleFilesChange}
          />
        </div>
      </div>

      <div className="pb-10 uneti-action flex justify-center">
        <button
          onClick={(e) => handleSubmitData(e, files)}
          className="px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-full hover:bg-sky-800 hover:text-white"
        >
          Gửi yêu cầu
        </button>
      </div>
    </>
  )
}

export default LichThiViewTrungLichThi
