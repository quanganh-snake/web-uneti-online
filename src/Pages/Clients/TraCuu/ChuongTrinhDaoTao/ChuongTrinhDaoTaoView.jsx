import Accordion from '@/Components/Base/Accordion/Accordion'
import CommonLayout from '@/Layouts/Common/CommonLayout'
import { keys } from 'lodash-unified'

import './ChuongTrinhDaoTao.scss'
import { useNamespace } from '@/Services/Hooks'
import Icon from '@/Components/Base/Icon/Icon'
import TickCircle from '@/Components/Base/Icons/TickCircle'
import { useEffect, useState } from 'react'
import { Tooltip } from '@mui/material'
import Dialog from '@/Components/Base/Dialog/Dialog'

const ChuongTrinhDaoTaoView = ({
  chuongTrinhDaoTao,
  listChuongTrinhDaoTaoGoc = [],
}) => {
  const home = {
    path: '/uneti',
    title: 'Trang chủ',
  }

  const breadcrumbs = [
    {
      path: '/tra-cuu',
      title: 'Tra cứu',
    },
    {
      path: '/tra-cuu/chuong-trinh-dao-tao',
      title: 'Chương trình đào tạo',
    },
  ]

  const ns = useNamespace('ctdt')

  const [state, setState] = useState({
    NganhHoc: '',
    KhoaHoc: '',
    DuDieuKienThiCDRTiengAnh: '',
    SoTinChi: 0,
    SoTinChiTinhTBC: 0,
    SoTinChiKhongTinhTBC: 0,
  })
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [monTuongDuong, setMonTuongDuong] = useState([])

  const handleOpenDialogXemMonHocTD = (monTuongDuong) => {
    setMonTuongDuong(monTuongDuong)
    setIsOpenDialog(true)
  }

  useEffect(() => {
    const obj = {
      NganhHoc: listChuongTrinhDaoTaoGoc?.[0]?.NganhHoc,
      KhoaHoc: listChuongTrinhDaoTaoGoc?.[0]?.KhoaHoc,
      DuDieuKienThiCDRTiengAnh: '3/4 - Chưa đủ điều kiện',
      SoTinChi: 0,
      SoTinChiTinhTBC: 0,
      SoTinChiKhongTinhTBC: 0,
    }
    listChuongTrinhDaoTaoGoc.forEach((item) => {
      obj.SoTinChi += item.SoTinChi

      if (item.IsTinhTBC) {
        obj.SoTinChiTinhTBC += item.SoTinChi
      } else {
        obj.SoTinChiKhongTinhTBC += item.SoTinChi
      }
    })
    setState(obj)
  }, [listChuongTrinhDaoTaoGoc])

  return (
    <>
      <CommonLayout home={home} breadcrumbs={breadcrumbs}>
        <div>
          <h3 className="text-center text-lg uppercase text-uneti-primary-light font-bold">
            <p>Chương trình đào tạo</p>
            <p>Ngành {state.NganhHoc}</p>
          </h3>
          <div className="mt-4">
            <h3 className="w-full p-2 bg-uneti-primary text-white rounded-lg">
              1. Thông tin chung
            </h3>

            <div className="ml-6 mt-2 flex flex-col gap-2">
              <p>
                Áp dụng cho khóa:
                <span className="text-blue-600 font-medium ml-2">
                  {state.KhoaHoc}
                </span>
              </p>
              <p>
                Tổng số tín chỉ:
                <span className="text-blue-600 font-medium ml-2">
                  {state.SoTinChi}
                </span>
              </p>
              <p>
                Tổng số tín chỉ tính trung bình chung tích lũy:
                <span className="text-blue-600 font-medium ml-2">
                  {state.SoTinChiTinhTBC}
                </span>
              </p>
              <p>
                Tổng số tín chỉ không tính trung bình chung tích lũy:
                <span className="text-blue-600 font-medium ml-2">
                  {state.SoTinChiKhongTinhTBC}
                </span>
              </p>
              <p>
                Đủ điều kiện thi chuẩn đầu ra tiếng Anh:
                <span className="text-blue-600 font-medium ml-2">
                  {state.DuDieuKienThiCDRTiengAnh}
                </span>
              </p>
            </div>
          </div>
        </div>
        {keys(chuongTrinhDaoTao).map((nganhHoc) => {
          return (
            <div key={nganhHoc} className="my-4">
              <div className="bg-uneti-primary text-white rounded-lg p-2 pl-3 cursor-default">
                <h3>2. Thông tin chi tiết</h3>
              </div>
              <div className="pt-1 ml-3 flex flex-col gap-1">
                {keys(chuongTrinhDaoTao[nganhHoc]).map((loaiNganhHoc) => (
                  <Accordion key={loaiNganhHoc}>
                    <Accordion.Label
                      showIcon={false}
                      className="bg-uneti-primary text-white !p-1 !pl-4 !rounded-lg !underline"
                    >
                      <div>
                        Loại ngành học:{' '}
                        <span className="font-medium">{loaiNganhHoc}</span>
                      </div>
                    </Accordion.Label>
                    <Accordion.Content>
                      <div className="border-2 border-t-0 border-uneti-primary-lighter rounded-[4px_4px_12px_12px]">
                        {keys(chuongTrinhDaoTao[nganhHoc][loaiNganhHoc]).map(
                          (loaiMonHoc, i) => {
                            let tongSoTinChi = 0,
                              soMonTinhTBC = 0,
                              soMonBatBuoc = 0,
                              soTietLT = 0,
                              soTietTH = 0,
                              soTietTuHoc = 0,
                              soMonDat = 0

                            return (
                              <div
                                key={i}
                                className="p-3 pr-0 overflow-hidden rounded-xl"
                              >
                                <div className="overflow-scroll max-h-[400px]">
                                  <table
                                    key={loaiMonHoc}
                                    className={`border-2 border-slate-200 ${ns.e('table')}`}
                                  >
                                    <thead>
                                      <tr>
                                        <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                                          Lọai môn học
                                        </th>
                                        <th
                                          className={`border shadow-scroll-th p-3 sticky top-0 left-0 z-[3] min-w-[160px]`}
                                        >
                                          Tên học phần
                                        </th>
                                        <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                                          Mã học phần
                                        </th>
                                        <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                                          Khoa chủ quản
                                        </th>
                                        <th className="border p-3 sticky top-0 z-[2] w-[70px]">
                                          Số tín chỉ
                                        </th>
                                        <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                                          <Tooltip title="Môn học có tính vào điểm trung bình chung tích lũy hay không">
                                            <span>Tính TBC</span>
                                          </Tooltip>
                                        </th>
                                        <th className="border p-3 sticky top-0 z-[2] w-[80px]">
                                          <Tooltip title="Số tiết lý thuyết">
                                            <span>Tiết LT</span>
                                          </Tooltip>
                                        </th>
                                        <th className="border p-3 sticky top-0 z-[2] w-[80px]">
                                          <Tooltip title="Số tiết tự học">
                                            <span>Tiết tự học/LT</span>
                                          </Tooltip>
                                        </th>
                                        <th className="border p-3 sticky top-0 z-[2] w-[80px]">
                                          <Tooltip title="Số tiết thực hành">
                                            <span>Tiết TH</span>
                                          </Tooltip>
                                        </th>
                                        <th className="border p-3 sticky top-0 z-[2] w-[80px]">
                                          Điểm tín chỉ
                                        </th>
                                        <th className="border p-3 sticky top-0 z-[2] w-[80px]">
                                          Đạt
                                        </th>
                                        <th className="border p-3 sticky top-0 z-[2] w-[90px]">
                                          Bắt buộc
                                        </th>
                                        <th className="border p-3 sticky top-0 z-[2] w-[90px]">
                                          <Tooltip title="Xem môn học tương đương">
                                            <span>Có môn học TĐ</span>
                                          </Tooltip>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {chuongTrinhDaoTao[nganhHoc][
                                        loaiNganhHoc
                                      ][loaiMonHoc].map((monHoc, i) => {
                                        tongSoTinChi += monHoc.SoTinChi
                                        soMonTinhTBC += monHoc.IsTinhTBC ? 1 : 0
                                        soMonBatBuoc += monHoc.BatBuoc ? 1 : 0
                                        soTietLT += monHoc.SoTietLyThuyet
                                        soTietTH += monHoc.SoTietThucHanh
                                        soTietTuHoc += monHoc.SoTietTuHoc
                                        soMonDat +=
                                          Number(monHoc.DiemTongKet) > 4

                                        return (
                                          <tr key={i}>
                                            {i == 0 && (
                                              <td
                                                className="border p-3 !text-white !bg-uneti-primary align-top"
                                                rowSpan={
                                                  chuongTrinhDaoTao[nganhHoc][
                                                    loaiNganhHoc
                                                  ][loaiMonHoc].length + 1
                                                }
                                              >
                                                <div className="h-full max-h-[200px] sticky top-[120px]">
                                                  {loaiMonHoc}
                                                </div>
                                              </td>
                                            )}
                                            <td
                                              className={`left-0 sticky z-[1] shadow-scroll-td`}
                                            >
                                              <div>{monHoc.TenHocPhan}</div>
                                            </td>
                                            <td>
                                              <div>{monHoc.MaHocPhan}</div>
                                            </td>
                                            <td>
                                              <div>{monHoc.Khoa}</div>
                                            </td>
                                            <td>
                                              <div>{monHoc.SoTinChi}</div>
                                            </td>
                                            <td>
                                              <div>
                                                {monHoc.IsTinhTBC ? (
                                                  <Icon>
                                                    <TickCircle />
                                                  </Icon>
                                                ) : (
                                                  ''
                                                )}
                                              </div>
                                            </td>
                                            <td>
                                              <div>{monHoc.SoTietLyThuyet}</div>
                                            </td>
                                            <td>
                                              <div>{monHoc.SoTietTuHoc}</div>
                                            </td>
                                            <td>
                                              <div>{monHoc.SoTietThucHanh}</div>
                                            </td>
                                            <td>
                                              <div>{monHoc.DiemTinChi}</div>
                                            </td>
                                            <td>
                                              <div>
                                                {monHoc.DiemTongKet == null
                                                  ? ''
                                                  : Number(monHoc.DiemTongKet) >
                                                      4
                                                    ? 'Đạt'
                                                    : 'Không đạt'}
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                {monHoc.BatBuoc ? (
                                                  <Icon>
                                                    <TickCircle />
                                                  </Icon>
                                                ) : (
                                                  ''
                                                )}
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                {monHoc.IsMonTuongDuong && (
                                                  <span
                                                    onClick={() =>
                                                      handleOpenDialogXemMonHocTD(
                                                        monHoc.MonTuongDuong,
                                                      )
                                                    }
                                                    className="underline text-uneti-primary p-1 cursor-pointer"
                                                  >
                                                    Xem
                                                  </span>
                                                )}
                                              </div>
                                            </td>
                                          </tr>
                                        )
                                      })}
                                      <tr>
                                        <td colSpan={3}>
                                          <div>Tổng</div>
                                        </td>
                                        <td>
                                          <div>{tongSoTinChi}</div>
                                        </td>
                                        <td>
                                          <div>{soMonTinhTBC}</div>
                                        </td>
                                        <td>
                                          <div>{soTietLT}</div>
                                        </td>
                                        <td>
                                          <div>{soTietTuHoc}</div>
                                        </td>
                                        <td>
                                          <div>{soTietTH}</div>
                                        </td>
                                        <td>
                                          <div></div>
                                        </td>
                                        <td>
                                          <div>{soMonDat}</div>
                                        </td>
                                        <td>
                                          <div>{soMonBatBuoc}</div>
                                        </td>
                                        <td>
                                          <div></div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )
                          },
                        )}
                      </div>
                    </Accordion.Content>
                  </Accordion>
                ))}
              </div>

              <div className="mt-3">
                <p className="text-red-500 font-semibold">
                  <span>(*)</span> <i>Chú thích</i>:
                </p>
                <ul className="ml-3 flex flex-col gap-3">
                  <li>
                    (1): Chương trình khung hiện tại đang áp dụng cho khóa{' '}
                    {state.KhoaHoc}
                  </li>
                  <li>
                    (2): Tổng số tín chỉ bắt buộc là tổng số tín chỉ cần tích
                    lũy đạt được để đủ điều kiện tốt nghiệp
                  </li>
                  <li>
                    (3) : Tổng số tín chỉ tính trung bình chung tích lũy là tổng
                    số tín chỉ được tính vào điểm trung bình tích lũy để xếp
                    loại học lực
                  </li>
                  <li>
                    (4) : Tổng số tín chỉ không tính trung bình chung tích lũy
                    là tổng số tín chỉ không được tính vào điểm trung bình tích
                    lũy để xếp loại học lực
                  </li>
                  <li>
                    <p>
                      (5) : Đủ điều kiện thi Chuẩn đầu ra Tiếng Anh: X/Y - Z
                    </p>
                    <ul className="ml-4 flex flex-col gap-2">
                      <li>
                        - Với Y là tổng số môn học cần đạt được để đủ điều kiện
                        thi chuẩn Đầu ra Tiếng Anh
                      </li>
                      <li>
                        - Với X là tổng số môn học đã đạt được để đủ điều kiện
                        thi chuẩn Đầu ra Tiếng Anh
                      </li>
                      <li>
                        - Với Z là "Đủ điều kiện" hoặc "Chưa đủ điều kiện" để
                        thi Chuẩn đầu ra Tiếng Anh
                      </li>
                    </ul>
                  </li>

                  <li>
                    <p>Đối với loại môn học: </p>
                    <ul className="ml-4 flex flex-col gap-2">
                      <li>- Bắt buộc chung là </li>
                      <li>- Bắt buộc là </li>
                      <li>- Khóa luận tốt nghiệp là </li>
                      <li>- Môn học thay thế là </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          )
        })}
      </CommonLayout>
      <Dialog isOpen={isOpenDialog} setIsOpen={setIsOpenDialog}>
        <div className="overflow-x-scroll">
          <table className={`border-2 border-slate-200 ${ns.e('table')}`}>
            <thead>
              <tr>
                <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                  Lọai môn học
                </th>
                <th
                  className={`border shadow-scroll-th p-3 sticky top-0 left-0 z-[3] min-w-[100px]`}
                >
                  Tên học phần
                </th>
                <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                  Mã học phần
                </th>
                <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                  Số tín chỉ
                </th>
                <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                  Điểm tín chỉ
                </th>
                <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                  Điểm tổng kết
                </th>
              </tr>
            </thead>
            <tbody>
              {monTuongDuong.map((monhoc, i) => (
                <tr key={i}>
                  {i == 0 && (
                    <td
                      className="border p-3 !text-white !bg-uneti-primary"
                      rowSpan={monTuongDuong.length}
                    >
                      Môn học tương đương
                    </td>
                  )}
                  <td className="left-0 sticky z-[1] shadow-scroll-td">
                    <div>{monhoc.TC_SV_ChuongTrinhKhung_TenHocPhan}</div>
                  </td>
                  <td>
                    <div>{monhoc.TC_SV_ChuongTrinhKhung_MaHocPhan}</div>
                  </td>
                  <td>
                    <div>{monhoc.TC_SV_ChuongTrinhKhung_SoTinChi}</div>
                  </td>
                  <td>
                    <div>{monhoc.TC_SV_ChuongTrinhKhung_DiemTinChi}</div>
                  </td>
                  <td>
                    <div>{monhoc.TC_SV_ChuongTrinhKhung_DiemTongKet}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dialog>
    </>
  )
}

export default ChuongTrinhDaoTaoView
