import React, { useState } from "react";
import GiayGioiThieuView from "./GiayGioiThieuView";

function GiayGioiThieu() {
  const home = {
    path: "/motcua",
    title: "Bộ phận một cửa",
  };

  const breadcrumbs = [
    {
      path: "/motcua/hanhchinh",
      title: "Hành chính",
    },
    {
      path: "/motcua/hanhchinh/GiayGioiThieu",
      title: "Nghỉ học tạm thời",
    },
  ];

  const fakeData = [
    "Giới thiệu đăng ký xe hoặc công việc khác",
    "Giấy giới thiệu thực tập tốt nghiệp (theo nhóm)",
    "Giấy giới thiệu thực tập tốt nghiệp (cá nhân)",
    "Import giới thiệu thực tập tốt nghiệp (cá nhân)",
  ];

  const [listMauDeNghi, setListMauDeNghi] = useState([...fakeData]);

  const handleDownloadFile = (e, MauDeNghi) => {
    e.preventDefault();
    console.log("download file", MauDeNghi);
  };

  return (
    <GiayGioiThieuView
      home={home}
      breadcrumbs={breadcrumbs}
      listMauDeNghi={listMauDeNghi}
      handleDownloadFile={handleDownloadFile}
    />
  );
}

export default GiayGioiThieu;
