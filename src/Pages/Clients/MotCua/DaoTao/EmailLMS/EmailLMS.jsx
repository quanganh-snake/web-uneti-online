import React, { useEffect, useState } from "react";
import EmailLMSView from "./EmailLMSView";

function EmailLMS() {
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
      path: "/motcua/daotao/emaillms",
      title: "Email, LMS",
    },
  ];

  const listDeNghi = ["Tài khoản Email UNETI", "Tài khoản LMS"];
  const listChiTietDeNghiEmail = [
    "Cấp mới tài khoản Email",
    "Mở khoá email (Vô hiệu hoá)",
    "Mở khoá email (Bảo mật 2 lớp)",
    "Đổi tên tài khoản Email",
    "Reset mật khẩu",
    "Thay đổi số điện thoại xác minh 2 bước",
  ];
  const listChiTietDeNghiLMS = ["Cấp mới tài khoản LMS", "Reset mật khẩu"];
  const [listChiTietDeNghi, setListChiTietDeNghi] = useState([
    ...listChiTietDeNghiEmail,
  ]);
  const [deNghi, setDeNghi] = useState(listDeNghi[0]);
  const [chiTietDeNghi, setChiTietDeNghi] = useState(listChiTietDeNghiEmail[0]);
  const [emailCaNhan, setEmailCaNhan] = useState("");
  const [lyDo, setLyDo] = useState("");

  useEffect(() => {
    console.log(deNghi);
    switch (listDeNghi.indexOf(deNghi)) {
      case 0: {
        setListChiTietDeNghi(() => [...listChiTietDeNghiEmail]);
        setChiTietDeNghi(() => listChiTietDeNghiEmail[0]);
        break;
      }
      case 1: {
        setListChiTietDeNghi(() => [...listChiTietDeNghiLMS]);
        setChiTietDeNghi(() => listChiTietDeNghiLMS[0]);
        break;
      }
      default: {
        console.log("error");
        break;
      }
    }
  }, [deNghi]);

  useEffect(() => {
    setLyDo(() => "");
  }, [deNghi, chiTietDeNghi]);

  return (
    <EmailLMSView
      home={home}
      breadcrumbs={breadcrumbs}
      deNghi={deNghi}
      setDeNghi={setDeNghi}
      listDeNghi={listDeNghi}
      chiTietDeNghi={chiTietDeNghi}
      setChiTietDeNghi={setChiTietDeNghi}
      emailCaNhan={emailCaNhan}
      setEmailCaNhan={setEmailCaNhan}
      lyDo={lyDo}
      setLyDo={setLyDo}
      listChiTietDeNghi={listChiTietDeNghi}
    />
  );
}

export default EmailLMS;
