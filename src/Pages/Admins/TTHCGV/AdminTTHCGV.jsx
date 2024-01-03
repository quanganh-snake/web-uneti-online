import React from "react";
import AdminTTHCGVView from "./AdminTTHCGVView";
import { useState } from "react";
import { useEffect } from "react";
import { getAllMucDoThuTuc } from "./../../../Apis/ThuTucHanhChinhGiangVien/apiMucDo";
import { getAllPhongBan } from "../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";
function AdminTTHCGV() {
  const [listMucDo, setListMucDo] = useState(null);
  const [listDonViTiepNhan, setListDonViTiepNhan] = useState(null);
  useEffect(() => {
    const getListMucDoThuTuc = () => {
      getAllMucDoThuTuc()
        .then(async (res) => {
          if (res.status === 200) {
            const data = await res.data;
            setListMucDo(data.body);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getListDonViTiepNhan = async () => {
      try {
        const resultGetDonVi = await getAllPhongBan();
        if (resultGetDonVi.status === 200) {
          const dataDonVi = await resultGetDonVi?.data?.body;
          if (dataDonVi.length) {
            setListDonViTiepNhan(dataDonVi);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    getListMucDoThuTuc();
    getListDonViTiepNhan();
  }, []);

  return (
    <AdminTTHCGVView
      listMucDo={listMucDo}
      listDonViTiepNhan={listDonViTiepNhan}
    />
  );
}

export default AdminTTHCGV;
