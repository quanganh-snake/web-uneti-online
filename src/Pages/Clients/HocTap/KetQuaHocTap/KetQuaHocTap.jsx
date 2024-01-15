import { getAllMonHoc } from '@/Apis/HocTap/apiHocTap'
import Accordion from '@/Components/Base/Accordion/Accordion'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { useEffect, useState } from 'react'

export default function KetQuaHocTap() {
  const [listMonHoc, setListMonHoc] = useState([])
  const [listHocKy, setListHocKy] = useState([])

  const dataSV = DataSinhVien()

  useEffect(() => {
    getAllMonHoc(dataSV.MaSinhVien).then((res) => {
      setListMonHoc(res?.data?.body)
      console.log(res?.data?.body)
    })

    return () => {
      setListMonHoc([])
    }
  }, [])

  useEffect(() => {
    setListHocKy(
      listMonHoc
        .map((e) => e.TC_SV_KetQuaHocTap_HocKy)
        .filter((v, i, s) => s.indexOf(v) === i),
    )
    return () => {
      setListHocKy([])
    }
  }, [listMonHoc])

  if (!listHocKy.length) {
    return null
  }

  return (
    <>
      {listHocKy.length &&
        listHocKy.map((hk, index) => (
          <Accordion key={index} className="mb-2">
            <Accordion.Label className="bg-uneti-primary text-white">
              Học kỳ {hk}
            </Accordion.Label>
            <Accordion.Content>
              <div className="overflow-x-auto my-1">
                <table className="min-w-[800px]">
                  <thead>
                    <tr>
                      <th
                        rowSpan={2}
                        className="border border-solid border-uneti-primary border-b-0"
                      >
                        Tên môn học
                      </th>
                      <th
                        rowSpan={2}
                        className="border border-solid border-uneti-primary border-b-0"
                      >
                        Mã lớp học phần
                      </th>
                      <th
                        rowSpan={2}
                        className="border border-solid border-uneti-primary border-b-0"
                      >
                        Tên lớp học
                      </th>
                      <th
                        rowSpan={2}
                        className="border border-solid border-uneti-primary border-b-0"
                      >
                        Số tín chỉ
                      </th>
                      <th
                        rowSpan={2}
                        className="border border-solid border-uneti-primary border-b-0"
                      >
                        Điểm danh (Số buổi vắng)
                      </th>
                      <th
                        rowSpan={2}
                        className="border border-solid border-uneti-primary border-b-0"
                      >
                        Xét dự thi
                      </th>
                      <th
                        rowSpan={2}
                        className="border border-solid border-uneti-primary border-b-0"
                      >
                        Không tính TBC
                      </th>
                      <th
                        rowSpan={2}
                        className="border border-solid border-uneti-primary border-b-0"
                      >
                        Loại môn thi
                      </th>
                      <th
                        className="border border-solid border-uneti-primary"
                        colSpan={3}
                      >
                        Điểm tổng kết hệ 10
                      </th>
                      <th
                        rowSpan={2}
                        className="border border-solid border-uneti-primary border-b-0"
                      >
                        Điểm tổng kết hệ 4
                      </th>
                      <th
                        rowSpan={2}
                        className="border border-solid border-uneti-primary border-b-0"
                      >
                        Điểm chữ
                      </th>
                      <th
                        rowSpan={2}
                        className="border border-solid border-uneti-primary border-b-0"
                      >
                        Xếp loại
                      </th>
                      <th
                        rowSpan={2}
                        className="border border-solid border-uneti-primary border-b-0"
                      >
                        Ghi chú 1
                      </th>
                      <th
                        rowSpan={2}
                        className="border border-solid border-uneti-primary border-b-0"
                      >
                        Ghi chú 2
                      </th>
                    </tr>
                    <tr>
                      <th className="border border-solid border-uneti-primary">
                        Điểm tổng kết
                      </th>
                      <th className="border border-solid border-uneti-primary">
                        Điểm tổng kết lần 1
                      </th>
                      <th className="border border-solid border-uneti-primary">
                        Điểm tổng kết lần 2
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listMonHoc.map((mh, i) => {
                      if (mh.TC_SV_KetQuaHocTap_HocKy === hk) {
                        return (
                          <tr key={i}>
                            <td className="text-center border border-solid border-uneti-primary">
                              {mh.TC_SV_KetQuaHocTap_TenMonHoc}
                            </td>
                            <td className="text-center border border-solid border-uneti-primary">
                              {mh.TC_SV_KetQuaHocTap_MaLopHocPhan}
                            </td>
                            <td className="text-center border border-solid border-uneti-primary">
                              {mh.TC_SV_KetQuaHocTap_TenLopHoc}
                            </td>
                            <td className="text-center border border-solid border-uneti-primary">
                              {mh.TC_SV_KetQuaHocTap_SoTinChi}
                            </td>
                            <td className="text-center border border-solid border-uneti-primary">
                              {mh.TC_SV_KetQuaHocTap_DiemDanh}
                            </td>
                            <td className="text-center border border-solid border-uneti-primary">
                              {mh.TC_SV_KetQuaHocTap_XetDuThi}
                            </td>
                            <td className="text-center border border-solid border-uneti-primary">
                              {mh.TC_SV_KetQuaHocTap_KhongTinhDiemTBC}
                            </td>
                            <td className="text-center border border-solid border-uneti-primary">
                              {mh.TC_SV_KetQuaHocTap_TenLoaiMonHoc}
                            </td>
                            <td className="text-center border border-solid border-uneti-primary">
                              {mh.TC_SV_KetQuaHocTap_DiemTongKet}
                            </td>
                            <td className="text-center border border-solid border-uneti-primary">
                              {mh.TC_SV_KetQuaHocTap_DiemTongKet1}
                            </td>
                            <td className="text-center border border-solid border-uneti-primary">
                              {mh.TC_SV_KetQuaHocTap_DiemTongKet2}
                            </td>
                            <td className="text-center border border-solid border-uneti-primary">
                              {mh.TC_SV_KetQuaHocTap_DiemTinChi}
                            </td>
                            <td className="text-center border border-solid border-uneti-primary">
                              {mh.TC_SV_KetQuaHocTap_DiemChu}
                            </td>
                            <td className="text-center border border-solid border-uneti-primary">
                              {mh.TC_SV_KetQuaHocTap_XepLoai}
                            </td>
                            <td className="text-center border border-solid border-uneti-primary">
                              {mh.TC_SV_KetQuaHocTap_GhiChu1}
                            </td>
                            <td className="text-center border border-solid border-uneti-primary">
                              {mh.TC_SV_KetQuaHocTap_GhiChu2}
                            </td>
                          </tr>
                        )
                      }
                      return ''
                    })}
                  </tbody>
                </table>
              </div>
            </Accordion.Content>
          </Accordion>
        ))}
    </>
  )
}
