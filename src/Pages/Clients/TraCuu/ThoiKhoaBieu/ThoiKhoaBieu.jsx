import ThoiKhoaBieuView from './ThoiKhoaBieuView'

function ThoiKhoaBieu() {
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
      path: '/tracuu/thoikhoabieu',
      title: 'Thời khóa biểu',
    },
  ]
  return <ThoiKhoaBieuView home={home} breadcrumbs={breadcrumbs} />
}

export default ThoiKhoaBieu
