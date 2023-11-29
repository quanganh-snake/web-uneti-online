export const getDataHoTroSuDungPhanMem = (
  axiosJWT,
  accessToken,
  tuKhoaTimKiem
) => {
  // console.log(`>>> Check log axios prototype: `,[axiosJWT]);
  return axiosJWT.get('/SP_DT_CVNB_TBGD_TLTiepNhanRoutes/Load_TimKiem', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      TuKhoaTimKiem: tuKhoaTimKiem,
    },
  })
}

export const getDataMenu = (axiosJWT, accessToken) => {
  return axiosJWT.get('/SP_DT_CVNB_TBGD_TLTiepNhanRoutes/LoadMenu_TLHD', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
