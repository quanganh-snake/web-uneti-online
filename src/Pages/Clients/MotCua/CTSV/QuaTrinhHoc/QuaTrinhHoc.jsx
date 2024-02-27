import React from 'react'
import QuaTrinhHocView from './QuaTrinhHocView'

function QuaTrinhHoc() {
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
      path: '/mot-cua/ct&ctsv/qua-trinh-hoc',
      title: 'Quá trình học',
    },
  ]

  const handleDownloadFile = (e) => {
    e.preventDefault()
    console.log('download file here')
  }

  return (
    <QuaTrinhHocView
      home={home}
      breadcrumbs={breadcrumbs}
      handleDownloadFile={handleDownloadFile}
    />
  )
}

export default QuaTrinhHoc
