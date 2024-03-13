import { getAllMonHoc } from '@/Apis/HocTap/apiHocTap'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function KetQuaHocTapChiTiet() {
  const [monHoc, setMonHoc] = useState({})

  const navigate = useNavigate()

  const uLocation = useLocation()

  const id = uLocation.pathname.split('/').at(-1).toString()

  const dataSV = DataSinhVien()

  const home = {
    path: '/hoc-tap',
    title: 'Học tập',
  }

  const breadcrumbs = [
    {
      path: '/hoc-tap/ket-qua-hoc-tap',
      title: 'Kết quả học tập',
    },
    {
      path: '/hoc-tap/ket-qua-hoc-tap/ket-qua-hoc-tap-chi-tiet/' + id,
      title: 'Đăng ký thi lại',
    },
  ]

  useEffect(() => {
    getAllMonHoc(dataSV.MaSinhVien).then((res) => {
      if (
        !res?.data?.body.filter(
          (mh) => mh.TC_SV_KetQuaHocTap_MaLopHocPhan.toString() === id,
        ).length
      ) {
        navigate('/hoc-tap/ket-qua-hoc-tap')
      }
      setMonHoc(
        res?.data?.body.filter(
          (mh) => mh.TC_SV_KetQuaHocTap_MaLopHocPhan.toString() === id,
        )[0],
      )
    })

    return () => {
      setMonHoc({})
    }
  }, [])
  return (
    <div>
      <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
      <div className="bg-white mt-4 p-10 rounded-md shadow-sm">
        <h3 className="uppercase w-full text-center font-semibold text-xl mb-4 text-uneti-primary">
          CHI TIẾT KẾT QUẢ HỌC TẬP {monHoc.TC_SV_KetQuaHocTap_TenMonHoc}
        </h3>
        <div>
          <h4 className="font-semibold mb-4">* Điểm thường kỳ</h4>
          <div className="overflow-auto">
            <div className="min-w-[500px] mb-4 overflow-hidden rounded-2xl border border-solid border-uneti-primary border-opacity-30">
              <table className="w-full text-vs-theme-color text-sm rounded-3xl">
                <thead className="font-semibold">
                  <tr>
                    <th
                      className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0 border-l-0"
                      rowSpan={3}
                    >
                      Điểm chuyên cần
                    </th>
                    <th
                      className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0"
                      colSpan={12}
                    >
                      Điểm thường kỳ
                    </th>
                    <th
                      className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0"
                      rowSpan={3}
                    >
                      Điểm trung bình thường kỳ
                    </th>
                    <th
                      className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0 border-r-0"
                      rowSpan={3}
                    >
                      Vắng thi
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30"
                      colSpan={6}
                    >
                      Điểm hệ số 1
                    </th>
                    <th
                      className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30"
                      colSpan={6}
                    >
                      Điểm hệ số 2
                    </th>
                  </tr>
                  <tr>
                    <th className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                      1
                    </th>
                    <th className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                      2
                    </th>
                    <th className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                      3
                    </th>
                    <th className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                      4
                    </th>
                    <th className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                      5
                    </th>
                    <th className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                      6
                    </th>
                    <th className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                      1
                    </th>
                    <th className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                      2
                    </th>
                    <th className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                      3
                    </th>
                    <th className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                      4
                    </th>
                    <th className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                      5
                    </th>
                    <th className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                      6
                    </th>
                  </tr>
                </thead>
                <tbody className="font-[500]">
                  <tr>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-l-0 border-b-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemChuyenCan_LyThuyet}
                    </td>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-b-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemHeSo11}
                    </td>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-b-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemHeSo12}
                    </td>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-b-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemHeSo13}
                    </td>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-b-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemHeSo14}
                    </td>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-b-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemHeSo15}
                    </td>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-b-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemHeSo16}
                    </td>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-b-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemHeSo21}
                    </td>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-b-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemHeSo22}
                    </td>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-b-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemHeSo23}
                    </td>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-b-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemHeSo24}
                    </td>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-b-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemHeSo25}
                    </td>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-b-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemHeSo26}
                    </td>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-b-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemTBThuongKy}
                    </td>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-b-0 border-r-0">
                      {monHoc.TC_SV_KetQuaHocTap_VangThi ? 'Vắng thi' : ''}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">* Điểm thi kỹ năng (KN)</h4>
          <div className="overflow-auto">
            <div className="mb-4 overflow-hidden rounded-2xl border border-solid border-uneti-primary border-opacity-30">
              <table className="w-full text-vs-theme-color text-sm rounded-3xl">
                <thead className="font-semibold">
                  <tr>
                    <th
                      className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0 border-l-0 border-r-0"
                      colSpan={4}
                    >
                      Điểm thi kỹ năng (KN)
                    </th>
                  </tr>
                  <tr>
                    <th className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-l-0">
                      KN1
                    </th>
                    <th className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                      KN2
                    </th>
                    <th className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                      KN3
                    </th>
                    <th className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-r-0">
                      KN4
                    </th>
                  </tr>
                </thead>
                <tbody className="font-[500]">
                  <tr>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-l-0 border-b-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemThiKyNang1}
                    </td>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-b-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemThiKyNang2}
                    </td>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-b-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemThiKyNang3}
                    </td>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-b-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemThiKyNang4}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">* Điểm thi</h4>
          <div className="overflow-auto">
            <div className=" mb-4 overflow-hidden rounded-2xl border border-solid border-uneti-primary border-opacity-30">
              <table className="w-full text-vs-theme-color text-sm rounded-3xl">
                <thead className="font-semibold">
                  <tr>
                    <th
                      className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0 border-l-0 border-r-0"
                      colSpan={3}
                    >
                      Điểm thi
                    </th>
                  </tr>
                  <tr>
                    <th className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-l-0">
                      Điểm thi
                    </th>
                    <th className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                      Điểm thi lần 1
                    </th>
                    <th className="p-2 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-r-0">
                      Điểm thi lần 2
                    </th>
                  </tr>
                </thead>
                <tbody className="font-[500]">
                  <tr>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-l-0 border-b-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemThi}
                    </td>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-b-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemThi1}
                    </td>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30 text-center border-b-0 border-r-0">
                      {monHoc.TC_SV_KetQuaHocTap_DiemThi2}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <p className="mb-2 font-semibold italic">
            Lưu ý: Quy định đánh giá kết quả học tập theo quy chế hiện hành
          </p>
          <p className="mb-2">
            <span className="font-semibold italic">- Điểm chuyên cần: </span> Có
            hệ số bằng số tín chỉ của học phần và được đánh giá theo thời gian
            học tập trên lớp
          </p>
          <p className="mb-2 font-semibold italic">- Điểm thường kỳ:</p>
          <p className="mb-2 ml-4">
            + Điểm thường kỳ/Điểm hệ số 1: Có hệ số là 1 (Số lượng đầu điểm hệ
            số 1 được nhập điểm tùy theo từng học phần)
          </p>
          <p className="mb-2 ml-4">
            + Điểm thường kỳ/Điểm hệ số 2: Có hệ số là 2 (Số lượng đầu điểm hệ
            số 2 được nhập điểm tùy theo từng học phần)
          </p>
          <p className="mb-2 font-semibold italic">- Điểm thi kỹ năng (KN):</p>
          <p className="mb-2 ml-4">
            + Được thiết kế bao gồm 4 đầu điểm thi của các kỹ năng nghe, nói,
            đọc, viết của các học phần: Tiếng Anh 1; Tiếng Anh 2; Tiếng Anh 3;
            Tiếng Anh 4; Tiếng Anh 5. Tuy nhiên hiện tại nhà trường đang áp dụng
            đánh giá 2 kỹ năng: Nghe; Đọc.
          </p>
          <p className="mb-2 ml-4">
            + Nếu học phần có điểm thi KN thì không có điểm thi kết thúc học
            phần.
          </p>
          <p className="mb-2 font-semibold italic">
            - Điểm thi kết thúc học phần:
          </p>
          <p className="mb-2 ml-4">
            + Điểm thi: là điểm thi cao nhất của lần thi 1 hoặc lần thi 2.
          </p>
          <p className="mb-2 ml-4">
            + Điểm thi lần 1: Kết quả bài thi của lần thi thứ nhất.
          </p>
          <p className="mb-2 ml-4">
            + Điểm thi lần 2 (thi lại): Kết quả bài thi của lần thi lại.
          </p>
        </div>
      </div>
    </div>
  )
}

export default KetQuaHocTapChiTiet
