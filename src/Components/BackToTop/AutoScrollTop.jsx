import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const AutoScrollTop = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        window &&
            window.scroll({
                top: 0,
                behavior: 'smooth',
            })
    }, [pathname])

    return null
}

export default AutoScrollTop
