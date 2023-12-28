import Breadcrumb from "@/Components/Breadcumb/Breadcrumb";
import { MenuItem, Select, TextField, TextareaAutosize } from "@mui/material";
import PropTypes from "prop-types";

function EmailLMSView(props) {
  const {
    home,
    breadcrumbs,
    deNghi,
    setDeNghi,
    listDeNghi,
    chiTietDeNghi,
    setChiTietDeNghi,
    emailCaNhan,
    setEmailCaNhan,
    lyDo,
    setLyDo,
    listChiTietDeNghi,
  } = props;

  return (
    <div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
      <div className="p-4 flex flex-col">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
        <div className="border-[#336699] border border-solid mt-5 rounded-md">
          <form className="py-8 flex flex-col justify-center items-center gap-4">
            <h2 className="text-center uppercase text-2xl font-bold text-sky-800 mb-6">
              TIẾP NHẬN XỬ LÝ CÁC VẤN ĐỀ EMAIL/LMS
            </h2>
            <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <span className="block pr-10 w-[200px]">Đề nghị (*)</span>
              <Select
                defaultValue={listDeNghi[0]}
                value={deNghi}
                onChange={(e) => setDeNghi(e.target.value)}
                className="flex-1 md:max-w-[75%] rounded-md border border-solid border-gray-300"
              >
                {listDeNghi.map((e, index) => (
                  <MenuItem key={index} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <span className="block pr-10 w-[200px]">
                Chi tiết đề nghị (*)
              </span>
              <Select
                value={chiTietDeNghi}
                onChange={(e) => setChiTietDeNghi(e.target.value)}
                className="flex-1 md:max-w-[75%] rounded-md border border-solid border-gray-300"
              >
                {listChiTietDeNghi.map((e, index) => (
                  <MenuItem key={index} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <span className="block pr-10 w-[200px]">
                Email cá nhân _ Ví dụ: @gmail.com (*)
              </span>
              <TextField
                value={emailCaNhan}
                onChange={(e) => setEmailCaNhan(e.target.value)}
                type="email"
                variant="filled"
                className="flex-1 md:max-w-[75%] p-2 rounded-md border border-solid border-gray-300"
              />
            </div>

            <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-start gap-2">
              <span className="block pr-10 w-[200px]">Lý do (*)</span>
              <TextareaAutosize
                className="flex-1 md:max-w-[75%] p-2 rounded-md border border-solid border-gray-300"
                value={lyDo}
                onChange={(e) => setLyDo(e.target.value)}
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

EmailLMSView.propTypes = {
  home: PropTypes.object,
  breadcrumbs: PropTypes.array,
  deNghi: PropTypes.string,
  setDeNghi: PropTypes.func,
  chiTietDeNghi: PropTypes.string,
  setChiTietDeNghi: PropTypes.func,
  lyDo: PropTypes.string,
  setLyDo: PropTypes.func,
  listDeNghi: PropTypes.array,
  listChiTietDeNghi: PropTypes.array,
};

export default EmailLMSView;
