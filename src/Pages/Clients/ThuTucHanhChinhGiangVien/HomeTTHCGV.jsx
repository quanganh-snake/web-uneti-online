import React, { useEffect, useState } from 'react'
import HomeTTHCGVView from './HomeTTHCGVView'
import { getThuTucHanhChinhByKeyWords } from '../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'

function HomeTTHCGV() {
  const home = {
    path: '/tthcgiangvien',
    title: 'TTHC Giảng Viên',
  }

  const breadcrumbs = []

  const [listHoSoThuTuc, setListHoSoThuTuc] = useState([])
  const [keywords, setKeywords] = useState('')
  const [dieuKienLoc, setDieuKienLoc] = useState('')
  useEffect(() => {
    const getListHoSoThuTuc = async () => {
      try {
        const resultListHoSoThuTuc = await getThuTucHanhChinhByKeyWords(
          dieuKienLoc,
          keywords,
        )
        if (resultListHoSoThuTuc.status === 200) {
          const dataListHoSoThuTuc = await resultListHoSoThuTuc?.data?.body
          setListHoSoThuTuc(dataListHoSoThuTuc)
        }
      } catch (error) {
        // console.log(error);
      }
    }
    getListHoSoThuTuc()
  }, [keywords, dieuKienLoc])

  return (
    <HomeTTHCGVView
      home={home}
      dataListHoSoThuTuc={listHoSoThuTuc}
      setKeywords={setKeywords}
      setDieuKienLoc={setDieuKienLoc}
    />
  )
}

export default HomeTTHCGV
