import Accordion from '@/Components/Base/Accordion/Accordion'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'

function DiemDanhView(props) {
  const { home, breadcrumbs, listDiemDanh, listHocKy } = props
  return (
    <div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
      <div className="p-4 flex flex-col">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
        <div className="w-full rounded-md mt-4 p-3 flex flex-col justify-center items-center">
          <h3 className="text-3xl uppercase text-center mb-4 font-semibold my-3 text-uneti-primary">
            THÔNG TIN ĐIỂM DANH
          </h3>
          <div className="w-full">
            {listHocKy.length
              ? listHocKy.map((hk, index) => (
                  <Accordion key={index} className="mb-2">
                    <Accordion.Label className="bg-uneti-primary text-white">
                      Học kỳ {hk.hocKy}
                    </Accordion.Label>
                    <Accordion.Content>
                      <div className="w-full my-4 overflow-x-scroll rounded-2xl border border-solid border-uneti-primary border-opacity-30">
                        <table className="text-vs-text text-sm rounded-3xl">
                          <thead className="font-semibold">
                            <tr>
                              <th
                                rowSpan={2}
                                className=" py-4 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0 border-l-0"
                              >
                                Mã lớp học phần
                              </th>
                              <th
                                rowSpan={2}
                                className=" py-4 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0"
                              >
                                Tên lớp học phần
                              </th>
                              <th
                                rowSpan={2}
                                className=" py-4 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0"
                              >
                                Tên lớp học
                              </th>
                              <th
                                rowSpan={2}
                                className=" py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0"
                              >
                                Số tín chỉ
                              </th>
                              <th
                                rowSpan={2}
                                className=" py-4 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0"
                              >
                                Giảng viên giảng dạy
                              </th>
                              <th
                                colSpan={3}
                                className=" py-4 min-w-[300px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0"
                              >
                                Số tiết nghỉ
                              </th>
                            </tr>
                            <tr>
                              <th className=" py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-l-0">
                                Có phép
                              </th>
                              <th className=" py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                                Không phép
                              </th>
                              <th className=" py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                                Tổng
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {listDiemDanh.map((mh, i) => {
                              if (
                                mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_TenDot ===
                                hk.hocKy
                              ) {
                                return (
                                  <tr key={i}>
                                    <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0 border-l-0">
                                      {
                                        mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_MaLopHocPhan
                                      }
                                    </td>
                                    <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                      {
                                        mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_TenLopHocPhan
                                      }
                                    </td>
                                    <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                      {
                                        mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_TenLopHoc
                                      }
                                    </td>
                                    <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                      {
                                        mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_SoTinChi
                                      }
                                    </td>
                                    <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                      {
                                        mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_TenGiangVien
                                      }
                                    </td>
                                    <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                      {
                                        mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_CoPhep
                                      }
                                    </td>
                                    <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                      {
                                        mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_KhongPhep
                                      }
                                    </td>
                                    <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                      {
                                        mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_TongNghi
                                      }
                                    </td>
                                  </tr>
                                )
                              }
                              return null
                            })}
                            <tr>
                              <td
                                className="font-semibold text-center py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0 border-l-0"
                                colSpan={5}
                              >
                                Tổng
                              </td>
                              <td className="text-center font-semibold py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0 border-l-0">
                                {hk.coPhep}
                              </td>
                              <td className="text-center font-semibold py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0 border-l-0">
                                {hk.khongPhep}
                              </td>
                              <td className="text-center font-semibold py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0 border-l-0">
                                {hk.tong}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Accordion.Content>
                  </Accordion>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiemDanhView
