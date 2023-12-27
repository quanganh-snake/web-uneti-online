import React, { useEffect, useState } from "react";
import { clsx } from "clsx";
import { getListThuTucYeuCauByMaNhanSu } from "../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";
import { DataCanBoGV } from "./../../../../Services/Utils/dataCanBoGV";
import moment from "moment";
import { Link } from "react-router-dom";
import { changeSlug } from "../../../../Services/Utils/stringUtils";

function TheoDoiDeNghiTTHCGV() {
  const dataCBGV = DataCanBoGV();
  const { MaNhanSu } = dataCBGV;

  const [listHoSoYeuCau, setListHoSoYeuCau] = useState(null);
  // event handlers

  // effects
  useEffect(() => {
    getListThuTucYeuCauByMaNhanSu(MaNhanSu).then(async (res) => {
      if (res.status === 200) {
        const data = await res.data?.body;
        setListHoSoYeuCau(data);
      }
    });
  }, []);

  return (
    <div clsx={"bg-white w-full"}>
      {listHoSoYeuCau?.length < 0 && (
        <p className="p-2 text-center text-[#336699] border font-semibold">
          Bạn chưa có yêu cầu đề nghị nào!
        </p>
      )}
      {listHoSoYeuCau?.length > 0 && (
        <div className="w-full">
          <h3 className="uppercase font-semibold text-3xl text-center text-[#336699] mb-4">
            Danh sách hồ sơ đã gửi
          </h3>
          <div className="w-full">
            <table className="w-full border">
              <thead className="bg-[#336699] text-white">
                <tr>
                  <th className="w-[40px] p-2 border rounded-tl-xl">
                    <p className="w-full">STT</p>
                  </th>
                  <th className="w-[180px] p-2 border">Tên thủ tục</th>
                  <th className="w-[100px] p-2 border">Ngày gửi</th>
                  <th className="w-[100px] p-2 border">Trạng thái</th>
                  <th className="w-[120px] p-2 border rounded-tr-xl"></th>
                </tr>
              </thead>
              <tbody>
                {listHoSoYeuCau?.map((iHoSo, index) => {
                  let titleSlug = changeSlug(iHoSo?.MC_TTHC_GV_TenThuTuc);
                  return (
                    <tr className="border-b hover:bg-slate-300" key={index}>
                      <td className="border-r text-center">{index + 1}</td>
                      <td className="border-r text-left px-2">
                        <p>{iHoSo?.MC_TTHC_GV_TenThuTuc}</p>
                      </td>
                      <td className="border-r text-center">
                        <p>
                          {moment(iHoSo?.MC_TTHC_GV_GuiYeuCau_NgayGui).format(
                            "DD/MM/YYYY",
                          )}
                        </p>
                      </td>
                      <td className="border-r text-center">
                        <p>{iHoSo?.MC_TTHC_GV_TrangThai_TenTrangThai}</p>
                      </td>
                      <td className="border-r text-center flex items-center justify-center py-2">
                        <Link
                          to={`/tthcgiangvien/theodoiquytrinh/chitiet/${titleSlug}/${iHoSo?.MC_TTHC_GV_GuiYeuCau_ID}`}
                          className="p-2 bg-[#336699] text-white rounded-full hover:opacity-70"
                        >
                          Xem chi tiết
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default TheoDoiDeNghiTTHCGV;
