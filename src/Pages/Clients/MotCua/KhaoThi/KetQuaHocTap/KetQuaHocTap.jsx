import React, { useEffect, useState } from "react";
import KetQuaHocTapView from "./KetQuaHocTapView";
import {
  getAllHocPhanKQHT,
  getKiemTraTrungKQHT,
  getTenDotKQHT,
  postKQHT,
} from "@/Apis/MotCua/KhaoThi/apiKetQuaHocTap";
import { DataSinhVien } from "@/Services/Utils/dataSinhVien";
import Swal from "sweetalert2";

function KetQuaHocTap() {
  const home = {
    path: "/motcua",
    title: "Bộ phận một cửa",
  };

  const breadcrumbs = [
    {
      path: "/motcua/khaothi",
      title: "Khảo thí",
    },
    {
      path: "/motcua/khaothi/ketquahoctap",
      title: "Kết quả học tập",
    },
  ];

  const [loading, setLoading] = useState(true);
  const [listHocKy, setListHocKy] = useState([]);
  const [tenDot, setTenDot] = useState("");
  const [lyDo, setLyDo] = useState("");
  const [listHocPhan, setListHocPhan] = useState([]);
  const [diemSua, setDiemSua] = useState(0);
  const [lyDoChiTiet, setLyDoChiTiet] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const listLyDo = [
    "Xem kết quả học tập",
    "Điều chỉnh, bổ sung: Điểm thường kỳ",
    "Điều chỉnh, bổ sung: Điểm thi",
  ];

  const listLyDoDTK = [
    "Có đi học nhưng không có điểm thường kỳ",
    "Tự nhận thấy điểm thường kỳ chưa phản ánh đúng năng lực học tập. Đề nghị kiểm tra lại điểm thường kỳ",
    "Điểm thường kỳ thay đổi so với trước đây đã xem",
  ];

  const listLyDoDT = [
    "Bị mất điểm thi trên trang cá nhân",
    "Điểm thi thay đổi so với trước đây đã xem",
  ];

  const dataSV = DataSinhVien();

  const handleRowSelection = async (event, item) => {
    if (event.target.checked) {
      // Thêm vào mảng yeucau
      setSelectedRows([...selectedRows, item]);
    } else {
      // Xóa khỏi mảng yeucau
      const updatedYeucau = selectedRows.filter(
        (yeucauItem) => yeucauItem !== item
      );
      setSelectedRows(updatedYeucau);
    }
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();

    if (selectedRows.length > 1 || selectedRows.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng chọn 1 học phần cần yêu cầu sửa điểm!",
      });
      return;
    }

    const itemHocPhan = selectedRows[0];

    let dataHocPhan = {};
    if (itemHocPhan) {
      dataHocPhan.MC_KT_KetQuaHT_YeuCau = listLyDo.indexOf(lyDo).toString();
      dataHocPhan.MC_KT_KetQuaHT_YeuCau_DiemThuongKy_SVYeuCauLyDo =
        lyDo === "Điều chỉnh, bổ sung: Điểm thường kỳ" ? lyDoChiTiet : "null";
      dataHocPhan.MC_KT_KetQuaHT_YeuCau_DiemThuongKy_SVYeuCau =
        lyDo === "Điều chỉnh, bổ sung: Điểm thường kỳ"
          ? diemSua.toString()
          : "null";
      dataHocPhan.MC_KT_KetQuaHT_TenCoSo = dataSV.CoSo ? dataSV.CoSo : "null";
      dataHocPhan.MC_KT_KetQuaHT_TenDot = itemHocPhan.TenDot
        ? itemHocPhan.TenDot
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_MaSinhVien = dataSV.MaSinhVien
        ? dataSV.MaSinhVien
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_HoDem = dataSV.HoDem ? dataSV.HoDem : "null";
      dataHocPhan.MC_KT_KetQuaHT_Ten = dataSV.Ten ? dataSV.Ten : "null";
      dataHocPhan.MC_KT_KetQuaHT_GioiTinh =
        dataSV.GioiTinh !== null ? dataSV.GioiTinh.toString() : "null";
      dataHocPhan.MC_KT_KetQuaHT_TenHeDaoTao = dataSV.BacDaoTao
        ? dataSV.BacDaoTao
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_TenLoaiHinhDT = dataSV.LoaiHinhDaoTao
        ? dataSV.LoaiHinhDaoTao
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_TenKhoaHoc = dataSV.KhoaHoc
        ? dataSV.KhoaHoc
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_TenNganh = dataSV.ChuyenNganh
        ? dataSV.ChuyenNganh
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_TenLop = dataSV.LopHoc
        ? dataSV.LopHoc
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_DienThoai = dataSV.SoDienThoai
        ? dataSV.SoDienThoai
        : dataSV.SoDienThoai2
        ? dataSV.SoDienThoai2
        : dataSV.SoDienThoai3
        ? dataSV.SoDienThoai3
        : "";
      dataHocPhan.MC_KT_KetQuaHT_Email = dataSV.Email_TruongCap
        ? dataSV.Email_TruongCap
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_NgaySinh2 = dataSV.NgaySinh
        ? new Date(
            `${dataSV.NgaySinh.split("/")[2]}-${
              dataSV.NgaySinh.split("/")[1]
            }-${dataSV.NgaySinh.split("/")[0]}`
          ).toISOString()
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_IDSinhVien = dataSV.IdSinhVien
        ? dataSV.IdSinhVien.toString()
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_TenMonHoc = itemHocPhan.TenMonHoc
        ? itemHocPhan.TenMonHoc
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_DiemThuongKy1 = itemHocPhan.DiemThuongKy1
        ? itemHocPhan.DiemThuongKy1.toString()
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_DiemThi = itemHocPhan.DiemThi
        ? itemHocPhan.DiemThi.toString()
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_DiemThi1 = itemHocPhan.DiemThi1
        ? itemHocPhan.DiemThi1.toString()
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_DiemThi2 = itemHocPhan.DiemThi2
        ? itemHocPhan.DiemThi2.toString()
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_DiemTongKet = itemHocPhan.DiemTongKet
        ? itemHocPhan.DiemTongKet.toString()
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_DiemTongKet1 = itemHocPhan.DiemTongKet1
        ? itemHocPhan.DiemTongKet1.toString()
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_DiemTongKet2 = itemHocPhan.DiemTongKet2
        ? itemHocPhan.DiemTongKet2.toString()
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_DiemTinChi = itemHocPhan.DiemTinChi
        ? itemHocPhan.DiemTinChi.toString()
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_DiemChu = itemHocPhan.DiemChu
        ? itemHocPhan.DiemChu
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_IsDat =
        itemHocPhan.IsDat !== null ? itemHocPhan.IsDat.toString() : "null";
      dataHocPhan.MC_KT_KetQuaHT_IDLopHocPhan = itemHocPhan.IDLopHocPhan
        ? itemHocPhan.IDLopHocPhan.toString()
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_MaMonHoc = itemHocPhan.MaMonHoc
        ? itemHocPhan.MaMonHoc
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_KhoaChuQuanMon = itemHocPhan.KhoaChuQuanMon
        ? itemHocPhan.KhoaChuQuanMon
        : "null";
      dataHocPhan.MC_KT_KetQuaHT_YeuCau_XemKetQuaHT_LyDo = listLyDo
        .indexOf(lyDo)
        .toString();
      dataHocPhan.MC_KT_KetQuaHT_YeuCau_XemKetQuaHT_LyDoChiTiet = "null";
      dataHocPhan.MC_KT_KetQuaHT_YeuCau_DiemThi_SVYeuCau =
        lyDo === "Điều chỉnh, bổ sung: Điểm thi" ? diemSua.toString() : "null";
      dataHocPhan.MC_KT_KetQuaHT_YeuCau_DiemThi_SVYeuCauLyDo =
        lyDo === "Điều chỉnh, bổ sung: Điểm thi" ? lyDoChiTiet : "null";
    }

    // handle post
    Swal.fire({
      title: "Bạn chắc chắn muốn gửi yêu cầu sửa điểm?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Gửi",
      denyButtonText: `Hủy`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handlePostData(dataHocPhan);
      } else if (result.isDenied) {
        Swal.fire("Đã hủy gửi yêu cầu sửa điểm", "", "info");
      }
    });
  };

  const handlePostData = async (dataHocPhan) => {
    try {
      const checkKiemTraTrungKQHT = await getKiemTraTrungKQHT(
        dataHocPhan.MC_KT_KetQuaHT_MaSinhVien,
        dataHocPhan.MC_KT_KetQuaHT_TenDot,
        dataHocPhan.MC_KT_KetQuaHT_TenMonHoc,
        dataHocPhan.MC_KT_KetQuaHT_MaMonHoc
      );
      if (checkKiemTraTrungKQHT.status === 200) {
        const body = checkKiemTraTrungKQHT.data?.body[0];
        if (body) {
          Swal.fire({
            icon: "error",
            title: "Thông báo trùng",
            text: `Học phần ${dataHocPhan.MC_KT_KetQuaHT_TenMonHoc} đã được gửi yêu cầu sửa điểm trước đây. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng`,
          });
          return;
        }
        const resPostData = await postKQHT(dataHocPhan);

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
              text: `Học phần ${dataHocPhan.MC_KT_KetQuaHT_TenMonHoc} đã được gửi yêu cầu sửa điểm trước đây. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng`,
            });
          } else {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `Học phần ${dataHocPhan.MC_KT_KetQuaHT_TenMonHoc} đã được gửi yêu cầu sửa điểm thành công. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
              showConfirmButton: false,
              timer: 1500,
            });

            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
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

  useEffect(() => {
    getTenDotKQHT().then((res) => {
      setListHocKy(res?.data?.body);
    });

    setLoading(false);

    if (tenDot !== "" && lyDo !== "") {
      setLoading(true);
      getAllHocPhanKQHT(dataSV.MaSinhVien).then((res) => {
        setLoading(false);
        if (tenDot !== "Tất cả học kỳ") {
          setListHocPhan(() =>
            (res?.data?.body).filter((hocPhan) => hocPhan.TenDot === tenDot)
          );
        } else {
          setListHocPhan(() => res?.data?.body);
        }
      });
    }

    return () => {
      setListHocPhan([]);
      setSelectedRows([]);
      setDiemSua(0);
      setLyDoChiTiet("");
    };
  }, [tenDot, lyDo]);

  useEffect(() => {
    setCurrentPage(1);
  }, [tenDot]);

  // check điểm từ 0 -> 10
  useEffect(() => {
    if (diemSua < 0) {
      setDiemSua(() => 0);
    } else if (diemSua > 10) {
      setDiemSua(() => 10);
    }
  }, [diemSua]);

  return (
    <KetQuaHocTapView
      loading={loading}
      home={home}
      breadcrumbs={breadcrumbs}
      tenDot={tenDot}
      setTenDot={setTenDot}
      lyDo={lyDo}
      setLyDo={setLyDo}
      listHocKy={listHocKy}
      listLyDo={listLyDo}
      listHocPhan={listHocPhan}
      listLyDoDTK={listLyDoDTK}
      listLyDoDT={listLyDoDT}
      lyDoChiTiet={lyDoChiTiet}
      setLyDoChiTiet={setLyDoChiTiet}
      diemSua={diemSua}
      setDiemSua={setDiemSua}
      handleRowSelection={handleRowSelection}
      handleSubmitData={handleSubmitData}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
}

export default KetQuaHocTap;
