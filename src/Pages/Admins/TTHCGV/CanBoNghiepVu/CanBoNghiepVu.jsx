import React, { useEffect, useState } from 'react'
import CanBoNghiepVuView from './CanBoNghiepVuView'
import {
  getAllHoSoGuiYeuCau,
  getAllHoSoGuiYeuCauByNhanSuXuLy,
  putHoSoThuTucGuiYeuCauById,
} from '@/Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'
import {
  getListTrangThaiTTHCGV,
  getTrangThaiIDBySTTYeuCauId,
} from '@/Apis/ThuTucHanhChinhGiangVien/apiTrangThai'
import Swal from 'sweetalert2'
import {
  TEMPLATE_SUBJECT_RECEIVED_EMAIL,
  sendEmailTTHCGiangVien,
} from '@/Services/Utils/emailUtils'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { getThanhPhanHoSoByIdTTHCGV } from '@/Apis/ThuTucHanhChinhGiangVien/apiThanhPhanHoSo'

function CanBoNghiepVu() {
  const [listHoSoYeuCau, setListHoSoYeuCau] = useState([])
  const [listTrangThaiHoSo, setListTrangThaiHoSo] = useState(null)

  const [keywordSearch, setKeywordSearch] = useState('')
  const [selectedTrangThai, setSelectedTrangThai] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [paginatedData, setPaginatedData] = useState([])

  const [loading, setLoading] = useState(true)
  const dataCBGV = DataCanBoGV()

  const { pathname } = useLocation()

  // fetch data
  const fetchData = async () => {
    try {
      setLoading(true)
      const resTrangThai = await getListTrangThaiTTHCGV()
      if (resTrangThai.status === 200) {
        setListTrangThaiHoSo(resTrangThai.data?.body)
      }

      const resHoSoYeuCau = await getAllHoSoGuiYeuCauByNhanSuXuLy(
        pathname.includes('ho-so-xu-ly') ? 1 : 0,
        dataCBGV?.MaNhanSu,
      )
      if (resHoSoYeuCau.status === 200) {
        setListHoSoYeuCau(resHoSoYeuCau.data?.body)
      }
    } catch (err) {
      console.log(err.message)
    } finally {
      setLoading(false)
    }
  }
  // event handlers
  const handleTiepNhanHoSo = async (itemYeuCau) => {
    if (
      itemYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID == 0 ||
      !itemYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID
    ) {
      Swal.fire({
        title: 'Hồ sơ yêu cầu chưa được tiếp nhận!',
        text: 'Bạn có muốn tiếp nhận hồ sơ để tiếp tục xử lý yêu cầu?',
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true)
          const resNewTrangThaiID = await getTrangThaiIDBySTTYeuCauId(
            itemYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_ID,
            1,
          )
          const resListTPHSDeNghiYeuCau = await getThanhPhanHoSoByIdTTHCGV(
            itemYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_ID,
          )

          let listTPHSDeNghiYeuCau = []
          if (resListTPHSDeNghiYeuCau.status === 200) {
            const data = await resListTPHSDeNghiYeuCau.data?.body
            listTPHSDeNghiYeuCau = [...data]
          }
          if (resNewTrangThaiID.status === 200) {
            const dataTrangThaiIDNew = await resNewTrangThaiID.data?.body[0]
            if (dataTrangThaiIDNew) {
              const newDataUpdate = {
                ...itemYeuCau,
                MC_TTHC_GV_GuiYeuCau_TrangThai_ID:
                  dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_ID,
                MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu:
                  dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_MoTa
                    ? dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_MoTa
                    : dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_TenTrangThai,
              }
              const resPutHoSoThuTuc =
                await putHoSoThuTucGuiYeuCauById(newDataUpdate)

              if (resPutHoSoThuTuc.status === 200) {
                const res = await sendEmailTTHCGiangVien(
                  TEMPLATE_SUBJECT_RECEIVED_EMAIL,
                  itemYeuCau,
                  dataCBGV,
                  listTPHSDeNghiYeuCau,
                  'Hồ sơ yêu cầu của quý Thầy/Cô đã được tiếp nhận. Vui lòng chờ kết quả xử lý theo thông báo!',
                  '',
                  '',
                )
                setLoading(false)
                fetchData()
                toast.success('Đã tiếp nhận yêu cầu hồ sơ!')
              }
            }
          }
        } else {
          toast.success('Đã huỷ tiếp nhận hồ sơ!')
          return
        }
      })
    }
  }

  const handleSearch = (value) => {
    setKeywordSearch(value)
    setCurrentPage(0)
  }

  const handlePageChange = (selectedPage) => {
    console.log(
      '🚀 ~ file: CanBoNghiepVu.jsx:137 ~ handlePageChange ~ selectedPage:',
      selectedPage,
    )

    setCurrentPage(selectedPage)
  }

  // effects
  useEffect(() => {
    fetchData()
  }, [pathname])

  useEffect(() => {
    // Lọc và phân trang dữ liệu
    let filteredData = listHoSoYeuCau

    if (keywordSearch) {
      filteredData = filteredData.filter((item) =>
        item?.MC_TTHC_GV_TenThuTuc.toLowerCase().includes(
          keywordSearch.toLowerCase(),
        ),
      )
    }

    if (selectedTrangThai) {
      filteredData = filteredData.filter(
        (item) => item?.MC_TTHC_GV_TrangThai_TenTrangThai === selectedTrangThai,
      )
    }

    let startIndex = +currentPage * itemsPerPage
    let endIndex = startIndex + itemsPerPage
    setPaginatedData(filteredData?.slice(startIndex, endIndex))
  }, [
    listHoSoYeuCau,
    keywordSearch,
    selectedTrangThai,
    currentPage,
    itemsPerPage,
  ])

  return (
    <CanBoNghiepVuView
      loading={loading}
      listHoSoYeuCau={listHoSoYeuCau}
      listTrangThaiHoSo={listTrangThaiHoSo}
      handleTiepNhanHoSo={handleTiepNhanHoSo}
      paginatedData={paginatedData}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      setPage={handlePageChange}
      setItemsPerPage={setItemsPerPage}
      keywordSearch={keywordSearch}
      onSearch={handleSearch}
      setSelectedTrangThai={setSelectedTrangThai}
    />
  )
}

export default CanBoNghiepVu
