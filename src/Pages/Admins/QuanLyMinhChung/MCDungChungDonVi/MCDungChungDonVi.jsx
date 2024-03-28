import Button from '@/Components/Base/Button/Button'
import Icon from '@/Components/Base/Icon/Icon'
import { RotateLeft } from '@/Components/Base/Icons/RotateLeft'
import AdvanceSearch from '@/Components/KiemDinhChatLuong/AdvanceSearch'
import { useNamespace } from '@/Services/Hooks'
import { transformCls } from '@/Services/Utils/reactUtils'
import { Tooltip } from '@mui/material'
import { BiChevronDown, BiPencil, BiTrash } from 'react-icons/bi'
import { BsEye } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function MCDungChungDonVi() {
  const ns = useNamespace('kiem-dinh-chat-luong')

  return (
    <div className="box">
      <div className={ns.e('header')}>
        <h3 className={ns.em('header', 'title')}>
          Danh sách cấu hình mã minh chứng
        </h3>

        <div>
          <span>Đơn vị: </span>
          <select className="base-input" disabled>
            <option>Trường Đại học Kinh tế - Kỹ thuật Công nghiệp</option>
          </select>
        </div>
      </div>

      <div className="uneti-divider" />

      <div className="flex flex-col">
        <div className="my-3 flex justify-between items-center">
          <div className="flex gap-2">
            <AdvanceSearch />

            <Tooltip title="Tải lại dữ liệu">
              <button className="icon-btn">
                <Icon>
                  <RotateLeft />
                </Icon>
              </button>
            </Tooltip>
          </div>
          <div className="flex items-center gap-2">
            <span className="underline hover:text-blue-600 cursor-pointer text-uneti-primary">
              Tải file mẫu
            </span>
            <button className="base-button bg-orange-500">Import file</button>
            <button className="base-button bg-uneti-primary">Xuất file</button>
            <Link to="/quan-ly-minh-chung/them-moi-minh-chung">
              <button className="base-button bg-uneti-primary-lighter">
                Thêm mới
              </button>
            </Link>
          </div>
        </div>
        <table className="border w-full">
          <thead>
            <tr>
              <th rowSpan={2} className="th">
                STT
              </th>
              <th rowSpan={2} className="th">
                Tên minh chứng
              </th>
              <th rowSpan={2} className="th">
                Trích yếu
              </th>
              <th rowSpan={2} className="th">
                Số, ngày ban hành hoặc thời điểm khảo sát, điều tra, phỏng vấn,
                quan sát
              </th>
              <th rowSpan={2} className="th">
                Nơi ban hành hoặc nhóm cá nhân thực hiện
              </th>
              <th rowSpan={1} colSpan={2} className="th border-b">
                Phân loại
              </th>
              <th rowSpan={2} className="th">
                Trạng thái
              </th>
              <th rowSpan={2} className="th">
                Tác vụ
              </th>
            </tr>
            <tr>
              <th className="th">Thuộc nhóm</th>
              <th className="th border-r">Thuộc tiêu chuẩn</th>
            </tr>
          </thead>
          <tbody>
            <tr className="tr">
              <td className="td">1</td>
              <td className="td">
                Thông tư ban hành Chuẩn cơ sở giáo dục đại học
              </td>
              <td className="td"></td>
              <td className="td">1/2024/TT-BGDĐT</td>
              <td className="td">Bộ GD&ĐT</td>
              <td className="td">CSGD</td>
              <td className="td">
                <p>BTCCSGD1 - Tiêu chuẩn 1</p>
                <p>BTCCSGD1 - Tiêu chuẩn 2</p>
              </td>
              <td className="td">Không sử dụng</td>
              <td className="td">
                <div className="flex items-center justify-center gap-22">
                  <Link to="/quan-ly-minh-chung/chi-tiet-minh-chung">
                    <Button type="transparent" icon>
                      <Icon>
                        <BsEye />
                      </Icon>
                    </Button>
                  </Link>
                  <Button type="transparent" icon color="warn">
                    <Icon>
                      <BiPencil />
                    </Icon>
                  </Button>
                  <Button type="transparent" icon color="danger">
                    <Icon>
                      <BiTrash />
                    </Icon>
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={9} className="td">
                Có tổng cộng 1 minh chứng
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
