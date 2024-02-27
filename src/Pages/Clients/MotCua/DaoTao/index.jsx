import { useLocation } from 'react-router-dom'
import { homeMotCua } from '@/Services/Static/dataStatic.js'
import FeatureItem from '@/Components/FeatureItem/FeatureItem'
import Box from '@/Components/MotCua/Box'

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
    path: '/mot-cua',
    title: 'Bộ phận Một cửa',
  }

  return (
    <Box home={home} breadcrumbs={breadcrumbs}>
      {featureDaoTao.map((featureItem, index) => {
        return featureItem.visiable ? (
          <div key={index} className="feature-box">
            <FeatureItem icon={iconDaoTao} featureItem={featureItem} />
          </div>
        ) : null
      })}
    </Box>
  )
}

export default HomeDaoTao
