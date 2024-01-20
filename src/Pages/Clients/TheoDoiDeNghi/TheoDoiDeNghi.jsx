import { useEffect, useState } from 'react'
import TheoDoiDeNghiView from './TheoDoiDeNghiView'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { getAllYeuCau } from '@/Apis/TheoDoiDeNghi/apiTheoDoiDeNghi'
import dayjs from 'dayjs'

function TheoDoiDeNghi() {
    const home = {
        path: '/uneti',
        title: 'Trang chủ',
    }

    const breadcrumbs = [
        {
            path: '/theodoidenghi',
            title: 'Theo dõi đề nghị',
        },
    ]

    const listLoaiYeuCau = [
        {
            value: 'Tất cả',
            text: 'Tất cả yêu cầu',
        },
        {
            value: 'Chờ xử lý',
            text: 'Yêu cầu chưa xử lý',
        },
        {
            value: 'Đã xử lý',
            text: 'Yêu cầu đã xử lý',
        },
    ]

    const [listYeuCau, setListYeuCau] = useState([])
    const [loaiYeuCau, setLoaiYeuCau] = useState(listLoaiYeuCau[0].value)
    const [currentPage, setCurrentPage] = useState(1)

    const dataSV = DataSinhVien()

    useEffect(() => {
        getAllYeuCau(dataSV.MaSinhVien).then((res) => {
            setListYeuCau(
                res?.data?.body
                    .filter((yc) => {
                        if (loaiYeuCau === 'Tất cả') return true
                        return (
                            yc.MC_TrangThai_YeuCau_SinhVien_TrangThai ===
                            loaiYeuCau
                        )
                    })
                    .sort((a, b) => {
                        const dateA = dayjs(
                            a.MC_TrangThai_YeuCau_SinhVien_NgayGui,
                        )
                        const dateB = dayjs(
                            b.MC_TrangThai_YeuCau_SinhVien_NgayGui,
                        )
                        if (dateA.isAfter(dateB)) {
                            return -1
                        }
                        if (dateA.isBefore(dateB)) {
                            return 1
                        }
                        return 0
                    }),
            )
        })

        return () => {
            setListYeuCau([])
            setCurrentPage(1)
        }
    }, [loaiYeuCau])

    const handleChangePage = (e, page) => {
        setCurrentPage(() => page)
    }

    return (
        <TheoDoiDeNghiView
            home={home}
            breadcrumbs={breadcrumbs}
            listLoaiYeuCau={listLoaiYeuCau}
            loaiYeuCau={loaiYeuCau}
            setLoaiYeuCau={setLoaiYeuCau}
            listYeuCau={listYeuCau}
            currentPage={currentPage}
            handleChangePage={handleChangePage}
        />
    )
}

export default TheoDoiDeNghi
