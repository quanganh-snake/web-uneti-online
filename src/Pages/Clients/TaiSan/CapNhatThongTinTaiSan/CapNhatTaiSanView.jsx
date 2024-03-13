import Box from '@/Components/MotCua/Box'
import { useLocation } from 'react-router-dom'

const CapNhatTaiSanView = () => {
  const location = useLocation()
  const { pathname } = location

  const breadcrumbs = [
    {
      title: 'Cập nhật tài sản',
      path: pathname,
    },
  ]

  const home = {
    path: '/ho-tro-thiet-bi',
    title: 'Hỗ trợ thiết bị',
  }

  return (
    <div className="rounded-md bg-white p-4">
      <Box home={home} breadcrumbs={breadcrumbs}>
        <div className="col-span-2">
          <h2 className="mb-10 text-center text-4xl font-bold uppercase text-uneti-primary">
            Cập nhật tài sản
          </h2>
          <div className=""></div>
        </div>
      </Box>
    </div>
  )
}

export default CapNhatTaiSanView
