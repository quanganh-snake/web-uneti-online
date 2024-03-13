import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { DangKyTotNghiepForm } from './DangKyTotNghiepForm'
import { home, breadcrumbs } from './constants'
import { GiayToKemTheoAlert } from '@/Components/MotCua/GiayToKemTheoAlert'
import { VanBanMauID } from '@/Services/Tokens/filesId'

export const DangKyTotNghiepView = (props) => {
  const { handleSubmitData } = props

  return (
    <div className="bg-white shadow-module-item rounded-md">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

        <div className="form-submit flex flex-col w-full justify-center">
          <h2 className="text-center uppercase text-lg md:text-2xl font-semibold text-sky-800 mb-3 md:mb-6">
            Tiếp nhận yêu cầu đăng ký thi, hoãn, xét tốt nghiệp
          </h2>
          <div className="lg:px-36">
            <DangKyTotNghiepForm {...props} />

            <div className="relative sm:rounded-lg my-6">
              <div className="pb-10 uneti-action flex justify-center">
                <button
                  onClick={handleSubmitData}
                  className="px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-full hover:bg-sky-800 hover:text-white"
                >
                  Gửi yêu cầu
                </button>
              </div>
            </div>
          </div>

          <div className="lg:px-36">
            <GiayToKemTheoAlert
              downloadId={VanBanMauID.MotCua.DaoTao.DangKyTotNghiep.MauThongTin}
              downloadText="Xét, thi, hoãn tốt nghiệp"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
