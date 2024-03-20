import { useEffect, useRef, useState } from 'react'
import SoanHoSoView from './SoanHoSoView'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getGuiYeuCauHoSoThuTucKiemTraTrung,
  getThuTucHanhChinhByID,
  postThanhPhanHoSoGuiYeuCau,
  postThuTucHanhChinhGuiYeuCau,
} from '../../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'
import { NguonTiepNhan_WEB } from '../../../../Services/Static/dataStatic'
import moment from 'moment-timezone'
import { DataCanBoGV } from '../../../../Services/Utils/dataCanBoGV'
import Swal from 'sweetalert2'
import { validateEmail } from '../../../../Services/Utils/emailUtils'
import { convertDataFileToBase64 } from '../../../../Services/Utils/stringUtils'
function SoanHoSo() {
  const home = {
    path: '/tthc-giang-vien',
    title: 'TTHC Giảng Viên',
  }

  const breadcrumbs = [
    {
      path: '/tthc-giang-vien/submit',
      title: 'Soạn hồ sơ',
    },
  ]
  const navigate = useNavigate()

  const dataCBGV = DataCanBoGV()
  const { tieude, id } = useParams()
  const inputTextRef = useRef(null)
  const [dataChiTietThuTuc, setDataChiTietThuTuc] = useState(null)
  const [dataHoSoYeuCau, setDataHoSoYeuCau] = useState({
    MC_TTHC_GV_GuiYeuCau_NhanSuGui_MaNhanSu: dataCBGV.MaNhanSu,
    MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email: dataCBGV.EmailUneti,
    MC_TTHC_GV_GuiYeuCau_NhanSuGui_SDT:
      dataCBGV.SoDienThoai ?? dataCBGV.SoDiDong,
    MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa: '',
    MC_TTHC_GV_GuiYeuCau_YeuCau_ID: id,
    MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu: '',
    MC_TTHC_GV_GuiYeuCau_TrangThai_ID: '',
    MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu: '',
    MC_TTHC_GV_GuiYeuCau_NgayGui: '',
    MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong: '',
    MC_TTHC_GV_GuiYeuCau_DaNop: '',
    MC_TTHC_GV_GuiYeuCau_NgayHenTra: '',
    MC_TTHC_GV_GuiYeuCau_NgayGiaoTra: '',
    MC_TTHC_GV_GuiYeuCau_NoiTraKetQua: '',
    MC_TTHC_GV_GuiYeuCau_TraKetQua_TenFile: '',
    MC_TTHC_GV_GuiYeuCau_TraKetQua_DataFile: '',
    MC_TTHC_GV_GuiYeuCau_NguonTiepNhan: NguonTiepNhan_WEB,
  })
  const [listThanhPhanHoSoFiles, setListThanhPhanHoSoFiles] = useState([])
  const [itemThanhPhanHoSoFile, setItemThanhPhanHoSoFile] = useState({
    MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_IDGoc: '',
    MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_IDThanhPhanHoSo: '',
    MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_DataFile: '',
    MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_TenFile: '',
  })
  const [loading, setLoading] = useState(true)

  // event handlers

  const handleChangeInputFileTPHS = async (idTPHS, e) => {
    const file = e.target.files[0]
    if (file) {
      let dataFile = await convertDataFileToBase64(file)
      let newItemThanhPhanHoSoFile = {
        ...itemThanhPhanHoSoFile,
        MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_IDGoc: '',
        MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_IDThanhPhanHoSo: idTPHS,
        MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_TenFile: file.name,
        MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_DataFile:
          dataFile.split('base64,')[1],
      }
      setItemThanhPhanHoSoFile(newItemThanhPhanHoSoFile)

      let existFileIndex = listThanhPhanHoSoFiles.findIndex(
        (itemFile) =>
          itemFile?.MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_IDThanhPhanHoSo ===
          idTPHS,
      )

      if (existFileIndex !== -1) {
        // Nếu tồn tại, thay đổi nội dung của phần tử đó
        listThanhPhanHoSoFiles[existFileIndex] = newItemThanhPhanHoSoFile
      } else {
        // Nếu không tồn tại, thêm một phần tử mới vào mảng
        listThanhPhanHoSoFiles.push(newItemThanhPhanHoSoFile)
      }
    }
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()

    const newDataHoSoYeuCau = {
      ...dataHoSoYeuCau,
      MC_TTHC_GV_GuiYeuCau_DaNop: false,
      MC_TTHC_GV_GuiYeuCau_NoiTraKetQua:
        dataChiTietThuTuc?.ThongTinHoSo?.MC_TTHC_GV_NoiTraKetQua,
      MC_TTHC_GV_GuiYeuCau_YeuCau_ID: dataChiTietThuTuc?.ThongTinHoSo
        ?.MC_TTHC_GV_ID
        ? dataChiTietThuTuc?.ThongTinHoSo?.MC_TTHC_GV_ID.toString()
        : '',
      MC_TTHC_GV_GuiYeuCau_TrangThai_ID: '0',
      MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu: 'Nộp hồ sơ',
      MC_TTHC_GV_GuiYeuCau_NgayGui: moment()
        .tz('Asia/Ho_Chi_Minh')
        .format('YYYY-MM-DD HH:mm:ss'),
    }

    const checkEmail = validateEmail(
      newDataHoSoYeuCau?.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Email,
    )
    if (checkEmail === false) {
      return Swal.fire({
        icon: 'error',
        title: 'Vui lòng nhập đúng email!',
      })
    }

    // if (
    //   !newDataHoSoYeuCau?.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong ||
    //   parseInt(newDataHoSoYeuCau?.MC_TTHC_GV_GuiYeuCau_KetQua_SoLuong) < 1
    // ) {
    //   return toast.error('Vui lòng nhập số lượng bản ghi nhận tối thiểu là 1')
    // }

    let idGuiYeuCau
    try {
      // Kiểm tra đầy đủ thông tin
      // 1. Thông tin liên hệ và nội dung yêu cầu
      // 2. Thông tin giấy tờ kèm theo
      if (
        listThanhPhanHoSoFiles?.length < dataChiTietThuTuc?.ThanhPhanHoSo.length
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Thiếu dữ liệu!',
          footer: 'Vui lòng chọn đầy đủ giấy tờ kèm theo!',
        })
        return
      } else {
        const resultKiemTraHoSoThuTucTrung =
          await getGuiYeuCauHoSoThuTucKiemTraTrung(
            dataCBGV.MaNhanSu,
            newDataHoSoYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_ID,
            newDataHoSoYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID,
          )
        if (resultKiemTraHoSoThuTucTrung.status === 200) {
          const resultCountKiemTra =
            await resultKiemTraHoSoThuTucTrung?.data?.body?.length

          if (resultCountKiemTra > 0) {
            Swal.fire({
              icon: 'info',
              title: 'Thông báo',
              html: `Yêu cầu cho hồ sơ <p class="font-semibold text-[#336699]">${dataChiTietThuTuc?.ThongTinHoSo?.MC_TTHC_GV_TenThuTuc}</p> đã được gửi lên trước đó. Vui lòng chờ kết quả phản hồi qua email. `,
            })
            return
          } else {
            const resultPostTTHCYeuCau =
              await postThuTucHanhChinhGuiYeuCau(newDataHoSoYeuCau)

            if (resultPostTTHCYeuCau.status === 200) {
              const getIDGuiYeuCau = await getGuiYeuCauHoSoThuTucKiemTraTrung(
                dataCBGV.MaNhanSu,
                newDataHoSoYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_ID,
                newDataHoSoYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID,
              )
              const dataIDGuiYeuCau = await getIDGuiYeuCau.data?.body[0]
              idGuiYeuCau = await dataIDGuiYeuCau?.MC_TTHC_GV_GuiYeuCau_ID
              // UI-POST: Thanh Phan Ho So
              for (let i = 0; i < listThanhPhanHoSoFiles.length; i++) {
                listThanhPhanHoSoFiles[
                  i
                ].MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_IDGoc = idGuiYeuCau
              }
              const resultPostTPHSGuiYeuCau = await postThanhPhanHoSoGuiYeuCau(
                listThanhPhanHoSoFiles,
              )

              if (
                resultPostTPHSGuiYeuCau.status === 200 &&
                resultPostTTHCYeuCau.status === 200
              ) {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Gửi yêu cầu thành công!',
                  text: 'Vui lòng chờ kết quả xử lý thông báo qua Email hoặc Số điện thoại của bạn.',
                  showConfirmButton: false,
                  timer: 2000,
                })
                return
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Lỗi',
                  text: 'Đã có lỗi xảy ra!',
                  footer:
                    'Vui lòng thử lại hoặc liên hệ cho bộ phận kỹ thuật để khắc phục sự cố!',
                })
              }
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Đã có lỗi xảy ra!',
                footer:
                  'Vui lòng thử lại hoặc liên hệ cho bộ phận kỹ thuật để khắc phục sự cố!',
              })
            }
          }
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Đã có lỗi xảy ra',
        text: `${error.message}`,
        footer: 'Vui lòng liên hệ lại bộ phận kỹ thuật để khắc phục sự cố!',
      })
    }

    setItemThanhPhanHoSoFile({
      MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_IDGoc: '',
      MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_IDThanhPhanHoSo: '',
      MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_DataFile: '',
      MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_TenFile: '',
    })
    setListThanhPhanHoSoFiles([])
  }

  const handleCancelSubmit = () => {
    Swal.fire({
      icon: 'question',
      title: 'Bạn chắc chắn muốn hủy gửi yêu cầu này?',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Không',
    }).then((result) => {
      if (result.isConfirmed) {
        setDataHoSoYeuCau((previousData) => {
          return {
            ...previousData,
          }
        })
        setListThanhPhanHoSoFiles([])
        navigate(-1)
      }
    })
  }

  // effects
  useEffect(() => {
    getThuTucHanhChinhByID(id)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data
          if (data) {
            setDataChiTietThuTuc(data)
            setLoading(false)
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })

    return () => {
      setDataHoSoYeuCau((previousData) => {
        return {
          ...previousData,
        }
      })
      setListThanhPhanHoSoFiles([])
    }
  }, [id])

  return (
    <SoanHoSoView
      home={home}
      breadcrumbs={breadcrumbs}
      tieude={tieude}
      id={id}
      loading={loading}
      dataChiTietThuTuc={dataChiTietThuTuc}
      dataHoSoYeuCau={dataHoSoYeuCau}
      setDataHoSoYeuCau={setDataHoSoYeuCau}
      itemThanhPhanHoSoFile={itemThanhPhanHoSoFile}
      setItemThanhPhanHoSoFile={setItemThanhPhanHoSoFile}
      listThanhPhanHoSoFiles={listThanhPhanHoSoFiles}
      setListThanhPhanHoSoFiles={setListThanhPhanHoSoFiles}
      inputTextRef={inputTextRef}
      handleChangeInputFileTPHS={handleChangeInputFileTPHS}
      handleSubmitForm={handleSubmitForm}
      handleCancelSubmit={handleCancelSubmit}
    />
  )
}

export default SoanHoSo
