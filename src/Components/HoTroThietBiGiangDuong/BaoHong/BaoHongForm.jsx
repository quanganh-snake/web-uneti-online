import LichHoc from '@/Components/HoTroThietBiGiangDuong/BaoHong/LichHoc'
import DanhSachSuCo from '@/Components/HoTroThietBiGiangDuong/BaoHong/DanhSachSuCo'

export const BaoHongForm = (props) => {
  const {
    selectedLichHoc,
    listLichHoc,
    handleSelectLichHoc,
    handleSelectSuCo,
    listSuCo,
    selectedSuCo,
  } = props
  return (
    <>
      <LichHoc
        selectedLichHoc={selectedLichHoc}
        listLichHoc={listLichHoc}
        handleSelectLichHoc={handleSelectLichHoc}
      />
      <DanhSachSuCo
        listSuCo={listSuCo}
        selectedSuCo={selectedSuCo}
        handleSelectSuCo={handleSelectSuCo}
      />
    </>
  )
}
