import { getDanhSachYeuCau } from '@/Apis/HoTroThietBi/apiTaiSan'
import Box from '@/Components/MotCua/Box'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const SuaChuaTaiSanView = (props) => {
  const location = useLocation()
  const { pathname } = location
  const breadcrumbs = [
    {
      title: 'Sửa chữa tài sản',
      path: pathname,
    },
  ]
  const home = {
    path: '/hotrothietbi',
    title: 'Hỗ trợ thiết bị',
  }

  const [loading, setLoading] = useState(true)
  const [listBaoHong, setListBaoHong] = useState([])

  // fetach data
  const getListBaoHongTS = async () => {
    getDanhSachYeuCau()
      .then((res) => {
        setLoading(false)
        setListBaoHong(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // effect
  useEffect(() => {
    getListBaoHongTS()
  }, [])

  console.log('>>>list BaoHong: ', listBaoHong)

  return (
    <div className="bg-white rounded-md p-4">
      <Box home={home} breadcrumbs={breadcrumbs}>
        <div className="col-span-2">
          <h2 className="text-center uppercase text-4xl font-bold text-uneti-primary mb-10">
            Sửa chữa tài sản
          </h2>
          <div className="flex flex-col gap-4"></div>
        </div>
      </Box>
    </div>
  )
}

export default SuaChuaTaiSanView
