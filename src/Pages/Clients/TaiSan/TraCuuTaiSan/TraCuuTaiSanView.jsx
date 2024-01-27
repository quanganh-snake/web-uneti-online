import Box from '@/Components/MotCua/Box'
import React from 'react'
import { useLocation } from 'react-router-dom'

const TraCuuTaiSanView = () => {
  const location = useLocation()
  const { pathname } = location

  const breadcrumbs = [
    {
      title: 'Tra cứu tài sản',
      path: pathname,
    },
  ]

  const home = {
    path: '/hotrothietbi',
    title: 'Hỗ trợ thiết bị',
  }

  return (
    <div className="bg-white rounded-md p-4">
      <Box home={home} breadcrumbs={breadcrumbs}>
        <div className="col-span-2">
          <h2 className="text-center uppercase text-4xl font-bold text-uneti-primary mb-10">
            Tra cứu tài sản
          </h2>
          <div className=""></div>
        </div>
      </Box>
    </div>
  )
}

export default TraCuuTaiSanView
