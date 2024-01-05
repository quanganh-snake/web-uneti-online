import React from 'react'
import CapBanSaoView from './CapBanSaoView'

function CapBanSao() {
  const home = {
    path: '/motcua',
    title: 'Bộ phận một cửa',
  }

  const breadcrumbs = [
    {
      path: '/motcua/daotao',
      title: 'Đào tạo',
    },
    {
      path: '/motcua/daotao/capbansao',
      title: 'Cấp bản sao',
    },
  ]

  return <CapBanSaoView home={home} breadcrumbs={breadcrumbs} />
}

export default CapBanSao
