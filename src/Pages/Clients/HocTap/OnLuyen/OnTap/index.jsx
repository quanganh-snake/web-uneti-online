import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Box from '@/Components/MotCua/Box'
import FeatureItem from '@/Components/FeatureItem/FeatureItem'
import { SubjectItem } from '@/Components/HocTap/SubjectItem'
import { homeHocTap } from '@/Services/Static/dataStatic'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { getMonHocTheoSinhVien } from '@/Apis/HocTap/apiOnLuyenTracNghiem'

import { FaChevronDown } from 'react-icons/fa'
import clsx from 'clsx'

export const OnTapLyThuyet = () => {
  const location = useLocation()
  const { pathname } = location

  const breadcrumbs = [
    {
      title: 'Ôn luyện',
      path: `/${pathname.split('/')[1]}/${pathname.split('/')[2]}`,
    },
    {
      title: 'Ôn tập lý thuyết',
      path: pathname,
    },
  ]

  const home = {
    path: '/hoctap',
    title: 'Học tập',
  }

  const dataSV = DataSinhVien()

  // var
  const [isOpen, setIsOpen] = useState(0)
  const [listMonHoc, setListMonHoc] = useState([])
  // fetch data
  const fetchListMonHocTheoSinhVien = async () => {
    try {
      const res = await getMonHocTheoSinhVien(dataSV?.MaSinhVien)
      if (res.status === 200) {
        setListMonHoc(res.data?.body)
      }
    } catch (error) {
      console.log('>>> Error: ' + error.message)
    }
  }

  // effect
  useEffect(() => {
    fetchListMonHocTheoSinhVien()
  }, [])

  let hocKyMap = new Map()
  listMonHoc?.forEach((iMonHoc) => {
    const hocKy = iMonHoc.TenDot
    if (hocKyMap.has(hocKy)) {
      hocKyMap.get(hocKy).push(iMonHoc)
    } else {
      hocKyMap.set(hocKy, [iMonHoc])
    }
  })
  const groupHocKy = Array.from(hocKyMap.values())

  return (
    <Box home={home} breadcrumbs={breadcrumbs}>
      <div className="col-span-1 md:col-span-2">
        {groupHocKy.map((iGroup, index) => {
          const handleOpenHocKy = () => {
            if (isOpen === index) {
              setIsOpen(null)
            } else {
              setIsOpen(index)
            }
          }

          return (
            <div className="mb-6" key={index}>
              <h3
                className={clsx(
                  'w-full px-3 py-1 flex items-center gap-4 font-medium shadow-md rounded-md uppercase',
                  isOpen === index
                    ? 'bg-[#0484AC] text-white'
                    : 'bg-white text-gray-600 border border-[#0484AC]',
                )}
              >
                <FaChevronDown
                  className={clsx(
                    'cursor-pointer',
                    isOpen === index ? '' : '-rotate-90',
                  )}
                  onClick={handleOpenHocKy}
                />
                {`Học kỳ ${iGroup[0]?.TenDot}`}
              </h3>
              <div
                className={clsx(
                  'flex flex-col gap-4',
                  isOpen === index ? 'block' : 'hidden',
                )}
              >
                {iGroup.map((iHocPhan, index) => (
                  <SubjectItem key={index} dataHocPhan={iHocPhan} />
                ))}
              </div>
            </div>
          )
        })}

        <div className="note bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium">Chú thích (*):</h3>
          <ul>
            <li>
              - Tại phần "Ôn tập" sẽ không hiển thị phương án trả lời đúng.
            </li>
            <li>
              <p className="mb-4">- Quy định màu:</p>
              <ul className="flex flex-col gap-4 px-5">
                <li>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#0484AC] rounded-lg shadow-md shadow-[#0484AC]/50"></div>
                    <p>Câu hỏi/phương án đã chọn</p>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#F69400] rounded-lg shadow-md shadow-[#F69400]/50"></div>
                    <p>Câu hỏi/phương án trả lời đang phân vân</p>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#F03434] rounded-lg shadow-md shadow-[#F03434]/50"></div>
                    <p>Câu hỏi/phương án trả lời sai</p>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </Box>
  )
}
