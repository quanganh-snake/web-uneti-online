import { useLocation } from 'react-router-dom'
import { homeMotCua } from '@/Services/Static/dataStatic.js'
import FeatureItem from '@/Components/FeatureItem/FeatureItem'
import Box from '@/Components/MotCua/Box'

function HomeCTSV() {
    const iconDaoTao = homeMotCua[2].ico
    const featureCTSV = homeMotCua[2].childrens

    const location = useLocation()
    const { pathname } = location

    const breadcrumbs = [
        {
            title: 'Công tác sinh viên',
            path: pathname,
        },
    ]

    const home = {
        path: '/motcua',
        title: 'Bộ phận một cửa',
    }

    return (
        <Box home={home} breadcrumbs={breadcrumbs}>
            {featureCTSV.map((featureItem, index) => {
                return featureItem.visiable ? (
                    <div key={index} className="feature-box">
                        <FeatureItem
                            icon={iconDaoTao}
                            featureItem={featureItem}
                        />
                    </div>
                ) : null
            })}
        </Box>
    )
}

export default HomeCTSV
