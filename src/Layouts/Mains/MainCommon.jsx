import Footer from '../Footers/Footer'
import RouterCore from '@/Routers'
import { useLocation } from 'react-router-dom'
import HeaderSV from '../Headers/HeaderSV/HeaderSV'
import HeaderCBGV from '../Headers/HeaderCBGV/HeaderCBGV'
import AutoScrollTop from '@/Components/BackToTop/AutoScrollTop'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'

import '../Headers/Header.scss'
import clsx from 'clsx'
import { ROLES } from '@/Routers/privateRoutes'

function MainCommon() {
  const location = useLocation()
  const { pathname } = location

  const dataUser = DataSinhVien() ? DataSinhVien() : DataCanBoGV()
  const dataRole = dataUser?.Role

  return (
    <>
      {pathname === '/' || pathname === '/dang-nhap' ? null : dataRole ==
        ROLES.S0202 ? (
        <HeaderSV />
      ) : (
        <HeaderCBGV />
      )}

      <main
        className={clsx(
          'xl:mt-30 mx-auto mb-[50px] mt-40 min-h-[500px] gap-10 px-5 lg:mt-52',
          pathname === '/kiem-dinh-chat-luong' ? ' w-full' : ' max-w-7xl',
        )}
      >
        <RouterCore />
      </main>
      {pathname === '/' || pathname === '/dang-nhap' ? null : <Footer />}
      <AutoScrollTop />
    </>
  )
}

export default MainCommon
