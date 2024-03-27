import { useEffect, useState } from 'react'
import DuKienKetQuaHocTapView from './DuKienKetQuaHocTapView'
import {
  getALLDiemTrungBinhDuKienKetQuaHocTap,
  getAllMonHocDuKienKetQuaHocTap,
} from '@/Apis/TraCuu/apiDuKienKetQuaHocTap'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'

const DuKienKetQuaHocTap = () => {
  const home = {
    path: '/trang-chu',
    title: 'Trang chủ',
  }

  const breadcrumbs = [
    {
      path: '/tra-cuu',
      title: 'Tra cứu',
    },
    {
      path: '/tra-cuu/du-kien-ket-qua-hoc-tap',
      title: 'Dự kiến kết quả học tập',
    },
  ]

  const [listMonHoc, setListMonHoc] = useState([])
  const [listHocKy, setListHocKy] = useState([])
  const [listDiemDuKien, setListDiemDuKien] = useState([])
  const [diemTichLuyThucTe, setDiemTichLuyThucTe] = useState({})
  const [diemTichLuyDuKien, setDiemTichLuyDuKien] = useState({})

  const dataSV = DataSinhVien()

  useEffect(() => {
    getAllMonHocDuKienKetQuaHocTap(dataSV.MaSinhVien).then((res) => {
      setListMonHoc(res?.data?.body)
    })

    getALLDiemTrungBinhDuKienKetQuaHocTap(dataSV.MaSinhVien).then((res) => {
      setDiemTichLuyThucTe(res?.data?.body.reverse()[0] || {})
    })

    return () => {
      setListMonHoc([])
      setDiemTichLuyThucTe({})
    }
  }, [])

  useEffect(() => {
    setListHocKy(
      listMonHoc
        .map((e) => e.TC_SV_KetQuaHocTap_HocKy)
        .filter((v, i, s) => s.indexOf(v) === i),
    )

    setListDiemDuKien([
      ...listMonHoc.map((e, i) => ({
        STT: i,
        hocKy: e.TC_SV_KetQuaHocTap_HocKy,
        tenMonHoc: e.TC_SV_KetQuaHocTap_TenMonHoc,
        maHocPhan: e.TC_SV_KetQuaHocTap_MaHocPhan,
        soTinChi: e.TC_SV_KetQuaHocTap_SoTinChi,
        tinhDiemTBC: e.TC_SV_KetQuaHocTap_KhongTinhDiemTBC == 0,
        diemTongKetHe10:
          e.TC_SV_KetQuaHocTap_DiemTongKet != null
            ? e.TC_SV_KetQuaHocTap_DiemTongKet
            : '',
        diemDuKienHe10:
          e.TC_SV_KetQuaHocTap_DiemTongKet != null
            ? e.TC_SV_KetQuaHocTap_DiemTongKet
            : '',
        diemTongKetHe4:
          e.TC_SV_KetQuaHocTap_DiemTinChi != null
            ? e.TC_SV_KetQuaHocTap_DiemTinChi
            : '',
        diemDuKienHe4:
          e.TC_SV_KetQuaHocTap_DiemTinChi != null
            ? e.TC_SV_KetQuaHocTap_DiemTinChi
            : '',
      })),
    ])
    return () => {
      setListHocKy([])
      setListDiemDuKien([])
    }
  }, [listMonHoc])

  const handleChangeScore = (maHocPhan, newDiemDuKienHe10) => {
    setListDiemDuKien((_listDiemDuKien) =>
      _listDiemDuKien.map((e) => {
        if (e.maHocPhan != maHocPhan) return e

        e.diemDuKienHe10 = newDiemDuKienHe10
        return e
      }),
    )
  }

  const checkScoreValue = (maHocPhan, newDiemDuKienHe10) => {
    if (isNaN(+newDiemDuKienHe10)) {
      setListDiemDuKien((_listDiemDuKien) =>
        _listDiemDuKien.map((e) => {
          if (e.maHocPhan != maHocPhan) return e

          e.diemDuKienHe10 = ''
          return e
        }),
      )
    }

    if (+newDiemDuKienHe10 < 0 || +newDiemDuKienHe10 > 10) {
      setListDiemDuKien((_listDiemDuKien) =>
        _listDiemDuKien.map((e) => {
          if (e.maHocPhan != maHocPhan) return e

          e.diemDuKienHe10 =
            +newDiemDuKienHe10 < 0 ? '0' : +newDiemDuKienHe10 > 10 ? '10' : ''
          return e
        }),
      )
    }
  }

  const handleTinhDiemDuDoan = () => {
    let SumDiemTongKetHe10NhanSoTinChi = 0
    let SumDiemTongKetHe4NhanSoTinChi = 0
    let SumSoTinChi = 0

    for (let i = 0; i < listDiemDuKien.length; i++) {
      if (!listDiemDuKien[i].tinhDiemTBC) continue
      if (
        listDiemDuKien[i].diemTongKetHe10 == '' &&
        listDiemDuKien[i].diemDuKienHe10 == ''
      ) {
        continue
      }

      if (
        listDiemDuKien[i].diemDuKienHe10 != '' &&
        listDiemDuKien[i].diemDuKienHe4 != ''
      ) {
        SumDiemTongKetHe10NhanSoTinChi +=
          +listDiemDuKien[i].diemDuKienHe10 * +listDiemDuKien[i].soTinChi
        SumDiemTongKetHe4NhanSoTinChi +=
          +listDiemDuKien[i].diemDuKienHe4 * +listDiemDuKien[i].soTinChi
      } else {
        SumDiemTongKetHe10NhanSoTinChi +=
          +listDiemDuKien[i].diemTongKetHe10 * +listDiemDuKien[i].soTinChi
        SumDiemTongKetHe4NhanSoTinChi +=
          +listDiemDuKien[i].diemTongKetHe4 * +listDiemDuKien[i].soTinChi
      }

      SumSoTinChi += +listDiemDuKien[i].soTinChi
    }

    const DiemTichLuyDuKienHe10 = (
      SumDiemTongKetHe10NhanSoTinChi / SumSoTinChi
    ).toFixed(2)

    const DiemTichLuyDuKienHe4 = (
      SumDiemTongKetHe4NhanSoTinChi / SumSoTinChi
    ).toFixed(2)

    console.log({
      diemTichLuyHe10: DiemTichLuyDuKienHe10,
      diemTichLuyHe4: DiemTichLuyDuKienHe4,
      tongSoTinChiTichLuy: SumSoTinChi,
      xepLoai: 'Xuất sắc',
    })

    setDiemTichLuyDuKien({
      diemTichLuyHe10: DiemTichLuyDuKienHe10,
      diemTichLuyHe4: DiemTichLuyDuKienHe4,
      tongSoTinChiTichLuy: SumSoTinChi,
      xepLoai: 'Xuất sắc',
    })
  }

  const handleLamMoi = () => {
    setListDiemDuKien([
      ...listMonHoc.map((e, i) => ({
        STT: i,
        hocKy: e.TC_SV_KetQuaHocTap_HocKy,
        tenMonHoc: e.TC_SV_KetQuaHocTap_TenMonHoc,
        maHocPhan: e.TC_SV_KetQuaHocTap_MaHocPhan,
        soTinChi: e.TC_SV_KetQuaHocTap_SoTinChi,
        tinhDiemTBC: e.TC_SV_KetQuaHocTap_KhongTinhDiemTBC == 0,
        diemTongKetHe10:
          e.TC_SV_KetQuaHocTap_DiemTongKet != null
            ? e.TC_SV_KetQuaHocTap_DiemTongKet
            : '',
        diemDuKienHe10:
          e.TC_SV_KetQuaHocTap_DiemTongKet != null
            ? e.TC_SV_KetQuaHocTap_DiemTongKet
            : '',
        diemTongKetHe4:
          e.TC_SV_KetQuaHocTap_DiemTinChi != null
            ? e.TC_SV_KetQuaHocTap_DiemTinChi
            : '',
        diemDuKienHe4:
          e.TC_SV_KetQuaHocTap_DiemTinChi != null
            ? e.TC_SV_KetQuaHocTap_DiemTinChi
            : '',
      })),
    ])

    setDiemTichLuyDuKien({})
  }

  const handleConvertHe10ToHe4 = (maHocPhan) => {
    setListDiemDuKien((_listDiemDuKien) =>
      _listDiemDuKien.map((e) => {
        if (e.maHocPhan != maHocPhan) return e

        if (e.diemDuKienHe10 == '') e.diemDuKienHe4 = ''
        else {
          if (+e.diemDuKienHe10 >= 8.5) {
            e.diemDuKienHe4 = '4'
          } else if (+e.diemDuKienHe10 >= 7.8) {
            e.diemDuKienHe4 = '3.5'
          } else if (+e.diemDuKienHe10 >= 7) {
            e.diemDuKienHe4 = '3'
          } else if (+e.diemDuKienHe10 >= 6.3) {
            e.diemDuKienHe4 = '2.5'
          } else if (+e.diemDuKienHe10 >= 5.5) {
            e.diemDuKienHe4 = '2'
          } else if (+e.diemDuKienHe10 >= 4.8) {
            e.diemDuKienHe4 = '1.5'
          } else if (+e.diemDuKienHe10 >= 4) {
            e.diemDuKienHe4 = '1'
          } else if (+e.diemDuKienHe10 >= 3) {
            e.diemDuKienHe4 = '0.5'
          } else {
            e.diemDuKienHe4 = '0'
          }
        }
        return e
      }),
    )
  }

  console.log(listDiemDuKien)

  return (
    <DuKienKetQuaHocTapView
      home={home}
      breadcrumbs={breadcrumbs}
      listDiemDuKien={listDiemDuKien}
      listHocKy={listHocKy}
      handleChangeScore={handleChangeScore}
      checkScoreValue={checkScoreValue}
      handleTinhDiemDuDoan={handleTinhDiemDuDoan}
      diemTichLuyThucTe={diemTichLuyThucTe}
      diemTichLuyDuKien={diemTichLuyDuKien}
      handleLamMoi={handleLamMoi}
      handleConvertHe10ToHe4={handleConvertHe10ToHe4}
    />
  )
}

export default DuKienKetQuaHocTap
