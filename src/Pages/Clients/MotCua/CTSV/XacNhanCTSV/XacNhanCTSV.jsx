import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { breadcrumbs, home } from './constants'
import { XacNhanForm } from './XacNhanForm'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { convertDataFileToBase64 } from '@/Services/Utils/stringUtils'
import {
    postYeuCauXacNhan,
    xacNhanKiemTraTrung,
} from '@/Apis/MotCua/CTSV/apiXacNhan'
import { GiayToKemTheoAlert } from '@/Components/MotCua/GiayToKemTheoAlert'
import { VanBanMauId } from '@/Configs/constants'

function XacNhanCTSV() {
    const [lyDo, setLyDo] = useState('')
    const [giayToKemTheo, setGiayToKemTheo] = useState('Không có')
    const [yeuCau, setYeuCau] = useState('')
    const [noiNhanKetQua, setNoiNhanKetQua] = useState('')
    const [files, setFiles] = useState([])

    const dataSV = DataSinhVien()

    const handleChangeValue = (e) => {
        const id = e.target.id
        const value = e.target.value

        switch (id) {
            case 'MC_HSSV_XacNhan_YeuCau':
                setYeuCau(value)
                break
            case 'MC_HSSV_XacNhan_YeuCau_LyDo':
                setLyDo(value)
                break
            case 'MC_HSSV_XacNhan_YeuCau_KemTheo':
                setGiayToKemTheo(value)
                break

            case 'MC_HSSV_XacNhan_NoiNhan':
                setNoiNhanKetQua(value)
                break
        }
    }

    const handleFilesChange = (file) => {
        setFiles((_files) => [..._files, file])
    }

    const handleSubmitData = async (e) => {
        e.preventDefault()

        if (!lyDo) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Vui lòng nhập lý do!',
            })
            return
        }

        if (!yeuCau) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Vui lòng chọn yêu cầu!',
            })
            return
        }

        if (!noiNhanKetQua) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Vui lòng chọn nơi nhận kết quả!',
            })
            return
        }

        const data = {}
        // Data post API
        data.MC_HSSV_XacNhan_TenCoSo = dataSV.CoSo ? dataSV.CoSo : 'null'
        data.MC_HSSV_XacNhan_IDSinhVien = dataSV.IdSinhVien
            ? dataSV.IdSinhVien.toString()
            : 'null'
        data.MC_HSSV_XacNhan_MaSinhVien = dataSV.MaSinhVien
            ? dataSV.MaSinhVien
            : 'null'
        data.MC_HSSV_XacNhan_HoDem = dataSV.HoDem ? dataSV.HoDem : 'null'
        data.MC_HSSV_XacNhan_Ten = dataSV.Ten ? dataSV.Ten : 'null'
        data.MC_HSSV_XacNhan_GioiTinh = `${dataSV.GioiTinh}` ?? 'null'
        data.MC_HSSV_XacNhan_NgaySinh2 = dataSV.NgaySinh
            ? new Date(
                  `${dataSV.NgaySinh.split('/')[2]}-${
                      dataSV.NgaySinh.split('/')[1]
                  }-${dataSV.NgaySinh.split('/')[0]}`,
              ).toISOString()
            : 'null'
        data.MC_HSSV_XacNhan_TenKhoaHoc = dataSV.KhoaHoc
            ? dataSV.KhoaHoc
            : 'null'
        data.MC_HSSV_XacNhan_TenNganh = dataSV.ChuyenNganh
            ? dataSV.ChuyenNganh
            : 'null'
        data.MC_HSSV_XacNhan_TenHeDaoTao = dataSV.BacDaoTao
            ? dataSV.BacDaoTao
            : 'null'
        data.MC_HSSV_XacNhan_KhoaChuQuanLop = dataSV.Khoa ? dataSV.Khoa : 'null'
        data.MC_HSSV_XacNhan_TenLoaiHinhDT = dataSV.LoaiHinhDaoTao
            ? dataSV.LoaiHinhDaoTao
            : 'null'
        data.MC_HSSV_XacNhan_TenLop = dataSV.LopHoc ? dataSV.LopHoc : 'null'
        data.MC_HSSV_XacNhan_DienThoai = dataSV.SoDienThoai
            ? dataSV.SoDienThoai
            : dataSV.SoDienThoai2
              ? dataSV.SoDienThoai2
              : dataSV.SoDienThoai3
                ? dataSV.SoDienThoai3
                : ''
        data.MC_HSSV_XacNhan_Email = dataSV.Email_TruongCap
            ? dataSV.Email_TruongCap
            : 'null'

        // Data form
        data.MC_HSSV_XacNhan_YeuCau_KemTheo = giayToKemTheo
        data.MC_HSSV_XacNhan_YeuCau = yeuCau
        data.MC_HSSV_XacNhan_YeuCau_LyDo = lyDo
        data.MC_HSSV_XacNhan_DangKyNoiNhanKetQua = noiNhanKetQua

        // images
        data.images = []
        for (let i = 0; i < files.length; i++) {
            const fileBase64 = await convertDataFileToBase64(files[i])
            const fileURL = URL.createObjectURL(files[i])

            const fileName = fileURL.split('/').at(-1)

            data.images.push({
                MC_HSSV_XacNhan_YeuCau_DataFile: fileBase64,
                MC_HSSV_XacNhan_YeuCau_TenFile: fileName,
                urlTemp: fileURL,
                lastModified: '',
            })

            // URL temp chỉ tồn tại trên client, nên revoke
            URL.revokeObjectURL(fileURL)
        }

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
            const kiemTraTrung = await xacNhanKiemTraTrung({
                maSinhVien: data.MC_HSSV_XacNhan_MaSinhVien,
                yeuCau: data.MC_HSSV_XacNhan_YeuCau,
            })

            if (kiemTraTrung.status === 200) {
                // const records = kiemTraTrung.data.body.length
                // if (records > 0) {
                //   Swal.fire({
                //     icon: 'error',
                //     title: 'Thông báo quá hạn',
                //     text: `Yêu`
                //   })
                //   return
                // }

                const resPostData = await postYeuCauXacNhan(data)

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

                        // setTimeout(() => {
                        //   window.location.reload()
                        // }, 1000)
                    }
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
        <div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
            <div className="p-4 flex flex-col gap-4">
                <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

                <div className="form-submit flex flex-col w-full justify-center">
                    <h2 className="text-center uppercase text-2xl font-bold text-sky-800 mb-6">
                        Tiếp nhận yêu cầu xác nhận
                    </h2>
                    <div className="lg:px-36">
                        <XacNhanForm
                            lyDo={lyDo}
                            yeuCau={yeuCau}
                            giayToKemTheo={giayToKemTheo}
                            noiNhanKetQua={noiNhanKetQua}
                            files={files}
                            handleChangeValue={handleChangeValue}
                            handleFilesChange={handleFilesChange}
                        />

                        <div className="relative sm:rounded-lg my-6">
                            <div className="pb-10 uneti-action flex justify-center">
                                <button
                                    onClick={handleSubmitData}
                                    className="px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-full hover:bg-sky-800 hover:text-white"
                                >
                                    Gửi yêu cầu
                                </button>
                            </div>
                        </div>
                    </div>

                    <GiayToKemTheoAlert
                        downloadId={VanBanMauId.MotCua.CTSV.XacNhan}
                        downloadText="Xác nhận"
                    />
                </div>
            </div>
        </div>
    )
}

export default XacNhanCTSV
