import Breadcrumb from "@/Components/Breadcumb/Breadcrumb";
import React from "react";
import PropTypes from "prop-types";

function QuaTrinhHocView(props) {
  const { home, breadcrumbs, handleDownloadFile } = props;

  return (
    <div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
      <div className="p-4 flex flex-col">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
        <div className="bg-yellow-100 w-full rounded-md mt-4 p-3 flex flex-col justify-center items-center min-h-[500px] text-[#856404]">
          <h3 className="text-3xl uppercase text-center text-red-600 mb-4 font-bold my-3">
            THÔNG BÁO GIỚI HẠN TÍNH NĂNG
          </h3>
          <span className="mb-4 text-center font-bold text-sm">
            Chức năng này bị giới hạn không cho phép đề nghị trực tuyến, người
            học cần đến bộ phận Một cửa đề nghị trực tiếp.
          </span>
          <br />
          <br />
          <p className="w-full font-bold mb-4 text-sm">
            Các giấy tờ kèm theo (click vào tên giấy tờ để tải file):
          </p>
          <p className="w-full font-bold mb-4 text-sm">
            1. Mẫu đề nghị giải quyết thủ tục hành chính:
            <span
              className="cursor-pointer text-[#245D7C] px-2 hover:text-[#0056b3] duration-200"
              onClick={handleDownloadFile}
            >
              Quá trình học
            </span>
            (Người học cần in, điền thông tin vào mẫu và nộp tại bộ phận Một cửa
            hoặc đến trực tiếp bộ phận Một cửa để lấy mẫu đề nghị giải quyết thủ
            tục hành chính).
          </p>
          <p className="w-full font-bold mb-4 text-sm">
            2. Mẫu giấy tờ kèm theo đề nghị (nếu trong đề nghị yêu cầu), người
            học tải file mẫu tại địa chỉ sau{" "}
            <a
              className="text-[#245D7C] hover:text-[#0056b3] duration-200"
              href="https://uneti.edu.vn/bieu-mau-bo-phan-hanh-chinh-mot-cua/"
            >
              https://uneti.edu.vn/bieu-mau-bo-phan-hanh-chinh-mot-cua/
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

QuaTrinhHocView.propTypes = {
  home: PropTypes.object,
  breadcrumbs: PropTypes.array,
  handleDownloadFile: PropTypes.func,
};

export default QuaTrinhHocView;
