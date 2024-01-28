import http from '@/Configs/http'

export const getDanhSachThongKeYeuCau = async () => {
  try {
    const response = await http.get(
      'SP_TK_PT_TiepNhan_DV_TiepNhanRoutes/Load_ThongKe',
    )
    const data = await response.data
    const listThongKe = data?.body
    return listThongKe
  } catch (error) {
    console.log(error)
  }
}
