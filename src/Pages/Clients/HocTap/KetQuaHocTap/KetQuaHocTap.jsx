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
            <Accordion.Content className="w-full overflow-x-auto">
              <div className="w-full my-4 overflow-hidden rounded-2xl border border-solid border-uneti-primary border-opacity-30">
                <table className="text-vs-text text-sm rounded-3xl">
                  <thead className="font-bold">
                    <tr>
                      <th
                        rowSpan={2}
                        className="px-1 py-4 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0 border-l-0"
                      >
                        Tên môn học
                      </th>
                      <th
                        rowSpan={2}
                        className="px-1 py-4 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                      >
                        Mã lớp học phần
                      </th>
                      <th
                        rowSpan={2}
                        className="px-1 py-4 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                      >
                        Tên lớp học
                      </th>
                      <th
                        rowSpan={2}
                        className="px-1 py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                      >
                        Số tín chỉ
                      </th>
                      <th
                        rowSpan={2}
                        className="px-1 py-4 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                      >
                        Điểm danh (Số buổi vắng)
                      </th>
                      <th
                        rowSpan={2}
                        className="px-1 py-4 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                      >
                        Xét dự thi
                      </th>
                      <th
                        rowSpan={2}
                        className="px-1 py-4 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                      >
                        Không tính TBC
                      </th>
                      <th
                        rowSpan={2}
                        className="px-1 py-4 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                      >
                        Loại môn thi
                      </th>
                      <th
                        className="px-1 py-4 min-w-[300px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0"
                        colSpan={3}
                      >
                        Điểm tổng kết hệ 10
                      </th>
                      <th
                        rowSpan={2}
                        className="px-1 py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                      >
                        Điểm tổng kết hệ 4
                      </th>
                      <th
                        rowSpan={2}
                        className="px-1 py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                      >
                        Điểm chữ
                      </th>
                      <th
                        rowSpan={2}
                        className="px-1 py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                      >
                        Xếp loại
                      </th>
                      <th
                        rowSpan={2}
                        className="px-1 py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                      >
                        Ghi chú 1
                      </th>
                      <th
                        rowSpan={2}
                        className="px-1 py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0 border-r-0"
                      >
                        Ghi chú 2
                      </th>
                    </tr>
                    <tr>
                      <th className="px-1 py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-l-0">
                        Điểm tổng kết
                      </th>
                      <th className="px-1 py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                        Điểm tổng kết lần 1
                      </th>
                      <th className="px-1 py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                        Điểm tổng kết lần 2
                      </th>
                    </tr>
                  </thead>
                  <tbody className="font-[500]">
                    {listMonHoc.map((mh, i) => {
                      if (mh.TC_SV_KetQuaHocTap_HocKy === hk) {
                        return (
                          <tr key={i}>
                            <td className="px-1 py-4 text-center border border-solid border-uneti-primary border-opacity-30 border-l-0 border-b-0">
                              {mh.TC_SV_KetQuaHocTap_TenMonHoc}
                            </td>
                            <td className="px-1 py-4 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                              {mh.TC_SV_KetQuaHocTap_MaLopHocPhan}
                            </td>
                            <td className="px-1 py-4 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                              {mh.TC_SV_KetQuaHocTap_TenLopHoc}
                            </td>
                            <td className="px-1 py-4 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                              {mh.TC_SV_KetQuaHocTap_SoTinChi}
                            </td>
                            <td className="px-1 py-4 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                              {mh.TC_SV_KetQuaHocTap_DiemDanh}
                            </td>
                            <td className="px-1 py-4 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                              {mh.TC_SV_KetQuaHocTap_XetDuThi}
                            </td>
                            <td className="px-1 py-4 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                              {mh.TC_SV_KetQuaHocTap_KhongTinhDiemTBC}
                            </td>
                            <td className="px-1 py-4 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                              {mh.TC_SV_KetQuaHocTap_TenLoaiMonHoc}
                            </td>
                            <td
                              className={`${
                                mh.TC_SV_KetQuaHocTap_DiemTongKet <= 5
                                  ? 'text-vs-danger'
                                  : ''
                              } px-1 py-4 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0`}
                            >
                              {mh.TC_SV_KetQuaHocTap_DiemTongKet}
                            </td>
                            <td
                              className={`${
                                mh.TC_SV_KetQuaHocTap_DiemTongKet1 <= 5
                                  ? 'text-vs-danger'
                                  : ''
                              } px-1 py-4 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0`}
                            >
                              {mh.TC_SV_KetQuaHocTap_DiemTongKet1}
                            </td>
                            <td
                              className={`${
                                mh.TC_SV_KetQuaHocTap_DiemTongKet2 <= 5
                                  ? 'text-vs-danger'
                                  : ''
                              } px-1 py-4 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0`}
                            >
                              {mh.TC_SV_KetQuaHocTap_DiemTongKet2}
                            </td>
                            <td className="px-1 py-4 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                              {mh.TC_SV_KetQuaHocTap_DiemTinChi}
                            </td>
                            <td className="px-1 py-4 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                              {mh.TC_SV_KetQuaHocTap_DiemChu}
                            </td>
                            <td className="px-1 py-4 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                              {mh.TC_SV_KetQuaHocTap_XepLoai}
                            </td>
                            <td className="px-1 py-4 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                              {mh.TC_SV_KetQuaHocTap_GhiChu1}
                            </td>
                            <td className="px-1 py-4 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0 border-r-0">
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
