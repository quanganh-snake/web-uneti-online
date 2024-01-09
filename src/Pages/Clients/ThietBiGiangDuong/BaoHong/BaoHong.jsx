import {
  getAllLichDayBaoHong,
  getAllSuCo,
  getTTPhongBaoHong,
} from '@/Apis/HoTroThietBiGiangDuong/apiBaoHong'
import { BaoHongView } from '@/Components/HoTroThietBiGiangDuong/BaoHong/BaoHongView'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash-unified'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function BaoHong() {
  const { id } = useParams()

  const [thongTinPhong, setThongTinPhong] = useState({})
  const [listLichHoc, setListLichHoc] = useState([])
  const [selectedLichHoc, setSelectedLichHoc] = useState({})
  const [listSuCo, setListSuCo] = useState([])
  const [selectedSuCo, setSelectedSuCo] = useState([])

  const dataCBGV = DataCanBoGV()

  useEffect(() => {
    getTTPhongBaoHong(id).then((res) => {
      setThongTinPhong(res?.data?.body[0])
    })

    return () => {
      setThongTinPhong({})
    }
  }, [])

  useEffect(() => {
    if (!isEmpty(thongTinPhong)) {
      getAllLichDayBaoHong(
        dayjs(new Date()).format('YYYY-MM-DD'),
        dayjs(new Date()).format('YYYY-MM-DD'),
        thongTinPhong.DT_QLP_Phong_TenPhong,
        dataCBGV.MaNhanSu.toString(),
      ).then((res) => {
        setListLichHoc(res?.data?.body)
      })
      getAllSuCo(id, thongTinPhong.DT_QLP_Phong_TenPhong).then((res) => {
        setListSuCo(res?.data?.body)
      })
    }

    return () => {
      setSelectedLichHoc({})
      setListSuCo([])
    }
  }, [thongTinPhong])

  const handleSelectLichHoc = (e, lh) => {
    e.preventDefault()
    setSelectedLichHoc(lh)
  }

  const handleSelectSuCo = (e, sc) => {
    if (e.target.checked) {
      // Thêm vào mảng yeucau
      setSelectedSuCo([...selectedSuCo, sc])
    } else {
      // Xóa khỏi mảng yeucau
      const updatedSuCo = selectedSuCo.filter((suCoItem) => suCoItem !== sc)
      setSelectedSuCo(updatedSuCo)
    }
  }

  const handleSubmitData = () => {
    console.log('submit')
  }

  return (
    <BaoHongView
      handleSubmitData={handleSubmitData}
      listLichHoc={listLichHoc}
      selectedLichHoc={selectedLichHoc}
      handleSelectLichHoc={handleSelectLichHoc}
      listSuCo={listSuCo}
      selectedSuCo={selectedSuCo}
      handleSelectSuCo={handleSelectSuCo}
    />
  )
}
