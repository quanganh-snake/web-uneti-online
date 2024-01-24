import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import React from 'react'

function DiemDanhView(props) {
  const { home, breadcrumbs } = props
  return (
    <div>
      <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
      <div>
        <h2 className="font-semibold text-center uppercase text-uneti-primary">
          thông tin điểm danh
        </h2>
      </div>
    </div>
  )
}

export default DiemDanhView
