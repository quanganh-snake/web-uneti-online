import React, { useEffect, useState } from "react";
import EmailLMSView from "./EmailLMSView";
import { DataSinhVien } from "@/Services/Utils/dataSinhVien";
import Swal from "sweetalert2";
import {
  getKiemTraTrungEmailLMS,
  getKiemTraTrungTaiKhoanEmailLMS,
  postEmailLMS,
} from "@/Apis/MotCua/DaoTao/apiEmailLMS";

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
    {
      value: "0",
      text: "Cấp mới tài khoản Email",
    },
    {
      value: "1",
      text: "Mở khoá email (Vô hiệu hoá)",
    },
    {
      value: "2",
      text: "Mở khoá email (Bảo mật 2 lớp)",
    },
    {
      value: "3",
      text: "Đổi tên tài khoản Email",
    },
    {
      value: "4",
      text: "Reset mật khẩu",
    },
    {
      value: "7",
      text: "Thay đổi số điện thoại xác minh 2 bước",
    },
  ];
  const listChiTietDeNghiLMS = [
    {
      value: "5",
      text: "Cấp mới tài khoản LMS",
    },
    {
      value: "6",
      text: "Reset mật khẩu",
    },
  ];
  const [listChiTietDeNghi, setListChiTietDeNghi] = useState([
    ...listChiTietDeNghiEmail,
  ]);
  const [deNghi, setDeNghi] = useState(listDeNghi[0]);
  const [chiTietDeNghi, setChiTietDeNghi] = useState(
    listChiTietDeNghiEmail[0].value
  );
  const [emailCaNhan, setEmailCaNhan] = useState("");
  const [lyDo, setLyDo] = useState("");

  useEffect(() => {
    switch (listDeNghi.indexOf(deNghi)) {
      case 0: {
        setListChiTietDeNghi(() => [...listChiTietDeNghiEmail]);
        setChiTietDeNghi(() => listChiTietDeNghiEmail[0].value);
        break;
      }
      case 1: {
        setListChiTietDeNghi(() => [...listChiTietDeNghiLMS]);
        setChiTietDeNghi(() => listChiTietDeNghiLMS[0].value);
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

  const dataSV = DataSinhVien();

  const handleSubmitData = async (e) => {
    e.preventDefault();
    let dataYeuCau = {};
    dataYeuCau.MC_DT_EMAILLMS_TenCoSo = dataSV.CoSo ? dataSV.CoSo : "null";
    dataYeuCau.MC_DT_EMAILLMS_IDSinhVien = dataSV.IdSinhVien
      ? dataSV.IdSinhVien.toString()
      : "null";
    dataYeuCau.MC_DT_EMAILLMS_MaSinhVien = dataSV.MaSinhVien
      ? dataSV.MaSinhVien
      : "null";
    dataYeuCau.MC_DT_EMAILLMS_HoDem = dataSV.HoDem ? dataSV.HoDem : "null";
    dataYeuCau.MC_DT_EMAILLMS_Ten = dataSV.Ten ? dataSV.Ten : "null";
    dataYeuCau.MC_DT_EMAILLMS_GioiTinh = dataSV.GioiTinh ?? "null";
    dataYeuCau.MC_DT_EMAILLMS_NgaySinh2 = dataSV.NgaySinh
      ? new Date(
          `${dataSV.NgaySinh.split("/")[2]}-${dataSV.NgaySinh.split("/")[1]}-${
            dataSV.NgaySinh.split("/")[0]
          }`
        ).toISOString()
      : "null";
    dataYeuCau.MC_DT_EMAILLMS_TenHeDaoTao = dataSV.BacDaoTao
      ? dataSV.BacDaoTao
      : "null";
    dataYeuCau.MC_DT_EMAILLMS_TenLoaiHinhDT = dataSV.LoaiHinhDaoTao
      ? dataSV.LoaiHinhDaoTao
      : "null";
    dataYeuCau.MC_DT_EMAILLMS_TenKhoaHoc = dataSV.KhoaHoc
      ? dataSV.KhoaHoc.toString()
      : "null";
    dataYeuCau.MC_DT_EMAILLMS_TenNganh = dataSV.ChuyenNganh
      ? dataSV.ChuyenNganh
      : "null";
    dataYeuCau.MC_DT_EMAILLMS_TenLop = dataSV.LopHoc ? dataSV.LopHoc : "null";
    dataYeuCau.MC_DT_EMAILLMS_KhoaChuQuanLop = "null";
    dataYeuCau.MC_DT_EMAILLMS_DienThoai = dataSV.SoDienThoai
      ? dataSV.SoDienThoai
      : dataSV.SoDienThoai2
      ? dataSV.SoDienThoai2
      : dataSV.SoDienThoai3
      ? dataSV.SoDienThoai3
      : "";
    dataYeuCau.MC_DT_EMAILLMS_Email = dataSV.Email_TruongCap
      ? dataSV.Email_TruongCap
      : "null";
    dataYeuCau.MC_DT_EMAILLMS_Loai = listDeNghi.indexOf(deNghi).toString();
    dataYeuCau.MC_DT_EMAILLMS_YeuCau = chiTietDeNghi.toString();
    dataYeuCau.MC_DT_EMAILLMS_YeuCau_LyDo = lyDo.length ? lyDo : "null";
    dataYeuCau.MC_DT_EMAILLMS_EmailCaNhan = emailCaNhan.length ? lyDo : "null";
    dataYeuCau.MC_DT_EMAILLMS_YeuCau_TaiKhoan = "null";
    dataYeuCau.MC_DT_EMAILLMS_YeuCau_Pass = "null";

    //handle post
    Swal.fire({
      title: `Bạn có chắc chắn muốn gửi yêu cầu ${
        listChiTietDeNghi.filter((e) => e.value === chiTietDeNghi)[0].text
      }?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Gửi",
      denyButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handlePostData(dataYeuCau);
      } else if (result.isDenied) {
        Swal.fire(
          `Đã hủy yêu cầu ${
            listChiTietDeNghi.filter((e) => e.value === chiTietDeNghi)[0].text
          }`,
          "",
          "info"
        );
      }
    });
  };

  const handlePostData = async (dataYeuCau) => {
    try {
      // check đã có tài khoản email lms nhưng yêu cầu cấp mới
      if (
        dataYeuCau.MC_DT_EMAILLMS_YeuCau === "0" ||
        dataYeuCau.MC_DT_EMAILLMS_YeuCau === "5"
      ) {
        const checkTrungTaiKhoan = await getKiemTraTrungTaiKhoanEmailLMS(
          dataYeuCau.MC_DT_EMAILLMS_MaSinhVien,
          dataYeuCau.MC_DT_EMAILLMS_Loai,
          dataYeuCau.MC_DT_EMAILLMS_YeuCau
        );
        if (checkTrungTaiKhoan.status === 200) {
          const data = await checkTrungTaiKhoan.data;
          if (data.message === "Bản ghi bị trùng.") {
            Swal.fire({
              icon: "error",
              title: "Thông báo trùng",
              text: `Bạn đã được cấp tài khoản Email/LMS trước đây, Không thể yêu cầu cấp mới`,
            });
            return;
          }
        }
      }
      // check gửi trùng yêu cầu
      const checkKiemTraTrung = await getKiemTraTrungEmailLMS(
        dataYeuCau.MC_DT_EMAILLMS_MaSinhVien,
        dataYeuCau.MC_DT_EMAILLMS_Loai,
        dataYeuCau.MC_DT_EMAILLMS_YeuCau
      );
      if (checkKiemTraTrung.status === 200) {
        const body = checkKiemTraTrung.data?.body[0];
        if (body) {
          Swal.fire({
            icon: "error",
            title: "Thông báo trùng",
            text: `Yêu cầu ${
              listChiTietDeNghi.filter((e) => e.value === chiTietDeNghi)[0].text
            } đã được gửi trước đấy. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
          });
          return;
        }
      }

      const resPostData = await postEmailLMS(dataYeuCau);
      if (resPostData == "ERR_BAD_REQUEST") {
        Swal.fire({
          icon: "error",
          title: "Lỗi hệ thống",
          text: `Vui lòng thử lại và gửi thông báo lỗi cho bộ phận hỗ trợ phần mềm!`,
        });
        return;
      }
      if (resPostData.status === 200) {
        const data = await resPostData.data;

        // Check bản ghi trùng
        if (data.message === "Bản ghi bị trùng.") {
          Swal.fire({
            icon: "error",
            title: "Thông báo trùng",
            text: `Yêu cầu ${
              listChiTietDeNghi.filter((e) => e.value === chiTietDeNghi)[0].text
            } đã được gửi trước đấy. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            text: `Yêu cầu ${
              listChiTietDeNghi.filter((e) => e.value === chiTietDeNghi)[0].text
            } đã được gửi thành công. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
            showConfirmButton: false,
            timer: 1500,
          });

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error);
      if (!error.response) {
        console.log(`Server not response.`);
      } else {
        console.log(`Error `, {
          errorResponse: error.response,
          errorMessage: error.message,
        });
      }
    }
  };

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
      handleSubmitData={handleSubmitData}
    />
  );
}

export default EmailLMS;
