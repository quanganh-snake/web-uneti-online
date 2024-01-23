import FeatureItem from '@/Components/FeatureItem/FeatureItem'
import ModuleItem from '@/Components/ModuleItem/ModuleItem'
import Box from '@/Components/MotCua/Box'
import { homeHocTap } from '@/Services/Static/dataStatic'
import React from 'react'
import { useLocation } from 'react-router-dom'

export const OnLuyen = () => {
  const iconDaoTao = homeHocTap[1]?.ico
  const featureCTSV = homeHocTap[1]?.childrens

  const location = useLocation()
  const { pathname } = location

  const breadcrumbs = [
    {
      title: 'Ôn luyện',
      path: pathname,
    },
  ]

  const home = {
    path: '/hoctap',
    title: 'Học tập',
  }

  return (
    <Box home={home} breadcrumbs={breadcrumbs}>
      {featureCTSV.map((featureItem, index) => {
        return featureItem.visiable ? (
          <div key={index} className="feature-box">
            <ModuleItem item={featureItem} />
          </div>
        ) : null
      })}
    </Box>
  )
}
