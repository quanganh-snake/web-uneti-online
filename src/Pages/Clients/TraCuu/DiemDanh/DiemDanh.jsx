import React from 'react'
import DiemDanhView from './DiemDanhView'

function DiemDanh() {
  const home = {
    path: '/uneti',
    title: 'Trang chủ',
  }

  const breadcrumbs = [
    {
      path: '/tracuu',
      title: 'Tra cứu',
    },
    {
      path: '/tracuu/diemdanh',
      title: 'Điểm danh',
    },
  ]
  return <DiemDanhView home={home} breadcrumbs={breadcrumbs} />
}

export default DiemDanh
