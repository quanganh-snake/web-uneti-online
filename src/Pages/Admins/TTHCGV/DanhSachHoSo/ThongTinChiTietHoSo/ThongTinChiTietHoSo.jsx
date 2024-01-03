import React from "react";
import SidebarTTHCGV from "../../Sidebar/SidebarTTHCGV";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import {
  getThuTucHanhChinhByID,
  putThongTinHoSoThuTuc,
} from "../../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien";
import Swal from "sweetalert2";
import clsx from "clsx";
import Loading from "./../../../../../Components/Loading/Loading";

// icons
import { FaAngleRight } from "react-icons/fa";
import { MdOutlineZoomInMap, MdOutlineZoomOutMap } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import { NguonTiepNhan_WEB } from "../../../../../Services/Static/dataStatic";
import { toast } from "react-toastify";
import { checkConditionObject } from "../../../../../Services/Utils/commonUtils";
import { delTrinhTuThucHienTTHCGV } from "../../../../../Apis/ThuTucHanhChinhGiangVien/apiTrinhTuThucHien";
import { deleteTrangThaiTTHCGV } from "../../../../../Apis/ThuTucHanhChinhGiangVien/apiTrangThai";
import { delThanhPhanHoSoTTHCGV } from "../../../../../Apis/ThuTucHanhChinhGiangVien/apiThanhPhanHoSo";
import { delPhanQuyenTTHCGV } from "../../../../../Apis/ThuTucHanhChinhGiangVien/apiPhanQuyen";
import { convertDataFileToBase64 } from "../../../../../Services/Utils/stringUtils";

function ThongTinChiTietHoSo() {
  const { id } = useParams();
  const [detailHoSoThuTuc, setDetailHoSoThuTuc] = useState({});
  const [loading, setLoading] = useState(true);

  const [showThongTinHoSo, setShowThongTinHoSo] = useState(true);
  const [showTPHSDeNghi, setShowTPHSDeNghi] = useState(false);
  const [showTrinhTuThucHien, setShowTrinhTuThucHien] = useState(false);
  const [showPhanQuyen, setShowPhanQuyen] = useState(false);
  const [showTrangThai, setShowTrangThai] = useState(false);

  const [zoomView, setZoomView] = useState(false);

  const [editRowIndex, setEditRowIndex] = useState(-1);
  const [editValueRow, setEditValueRow] = useState({});

  const [editThongTinChung, setEditThongTinChung] = useState({});

  const TABS = {
    tabThongTinHoSo: "ThongTinHoSo",
    tabTPHSDeNghi: "ThanhPhanHoSoDeNghi",
    tabTrinhTuThucHien: "TrinhTuThucHien",
    tabPhanQuyen: "PhanQuyen",
    tabTrangThai: "TrangThai",
  };
  // Events handlers
  const handleShowView = (tab) => {
    if (tab === TABS.tabThongTinHoSo) {
      setShowThongTinHoSo(!showThongTinHoSo);
    }
    if (tab === TABS.tabTPHSDeNghi) {
      setShowTPHSDeNghi(!showTPHSDeNghi);
    }
    if (tab === TABS.tabTrinhTuThucHien) {
      setShowTrinhTuThucHien(!showTrinhTuThucHien);
    }
    if (tab === TABS.tabPhanQuyen) {
      setShowPhanQuyen(!showPhanQuyen);
    }
    if (tab === TABS.tabTrangThai) {
      console.log("a");
      setShowTrangThai(!showTrangThai);
    }
  };

  const handleDeleteRow = async (type, valueRow) => {
    // DELETE TrangThai
    if (type === TABS.tabTrangThai) {
      Swal.fire({
        icon: "question",
        html: `Bạn chắc chắn muốn xóa trạng thái <p class="font-bold uppercase text-red-600">${valueRow?.MC_TTHC_GV_TrangThai_TenTrangThai}</p> không?`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const dataIDDelete = {
              MC_TTHC_GV_TrangThai_ID:
                valueRow?.MC_TTHC_GV_TrangThai_ID.toString(),
            };
            setLoading(true);
            const resDelete = await deleteTrangThaiTTHCGV(dataIDDelete);
            if (resDelete.status === 200) {
              setLoading(false);
              return toast.success(
                `Xóa thành công công việc ${valueRow?.MC_TTHC_GV_TrangThai_TenTrangThai}!`,
              );
            }
          } catch (error) {
            console.log(error.message);
          }
        }
      });
    }

    // DELETE TrinhTuThucHien
    if (type === TABS.tabTrinhTuThucHien) {
      Swal.fire({
        icon: "question",
        html: `Bạn chắc chắn muốn xóa công việc <p class="font-bold uppercase text-red-600">${valueRow?.MC_TTHC_GV_TrinhTuThucHien_TenCongViec}</p> không?`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const dataIDDelete = {
              MC_TTHC_GV_TrinhTuThucHien_ID:
                valueRow?.MC_TTHC_GV_TrinhTuThucHien_ID.toString(),
            };
            setLoading(true);
            const resDelete = await delTrinhTuThucHienTTHCGV(dataIDDelete);
            if (resDelete.status === 200) {
              setLoading(false);
              return toast.success(
                `Xóa thành công công việc ${valueRow?.MC_TTHC_GV_TrinhTuThucHien_TenCongViec}!`,
              );
            }
          } catch (error) {
            console.log(error.message);
          }
        }
      });
    }

    // DELETE TPHSDeNghi
    if (type === TABS.tabTPHSDeNghi) {
      Swal.fire({
        icon: "question",
        html: `Bạn chắc chắn muốn xóa mẫu giấy tờ kèm theo <p class="font-bold uppercase text-red-600">${valueRow?.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo}</p> không?`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setLoading(true);
            const resDelete = await delThanhPhanHoSoTTHCGV(
              valueRow?.MC_TTHC_GV_ThanhPhanHoSo_ID.toString(),
            );
            if (resDelete.status === 200) {
              setLoading(false);
              return toast.success(`Xóa thành công mẫu giấy tờ kèm theo!`);
            }
          } catch (error) {
            console.log(error.message);
          }
        }
      });
    }

    // DELETE PhanQuyen
    if (type === TABS.tabPhanQuyen) {
      Swal.fire({
        icon: "question",
        html: `Bạn chắc chắn muốn xóa quyền của nhân sự <p class="font-bold uppercase text-red-600">${valueRow?.MC_TTHC_GV_PhanQuyen_HoTen}</p> không?`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setLoading(true);
            const resDelete = await delPhanQuyenTTHCGV(
              valueRow?.MC_TTHC_GV_PhanQuyen_ID.toString(),
            );
            if (resDelete.status === 200) {
              setLoading(false);
              return toast.success(
                `Xóa thành công phân quyền của nhân sự ${valueRow?.MC_TTHC_GV_PhanQuyen_HoTen} khỏi hồ sơ!`,
              );
            }
          } catch (error) {
            console.log(error.message);
          }
        }
      });
    }
  };

  const handleEditRow = async (index, type, valueRow) => {
    if (type === TABS.tabTPHSDeNghi) {
      setEditRowIndex(index);
      setEditValueRow(valueRow);
    }

    if (type === TABS.tabTrangThai) {
      setEditRowIndex(index);
      setEditValueRow(valueRow);
    }
  };

  const handleUpdateRow = async (index, type, valueRow) => {};

  const handleCancelUpdateRow = () => {
    setEditRowIndex(-1);
    setEditValueRow({});
  };

  const handleChangeValue = (tab, e) => {
    const { id, value, checked, type, files, name } = e.target;

    if (tab === TABS.tabThongTinHoSo) {
      setEditThongTinChung((prevObject) => ({
        ...prevObject,
        [name]: value,
      }));
    }

    if (tab === TABS.tabTPHSDeNghi) {
      if (type === "checkbox") {
        console.log(name, checked);
        setEditValueRow((prevEditValueRow) => ({
          ...prevEditValueRow,
          [name]: checked,
        }));
      } else if (type === "file") {
        if (files && files.length > 0) {
          setEditValueRow((prevEditValueRow) => ({
            ...prevEditValueRow,
            MC_TTHC_GV_ThanhPhanHoSo_TenFile: files[0].name,
          }));
          convertDataFileToBase64(files[0]).then((dataFileBase64) => {
            setEditValueRow((prevEditValueRow) => ({
              ...prevEditValueRow,
              MC_TTHC_GV_ThanhPhanHoSo_DataFile: dataFileBase64,
            }));
          });
        }
      } else {
        setEditValueRow((prevEditValueRow) => ({
          ...prevEditValueRow,
          [name]: value,
        }));
      }
    }
  };

  const handleUpdate = async (type) => {
    if (type === TABS.tabThongTinHoSo) {
      const newDataUpdateThongTinHoSo = {
        MC_TTHC_GV_ID: editThongTinChung?.MC_TTHC_GV_ID,
        MC_TTHC_GV_ThuTu: editThongTinChung?.MC_TTHC_GV_ThuTu,
        MC_TTHC_GV_MaThuTuc: editThongTinChung?.MC_TTHC_GV_MaThuTuc,
        MC_TTHC_GV_TenThuTuc: editThongTinChung?.MC_TTHC_GV_TenThuTuc,
        MC_TTHC_GV_GhiChu: editThongTinChung?.MC_TTHC_GV_GhiChu,
        MC_TTHC_GV_IDMucDo: editThongTinChung?.MC_TTHC_GV_IDMucDo,
        MC_TTHC_GV_LinhVuc: editThongTinChung?.MC_TTHC_GV_LinhVuc,
        MC_TTHC_GV_ThuTucLienThong:
          editThongTinChung?.MC_TTHC_GV_ThuTucLienThong,
        MC_TTHC_GV_ThuTucKhongApDungMC:
          editThongTinChung?.MC_TTHC_GV_ThuTucKhongApDungMC,
        MC_TTHC_GV_SoBoHoSo: editThongTinChung?.MC_TTHC_GV_SoBoHoSo,
        MC_TTHC_GV_TongThoiGianGiaiQuyet:
          editThongTinChung?.MC_TTHC_GV_TongThoiGianGiaiQuyet,
        MC_TTHC_GV_DoiTuongThucHien:
          editThongTinChung?.MC_TTHC_GV_DoiTuongThucHien,
        MC_TTHC_GV_CanCuPhapLyCuaTTHC:
          editThongTinChung?.MC_TTHC_GV_CanCuPhapLyCuaTTHC,
        MC_TTHC_GV_DieuKienThucHien:
          editThongTinChung?.MC_TTHC_GV_DieuKienThucHien,
        MC_TTHC_GV_TepThuTuc_TenFile:
          editThongTinChung?.MC_TTHC_GV_TepThuTuc_TenFile,
        MC_TTHC_GV_TepThuTuc_DataFileFile:
          editThongTinChung?.MC_TTHC_GV_TepThuTuc_DataFileFile,
        MC_TTHC_GV_NguonTiepNhan: NguonTiepNhan_WEB,
        MC_TTHC_GV_NoiTiepNhan: editThongTinChung?.MC_TTHC_GV_NoiTiepNhan,
        MC_TTHC_GV_NoiTraKetQua: editThongTinChung?.MC_TTHC_GV_NoiTraKetQua,
      };
      const isEqualValue = checkConditionObject(
        detailHoSoThuTuc?.ThongTinHoSo,
        newDataUpdateThongTinHoSo,
      );
      if (isEqualValue == true) {
        try {
          const resUpdateThongTinHoSo = await putThongTinHoSoThuTuc(
            newDataUpdateThongTinHoSo,
          );
          if (resUpdateThongTinHoSo.status === 200) {
            setLoading(false);
            toast.success("Cập nhật thông tin hồ sơ thành công!");
            return;
          }
        } catch (error) {
          console.log(error.message);
        }
      } else {
        return toast.warning(
          "Không có thay đổi nào để cập nhật thông tin hồ sơ!",
        );
      }
    }
  };

  // Effects
  useEffect(() => {
    const getDataDetailHoSoThuTuc = async () => {
      const resultDataHoSoThuTuc = await getThuTucHanhChinhByID(id);
      setLoading(true);
      if (resultDataHoSoThuTuc.status === 200) {
        const dataDetailHoSoThuTuc = await resultDataHoSoThuTuc.data;
        if (dataDetailHoSoThuTuc) {
          const {
            ThongTinHoSo,
            ThanhPhanHoSo,
            TrinhTuThucHien,
            PhanQuyen,
            TrangThai,
          } = dataDetailHoSoThuTuc;
          setDetailHoSoThuTuc(dataDetailHoSoThuTuc);
          setEditThongTinChung(ThongTinHoSo);
          setLoading(false);
        }
      }
    };
    getDataDetailHoSoThuTuc();
  }, [loading]);

  const { ThongTinHoSo, ThanhPhanHoSo, TrinhTuThucHien, PhanQuyen, TrangThai } =
    detailHoSoThuTuc ?? null;
  return (
    <div className="px-5 lg:px-0 flex gap-4">
      <SidebarTTHCGV />
      <div
        className={clsx(
          "w-full p-4 rounded-xl shadow-lg bg-white",
          zoomView ? "absolute left-0 right-0" : "",
        )}
      >
        <div className="flex flex-col">
          <div className="flex justify-between">
            <h3 className="font-bold text-2xl uppercase mb-6 text-[#336699] underline">
              Chi tiết quy trình hồ sơ - thủ tục
            </h3>
            {zoomView ? (
              <MdOutlineZoomInMap
                size={24}
                onClick={() => {
                  setZoomView(false);
                }}
                className="text-sky-800 cursor-pointer"
              />
            ) : (
              <MdOutlineZoomOutMap
                size={24}
                onClick={() => {
                  setZoomView(true);
                }}
                className="text-sky-800 cursor-pointer"
              />
            )}
          </div>
          {loading ? (
            <div className="w-full flex justify-center">
              <Loading />
            </div>
          ) : (
            <>
              {/* Thông tin hồ sơ */}
              <div className="TTHC-GV_ThongTinHoSo mb-6">
                <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 shadow-md p-2 rounded-md mb-4">
                  <div className="flex flex-row items-center gap-2 text-sky-700">
                    {showThongTinHoSo ? (
                      <FaAngleRight
                        size={20}
                        className="cursor-pointer hover:opacity-70 mt-1 rotate-90"
                        onClick={() => {
                          handleShowView(TABS.tabThongTinHoSo);
                        }}
                      />
                    ) : (
                      <FaAngleRight
                        size={20}
                        className="cursor-pointer hover:opacity-70 mt-1"
                        onClick={() => {
                          handleShowView(TABS.tabThongTinHoSo);
                        }}
                      />
                    )}
                    <h4 className="text-xl uppercase font-medium">
                      Thông tin hồ sơ
                    </h4>
                  </div>
                  <button
                    type="button"
                    className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
                    onClick={() => {
                      handleUpdate(TABS.tabThongTinHoSo, ThongTinHoSo);
                    }}
                  >
                    <TfiReload className="mx-2 font-bold" />
                    Cập nhật thông tin
                  </button>
                </div>
                <div
                  className={clsx(
                    showThongTinHoSo ? "flex flex-col gap-4" : "hidden",
                  )}
                >
                  <div className="flex flex-col gap-1">
                    <label htmlFor="MC_TTHC_GV_TenThuTuc">
                      Tên thủ tục{" "}
                      <span className="text-red-600 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-none"
                      defaultValue={ThongTinHoSo?.MC_TTHC_GV_TenThuTuc}
                      placeholder="Nhập tên thủ tục"
                      name="MC_TTHC_GV_TenThuTuc"
                      id="MC_TTHC_GV_TenThuTuc"
                      onChange={(e) => {
                        handleChangeValue(TABS.tabThongTinHoSo, e);
                      }}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-full">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="MC_TTHC_GV_MaThuTuc">
                          Mã thủ tục{" "}
                          <span className="text-red-600 font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-none"
                          defaultValue={ThongTinHoSo?.MC_TTHC_GV_MaThuTuc}
                          placeholder="Nhập tên thủ tục"
                          name="MC_TTHC_GV_MaThuTuc"
                          id="MC_TTHC_GV_MaThuTuc"
                          onChange={(e) => {
                            handleChangeValue(TABS.tabThongTinHoSo, e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="MC_TTHC_GV_IDMucDo">
                          Mức độ{" "}
                          <span className="text-red-600 font-bold">*</span>
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={4}
                          className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-none"
                          defaultValue={
                            ThongTinHoSo?.MC_TTHC_GV_IDMucDo
                              ? ThongTinHoSo?.MC_TTHC_GV_IDMucDo
                              : ""
                          }
                          placeholder="Nhập tên thủ tục"
                          name="MC_TTHC_GV_IDMucDo"
                          id="MC_TTHC_GV_IDMucDo"
                          onChange={(e) => {
                            handleChangeValue(TABS.tabThongTinHoSo, e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="MC_TTHC_GV_TongThoiGianGiaiQuyet">
                          Tổng thời gian giải quyết{" "}
                          <span className="text-red-600 font-bold">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={1}
                            className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-none"
                            defaultValue={
                              ThongTinHoSo?.MC_TTHC_GV_TongThoiGianGiaiQuyet
                            }
                            name="MC_TTHC_GV_TongThoiGianGiaiQuyet"
                            id="MC_TTHC_GV_TongThoiGianGiaiQuyet"
                            onChange={(e) => {
                              handleChangeValue(TABS.tabThongTinHoSo, e);
                            }}
                          />
                          <span className="font-medium">Ngày</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="MC_TTHC_GV_LinhVuc">
                          Lĩnh vực{" "}
                          <span className="text-red-600 font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-none"
                          defaultValue={ThongTinHoSo?.MC_TTHC_GV_LinhVuc}
                          placeholder="Nhập tên thủ tục"
                          name="MC_TTHC_GV_LinhVuc"
                          id="MC_TTHC_GV_LinhVuc"
                          onChange={(e) => {
                            handleChangeValue(TABS.tabThongTinHoSo, e);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="MC_TTHC_GV_DoiTuongThucHien"
                      className="font-semibold"
                    >
                      Đối tượng thực hiện
                    </label>
                    <input
                      type="text"
                      className="px-3 py-1 w-full bg-slate-300 border border-slate-200 rounded-md focus:outline-none"
                      defaultValue={ThongTinHoSo?.MC_TTHC_GV_DoiTuongThucHien}
                      disabled={true}
                      name="MC_TTHC_GV_DoiTuongThucHien"
                      id="MC_TTHC_GV_DoiTuongThucHien"
                      title="Không thể chỉnh sửa đối tượng thực hiện"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-full">
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="MC_TTHC_GV_CanCuPhapLyCuaTTHC"
                          className="font-semibold"
                        >
                          Căn cứ pháp lý của Thủ tục hàn chính
                        </label>
                        <input
                          type="text"
                          className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-slate-400"
                          defaultValue={
                            ThongTinHoSo?.MC_TTHC_GV_CanCuPhapLyCuaTTHC
                          }
                          name="MC_TTHC_GV_CanCuPhapLyCuaTTHC"
                          id="MC_TTHC_GV_CanCuPhapLyCuaTTHC"
                          onChange={(e) => {
                            handleChangeValue(TABS.tabThongTinHoSo, e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="MC_TTHC_GV_DieuKienThucHien"
                          className="font-semibold"
                        >
                          Điều kiện thực hiện
                        </label>
                        <input
                          type="text"
                          className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-slate-400"
                          defaultValue={
                            ThongTinHoSo?.MC_TTHC_GV_DieuKienThucHien
                          }
                          name="MC_TTHC_GV_DieuKienThucHien"
                          id="MC_TTHC_GV_DieuKienThucHien"
                          onChange={(e) => {
                            handleChangeValue(TABS.tabThongTinHoSo, e);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-full flex items-center gap-4 border px-3 py-1 rounded-md">
                      <input
                        type="checkbox"
                        className="w-4 h-4 px-3 py-1 bg-slate-300 border border-slate-200 rounded-md focus:outline-none"
                        defaultChecked={
                          ThongTinHoSo?.MC_TTHC_GV_ThuTucLienThong
                        }
                        name="MC_TTHC_GV_ThuTucLienThong"
                        id="MC_TTHC_GV_ThuTucLienThong"
                        onChange={(e) => {
                          setEditThongTinChung({
                            ...editThongTinChung,
                            MC_TTHC_GV_ThuTucLienThong: e.target.checked,
                          });
                        }}
                      />
                      <label htmlFor="MC_TTHC_GV_ThuTucLienThong">
                        Thủ tục liên thông
                      </label>
                    </div>
                    <div className="w-full flex items-center gap-4 border px-3 py-1 rounded-md">
                      <input
                        type="checkbox"
                        className="w-4 h-4 px-3 py-1 bg-slate-300 border border-slate-200 rounded-md focus:outline-none"
                        defaultChecked={
                          ThongTinHoSo?.MC_TTHC_GV_ThuTucKhongApDungMC
                        }
                        name="MC_TTHC_GV_ThuTucKhongApDungMC"
                        id="MC_TTHC_GV_ThuTucKhongApDungMC"
                        onChange={(e) => {
                          setEditThongTinChung({
                            ...editThongTinChung,
                            MC_TTHC_GV_ThuTucKhongApDungMC: e.target.checked,
                          });
                        }}
                      />
                      <label htmlFor="MC_TTHC_GV_ThuTucKhongApDungMC">
                        Thủ tục không áp dụng Một cửa
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="MC_TTHC_GV_TepThuTuc_TenFile"
                      className="font-semibold"
                    >
                      Tệp thủ tục kèm theo{" "}
                      {ThongTinHoSo?.MC_TTHC_GV_TepThuTuc_TenFile ? (
                        <Link
                          to={ThongTinHoSo?.MC_TTHC_GV_TepThuTuc_TenFile}
                          target="_blank"
                          className="text-[#336699] cursor-pointer hover:opacity-70"
                        >
                          (Xem chi tiết)
                        </Link>
                      ) : null}
                    </label>
                    <input
                      type="text"
                      className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-slate-400"
                      defaultValue={ThongTinHoSo?.MC_TTHC_GV_TepThuTuc_TenFile}
                      name="MC_TTHC_GV_TepThuTuc_TenFile"
                      id="MC_TTHC_GV_TepThuTuc_TenFile"
                      placeholder="Tệp thủ tục hồ sơ"
                      onChange={(e) => {
                        handleChangeValue(TABS.tabThongTinHoSo, e);
                      }}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-full">
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="MC_TTHC_GV_NoiTiepNhan"
                          className="font-semibold"
                        >
                          Đơn vị tiếp nhận{" "}
                          <span className="text-red-600 font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-slate-400"
                          defaultValue={ThongTinHoSo?.MC_TTHC_GV_NoiTiepNhan}
                          name="MC_TTHC_GV_NoiTiepNhan"
                          id="MC_TTHC_GV_NoiTiepNhan"
                          onChange={(e) => {
                            handleChangeValue(TABS.tabThongTinHoSo, e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="MC_TTHC_GV_NoiTraKetQua"
                          className="font-semibold"
                        >
                          Nơi trả kết quả{" "}
                          <span className="text-red-600 font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-slate-400"
                          defaultValue={ThongTinHoSo?.MC_TTHC_GV_NoiTraKetQua}
                          name="MC_TTHC_GV_NoiTraKetQua"
                          id="MC_TTHC_GV_NoiTraKetQua"
                          onChange={(e) => {
                            handleChangeValue(TABS.tabThongTinHoSo, e);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Thành phần hồ sơ */}
              {ThanhPhanHoSo.length ? (
                <div className="TTHC-GV_ThanhPhanHoSoDeNghi mb-6">
                  {/* header */}
                  <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 shadow-md p-2 rounded-md mb-4">
                    <div className="flex flex-row items-center gap-2 text-sky-700">
                      {showTPHSDeNghi ? (
                        <FaAngleRight
                          onClick={() => {
                            handleShowView(TABS.tabTPHSDeNghi);
                          }}
                          size={20}
                          className="cursor-pointer hover:opacity-70 mt-1 rotate-90"
                        />
                      ) : (
                        <FaAngleRight
                          onClick={() => {
                            handleShowView(TABS.tabTPHSDeNghi);
                          }}
                          size={20}
                          className="cursor-pointer hover:opacity-70 mt-1"
                        />
                      )}
                      <h4 className="text-xl uppercase font-medium">
                        Thành phần hồ sơ đề nghị
                      </h4>
                    </div>
                  </div>
                  {/* content */}
                  <div
                    className={clsx(
                      showTPHSDeNghi ? "flex flex-col gap-4" : "hidden",
                    )}
                  >
                    <table className="w-full">
                      <thead className="bg-[#075985] text-white rounded-t-xl">
                        <tr>
                          <th className="border-r px-2 py-1 rounded-tl-xl">
                            STT
                          </th>
                          <th className="border-r px-2 py-1">Tên giấy tờ</th>
                          <th className="border-r px-2 py-1">
                            Mẫu hồ sơ/Hướng dẫn
                          </th>
                          <th className="border-r px-2 py-1">Bản chính</th>
                          <th className="border-r px-2 py-1">Bản sao</th>
                          <th className="border-r px-2 py-1">Bắt buộc</th>
                          <th className="px-2 py-1 rounded-tr-xl"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {ThanhPhanHoSo.map((iThanhPhan, index) => (
                          <tr
                            className="border-b"
                            key={iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_ID}
                          >
                            {editRowIndex === index ? (
                              <>
                                <td className="border-r border-l px-2 py-1 text-center">
                                  {index + 1}
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <textarea
                                    type="text"
                                    className="w-full border border-slate-300 rounded-md px-2 focus:outline-slate-300"
                                    placeholder="Nhập tên giấy tờ..."
                                    value={
                                      editValueRow.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo ||
                                      ""
                                    }
                                    name="MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo"
                                    onChange={(e) =>
                                      handleChangeValue(TABS.tabTPHSDeNghi, e)
                                    }
                                  ></textarea>
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <p className="font-semibold ">
                                    Xem mẫu hồ sơ/hướng dẫn:{" "}
                                    <Link
                                      to={
                                        iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenFile
                                      }
                                      target="_blank"
                                      className="text-[#336699] cursor-pointer hover:opacity-70"
                                    >
                                      {
                                        iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo
                                      }
                                    </Link>
                                  </p>
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <input
                                    type="checkbox"
                                    checked={
                                      editValueRow.MC_TTHC_GV_ThanhPhanHoSo_BanChinh ||
                                      false
                                    }
                                    name="MC_TTHC_GV_ThanhPhanHoSo_BanChinh"
                                    id="MC_TTHC_GV_ThanhPhanHoSo_BanChinh"
                                    onChange={(e) =>
                                      handleChangeValue(TABS.tabTPHSDeNghi, e)
                                    }
                                  />
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <input
                                    type="checkbox"
                                    defaultChecked={
                                      editValueRow.MC_TTHC_GV_ThanhPhanHoSo_BanSao
                                    }
                                    name="MC_TTHC_GV_ThanhPhanHoSo_BanSao"
                                    id="MC_TTHC_GV_ThanhPhanHoSo_BanSao"
                                    onChange={(e) =>
                                      handleChangeValue(TABS.tabTPHSDeNghi, e)
                                    }
                                  />
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <input
                                    type="checkbox"
                                    defaultChecked={
                                      editValueRow.MC_TTHC_GV_ThanhPhanHoSo_BatBuoc
                                    }
                                    name="MC_TTHC_GV_ThanhPhanHoSo_BatBuoc"
                                    id="MC_TTHC_GV_ThanhPhanHoSo_BatBuoc"
                                    onChange={(e) =>
                                      handleChangeValue(TABS.tabTPHSDeNghi, e)
                                    }
                                  />
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <div className="flex flex-col items-center justify-center gap-2">
                                    <button
                                      type="button"
                                      className="px-3 py-1 w-full bg-[#336699] text-white hover:opacity-70"
                                      onClick={() => handleUpdateRow(index)}
                                    >
                                      Lưu
                                    </button>
                                    <button
                                      type="button"
                                      className="px-3 py-1 w-full bg-[#336699] text-white hover:opacity-70"
                                      onClick={handleCancelUpdateRow}
                                    >
                                      Hủy
                                    </button>
                                    <button
                                      type="button"
                                      className="px-3 py-1 w-full bg-[#336699] text-white hover:opacity-70"
                                      onClick={() =>
                                        handleDeleteRow(
                                          TABS.tabTPHSDeNghi,
                                          iThanhPhan,
                                        )
                                      }
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="border-r border-l px-2 py-1 text-center">
                                  {index + 1}
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  {
                                    iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo
                                  }
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <p className="font-semibold ">
                                    Xem mẫu hồ sơ/hướng dẫn:{" "}
                                    <Link
                                      to={
                                        iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenFile
                                      }
                                      target="_blank"
                                      className="text-[#336699] cursor-pointer hover:opacity-70"
                                    >
                                      {
                                        iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo
                                      }
                                    </Link>
                                  </p>
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <input
                                    type="checkbox"
                                    disabled={true}
                                    defaultChecked={
                                      iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_BanChinh
                                    }
                                    name=""
                                    id=""
                                  />
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <input
                                    type="checkbox"
                                    disabled={true}
                                    defaultChecked={
                                      iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_BanSao
                                    }
                                    name=""
                                    id=""
                                  />
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <input
                                    type="checkbox"
                                    disabled={true}
                                    defaultChecked={
                                      iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_BatBuoc
                                    }
                                    name=""
                                    id=""
                                  />
                                </td>
                                <td className="border-r px-2 py-1 text-center">
                                  <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                                    <button
                                      type="button"
                                      className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                      onClick={() =>
                                        handleEditRow(
                                          index,
                                          TABS.tabTPHSDeNghi,
                                          iThanhPhan,
                                        )
                                      }
                                    >
                                      Sửa
                                    </button>
                                    <button
                                      type="button"
                                      className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                      onClick={() =>
                                        handleDeleteRow(
                                          TABS.tabTPHSDeNghi,
                                          iThanhPhan,
                                        )
                                      }
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
              {/* Trình tự thực hiện */}
              {TrinhTuThucHien.length ? (
                <div className="TTHC-GV_TrinhTuThucHien mb-4">
                  {/* header */}
                  <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 shadow-md p-2 rounded-md mb-4">
                    <div className="flex flex-row items-center gap-2 text-sky-700">
                      {showTrinhTuThucHien ? (
                        <FaAngleRight
                          onClick={() => {
                            handleShowView(TABS.tabTrinhTuThucHien);
                          }}
                          size={20}
                          className="cursor-pointer hover:opacity-70 mt-1 rotate-90"
                        />
                      ) : (
                        <FaAngleRight
                          onClick={() => {
                            handleShowView(TABS.tabTrinhTuThucHien);
                          }}
                          size={20}
                          className="cursor-pointer hover:opacity-70 mt-1"
                        />
                      )}
                      <h4 className="text-xl uppercase font-medium">
                        Trình tự thực hiện
                      </h4>
                    </div>
                  </div>
                  {/* contents */}
                  <div
                    className={clsx(
                      showTrinhTuThucHien ? "flex flex-col gap-4" : "hidden",
                    )}
                  >
                    <table className="w-full">
                      <thead className="bg-[#075985] text-white rounded-t-xl">
                        <tr>
                          <th className="border-r px-2 py-1 rounded-tl-xl w-[40px]">
                            <p className=" w-[40px]">Bước</p>
                          </th>
                          <th className="border-r px-2 py-1">
                            <p className="w-[100px]">Tên công việc</p>
                          </th>
                          <th className="border-r px-2 py-1">
                            <p className="w-[120px]">Cách thức thực hiện</p>
                          </th>
                          <th className="border-r px-2 py-1">
                            Địa chỉ nhận/trả hồ sơ
                          </th>
                          <th className="border-r px-2 py-1">
                            Đơn vị thực hiện
                          </th>
                          <th className="border-r px-2 py-1">
                            Đơn vị phối hợp
                          </th>
                          <th className="border-r px-2 py-1">
                            Thời gian thực hiện
                          </th>
                          <th className="border-r px-2 py-1">
                            <p className="w-[140px]">Kết quả</p>
                          </th>
                          <th className="px-2 py-1 rounded-tr-xl"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {TrinhTuThucHien?.map((iTrinhTu, index) => (
                          <tr
                            className="border-b"
                            key={iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_ID}
                          >
                            <td className="border-r border-l px-2 py-1 text-center">
                              {index + 1}
                            </td>
                            <td className="border-r px-2 py-1 text-left">
                              {iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_TenCongViec}
                            </td>
                            <td className="border-r px-2 py-1 text-left">
                              {
                                iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_CachThucThucHien
                              }
                            </td>
                            <td className="border-r px-2 py-1 text-left">
                              {
                                iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra
                              }
                            </td>
                            <td className="border-r px-2 py-1 text-left">
                              {
                                iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_DonViThucHien
                              }
                            </td>
                            <td className="border-r px-2 py-1 text-center">
                              {iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop}
                            </td>
                            <td className="border-r px-2 py-1 text-center">
                              {iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay}
                            </td>
                            <td className="border-r px-2 py-1 text-left">
                              {iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_KetQua}
                            </td>
                            <td className="border-r px-2 py-1 text-center">
                              <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                                <button
                                  type="button"
                                  className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                  onClick={() => handleEditRow(index)}
                                >
                                  Sửa
                                </button>
                                <button
                                  type="button"
                                  className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                  onClick={() =>
                                    handleDeleteRow(
                                      TABS.tabTrinhTuThucHien,
                                      iTrinhTu,
                                    )
                                  }
                                >
                                  Xóa
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
              {/* Phân quyền */}
              {PhanQuyen.length ? (
                <div className="TTHC-GV_PhanQuyen mb-4">
                  {/* header */}
                  <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 shadow-md p-2 rounded-md mb-4">
                    <div className="flex flex-row items-center gap-2 text-sky-700">
                      {showPhanQuyen ? (
                        <FaAngleRight
                          onClick={() => {
                            handleShowView(TABS.tabPhanQuyen);
                          }}
                          size={20}
                          className="cursor-pointer hover:opacity-70 mt-1 rotate-90"
                        />
                      ) : (
                        <FaAngleRight
                          onClick={() => {
                            handleShowView(TABS.tabPhanQuyen);
                          }}
                          size={20}
                          className="cursor-pointer hover:opacity-70 mt-1"
                        />
                      )}
                      <h4 className="text-xl uppercase font-medium">
                        Phân quyền
                      </h4>
                    </div>
                  </div>
                  {/* contents */}
                  <div
                    className={clsx(
                      showPhanQuyen ? "flex flex-col gap-4" : "hidden",
                    )}
                  >
                    <table className="w-full">
                      <thead className="bg-[#075985] text-white rounded-t-xl">
                        <tr>
                          <th className="border-r px-2 py-1 rounded-tl-xl">
                            STT
                          </th>
                          <th className="border-r px-2 py-1">Mã nhân sự</th>
                          <th className="border-r px-2 py-1">Họ và tên</th>
                          <th className="border-r px-2 py-1">Đơn vị</th>
                          <th className="border-r px-2 py-1">Tổ</th>
                          <th className="border-r px-2 py-1">Nhóm</th>
                          <th className="px-2 py-1 rounded-tr-xl"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {PhanQuyen.map((iPhanQuyen, index) => (
                          <tr
                            className="border-b"
                            key={iPhanQuyen.MC_TTHC_GV_PhanQuyen_ID}
                          >
                            <td className="border-r border-l px-2 py-1 text-center">
                              {index + 1}
                            </td>
                            <td className="border-r px-2 py-1 text-center">
                              {iPhanQuyen.MC_TTHC_GV_PhanQuyen_MaNhanSu}
                            </td>
                            <td className="border-r px-2 py-1 text-center">
                              {iPhanQuyen.MC_TTHC_GV_PhanQuyen_HoTen}
                            </td>
                            <td className="border-r px-2 py-1 text-center">
                              {iPhanQuyen.MC_TTHC_GV_PhanQuyen_DonVi}
                            </td>
                            <td className="border-r px-2 py-1 text-center">
                              {iPhanQuyen.MC_TTHC_GV_PhanQuyen_To}
                            </td>
                            <td className="border-r px-2 py-1 text-center">
                              {iPhanQuyen.MC_TTHC_GV_PhanQuyen_Nhom}
                            </td>
                            <td className="border-r px-2 py-1 text-center">
                              <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                                <button
                                  type="button"
                                  className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                  onClick={() => handleEditRow(index)}
                                >
                                  Sửa
                                </button>
                                <button
                                  type="button"
                                  className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                  onClick={() =>
                                    handleDeleteRow(
                                      TABS.tabPhanQuyen,
                                      iPhanQuyen,
                                    )
                                  }
                                >
                                  Xóa
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
              {/* Trạng thái */}
              {TrangThai.length ? (
                <div className="TTHC-GV_TrangThai mb-4">
                  {/* header */}
                  <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 shadow-md p-2 rounded-md mb-4">
                    <div className="flex flex-row items-center gap-2 text-sky-700">
                      {showTrangThai ? (
                        <FaAngleRight
                          onClick={() => {
                            handleShowView(TABS.tabTrangThai);
                          }}
                          size={20}
                          className="cursor-pointer hover:opacity-70 mt-1 rotate-90"
                        />
                      ) : (
                        <FaAngleRight
                          onClick={() => {
                            handleShowView(TABS.tabTrangThai);
                          }}
                          size={20}
                          className="cursor-pointer hover:opacity-70 mt-1"
                        />
                      )}
                      <h4 className="text-xl uppercase font-medium">
                        Trạng thái
                      </h4>
                    </div>
                  </div>
                  {/* contents */}
                  <div
                    className={clsx(
                      showTrangThai ? "flex flex-col gap-4" : "hidden",
                    )}
                  >
                    <table className="w-full">
                      <thead className="bg-[#075985] text-white rounded-t-xl">
                        <tr>
                          <th className="border-r px-2 py-1 rounded-tl-xl">
                            STT
                          </th>
                          <th className="border-r px-2 py-1">Tên trạng thái</th>
                          <th className="border-r px-2 py-1">Mô tả</th>
                          <th className="px-2 py-1 rounded-tr-xl"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {TrangThai.map((iTrangThai, index) => (
                          <tr
                            className="border-b"
                            key={iTrangThai.MC_TTHC_GV_TrangThai_ID}
                          >
                            <td className="border-r border-l px-2 py-1 text-center">
                              {index + 1}
                            </td>
                            <td className="border-r px-2 py-1 text-center">
                              {iTrangThai.MC_TTHC_GV_TrangThai_TenTrangThai}
                            </td>
                            <td className="border-r px-2 py-1 text-center">
                              {iTrangThai.MC_TTHC_GV_TrangThai_MoTa}
                            </td>
                            <td className="border-r px-2 py-1 text-center">
                              <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                                <button
                                  type="button"
                                  className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                  onClick={() => handleEditRow(index)}
                                >
                                  Sửa
                                </button>
                                <button
                                  type="button"
                                  className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                                  onClick={() =>
                                    handleDeleteRow(
                                      TABS.tabTrangThai,
                                      iTrangThai,
                                    )
                                  }
                                >
                                  Xóa
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ThongTinChiTietHoSo;
