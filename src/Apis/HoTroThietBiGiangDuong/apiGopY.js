import http from '@/Configs/http'

export const postGopY = (data = {}) => {
  return http.post('SP_DT_QLP_Phong_TiepNhan/TBGD_GY_Add_Para', data)
}
