import React from "react";
import XinChuyenView from "./XinChuyenView";

function XinChuyen() {
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
      path: "/motcua/ct&ctsv/xinchuyen",
      title: "Xin chuyển",
    },
  ];

  const handleDownloadFile = (e) => {
    e.preventDefault();
    console.log("download file here");
  };

  return (
    <XinChuyenView
      home={home}
      breadcrumbs={breadcrumbs}
      handleDownloadFile={handleDownloadFile}
    />
  );
}

export default XinChuyen;
