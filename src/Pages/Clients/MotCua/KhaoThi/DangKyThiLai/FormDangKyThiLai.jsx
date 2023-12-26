import { useState } from "react";
import DanhSachHocPhan from "./DanhSachHocPhan";

function FormDangKyThiLai(props){
    const {listHocPhan, hocKy, setHocKy, lyDo, setLyDo, listHocKy, lyDoKhac, setLyDoKhac, handleRowSelection, handleSubmitData} = props;

    return (
        <div className="border-[#336699] border border-solid mt-5 rounded-md">
            <form className="py-8 flex flex-col justify-center items-center gap-4">
                <h2 className="text-2xl font-bold pb-8 text-center px-2">TIẾP NHẬN YÊU CẦU ĐĂNG KÝ THI LẠI</h2>
                <div className="w-[75%] flex justify-between items-center">
                    <span className="block pr-10">Học kỳ (*)</span>
                    <select className="flex-1 max-w-[75%] p-2 rounded-md border border-solid border-gray-300" value={hocKy} onChange={e => setHocKy(e.target.value)}>
                        <option value="">Chọn học kỳ</option>
                        {listHocKy.map((e, index) => (
                            <option key={index} value={e.TenDot}>{e.TenDot}</option>
                        ))}
                    </select>
                </div>
                <div className="w-[75%] flex justify-between items-center">
                    <span className="block pr-10">Loại thi</span>
                    <select disabled className="flex-1 max-w-[75%] p-2 rounded-md border border-solid border-gray-300">
                        <option value="Thi Lại">Thi Lại</option>
                    </select>
                </div>
                <div className="w-[75%] flex justify-between items-center">
                    <span className="block pr-10">Lý do (*)</span>
                    <select className="flex-1 max-w-[75%] p-2 rounded-md border border-solid border-gray-300" value={lyDo} onChange={e => {setLyDo(e.target.value); setLyDoKhac('')}}>
                        <option value="">Chọn lý do</option>
                        <option value='0'>Trùng lịch thi</option>
                        <option value='1'>Lỗi Website</option>
                        <option value='2'>Khác hệ, loại hình đào tạo</option>
                        <option value='3'>Thi không theo kế hoạch</option>
                        <option value='4'>Lý do khác</option>
                    </select>
                </div>
                {
                    lyDo === '4' && (
                    <div className="w-[75%] flex justify-between items-start">
                        <span className="block pr-10">Chi tiết lý do (*)</span>
                        <textarea value={lyDoKhac} onChange={e => setLyDoKhac(e.target.value)} className="flex-1 max-w-[75%] p-2 rounded-md border border-solid border-gray-300">
                        </textarea>
                    </div>
                    )
                }
            </form>

            {(hocKy === '' && lyDo != '') || (hocKy != '' && lyDo === '') ? (
            <div className="flex justify-center items-center pb-4">
                <span className="w-[75%] text-center font-bold block text-red-900 bg-red-200 p-3 rounded-md">
                    Vui lòng chọn đầy đủ thông tin học kỳ và lý do để xem lịch thi cần đăng ký!
                </span>
            </div>) : null}

            {(hocKy != '' && lyDo != '') && (
            <div className="flex flex-col justify-center items-center pb-4">
                <DanhSachHocPhan listHocPhan={listHocPhan} handleRowSelection={handleRowSelection}/>
                <button onClick={handleSubmitData} className="mt-8 px-5 py-3 border-2 border-solid text-[#245D7C] border-[#245D7C] rounded-md font-bold transition-all duration-200 hover:bg-[#245D7C] hover:text-white">Gửi Yêu Cầu</button>
            </div >
            )}
        </div>
    )
}

FormDangKyThiLai.propTypes = {

}

export default FormDangKyThiLai;