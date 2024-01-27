import { useLocation } from 'react-router-dom'

import ReactPaginate from 'react-paginate'

import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import icoPhoneHotLine from '@/assets/Icons/icoPhoneTaiSan.png'

import DanhSachTaiSan from './DanhSachTaiSan'
import clsx from 'clsx'
import Loading from '@/Components/Loading/Loading'
import Box from '@/Components/MotCua/Box'
import { TextareaAutosize } from '@mui/material'
import {
  Autocomplete,
  Checkbox,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { isEmpty } from 'lodash-unified'
import { listHinhThucBaoHong } from './constant'
import ModalChiTietTaiSan from '@/Components/Modals/ModalTaiSan/ModalChiTietTaiSan'
const BaoHongTaiSanView = (props) => {
  const {
    loading,
    dataViTri,
    listCoSo,
    listDiaDiem,
    listToaNha,
    listTang,
    listPhong,
    listTaiSan,
    currentItems,
    showModal,
    listYeuCauSuCo,
    taiSan,
    hinhThucBaoHong,
    listSuCo,
    tenSuCo,
    moTaSuCo,
    dataTaiSan,
    onSetDataViTri,
    onSetIdPhong,
    onShowModal,
    onSelectTaiSan,
    onChangeValue,
    onSelectHinhThuc,
    onReceiveMoTaSuCo,
    onSubmit,
    onSetTenSuCo,
    onSetDataTaiSan,
  } = props

  const location = useLocation()
  const { pathname } = location

  const breadcrumbs = [
    {
      title: 'Báo hỏng tài sản',
      path: pathname,
    },
  ]

  const home = {
    path: '/hotrothietbi',
    title: 'Hỗ trợ thiết bị',
  }

  return (
    <div className="bg-white rounded-md p-4">
      <Box home={home} breadcrumbs={breadcrumbs}>
        <div className="col-span-2">
          <h2 className="text-center uppercase text-4xl font-bold text-uneti-primary mb-10">
            Báo hỏng tài sản
          </h2>
          <div className="flex flex-col gap-4">
            <div className="hinhthucbaohong mb-4">
              <p className="font-semibold mb-4">Hình thức báo hỏng (*)</p>
              <div className="flex flex-row justify-between sm:justify-center lg:justify-normal sm:gap-20">
                {listHinhThucBaoHong.map((iHinhThuc) => (
                  <label
                    key={iHinhThuc.id}
                    htmlFor={iHinhThuc.id}
                    onClick={onSelectHinhThuc}
                    className="flex items-center gap-4 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="ckbBaoHong"
                      id={iHinhThuc.id}
                      value={iHinhThuc.title}
                    />
                    <span>{iHinhThuc.title}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="vitritaisan mb-4">
              <p className="mb-2 font-semibold">Vị trí tài sản (*)</p>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4 lg:col-span-2">
                  <p>Cơ sở</p>
                  <select
                    name="DT_QLP_Phong_CoSo"
                    id="DT_QLP_Phong_CoSo"
                    onChange={onChangeValue}
                    className="w-full px-3 py-2 border focus:outline-slate-400"
                  >
                    <option value="">Chọn cơ sở</option>
                    {listCoSo.map((iCoSo) => (
                      <option key={iCoSo.id} value={iCoSo.value}>
                        {iCoSo.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-4 lg:col-span-2">
                  <p>Địa điểm</p>
                  <select
                    name="DT_QLP_Phong_DiaDiem"
                    id="DT_QLP_Phong_DiaDiem"
                    onChange={onChangeValue}
                    disabled={
                      dataViTri?.DT_QLP_Phong_CoSo.trim() !== '' ? false : true
                    }
                    className="w-full px-3 py-2 border focus:outline-slate-400 disabled:bg-gray-200"
                  >
                    <option value="">Chọn địa điểm</option>
                    {dataViTri?.DT_QLP_Phong_CoSo === 'Hà Nội' &&
                      listDiaDiem.haNoi.map((iDiaDiem) => (
                        <option key={iDiaDiem.id} value={iDiaDiem.value}>
                          {iDiaDiem.title}
                        </option>
                      ))}
                    {dataViTri?.DT_QLP_Phong_CoSo === 'Nam Định' &&
                      listDiaDiem.namDinh.map((iDiaDiem) => (
                        <option key={iDiaDiem.id} value={iDiaDiem.value}>
                          {iDiaDiem.title}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-span-4 lg:col-span-2">
                  <p>Tòa nhà</p>
                  <select
                    name="DT_QLP_Phong_ToaNha"
                    id="DT_QLP_Phong_ToaNha"
                    onChange={onChangeValue}
                    disabled={
                      dataViTri?.DT_QLP_Phong_CoSo.trim() !== '' &&
                      dataViTri?.DT_QLP_Phong_DiaDiem.trim() !== ''
                        ? false
                        : true
                    }
                    className="w-full px-3 py-2 border focus:outline-slate-400 disabled:bg-gray-200"
                  >
                    <option value="">Chọn tòa nhà</option>
                    {listToaNha &&
                      listToaNha?.map((iToaNha) => (
                        <option
                          key={iToaNha.DT_QLP_Phong_ToaNha}
                          value={iToaNha.DT_QLP_Phong_ToaNha}
                        >
                          {iToaNha.DT_QLP_Phong_ToaNha}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-span-4 lg:col-span-2">
                  <p>Tầng</p>
                  <select
                    name="DT_QLP_Phong_Tang"
                    id="DT_QLP_Phong_Tang"
                    onChange={onChangeValue}
                    disabled={
                      dataViTri?.DT_QLP_Phong_CoSo.trim() !== '' &&
                      dataViTri?.DT_QLP_Phong_DiaDiem.trim() !== '' &&
                      dataViTri?.DT_QLP_Phong_ToaNha.trim() !== ''
                        ? false
                        : true
                    }
                    className="w-full px-3 py-2 border focus:outline-slate-400 disabled:bg-gray-200"
                  >
                    <option value="">Chọn tầng</option>
                    {listTang &&
                      listTang?.map((iTang) => (
                        <option
                          key={iTang.DT_QLP_Phong_Tang}
                          value={iTang.DT_QLP_Phong_Tang}
                        >
                          {iTang.DT_QLP_Phong_Tang}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-span-4 lg:col-span-2">
                  <p>Phòng</p>
                  <select
                    name="DT_QLP_Phong_Phong"
                    id="DT_QLP_Phong_Phong"
                    onChange={onChangeValue}
                    disabled={
                      dataViTri?.DT_QLP_Phong_CoSo.trim() !== '' &&
                      dataViTri?.DT_QLP_Phong_DiaDiem.trim() !== '' &&
                      dataViTri?.DT_QLP_Phong_ToaNha.trim() !== ''
                        ? false
                        : true
                    }
                    className="w-full px-3 py-2 border focus:outline-slate-400 disabled:bg-gray-200"
                  >
                    <option value="">Chọn tên phòng</option>
                    {listPhong &&
                      listPhong?.map((iPhong) => (
                        <option
                          key={iPhong.DT_QLP_Phong_ID}
                          value={iPhong.DT_QLP_Phong_ID}
                        >
                          {iPhong.DT_QLP_Phong_ID}
                          &#8722;
                          {iPhong.DT_QLP_Phong_TenPhong}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="tensuco">
              <p className="mb-2 font-semibold">Tên sự cố (*)</p>
              <Autocomplete
                className="w-full"
                size="small"
                multiple
                options={listSuCo.map((sc) => sc.DT_CVNB_TBGD_TL_Ten)}
                value={tenSuCo}
                onChange={(event, newValue) => {
                  onSetTenSuCo([...newValue])
                }}
                disableCloseOnSelect
                freeSolo={true}
                getOptionLabel={(option) => option}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox checked={selected} />
                    {option}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Chọn tên sự cố" />
                )}
              />
            </div>
            {/* START: Mô tả sự cố */}
            <div className="motasuco">
              <p className="mb-2 font-semibold">Mô tả sự cố (*)</p>
              <TextareaAutosize
                className="flex-1 w-full p-2 rounded-md border border-solid border-gray-300 focus:outline-slate-400"
                value={moTaSuCo}
                onChange={(e) => onReceiveMoTaSuCo(e.target.value)}
                minRows="3"
              />
            </div>
            {/* END: Mô tả sự cố */}
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100/75">
                <Loading />
              </div>
            ) : (
              <div
                className={clsx(
                  'danhsachtaisan mb-10',
                  hinhThucBaoHong !== '2' && 'hidden',
                )}
              >
                <p className="mb-2 font-semibold">Danh sách tài sản</p>
                <DanhSachTaiSan {...props} />
                {showModal && (
                  <ModalChiTietTaiSan
                    onShowModal={onShowModal}
                    dataTaiSan={dataTaiSan}
                  />
                )}
              </div>
            )}

            {dataViTri?.DT_QLP_Phong_Phong?.trim() !== '' && (
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={onSubmit}
                  className="px-3 py-2 font-medium bg-white border border-sky-700 rounded-full text-sky-700 hover:bg-sky-700 hover:text-white hover:opacity-80"
                >
                  Gửi yêu cầu
                </button>
              </div>
            )}
          </div>
        </div>
      </Box>
    </div>
  )
}

export default BaoHongTaiSanView
