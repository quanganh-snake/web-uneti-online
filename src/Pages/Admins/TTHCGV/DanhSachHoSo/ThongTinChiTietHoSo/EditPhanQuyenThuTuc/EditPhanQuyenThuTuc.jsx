import { postPhanQuyenTTHCGV } from '@/Apis/ThuTucHanhChinhGiangVien/apiPhanQuyen'
import {
    getAllNhanSuByTenPhongBan,
    getAllPhongBan,
} from '@/Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'
import { MdClose } from 'react-icons/md'
import Swal from 'sweetalert2'

export const EditPhanQuyenThuTuc = (props) => {
    const {
        idTTHCGoc,
        onLoading,
        onGetDataDetailHoSoThuTuc,
        onShowEditPhanQuyen,
    } = props
    const [phanQuyen, setPhanQuyen] = useState([])

    const [listDonViThucHien, setListDonViThucHien] = useState([])
    const [listNhanSuThucHien, setListNhanSuThucHien] = useState([])

    const [donViSelected, setDonViSelected] = useState({})
    const [searchDonVi, setSearchDonVi] = useState('')

    const [inputToThucHien, setInputToThucHien] = useState('')
    const [inputNhomThucHien, setInputNhomThucHien] = useState('')

    const [nhanSuSelected, setNhanSuSelected] = useState([])
    const [searchNhanSu, setSearchNhanSu] = useState('')

    const [openSelectDonVi, setOpenSelectDonVi] = useState(false)
    const [openSelectNhanSu, setOpenSelectNhanSu] = useState(false)

    // fetch data
    const getListDepartments = async () => {
        const resultGetListDepartments = await getAllPhongBan()
        if (resultGetListDepartments.status === 200) {
            const dataListDepartments = resultGetListDepartments.data.body
            if (dataListDepartments && dataListDepartments.length) {
                setListDonViThucHien(dataListDepartments)
            }
        }
    }

    const getListPersonnel = async () => {
        const resultGetListPersonnel = await getAllNhanSuByTenPhongBan(
            donViSelected?.TenPhongBan,
        )
        if (resultGetListPersonnel.status === 200) {
            const dataListPersonnel = await resultGetListPersonnel?.data?.body
            if (dataListPersonnel && dataListPersonnel?.length) {
                setListNhanSuThucHien(dataListPersonnel)
            }
        }
    }

    // event handlers
    const handleSelectData = (value, idSelect) => {
        if (idSelect === 'donvi') {
            setDonViSelected(value)
        }

        if (idSelect === 'nhansu') {
            setNhanSuSelected(value)
            let dataNhanSuPhanQuyen = {
                ...value,
                MC_TTHC_GV_PhanQuyen_IDTTHC: idTTHCGoc.toString(),
                MC_TTHC_GV_PhanQuyen_DonVi: donViSelected?.TenPhongBan
                    ? donViSelected?.TenPhongBan
                    : '',
                MC_TTHC_GV_PhanQuyen_To: inputToThucHien,
                MC_TTHC_GV_PhanQuyen_Nhom: inputNhomThucHien,
                MC_TTHC_GV_PhanQuyen_QuyenFull: true,
                MC_TTHC_GV_PhanQuyen_QuyenXem: true,
                MC_TTHC_GV_PhanQuyen_QuyenThem: true,
                MC_TTHC_GV_PhanQuyen_QuyenSua: true,
                MC_TTHC_GV_PhanQuyen_QuyenXoa: true,
            }
            setPhanQuyen([...phanQuyen, dataNhanSuPhanQuyen])
        }
    }

    const handleSave = () => {
        onLoading(true)
        try {
            if (phanQuyen.length > 0) {
                postPhanQuyenTTHCGV(phanQuyen)
                    .then((res) => {
                        onLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Thêm phân quyền thành công',
                        })
                        onGetDataDetailHoSoThuTuc()
                        onShowEditPhanQuyen(false)
                    })
                    .catch((err) => {
                        onLoading(false)
                        console.log('>>> Failed to save: ', err.message)
                    })
            } else {
                onLoading(false)
                return Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Vui lòng chọn ít nhất 1 nhân sự để cấp quyền xử lý hồ sơ!',
                })
            }
        } catch (error) {
            onLoading(false)
            console.log('>>> Failed:', error.message)
        }
    }

    // effects
    useEffect(() => {
        getListDepartments()
    }, [])

    useEffect(() => {
        getListPersonnel()
    }, [donViSelected])

    return (
        <div className="bg-slate-500 bg-opacity-25 fixed inset-0 z-10 w-full h-full max-h-full flex justify-center items-center">
            {/* Main modal */}
            <div
                id="default-modal"
                tabIndex={-1}
                aria-hidden="true"
                className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full"
            >
                <div className="p-4 w-full lg:w-1/2">
                    {/* Modal content */}
                    <div className="bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Thêm phân quyền xử lý hồ sơ mới
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="default-modal"
                                onClick={() => {
                                    onShowEditPhanQuyen(false)
                                }}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="grid grid-cols-4 gap-5 p-4 md:p-5 mb-4">
                            {/* START: Select Đơn Vị Thực Hiện */}
                            <div className="col-span-4 md:col-span-2">
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="MC_TTHC_GV_PhanQuyen_DonVi"
                                        className="font-semibold"
                                    >
                                        Đơn vị thực hiện
                                    </label>
                                    <div className="col-span-4 md:col-span-2 relative">
                                        <div
                                            id="MC_TTHC_GV_PhanQuyen_DonVi"
                                            onClick={() => {
                                                setOpenSelectDonVi(
                                                    !openSelectDonVi,
                                                )
                                            }}
                                            className="bg-white w-full p-2 flex items-center justify-between rounded-md border border-slate-300 cursor-pointer"
                                        >
                                            <span
                                                className={clsx(
                                                    donViSelected &&
                                                        'text-gray-700 font-semibold',
                                                )}
                                            >
                                                {' '}
                                                {donViSelected?.TenPhongBan
                                                    ? donViSelected?.TenPhongBan
                                                          ?.length > 50
                                                        ? donViSelected?.TenPhongBan?.substring(
                                                              0,
                                                              50,
                                                          ) + '...'
                                                        : donViSelected?.TenPhongBan
                                                    : 'Chọn đơn vị thực hiện'}{' '}
                                            </span>
                                            <BiChevronDown
                                                size={20}
                                                className={clsx(
                                                    openSelectDonVi &&
                                                        'rotate-180',
                                                )}
                                            />
                                        </div>
                                        <ul
                                            className={clsx(
                                                'bg-white mt-2 border shadow-md overflow-y-auto absolute right-0 left-0 top-full',
                                                openSelectDonVi
                                                    ? 'max-h-60'
                                                    : 'hidden',
                                            )}
                                        >
                                            <div className="flex items-center px-2 sticky top-0 bg-white shadow-md">
                                                <AiOutlineSearch
                                                    size={18}
                                                    className="text-gray-700"
                                                />
                                                <input
                                                    type="text"
                                                    value={searchDonVi}
                                                    onChange={(e) => {
                                                        setSearchDonVi(
                                                            e.target.value.toLowerCase(),
                                                        )
                                                    }}
                                                    placeholder="Nhập tên phòng ban"
                                                    className="w-full placeholder:text-gray-500 p-2 outline-none"
                                                />
                                            </div>
                                            {listDonViThucHien?.length &&
                                                listDonViThucHien?.map(
                                                    (iDonVi, index) => (
                                                        <li
                                                            key={index}
                                                            className={clsx(
                                                                'p-2 text-sm cursor-pointer hover:bg-sky-600 hover:text-white',
                                                                iDonVi?.TenPhongBan.toLowerCase().includes(
                                                                    searchDonVi,
                                                                )
                                                                    ? 'block'
                                                                    : 'hidden',
                                                                iDonVi?.TenPhongBan.toLowerCase() ===
                                                                    donViSelected?.TenPhongBan?.toLowerCase() &&
                                                                    'bg-sky-600 text-white font-medium',
                                                            )}
                                                            onClick={() => {
                                                                handleSelectData(
                                                                    iDonVi,
                                                                    'donvi',
                                                                )
                                                                setOpenSelectDonVi(
                                                                    false,
                                                                )
                                                                setSearchDonVi(
                                                                    '',
                                                                )
                                                            }}
                                                        >
                                                            {
                                                                iDonVi?.TenPhongBan
                                                            }
                                                        </li>
                                                    ),
                                                )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* END: Select Đơn Vị Thực Hiện */}
                            {/* START: Select Tổ nghiệp vụ */}
                            <div className="col-span-4 md:col-span-2">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="MC_TTHC_GV_PhanQuyen_To">
                                        <p className="font-semibold mb-2">
                                            Tổ nghiệp vụ (Nếu có)
                                        </p>
                                        <input
                                            className="px-3 py-2 w-full rounded-lg border border-slate-300 focus:outline-slate-300"
                                            type="text"
                                            placeholder="Nhập tổ nghiệp vụ"
                                            name="MC_TTHC_GV_PhanQuyen_To"
                                            id="MC_TTHC_GV_PhanQuyen_To"
                                            onChange={(e) => {
                                                setInputToThucHien(
                                                    e.target.value,
                                                )
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                            {/* END: Select Tổ nghiệp vụ */}

                            {/* START: Select Nhóm thực hiện */}
                            <div className="col-span-4 md:col-span-2">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="MC_TTHC_GV_PhanQuyen_Nhom">
                                        <p className="font-semibold mb-2">
                                            Nhóm thực hiện (Nếu có)
                                        </p>
                                        <input
                                            className="px-3 py-2 w-full rounded-lg border border-slate-300 focus:outline-slate-300"
                                            type="text"
                                            placeholder="Nhập nhóm thực hiện"
                                            name="MC_TTHC_GV_PhanQuyen_Nhom"
                                            id="MC_TTHC_GV_PhanQuyen_Nhom"
                                            onChange={(e) => {
                                                setInputNhomThucHien(
                                                    e.target.value,
                                                )
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                            {/* END: Select Nhóm thực hiện */}

                            {/* START: Select Nhân sự thực hiện */}
                            <div className="col-span-4 md:col-span-2">
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="MC_TTHC_GV_PhanQuyen_HoTen"
                                        className="font-semibold"
                                    >
                                        <p>
                                            Chọn nhân sự thực hiện{' '}
                                            <span className="text-red-500 font-semibold">
                                                *
                                            </span>
                                        </p>
                                    </label>
                                    <div className="col-span-4 md:col-span-2 relative">
                                        <div
                                            id="MC_TTHC_GV_PhanQuyen_DonVi"
                                            onClick={() => {
                                                setOpenSelectNhanSu(
                                                    !openSelectNhanSu,
                                                )
                                            }}
                                            className="bg-white w-full p-2 flex items-center justify-between rounded-md border border-slate-300 cursor-pointer"
                                        >
                                            <span
                                                className={clsx(
                                                    nhanSuSelected &&
                                                        'text-gray-700 font-semibold',
                                                )}
                                            >
                                                Chọn nhân sự thực hiện
                                            </span>
                                            <BiChevronDown
                                                size={20}
                                                className={clsx(
                                                    openSelectNhanSu &&
                                                        'rotate-180',
                                                )}
                                            />
                                        </div>
                                        <ul
                                            className={clsx(
                                                'bg-white mt-2 border shadow-sm overflow-y-auto absolute right-0 left-0 top-full',
                                                openSelectNhanSu
                                                    ? 'max-h-60'
                                                    : 'hidden',
                                            )}
                                        >
                                            <div className="flex items-center px-2 sticky top-0 bg-white shadow-md">
                                                <AiOutlineSearch
                                                    size={18}
                                                    className="text-gray-700"
                                                />
                                                <input
                                                    type="text"
                                                    value={searchNhanSu}
                                                    onChange={(e) => {
                                                        setSearchNhanSu(
                                                            e.target.value.toLowerCase(),
                                                        )
                                                    }}
                                                    placeholder="Nhập tên nhân sự"
                                                    className="w-full placeholder:text-gray-500 p-2 outline-none"
                                                />
                                            </div>
                                            {listNhanSuThucHien &&
                                                listNhanSuThucHien?.map(
                                                    (iNhanSu, index) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                                className={clsx(
                                                                    'p-2 text-sm cursor-pointer hover:bg-sky-600 hover:text-white',
                                                                    iNhanSu?.HoVaTen.toLowerCase().includes(
                                                                        searchNhanSu,
                                                                    )
                                                                        ? 'block'
                                                                        : 'hidden',
                                                                    iNhanSu?.HoVaTen.toLowerCase() ===
                                                                        nhanSuSelected?.HoVaTen?.toLowerCase() &&
                                                                        'bg-sky-600 text-white font-medium',
                                                                )}
                                                                onClick={() => {
                                                                    handleSelectData(
                                                                        {
                                                                            MC_TTHC_GV_PhanQuyen_MaNhanSu:
                                                                                iNhanSu.MaNhanSu,
                                                                            MC_TTHC_GV_PhanQuyen_HoTen:
                                                                                iNhanSu.HoVaTen,
                                                                        },
                                                                        'nhansu',
                                                                    )
                                                                    setOpenSelectNhanSu(
                                                                        false,
                                                                    )
                                                                    setSearchNhanSu(
                                                                        '',
                                                                    )
                                                                }}
                                                            >
                                                                {iNhanSu?.MaNhanSu +
                                                                    ' - ' +
                                                                    iNhanSu?.HoVaTen}
                                                            </li>
                                                        )
                                                    },
                                                )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* END: Select Nhân sự thực hiện */}

                            {phanQuyen && phanQuyen.length ? (
                                <div className="col-span-4">
                                    <div className="flex flex-col gap-4">
                                        <h4>Danh sách nhân sự được chọn</h4>
                                        <div className="flex flex-wrap gap-2 p-2 border border-slate-500 rounded-md">
                                            {phanQuyen?.map(
                                                (iPhanQuyen, index) => {
                                                    return (
                                                        <p
                                                            key={index}
                                                            className="p-2 border rounded-md flex items-center gap-4"
                                                        >
                                                            <span>
                                                                {iPhanQuyen.MC_TTHC_GV_PhanQuyen_MaNhanSu +
                                                                    ' - ' +
                                                                    iPhanQuyen.MC_TTHC_GV_PhanQuyen_HoTen}
                                                            </span>
                                                            <MdClose
                                                                size={20}
                                                                color="red"
                                                                className="cursor-pointer hover:opacity-70"
                                                                onClick={() => {
                                                                    const newPhanQuyen =
                                                                        phanQuyen.splice(
                                                                            index,
                                                                            1,
                                                                        )
                                                                    setPhanQuyen(
                                                                        [
                                                                            ...phanQuyen,
                                                                        ],
                                                                    )
                                                                }}
                                                            />
                                                        </p>
                                                    )
                                                },
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        {/* Modal footer */}
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                                onClick={handleSave}
                                data-modal-hide="default-modal"
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Lưu
                            </button>
                            <button
                                data-modal-hide="default-modal"
                                type="button"
                                className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
