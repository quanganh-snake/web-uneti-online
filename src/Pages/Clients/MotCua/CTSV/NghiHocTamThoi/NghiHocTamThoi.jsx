import React from "react";
import NghiHocTamThoiView from "./NghiHocTamThoiView";

function NghiHocTamThoi() {
  const home = {
    path: "/motcua",
    title: "Bộ phận một cửa",
  };

  const breadcrumbs = [
    {
      path: "/motcua/ct&ctsv",
      title: "Công tác sinh viên",
    },
    {
      path: "/motcua/ct&ctsv/nghihoctamthoi",
      title: "Nghỉ học tạm thời",
    },
  ];

  const handleDownloadFile = (e) => {
    e.preventDefault();
    console.log("download file here");
  };

  return (
    <NghiHocTamThoiView
      home={home}
      breadcrumbs={breadcrumbs}
      handleDownloadFile={handleDownloadFile}
    />
  );
}

export default NghiHocTamThoi;
