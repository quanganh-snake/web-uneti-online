import GiayGioiThieuView from './GiayGioiThieuView'

function GiayGioiThieu() {
  const home = {
    path: '/mot-cua',
    title: 'Bộ phận một cửa',
  }

  const breadcrumbs = [
    {
      path: '/mot-cua/hanh-chinh',
      title: 'Hành chính',
    },
    {
      path: '/mot-cua/hanh-chinh/GiayGioiThieu',
      title: 'Giấy giới thiệu',
    },
  ]

  return <GiayGioiThieuView home={home} breadcrumbs={breadcrumbs} />
}

export default GiayGioiThieu
