import React, { useEffect, useState } from "react";
import DangKyLopChatLuongView from "./DangKyLopChatLuongView";
import { DataSinhVien } from "@/Services/Utils/dataSinhVien";

function DangKyLopChatLuong() {
  const home = {
    path: "/motcua",
    title: "Bộ phận một cửa",
  };

  const breadcrumbs = [
    {
      path: "/motcua/daotao",
      title: "Đào tạo",
    },
    {
      path: "/motcua/daotao/dangkylopchatluong",
      title: "Đăng ký lớp chất lượng",
    },
  ];

  const [listHocKy, setListHocKy] = useState([]);
  const [hocKy, setHocKy] = useState("");

  const dataSV = DataSinhVien();

  useEffect(() => {
    return () => {
      setListHocKy([]);
    };
  });

  return <DangKyLopChatLuongView home={home} breadcrumbs={breadcrumbs} />;
}

export default DangKyLopChatLuong;
