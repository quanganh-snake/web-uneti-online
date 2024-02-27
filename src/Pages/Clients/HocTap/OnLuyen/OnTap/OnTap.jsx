import { useEffect, useState } from 'react'

import CommonLayout from '@/Layouts/Common/CommonLayout'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { getAllMonHocThiThu } from '@/Apis/HocTap/apiOnLuyenThiThu'

import { breadcrumbs, home } from './constants'
import HocKy from '@/Components/HocTap/OnTap/HocKy'
import { useMemo } from 'react'
import { hocTapSidebar } from '../../constants'
import MonHoc from '@/Components/HocTap/OnTap/MonHoc'

import iconOnLuyen from '@/assets/Icons/icon-onluyen.png'
import { Link } from 'react-router-dom'
import { Box, CircularProgress, Typography } from '@mui/material'

export default function OnTap() {
  const [listMonHoc, setListMonHoc] = useState([])

  const dataSV = DataSinhVien()

  const danhSachMonHocTheoHocKy = useMemo(() => {
    const listMonHocHocKy = listMonHoc.reduce((result, monHoc) => {
      if (Object.prototype.hasOwnProperty.call(result, monHoc.TenDot)) {
        result[monHoc.TenDot].push(monHoc)
      } else {
        result[monHoc.TenDot] = [monHoc]
      }

      return result
    }, {})

    return Object.keys(listMonHocHocKy).map((hk) => ({
      HocKy: hk,
      MonHoc: listMonHocHocKy[hk],
    }))
  }, [listMonHoc])

  useEffect(() => {
    getAllMonHocThiThu(dataSV.MaSinhVien).then((res) => {
      setListMonHoc(res?.data?.body)
    })

    return () => {
      setListMonHoc([])
    }
  }, [])

  return (
    <>
      <CommonLayout
        sidebar={hocTapSidebar}
        breadcrumbs={breadcrumbs}
        home={home}
      >
        {danhSachMonHocTheoHocKy.map((hocKy, index) => (
          <HocKy key={index} hocKy={hocKy.HocKy}>
            {hocKy.MonHoc.map((mh, index) => (
              <Link key={index} to={`danh-sach-phan/${mh.MaMonHoc}`}>
                {/* <Link key={index} to={`danh-sach-phan/001942`}> */}
                <MonHoc
                  TenMonHoc={mh.TenMonHoc}
                  MaMonHoc={`Mã môn học: ${mh.MaMonHoc}`}
                  icon={iconOnLuyen}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      display: 'inline-flex',
                    }}
                  >
                    <CircularProgress
                      variant="determinate"
                      value={Math.round((mh.SoCauDaLam / mh.TongCauHoi) * 100)}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                      >
                        {`${Math.round((mh.SoCauDaLam / mh.TongCauHoi) * 100)}%`}
                      </Typography>
                    </Box>
                  </Box>
                </MonHoc>
              </Link>
            ))}
          </HocKy>
        ))}
        <div>
          <strong>Chú thích *:</strong>
          <ul>
            <li>&#8226; Không hiển thị phương án trả lời đúng.</li>
            <li>
              <p className="mb-4">&#8226; Quy định màu:</p>
              <ul className="px-6">
                <li>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-vs-danger rounded-md"></div>
                    &#58;
                    <p>Câu hỏi/phương án trả lời sai</p>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-uneti-primary rounded-md"></div>
                    &#58;
                    <p>Câu hỏi/phương án trả lời đã chọn</p>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-vs-warn rounded-md"></div>
                    &#58;
                    <p>Câu hỏi/phương án phân vân</p>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </CommonLayout>
    </>
  )
}
