import React from 'react'
import MienChungChiView from './MienChungChiView'

function MienChungChi() {
    const home = {
        path: '/motcua',
        title: 'Bộ phận một cửa',
    }

    const breadcrumbs = [
        {
            path: '/motcua/daotao',
            title: 'Đào tạo',
        },
        {
            path: '/motcua/daotao/mienchungchi',
            title: 'Miễn chứng chỉ',
        },
    ]

    return <MienChungChiView home={home} breadcrumbs={breadcrumbs} />
}

export default MienChungChi
