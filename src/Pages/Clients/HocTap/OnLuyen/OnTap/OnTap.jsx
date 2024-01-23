import { useEffect, useState } from 'react'

import CommonLayout from '@/Layouts/Common/CommonLayout'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { getAllMonHocThiThu } from '@/Apis/HocTap/apiOnLuyenThiThu'

import { breadcrumbs, home } from './constants'
import HocKy from '@/Components/HocTap/OnTap/HocKy'
import { useMemo } from 'react'
import { hocTapSidebar } from '../../constants'
import XacNhanThi from '@/Components/HocTap/Promt/XacNhanThi'
import XacNhanNopBai from '@/Components/HocTap/Promt/XacNhanNopBai'
import KetQuaThi from '@/Components/HocTap/Promt/KetQuaThi'

export default function OnTap() {
    const [listMonHoc, setListMonHoc] = useState([])

    const dataSV = DataSinhVien()

    const danhSachMonHocTheoHocKy = useMemo(() => {
        return listMonHoc.reduce((result, monHoc) => {
            if (Object.prototype.hasOwnProperty.call(result, monHoc.TenDot)) {
                result[monHoc.TenDot].push(monHoc)
            } else {
                result[monHoc.TenDot] = [monHoc]
            }

            return result
        }, {})
    }, [listMonHoc])

    useEffect(() => {
        getAllMonHocThiThu(dataSV.MaSinhVien).then((res) => {
            setListMonHoc(res?.data?.body)
        })

        return () => {
            setListMonHoc([])
        }
    }, [])

    return (
        <>
            <CommonLayout
                sidebar={hocTapSidebar}
                breadcrumbs={breadcrumbs}
                home={home}
            >
                {Object.keys(danhSachMonHocTheoHocKy).map((hk, index) => (
                    <HocKy
                        key={index}
                        hocKy={hk}
                        linkTo="danhsachcauhoi"
                        listMonHoc={danhSachMonHocTheoHocKy[hk]}
                    />
                ))}
            </CommonLayout>
        </>
    )
}
