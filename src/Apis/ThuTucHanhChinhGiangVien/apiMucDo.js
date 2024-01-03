/**
 * API - TTHCGV - Mức độ thủ tục
 * @returns
 */

import http from "../../Configs/http";

// GET DATA
// GET: Danh sách Mức độ thủ tục
export const getAllMucDoThuTuc = () => {
  return http.get("SP_MC_TTHC_GV_MucDoTiepNhan/Load");
};

// GET: Mức độ theo ID
export const getMucDoThuThucByID = (id = "") => {
  return http.get("SP_MC_TTHC_GV_MucDoTiepNhan/Load_R_Para_File", {
    params: {
      MC_TTHC_GV_MucDo_ID: id,
    },
  });
};
