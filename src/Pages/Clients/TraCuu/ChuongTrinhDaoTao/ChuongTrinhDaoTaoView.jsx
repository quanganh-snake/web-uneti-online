import Accordion from '@/Components/Base/Accordion/Accordion'
import CommonLayout from '@/Layouts/Common/CommonLayout'
import { keys } from 'lodash-unified'

import './ChuongTrinhDaoTao.scss'
import { useNamespace } from '@/Services/Hooks'
import Icon from '@/Components/Base/Icon/Icon'
import TickCircle from '@/Components/Base/Icons/TickCircle'

const ChuongTrinhDaoTaoView = ({ chuongTrinhDaoTao }) => {
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
          <Accordion key={nganhHoc} isOpen={true}>
            <Accordion.Label className="bg-uneti-primary text-white">
              Ngành học: <span className="font-medium">{nganhHoc}</span>
            </Accordion.Label>
            <Accordion.Content>
              <div className="pt-1 flex flex-col gap-3">
                {keys(chuongTrinhDaoTao[nganhHoc]).map((loaiNganhHoc) => (
                  <div key={loaiNganhHoc}>
                    <div className="bg-uneti-primary text-white py-1 px-3 rounded-md">
                      Loại ngành học:{' '}
                      <span className="font-medium">{loaiNganhHoc}</span>
                    </div>
                    <div className="border-2 border-t-0 border-uneti-primary-lighter rounded-[4px_4px_12px_12px]">
                      {keys(chuongTrinhDaoTao[nganhHoc][loaiNganhHoc]).map(
                        (loaiMonHoc) => (
                          <div className="p-3 overflow-hidden rounded-xl">
                            <div className="overflow-x-scroll">
                              <table
                                key={loaiMonHoc}
                                className={`border-2 border-slate-200 ${ns.e('table')}`}
                              >
                                <thead>
                                  <tr>
                                    <th className="border p-3 min-w-[80px]">
                                      Lọai môn học
                                    </th>
                                    <th
                                      className={`border p-3 min-w-[160px] left-0 sticky`}
                                    >
                                      Tên học phần
                                    </th>
                                    <th className="border p-3 min-w-[80px]">
                                      Mã học phần
                                    </th>
                                    <th className="border p-3 min-w-[80px]">
                                      Khoa chủ quản
                                    </th>
                                    <th className="border p-3 min-w-[80px]">
                                      Số tín chỉ
                                    </th>
                                    <th className="border p-3 min-w-[80px]">
                                      Tính TBC
                                    </th>
                                    <th className="border p-3 min-w-[80px]">
                                      Tiết LT
                                    </th>
                                    <th className="border p-3 min-w-[80px]">
                                      Tiết tự học/LT
                                    </th>
                                    <th className="border p-3 min-w-[80px]">
                                      Tiết TH
                                    </th>
                                    <th className="border p-3 min-w-[80px]">
                                      Bắt buộc
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {chuongTrinhDaoTao[nganhHoc][loaiNganhHoc][
                                    loaiMonHoc
                                  ].map((monHoc, i) => {
                                    return (
                                      <tr key={i}>
                                        {i == 0 && (
                                          <td
                                            className="border p-3 !text-white !bg-uneti-primary"
                                            rowSpan={
                                              chuongTrinhDaoTao[nganhHoc][
                                                loaiNganhHoc
                                              ][loaiMonHoc].length
                                            }
                                          >
                                            <div>{loaiMonHoc}</div>
                                          </td>
                                        )}
                                        <td className={`left-0 sticky`}>
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
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Accordion.Content>
          </Accordion>
        )
      })}
    </CommonLayout>
  )
}

export default ChuongTrinhDaoTaoView
