function DanhSachLichThi({lichThi}){
    return (
        <div className="w-[75%] overflow-x-auto">
            <table>
                <tr>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                        STT
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                        CHỌN
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                        MÃ LỚP HỌC PHẦN
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                        TÊN MÔN HỌC 
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                        HÌNH THỨC THI
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                        ĐIỂM THI
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                        ĐIỂM TỔNG KẾT LẦN 1
                    </th>
                    <th className="p-2 font-bold bg-[#245D7C] text-white border border-solid border-[#dee2e6]">
                        GHI CHÚ
                    </th>
                </tr>
                {lichThi.length ? null : (
                    <tr>
                        <td colSpan='8' className="text-center p-3 border border-solid border-[#dee2e6]">
                        Hiện tại chưa có dữ liệu học phần cho học kỳ này!
                        </td>
                    </tr>
                )}
            </table>
        </div>
    )
}

export default DanhSachLichThi;