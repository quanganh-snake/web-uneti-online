import MienHocThiTiengAnhView from './MienHocThiTiengAnhView'

function MienHocThiTiengAnh() {
  const home = {
    path: '/mot-cua',
    title: 'Bộ phận một cửa',
  }

  const breadcrumbs = [
    {
      path: '/mot-cua/khao-thi',
      title: 'Khảo thí',
    },
    {
      path: '/mot-cua/khao-thi/mien-hoc-thi-tieng-anh',
      title: 'Miễn học, thi Tiếng Anh',
    },
  ]

  return <MienHocThiTiengAnhView home={home} breadcrumbs={breadcrumbs} />
}

export default MienHocThiTiengAnh
