import http from '@/Configs/http'
import { NguonTiepNhan_WEB } from '@/Services/Static/dataStatic'

// POST
export const postYeuCauBaoHongTaiSan = async (
  data = {
    DT_QLTS_TS_HoTroThietBi_IDTaiSan: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_IDPhong: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail: 'null',
    DT_QLTS_TS_HoTroThietBi_XacNhan_HoanThanh: '',
    DT_QLTS_TS_HoTroThietBi_XacNhan_NgayXacNhan: '',
    DT_QLTS_TS_HoTroThietBi_NguonTiepNhan: NguonTiepNhan_WEB,
  },
) => {
  try {
    const res = await http.post(
      'SP_DT_QLP_Phong_TiepNhan/HoTroThietBi_Add_Para',
      data,
    )
    if (res.status === 200) {
      return true
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

// DELETE
export const deleteYeuCauBaoHongTaiSan = async (DT_QLTS_TS_HoTroThietBi_ID) => {
  return http.delete('SP_DT_QLP_Phong_TiepNhan/HoTroThietBi_Del_Para', {
    data: {
      DT_QLTS_TS_HoTroThietBi_ID: DT_QLTS_TS_HoTroThietBi_ID.toString(),
    },
  })
}

// PUT
// 1. Cập nhật ngày xử lý báo hỏng
export const putNgayXuLyYeuCauBaoHong = async (
  data = {
    DT_QLTS_TS_HoTroThietBi_ID,
    DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu,
    DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy,
    DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail,
  },
) => {
  return await http.put(
    'SP_DT_QLP_Phong_TiepNhan/HoTroThietBi_XuLy_Edit_Para',
    data,
  )
}

// GET
export const getDanhSachBaoHong = async (MaNhanSu = '') => {
  try {
    const response = await http.get(
      `SP_DT_QLP_Phong_TiepNhan/HoTroThietBi_Load_BaoHong`,
      {
        params: {
          MaNhanSu,
        },
      },
    )
    const data = await response.data
    const listData = await data.body
    return listData
  } catch (error) {
    console.log(error)
  }
}

export const getDanhSachToaNha = async (
  params = {
    DT_QLP_Phong_CoSo: '',
    DT_QLP_Phong_DiaDiem: '',
  },
) => {
  try {
    const response = await http.get(
      'SP_DT_QLTS_TiepNhan/Load_Muti_Para_ToaNha',
      {
        params,
      },
    )
    const data = await response.data
    const listToaNha = await data.body
    return listToaNha
  } catch (error) {
    console.log(error)
  }
}

export const getDanhSachTang = async (
  params = {
    DT_QLP_Phong_CoSo: '',
    DT_QLP_Phong_DiaDiem: '',
    DT_QLP_Phong_ToaNha: '',
  },
) => {
  try {
    const response = await http.get('SP_DT_QLTS_TiepNhan/Load_Muti_Para_Tang', {
      params,
    })
    const data = await response.data
    const listTang = await data?.body
    return listTang
  } catch (error) {
    console.log(error)
  }
}

export const getDanhSachPhong = async (
  params = {
    DT_QLP_Phong_CoSo: '',
    DT_QLP_Phong_DiaDiem: '',
    DT_QLP_Phong_ToaNha: '',
    DT_QLP_Phong_Tang: '',
  },
) => {
  try {
    const response = await http.get(
      'SP_DT_QLTS_TiepNhan/Load_Muti_Para_TenPhong',
      {
        params,
      },
    )
    const data = await response.data
    const listPhong = await data?.body
    return listPhong
  } catch (error) {
    console.log(error)
  }
}

export const getDanhSachTaiSan = async (DT_QLTS_TS_PhongHienTai = '') => {
  try {
    const response = await http.get('SP_DT_QLTS_TiepNhan/TS_Load_ByPhong_Web', {
      params: {
        DT_QLTS_TS_PhongHienTai,
      },
    })
    const data = await response.data
    const listTaiSan = await data?.body
    return listTaiSan
  } catch (error) {
    console.log(error)
  }
}

export const getDanhSachSuCoByHoTroThietBi = async (
  params = {
    DT_CVNB_TBGD_TL_Nhom1: 'HoTroThietBi',
    DT_CVNB_TBGD_TL_Nhom2: 'DanhSachSuCo',
  },
) => {
  try {
    const response = await http.get('SP_DT_QLP_Phong_TiepNhan/DanhSachSuCo', {
      params,
    })
    const data = await response.data
    const listSuCo = await data?.body
    return listSuCo
  } catch (error) {
    console.log(error.message)
  }
}
