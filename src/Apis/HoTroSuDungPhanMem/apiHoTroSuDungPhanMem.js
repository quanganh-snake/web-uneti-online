export const getDataHoTroSuDungPhanMem = (
  axiosJWT,
  accessToken,
  TuKhoaTimKiem = ''
) => {
  // console.log(`>>> Check log axios prototype: `,[axiosJWT]);
  return axiosJWT.get('/SP_DT_CVNB_TBGD_TLTiepNhanRoutes/Load_TimKiem', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      TuKhoaTimKiem,
    },
  })
}
