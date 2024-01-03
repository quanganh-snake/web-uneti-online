import React, { useEffect, useState } from "react";
import ChuyenDiemView from "./ChuyenDiemView";
import {
  getAllHocPhanChuyenDiem,
  getAllHocPhanTuongDuongChuyenDiem,
} from "@/Apis/MotCua/DaoTao/apiChuyenDiem";
import { DataSinhVien } from "@/Services/Utils/dataSinhVien";

function ChuyenDiem() {
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
      path: "/motcua/daotao/chuyendiem",
      title: "Chuyển điểm",
    },
  ];

  const listLoaiDiem = [
    {
      value: "0",
      text: "Hệ 10",
    },
    {
      value: "1",
      text: "Hệ 4",
    },
  ];

  const xinChuyen = {
    value: "0",
    text: "Học phần tương đương",
  };

  const [listHocPhan, setListHocPhan] = useState([]);

  const [loaiDiem, setLoaiDiem] = useState(listLoaiDiem[0].value);
  const [lyDo, setLyDo] = useState(
    "Đề nghị công nhận kết quả học tập các học phần đã học cho học phần tương đương khác"
  );
  const [giayToKemTheo, setGiayToKemTheo] = useState("Đơn xin chuyển điểm");

  const [currentPage, setCurrentPage] = useState(1);

  const [hocPhan, setHocPhan] = useState({});

  const [listHocPhanTuongDuong, setListHocPhanTuongDuong] = useState([]);

  const [hocPhanTuongDuong, setHocPhanTuongDuong] = useState({});

  const dataSV = DataSinhVien();

  const handleSelectHocPhan = (e, hp) => {
    setHocPhan(() => hp);
  };

  const handleSelectHocPhanTuongDuong = (e, hp) => {
    setHocPhanTuongDuong(() => hp);
  };

  const handleDownloadFile = () => {
    console.log("download file here");
  };

  useEffect(() => {
    getAllHocPhanChuyenDiem(dataSV.MaSinhVien).then((res) => {
      setListHocPhan(res?.data?.body);
    });

    return () => {
      setListHocPhan([]);
      setListHocPhanTuongDuong([]);
      setHocPhanTuongDuong({});
    };
  }, []);

  const handleChangePage = (e, page) => {
    setCurrentPage(() => page);
    setHocPhan(() => ({}));
    setHocPhanTuongDuong(() => ({}));
  };

  // check object null
  function isEmpty(obj) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
  }

  useEffect(() => {
    if (!isEmpty(hocPhan)) {
      getAllHocPhanTuongDuongChuyenDiem(
        dataSV.MaSinhVien,
        hocPhan.MC_DT_ChuyenDiem_ChiTiet_MaMonHoc
      ).then((res) => {
        setListHocPhanTuongDuong(res?.data?.body);
        console.log(res?.data?.body);
      });
    }

    return () => {
      setListHocPhanTuongDuong([]);
      setHocPhanTuongDuong({});
    };
  }, [hocPhan]);

  return (
    <ChuyenDiemView
      home={home}
      breadcrumbs={breadcrumbs}
      xinChuyen={xinChuyen}
      listLoaiDiem={listLoaiDiem}
      loaiDiem={loaiDiem}
      setLoaiDiem={setLoaiDiem}
      lyDo={lyDo}
      setLyDo={setLyDo}
      giayToKemTheo={giayToKemTheo}
      setGiayToKemTheo={setGiayToKemTheo}
      listHocPhan={listHocPhan}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      hocPhan={hocPhan}
      setHocPhan={setHocPhan}
      handleSelectHocPhan={handleSelectHocPhan}
      listHocPhanTuongDuong={listHocPhanTuongDuong}
      handleChangePage={handleChangePage}
      hocPhanTuongDuong={hocPhanTuongDuong}
      setHocPhanTuongDuong={setHocPhanTuongDuong}
      handleSelectHocPhanTuongDuong={handleSelectHocPhanTuongDuong}
      handleDownloadFile={handleDownloadFile}
    />
  );
}

export default ChuyenDiem;
