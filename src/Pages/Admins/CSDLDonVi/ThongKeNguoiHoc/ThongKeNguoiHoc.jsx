import { Link } from 'react-router-dom'

export default function ThongKeNguoiHoc() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Link to="/csdl-don-vi/tong-quan">
          <button className="base-button bg-uneti-primary">Quay lại</button>
        </Link>

        <h3>
          Thống kê người học -{' '}
          <span className="font-semibold">
            Trường Đại học Kinh tế - Kỹ thuật Công nghiệp
          </span>
        </h3>
      </div>

      <div className="uneti-divider" />

      <div>
        <div className="flex justify-end items-center gap-2">
          <span>Năm: </span>
          <select className="base-input">
            <option>2022 - 2023</option>
            <option>2023 - 2024</option>
          </select>
        </div>

        <div>
          <h3 className="uppercase">Thống kê số lượng người học</h3>

          <table className="border">
            <thead>
              <tr className="bg-uneti-primary-light text-white">
                <th className="px-2 py-3 border-r">Đối tượng</th>
                <th className="px-2 py-3 border-r">Số thí sinh dự tuyển</th>
                <th className="px-2 py-3 border-r">Số trúng tuyển</th>
                <th className="px-2 py-3 border-r">Tỉ lệ cạnh tranh(%)</th>
                <th className="px-2 py-3 border-r">Số nhập học thực tế</th>
                <th className="px-2 py-3 border-r">
                  Điểm tuyển đầu vào (Thang điểm 30)
                </th>
                <th className="px-2 py-3 border-r">
                  Điểm trung bình của người học trực tuyến
                </th>
                <th className="px-2 py-3 border-r">
                  Số lượng người học quốc tế nhập học
                </th>
                <th className="px-2">Tác vụ</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Nghiên cứu sinh</td>
                <td>102</td>
                <td>44</td>
                <td>2.67</td>
                <td>48</td>
                <td></td>
                <td>5.47</td>
                <td>15</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
