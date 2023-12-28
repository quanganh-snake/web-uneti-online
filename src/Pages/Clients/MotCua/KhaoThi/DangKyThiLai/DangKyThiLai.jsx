import React from 'react'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import FormDangKyThiLai from './FormDangKyThiLai'

function DangKyThiLai() {
  const home = {
    path: '/motcua',
    title: 'Bộ phận một cửa'
  }

  const breadcrumbs = [
    {
      path: '/motcua/khaothi',
      title: 'Khảo thí'
    },
    {
      path: '/motcua/khaothi/dangkythilai',
      title: 'Đăng ký thi lại'
    }
  ]

  return (
    <div className='bg-white shadow-md rounded-md mx-4 lg:mx-0'>
      <div className='p-4 flex flex-col'>
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
        <FormDangKyThiLai />
      </div>
    </div>
  )
}

export default DangKyThiLai
