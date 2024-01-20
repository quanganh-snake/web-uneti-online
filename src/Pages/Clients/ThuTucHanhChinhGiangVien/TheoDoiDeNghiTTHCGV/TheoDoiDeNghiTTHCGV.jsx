import React, { useEffect, useState } from 'react'
import {
    delThuTucHanhChinhGuiYeuCauByID,
    getListThuTucYeuCauByMaNhanSu,
} from '../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'
import { DataCanBoGV } from './../../../../Services/Utils/dataCanBoGV'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { changeSlug } from '../../../../Services/Utils/stringUtils'
import Swal from 'sweetalert2'

function TheoDoiDeNghiTTHCGV() {
    const dataCBGV = DataCanBoGV()
    const { MaNhanSu } = dataCBGV

    const [listHoSoYeuCau, setListHoSoYeuCau] = useState(null)
    // event handlers
    const fetchListThuTucByMaNhanSu = async () => {
        const res = await getListThuTucYeuCauByMaNhanSu(MaNhanSu)
        if (res.status === 200) {
            const data = await res.data?.body
            setListHoSoYeuCau(data)
        }
    }

    const handleHuyTraHoSo = async (idHoSoYeuCau) => {
        Swal.fire({
            icon: 'question',
            title: 'Bạn chắc chắn muốn hủy yêu cầu này?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy',
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    delThuTucHanhChinhGuiYeuCauByID(idHoSoYeuCau).then(
                        (res) => {
                            fetchListThuTucByMaNhanSu()
                            Swal.fire({
                                icon: 'success',
                                title: 'Hủy gửi yêu cầu hồ sơ thành công!',
                            })
                            return
                        },
                    )
                }
            })
            .catch((error) => {
                return Swal.fire({
                    icon: 'error',
                    title: 'Có lỗi xảy ra!',
                    text: 'Hủy gửi yêu cầu hồ sơ thất bại!',
                })
            })
    }

    // effects
    useEffect(() => {
        fetchListThuTucByMaNhanSu()
    }, [])
    return (
        <div clsx={'bg-white w-full h-[100vh]'}>
            {listHoSoYeuCau?.length < 1 && (
                <p className="p-2 text-center text-[#336699] border font-semibold">
                    Bạn chưa có yêu cầu đề nghị nào!
                </p>
            )}
            {listHoSoYeuCau?.length > 0 && (
                <div className="bg-white p-4 shadow-md rounded-lg w-full min-h-[500px]">
                    <h3 className="uppercase font-bold text-3xl text-center text-[#336699] mb-4">
                        Danh sách hồ sơ đã gửi
                    </h3>
                    <div className="w-full">
                        <table className="w-full">
                            <thead className="bg-[#336699] text-white">
                                <tr>
                                    <th className="w-[40px] p-2 border-r rounded-tl-xl">
                                        <p className="w-full">STT</p>
                                    </th>
                                    <th className="w-[180px] p-2 border">
                                        Tên thủ tục
                                    </th>
                                    <th className="w-[100px] p-2 border">
                                        Ngày gửi
                                    </th>
                                    <th className="w-[100px] p-2 border">
                                        Trạng thái
                                    </th>
                                    <th className="w-[120px] p-2 rounded-tr-xl"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listHoSoYeuCau?.map((iHoSo, index) => {
                                    let titleSlug = changeSlug(
                                        iHoSo?.MC_TTHC_GV_TenThuTuc,
                                    )
                                    return (
                                        <tr
                                            className="border hover:bg-slate-300"
                                            key={index}
                                        >
                                            <td className="border-r text-center">
                                                {index + 1}
                                            </td>
                                            <td className="border-r text-left px-2">
                                                <p>
                                                    {
                                                        iHoSo?.MC_TTHC_GV_TenThuTuc
                                                    }
                                                </p>
                                            </td>
                                            <td className="border-r text-center">
                                                <p>
                                                    {moment(
                                                        iHoSo?.MC_TTHC_GV_GuiYeuCau_NgayGui,
                                                    ).format('DD/MM/YYYY')}
                                                </p>
                                            </td>
                                            <td className="border-r text-center">
                                                <p>
                                                    {
                                                        iHoSo?.MC_TTHC_GV_TrangThai_TenTrangThai
                                                    }
                                                </p>
                                            </td>
                                            <td className="border-r text-center flex items-center justify-center gap-4 py-2">
                                                <Link
                                                    to={`/tthcgiangvien/theodoiquytrinh/chitiet/${titleSlug}/${iHoSo?.MC_TTHC_GV_GuiYeuCau_ID}`}
                                                    className="p-2 bg-[#336699] text-white rounded-full hover:opacity-70"
                                                >
                                                    Xem chi tiết
                                                </Link>
                                                {iHoSo?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID >
                                                0 ? (
                                                    ''
                                                ) : (
                                                    <p
                                                        className="p-2 bg-red-600 text-white rounded-full hover:opacity-70 cursor-pointer"
                                                        onClick={() => {
                                                            handleHuyTraHoSo(
                                                                iHoSo.MC_TTHC_GV_GuiYeuCau_ID,
                                                            )
                                                        }}
                                                    >
                                                        Hủy yêu cầu
                                                    </p>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TheoDoiDeNghiTTHCGV
