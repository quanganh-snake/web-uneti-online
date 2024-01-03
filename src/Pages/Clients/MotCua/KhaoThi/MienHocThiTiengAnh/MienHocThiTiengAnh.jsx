import MienHocThiTiengAnhView from './MienHocThiTiengAnhView'

function MienHocThiTiengAnh() {
  const home = {
    path: '/motcua',
    title: 'Bộ phận một cửa',
  }

  const breadcrumbs = [
    {
      path: '/motcua/khaothi',
      title: 'Khảo thí',
    },
    {
      path: '/motcua/khaothi/mienhocthiTA',
      title: 'Miễn học, thi Tiếng Anh',
    },
  ]

  return <MienHocThiTiengAnhView home={home} breadcrumbs={breadcrumbs} />
}

export default MienHocThiTiengAnh
