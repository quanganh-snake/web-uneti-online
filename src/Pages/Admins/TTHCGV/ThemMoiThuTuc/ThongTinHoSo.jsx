import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { BiChevronDown } from 'react-icons/bi'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaArrowRight } from 'react-icons/fa6'
import { convertDataFileToBase64 } from '../../../../Services/Utils/stringUtils'
import { MdDelete } from 'react-icons/md'
import { handleOpenFileBase64 } from '../../../../Services/Utils/fileUtils'
import Swal from 'sweetalert2'
const ThongTinHoSo = memo(function ThongTinHoSo(props) {
    const {
        inputTenThuTucRef,
        inputMaThuTucRef,
        inputMucDoRef,
        inputTongThoiGianRef,
        inputDonViTiepNhanRef,
        inputNoiTraKetQuaRef,
        listMucDo,
        listDonViTiepNhan,
        listLinhVuc,
        tenThuTuc,
        viTri,
        maThuTuc,
        mucDo,
        tongThoiGianGiaiQuyet,
        soBoHoSo,
        linhVuc,
        setLinhVuc,
        donViTiepNhan,
        setDonViTiepNhan,
        noiTraKetQua,
        setNoiTraKetQua,
        diaChiNhanTraHoSo,
        thuTucLienThong,
        thuTucKhongApDungMotCua,
        canCuPhapLyCuaTTHC,
        dieuKienThucHien,
        dataFilesTepThuTuc,
        setDataFilesTepThuTuc,
        handleChangeValue,
        handleDeleteTepThuTuc,
        setTPHoSoDeNghiActive,
        setThongTinActive,
    } = props

    const [searchDonVi, setSearchDonVi] = useState('')
    const [searchLinhVuc, setSearchLinhVuc] = useState('')
    const [searchNoiTraKetQua, setSearchNoiTraKetQua] = useState('')
    const [openSelectDonVi, setOpenSelectDonVi] = useState(false)
    const [openSelectLinhVuc, setOpenSelectLinhVuc] = useState(false)
    const [openSelectNoiTraKetQua, setOpenSelectNoiTraKetQua] = useState(false)

    return (
        <div className="uneti-tthcgv__thongtinhoso mb-5">
            <h2 className="text-2xl font-semibold uppercase mb-4">
                Thiết lập thông tin hồ sơ
            </h2>
            <div className="grid grid-cols-4 gap-5">
                {/* START:  MC_TTHC_GV_TenThuTuc*/}
                <div className="col-span-4 lg:col-span-2">
                    <label htmlFor="MC_TTHC_GV_TenThuTuc">
                        <p className="font-semibold mb-2">
                            Tên thủ tục <span className="text-red-500">*</span>
                        </p>
                        <input
                            type="text"
                            placeholder="Nhập tên thủ tục..."
                            className="px-3 py-2 w-full rounded-full border border-slate-300 focus:outline-slate-300"
                            name="MC_TTHC_GV_TenThuTuc"
                            id="MC_TTHC_GV_TenThuTuc"
                            ref={inputTenThuTucRef}
                            value={tenThuTuc}
                            onChange={handleChangeValue}
                        />
                    </label>
                </div>
                {/* END:  MC_TTHC_GV_TenThuTuc*/}

                {/* START:  MC_TTHC_GV_ThuTu*/}
                <div className="col-span-4 lg:col-span-2">
                    <label htmlFor="MC_TTHC_GV_ThuTu">
                        <p className="font-semibold mb-2">Vị trí</p>
                        <input
                            type="number"
                            placeholder="Nhập vị trí sắp xếp hồ sơ..."
                            min={1}
                            className="px-3 py-2 w-full rounded-full border border-slate-300 focus:outline-slate-300"
                            name="MC_TTHC_GV_ThuTu"
                            id="MC_TTHC_GV_ThuTu"
                            value={viTri}
                            onChange={handleChangeValue}
                        />
                    </label>
                </div>
                {/* END:  MC_TTHC_GV_ThuTu*/}

                {/* START:  MC_TTHC_GV_MaThuTuc*/}
                <div className="col-span-4 lg:col-span-2">
                    <label htmlFor="MC_TTHC_GV_MaThuTuc">
                        <p className="font-semibold mb-2">
                            Mã thủ tục <span className="text-red-500">*</span>
                        </p>
                        <input
                            type="text"
                            placeholder="Nhập mã thủ tục..."
                            className="px-3 py-2 w-full rounded-full border border-slate-300 focus:outline-slate-300"
                            name="MC_TTHC_GV_MaThuTuc"
                            id="MC_TTHC_GV_MaThuTuc"
                            ref={inputMaThuTucRef}
                            value={maThuTuc}
                            onChange={handleChangeValue}
                        />
                    </label>
                </div>
                {/* END:  MC_TTHC_GV_MaThuTuc*/}

                {/* START:  MC_TTHC_GV_IDMucDo*/}
                <div className="col-span-4 lg:col-span-2">
                    <label htmlFor="MC_TTHC_GV_IDMucDo">
                        <p className="font-semibold mb-2">
                            Mức độ <span className="text-red-500">*</span>
                        </p>
                        <select
                            className="px-3 py-2 w-full rounded-full border border-slate-300 focus:outline-slate-300"
                            name="MC_TTHC_GV_IDMucDo"
                            id="MC_TTHC_GV_IDMucDo"
                            ref={inputMucDoRef}
                            defaultValue={mucDo}
                            onChange={handleChangeValue}
                        >
                            <option value="">Chọn mức độ</option>
                            {listMucDo &&
                                listMucDo.map((iMucDo, index) => {
                                    return (
                                        <option
                                            key={iMucDo.MC_TTHC_GV_MucDo_ID}
                                            value={iMucDo.MC_TTHC_GV_MucDo_ID}
                                        >
                                            {index +
                                                1 +
                                                ' - ' +
                                                iMucDo.MC_TTHC_GV_MucDo_MoTa}
                                        </option>
                                    )
                                })}
                        </select>
                    </label>
                </div>
                {/* END:  MC_TTHC_GV_IDMucDo*/}

                {/* START:  MC_TTHC_GV_CanCuPhapLyCuaTTHC*/}
                <div className="col-span-4 lg:col-span-2">
                    <label htmlFor="MC_TTHC_GV_CanCuPhapLyCuaTTHC">
                        <p className="font-semibold mb-2">
                            Căn cứ pháp lý của TTHC
                        </p>
                        <input
                            type="text"
                            placeholder="Nhập căn cứ pháp lý của TTHC..."
                            className="px-3 py-2 w-full rounded-full border border-slate-300 focus:outline-slate-300"
                            name="MC_TTHC_GV_CanCuPhapLyCuaTTHC"
                            id="MC_TTHC_GV_CanCuPhapLyCuaTTHC"
                            value={canCuPhapLyCuaTTHC}
                            onChange={handleChangeValue}
                        />
                    </label>
                </div>
                {/* END:  MC_TTHC_GV_CanCuPhapLyCuaTTHC*/}

                {/* START:  MC_TTHC_GV_DieuKienThucHien*/}
                <div className="col-span-4 lg:col-span-2">
                    <label htmlFor="MC_TTHC_GV_DieuKienThucHien">
                        <p className="font-semibold mb-2">
                            Điều kiện thực hiện của TTHC
                        </p>
                        <input
                            type="text"
                            placeholder="Nhập điều kiện thực hiện của TTHC..."
                            className="px-3 py-2 w-full rounded-full border border-slate-300 focus:outline-slate-300"
                            name="MC_TTHC_GV_DieuKienThucHien"
                            id="MC_TTHC_GV_DieuKienThucHien"
                            value={dieuKienThucHien}
                            onChange={handleChangeValue}
                        />
                    </label>
                </div>
                {/* END:  MC_TTHC_GV_DieuKienThucHien*/}

                {/* START:  MC_TTHC_GV_TongThoiGianGiaiQuyet*/}
                <div className="col-span-4 lg:col-span-2">
                    <label
                        htmlFor="MC_TTHC_GV_TongThoiGianGiaiQuyet"
                        className="flex flex-col"
                    >
                        <p className="font-semibold mb-2 lg:whitespace-nowrap">
                            Tổng thời gian giải quyết (trong giờ HC){' '}
                            <span className="text-red-500">*</span>
                        </p>
                        <div className="flex flex-row items-center justify-between w-full gap-2">
                            <input
                                type="number"
                                placeholder="Số ngày giải quyết"
                                min={0}
                                className="px-3 py-2 rounded-full w-full border border-slate-300 focus:outline-slate-300"
                                name="MC_TTHC_GV_TongThoiGianGiaiQuyet"
                                id="MC_TTHC_GV_TongThoiGianGiaiQuyet"
                                ref={inputTongThoiGianRef}
                                value={tongThoiGianGiaiQuyet}
                                onChange={handleChangeValue}
                            />
                            <span className="font-bold">Ngày</span>
                        </div>
                    </label>
                </div>
                {/* END:  MC_TTHC_GV_TongThoiGianGiaiQuyet*/}

                {/* START:  MC_TTHC_GV_SoBoHoSo*/}
                <div className="col-span-4 lg:col-span-2">
                    <label htmlFor="MC_TTHC_GV_SoBoHoSo">
                        <p className="font-semibold mb-2">
                            Số bộ hồ sơ kèm theo
                        </p>
                        <input
                            type="number"
                            placeholder="Số bộ hồ sơ"
                            min={0}
                            className="px-3 py-2 rounded-full w-full border border-slate-300 focus:outline-slate-300"
                            name="MC_TTHC_GV_SoBoHoSo"
                            id="MC_TTHC_GV_SoBoHoSo"
                            value={soBoHoSo}
                            onChange={handleChangeValue}
                        />
                    </label>
                </div>
                {/* END:  MC_TTHC_GV_SoBoHoSo*/}

                {/* START:  MC_TTHC_GV_LinhVuc*/}
                <div className="col-span-4 lg:col-span-2">
                    <label htmlFor="MC_TTHC_GV_LinhVuc">
                        <p className="font-semibold mb-2">Lĩnh vực</p>
                        <div className="col-span-4 md:col-span-2 relative">
                            <div
                                id="MC_TTHC_GV_LinhVuc"
                                onClick={() => {
                                    setOpenSelectLinhVuc(!openSelectLinhVuc)
                                }}
                                className="bg-white w-full p-2 flex items-center justify-between rounded-md border border-slate-300 cursor-pointer"
                            >
                                <span
                                    className={clsx(
                                        linhVuc &&
                                            'text-gray-700 font-semibold',
                                    )}
                                >
                                    {linhVuc
                                        ? linhVuc
                                        : 'Chọn lĩnh vực thủ tục'}
                                </span>
                                <BiChevronDown
                                    size={20}
                                    className={clsx(
                                        openSelectLinhVuc && 'rotate-180',
                                    )}
                                />
                            </div>
                            <ul
                                className={clsx(
                                    'bg-white mt-2 border shadow-lg overflow-y-auto absolute right-0 left-0 top-full z-10',
                                    openSelectLinhVuc ? 'max-h-60' : 'hidden',
                                )}
                            >
                                <div className="flex items-center px-2 sticky top-0 bg-white shadow-md">
                                    <AiOutlineSearch
                                        size={18}
                                        className="text-gray-700"
                                    />
                                    <input
                                        type="text"
                                        value={searchLinhVuc}
                                        onChange={(e) => {
                                            setSearchLinhVuc(e.target.value)
                                        }}
                                        placeholder="Nhập tên đơn vị"
                                        className="w-full placeholder:text-gray-500 p-2 outline-none"
                                    />
                                </div>
                                {searchLinhVuc ? (
                                    <li
                                        className={clsx(
                                            'font-semibold px-2 py-3 text-sm cursor-pointer hover:bg-sky-600 hover:text-white',
                                        )}
                                        onClick={() => {
                                            setLinhVuc(searchLinhVuc)
                                            setOpenSelectLinhVuc(false)
                                            setSearchLinhVuc('')
                                        }}
                                    >
                                        {searchLinhVuc}
                                    </li>
                                ) : null}
                                {listLinhVuc &&
                                    listLinhVuc?.map((iLinhVuc, index) => {
                                        return (
                                            <li
                                                key={index}
                                                className={clsx(
                                                    'p-2 text-sm cursor-pointer hover:bg-sky-600 hover:text-white',
                                                    iLinhVuc?.MC_TTHC_GV_LinhVuc.toLowerCase().includes(
                                                        searchLinhVuc,
                                                    )
                                                        ? 'block'
                                                        : 'hidden',
                                                )}
                                                onClick={() => {
                                                    setLinhVuc(
                                                        iLinhVuc?.MC_TTHC_GV_LinhVuc,
                                                    )
                                                    setOpenSelectLinhVuc(false)
                                                    setSearchLinhVuc('')
                                                }}
                                            >
                                                {iLinhVuc?.MC_TTHC_GV_LinhVuc}
                                            </li>
                                        )
                                    })}
                            </ul>
                        </div>
                    </label>
                </div>
                {/* END:  MC_TTHC_GV_LinhVuc*/}

                {/* START:  MC_TTHC_GV_NoiTiepNhan*/}
                <div className="col-span-4 md:col-span-2">
                    <label htmlFor="MC_TTHC_GV_NoiTiepNhan">
                        <p className="font-semibold mb-2">
                            Đơn vị tiếp nhận{' '}
                            <span className="text-red-500">*</span>
                        </p>
                        <div className="col-span-4 md:col-span-2 relative">
                            <div
                                id="MC_TTHC_GV_PhanQuyen_DonVi"
                                ref={inputDonViTiepNhanRef}
                                onClick={() => {
                                    setOpenSelectDonVi(!openSelectDonVi)
                                }}
                                className="bg-white w-full p-2 flex items-center justify-between rounded-md border border-slate-300 cursor-pointer"
                            >
                                <span
                                    className={clsx(
                                        donViTiepNhan &&
                                            'text-gray-700 font-semibold',
                                    )}
                                >
                                    {donViTiepNhan
                                        ? donViTiepNhan
                                        : 'Chọn đơn vị tiếp nhận'}
                                </span>
                                <BiChevronDown
                                    size={20}
                                    className={clsx(
                                        openSelectDonVi && 'rotate-180',
                                    )}
                                />
                            </div>
                            <ul
                                className={clsx(
                                    'bg-white mt-2 border shadow-sm overflow-y-auto absolute right-0 left-0 top-full',
                                    openSelectDonVi ? 'max-h-60' : 'hidden',
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
                                        placeholder="Nhập tên đơn vị"
                                        className="w-full placeholder:text-gray-500 p-2 outline-none"
                                    />
                                </div>
                                {listDonViTiepNhan &&
                                    listDonViTiepNhan?.map((iDonVi, index) => {
                                        return (
                                            <li
                                                key={index}
                                                className={clsx(
                                                    'p-2 text-sm cursor-pointer hover:bg-sky-600 hover:text-white',
                                                    iDonVi?.TenPhongBan.toLowerCase().includes(
                                                        searchDonVi,
                                                    )
                                                        ? 'block'
                                                        : 'hidden',
                                                )}
                                                onClick={() => {
                                                    setDonViTiepNhan(
                                                        iDonVi?.TenPhongBan,
                                                    )
                                                    setOpenSelectDonVi(false)
                                                    setSearchDonVi('')
                                                }}
                                            >
                                                {iDonVi?.TenPhongBan}
                                            </li>
                                        )
                                    })}
                            </ul>
                        </div>
                    </label>
                </div>
                {/* END:  MC_TTHC_GV_NoiTiepNhan*/}

                {/* START:  MC_TTHC_GV_NoiTraKetQua*/}
                <div className="col-span-4 md:col-span-2">
                    <label htmlFor="MC_TTHC_GV_NoiTraKetQua">
                        <p className="font-semibold mb-2">
                            Nơi trả kết quả{' '}
                            <span className="text-red-500">*</span>
                        </p>
                        <div className="col-span-4 md:col-span-2 relative">
                            <div
                                id="MC_TTHC_GV_NoiTraKetQua"
                                ref={inputNoiTraKetQuaRef}
                                onClick={() => {
                                    setOpenSelectNoiTraKetQua(
                                        !openSelectNoiTraKetQua,
                                    )
                                }}
                                className="bg-white w-full p-2 flex items-center justify-between rounded-md border border-slate-300 cursor-pointer"
                            >
                                <span
                                    className={clsx(
                                        noiTraKetQua &&
                                            'text-gray-700 font-semibold',
                                    )}
                                >
                                    {noiTraKetQua
                                        ? noiTraKetQua
                                        : 'Chọn nơi trả kết quả'}
                                </span>
                                <BiChevronDown
                                    size={20}
                                    className={clsx(
                                        openSelectNoiTraKetQua && 'rotate-180',
                                    )}
                                />
                            </div>
                            <ul
                                className={clsx(
                                    'bg-white mt-2 border shadow-sm overflow-y-auto absolute right-0 left-0 top-full',
                                    openSelectNoiTraKetQua
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
                                        value={searchNoiTraKetQua}
                                        onChange={(e) => {
                                            setSearchNoiTraKetQua(
                                                e.target.value,
                                            )
                                        }}
                                        placeholder="Nhập nơi trả kết quả..."
                                        className="w-full placeholder:text-gray-500 p-2 outline-none"
                                    />
                                </div>
                                {searchNoiTraKetQua ? (
                                    <li
                                        className={clsx(
                                            'font-semibold px-2 py-3 text-sm cursor-pointer hover:bg-sky-600 hover:text-white',
                                        )}
                                        onClick={() => {
                                            setNoiTraKetQua(searchNoiTraKetQua)
                                            setOpenSelectNoiTraKetQua(false)
                                            setSearchNoiTraKetQua('')
                                        }}
                                    >
                                        {searchNoiTraKetQua}
                                    </li>
                                ) : null}
                                {diaChiNhanTraHoSo &&
                                    diaChiNhanTraHoSo?.map((iDiaChi, index) => {
                                        return (
                                            <li
                                                key={index}
                                                className={clsx(
                                                    'p-2 text-sm cursor-pointer hover:bg-sky-600 hover:text-white',
                                                    iDiaChi?.MC_TTHC_GV_NoiTraKetQua.toLowerCase().includes(
                                                        searchNoiTraKetQua,
                                                    )
                                                        ? 'block'
                                                        : 'hidden',
                                                )}
                                                onClick={() => {
                                                    setNoiTraKetQua(
                                                        iDiaChi?.MC_TTHC_GV_NoiTraKetQua,
                                                    )
                                                    setOpenSelectNoiTraKetQua(
                                                        false,
                                                    )
                                                    setSearchNoiTraKetQua('')
                                                }}
                                            >
                                                {
                                                    iDiaChi?.MC_TTHC_GV_NoiTraKetQua
                                                }
                                            </li>
                                        )
                                    })}
                            </ul>
                        </div>
                    </label>
                </div>
                {/* END:  MC_TTHC_GV_NoiTraKetQua*/}

                {/* START:  MC_TTHC_GV_ThuTucLienThong*/}
                <div className="col-span-4 flex flex-row gap-3 items-center">
                    <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        name="MC_TTHC_GV_ThuTucLienThong"
                        id="MC_TTHC_GV_ThuTucLienThong"
                        checked={thuTucLienThong}
                        onChange={handleChangeValue}
                    />
                    <label
                        htmlFor="MC_TTHC_GV_ThuTucLienThong"
                        className="cursor-pointer"
                    >
                        <span className="font-semibold">
                            Thủ tục liên thông
                        </span>
                    </label>
                </div>
                {/* END:  MC_TTHC_GV_ThuTucLienThong*/}

                {/* START:  MC_TTHC_GV_ThuTucKhongApDungMC*/}
                <div className="col-span-4 flex flex-row gap-3 items-center">
                    <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        name="MC_TTHC_GV_ThuTucKhongApDungMC"
                        id="MC_TTHC_GV_ThuTucKhongApDungMC"
                        checked={thuTucKhongApDungMotCua}
                        onChange={handleChangeValue}
                    />
                    <label
                        htmlFor="MC_TTHC_GV_ThuTucKhongApDungMC"
                        className="cursor-pointer"
                    >
                        <span className="font-semibold">
                            Thủ tục không áp dụng Một cửa
                        </span>
                    </label>
                </div>
                {/* END:  MC_TTHC_GV_ThuTucKhongApDungMC*/}

                {/* START:  MC_TTHC_GV_TepThuTuc*/}
                <div className="col-span-4 my-4">
                    <label
                        className=""
                        htmlFor="MC_TTHC_GV_TepThuTuc_DataFileFile"
                    >
                        <p className="font-semibold mb-2">
                            Tài liệu hướng dẫn (Nếu có)
                        </p>
                    </label>

                    {dataFilesTepThuTuc?.MC_TTHC_GV_TepThuTuc_TenFile ? (
                        <div className="my-4 p-2 border">
                            <p className="flex items-center justify-between gap-2">
                                <span
                                    className="text-sky-800 font-semibold hover:opacity-70 cursor-pointer"
                                    onClick={() => {
                                        handleOpenFileBase64(
                                            dataFilesTepThuTuc?.MC_TTHC_GV_TepThuTuc_DataFileFile,
                                        )
                                    }}
                                >
                                    {
                                        dataFilesTepThuTuc?.MC_TTHC_GV_TepThuTuc_TenFile
                                    }
                                </span>
                                <span>
                                    <MdDelete
                                        className="cursor-pointer hover:text-red-600"
                                        onClick={handleDeleteTepThuTuc}
                                    />
                                </span>
                            </p>
                        </div>
                    ) : (
                        <>
                            <label
                                htmlFor="MC_TTHC_GV_TepThuTuc"
                                className="block w-full cursor-pointer hover:bg-slate-600 hover:text-white p-2 border border-gray-600 hover:border-gray-600"
                            >
                                <span className="font-semibold p-1 border">
                                    Chọn tệp
                                </span>{' '}
                                <span className="text-sm ml-2">
                                    Chưa có tệp nào được tải lên
                                </span>
                            </label>
                            <input
                                type="file"
                                className="hidden w-full text-sm text-gray-900 border border-gray-300 p-2 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 hover:bg-sky-800 hover:text-white"
                                onChange={async (e) => {
                                    const file = e.target.files[0]
                                    const dataFile =
                                        await convertDataFileToBase64(file)
                                    const maxSizeInBytes = 5 * 1024 * 1024 // 5MB
                                    if (
                                        !file.name.match(
                                            /\.(pdf|docx|doc|jpeg|jpg|png|gif)$/i,
                                        )
                                    ) {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Tệp tải lên không đúng định dạng yêu cầu. Vui lòng kiểm tra lại.',
                                            text: 'Các loại file tải lên phải có dạng PDF, DOC, DOCX, PNG, JPG, JPEG hoặc GIF(Kích thước tối đa 5MB)',
                                        })
                                        setDataFilesTepThuTuc(null)
                                        return
                                    } else {
                                        if (file.size > maxSizeInBytes) {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Tệp tải lên vượt quá kích thước cho phép!',
                                                text: 'Kích thước tối đa 5MB.',
                                            })
                                            setDataFilesTepThuTuc(null)
                                            return
                                        } else {
                                            setDataFilesTepThuTuc({
                                                MC_TTHC_GV_TepThuTuc_TenFile:
                                                    file.name,
                                                MC_TTHC_GV_TepThuTuc_DataFileFile:
                                                    dataFile,
                                            })
                                        }
                                    }
                                }}
                                name=""
                                id="MC_TTHC_GV_TepThuTuc"
                            />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                Các loại file tải lên phải có dạng{' '}
                                <span className="font-medium">PDF</span>,{' '}
                                <span className="font-medium">DOC</span>,{' '}
                                <span className="font-medium">DOCX</span>,{' '}
                                <span className="font-medium">PNG</span>,{' '}
                                <span className="font-medium">JPG</span>,{' '}
                                <span className="font-medium">JPEG</span> hoặc{' '}
                                <span className="font-medium">GIF</span>
                                <span className="ml-1 font-medium text-red-600">
                                    (Kích thước tối đa 5MB)
                                </span>
                            </p>
                        </>
                    )}
                </div>
                {/* END:  MC_TTHC_GV_TepThuTuc*/}
            </div>
            <button
                type="button"
                onClick={() => {
                    setTPHoSoDeNghiActive(true)
                    setThongTinActive(false)
                }}
                className="flex items-center gap-2 px-3 py-2 font-semibold text-md bg-teal-600 text-white rounded-lg hover:opacity-70"
            >
                Tiếp tục thiết lập
                <FaArrowRight />
            </button>
        </div>
    )
})

ThongTinHoSo.propTypes = {
    listMucDo: PropTypes.array,
    tenThuTuc: PropTypes.string,
    viTri: PropTypes.string,
    maThuTuc: PropTypes.string,
    mucDo: PropTypes.string,
    tongThoiGianGiaiQuyet: PropTypes.string,
    linhVuc: PropTypes.string,
    donViTiepNhan: PropTypes.string,
    noiTraKetQua: PropTypes.string,
    thuTucLienThong: PropTypes.bool,
    thuTucKhongApDungMotCua: PropTypes.bool,
    handleChangeValue: PropTypes.func,
}

export default ThongTinHoSo
