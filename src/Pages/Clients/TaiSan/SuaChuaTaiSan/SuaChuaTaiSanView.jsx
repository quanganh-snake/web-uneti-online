import Box from '@/Components/MotCua/Box'
import { useLocation } from 'react-router-dom'
import DanhSachBaoHong from './DanhSachBaoHong'
import { MdOutlineZoomOutMap, MdOutlineZoomInMap } from 'react-icons/md'
import clsx from 'clsx'
import Loading from '@/Components/Loading/Loading'

const SuaChuaTaiSanView = (props) => {
  const {
    loading,
    page,
    onSetPage,
    itemPerPage,
    onSetItemPerPage,
    listBaoHong,
    zoom,
    filters,
    onZoom,
    selected,
    onSelected,
    onConfirmNgayXuLy,
    onUpdateNgayXuLy,
    onChangeValueFilter,
    onClearFilter,
  } = props
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

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div
          className={clsx(
            'rounded-md bg-white p-4',
            zoom && 'fixed inset-0 z-[10] h-screen w-full overflow-auto',
          )}
        >
          <Box home={home} breadcrumbs={breadcrumbs}>
            <div className="col-span-2">
              <div className="grid grid-cols-12">
                <h2 className="col-span-11 text-center text-4xl font-bold uppercase text-uneti-primary">
                  Sửa chữa tài sản
                </h2>
                <div className="col-span-1 justify-end">
                  <div className="flex justify-end">
                    {zoom ? (
                      <MdOutlineZoomInMap
                        onClick={() => {
                          onZoom(false)
                        }}
                        className="my-2 cursor-pointer hover:text-cyan-800 md:text-2xl"
                      />
                    ) : (
                      <MdOutlineZoomOutMap
                        onClick={() => {
                          onZoom(true)
                        }}
                        className="my-2 cursor-pointer hover:text-cyan-800 md:text-2xl"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="my-4">
                <button
                  type="button"
                  onClick={onConfirmNgayXuLy}
                  className="rounded-lg border border-orange-500 bg-white px-3 py-2 font-semibold text-orange-600 hover:bg-orange-100"
                >
                  Xác nhận ngày sửa chữa
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <DanhSachBaoHong
                  page={page}
                  onSetPage={onSetPage}
                  itemPerPage={itemPerPage}
                  onSetItemPerPage={onSetItemPerPage}
                  listBaoHong={listBaoHong}
                  selected={selected}
                  filters={filters}
                  onSelected={onSelected}
                  onUpdateNgayXuLy={onUpdateNgayXuLy}
                  onChangeValueFilter={onChangeValueFilter}
                  onClearFilter={onClearFilter}
                />
              </div>
            </div>
          </Box>
        </div>
      )}
    </>
  )
}

export default SuaChuaTaiSanView
