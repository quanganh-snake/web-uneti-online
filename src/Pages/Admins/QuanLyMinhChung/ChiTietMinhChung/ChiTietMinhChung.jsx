import { useNamespace } from '@/Services/Hooks'
import { Checkbox } from '@mui/material'
import { Link } from 'react-router-dom'

export default function ChiTietMinhChung() {
  const ns = useNamespace('kiem-dinh-chat-luong')

  return (
    <div className="box">
      <div className={ns.e('header')}>
        <h3 className={ns.em('header', 'title')}>CHI TIẾT MINH CHỨNG</h3>

        <div className={ns.e('actions')}>
          <Link to="/quan-ly-minh-chung/minh-chung-dung-chung-don-vi">
            <button className="base-button border text-uneti-primary border-uneti-primary">
              Quay lại
            </button>
          </Link>
          <button className="base-button border border-uneti-primary bg-uneti-primary">
            Lưu
          </button>
        </div>
      </div>

      <div className="uneti-divider" />

      <div>
        <div className="flex items-start md:items-center flex-col md:flex-row gap-2 mb-2">
          <p className="md:w-[30%] w-full">
            Tên minh chứng <span className="text-red-500">(*)</span>
          </p>
          <input
            type="text"
            className="base-input w-full"
            value="Thông tư ban hành Chuẩn cơ sở giáo dục đại học"
          />
        </div>
        <div className="flex items-start md:items-center flex-col md:flex-row gap-2 mb-2">
          <p className="md:w-[30%] w-full">
            Số, ngày ban hành, hoặc thời điểm khảo sát, điều tra, phỏng vấn{' '}
            <span className="text-red-500">(*)</span>
          </p>
          <input
            type="text"
            className="base-input w-full"
            value="1/2024/TT-BGDĐT"
          />
        </div>
        <div className="flex items-start md:items-center flex-col md:flex-row gap-2 mb-2">
          <p className="md:w-[30%] w-full">
            Nơi ban hành hoặc nhóm cá nhân thực hiện
            <span className="text-red-500">(*)</span>
          </p>
          <select className="base-input w-full">
            <option>Bộ GD&ĐT</option>
          </select>
        </div>
        <div className="flex items-start md:items-center flex-col md:flex-row gap-2 mb-2">
          <p className="md:w-[30%] w-full">Trích yếu</p>
          <textarea className="base-input w-full"></textarea>
        </div>
        <div className="flex items-start md:items-center flex-col md:flex-row gap-2 mb-2">
          <p className="md:w-[30%] w-full">Trạng thái sử dụng</p>
          <div className="w-full -ml-4">
            <Checkbox />
          </div>
        </div>
        <div className="flex items-start md:items-center flex-col md:flex-row gap-2 mb-2">
          <p className="md:w-[30%] w-full">Nhập link</p>
          <div className="w-full -ml-4">
            <Checkbox />
          </div>
        </div>
        <div className="flex items-start md:items-center flex-col md:flex-row gap-2 mb-2">
          <p className="md:w-[30%] w-full">
            Link đính kèm
            <span className="text-red-500">(*)</span>
          </p>
          <input
            type="text"
            className="base-input w-full"
            value="https://uneti.edu.vn/"
          />
        </div>
      </div>
    </div>
  )
}
