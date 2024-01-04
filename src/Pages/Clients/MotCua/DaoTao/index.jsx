import React from 'react'
import { useLocation } from 'react-router-dom'
import { homeMotCua } from '@/Services/Static/dataStatic.js'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import FeatureItemMotCua from '@/Components/FeatureItemMotCua/FeatureItemMotCua'

function HomeDaoTao() {
  const iconDaoTao = homeMotCua[1].ico
  const featureDaoTao = homeMotCua[1].childrens

  const location = useLocation()
  const { pathname } = location

  const breadcrumbs = [
    {
      title: 'Đào tạo',
      path: pathname,
    },
  ]

  const home = {
    path: '/motcua',
    title: 'Bộ phận Một cửa',
  }

  return (
    <div className="">
      <div className="flex flex-col gap-4 p-5 rounded-md shadow-xl bg-white">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featureDaoTao.map((featureItem, index) => {
            return featureItem.visiable ? (
              <div key={index} className="feature-box">
                <FeatureItemMotCua
                  iconKhaoThi={iconDaoTao}
                  featureItem={featureItem}
                />
              </div>
            ) : null
          })}
        </div>
      </div>
    </div>
  )
}

export default HomeDaoTao