import Breadcrumb from "@/Components/Breadcumb/Breadcrumb";
import { Select } from "@mui/base";
import { TextareaAutosize } from "@mui/material";
import PropTypes from "prop-types";

function DangKyLopChatLuongView(props) {
  const { home, breadcrumbs } = props;
  return (
    <div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
      <div className="p-4 flex flex-col">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

        <div className="border-[#336699] border border-solid mt-5 rounded-md">
          <form className="py-8 flex flex-col justify-center items-center gap-4">
            <h2 className="text-center uppercase text-2xl font-bold text-sky-800 mb-6">
              TIẾP NHẬN - ĐĂNG KÝ LỚP HỌC CHƯƠNG TRÌNH CHẤT LƯỢNG
            </h2>
            <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <span className="block pr-10 w-[200px]">Đề nghị (*)</span>
              <Select className="flex-1 md:max-w-[75%] rounded-md border border-solid border-gray-300"></Select>
            </div>

            <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <span className="block pr-10 w-[200px]">
                Chi tiết đề nghị (*)
              </span>
              <Select className="flex-1 md:max-w-[75%] rounded-md border border-solid border-gray-300"></Select>
            </div>

            <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-start gap-2">
              <span className="block pr-10 w-[200px]">Lý do (*)</span>
              <TextareaAutosize
                className="flex-1 md:max-w-[75%] p-2 rounded-md border border-solid border-gray-300"
                minRows="3"
              />
            </div>
            <button className="mt-8 px-5 py-3 border-2 border-solid text-[#245D7C] border-[#245D7C] rounded-md font-bold transition-all duration-200 hover:bg-[#245D7C] hover:text-white">
              Gửi Yêu Cầu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

DangKyLopChatLuongView.propTypes = {
  home: PropTypes.object,
  breadcrumbs: PropTypes.array,
};

export default DangKyLopChatLuongView;
