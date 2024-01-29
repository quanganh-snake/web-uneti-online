import { Pagination } from '@mui/material'
import { isNil } from 'lodash-unified'
import { useMemo, useRef } from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// import {
//   getAllDeThiThiThu,
//   getAllMonHocThiThu,
// } from '@/Apis/HocTap/apiOnLuyenThiThu'
import {
  getCauHoiTheoDe,
  getTongSoTrangTheoDe,
} from '@/Apis/HocTap/apiOnLuyenTracNghiem'

import Col from '@/Components/Base/Col/Col'
import Row from '@/Components/Base/Row/Row'
import CauHoi from '@/Components/HocTap/OnTap/CauHoi'
import XacNhanNopBai from '@/Components/HocTap/Promt/XacNhanNopBai'
import { OnTapContext } from '@/Services/Tokens'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { convertQuestionToHtml } from '../../../utils'

function DeThi() {
  const listCauHoiCached = useRef(new Map())
  const uLocation = useLocation()
  const dataSV = DataSinhVien()
  // const navigate = useNavigate()

  // const maMonHoc = uLocation.pathname.split('/').at(-3).toString()
  // const maDe = uLocation.pathname.split('/').at(-1).toString()

  const [monHoc, setMonHoc] = useState({
    TenMonHoc: 'Tiếng Anh',
    MaMonHoc: '510201014',
  })
  const [listCauHoi, setListCauHoi] = useState([])
  const [listCauTraLoi, setListCauTraLoi] = useState([])
  const [deThi, setDeThi] = useState({ Id: '413' })

  const [totalPage, setTotalPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)

  const handleChangeCauTraLoi = (IDCauHoi, IDCauTraLoi) => {
    setListCauTraLoi({
      ...listCauTraLoi,
      [IDCauHoi]: IDCauTraLoi,
    })
  }

  const handleChangeCurrentPage = (event, value) => {
    setCurrentPage(value)
  }

  const listCauHoiGroupByParent = useMemo(() => {
    const obj = listCauHoi.reduce((res, curr) => {
      const key = curr.IDCauHoiCha ?? 'NoParent'

      if (isNil(res[key])) {
        res[key] = []
      }

      res[key].push(curr)

      return res
    }, {})

    return Object.keys(obj).map((key) => {
      return obj[key]
    })
  }, [listCauHoi])

  // useEffect(() => {
  // const getMonThi = async () => {
  //   const listMonThi = await getAllMonHocThiThu(dataSV.MaSinhVien)
  //   const _monHoc = listMonThi?.data?.body.find(
  //     (mh) => mh.MaMonHoc === maMonHoc,
  //   )
  //   if (!_monHoc) {
  //     navigate('/hoctap/onluyen/thithu')
  //   }
  //   setMonHoc(_monHoc)
  // }
  // const getDeThi = async () => {
  //   const _listDeThi = await getAllDeThiThiThu(maMonHoc)
  //   const _deThi = _listDeThi.data.body.find((e) => e.MaDeThi == maDe)
  //   if (!_deThi) {
  //     navigate('/hoctap/onluyen/thithu')
  //   }
  //   setDeThi(_deThi)
  // }
  // getMonThi()
  // getDeThi()
  // }, [maMonHoc, maDe])

  useEffect(() => {
    const getTongSoTrang = async () => {
      if (deThi) {
        const _tongSoTrangResponse = await getTongSoTrangTheoDe({
          IDDeThi: deThi.Id,
          SoCauTrenTrang: pageSize,
        })

        setTotalPage(_tongSoTrangResponse.data.body[0].TongSoTrang)
      }
    }

    const getListCauHoi = async () => {
      if (deThi) {
        const key = JSON.stringify({ IDDeThi: deThi.Id, currentPage, pageSize })

        if (!listCauHoiCached.current.has(key)) {
          const res = await getCauHoiTheoDe({
            IDDeThi: deThi.Id,
            SoCauTrenTrang: pageSize,
            SoTrang: currentPage,
          })

          const data = []
          for (let i = 0; i < res.data.body.length; i++) {
            data.push(await convertQuestionToHtml(res.data.body[i]))
          }

          listCauHoiCached.current.set(key, data)
        }

        setListCauHoi(listCauHoiCached.current.get(key))
      }
    }

    getTongSoTrang()
    getListCauHoi()
  }, [deThi, pageSize, currentPage])

  const handleXacNhanNopBai = () => {
    console.log('Nộp bài')
  }

  return (
    <OnTapContext.Provider
      value={{
        selected: listCauTraLoi,
        handleSelected: handleChangeCauTraLoi,
      }}
    >
      <div className="flex justify-center items-center flex-col gap-4 rounded-md bg-white p-4">
        <h3 className="text-uneti-primary text-center font-semibold text-2xl">
          {monHoc.TenMonHoc}
        </h3>
        <span className="text-uneti-primary text-sm">
          Mã Môn Học: {monHoc.MaMonHoc}
        </span>
      </div>
      <div className="mt-6">
        <Row gutter={30}>
          <Col span={12} md={9}>
            <div className="flex flex-col gap-7 p-6 bg-white rounded-[26px] shadow-sm">
              {listCauHoiGroupByParent?.map((question, index) => {
                if (question?.length > 0) {
                  return (
                    <div
                      key={`parent-${index}`}
                      className="p-6 rounded-[26px] border-2 border-slate-200 flex flex-col gap-4 transition-all hover:border-opacity-90"
                    >
                      <div className="flex items-start gap-2 flex-wrap">
                        <div
                          className="flex-1 mt-[2px]"
                          dangerouslySetInnerHTML={{
                            __html: `<span class="text-vs-danger font-bold whitespace-nowrap">
                            Câu hỏi ${(currentPage - 1) * pageSize + index + 1}:
                          </span> ${question[0].CauHoiCha}`,
                          }}
                        />
                      </div>

                      {question.map((child, i) => (
                        <CauHoi
                          key={`child-${index}-${i}`}
                          STT={`${(currentPage - 1) * pageSize + index + 1}.${i + 1}`}
                          {...child}
                        />
                      ))}
                    </div>
                  )
                } else
                  return (
                    <CauHoi
                      key={`parent-${index}`}
                      STT={(currentPage - 1) * pageSize + index + 1}
                      {...question}
                    />
                  )
              })}
            </div>

            <div className="p-4 bg-white my-5 rounded-xl shadow-sm">
              <Pagination
                count={totalPage}
                page={currentPage}
                onChange={handleChangeCurrentPage}
                shape="rounded"
              />
            </div>
          </Col>
          <Col span={12} md={3}>
            <XacNhanNopBai
              TenMonHoc={monHoc.TenMonHoc}
              onConfirm={handleXacNhanNopBai}
            />
          </Col>
        </Row>
      </div>
    </OnTapContext.Provider>
  )
}

export default DeThi
