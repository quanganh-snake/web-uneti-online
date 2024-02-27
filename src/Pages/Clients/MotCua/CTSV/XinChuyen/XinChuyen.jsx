import XinChuyenView from './XinChuyenView'

function XinChuyen() {
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
      path: '/mot-cua/ct&ctsv/xin-chuyen',
      title: 'Xin chuyển',
    },
  ]

  const handleDownloadFile = (e) => {
    e.preventDefault()
    console.log('download file here')
  }

  return (
    <XinChuyenView
      home={home}
      breadcrumbs={breadcrumbs}
      handleDownloadFile={handleDownloadFile}
    />
  )
}

export default XinChuyen
