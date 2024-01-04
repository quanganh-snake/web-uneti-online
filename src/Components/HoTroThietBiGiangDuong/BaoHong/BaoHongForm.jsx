import LichHoc from '@/Components/HoTroThietBiGiangDuong/BaoHong/LichHoc'
import DanhSachSuCo from '@/Components/HoTroThietBiGiangDuong/BaoHong/DanhSachSuCo'

export const BaoHongForm = (props) => {
  const { handleSelectLichHoc, handleSelectSuCo } = props
  return (
    <>
      <LichHoc handleSelectLichHoc={handleSelectLichHoc} />
      <DanhSachSuCo handleSelectSuCo={handleSelectSuCo} />
    </>
  )
}
