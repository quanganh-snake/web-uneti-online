import http from '../../Configs/http'

// POST
export const postTrinhTuThucHienTTHCGV = (data = []) => {
  return http.post('SP_MC_TTHC_GV_TrinhTuThucHienTiepNhan/Add_Para', data)
}

// PUT
export const putTrinhTuThucHienTTHCGV = (data = {}) => {
  return http.put('SP_MC_TTHC_GV_TrinhTuThucHienTiepNhan/Edit_Para', data)
}

// DELETE
export const delTrinhTuThucHienTTHCGV = (data = {}) => {
  return http.delete('SP_MC_TTHC_GV_TrinhTuThucHienTiepNhan/Del_Para', {
    data: data,
  })
}
