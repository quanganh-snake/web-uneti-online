import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router-dom'
import { DataSinhVien } from '../Services/Utils/dataSinhVien'
import { DataCanBoGV } from '../Services/Utils/dataCanBoGV'

function RoleViewActionMiddleware(props) {
    const { allowedRoleViewAction } = props
    const dataSV = DataSinhVien()
    const dataCBGV = DataCanBoGV()

    let userRoles = null
    if (dataCBGV) {
        userRoles = dataCBGV.HT_GROUPUSER_ID
    } else {
        userRoles = null
    }

    const resultRoleViewAction = userRoles
        ? allowedRoleViewAction.every((role) => userRoles.includes(role))
        : false

    return resultRoleViewAction ? <Outlet /> : <Navigate to="/error/403" />
}

RoleViewActionMiddleware.propTypes = {
    allowedRoleViewAction: PropTypes.array,
}

export default RoleViewActionMiddleware
