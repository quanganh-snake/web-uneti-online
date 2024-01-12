import React from 'react'
import SuaThongTinView from './SuaThongTinView'

function SuaThongTin() {
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
      path: '/motcua/daotao/suathongtin',
      title: 'Sửa thông tin',
    },
  ]

  return <SuaThongTinView home={home} breadcrumbs={breadcrumbs} />
}

export default SuaThongTin
