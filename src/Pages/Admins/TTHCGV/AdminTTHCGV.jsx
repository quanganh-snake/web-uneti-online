import React from 'react'
import AdminTTHCGVView from './AdminTTHCGVView'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllMucDoThuTuc } from '@/Apis/ThuTucHanhChinhGiangVien/apiMucDo'
import {
  getAllLinhVuc,
  getAllPhongBan,
  getListNoiTraKetQua,
} from '@/Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'
function AdminTTHCGV() {
  const [listMucDo, setListMucDo] = useState(null)
  const [listDonViTiepNhan, setListDonViTiepNhan] = useState(null)
  const [listNoiTraKetQua, setListNoiTraKetQua] = useState(null)
  const [listLinhVuc, setListLinhVuc] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // List Noi Tra Ket Qua
        getListNoiTraKetQua().then(async (res) => {
          if (res.status === 200) {
            const data = await res.data?.body
            setListNoiTraKetQua(data)
          }
        })

        // List Muc Do Thu Tuc
        getAllMucDoThuTuc()
          .then(async (res) => {
            if (res.status === 200) {
              const data = await res.data?.body
              setListMucDo(data)
            }
          })
          .catch((err) => {
            console.log(err)
          })

        // List Don Vi TiepNhan
        getAllPhongBan()
          .then(async (res) => {
            const data = await res.data?.body
            setListDonViTiepNhan(data)
          })
          .catch((err) => {
            console.log(err.message)
          })

        // List Linh Vuc
        getAllLinhVuc()
          .then(async (res) => {
            const data = await res.data?.body
            setListLinhVuc(data)
          })
          .catch((err) => {
            console.log(err.message)
          })
      } catch (error) {
        console.log(error.message)
      } finally {
      }
    }
    fetchData()
  }, [])

  return (
    <AdminTTHCGVView
      listMucDo={listMucDo}
      listDonViTiepNhan={listDonViTiepNhan}
      listNoiTraKetQua={listNoiTraKetQua}
      listLinhVuc={listLinhVuc}
    />
  )
}

export default AdminTTHCGV
