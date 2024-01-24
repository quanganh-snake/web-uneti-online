import { useNamespace } from '@/Services/Hooks'

export default function LichBieu(props) {
  const {
    // NamHoc,
    // TenDot,
    // MaLopHocPhan,
    TenMonHoc,
    // TenLopHoc,
    // TuTiet,
    // DenTiet,
    // TenPhong,
    // TenGiangVien,
    // CaHoc,
    // NgayBatDau,
    // NgayKetThuc,
    // Thu,
  } = props

  const ns = useNamespace('lich-bieu')

  return (
    <>
      <div className={ns.b()}>{TenMonHoc}</div>
    </>
  )
}
