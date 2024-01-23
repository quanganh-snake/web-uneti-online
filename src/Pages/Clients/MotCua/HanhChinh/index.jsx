import { useLocation } from 'react-router-dom'
import { homeMotCua } from '@/Services/Static/dataStatic.js'
import FeatureItem from '@/Components/FeatureItem/FeatureItem'
import Box from '@/Components/MotCua/Box'

function HomeHanhChinh() {
    const iconDaoTao = homeMotCua[3].ico
    const featureHanhChinh = homeMotCua[3].childrens

    const location = useLocation()
    const { pathname } = location

    const breadcrumbs = [
        {
            title: 'Hành chính',
            path: pathname,
        },
    ]

    const home = {
        path: '/motcua',
        title: 'Bộ phận một cửa',
    }

    return (
        <Box home={home} breadcrumbs={breadcrumbs}>
            {featureHanhChinh.map((featureItem, index) => {
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

export default HomeHanhChinh
