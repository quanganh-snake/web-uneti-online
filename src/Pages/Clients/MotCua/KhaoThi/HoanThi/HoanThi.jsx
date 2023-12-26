import React, { useEffect, useState } from 'react'
import HoanThiView from './HoanThiView'
import { getTenDotHoanThi } from '@/Apis/MotCua/KhaoThi/apiHoanThi';

function HoanThi() {

  const home = {
		path: "/motcua",
		title: "Bộ phận một cửa",
	};

	const breadcrumbs = [
		{
			path: "/motcua/khaothi",
			title: "Khảo thí",
		},
		{
			path: "/motcua/khaothi/hoanthi",
			title: "Hoãn Thi",
		},
	];

  const [listHocKy, setListHocKy] = useState([])
  const [hocKy, setHocKy] = useState('')
  const [loaiThi, setLoaiThi] = useState('')
  const [lyDo, setLyDo] = useState('')
  const [lyDoKhac, setLyDoKhac] = useState('')
  const [listAnhDinhKem, setListAnhDinhKem] = useState([])

  const listLoaiThi = [
    {
      value: 2,
      name: 'Thi lần 1'
    },
    {
      value: 3,
      name: 'Thi lại'
    }
  ]

  const listLyDo = ['Đi viện hoặc theo y/c bác sĩ', 'Thực hiện nhiệm vụ Nhà trường giao', 'Lý do khác']

  useEffect(() => {
    getTenDotHoanThi().then((res) => {
      setListHocKy(res?.data?.body)
    })

	}, [hocKy])

  return (
    <HoanThiView 
      home={home}
      breadcrumbs={breadcrumbs}
      hocKy={hocKy}
      setHocKy={setHocKy}
      loaiThi={loaiThi}
      setLoaiThi={setLoaiThi}
      lyDo={lyDo}
      setLyDo={setLyDo}
      lyDoKhac={lyDoKhac}
      setLyDoKhac={setLyDoKhac}
      listHocKy={listHocKy}
      setListHocKy={setListHocKy}
      listLoaiThi={listLoaiThi}
      listLyDo={listLyDo}
    />
  )
}

export default HoanThi