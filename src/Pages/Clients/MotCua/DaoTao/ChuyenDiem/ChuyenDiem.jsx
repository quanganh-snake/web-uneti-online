import React, { useEffect, useState } from 'react'
import ChuyenDiemView from './ChuyenDiemView'
import {
    getAllHocPhanChuyenDiem,
    getAllHocPhanTuongDuongChuyenDiem,
    getChuyenDiemID,
    getKiemTraTrungChuyenDiem,
    postChuyenDiem,
    postChuyenDiemChiTiet,
} from '@/Apis/MotCua/DaoTao/apiChuyenDiem'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { convertDataFileToBase64 } from '@/Services/Utils/stringUtils'
import Swal from 'sweetalert2'
import { isEmpty } from 'lodash-unified'
import {
    makeDataImages,
    makeDataSv,
    makePostDataSv,
    transformObjKey,
    transformSubmitValue,
} from '@/Services/Utils/dataSubmitUtils'

const CHUYEN_DIEM_PREFIX = 'MC_DT_ChuyenDiem_'
const CHUYEN_DIEM_FILE_PREFIX = `${CHUYEN_DIEM_PREFIX}YeuCau_`
const CHUYEN_DIEM_CHI_TIET_PREFIX = `${CHUYEN_DIEM_PREFIX}ChiTiet_`

function ChuyenDiem() {
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
            path: '/motcua/daotao/chuyendiem',
            title: 'Chuyển điểm',
        },
    ]

    const listLoaiDiem = [
        {
            value: 'Hệ 10',
            text: 'Hệ 10',
        },
        {
            value: 'Hệ 4',
            text: 'Hệ 4',
        },
    ]

    const xinChuyen = {
        value: '0',
        text: 'Học phần tương đương',
    }

    const [listHocPhan, setListHocPhan] = useState([])

    const [loaiDiem, setLoaiDiem] = useState(listLoaiDiem[0].value)
    const [lyDo, setLyDo] = useState(
        'Đề nghị công nhận kết quả học tập các học phần đã học cho học phần tương đương khác',
    )
    const [giayToKemTheo, setGiayToKemTheo] = useState('Đơn xin chuyển điểm')

    const [currentPage, setCurrentPage] = useState(1)

    const [hocPhan, setHocPhan] = useState({})

    const [listHocPhanTuongDuong, setListHocPhanTuongDuong] = useState([])

    const [hocPhanTuongDuong, setHocPhanTuongDuong] = useState({})

    const [files, setFiles] = useState([])

    const [chuyenDiemID, setChuyenDiemID] = useState('')

    const dataSV = DataSinhVien()

    const handleSelectHocPhan = (e, hp) => {
        setHocPhan(() => hp)
    }

    const handleSelectHocPhanTuongDuong = (e, hp) => {
        setHocPhanTuongDuong(() => hp)
    }

    const handleFilesChange = (file) => {
        setFiles((_files) => [..._files, file])
    }

    const handleRemoveFile = (file) => {
        setFiles((_files) => _files.filter((e) => e !== file))
    }

    useEffect(() => {
        getAllHocPhanChuyenDiem(dataSV.MaSinhVien).then((res) => {
            setListHocPhan(res?.data?.body)
        })

        getChuyenDiemID(dataSV.MaSinhVien).then((res) => {
            setChuyenDiemID(res?.data?.body[0].MC_DT_ChuyenDiem_ID.toString())
        })

        return () => {
            setListHocPhan([])
            setListHocPhanTuongDuong([])
            setHocPhanTuongDuong({})
            setFiles([])
            setChuyenDiemID('')
        }
    }, [])

    const handleChangePage = (e, page) => {
        setCurrentPage(() => page)
        setHocPhan(() => ({}))
        setHocPhanTuongDuong(() => ({}))
    }

    useEffect(() => {
        if (!isEmpty(hocPhan)) {
            getAllHocPhanTuongDuongChuyenDiem(
                dataSV.MaSinhVien,
                hocPhan.MC_DT_ChuyenDiem_ChiTiet_MaMonHoc,
            ).then((res) => {
                setListHocPhanTuongDuong(res?.data?.body)
            })
        }

        return () => {
            setListHocPhanTuongDuong([])
            setHocPhanTuongDuong({})
            setFiles([])
        }
    }, [hocPhan])

    const handleSubmitData = async (e) => {
        e.preventDefault()

        // if (isEmpty(hocPhan) || isEmpty(hocPhanTuongDuong)) {
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Lỗi',
        //     text: 'Vui lòng chọn học phần và học phần tương đương để gửi yêu cầu',
        //   })
        //   return
        // }

        const dataChuyenDiem = makePostDataSv(
            makeDataSv(dataSV, CHUYEN_DIEM_PREFIX),
            {
                YeuCau: '0',
                YeuCau_LyDo: transformSubmitValue(lyDo),
                YeuCau_LoaiBangDiem: transformSubmitValue(loaiDiem),
                YeuCau_KemTheo: transformSubmitValue(giayToKemTheo),
            },
            CHUYEN_DIEM_PREFIX,
        )
        dataChuyenDiem.images = await makeDataImages(
            files,
            CHUYEN_DIEM_FILE_PREFIX,
        )

        const dataChuyenDiemChiTiet = makePostDataSv(
            {
                MC_DT_ChuyenDiem_ID: transformSubmitValue(chuyenDiemID),
            },
            {
                IDDot: transformSubmitValue(
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_IDDot,
                ),
                IDLopHocPhan: transformSubmitValue(
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_IDLopHocPhan,
                ),
                NamHoc: transformSubmitValue(
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_NamHoc,
                ),
                HocKy: transformSubmitValue(
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_HocKy,
                ),
                MaMonHoc: transformSubmitValue(
                    hocPhanTuongDuong.HT_HPTD_MCD_MaMonHoc,
                ),
                MaHocPhan: transformSubmitValue(
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_MaHocPhan,
                ),
                TenMonHoc: transformSubmitValue(
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_TenMonHoc,
                ),
                GhiChuXetDuThi: transformSubmitValue(
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_GhiChuXetDuThi,
                ),
                TenLopHoc: transformSubmitValue(
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_TenLopHoc,
                ),
                SoTinChi: transformSubmitValue(
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_SoTinChi,
                ),
                DiemTBThuongKy: transformSubmitValue(
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemTBThuongKy,
                ),
                KhongTinhDiemTBC:
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_KhongTinhDiemTBC !== null
                        ? hocPhan.MC_DT_ChuyenDiem_ChiTiet_KhongTinhDiemTBC.toString()
                        : 'null',
                TenTrangThai: transformSubmitValue(
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_TenTrangThai,
                ),
                DiemThi: transformSubmitValue(
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemThi,
                ),
                DiemThi1: transformSubmitValue(
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemThi1,
                ),
                DiemThi2: transformSubmitValue(
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemThi2,
                ),
                DiemTongKet: transformSubmitValue(
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemTongKet,
                ),
                DiemTongKet1: transformSubmitValue(
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemTongKet1,
                ),
                DiemTongKet2: transformSubmitValue(
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemTongKet2,
                ),
                DiemTinChi: transformSubmitValue(
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemTinChi,
                ),
                DiemChu: transformSubmitValue(
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_DiemChu,
                ),
                XepLoai: transformSubmitValue(
                    hocPhan.MC_DT_ChuyenDiem_ChiTiet_XepLoai,
                ),
                MTD_BacDaoTao: transformSubmitValue(
                    hocPhanTuongDuong.HT_HPTD_MCD_BacDaoTao,
                ),
                MTD_MaMonHoc: transformSubmitValue(
                    hocPhanTuongDuong.HT_HPTD_MTD_MaMonHoc,
                ),
                MTD_TenMonHoc: transformSubmitValue(
                    hocPhanTuongDuong.HT_HPTD_MCD_TenMonHoc,
                ),
                MTD_SoTinChi: transformSubmitValue(
                    hocPhanTuongDuong.HT_HPTD_MTD_SoTinChi,
                ),
            },
            CHUYEN_DIEM_CHI_TIET_PREFIX,
        )

        // handle post
        Swal.fire({
            title: `Bạn chắc chắn muốn gửi yêu cầu chuyển điểm môn ${dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_MTD_TenMonHoc}?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Gửi',
            denyButtonText: `Hủy`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handlePostData(dataChuyenDiem, dataChuyenDiemChiTiet)
            } else if (result.isDenied) {
                Swal.fire(
                    'Đã hủy gửi yêu cầu hủy đăng ký chuyển điểm',
                    '',
                    'info',
                )
            }
        })
    }

    const handlePostData = async (dataChuyenDiem, dataChuyenDiemChiTiet) => {
        try {
            // kiểm tra trùng
            const checkTrungChuyenDiem = await getKiemTraTrungChuyenDiem(
                dataChuyenDiem.MC_DT_ChuyenDiem_MaSinhVien,
                dataChuyenDiem.MC_DT_ChuyenDiem_YeuCau,
                dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_HocKy,
                dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_MaMonHoc,
            )

            if (checkTrungChuyenDiem.status === 200) {
                if (checkTrungChuyenDiem.data?.body.length) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Thông báo trùng',
                        text: `Yêu cầu chuyển điểm môn ${dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_MTD_TenMonHoc} đã được gửi trước đấy. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
                    })
                    return
                }
            }

            // post
            const resPostDataChuyenDiem = await postChuyenDiem(dataChuyenDiem)
            if (resPostDataChuyenDiem == 'ERR_BAD_REQUEST') {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi hệ thống',
                    text: `Vui lòng thử lại và gửi thông báo lỗi cho bộ phận hỗ trợ phần mềm!`,
                })
                return
            }
            if (resPostDataChuyenDiem.status !== 200) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi hệ thống',
                    text: `Vui lòng thử lại và gửi thông báo lỗi cho bộ phận hỗ trợ phần mềm!`,
                })
                return
            }
            const resPostDataChuyenDiemChiTiet = await postChuyenDiemChiTiet(
                dataChuyenDiemChiTiet,
            )
            if (resPostDataChuyenDiemChiTiet == 'ERR_BAD_REQUEST') {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi hệ thống',
                    text: `Vui lòng thử lại và gửi thông báo lỗi cho bộ phận hỗ trợ phần mềm!`,
                })
                return
            }
            if (resPostDataChuyenDiemChiTiet.status !== 200) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi hệ thống',
                    text: `Vui lòng thử lại và gửi thông báo lỗi cho bộ phận hỗ trợ phần mềm!`,
                })
                return
            }

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Yêu cầu chuyển điểm môn ${dataChuyenDiemChiTiet.MC_DT_ChuyenDiem_ChiTiet_MTD_TenMonHoc} đã được gửi thành công. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
                showConfirmButton: false,
                timer: 1500,
            })

            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (error) {
            console.log(error)
            if (!error.response) {
                console.log(`Server not response.`)
            } else {
                console.log(`Error `, {
                    errorResponse: error.response,
                    errorMessage: error.message,
                })
            }
        }
    }

    return (
        <ChuyenDiemView
            home={home}
            breadcrumbs={breadcrumbs}
            xinChuyen={xinChuyen}
            listLoaiDiem={listLoaiDiem}
            loaiDiem={loaiDiem}
            setLoaiDiem={setLoaiDiem}
            lyDo={lyDo}
            setLyDo={setLyDo}
            giayToKemTheo={giayToKemTheo}
            setGiayToKemTheo={setGiayToKemTheo}
            listHocPhan={listHocPhan}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hocPhan={hocPhan}
            setHocPhan={setHocPhan}
            handleSelectHocPhan={handleSelectHocPhan}
            listHocPhanTuongDuong={listHocPhanTuongDuong}
            handleChangePage={handleChangePage}
            hocPhanTuongDuong={hocPhanTuongDuong}
            setHocPhanTuongDuong={setHocPhanTuongDuong}
            handleSelectHocPhanTuongDuong={handleSelectHocPhanTuongDuong}
            files={files}
            handleFilesChange={handleFilesChange}
            handleSubmitData={handleSubmitData}
            isEmpty={isEmpty}
            handleRemoveFile={handleRemoveFile}
        />
    )
}

export default ChuyenDiem
