import React from 'react'
import CapBanSaoView from './CapBanSaoView'

function CapBanSao() {
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
      path: '/mot-cua/dao-tao/cap-ban-sao',
      title: 'Cấp bản sao',
    },
  ]

  return <CapBanSaoView home={home} breadcrumbs={breadcrumbs} />
}

export default CapBanSao
