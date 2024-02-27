import React from 'react'
import NghiHocTamThoiView from './NghiHocTamThoiView'

function NghiHocTamThoi() {
  const home = {
    path: '/mot-cua',
    title: 'Bộ phận một cửa',
  }

  const breadcrumbs = [
    {
      path: '/mot-cua/ct&ctsv',
      title: 'Công tác sinh viên',
    },
    {
      path: '/mot-cua/ct&ctsv/nghi-hoc-tam-thoi',
      title: 'Nghỉ học tạm thời',
    },
  ]

  const handleDownloadFile = (e) => {
    e.preventDefault()
    console.log('download file here')
  }

  return (
    <NghiHocTamThoiView
      home={home}
      breadcrumbs={breadcrumbs}
      handleDownloadFile={handleDownloadFile}
    />
  )
}

export default NghiHocTamThoi
