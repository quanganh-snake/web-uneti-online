import { useState } from 'react'
import { XacNhanDTView } from './XacNhanDTView'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import Swal from 'sweetalert2'
import { convertDataFileToBase64 } from '@/Services/Utils/stringUtils'
import {
    postXacNhan,
    xacNhanKiemTraTrung,
} from '@/Apis/MotCua/DaoTao/apiXacNhanDT'
import { required } from '@/Services/Validators/required'
import { makePostDataSv } from '@/Services/Utils/dataSubmitUtils'
import { makeDataSv } from '@/Services/Utils/dataSubmitUtils'
import { transformSubmitValue } from '@/Services/Utils/dataSubmitUtils'
import { makeDataImages } from '@/Services/Utils/dataSubmitUtils'

const XAC_NHAN_PREFIX = 'MC_DT_XacNhan_'
const XAC_NHAN_FILE_PREFIX = `${XAC_NHAN_PREFIX}YeuCau_`

function XacNhanDT() {
    const [yeuCau, setYeuCau] = useState('')
    const [lyDo, setLyDo] = useState('')
    const [giayToKemTheo, setGiayToKemTheo] = useState(
        'Bản photo văn bằng tốt nghiệp',
    )
    const [files, setFiles] = useState([])
    const [noiNhanKetQua, setNoiNhanKetQua] = useState('')

    const dataSV = DataSinhVien()

    const handleChangeValue = (e) => {
        if (e.target.id == 'MC_DT_XacNhan_YeuCau') {
            setYeuCau(e.target.value)
        }
        if (e.target.id == 'MC_DT_XacNhan_YeuCau_LyDo') {
            setLyDo(e.target.value)
        }
        if (e.target.id == 'MC_DT_XacNhan_YeuCau_KemTheo') {
            setGiayToKemTheo(e.target.value)
        }
        if (e.target.id == 'MC_DT_XacNhan_NoiNhan') {
            setNoiNhanKetQua(e.target.value)
        }
    }

    const handleFilesChange = (file) => {
        setFiles((_files) => [..._files, file])
    }

    const handleRemoveFile = (file) => {
        setFiles((_files) => _files.filter((e) => e !== file))
    }

    const validateSubmitData = () => {
        return [
            required(yeuCau, 'Vui lòng chọn yêu cầu!'),
            required(lyDo, 'Vui lòng nhập lý do!'),
            required(noiNhanKetQua, 'Vui lòng chọn nơi nhận kết quả!'),
        ].every((e) => e == true)
    }

    const handleSubmitData = async (e) => {
        e.preventDefault()

        if (!validateSubmitData()) {
            return
        }

        const data = makePostDataSv(
            makeDataSv(dataSV, XAC_NHAN_PREFIX),
            {
                YeuCau: yeuCau,
                YeuCau_LyDo: lyDo,
                YeuCau_KemTheo: giayToKemTheo,
                DangKyNoiNhanKetQua: noiNhanKetQua,
            },
            XAC_NHAN_PREFIX,
        )

        // images
        data.images = await makeDataImages(files, XAC_NHAN_FILE_PREFIX)

        // handle post
        Swal.fire({
            title: `Bạn chắc chắn muốn gửi yêu cầu xác nhận`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Gửi',
            denyButtonText: `Hủy`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                handlePostData(data)
            } else if (result.isDenied) {
                Swal.fire(`Đã hủy gửi yêu cầu xác nhận`, '', 'info')
            }
        })
    }

    const handlePostData = async (data) => {
        try {
            const resPostData = await postXacNhan(data)

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
                        title: 'Yêu cầu quá nhiều',
                        text: `Yêu cầu đã được gửi trước đó!`,
                    })
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Đã gửi yêu cầu xác nhận thành công`,
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }
            }
        } catch (error) {
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

    return (
        <XacNhanDTView
            yeuCau={yeuCau}
            lyDo={lyDo}
            giayToKemTheo={giayToKemTheo}
            files={files}
            noiNhanKetQua={noiNhanKetQua}
            handleChangeValue={handleChangeValue}
            handleFilesChange={handleFilesChange}
            handleSubmitData={handleSubmitData}
            handleRemoveFile={handleRemoveFile}
        />
    )
}

export default XacNhanDT
