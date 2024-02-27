import Loading from '@/Components/Loading/Loading'
import Box from '@/Components/MotCua/Box'
import { useLocation } from 'react-router-dom'
import DanhSachTaiSanTraCuu from './DanhSachTaiSanTraCuu'
import { DebounceInput } from 'react-debounce-input'

const TraCuuTaiSanView = (props) => {
  const { loading, listTaiSan, itemPerPage, textSearch, onSearch } = props

  const location = useLocation()
  const { pathname } = location

  const breadcrumbs = [
    {
      title: 'Tra cứu tài sản',
      path: pathname,
    },
  ]

  const home = {
    path: '/ho-tro-thiet-bi',
    title: 'Hỗ trợ thiết bị',
  }

  return (
    <>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="rounded-md bg-white p-4">
          <Box home={home} breadcrumbs={breadcrumbs}>
            <div className="col-span-2">
              <h2 className="mb-10 text-center text-4xl font-bold uppercase text-uneti-primary">
                Tra cứu tài sản
              </h2>
              <div className="tracuu__box">
                <div className="tracuu__search mb-4">
                  <div className="search__field">
                    <DebounceInput
                      id="text-search"
                      name="text-search"
                      placeholder="Nhập tên tài sản tìm kiếm"
                      className="w-full border px-3 py-1 focus:outline-slate-400"
                      onChange={onSearch}
                    />
                  </div>
                </div>
                {/* End: .tracuu__search */}
                <div className="tracuu__list">
                  <DanhSachTaiSanTraCuu
                    listTaiSan={listTaiSan}
                    itemPerPage={itemPerPage}
                    textSearch={textSearch}
                  />
                </div>
              </div>
            </div>
          </Box>
        </div>
      )}
    </>
  )
}

export default TraCuuTaiSanView
