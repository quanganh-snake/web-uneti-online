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
              <Link key={index} to={`danhsachphan/${mh.MaMonHoc}`}>
                {/* <Link key={index} to={`danhsachphan/001942`}> */}
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
      </CommonLayout>
    </>
  )
}
