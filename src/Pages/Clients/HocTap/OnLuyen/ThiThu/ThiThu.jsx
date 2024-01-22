import { getAllMonHocThiThu } from '@/Apis/HocTap/apiOnLuyenThiThu'
import Accordion from '@/Components/Base/Accordion/Accordion'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import React, { useEffect, useState } from 'react'
import iconOnLuyen from '@/assets/Icons/icon-onluyen.png'
import { Box, CircularProgress, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function ThiThu() {
  const [listMonHoc, setListMonHoc] = useState([])
  const [listHocKy, setListHocKy] = useState([])

  const dataSV = DataSinhVien()

  useEffect(() => {
    getAllMonHocThiThu(dataSV.MaSinhVien).then((res) => {
      setListMonHoc(res?.data?.body)
    })

    return () => {
      setListMonHoc([])
    }
  }, [])

  useEffect(() => {
    setListHocKy(
      listMonHoc.map((e) => e.TenDot).filter((v, i, s) => s.indexOf(v) === i),
    )
    return () => {
      setListHocKy([])
    }
  }, [listMonHoc])

  return (
    <>
      <div className="mt-4 p-10 rounded-md shadow-sm">
        <div>
          {listHocKy.length &&
            listHocKy.map((hk, index) => (
              <Accordion key={index} className="mb-2">
                <Accordion.Label className="bg-uneti-primary text-white">
                  Học kỳ {hk}
                </Accordion.Label>
                <Accordion.Content className="w-full overflow-x-auto">
                  <div className="w-full flex flex-col gap-4 pb-2">
                    {listMonHoc.map((mh, index) => {
                      if (mh.TenDot === hk) {
                        return (
                          <Link
                            to={`${mh.MaMonHoc}`}
                            key={index}
                            className="cursor-pointer bg-white rounded-md shadow-md hover:shadow-sm duration-200 w-full flex p-4 justify-between items-center gap-4 text-vs-text"
                          >
                            <div>
                              <img src={iconOnLuyen} />
                            </div>
                            <div className="flex-1 flex flex-col gap-4">
                              <span className="font-bold">{mh.TenMonHoc}</span>
                              <span className="text-sm">
                                Mã môn học: {mh.MaMonHoc}
                              </span>
                            </div>
                            <div>
                              <Box
                                sx={{
                                  position: 'relative',
                                  display: 'inline-flex',
                                }}
                              >
                                <CircularProgress
                                  variant="determinate"
                                  value={Math.round(
                                    (mh.SoCauDaLam / mh.TongCauHoi) * 100,
                                  )}
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
                                    {`${Math.round(
                                      (mh.SoCauDaLam / mh.TongCauHoi) * 100,
                                    )}%`}
                                  </Typography>
                                </Box>
                              </Box>
                            </div>
                          </Link>
                        )
                      }
                      return null
                    })}
                  </div>
                </Accordion.Content>
              </Accordion>
            ))}
        </div>
      </div>
    </>
  )
}
