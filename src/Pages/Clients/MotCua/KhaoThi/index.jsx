import { homeMotCua } from '@/Services/Static/dataStatic.js'
import { useLocation } from 'react-router-dom'
import FeatureItem from '@/Components/FeatureItem/FeatureItem.jsx'
import Box from '@/Components/MotCua/Box'

function HomeKhaoThi() {
    const icon = homeMotCua[0].ico
    const featureKhaoThi = homeMotCua[0].childrens

    const location = useLocation()
    const { pathname } = location

    const breadcrumbs = [
        {
            title: 'Khảo thí',
            path: pathname,
        },
    ]

    const home = {
        path: '/motcua',
        title: 'Bộ phận Một cửa',
    }

    return (
        <Box home={home} breadcrumbs={breadcrumbs}>
            {featureKhaoThi.map((featureItem, index) => {
                return featureItem.visiable ? (
                    <div key={index} className="feature-box">
                        <FeatureItem icon={icon} featureItem={featureItem} />
                    </div>
                ) : null
            })}
        </Box>
    )
}

export default HomeKhaoThi
