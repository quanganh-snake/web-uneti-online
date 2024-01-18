import React from 'react'
import Header from '../Headers/Header'
import Footer from '../Footers/Footer'
import RouterCore from '@/Routers'
import { useLocation } from 'react-router-dom'
import HeaderSV from '../Headers/HeaderSV/HeaderSV'
import HeaderCBGV from '../Headers/HeaderCBGV/HeaderCBGV'
import { store } from '@/Services/Redux/store'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
// import { Sidebar } from '@/Components/Sidebar/Sidebar'

function MainCommon() {
  const location = useLocation()
  const { pathname } = location

  const state = store.getState()
  // const { Role } = state?.user?.currentUser?.Role;

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

      <main className="px-5 mt-[140px] mb-[50px] max-w-7xl mx-auto gap-10">
        <RouterCore />
      </main>
      {pathname === '/' || pathname === '/dangnhap' ? null : <Footer />}
    </>
  )
}

export default MainCommon
