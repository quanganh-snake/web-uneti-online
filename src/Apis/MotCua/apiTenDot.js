import http from '../../Configs/http'

export const getTenDot = () => {
  return http.get('/SP_EDU/Load_TenDot')
}
