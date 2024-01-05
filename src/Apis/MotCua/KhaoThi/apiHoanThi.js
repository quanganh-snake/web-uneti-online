import http from '../../../Configs/http'

export const postHoanThi = (data = {}) => {
  return http.post('SP_MC_KT_HoanThi_TiepNhan/Add_Para', data)
}
