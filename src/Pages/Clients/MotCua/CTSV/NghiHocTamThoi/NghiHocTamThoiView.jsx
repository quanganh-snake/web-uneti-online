import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import PropTypes from 'prop-types'
import { GiayToKemTheoAlert } from '@/Components/MotCua/GiayToKemTheoAlert'
import { VanBanMauID } from '@/Services/Tokens/filesId'

function NghiHocTamThoiView(props) {
  const { home, breadcrumbs } = props

  return (
    <div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
      <div className="p-4 flex flex-col">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

        <div className="bg-yellow-100 w-full rounded-md mt-4 p-3 flex flex-col justify-center items-center  text-[#856404]">
          <h3 className="text-3xl uppercase text-center text-red-600 mb-4 font-semibold my-3">
            THÔNG BÁO GIỚI HẠN TÍNH NĂNG
          </h3>
          <span className="text-center mb-2 font-semibold text-sm">
            Chức năng này bị giới hạn không cho phép đề nghị trực tuyến, người
            học cần đến bộ phận Một cửa đề nghị trực tiếp.
          </span>
        </div>

        <GiayToKemTheoAlert
          download={[
            {
              id: VanBanMauID.MotCua.CTSV.NghiHocTamThoi.DonXinNghi,
              text: 'Mẫu đơn xin nghỉ',
            },
          ]}
          downloadId={VanBanMauID.MotCua.CTSV.NghiHocTamThoi.MauThongTin}
          downloadText="Xin nghỉ học tạm thời"
        />
      </div>
    </div>
  )
}

NghiHocTamThoiView.propTypes = {
  home: PropTypes.object,
  breadcrumbs: PropTypes.array,
}

export default NghiHocTamThoiView
