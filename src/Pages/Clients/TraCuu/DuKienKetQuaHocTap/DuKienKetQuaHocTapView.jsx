import Accordion from '@/Components/Base/Accordion/Accordion'
import Button from '@/Components/Base/Button/Button'
import CommonLayout from '@/Layouts/Common/CommonLayout'

const DuKienKetQuaHocTapView = (props) => {
  const {
    home,
    breadcrumbs,
    listDiemDuKien,
    listHocKy,
    handleChangeScore,
    checkScoreValue,
    handleTinhDiemDuDoan,
    diemTichLuyThucTe,
    diemTichLuyDuKien,
    handleLamMoi,
  } = props

  return (
    <>
      <CommonLayout
        heading="DỰ KIẾN KẾT QUẢ HỌC TẬP"
        home={home}
        breadcrumbs={breadcrumbs}
      >
        <div>
          <div className="w-full p-2 flex justify-start items-start gap-4 flex-col md:flex-row">
            <div className="flex-1 w-full">
              <table className="w-full">
                <thead>
                  <tr>
                    <td
                      colSpan={2}
                      className="font-semibold text-center p-2 text-uneti-primary bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30"
                    >
                      Điểm thực tế
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30">
                      Điểm tích lũy hệ 10:
                    </td>
                    <td className="text-right font-semibold min-w-[100px] p-2 border border-solid border-uneti-primary border-opacity-30">
                      {
                        diemTichLuyThucTe.TC_SV_KetQuaHocTap_DiemTrungBinhTichLuy
                      }
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30">
                      Điểm tích lũy hệ 4:
                    </td>
                    <td className="text-right font-semibold min-w-[100px] p-2 border border-solid border-uneti-primary border-opacity-30">
                      {
                        diemTichLuyThucTe.TC_SV_KetQuaHocTap_DiemTrungBinhTichLuy_He4
                      }
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30">
                      Tổng số tín chỉ tích lũy:
                    </td>
                    <td className="text-right font-semibold min-w-[100px] p-2 border border-solid border-uneti-primary border-opacity-30">
                      {diemTichLuyThucTe.TC_SV_KetQuaHocTap_TongTinChi_TichLuy}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30">
                      Xếp loại học lực tích lũy:
                    </td>
                    <td className="text-right font-semibold min-w-[100px] p-2 border border-solid border-uneti-primary border-opacity-30">
                      {
                        diemTichLuyThucTe.TC_SV_KetQuaHocTap_XepLoaiHocLuc_TichLuy
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex-1 w-full">
              <table className="w-full">
                <thead>
                  <tr>
                    <td
                      colSpan={2}
                      className="font-semibold text-center p-2 text-uneti-primary bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30"
                    >
                      Điểm dự kiến
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30">
                      Điểm tích lũy hệ 10:
                    </td>
                    <td className="text-right font-semibold min-w-[100px] p-2 border border-solid border-uneti-primary border-opacity-30">
                      {diemTichLuyDuKien.diemTichLuyHe10}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30">
                      Điểm tích lũy hệ 4:
                    </td>
                    <td className="text-right font-semibold min-w-[100px] p-2 border border-solid border-uneti-primary border-opacity-30">
                      {diemTichLuyDuKien.diemTichLuyHe4}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30">
                      Tổng số tín chỉ tích lũy:
                    </td>
                    <td className="text-right font-semibold min-w-[100px] p-2 border border-solid border-uneti-primary border-opacity-30">
                      {diemTichLuyDuKien.tongSoTinChiTichLuy}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-solid border-uneti-primary border-opacity-30">
                      Xếp loại học lực tích lũy:
                    </td>
                    <td className="text-right font-semibold min-w-[100px] p-2 border border-solid border-uneti-primary border-opacity-30">
                      {diemTichLuyDuKien.xepLoai}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex w-full gap-2 p-2 flex-col sm:flex-row">
            <div className="flex-1">
              <Button onClick={() => handleLamMoi()}>Làm mới</Button>
            </div>
            <div className="flex-1">
              <Button onClick={() => handleTinhDiemDuDoan()}>Tính điểm</Button>
            </div>
          </div>
        </div>
        {listHocKy.length
          ? listHocKy.map((hk, index) => (
              <Accordion key={index} className="mb-2">
                <Accordion.Label className="bg-uneti-primary text-white">
                  Học kỳ {hk}
                </Accordion.Label>
                <Accordion.Content>
                  <div className="w-full my-4 overflow-x-auto rounded-2xl border border-solid border-uneti-primary border-opacity-30">
                    <table className="w-full text-vs-text text-sm rounded-3xl">
                      <thead className="font-semibold">
                        <tr>
                          <th className=" py-4 min-w-[200px] sticky left-0 bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0 border-l-0 border-r-0">
                            Tên môn học
                            <span className="absolute w-[1px] h-[100%] top-0 right-[-0.5px] bg-uneti-primary opacity-30"></span>
                          </th>
                          <th className=" py-4 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0 border-l-0">
                            Mã lớp học phần
                          </th>
                          <th className=" py-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0">
                            Số tín chỉ
                          </th>

                          <th className=" p-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0">
                            Điểm tổng kết hệ 10
                          </th>
                          <th className=" p-4 min-w-[100px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0 border-r-0">
                            Điểm tổng kết dự kiến
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {listDiemDuKien.map((mh, i) => {
                          if (mh.hocKy === hk) {
                            return (
                              <tr key={i}>
                                <td className="sticky left-0 top-0 bg-white font-semibold duration-200 py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0 border-l-0 border-r-0">
                                  {mh.tenMonHoc}
                                  <span className="absolute w-[1px] h-[100%] top-0 right-[-0.5px] bg-uneti-primary opacity-30"></span>
                                </td>
                                <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0 border-l-0">
                                  {mh.maLopHocPhan}
                                </td>
                                <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                  {mh.soTinChi}
                                </td>
                                <td
                                  className={`${
                                    mh.diemTongKet <= 5 ? 'text-vs-danger' : ''
                                  }  py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0`}
                                >
                                  {mh.diemTongKet}
                                </td>
                                <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0 border-r-0 bg-uneti-primary bg-opacity-10">
                                  <input
                                    className="outline-none text-center bg-white rounded-lg"
                                    value={
                                      mh.diemDuKien != null ? mh.diemDuKien : ''
                                    }
                                    onChange={(e) =>
                                      handleChangeScore(
                                        mh.maLopHocPhan,
                                        e.target.value,
                                      )
                                    }
                                    onBlur={(e) =>
                                      checkScoreValue(
                                        mh.maLopHocPhan,
                                        e.target.value,
                                      )
                                    }
                                  />
                                </td>
                              </tr>
                            )
                          }
                          return ''
                        })}
                      </tbody>
                    </table>
                  </div>
                </Accordion.Content>
              </Accordion>
            ))
          : null}
      </CommonLayout>
    </>
  )
}

export default DuKienKetQuaHocTapView
