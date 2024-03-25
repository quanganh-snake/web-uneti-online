import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { BaoHongForm } from './BaoHongForm'
import { home, breadcrumbs } from './constants'
import { Link } from 'react-router-dom'
import HuongDanSuDung from './HuongDanSuDung'
import { isEmpty } from 'lodash-unified'
import dayjs from 'dayjs'

export const BaoHongView = (props) => {
  const { handleSubmitData, selectedSuCo, selectedLichHoc, infoPersonOnDuty } =
    props

  return (
    <div className="bg-vs-theme-layout rounded-2xl mx-4 lg:mx-0">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

        <div className="form-submit flex flex-col w-full justify-center">
          <h2 className="text-center uppercase text-lg md:text-2xl font-semibold text-sky-800 mb-3 md:mb-6">
            Báo hỏng thiết bị
          </h2>
          <div className="lg:px-36">
            <BaoHongForm {...props} />

            {infoPersonOnDuty.length > 0 && (
              <div className="my-6">
                <h2 className="uppercase font-semibold text-xl italic text-red-500 mb-4">
                  Thông tin cán bộ trực thiết bị giảng đường
                </h2>
                <table className="border w-full">
                  <tbody>
                    {infoPersonOnDuty.map((nt, index) => (
                      <tr key={index} className="border-b border-neutral-200">
                        <table className="border w-full">
                          <tbody>
                            <tr className="border-b border-neutral-200">
                              <td className="border-r p-2 font-medium">
                                Họ và tên
                              </td>
                              <td className="p-2">{nt.DT_CVNB_LTTBGD_HoTen}</td>
                            </tr>
                            <tr className="border-b border-neutral-200">
                              <td className="border-r p-2 font-medium">
                                Số điện thoại
                              </td>
                              <td className="p-2">
                                {nt.DT_CVNB_LTTBGD_DienThoai}
                              </td>
                            </tr>
                            <tr className="border-b border-neutral-200">
                              <td className="border-r p-2 font-medium">
                                Email
                              </td>
                              <td className="p-2">{nt.DT_CVNB_LTTBGD_Email}</td>
                            </tr>
                            <tr className="border-b border-neutral-200">
                              <td className="border-r p-2 font-medium">
                                Ca trực
                              </td>
                              <td className="p-2">
                                {nt.DT_CVNB_LTTBGD_CaTruc +
                                  ' - ' +
                                  dayjs(nt.DT_CVNB_LTTBGD_NgayTruc).format(
                                    'DD/MM/YYYY',
                                  )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="relative sm:rounded-lg my-6">
              <div className="pb-10 uneti-action flex justify-center gap-2">
                <HuongDanSuDung />

                <button
                  disabled={
                    isEmpty(selectedLichHoc) || selectedSuCo.length === 0
                  }
                  onClick={handleSubmitData}
                  className={`cursor-pointer duration-200 px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-xl ${
                    isEmpty(selectedLichHoc) || selectedSuCo.length === 0
                      ? 'opacity-50'
                      : 'hover:bg-sky-800 hover:text-white cursor-pointer'
                  }`}
                >
                  Gửi yêu cầu
                </button>

                <Link to={'/ho-tro-thiet-bi-giang-duong'}>
                  <button className="cursor-pointer duration-200 px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-xl hover:bg-sky-800 hover:text-white">
                    Trở lại
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
