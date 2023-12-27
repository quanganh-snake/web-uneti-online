function DanhSachHocPhan(props){
    const { tenDot, lyDo, listHocPhan, listLyDoDTK, listLyDoDT, handleRowSelection } = props

    return (
        <div className="flex flex-col justify-center items-center pb-4">
            <div className="w-[75%] overflow-x-auto">
                <table className="w-full min-w-[800px]">
                    <thead>
                        <tr>
                            <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                                STT
                            </th>
                            {lyDo !== 'Xem kết quả học tập' && (
                                <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                                    CHỌN
                                </th>
                            )}
                            <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                                MÃ MÔN HỌC
                            </th>
                            <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                                TÊN HỌC PHẦN
                            </th>
                            <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                                ĐIỂM THƯỜNG KỲ 
                            </th>
                            <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                                ĐIỂM THI
                            </th>
                            <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                                ĐIỂM TỔNG KẾT
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listHocPhan.length ? listHocPhan.map((hocphan, index) => (
                            <tr key={index}>
                                <td className="text-center p-3 border border-solid border-[#dee2e6]">{index + 1}</td>
                                {lyDo !== 'Xem kết quả học tập' && (
                                    <td className="text-center p-3 border border-solid border-[#dee2e6]">
                                        <input
                                            onChange={(e) => {handleRowSelection(e, hocphan)}}
                                            type="checkbox" 
                                        />    
                                    </td>
                                )}
                                <td className="text-center p-3 border border-solid border-[#dee2e6]">{hocphan.MaMonHoc}</td>
                                <td className="text-center p-3 border border-solid border-[#dee2e6]">{hocphan.TenMonHoc}</td>
                                <td className="text-center p-3 border border-solid border-[#dee2e6]">{hocphan.DiemThuongKy1}</td>
                                <td className="text-center p-3 border border-solid border-[#dee2e6]">{hocphan.DiemThi}</td>
                                <td className="text-center p-3 border border-solid border-[#dee2e6]">{hocphan.DiemTongKet}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan='8' className="text-center p-3 border border-solid border-[#dee2e6]">
                                    Hiện tại chưa có dữ liệu học phần cho học kỳ này!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default DanhSachHocPhan