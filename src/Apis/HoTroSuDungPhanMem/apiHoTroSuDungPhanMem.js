import http from '@/Configs/http'

export const getDataHoTroSuDungPhanMem = (tuKhoaTimKiem) =>
    http.get('/SP_DT_CVNB_TBGD_TLTiepNhanRoutes/Load_TimKiem', {
        params: {
            TuKhoaTimKiem: tuKhoaTimKiem,
        },
    })

export const getDataMenu = () =>
    http.get('/SP_DT_CVNB_TBGD_TLTiepNhanRoutes/LoadMenu_TLHD')
