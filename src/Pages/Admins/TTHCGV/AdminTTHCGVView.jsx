import { useEffect, useRef, useState } from 'react'
// import PropTypes from 'prop-types'
import Tabs from './Tabs/Tabs'
import ThongTinHoSo from './ThemMoiThuTuc/ThongTinHoSo'
import ThanhPhanHoSoDeNghi from './ThemMoiThuTuc/ThanhPhanHoSoDeNghi'
import TrinhTuThucHien from './ThemMoiThuTuc/TrinhTuThucHien'
// import PhiLePhi from './ThemMoiThuTuc/PhiLePhi'
import TrangThaiHoSo from './ThemMoiThuTuc/TrangThaiHoSo'
import PhanQuyen from './ThemMoiThuTuc/PhanQuyen'
import SidebarTTHCGV from './Sidebar/SidebarTTHCGV'
import { postThuTucHanhChinh } from '../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'
import { NguonTiepNhan_WEB } from '../../../Services/Static/dataStatic'
import Swal from 'sweetalert2'
import { postThanhPhanHoSoTTHCGV } from './../../../Apis/ThuTucHanhChinhGiangVien/apiThanhPhanHoSo'
import { postTrinhTuThucHienTTHCGV } from './../../../Apis/ThuTucHanhChinhGiangVien/apiTrinhTuThucHien'
// import { postLePhi } from './../../../Apis/ThuTucHanhChinhGiangVien/apiLePhi'
import { postTrangThaiTTHCGV } from './../../../Apis/ThuTucHanhChinhGiangVien/apiTrangThai'
import { getThuTucHanhChinhByMaThuTuc } from './../../../Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'
import { postPhanQuyenTTHCGV } from '../../../Apis/ThuTucHanhChinhGiangVien/apiPhanQuyen'
import { toast } from 'react-toastify'
// import { FaSave } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'

function AdminTTHCGVView({
  listMucDo,
  listDonViTiepNhan,
  listNoiTraKetQua,
  listLinhVuc,
}) {
  // ref
  const inputTenThuTucRef = useRef(null)
  const inputMaThuTucRef = useRef(null)
  const inputMucDoRef = useRef(null)
  const inputTongThoiGianRef = useRef(null)
  const inputDonViTiepNhanRef = useRef(null)
  const inputNoiTraKetQuaRef = useRef(null)

  // variables
  // var: active Tabs
  const [thongTinActive, setThongTinActive] = useState(false)
  const [tpHoSoDeNghiActive, setTPHoSoDeNghiActive] = useState(false)
  const [trinhTuThucHienActive, setTrinhTuThucHienActive] = useState(false)
  const [phiActive, setPhiActive] = useState(false)
  const [phanQuyenActive, setPhanQuyenActive] = useState(false)
  const [trangThaiActive, setTrangThaiActive] = useState(false)
  // var: dataForm - thongtinhoso
  const [tenThuTuc, setTenThuTuc] = useState('')
  const [canCuPhapLyCuaTTHC, setCanCuPhapLyCuaTTHC] = useState('')
  const [dieuKienThucHien, setDieuKienThucHien] = useState('')
  const [viTri, setViTri] = useState('')
  const [maThuTuc, setMaThuTuc] = useState('')
  const [mucDo, setMucDo] = useState('')
  const [tongThoiGianGiaiQuyet, setTongThoiGianGiaiQuyet] = useState('')
  const [soBoHoSo, setSoBoHoSo] = useState('')
  const [linhVuc, setLinhVuc] = useState('')
  const [donViTiepNhan, setDonViTiepNhan] = useState('')
  const [noiTraKetQua, setNoiTraKetQua] = useState('')
  const [isTruongPhongPheDuyet, setIsTruongPhongPheDuyet] = useState(false)
  const [isBGHPheDuyet, setIsBGHPheDuyet] = useState(false)
  const [thuTucLienThong, setThuTucLienThong] = useState(false)
  const [thuTucKhongApDungTrucTuyen, setThuTucKhongApDungTrucTuyen] =
    useState(false)
  const [thanhPhanHoSo, setThanhPhanHoSo] = useState([])
  const [quyTrinh, setQuyTrinh] = useState([])
  //   const [phiLePhi, setPhiLePhi] = useState([])
  const [trangThai, setTrangThai] = useState([])
  const [phanQuyen, setPhanQuyen] = useState([])
  const [tenTepThuTuc, setTenTepThuTuc] = useState('')
  const [dataFilesTepThuTuc, setDataFilesTepThuTuc] = useState(null)
  const [editRowIndex, setEditRowIndex] = useState(0)
  const [zoomView, setZoomView] = useState(false)
  const navigate = useNavigate()
  // event handlers
  const handleOpenTab = (e) => {
    const { id } = e.target
    if (id === 'btnThietLapHoSo') {
      setThongTinActive(true)
      setTPHoSoDeNghiActive(false)
      setTrinhTuThucHienActive(false)
      setPhiActive(false)
      setPhanQuyenActive(false)
      setTrangThaiActive(false)
    }

    if (id === 'btnTPHSDeNghi') {
      setThongTinActive(false)
      setTPHoSoDeNghiActive(true)
      setTrinhTuThucHienActive(false)
      setPhiActive(false)
      setPhanQuyenActive(false)
      setTrangThaiActive(false)
    }

    if (id === 'btnTLTrinhTuThucHien') {
      setThongTinActive(false)
      setTPHoSoDeNghiActive(false)
      setTrinhTuThucHienActive(true)
      setPhiActive(false)
      setPhanQuyenActive(false)
      setTrangThaiActive(false)
    }

    if (id === 'btnPhiLePhi') {
      setThongTinActive(false)
      setTPHoSoDeNghiActive(false)
      setTrinhTuThucHienActive(false)
      setPhiActive(true)
      setPhanQuyenActive(false)
      setTrangThaiActive(false)
    }

    if (id === 'btnPhanQuyen') {
      setThongTinActive(false)
      setTPHoSoDeNghiActive(false)
      setTrinhTuThucHienActive(false)
      setPhiActive(false)
      setPhanQuyenActive(true)
      setTrangThaiActive(false)
    }

    if (id === 'btnTrangThai') {
      setThongTinActive(false)
      setTPHoSoDeNghiActive(false)
      setTrinhTuThucHienActive(false)
      setPhiActive(false)
      setPhanQuyenActive(false)
      setTrangThaiActive(true)
    }
  }

  const handleChangeValue = (e) => {
    const { id, value, checked } = e.target
    if (id === 'MC_TTHC_GV_TenThuTuc') {
      setTenThuTuc(value)
    }

    if (id === 'MC_TTHC_GV_ThuTu') {
      setViTri(value)
    }

    if (id === 'MC_TTHC_GV_MaThuTuc') {
      setMaThuTuc(value)
    }

    if (id === 'MC_TTHC_GV_IDMucDo') {
      setMucDo(value)
    }

    if (id === 'MC_TTHC_GV_TongThoiGianGiaiQuyet') {
      setTongThoiGianGiaiQuyet(value)
    }

    if (id === 'MC_TTHC_GV_LinhVuc') {
      setLinhVuc(value)
    }

    if (id === 'MC_TTHC_GV_NoiTiepNhan') {
      setDonViTiepNhan(value)
    }

    if (id === 'MC_TTHC_GV_NoiTraKetQua') {
      setNoiTraKetQua(value)
    }

    if (id === 'MC_TTHC_GV_IsTruongPhongPheDuyet') {
      setIsTruongPhongPheDuyet(checked)
    }

    if (id === 'MC_TTHC_GV_IsBGHPheDuyet') {
      setIsBGHPheDuyet(checked)
    }

    if (id === 'MC_TTHC_GV_ThuTucLienThong') {
      setThuTucLienThong(checked)
    }

    if (id === 'MC_TTHC_GV_ThuTucKhongApDungTrucTuyen') {
      setThuTucKhongApDungTrucTuyen(checked)
    }

    if (id === 'MC_TTHC_GV_SoBoHoSo') {
      setSoBoHoSo(value)
    }

    if (id === 'MC_TTHC_GV_CanCuPhapLyCuaTTHC') {
      setCanCuPhapLyCuaTTHC(value)
    }

    if (id === 'MC_TTHC_GV_DieuKienThucHien') {
      setDieuKienThucHien(value)
    }

    if (id === 'MC_TTHC_GV_TepThuTuc_DataFileFile') {
      setTenTepThuTuc(value)
    }
  }

  const handleAddThanhPhanHoSo = () => {
    const newThanhPhanHoSo = {
      MC_TTHC_GV_ThanhPhanHoSo_IDTTHC: '',
      MC_TTHC_GV_ThanhPhanHoSo_STT: '',
      MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo: '',
      MC_TTHC_GV_ThanhPhanHoSo_BanChinh: 0,
      MC_TTHC_GV_ThanhPhanHoSo_BanSao: 0,
      MC_TTHC_GV_ThanhPhanHoSo_BatBuoc: false,
      MC_TTHC_GV_ThanhPhanHoSo_DataFile: null,
      MC_TTHC_GV_ThanhPhanHoSo_TenFile: '',
    }

    setThanhPhanHoSo([...thanhPhanHoSo, newThanhPhanHoSo])
    setEditRowIndex(thanhPhanHoSo.length)
  }

  const handleAddQuyTrinh = () => {
    const newQuyTrinh = {
      MC_TTHC_GV_TrinhTuThucHien_IDTTHC: '',
      MC_TTHC_GV_TrinhTuThucHien_Buoc: '',
      MC_TTHC_GV_TrinhTuThucHien_TenCongViec: '',
      MC_TTHC_GV_TrinhTuThucHien_CachThucThucHien: '',
      MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra: '',
      MC_TTHC_GV_TrinhTuThucHien_DonViThucHien: '',
      MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop: '',
      MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay: 0,
      MC_TTHC_GV_TrinhTuThucHien_KetQua: '',
    }

    setQuyTrinh([...quyTrinh, newQuyTrinh])
    setEditRowIndex(quyTrinh.length)
  }

  //   const handleAddLePhi = () => {
  //     const newLePhi = {
  //       MC_TTHC_GV_LePhi_STT: null,
  //       MC_TTHC_GV_LePhi_MucPhi: null,
  //       MC_TTHC_GV_LePhi_MoTa: '',
  //     }

  //     setPhiLePhi([...phiLePhi, newLePhi])
  //   }

  const handleAddTrangThai = () => {
    const newTrangThai = {
      MC_TTHC_GV_TrangThai_IDTTHC: '',
      MC_TTHC_GV_TrangThai_STT: '',
      MC_TTHC_GV_TrangThai_TenTrangThai: '',
      MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
      MC_TTHC_GV_TrangThai_MoTa: '',
    }

    setTrangThai([...trangThai, newTrangThai])
    setEditRowIndex(trangThai.length)
  }

  const handleOnSubmitForm = async (e) => {
    e.preventDefault()
    const dataThongTinHoSo = {
      MC_TTHC_GV_ThuTu: viTri,
      MC_TTHC_GV_MaThuTuc: maThuTuc,
      MC_TTHC_GV_TenThuTuc: tenThuTuc,
      MC_TTHC_GV_GhiChu: '',
      MC_TTHC_GV_IDMucDo: mucDo,
      MC_TTHC_GV_LinhVuc: linhVuc,
      MC_TTHC_GV_IsTruongPhongPheDuyet: isTruongPhongPheDuyet,
      MC_TTHC_GV_IsBGHPheDuyet: isBGHPheDuyet,
      MC_TTHC_GV_ThuTucLienThong: thuTucLienThong,
      MC_TTHC_GV_ThuTucKhongApDungTrucTuyen: thuTucKhongApDungTrucTuyen,
      MC_TTHC_GV_SoBoHoSo: soBoHoSo,
      MC_TTHC_GV_TongThoiGianGiaiQuyet: tongThoiGianGiaiQuyet,
      MC_TTHC_GV_CanCuPhapLyCuaTTHC: canCuPhapLyCuaTTHC,
      MC_TTHC_GV_DieuKienThucHien: dieuKienThucHien,
      MC_TTHC_GV_NguonTiepNhan: NguonTiepNhan_WEB,
      MC_TTHC_GV_NoiTiepNhan: donViTiepNhan,
      MC_TTHC_GV_NoiTraKetQua: noiTraKetQua,
      MC_TTHC_GV_TepThuTuc_TenFile:
        dataFilesTepThuTuc?.MC_TTHC_GV_TepThuTuc_TenFile,
      MC_TTHC_GV_TepThuTuc_DataFileFile:
        dataFilesTepThuTuc?.MC_TTHC_GV_TepThuTuc_DataFileFile?.split(',')[1],
    }

    if (
      dataThongTinHoSo?.MC_TTHC_GV_TenThuTuc == '' ||
      dataThongTinHoSo?.MC_TTHC_GV_TenThuTuc == null ||
      dataThongTinHoSo?.MC_TTHC_GV_TenThuTuc == undefined
    ) {
      toast.error('Vui lòng nhập tên thủ tục!')
      setThongTinActive(true)
      setTPHoSoDeNghiActive(false)
      setTrinhTuThucHienActive(false)
      setPhanQuyenActive(false)
      setTrangThaiActive(false)
      inputTenThuTucRef.current.focus()
      return
    }

    if (
      dataThongTinHoSo?.MC_TTHC_GV_MaThuTuc == '' ||
      dataThongTinHoSo?.MC_TTHC_GV_MaThuTuc == null ||
      dataThongTinHoSo?.MC_TTHC_GV_MaThuTuc == undefined
    ) {
      toast.error('Vui lòng nhập mã thủ tục!')
      setThongTinActive(true)
      setTPHoSoDeNghiActive(false)
      setTrinhTuThucHienActive(false)
      setPhanQuyenActive(false)
      setTrangThaiActive(false)
      inputMaThuTucRef.current?.focus()
      return
    }

    if (
      dataThongTinHoSo?.MC_TTHC_GV_IDMucDo == '' ||
      dataThongTinHoSo?.MC_TTHC_GV_IDMucDo == null ||
      dataThongTinHoSo?.MC_TTHC_GV_IDMucDo == undefined
    ) {
      toast.error('Vui lòng chọn mức độ thủ tục!')
      setThongTinActive(true)
      setTPHoSoDeNghiActive(false)
      setTrinhTuThucHienActive(false)
      setPhanQuyenActive(false)
      setTrangThaiActive(false)
      inputMucDoRef.current.focus()
      return
    }

    if (
      dataThongTinHoSo?.MC_TTHC_GV_TongThoiGianGiaiQuyet == '' ||
      dataThongTinHoSo?.MC_TTHC_GV_TongThoiGianGiaiQuyet == null ||
      dataThongTinHoSo?.MC_TTHC_GV_TongThoiGianGiaiQuyet == undefined
    ) {
      toast.error('Vui lòng nhập tổng thời gian giải quyết!')
      setThongTinActive(true)
      setTPHoSoDeNghiActive(false)
      setTrinhTuThucHienActive(false)
      setPhanQuyenActive(false)
      setTrangThaiActive(false)
      inputTongThoiGianRef.current.focus()
      return
    }

    if (
      dataThongTinHoSo?.MC_TTHC_GV_NoiTiepNhan == '' ||
      dataThongTinHoSo?.MC_TTHC_GV_NoiTiepNhan == null ||
      dataThongTinHoSo?.MC_TTHC_GV_NoiTiepNhan == undefined
    ) {
      toast.error('Vui lòng chọn đơn vị tiếp nhận!')
      setThongTinActive(true)
      setTPHoSoDeNghiActive(false)
      setTrinhTuThucHienActive(false)
      setPhanQuyenActive(false)
      setTrangThaiActive(false)
      inputDonViTiepNhanRef.current.focus()
      return
    }

    // if (
    //   dataThongTinHoSo?.MC_TTHC_GV_NoiTraKetQua == '' ||
    //   dataThongTinHoSo?.MC_TTHC_GV_NoiTraKetQua == null ||
    //   dataThongTinHoSo?.MC_TTHC_GV_NoiTraKetQua == undefined
    // ) {
    //   toast.error('Vui lòng chọn nơi trả kết quả!')
    //   inputNoiTraKetQuaRef.current.focus()
    //   return
    // }
    //   Bổ sung thông báo nếu hồ sơ chọn cần trưởng phòng/BGH phê duyệt
    let flagCheckTTTPPheDuyet = false
    let flagCheckTTBGHPheDuyet = false
    if (dataThongTinHoSo?.MC_TTHC_GV_IsTruongPhongPheDuyet === true) {
      flagCheckTTTPPheDuyet = trangThai.some((iTrangThai) => {
        if (
          iTrangThai?.MC_TTHC_GV_TrangThai_DoiTuongXuLy &&
          iTrangThai?.MC_TTHC_GV_TrangThai_DoiTuongXuLy === '24'
        ) {
          return true
        }
      })
    } else {
      flagCheckTTTPPheDuyet = true
    }

    if (dataThongTinHoSo?.MC_TTHC_GV_IsBGHPheDuyet === true) {
      flagCheckTTBGHPheDuyet = trangThai.some((iTrangThai) => {
        if (
          iTrangThai?.MC_TTHC_GV_TrangThai_DoiTuongXuLy &&
          iTrangThai?.MC_TTHC_GV_TrangThai_DoiTuongXuLy === '25'
        ) {
          return true
        }
      })
    } else {
      flagCheckTTBGHPheDuyet = true
    }

    if (flagCheckTTTPPheDuyet === false) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi thiết lập',
        text: 'Vui lòng thiết lập "Đối tượng phê duyệt" hồ sơ là "Trưởng phòng" tại trạng thái cần phê duyệt!',
      })
      setThongTinActive(false)
      setTPHoSoDeNghiActive(false)
      setTrinhTuThucHienActive(false)
      setPhanQuyenActive(false)
      setTrangThaiActive(true)
      return
    }
    if (flagCheckTTBGHPheDuyet === false) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi thiết lập',
        text: 'Vui lòng thiết lập "Đối tượng phê duyệt" hồ sơ là "Ban giám hiệu" tại trạng thái cần phê duyệt!',
      })
      setThongTinActive(false)
      setTPHoSoDeNghiActive(false)
      setTrinhTuThucHienActive(false)
      setPhanQuyenActive(false)
      setTrangThaiActive(true)
      return
    }

    if (thanhPhanHoSo.length > 0) {
      for (let i = 0; i < thanhPhanHoSo.length; i++) {
        if (
          !thanhPhanHoSo[i]?.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo ||
          thanhPhanHoSo[i]?.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo == ''
        ) {
          Swal.fire({
            icon: 'warning',
            title: 'Lỗi',
            text: 'Vui lòng thiết lập đầy đủ thông tin tên giấy tờ thành phần hồ sơ đề nghị!',
          })
          setThongTinActive(false)
          setTPHoSoDeNghiActive(true)
          setTrinhTuThucHienActive(false)
          setPhanQuyenActive(false)
          setTrangThaiActive(false)
          return
        }
      }
    }

    if (quyTrinh.length > 0) {
      for (let i = 0; i < quyTrinh.length; i++) {
        if (
          !quyTrinh[i]?.MC_TTHC_GV_TrinhTuThucHien_TenCongViec ||
          quyTrinh[i]?.MC_TTHC_GV_TrinhTuThucHien_TenCongViec.trim() == ''
        ) {
          Swal.fire({
            icon: 'warning',
            title: 'Lỗi',
            text: 'Vui lòng thiết lập đầy đủ thông tin tên công việc của trình tự thực hiện!',
          })
          setThongTinActive(false)
          setTPHoSoDeNghiActive(false)
          setTrinhTuThucHienActive(true)
          setPhanQuyenActive(false)
          setTrangThaiActive(false)
          return
        }
      }
    }

    if (phanQuyen.length < 1) {
      setThongTinActive(false)
      setTPHoSoDeNghiActive(false)
      setTrinhTuThucHienActive(false)
      setPhanQuyenActive(true)
      setTrangThaiActive(false)
      return toast.error('Vui lòng thiết lập phân quyền cho người thực hiện!')
    }

    let checkDataTrangThai = false

    if (trangThai.length < 1) {
      setThongTinActive(false)
      setTPHoSoDeNghiActive(false)
      setTrinhTuThucHienActive(false)
      setPhanQuyenActive(false)
      setTrangThaiActive(true)
      return toast.error('Vui lòng thiết lập trạng thái cho hồ sơ thủ tục!')
    } else {
      trangThai.forEach((iTrangThai) => {
        if (
          !iTrangThai.MC_TTHC_GV_TrangThai_TenTrangThai ||
          iTrangThai?.MC_TTHC_GV_TrangThai_TenTrangThai == ''
        ) {
          return (checkDataTrangThai = true)
        }
      })
    }

    if (checkDataTrangThai == true) {
      return Swal.fire({
        icon: 'error',
        title: 'Lỗi thiết lập trạng thái',
        text: 'Vui lòng thiết lập thông tin tên trạng thái cho hồ sơ thủ tục!',
      })
    }

    let idTTHCGV
    try {
      const resultPostThongTinTTHC = await postThuTucHanhChinh(dataThongTinHoSo)
      if (resultPostThongTinTTHC.status === 200) {
        const dataPostThongTinHoSo = await resultPostThongTinTTHC.data
        if (dataPostThongTinHoSo.message === 'Bản ghi bị trùng.') {
          Swal.fire({
            icon: 'error',
            title: 'Hồ sơ đã tồn tại',
            text: `Thông tin hồ sơ ${dataThongTinHoSo.MC_TTHC_GV_TenThuTuc} - mã hồ sơ ${dataThongTinHoSo.MC_TTHC_GV_MaThuTuc} đã tồn tại. Vui lòng chỉnh sửa hoặc xóa hồ sơ để tạo mới!`,
          })
          return
        } else {
          const dataTTHCGVGetID = await getThuTucHanhChinhByMaThuTuc(maThuTuc)
          if (dataTTHCGVGetID.status === 200) {
            const dataTTHCGVID = await dataTTHCGVGetID.data
            idTTHCGV = dataTTHCGVID.body[0].MC_TTHC_GV_ID
          }
        }
      }

      // UI-POST: Thanh Phan Ho So
      for (let i = 0; i < thanhPhanHoSo.length; i++) {
        thanhPhanHoSo[i].MC_TTHC_GV_ThanhPhanHoSo_IDTTHC = idTTHCGV
      }
      const resultPostThanhPhanHoSo =
        await postThanhPhanHoSoTTHCGV(thanhPhanHoSo)

      // UI-POST: TrinhTuThucHien
      for (let i = 0; i < quyTrinh.length; i++) {
        quyTrinh[i].MC_TTHC_GV_TrinhTuThucHien_IDTTHC = idTTHCGV
      }
      const resultPostTrinhTuThucHien =
        await postTrinhTuThucHienTTHCGV(quyTrinh)

      // UI-POST: Lệ phí
      // for (let i = 0; i < phiLePhi.length; i++) {
      // 	phiLePhi[i].MC_TTHC_GV_LePhi_IDTTHC = idTTHCGV;
      // }
      // const resultPostLePhi = await postLePhi(phiLePhi);

      // UI-POST: Phân quyền
      for (let i = 0; i < phanQuyen.length; i++) {
        phanQuyen[i].MC_TTHC_GV_PhanQuyen_IDTTHC = idTTHCGV
      }
      const resultPostPhanQuyen = await postPhanQuyenTTHCGV(phanQuyen)

      // UI-POST: Trạng thái
      for (let i = 0; i < trangThai.length; i++) {
        trangThai[i].MC_TTHC_GV_TrangThai_IDTTHC = idTTHCGV
      }
      const resultPostTrangThai = await postTrangThaiTTHCGV(trangThai)

      try {
        if (
          resultPostThanhPhanHoSo.status === 200 &&
          resultPostTrinhTuThucHien.status === 200 &&
          resultPostPhanQuyen.status === 200 &&
          resultPostTrangThai.status === 200
        ) {
          const dataPostThanhPhanHoSo = await resultPostThanhPhanHoSo.data
          const dataPostTrinhTuThucHien = await resultPostTrinhTuThucHien.data
          const dataPostPhanQuyen = await resultPostPhanQuyen.data
          const dataPostTrangThai = await resultPostTrangThai.data

          if (
            dataPostThanhPhanHoSo &&
            dataPostTrinhTuThucHien &&
            dataPostPhanQuyen &&
            dataPostTrangThai
          ) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Thêm mới hồ sơ/thủ tục thành công!',
              showConfirmButton: false,
              timer: 1500,
            })
            navigate('/admin/quan-tri-TTHCGV/ho-so-thu-tuc/xem/tat-ca')
            return
          } else {
            return Swal.fire({
              icon: 'error',
              title: 'Lỗi',
              text: `Vui lòng kiểm tra lại thông tin hồ sơ!`,
            })
          }
        }
      } catch (error) {
        console.log('>>> Error: ' + error)
      }
    } catch (error) {
      console.log('>>> Error: ' + [error])
    }
  }

  const handleDeleteTepThuTuc = () => {
    if (dataFilesTepThuTuc?.MC_TTHC_GV_TepThuTuc_TenFile) {
      setDataFilesTepThuTuc(null)
    }
  }

  // effect
  useEffect(() => {
    setThongTinActive(true)
    setTPHoSoDeNghiActive(false)
    setTrinhTuThucHienActive(false)
    setPhiActive(false)
    setPhanQuyenActive(false)
    setTrangThaiActive(false)
  }, [])

  useEffect(() => {}, [
    thongTinActive,
    tpHoSoDeNghiActive,
    trinhTuThucHienActive,
    phiActive,
    phanQuyenActive,
    trangThaiActive,
  ])

  return (
    <div className="px-5 lg:px-0 grid grid-cols-12 gap-4 ">
      <div className="col-span-12 lg:col-span-2">
        <SidebarTTHCGV />
      </div>
      <div
        className={clsx(
          'w-full col-span-12 lg:col-span-10 p-4 rounded-xl shadow-lg bg-white',
          zoomView ? 'absolute left-0 right-0' : '',
        )}
      >
        {/* START: Tabs Bar */}
        <Tabs
          handleOpenTab={handleOpenTab}
          thongTinActive={thongTinActive}
          tpHoSoDeNghiActive={tpHoSoDeNghiActive}
          trinhTuThucHienActive={trinhTuThucHienActive}
          phiActive={phiActive}
          phanQuyenActive={phanQuyenActive}
          trangThaiActive={trangThaiActive}
          zoomView={zoomView}
          setZoomView={setZoomView}
        />
        {/* END: Tabs Bar */}

        <form className="w-full" onSubmit={handleOnSubmitForm}>
          {/* START: Thông Tin Hồ Sơ */}
          {thongTinActive ? (
            <ThongTinHoSo
              inputTenThuTucRef={inputTenThuTucRef}
              inputMaThuTucRef={inputMaThuTucRef}
              inputMucDoRef={inputMucDoRef}
              inputTongThoiGianRef={inputTongThoiGianRef}
              inputDonViTiepNhanRef={inputDonViTiepNhanRef}
              inputNoiTraKetQuaRef={inputNoiTraKetQuaRef}
              listMucDo={listMucDo}
              listDonViTiepNhan={listDonViTiepNhan}
              listLinhVuc={listLinhVuc}
              tenThuTuc={tenThuTuc}
              viTri={viTri}
              maThuTuc={maThuTuc}
              mucDo={mucDo}
              canCuPhapLyCuaTTHC={canCuPhapLyCuaTTHC}
              dieuKienThucHien={dieuKienThucHien}
              tongThoiGianGiaiQuyet={tongThoiGianGiaiQuyet}
              soBoHoSo={soBoHoSo}
              linhVuc={linhVuc}
              setLinhVuc={setLinhVuc}
              donViTiepNhan={donViTiepNhan}
              setDonViTiepNhan={setDonViTiepNhan}
              noiTraKetQua={noiTraKetQua}
              setNoiTraKetQua={setNoiTraKetQua}
              diaChiNhanTraHoSo={listNoiTraKetQua}
              isTruongPhongPheDuyet={isTruongPhongPheDuyet}
              isBGHPheDuyet={isBGHPheDuyet}
              thuTucLienThong={thuTucLienThong}
              thuTucKhongApDungTrucTuyen={thuTucKhongApDungTrucTuyen}
              dataFilesTepThuTuc={dataFilesTepThuTuc}
              tenTepThuTuc={tenTepThuTuc}
              setDataFilesTepThuTuc={setDataFilesTepThuTuc}
              handleChangeValue={handleChangeValue}
              handleDeleteTepThuTuc={handleDeleteTepThuTuc}
              setThongTinActive={setThongTinActive}
              setTPHoSoDeNghiActive={setTPHoSoDeNghiActive}
            />
          ) : null}
          {/* END: Thông Tin Hồ Sơ */}

          {/* START: Thành phần hồ sơ đề nghị */}
          {tpHoSoDeNghiActive ? (
            <ThanhPhanHoSoDeNghi
              thanhPhanHoSo={thanhPhanHoSo}
              setThanhPhanHoSo={setThanhPhanHoSo}
              handleAddThanhPhanHoSo={handleAddThanhPhanHoSo}
              setThongTinActive={setThongTinActive}
              setTPHoSoDeNghiActive={setTPHoSoDeNghiActive}
              setTrinhTuThucHienActive={setTrinhTuThucHienActive}
              editRowIndex={editRowIndex}
              setEditRowIndex={setEditRowIndex}
            />
          ) : null}
          {/* END: Thành phần hồ sơ đề nghị */}

          {/* START: Thiết lập trình tự thực hiện */}
          {trinhTuThucHienActive ? (
            <TrinhTuThucHien
              quyTrinh={quyTrinh}
              donVi={listDonViTiepNhan}
              diaChiNhanTraHoSo={listNoiTraKetQua}
              setQuyTrinh={setQuyTrinh}
              handleAddQuyTrinh={handleAddQuyTrinh}
              setTPHoSoDeNghiActive={setTPHoSoDeNghiActive}
              setTrinhTuThucHienActive={setTrinhTuThucHienActive}
              setPhanQuyenActive={setPhanQuyenActive}
              editRowIndex={editRowIndex}
              setEditRowIndex={setEditRowIndex}
            />
          ) : null}
          {/* END: Thiết lập trình tự thực hiện */}

          {/* START: Phí, lệ phí */}
          {/* {phiActive ? <PhiLePhi phiLePhi={phiLePhi} setPhiLePhi={setPhiLePhi} handleAddLePhi={handleAddLePhi} /> : null} */}
          {/* END: Phí, lệ phí */}

          {/* START: Trạng thái */}
          {trangThaiActive ? (
            <TrangThaiHoSo
              trangThai={trangThai}
              setTrangThai={setTrangThai}
              handleAddTrangThai={handleAddTrangThai}
              setPhanQuyenActive={setPhanQuyenActive}
              setTrangThaiActive={setTrangThaiActive}
              editRowIndex={editRowIndex}
              setEditRowIndex={setEditRowIndex}
            />
          ) : null}
          {/* END: Trạng thái */}

          {/* START: Phân quyền */}
          {phanQuyenActive ? (
            <PhanQuyen
              phanQuyen={phanQuyen}
              setPhanQuyen={setPhanQuyen}
              setTrinhTuThucHienActive={setTrinhTuThucHienActive}
              setPhanQuyenActive={setPhanQuyenActive}
              setTrangThaiActive={setTrangThaiActive}
            />
          ) : null}
          {/* END: Phân quyền */}
        </form>
      </div>
    </div>
  )
}

AdminTTHCGVView.propTypes = {}

export default AdminTTHCGVView
