import Breadcrumb from "@/Components/Breadcumb/Breadcrumb";
import PropTypes from "prop-types";
import { GiayToKemTheoAlert } from "@/Components/MotCua/GiayToKemTheoAlert";
import { VanBanMauId } from "@/Configs/constants";

function NghiHocTamThoiView(props) {
  const { home, breadcrumbs } = props;

  return (
    <div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
      <div className="p-4 flex flex-col">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

        <div className="bg-yellow-100 w-full rounded-md mt-4 p-3 flex flex-col justify-center items-center  text-[#856404]">
          <h3 className="text-3xl uppercase text-center text-red-600 mb-4 font-bold my-3">
            THÔNG BÁO GIỚI HẠN TÍNH NĂNG
          </h3>
          <span className="text-center mb-2 font-bold text-sm">
            Chức năng này bị giới hạn không cho phép đề nghị trực tuyến, người
            học cần đến bộ phận Một cửa đề nghị trực tiếp.
          </span>
        </div>

        <GiayToKemTheoAlert
          download={[
            {
              id: VanBanMauId.MotCua.HanhChinh.GiayGioiThieu.DangKyXe,
              text: "Giới thiệu đăng ký xe hoặc công việc khác",
            },
            {
              id: VanBanMauId.MotCua.HanhChinh.GiayGioiThieu.ThucTapNhom,
              text: " Giấy giới thiệu thực tập tốt nghiệp (theo nhóm)",
            },
            {
              id: VanBanMauId.MotCua.HanhChinh.GiayGioiThieu.ThucTapCaNhan,
              text: " Giấy giới thiệu thực tập tốt nghiệp (cá nhân)",
            },
          ]}
          downloadId={
            VanBanMauId.MotCua.HanhChinh.GiayGioiThieu.MauExcelThongTin
          }
          downloadText="Import giới thiệu thực tập tốt nghiệp (cá nhân)"
        />
      </div>
    </div>
  );
}

NghiHocTamThoiView.propTypes = {
  home: PropTypes.object,
  breadcrumbs: PropTypes.array,
};

export default NghiHocTamThoiView;
