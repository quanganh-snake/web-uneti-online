import ModuleItem from '@/Components/ModuleItem/ModuleItem'
import { homeTaiSan } from '@/Services/Static/dataStatic'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ChartThongKe from './ThongKeBaoHong/ChartThongKe'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6'
import clsx from 'clsx'
import DanhSachBaoHong from './SuaChuaTaiSan/DanhSachBaoHong'
import ThongKeBaoHong from './DanhSachThongKeBaoHong/ThongKeBaoHong'

const HomeTaiSan = () => {
  const { listCanBoHoTro, listHotlines, listAppSupport } = homeTaiSan
  const [openSupporter, setOpenSupporter] = useState(false)
  const [openSupportHotline, setOpenSupportHotline] = useState(false)
  const [openSupportApp, setOpenSupportApp] = useState(false)

  // event handlers
  const handleToggleSupporter = () => {
    setOpenSupporter(!openSupporter)
  }

  const handleToggleHotline = () => {
    setOpenSupportHotline(!openSupportHotline)
  }

  const handleToggleApp = () => {
    setOpenSupportApp(!openSupportApp)
  }

  return (
    <>
      <div className="mb-10 grid grid-cols-12 gap-6 px-4">
        <div className="col-span-12 lg:col-span-6">
          <div className="uneti__audits flex h-full items-center rounded-xl bg-white shadow-lg">
            <ChartThongKe />
          </div>
        </div>
        {/* End: .uneti__audits */}
        <div className="col-span-12 lg:col-span-3">
          <div className="uneti__cbht h-full rounded-xl bg-white shadow-lg">
            <h3 className="mb-2 rounded-t-xl bg-sky-800 p-2 text-center font-bold uppercase text-white">
              Danh sách cán bộ hỗ trợ
              {openSupporter ? (
                <FaAngleUp
                  onClick={handleToggleSupporter}
                  className="float-right mt-1 align-middle hover:cursor-pointer lg:hidden"
                />
              ) : (
                <FaAngleDown
                  onClick={handleToggleSupporter}
                  className="float-right mt-1 align-middle hover:cursor-pointer lg:hidden"
                />
              )}
            </h3>
            <div
              className={clsx(
                'flex h-full flex-col gap-4 p-2',
                !openSupporter && 'hidden lg:block',
              )}
            >
              {listCanBoHoTro.map((item, index) => (
                <p key={item.id} className="mb-2">
                  <Link
                    to={`tel:${item.phone}`}
                    className="flex items-center gap-2 rounded-md bg-blue-100 p-1 shadow-md hover:bg-blue-50"
                  >
                    <p className="inline-block h-10 w-10 rounded-full border bg-blue-400 text-center align-middle text-sm font-bold leading-10 text-white">
                      {item.position}
                    </p>
                    <div className="text-md flex flex-col">
                      <span className="font-bold text-sky-700">
                        {item.name}
                      </span>
                      <span className="text-sm font-semibold italic text-red-500">
                        {item.phone}
                      </span>
                    </div>
                  </Link>
                </p>
              ))}
            </div>
          </div>
        </div>
        {/* End: .uneti__cbht */}
        <div className="col-span-12 lg:col-span-3">
          <div className="uneti__support h-full rounded-xl bg-white shadow-lg">
            <div className="uneti__support--hotline mb-6 rounded-t-xl">
              <h3 className="mb-2 rounded-t-xl bg-sky-800 p-2 text-center font-bold uppercase text-white">
                Hotline hỗ trợ
                {openSupportHotline ? (
                  <FaAngleDown
                    onClick={handleToggleHotline}
                    className="float-right mt-1 align-middle hover:cursor-pointer lg:hidden"
                  />
                ) : (
                  <FaAngleUp
                    onClick={handleToggleHotline}
                    className="float-right mt-1 align-middle hover:cursor-pointer lg:hidden"
                  />
                )}
              </h3>
              <ul
                className={clsx(
                  'p-2',
                  !openSupportHotline && 'hidden lg:block',
                )}
              >
                {listHotlines.map((item, index) => (
                  <li key={item.id}>
                    <Link
                      to={`tel:${item.phone}`}
                      className="mb-2 flex gap-2 rounded-md bg-blue-100 p-2 shadow-md hover:bg-blue-50"
                    >
                      <img src={item.logo} alt="UNETI" className="h-11 w-10" />
                      <p className="flex flex-col">
                        <span className="font-bold text-sky-700">
                          {item.name}
                        </span>
                        <span className="text-sm font-semibold italic text-red-500">
                          {item.phone}
                        </span>
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* End: .uneti__support--hotline */}
            <div className="uneti__support--app rounded-t-xl">
              <h3 className="mb-2 rounded-t-xl bg-sky-800 p-2 text-center font-bold uppercase text-white">
                Phần mềm hỗ trợ
                {openSupportApp ? (
                  <FaAngleDown
                    onClick={handleToggleApp}
                    className="float-right mt-1 align-middle hover:cursor-pointer lg:hidden"
                  />
                ) : (
                  <FaAngleUp
                    onClick={handleToggleApp}
                    className="float-right mt-1 align-middle hover:cursor-pointer lg:hidden"
                  />
                )}
              </h3>
              <ul className={clsx('p-2', !openSupportApp && 'hidden lg:block')}>
                {listAppSupport.map((item, index) => (
                  <li key={item.id}>
                    <Link
                      to={item.link}
                      target="_blank"
                      className="mb-2 flex items-center gap-1 rounded-md bg-blue-100 p-2 shadow-md hover:bg-blue-50"
                    >
                      <img
                        src={item.logo}
                        alt={item.name}
                        className="h-10 w-10"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* End: .uneti__support--app */}
          </div>
        </div>
        {/* End: .uneti__support */}
      </div>
      {/* Start: List features */}
      <div className="grid grid-cols-1 gap-6 px-4 lg:grid-cols-2">
        {homeTaiSan.listFeatures.map((itemTaiSan, index) => {
          return (
            <React.Fragment key={index}>
              <ModuleItem item={itemTaiSan} />
            </React.Fragment>
          )
        })}
      </div>
      {/* End: List features */}
      {/* Start: DS Yêu Cầu báo hỏng thống kê */}
      <ThongKeBaoHong />
      {/* End: DS Yêu Cầu báo hỏng thống kê */}
    </>
  )
}

export default HomeTaiSan
