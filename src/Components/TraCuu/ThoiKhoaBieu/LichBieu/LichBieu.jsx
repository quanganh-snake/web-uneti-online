import { useNamespace } from '@/Services/Hooks'

import './LichBieu.scss'
import { transformCls } from '@/Services/Utils/reactUtils'
import { dayjs } from '@/Services/Utils/dayjs'

export default function LichBieu(props) {
  const {
    NamHoc = null,
    TenDot = null,
    MaLopHocPhan = null,
    TenMonHoc = null,
    Thu = null,
    TuTiet = null,
    DenTiet = null,
    TenPhong = null,

    TenLopHoc = null,
    TenGiangVien = null,
    CaHoc = null,
    NgayBatDau = null,
    NgayKetThuc = null,

    MaLopXepLichThi = null,
    ThoiGianThi = null,
    LoaiThi = null,
    NgayThi = null,
    TenHinhThucThi = null,
    CaThi = null,
    Nhom = null,
  } = props

  const ns = useNamespace('lich-bieu')

  if (!MaLopHocPhan) return null

  NamHoc
  TenDot
  Thu
  NgayKetThuc
  LoaiThi

  return (
    <>
      <div
        className={transformCls([
          ns.b(),
          ns.is('ca-thi', CaThi),
          ns.is('ca-hoc', CaHoc),
        ])}
      >
        <div className={ns.e('name')}>
          <p>{TenMonHoc}</p>
          <p>{dayjs(NgayBatDau || NgayThi).format('DD/MM/YYYY')}</p>
        </div>

        <div className={ns.e('content')}>
          <div className={ns.e('class')}>
            <p>
              {TenLopHoc ?? MaLopXepLichThi ?? null} - {MaLopHocPhan}
            </p>
          </div>
          <div className={ns.e('room')}>
            <p>Phòng: {TenPhong}</p>
          </div>
          <div className={ns.e('teacher')}>
            {TenGiangVien ? <p>GV: {TenGiangVien}</p> : null}
            {TenHinhThucThi ? <p>Hình thức: {TenHinhThucThi}</p> : null}
          </div>
        </div>

        <div className={ns.e('time')}>
          <div>
            Tiết: {TuTiet} - {DenTiet}
            {ThoiGianThi ? (
              <span className="text-xs"> ({ThoiGianThi} phút)</span>
            ) : null}
          </div>
          {Nhom ? <div>N{Nhom}</div> : null}
        </div>
      </div>
    </>
  )
}
