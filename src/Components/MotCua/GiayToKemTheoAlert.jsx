import { downloadFileById } from "@/Apis/MotCua/apiTaiFileMau";
import { Alert } from "@/Components/Alert/Alert";
import Swal from "sweetalert2";
import { convertBufferToBase64 } from "@/Services/Utils/stringUtils";
import { useMemo } from "react";

export const GiayToKemTheoAlert = (props) => {
  const { download = [], downloadId, downloadText } = props;

  const list = useMemo(() => {
    if (!downloadId || !downloadText) return download;

    return [...download, { id: downloadId, text: downloadText }];
  }, [download, downloadId, downloadText]);

  const handleDownloadFileFromBase64 = (base64Data, filename) => {
    const mimeType = "application/pdf";

    const link = document.createElement("a");
    link.href = `data:${mimeType};base64,${base64Data}`;
    link.download = filename;
    link.click();
  };

  const handleFileFromArrayBuffer = (arrBuffer, filename) => {
    const base64Data = convertBufferToBase64(arrBuffer);

    handleDownloadFileFromBase64(base64Data, filename);
  };

  const handleDownloadFile = async (downloadId) => {
    try {
      const res = await downloadFileById(downloadId);
      const data = res.data.body[0];

      const filename = data.VBM_FileNameUpload;

      switch (data.VBM_DataFileUpload.type) {
        case "Buffer": {
          handleFileFromArrayBuffer(data.VBM_DataFileUpload.data, filename);
          break;
        }

        default:
          Swal.fire({
            icon: "error",
            title: "Lỗi hệ thống",
            text: `Vui lòng thử lại và gửi thông báo lỗi cho bộ phận hỗ trợ phần mềm! Lỗi: FileType`,
          });
          break;
      }
    } catch (error) {
      console.log("Download file error, FileID: " + downloadId, error);
      Swal.fire({
        icon: "error",
        title: "Lỗi hệ thống",
        text: `Vui lòng thử lại và gửi thông báo lỗi cho bộ phận hỗ trợ phần mềm!`,
      });
    }
  };

  return (
    <>
      <Alert
        type="warn"
        title="GHI CHÚ: ĐỐI VỚI CÁC CHỨC NĂNG BỊ GIỚI HẠN KHÔNG CHO PHÉP ĐỀ NGHỊ TRỰC
        TUYẾN, NGƯỜI HỌC CẦN ĐẾN BỘ PHẬN MỘT CỬA ĐỂ ĐỀ NGHỊ TRỰC TIẾP."
        content={
          <>
            <p>Các giấy tờ kèm theo (click vào tên giấy tờ để tải file):</p>
            <p>
              1. Mẫu đề nghị giải quyết thủ tục hành chính:
              {list.map((e, i) => (
                <div
                  key={i}
                  className="cursor-pointer py-2 ml-8 text-[#245D7C] underline font-semibold mx-1 hover:text-[#0056b3] duration-200"
                  onClick={() => handleDownloadFile(e.id)}
                >
                  1.{i + 1} -{e.text},
                </div>
              ))}
              (Người học cần in, điền thông tin vào mẫu và nộp tại bộ phận Một
              cửa hoặc đến trực tiếp bộ phận Một cửa để lấy mẫu đề nghị giải
              quyết thủ tục hành chính).
            </p>
            <p>
              2. Mẫu giấy tờ kèm theo đề nghị (nếu trong đề nghị yêu cầu), người
              học tải file mẫu tại địa chỉ sau{" "}
              <a
                className="text-[#245D7C] hover:text-[#0056b3] duration-200"
                href="https://uneti.edu.vn/bieu-mau-bo-phan-hanh-chinh-mot-cua/"
              >
                https://uneti.edu.vn/bieu-mau-bo-phan-hanh-chinh-mot-cua/
              </a>
            </p>
          </>
        }
      />
    </>
  );
};
