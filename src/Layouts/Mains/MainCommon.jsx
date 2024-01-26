import Footer from '../Footers/Footer'
import RouterCore from '@/Routers'
import { useLocation } from 'react-router-dom'
import HeaderSV from '../Headers/HeaderSV/HeaderSV'
import HeaderCBGV from '../Headers/HeaderCBGV/HeaderCBGV'
import AutoScrollTop from '@/Components/BackToTop/AutoScrollTop'
import { store } from '@/Services/Redux/store'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'

function MainCommon() {
  const location = useLocation()
  const { pathname } = location

  const dataUser = DataSinhVien() ? DataSinhVien() : DataCanBoGV()
  const dataRole = dataUser?.Role

  return (
    <>
      {pathname === '/' || pathname === '/dangnhap' ? null : dataRole ==
        'SV' ? (
        <HeaderSV />
      ) : (
        <HeaderCBGV />
      )}

      <main className="px-5 mt-[140px] mb-[50px] max-w-7xl mx-auto gap-10 min-h-[500px]">
        <RouterCore />
      </main>
      {pathname === '/' || pathname === '/dangnhap' ? null : <Footer />}
      <AutoScrollTop />
    </>
  )
}

export default MainCommon
