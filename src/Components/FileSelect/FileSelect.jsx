import { useBem } from "@/Services/Hooks";
import { useEffect, useRef } from "react";

import "./FileSelect.scss";
import { store } from "@/Services/Redux/store";
import Resumable from "resumablejs";
import { FaPlus } from "react-icons/fa6";
import Swal from "sweetalert2";

export const FileSelect = (props) => {
  const {
    maxFiles = 1,
    handleFilesChange,
    width = 40,
    height = 40,
    icon = <FaPlus />,
  } = props;

  const fileId = `file-${Math.random(1111, 9999) * 1000}`;

  const bem = useBem("file-select");

  const browseFile = useRef();

  useEffect(() => {
    const resumable = new Resumable({
      target: "", // TODO:
      fileType: ["jpg", "jpeg", "png"],
      chunkSize: 4000000, // 4M
      headers: () => {
        const dataToken = store.getState()?.auth?.login?.currentToken;

        if (dataToken) {
          const { token: accessToken } = dataToken;

          return {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          };
        }
      },
      testChunks: false,
      forceChunkSize: true,
      maxFiles: maxFiles,
      withCredentials: true,
      chunkRetryInterval: 10000, // 10s
      fileTypeErrorCallback(file, errorCount) {
        console.log({ file, errorCount });
      },
      maxFilesErrorCallback(files, errorCount) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Chỉ được chọn tối đa 5 ảnh!",
        });
      },
      maxFileSizeErrorCallback(file, errorCount) {
        console.log({ file, errorCount });
      },
      minFileSizeErrorCallback(file, errorCount) {
        console.log({ file, errorCount });
      },
      query: () => {
        return {};
      },
    });

    resumable.assignBrowse(browseFile.current, false);
    resumable.assignDrop(browseFile.current);

    resumable.on("fileAdded", (file) => {
      handleFilesChange(file.file);
    });

    resumable.on("progress", () => {});

    resumable.on("fileSuccess", () => {});

    resumable.on("fileError", () => {});
  }, []);

  return (
    <div
      ref={browseFile}
      data-dropzone-id={fileId}
      id={fileId}
      className={bem.b()}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <span className={bem.e("icon")}>{icon}</span>
      {/* <p className={bem.e('label')}>{label}</p> */}
    </div>
  );
};

export default FileSelect;
