import React from 'react'
import PropTypes from 'prop-types'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import FormDangKyThiLai from './FormDangKyThiLai'

function DangKyThiLaiView(props) {
    const {
        loading,
        home,
        breadcrumbs,
        listHocPhan,
        hocKy,
        setHocKy,
        lyDo,
        setLyDo,
        listHocKy,
        lyDoKhac,
        setLyDoKhac,
        handleRowSelection,
        handleSubmitData,
        selectedRow,
    } = props

    return (
        <div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
            <div className="p-4 flex flex-col">
                <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
                <FormDangKyThiLai
                    listHocPhan={listHocPhan}
                    hocKy={hocKy}
                    setHocKy={setHocKy}
                    lyDo={lyDo}
                    setLyDo={setLyDo}
                    listHocKy={listHocKy}
                    lyDoKhac={lyDoKhac}
                    setLyDoKhac={setLyDoKhac}
                    handleRowSelection={handleRowSelection}
                    handleSubmitData={handleSubmitData}
                    loading={loading}
                    selectedRow={selectedRow}
                />
            </div>
        </div>
    )
}

DangKyThiLaiView.propTypes = {}

export default DangKyThiLaiView
