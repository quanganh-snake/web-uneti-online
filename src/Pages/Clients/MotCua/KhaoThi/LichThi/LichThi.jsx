import { useState } from 'react'
import Swal from 'sweetalert2'
import LichThiView from './LichThiView'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { dataLoaiThi } from '@/Services/Static/dataStatic'
import { useEffect } from 'react'
import { getTenDot } from '@/Apis/MotCua/apiTenDot'
import { isEqual } from 'lodash-unified'
import {
    getAllHocPhanLichThi,
    postYeuCauLichThi,
} from '@/Apis/MotCua/KhaoThi/apiLichThi'
import { required } from '@/Services/Validators/required'
import {
    makeDataImages,
    makeDataSv,
    makePostDataSv,
    transformSubmitValue,
} from '@/Services/Utils/dataSubmitUtils'
import { breadcrumbs, home, listLyDo } from './constants'

const LICH_THI_PREFIX = 'MC_KT_LichThi_'

function LichThi() {
    const [loading, setLoading] = useState(true)
    const [listHocKy, setListHocKy] = useState([])
    const [tenDot, setTenDot] = useState('')
    const [loaiThi, setLoaiThi] = useState('')
    const [lyDo, setLyDo] = useState('')
    const [listHocPhan, setListHocPhan] = useState([])
    const [selectedRow, setSelectedRow] = useState(null)

    const dataSV = DataSinhVien()

    // event handlers
    const handleChangeValue = (e) => {
        if (e.target.id === 'MC_KT_LichThi_TenDot') {
            setTenDot(e.target.value)
        }

        if (e.target.id === 'MC_KT_LichThi_LoaiThi') {
            setLoaiThi(e.target.value)
        }

        if (e.target.id === 'MC_KT_LichThi_YeuCau') {
            setLyDo(e.target.value)
        }
    }

    const handleRowSelection = (row) => {
        setSelectedRow(isEqual(selectedRow, row) ? null : row)
    }

    const middlewareSubmitData = () => {
        return [
            required(tenDot, 'Vui lòng chọn học kỳ!'),
            required(loaiThi, 'Vui lòng chọn loại thi!'),
            required(lyDo, 'Vui lòng chọn lý do!'),
            required(selectedRow, 'Vui lòng chọn 1 học phần cần gửi yêu cầu!'),
        ].every((e) => e == true)
    }

    const handleSubmitData = async (event, files) => {
        event.preventDefault()

        if (!middlewareSubmitData()) {
            return
        }

        const itemHocPhan = selectedRow

        let dataHocPhan = {}
        if (itemHocPhan) {
            dataHocPhan = makePostDataSv(
                makeDataSv(dataSV, LICH_THI_PREFIX),
                {
                    TenDot: transformSubmitValue(tenDot),
                    MaLopHocPhan: transformSubmitValue(
                        itemHocPhan.MaLopHocPhan,
                    ),
                    MaMonHoc: transformSubmitValue(itemHocPhan.MaMonHoc),
                    TenMonHoc: transformSubmitValue([
                        itemHocPhan.TenMonHoc,
                        itemHocPhan.KhongCoLich_TenMonHoc,
                    ]),
                    KhoaChuQuanMon: transformSubmitValue(
                        itemHocPhan.KhoaChuQuanMon,
                    ),
                    TenHinhThucThi: transformSubmitValue(
                        itemHocPhan.TenHinhThucThi,
                    ),
                    NgayThi: transformSubmitValue(itemHocPhan.NgayThi, ' '),
                    Thu: transformSubmitValue(itemHocPhan.Thu),
                    Nhom: transformSubmitValue(itemHocPhan.Nhom),
                    TuTiet: transformSubmitValue(itemHocPhan.TuTiet),
                    DenTiet: transformSubmitValue(itemHocPhan.DenTiet),
                    LoaiThi: transformSubmitValue(
                        dataLoaiThi.find((e) => e.id == loaiThi).title,
                    ),
                    TenPhong: transformSubmitValue(itemHocPhan.TenPhong),
                    YeuCau: `${lyDo}`,
                    YeuCau_KhongCoLich_MaLopHP: transformSubmitValue(
                        itemHocPhan.KhongCoLich_MaHocPhan,
                    ),
                    YeuCau_KhongCoLich_TenLopHP: transformSubmitValue(
                        itemHocPhan.KhongCoLich_TenMonHoc,
                    ),
                    YeuCau_KhongCoLich_TenPhong: transformSubmitValue(
                        itemHocPhan.TenPhong,
                    ),
                },
                LICH_THI_PREFIX,
            )

            // images
            dataHocPhan.images = await makeDataImages(
                files,
                'MC_KT_LichThi_YeuCau_',
            )
        }

        const yeuCauTitle = listLyDo.find((e) => e.value == lyDo).title
        // handle post
        Swal.fire({
            title: `Bạn chắc chắn muốn gửi yêu cầu ${yeuCauTitle}?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Gửi',
            denyButtonText: `Hủy`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handlePostData(dataHocPhan)
            } else if (result.isDenied) {
                Swal.fire(`Đã hủy gửi yêu cầu ${yeuCauTitle}`, '', 'info')
            }
        })
    }

    const handlePostData = async (dataHocPhan) => {
        try {
            const resPostData = await postYeuCauLichThi(dataHocPhan)

            if (resPostData == 'ERR_BAD_REQUEST') {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi hệ thống',
                    text: `Vui lòng thử lại và gửi thông báo lỗi cho bộ phận hỗ trợ phần mềm!`,
                })
                return
            }
            if (resPostData.status === 200) {
                const data = await resPostData.data

                // Check bản ghi trùng
                if (data.message === 'Bản ghi bị trùng.') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Thông báo quá hạn',
                        text: `Học phần ${dataHocPhan.MC_KT_LichThi_TenMonHoc} đã được gửi yêu cầu trước đấy. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
                    })
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Học phần ${dataHocPhan.MC_KT_LichThi_TenMonHoc} đã được gửi yêu cầu thành công. Vui lòng chờ xử lý từ Phòng Khảo thí và Đảm bảo chất lượng!`,
                        showConfirmButton: false,
                        timer: 1500,
                    })

                    setTimeout(() => {
                        window.location.reload()
                    }, 1000)
                }
            }
        } catch (error) {
            console.log(error)
            if (!error.response) {
                console.log(`Server not response.`)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi hệ thống',
                    text: `Vui lòng thử lại và gửi thông báo lỗi cho bộ phận hỗ trợ phần mềm!`,
                })
                console.log(`Error `, {
                    errorResponse: error.response,
                    errorMessage: error.message,
                })
            }
        }
    }

    useEffect(() => {
        getTenDot().then((res) => {
            setListHocKy(res?.data?.body)
        })

        if (tenDot !== '' && loaiThi !== '' && lyDo !== '') {
            setLoading(true)
            getAllHocPhanLichThi(dataSV.MaSinhVien, tenDot, loaiThi, lyDo).then(
                (res) => {
                    setLoading(false)
                    setListHocPhan(res?.data?.body)
                },
            )
        }
        setLoading(false)
    }, [tenDot, loaiThi, lyDo])

    return (
        <LichThiView
            home={home}
            breadcrumbs={breadcrumbs}
            loading={loading}
            listHocKy={listHocKy}
            listLyDo={listLyDo}
            tenDot={tenDot}
            dataLoaiThi={dataLoaiThi}
            loaiThi={loaiThi}
            selectedRow={selectedRow}
            lyDo={lyDo}
            listHocPhan={listHocPhan}
            handleChangeValue={handleChangeValue}
            handleRowSelection={handleRowSelection}
            handleSubmitData={handleSubmitData}
            handlePostData={handlePostData}
        />
    )
}

export default LichThi
