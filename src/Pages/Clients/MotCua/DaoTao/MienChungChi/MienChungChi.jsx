import React from 'react'
import MienChungChiView from './MienChungChiView'

function MienChungChi() {
  const home = {
    path: '/mot-cua',
    title: 'Bộ phận một cửa',
  }

  const breadcrumbs = [
    {
      path: '/mot-cua/dao-tao',
      title: 'Đào tạo',
    },
    {
      path: '/mot-cua/dao-tao/mien-chung-chi',
      title: 'Miễn chứng chỉ',
    },
  ]

  return <MienChungChiView home={home} breadcrumbs={breadcrumbs} />
}

export default MienChungChi
