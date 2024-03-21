import { useEffect, useState } from 'react'
import HomeTTHCGVView from './HomeTTHCGVView'
import { getThuTucHanhChinhByKeyWords } from '@/Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'

function HomeTTHCGV() {
  const home = {
    path: '/tthc-giang-vien',
    title: 'TTHC Giảng Viên',
  }

  const [listHoSoThuTuc, setListHoSoThuTuc] = useState([])
  const [phongBan, setPhongBan] = useState('')
  const [keywords, setKeywords] = useState('')
  const [dieuKienLoc, setDieuKienLoc] = useState('')
  useEffect(() => {
    const getListHoSoThuTuc = async () => {
      try {
        const resultListHoSoThuTuc = await getThuTucHanhChinhByKeyWords(
          phongBan,
          dieuKienLoc,
          keywords,
        )
        if (resultListHoSoThuTuc.status === 200) {
          const dataListHoSoThuTuc = await resultListHoSoThuTuc?.data?.body
          const dataListHoSoThuTucHienThi = await dataListHoSoThuTuc.filter(
            (tt) => tt.MC_TTHC_GV_HienThi === true,
          )
          setListHoSoThuTuc(dataListHoSoThuTucHienThi)
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
