import {
    getAllLichDayBaoHong,
    getAllSuCo,
    getTTPhongBaoHong,
    updateBaoHong,
} from '@/Apis/HoTroThietBiGiangDuong/apiBaoHong'
import { BaoHongView } from '@/Components/HoTroThietBiGiangDuong/BaoHong/BaoHongView'
import LichHoc from '@/Components/HoTroThietBiGiangDuong/BaoHong/LichHoc'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash-unified'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function BaoHong() {
    const { id } = useParams()

    const [thongTinPhong, setThongTinPhong] = useState({})
    const [listLichHoc, setListLichHoc] = useState([])
    const [selectedLichHoc, setSelectedLichHoc] = useState({})
    const [listSuCo, setListSuCo] = useState([])
    const [selectedSuCo, setSelectedSuCo] = useState([])

    const dataCBGV = DataCanBoGV()

    useEffect(() => {
        getTTPhongBaoHong(id).then((res) => {
            setThongTinPhong(res?.data?.body[0])
        })

        return () => {
            setThongTinPhong({})
        }
    }, [])

    useEffect(() => {
        if (!isEmpty(thongTinPhong)) {
            getAllLichDayBaoHong(
                dayjs(new Date()).format('YYYY-MM-DD'),
                dayjs(new Date()).format('YYYY-MM-DD'),
                // '2024-01-05',
                // '2024-01-05',
                thongTinPhong.DT_QLP_Phong_TenPhong,
                dataCBGV.MaNhanSu.toString(),
            ).then((res) => {
                setListLichHoc(res?.data?.body)
            })
            getAllSuCo(id, thongTinPhong.DT_QLP_Phong_TenPhong).then((res) => {
                setListSuCo(res?.data?.body)
            })
        }

        return () => {
            setSelectedLichHoc({})
            setListSuCo([])
        }
    }, [thongTinPhong])

    const handleSelectLichHoc = (e, lh) => {
        e.preventDefault()
        setSelectedLichHoc(lh)
    }

    const handleSelectSuCo = (e, sc) => {
        if (e.target.checked) {
            // Thêm vào mảng suco
            setSelectedSuCo([...selectedSuCo, sc])
        } else {
            // Xóa khỏi mảng suco
            const updatedSuCo = selectedSuCo.filter(
                (suCoItem) => suCoItem !== sc,
            )
            setSelectedSuCo(updatedSuCo)
        }
    }

    const handleSubmitData = () => {
        let dataSuCo = {}
        let dssc = selectedLichHoc.DT_CVNB_TBGD_SuCo_DanhSachSuCo
            ? selectedLichHoc.DT_CVNB_TBGD_SuCo_DanhSachSuCo
            : ''
        dataSuCo.DT_CVNB_TBGD_ID = selectedLichHoc.DT_CVNB_TBGD_ID
            ? selectedLichHoc.DT_CVNB_TBGD_ID.toString()
            : 'null'
        dataSuCo.DT_CVNB_TBGD_SuCo_MaNhanSu_ThongBao = dataCBGV.MaNhanSu
            ? dataCBGV.MaNhanSu.toString()
            : 'null'

        selectedSuCo.forEach((sc) => {
            dssc +=
                sc.DT_CVNB_TBGD_TL_Ten +
                '_' +
                dayjs(new Date()).format('MM/DD/YYYY hh:mm:ss A') +
                ';'
        })

        dataSuCo.DT_CVNB_TBGD_SuCo_DanhSachSuCo = dssc.length ? dssc : 'null'

        // handle post
        Swal.fire({
            title: 'Bạn chắc chắn muốn báo cáo sự cố?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Gửi',
            denyButtonText: `Hủy`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handlePostData(dataSuCo)
            } else if (result.isDenied) {
                Swal.fire('Đã hủy gửi báo cáo sự cố', '', 'info')
            }
        })
    }

    const handlePostData = async (dataSuCo) => {
        try {
            const resPostData = await updateBaoHong(dataSuCo)

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

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Báo cáo sự cố thành công!`,
                    showConfirmButton: false,
                    timer: 1500,
                })
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            }
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
        <BaoHongView
            handleSubmitData={handleSubmitData}
            listLichHoc={listLichHoc}
            selectedLichHoc={selectedLichHoc}
            handleSelectLichHoc={handleSelectLichHoc}
            listSuCo={listSuCo}
            selectedSuCo={selectedSuCo}
            handleSelectSuCo={handleSelectSuCo}
        />
    )
}
