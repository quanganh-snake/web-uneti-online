import { Checkbox } from "@mui/material";

function DanhSachHocPhan({listHocPhan, handleRowSelection}){
    return (
        <div className="w-[75%] overflow-x-auto">
            <table className="w-full min-w-[800px]">
                <thead>
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
                </thead>
                <tbody>
                    {listHocPhan.length ? listHocPhan.map((hocphan, index) => (
                        <tr key={index}>
                            <td className="text-center p-3 border border-solid border-[#dee2e6]">{index + 1}</td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6]">
                            <Checkbox 
                                onChange={(e) => {
                                    handleRowSelection(e, hocphan);
                                }} 
                            />
                            </td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6]">{hocphan.MaLopHocPhan}</td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6]">{hocphan.TenMonHoc}</td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6]">{hocphan.TenHinhThucThi}</td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6]">{hocphan.DiemThi1}</td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6]">{hocphan.DiemTongKet1}</td>
                            <td className="text-center p-3 border border-solid border-[#dee2e6]">{hocphan.GhiChu}</td>
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
    )
}

export default DanhSachHocPhan;