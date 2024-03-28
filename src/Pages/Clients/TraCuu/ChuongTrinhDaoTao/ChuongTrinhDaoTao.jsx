import { useState } from 'react'
import { useEffect } from 'react'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { getAllChuongTrinhDaoTao } from '@/Apis/TraCuu/apiChuongTrinhDaoTao'
import ChuongTrinhDaoTaoView from './ChuongTrinhDaoTaoView'
import { transformKeys } from '@/Services/Utils/objectUtils'
import { keys } from 'lodash-unified'

const CTDT_PREFIX = 'TC_SV_ChuongTrinhKhung_'

const ChuongTrinhDaoTao = () => {
  const dataSV = DataSinhVien()
  const [listHocKy, setListHocKy] = useState([])
  const [listChuongTrinhDaoTao, setListChuongTrinhDaoTao] = useState()
  const [listChuongTrinhDaoTaoGoc, setListChuongTrinhDaoTaoGoc] = useState([])

  useEffect(() => {
    async function getChuongTrinhDaoTao() {
      const res = await getAllChuongTrinhDaoTao(dataSV.MaSinhVien)
      const ctdt = res.data || []

      const listCTDTWithoutPrefix = ctdt.map((e) =>
        transformKeys(e, (key) => `${key}`.replace(CTDT_PREFIX, '')),
      )
      setListChuongTrinhDaoTaoGoc(listCTDTWithoutPrefix)
      // group by NganhHoc & LoaiNganhHoc in NganhHoc
      const listCTDTGroupByNganhHoc = listCTDTWithoutPrefix.reduce((acc, e) => {
        const { NganhHoc } = e
        if (acc[NganhHoc]) {
          acc[NganhHoc].push(e)
        } else {
          acc[NganhHoc] = [e]
        }
        return acc
      }, {})

      for (let key in listCTDTGroupByNganhHoc) {
        const arr = listCTDTGroupByNganhHoc[key]

        listCTDTGroupByNganhHoc[key] = arr.reduce((acc, e) => {
          const { LoaiNganhHoc } = e
          if (acc[LoaiNganhHoc]) {
            acc[LoaiNganhHoc].push(e)
          } else {
            acc[LoaiNganhHoc] = [e]
          }
          return acc
        }, {})
      }

      // group by LoaiMonHoc
      for (let key in listCTDTGroupByNganhHoc) {
        for (let key2 in listCTDTGroupByNganhHoc[key]) {
          const arr = listCTDTGroupByNganhHoc[key][key2]

          listCTDTGroupByNganhHoc[key][key2] = arr.reduce((acc, e) => {
            const { LoaiMonHoc } = e
            if (acc[LoaiMonHoc]) {
              acc[LoaiMonHoc].push(e)
            } else {
              acc[LoaiMonHoc] = [e]
            }
            return acc
          }, {})
        }
      }
      setListChuongTrinhDaoTao(listCTDTGroupByNganhHoc)
    }

    getChuongTrinhDaoTao()
  }, [])

  return (
    <ChuongTrinhDaoTaoView
      chuongTrinhDaoTao={listChuongTrinhDaoTao}
      listChuongTrinhDaoTaoGoc={listChuongTrinhDaoTaoGoc}
    />
  )
}

export default ChuongTrinhDaoTao
