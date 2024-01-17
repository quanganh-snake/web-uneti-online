import { getALLDiemTrungBinh, getAllMonHoc } from '@/Apis/HocTap/apiHocTap'
import Accordion from '@/Components/Base/Accordion/Accordion'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function KetQuaHocTap() {
  const home = {
    path: '/hoctap',
    title: 'Học tập',
  }

  const breadcrumbs = [
    {
      path: '/hoctap/ketquahoctap',
      title: 'Kết quả học tập',
    },
  ]

  const [listMonHoc, setListMonHoc] = useState([])
  const [listHocKy, setListHocKy] = useState([])
  const [listDiemTrungBinh, setListDiemTrungBinh] = useState([])

  const dataSV = DataSinhVien()

  useEffect(() => {
    getAllMonHoc(dataSV.MaSinhVien).then((res) => {
      setListMonHoc(res?.data?.body)
    })

    getALLDiemTrungBinh(dataSV.MaSinhVien).then((res) => {
      setListDiemTrungBinh(res?.data?.body)
    })

    return () => {
      setListMonHoc([])
      setListDiemTrungBinh([])
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
      <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
      <div className="bg-white mt-4 p-10 rounded-md shadow-sm">
        <h3 className="uppercase w-full text-center font-bold text-xl mb-4 text-uneti-primary">
          KẾT QUẢ HỌC TẬP
        </h3>
        <div>
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
                            className=" py-4 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0 border-l-0"
                          >
                            Tên môn học
                          </th>
                          <th
                            rowSpan={2}
                            className=" py-4 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                          >
                            Mã lớp học phần
                          </th>
                          <th
                            rowSpan={2}
                            className=" py-4 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                          >
                            Tên lớp học
                          </th>
                          <th
                            rowSpan={2}
                            className=" py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                          >
                            Số tín chỉ
                          </th>
                          <th
                            rowSpan={2}
                            className=" py-4 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                          >
                            Điểm danh (Số buổi vắng)
                          </th>
                          <th
                            rowSpan={2}
                            className=" py-4 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                          >
                            Xét dự thi
                          </th>
                          <th
                            rowSpan={2}
                            className=" py-4 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                          >
                            Không tính TBC
                          </th>
                          <th
                            rowSpan={2}
                            className=" py-4 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                          >
                            Loại môn thi
                          </th>
                          <th
                            className=" py-4 min-w-[300px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0"
                            colSpan={3}
                          >
                            Điểm tổng kết hệ 10
                          </th>
                          <th
                            rowSpan={2}
                            className=" py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                          >
                            Điểm tổng kết hệ 4
                          </th>
                          <th
                            rowSpan={2}
                            className=" py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                          >
                            Điểm chữ
                          </th>
                          <th
                            rowSpan={2}
                            className=" py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                          >
                            Xếp loại
                          </th>
                          <th
                            rowSpan={2}
                            className=" py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0"
                          >
                            Ghi chú 1
                          </th>
                          <th
                            rowSpan={2}
                            className=" py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-y-0 border-r-0"
                          >
                            Ghi chú 2
                          </th>
                        </tr>
                        <tr>
                          <th className=" py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-l-0">
                            Điểm tổng kết
                          </th>
                          <th className=" py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                            Điểm tổng kết lần 1
                          </th>
                          <th className=" py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                            Điểm tổng kết lần 2
                          </th>
                        </tr>
                      </thead>
                      <tbody className="font-[500]">
                        {listMonHoc.map((mh, i) => {
                          if (mh.TC_SV_KetQuaHocTap_HocKy === hk) {
                            return (
                              <tr key={i}>
                                <td className="transition-all duration-200 hover:text-uneti-primary cursor-pointer py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-l-0 border-b-0">
                                  <Link
                                    to={`ketquahoctapchitiet/${mh.TC_SV_KetQuaHocTap_MaLopHocPhan}`}
                                  >
                                    {mh.TC_SV_KetQuaHocTap_TenMonHoc}
                                  </Link>
                                </td>
                                <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                  {mh.TC_SV_KetQuaHocTap_MaLopHocPhan}
                                </td>
                                <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                  {mh.TC_SV_KetQuaHocTap_TenLopHoc}
                                </td>
                                <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                  {mh.TC_SV_KetQuaHocTap_SoTinChi}
                                </td>
                                <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                  {mh.TC_SV_KetQuaHocTap_DiemDanh}
                                </td>
                                <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                  {mh.TC_SV_KetQuaHocTap_XetDuThi}
                                </td>
                                <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                  {mh.TC_SV_KetQuaHocTap_KhongTinhDiemTBC}
                                </td>
                                <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                  {mh.TC_SV_KetQuaHocTap_TenLoaiMonHoc}
                                </td>
                                <td
                                  className={`${
                                    mh.TC_SV_KetQuaHocTap_DiemTongKet <= 5
                                      ? 'text-vs-danger'
                                      : ''
                                  }  py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0`}
                                >
                                  {mh.TC_SV_KetQuaHocTap_DiemTongKet}
                                </td>
                                <td
                                  className={`${
                                    mh.TC_SV_KetQuaHocTap_DiemTongKet1 <= 5
                                      ? 'text-vs-danger'
                                      : ''
                                  }  py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0`}
                                >
                                  {mh.TC_SV_KetQuaHocTap_DiemTongKet1}
                                </td>
                                <td
                                  className={`${
                                    mh.TC_SV_KetQuaHocTap_DiemTongKet2 <= 5
                                      ? 'text-vs-danger'
                                      : ''
                                  }  py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0`}
                                >
                                  {mh.TC_SV_KetQuaHocTap_DiemTongKet2}
                                </td>
                                <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                  {mh.TC_SV_KetQuaHocTap_DiemTinChi}
                                </td>
                                <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                  {mh.TC_SV_KetQuaHocTap_DiemChu}
                                </td>
                                <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                  {mh.TC_SV_KetQuaHocTap_XepLoai}
                                </td>
                                <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                  {mh.TC_SV_KetQuaHocTap_GhiChu1}
                                </td>
                                <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0 border-r-0">
                                  {mh.TC_SV_KetQuaHocTap_GhiChu2}
                                </td>
                              </tr>
                            )
                          }
                          return ''
                        })}
                        <tr>
                          <td
                            colSpan={2}
                            className=" py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0 border-l-0"
                          >
                            Điểm trung bình học kỳ hệ 10:{' '}
                            {
                              listDiemTrungBinh.filter(
                                (dtb) => dtb.TC_SV_KetQuaHocTap_TenDot === hk,
                              )[0].TC_SV_KetQuaHocTap_DiemTrungBinhHocKy
                            }
                          </td>
                          <td
                            colSpan={2}
                            className=" py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0"
                          >
                            Điểm trung bình học kỳ hệ 4:{' '}
                            {
                              listDiemTrungBinh.filter(
                                (dtb) => dtb.TC_SV_KetQuaHocTap_TenDot === hk,
                              )[0].TC_SV_KetQuaHocTap_DiemTrungBinhHocKy_He4
                            }
                          </td>
                          <td
                            colSpan={12}
                            className=" py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0 border-r-0"
                          ></td>
                        </tr>
                        <tr>
                          <td
                            colSpan={2}
                            className=" py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0 border-l-0"
                          >
                            Điểm trung bình tích lũy:{' '}
                            {
                              listDiemTrungBinh.filter(
                                (dtb) => dtb.TC_SV_KetQuaHocTap_TenDot === hk,
                              )[0].TC_SV_KetQuaHocTap_DiemTrungBinhTichLuy
                            }
                          </td>
                          <td
                            colSpan={2}
                            className=" py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0"
                          >
                            Điểm trung bình tích lũy (hệ 4):{' '}
                            {
                              listDiemTrungBinh.filter(
                                (dtb) => dtb.TC_SV_KetQuaHocTap_TenDot === hk,
                              )[0].TC_SV_KetQuaHocTap_DiemTrungBinhTichLuy_He4
                            }
                          </td>
                          <td
                            colSpan={12}
                            className=" py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0 border-r-0"
                          ></td>
                        </tr>
                        <tr>
                          <td
                            colSpan={2}
                            className=" py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0 border-l-0"
                          >
                            Tổng số tín chỉ đã đăng ký:{' '}
                            {
                              listDiemTrungBinh.filter(
                                (dtb) => dtb.TC_SV_KetQuaHocTap_TenDot === hk,
                              )[0].TC_SV_KetQuaHocTap_TongTinChi_DangKy
                            }
                          </td>
                          <td
                            colSpan={2}
                            className=" py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0"
                          >
                            Tổng số tín chỉ tích lũy:{' '}
                            {
                              listDiemTrungBinh.filter(
                                (dtb) => dtb.TC_SV_KetQuaHocTap_TenDot === hk,
                              )[0].TC_SV_KetQuaHocTap_TongTinChi_TichLuy
                            }
                          </td>
                          <td
                            colSpan={12}
                            className=" py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0 border-r-0"
                          ></td>
                        </tr>
                        <tr>
                          <td
                            colSpan={2}
                            className=" py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0 border-l-0"
                          >
                            Tổng số tín chỉ nợ tính đến hiện tại:{' '}
                            {
                              listDiemTrungBinh.filter(
                                (dtb) => dtb.TC_SV_KetQuaHocTap_TenDot === hk,
                              )[0].TC_SV_KetQuaHocTap_TongTinChi_No
                            }
                          </td>
                          <td
                            colSpan={2}
                            className=" py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0"
                          >
                            Xếp loại học lực tích lũy:{' '}
                            {
                              listDiemTrungBinh.filter(
                                (dtb) => dtb.TC_SV_KetQuaHocTap_TenDot === hk,
                              )[0].TC_SV_KetQuaHocTap_XepLoaiHocLuc_TichLuy
                            }
                          </td>
                          <td
                            colSpan={12}
                            className=" py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0 border-r-0"
                          ></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Accordion.Content>
              </Accordion>
            ))}
        </div>
      </div>
    </>
  )
}
