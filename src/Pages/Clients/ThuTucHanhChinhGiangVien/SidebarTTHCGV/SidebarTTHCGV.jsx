import clsx from 'clsx'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { MdMenu, MdClose } from 'react-icons/md'
import { Link } from 'react-router-dom'
import {
  getAllLinhVuc,
  getAllPhongBan,
  getListDonVi,
} from '@/Apis/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'
function SidebarTTHCGV({ setKeywords, setDieuKienLoc }) {
  const [openMenu, setOpenMenu] = useState(true)
  const [dataSelect, setDataSelect] = useState('donvi')
  const [listDepartments, setListDepartments] = useState([])
  const [listArea, setListArea] = useState([])

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu)
  }

  const handleChangeSelectionData = (e) => {
    const { id } = e.target
    setDataSelect(id)
  }

  useEffect(() => {
    const getAllDepartments = async () => {
      try {
        const resultAllDepartments = await getListDonVi()
        if (resultAllDepartments.status === 200) {
          const dataDepartments = await resultAllDepartments?.data?.body
          if (dataDepartments) {
            setListDepartments([...dataDepartments])
          }
        }
      } catch (error) {
        console.info(error)
      }
    }

    const getAllAreas = async () => {
      try {
        const resultAllAreas = await getAllLinhVuc()
        if (resultAllAreas.status === 200) {
          const dataLinhnVuc = await resultAllAreas?.data?.body
          if (dataLinhnVuc.length) {
            setListArea([...dataLinhnVuc])
          }
        }
      } catch (error) {
        console.info(error.message)
      }
    }

    getAllDepartments()
    getAllAreas()
  }, [])

  return (
    <div className={clsx('w-full', openMenu ? ' md:min-w-[220px]' : '')}>
      <div
        className={clsx(
          'uneti__menu mb-2 flex',
          openMenu ? 'justify-end' : 'justify-start ',
        )}
      >
        {openMenu ? (
          <MdClose
            size={24}
            className="cursor-pointer hover:text-red-600"
            onClick={handleOpenMenu}
          />
        ) : (
          <MdMenu
            size={24}
            className="cursor-pointer hover:text-slate-700 hover:opacity-70"
            onClick={handleOpenMenu}
          />
        )}
      </div>
      <div
        className={clsx(
          'uneti__luachon border p-2',
          openMenu ? 'flex justify-between items-center gap-4' : 'hidden',
        )}
      >
        <label
          onChange={handleChangeSelectionData}
          htmlFor="donvi"
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <input
            type="radio"
            defaultChecked
            name="luachon"
            id="donvi"
            onChange={() => {
              setDieuKienLoc('NoiTiepNhan')
              setKeywords('')
            }}
          />
          <span>Đơn vị</span>
        </label>
        <label
          onChange={handleChangeSelectionData}
          htmlFor="linhvuc"
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <input
            type="radio"
            name="luachon"
            id="linhvuc"
            onChange={() => {
              setDieuKienLoc('LinhVuc')
              setKeywords('')
            }}
          />
          <span>Lĩnh vực</span>
        </label>
      </div>
      <div
        className={clsx(
          'uneti__luachon--list my-4  max-h-[700px] overflow-y-auto',
          openMenu ? '' : 'hidden',
        )}
      >
        {dataSelect &&
          dataSelect === 'donvi' &&
          listDepartments?.map((iData, index) => {
            return (
              <div
                className="uneti__luachon--item px-2 py-1 border hover:bg-[#336699] hover:text-white hover:font-semibold"
                key={index}
              >
                <Link
                  to={'/tthcgiangvien'}
                  onClick={() => {
                    setKeywords(iData.MC_TTHC_GV_NoiTiepNhan)
                    setDieuKienLoc('NoiTiepNhan')
                  }}
                >
                  <p className="truncate">{iData.MC_TTHC_GV_NoiTiepNhan}</p>
                </Link>
              </div>
            )
          })}
        {dataSelect &&
          dataSelect === 'linhvuc' &&
          listArea?.map((iData, index) => {
            return (
              <div
                className="uneti__luachon--item px-2 py-1 border hover:bg-[#336699] hover:text-white hover:font-semibold"
                key={index}
              >
                <Link
                  onClick={() => {
                    setKeywords(iData.MC_TTHC_GV_LinhVuc)
                    setDieuKienLoc('LinhVuc')
                  }}
                >
                  <p className="truncate">{iData.MC_TTHC_GV_LinhVuc}</p>
                </Link>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default SidebarTTHCGV
