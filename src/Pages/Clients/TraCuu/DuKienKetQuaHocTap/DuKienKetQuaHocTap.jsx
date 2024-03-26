import { useEffect, useState } from 'react'
import DuKienKetQuaHocTapView from './DuKienKetQuaHocTapView'
import {
  getALLDiemTrungBinhDuKienKetQuaHocTap,
  getAllMonHocDuKienKetQuaHocTap,
} from '@/Apis/TraCuu/apiDuKienKetQuaHocTap'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'

const DuKienKetQuaHocTap = () => {
  const home = {
    path: '/uneti',
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
      ...listMonHoc.map((e) => ({
        hocKy: e.TC_SV_KetQuaHocTap_HocKy,
        tenMonHoc: e.TC_SV_KetQuaHocTap_TenMonHoc,
        maHocPhan: e.TC_SV_KetQuaHocTap_MaHocPhan,
        soTinChi: e.TC_SV_KetQuaHocTap_SoTinChi,
        tinhDiemTBC: e.TC_SV_KetQuaHocTap_KhongTinhDiemTBC == 0,
        diemTongKet:
          e.TC_SV_KetQuaHocTap_DiemTongKet != null
            ? e.TC_SV_KetQuaHocTap_DiemTongKet
            : '',
        diemDuKien:
          e.TC_SV_KetQuaHocTap_DiemTongKet != null
            ? e.TC_SV_KetQuaHocTap_DiemTongKet
            : '',
      })),
    ])
    return () => {
      setListHocKy([])
      setListDiemDuKien([])
    }
  }, [listMonHoc])

  const handleChangeScore = (maHocPhan, newDiemDuKien) => {
    setListDiemDuKien((_listDiemDuKien) =>
      _listDiemDuKien.map((e) => {
        if (e.maHocPhan != maHocPhan) return e

        e.diemDuKien = newDiemDuKien
        return e
      }),
    )
  }

  const checkScoreValue = (maHocPhan, newDiemDuKien) => {
    if (isNaN(+newDiemDuKien)) {
      setListDiemDuKien((_listDiemDuKien) =>
        _listDiemDuKien.map((e) => {
          if (e.maHocPhan != maHocPhan) return e

          e.diemDuKien = ''
          return e
        }),
      )
    }

    if (+newDiemDuKien < 0 || +newDiemDuKien > 10) {
      setListDiemDuKien((_listDiemDuKien) =>
        _listDiemDuKien.map((e) => {
          if (e.maHocPhan != maHocPhan) return e

          e.diemDuKien =
            +newDiemDuKien < 0 ? '0' : +newDiemDuKien > 10 ? '10' : ''
          return e
        }),
      )
    }
  }

  const handleTinhDiemDuDoan = () => {
    let SumDiemTongKetNhanSoTinChi = 0
    let SumSoTinChi = 0

    for (let i = 0; i < listDiemDuKien.length; i++) {
      if (!listDiemDuKien[i].tinhDiemTBC) continue
      if (
        listDiemDuKien[i].diemTongKet == '' &&
        listDiemDuKien[i].diemDuKien == ''
      ) {
        continue
      }

      if (listDiemDuKien[i].diemDuKien != '') {
        SumDiemTongKetNhanSoTinChi +=
          +listDiemDuKien[i].diemDuKien * +listDiemDuKien[i].soTinChi
      } else {
        SumDiemTongKetNhanSoTinChi +=
          +listDiemDuKien[i].diemTongKet * +listDiemDuKien[i].soTinChi
      }

      SumSoTinChi += +listDiemDuKien[i].soTinChi
    }

    const DiemTichLuyDuKien = (
      SumDiemTongKetNhanSoTinChi / SumSoTinChi
    ).toFixed(2)

    const DiemHe4 = ((DiemTichLuyDuKien * 4) / 10).toFixed(2)

    setDiemTichLuyDuKien({
      diemTichLuyHe10: DiemTichLuyDuKien,
      diemTichLuyHe4: DiemHe4,
      tongSoTinChiTichLuy: SumSoTinChi,
      xepLoai:
        DiemHe4 >= 3.6
          ? 'Xuất sắc'
          : DiemHe4 >= 3.2
            ? 'Giỏi'
            : DiemHe4 >= 2.5
              ? 'Khá'
              : DiemHe4 >= 2.0
                ? 'Trung bình'
                : 'Yếu',
    })
  }

  const handleLamMoi = () => {
    setListDiemDuKien([
      ...listMonHoc.map((e) => ({
        hocKy: e.TC_SV_KetQuaHocTap_HocKy,
        tenMonHoc: e.TC_SV_KetQuaHocTap_TenMonHoc,
        maHocPhan: e.TC_SV_KetQuaHocTap_MaHocPhan,
        soTinChi: e.TC_SV_KetQuaHocTap_SoTinChi,
        tinhDiemTBC: e.TC_SV_KetQuaHocTap_KhongTinhDiemTBC == 0,
        diemTongKet:
          e.TC_SV_KetQuaHocTap_DiemTongKet != null
            ? e.TC_SV_KetQuaHocTap_DiemTongKet
            : '',
        diemDuKien:
          e.TC_SV_KetQuaHocTap_DiemTongKet != null
            ? e.TC_SV_KetQuaHocTap_DiemTongKet
            : '',
      })),
    ])

    setDiemTichLuyDuKien({})
  }

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
    />
  )
}

export default DuKienKetQuaHocTap
