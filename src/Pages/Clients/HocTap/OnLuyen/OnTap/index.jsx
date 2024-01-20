import FeatureItem from '@/Components/FeatureItem/FeatureItem'
import Box from '@/Components/MotCua/Box'
import { homeHocTap } from '@/Services/Static/dataStatic'
import React from 'react'
import { useLocation } from 'react-router-dom'

export const OnTapLyThuyet = () => {
    const location = useLocation()
    const { pathname } = location

    const breadcrumbs = [
        {
            title: 'Ôn luyện',
            path: `/${pathname.split('/')[1]}/${pathname.split('/')[2]}`,
        },
        {
            title: 'Ôn tập lý thuyết',
            path: pathname,
        },
    ]

    const home = {
        path: '/hoctap',
        title: 'Học tập',
    }

    return (
        <Box home={home} breadcrumbs={breadcrumbs}>
            <>abc</>
        </Box>
    )
}
