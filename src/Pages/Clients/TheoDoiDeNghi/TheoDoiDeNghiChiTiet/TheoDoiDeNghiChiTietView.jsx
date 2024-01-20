import PropTypes from 'prop-types'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
function TheoDoiDeNghiChiTietView(props) {
    const { home, breadcrumbs, yeuCau, chiTiet, dataSV } = props
    return (
        <div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
            <div className="p-4 flex flex-col">
                <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
                <div className="border-[#336699] border border-solid mt-5 rounded-md">
                    <div className="py-8 flex flex-col justify-center items-center gap-4">
                        <h2 className="text-center px-4 uppercase text-2xl font-bold text-sky-800 mb-6">
                            CHI TIẾT THÔNG TIN XỬ LÝ GỬI YÊU CẦU TIẾP NHẬN
                        </h2>
                        <div className="w-[80%] flex flex-col justify-start items-start gap-2">
                            <p>Chào bạn: {`${dataSV.HoDem} ${dataSV.Ten}`}</p>
                            <p>
                                Chúng tôi đã tiếp nhận đề nghị về
                                <span className="text-red-500 px-2">
                                    {`${yeuCau.MC_TrangThai_YeuCau_SinhVien_TenYeuCau} - ${chiTiet.TenYeuCau}`}
                                </span>
                                của bạn, với thông tin như sau:
                            </p>
                            <p>A. THÔNG TIN SINH VIÊN:</p>
                            <p>
                                Mã sinh viên:
                                <span className="text-red-500 ml-2">
                                    {dataSV.MaSinhVien}
                                </span>
                            </p>
                            <p>
                                Họ và tên:
                                <span className="text-red-500 ml-2">{`${dataSV.HoDem} ${dataSV.Ten}`}</span>
                            </p>
                            <p>
                                Lớp danh nghĩa:{' '}
                                <span className="text-red-500 ml-2">
                                    {dataSV.LopHoc}
                                </span>
                            </p>
                            <p>B. NỘI DUNG ĐỀ NGHỊ:</p>
                            <p>
                                <span className="text-red-500 ml-10">{`${yeuCau.MC_TrangThai_YeuCau_SinhVien_TenYeuCau} - ${chiTiet.TenYeuCau}`}</span>
                            </p>
                            <p>C. NỘI DUNG TRẢ LỜI:</p>
                            <p>
                                <span className="text-red-500 ml-10">{`${chiTiet.MoTaChiTiet}`}</span>
                            </p>
                            <p>Thân chào!</p>
                            <p>LƯU Ý:</p>
                            <p>
                                - Nếu bạn không hiểu nội dung thông báo này có
                                thể liên hệ lại với chúng tôi theo thông tin bên
                                dưới,
                            </p>
                            <p>
                                - Nếu cần tư vấn hoặc giải đáp thắc mắc về NỘI
                                DUNG GIẢI QUYẾT ĐỀ NGHỊ. Bạn vui lòng liên hệ
                                (trong giờ hành chính) với thầy/cô ở bộ phận Một
                                cửa tại các cơ sở đào tạo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

TheoDoiDeNghiChiTietView.propTypes = {
    home: PropTypes.object,
    breadcrumbs: PropTypes.array,
    yeuCau: PropTypes.object,
    chiTiet: PropTypes.object,
    dataSV: PropTypes.object,
}

export default TheoDoiDeNghiChiTietView
