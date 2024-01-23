import React from 'react'
import QuaTrinhHocView from './QuaTrinhHocView'

function QuaTrinhHoc() {
    const home = {
        path: '/motcua',
        title: 'Bộ phận một cửa',
    }

    const breadcrumbs = [
        {
            path: '/motcua/ct&ctsv',
            title: 'Công tác sinh viên',
        },
        {
            path: '/motcua/ct&ctsv/quatrinhhoc',
            title: 'Quá trình học',
        },
    ]

    const handleDownloadFile = (e) => {
        e.preventDefault()
        console.log('download file here')
    }

    return (
        <QuaTrinhHocView
            home={home}
            breadcrumbs={breadcrumbs}
            handleDownloadFile={handleDownloadFile}
        />
    )
}

export default QuaTrinhHoc
