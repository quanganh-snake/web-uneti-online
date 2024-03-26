import Accordion from '@/Components/Base/Accordion/Accordion'
import CommonLayout from '@/Layouts/Common/CommonLayout'
import { keys } from 'lodash-unified'

import './ChuongTrinhDaoTao.scss'
import { useNamespace } from '@/Services/Hooks'
import Icon from '@/Components/Base/Icon/Icon'
import TickCircle from '@/Components/Base/Icons/TickCircle'

const ChuongTrinhDaoTaoView = ({
  chuongTrinhDaoTao,
  listChuongTrinhDaoTaoGoc,
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

  return (
    <CommonLayout home={home} breadcrumbs={breadcrumbs}>
      {keys(chuongTrinhDaoTao).map((nganhHoc) => {
        return (
          <div key={nganhHoc}>
            <div className="bg-uneti-primary text-white rounded-lg p-2 pl-3 cursor-default">
              Ngành học: <span className="font-medium">{nganhHoc}</span> - Khóa
              học:{' '}
              <span className="font-medium">
                {listChuongTrinhDaoTaoGoc?.[0]?.KhoaHoc}
              </span>
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
                            soTietTuHoc = 0

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
                                        Số TC
                                      </th>
                                      <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                                        Tính TBC
                                      </th>
                                      <th className="border p-3 sticky top-0 z-[2] w-[80px]">
                                        Tiết LT
                                      </th>
                                      <th className="border p-3 sticky top-0 z-[2] w-[80px]">
                                        Tiết tự học/LT
                                      </th>
                                      <th className="border p-3 sticky top-0 z-[2] w-[80px]">
                                        Tiết TH
                                      </th>
                                      <th className="border p-3 sticky top-0 z-[2] w-[90px]">
                                        Bắt buộc
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {chuongTrinhDaoTao[nganhHoc][loaiNganhHoc][
                                      loaiMonHoc
                                    ].map((monHoc, i) => {
                                      tongSoTinChi += monHoc.SoTinChi
                                      soMonTinhTBC += monHoc.IsTinhTBC ? 1 : 0
                                      soMonBatBuoc += monHoc.BatBuoc ? 1 : 0
                                      soTietLT += monHoc.SoTietLyThuyet
                                      soTietTH += monHoc.SoTietThucHanh
                                      soTietTuHoc += monHoc.SoTietTuHoc

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
                                        <div>{soMonBatBuoc}</div>
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
          </div>
        )
      })}
    </CommonLayout>
  )
}

export default ChuongTrinhDaoTaoView
