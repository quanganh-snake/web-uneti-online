import React from 'react'
import SuaThongTinView from './SuaThongTinView'

function SuaThongTin() {
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
      path: '/mot-cua/dao-tao/sua-thong-tin',
      title: 'Sửa thông tin',
    },
  ]

  return <SuaThongTinView home={home} breadcrumbs={breadcrumbs} />
}

export default SuaThongTin
