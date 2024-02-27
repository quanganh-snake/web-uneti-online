import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'

function RenLuyenView(props) {
  const { home, breadcrumbs, listRenLuyen } = props
  return (
    <div className="bg-white shadow-module-item rounded-md">
      <div className="p-4 flex flex-col">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
        <div className="w-full rounded-md mt-4 p-3 flex flex-col justify-center items-center">
          <h3 className="text-3xl uppercase text-center mb-4 font-semibold my-3 text-uneti-primary">
            THÔNG TIN ĐIỂM RÈN LUYỆN
          </h3>
          <div className="w-full">
            <div className="w-full my-4 overflow-x-scroll rounded-2xl border border-solid border-uneti-primary border-opacity-30">
              <table className="text-vs-text text-sm rounded-3xl font-semibold w-full">
                <thead>
                  <tr>
                    <th className=" py-4 px-2 min-w-[50px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0 border-l-0">
                      STT
                    </th>
                    <th className=" py-4 px-2 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0">
                      Tên đợt
                    </th>
                    <th className=" py-4 px-2 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0">
                      Điểm rèn luyện
                    </th>
                    <th className=" py-4 px-2 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0">
                      Xếp loại
                    </th>
                    <th className=" py-4 px-2 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0">
                      Ghi chú
                    </th>
                    <th className=" py-4 px-2 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0 border-l-0 border-r-0">
                      Điểm cộng/trừ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listRenLuyen.map((hk, i) => (
                    <tr key={i}>
                      <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0 border-l-0">
                        {i + 1}
                      </td>
                      <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                        {hk.TC_SV_KetQuaHocTap_TenDot}
                      </td>
                      <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                        {hk.TC_SV_KetQuaHocTap_DiemRenLuyen}
                      </td>
                      <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                        {hk.TC_SV_KetQuaHocTap_DiemRenLuyen_XepLoai}
                      </td>
                      <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                        {hk.TC_SV_KetQuaHocTap_DiemRenLuyen_GhiChu}
                      </td>
                      <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0 border-r-0">
                        {hk.TC_SV_KetQuaHocTap_DiemRenLuyen_DiemCongTru}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RenLuyenView
