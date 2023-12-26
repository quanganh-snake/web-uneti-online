import React from "react";
import Breadcrumb from "@/Components/Breadcumb/Breadcrumb";
import LichThi from "../LichThi/LichThi";

function HoanThiView(props){

    const {home, breadcrumbs, hocKy, setHocKy, loaiThi, setLoaiThi, lyDo, setLyDo, lyDoKhac, setLyDoKhac, listHocKy, setListHocKy, listLyDo, listLoaiThi} = props;

    return (
        <div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
			<div className="p-4 flex flex-col">
				<Breadcrumb home={home} breadcrumbs={breadcrumbs} />
				<div className="border-[#336699] border border-solid mt-5 rounded-md">
                    <form className="py-8 flex flex-col justify-center items-center gap-4">
                        <h2 className="text-center uppercase text-2xl font-bold text-sky-800 mb-6">TIẾP NHẬN YÊU CẦU HOÃN THI</h2>
                        <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                            <span className="block pr-10">Học kỳ (*)</span>
                            <select className="flex-1 md:max-w-[75%] p-2 rounded-md border border-solid border-gray-300" value={hocKy} onChange={e => setHocKy(e.target.value)}>
                                <option value="">Chọn học kỳ</option>
                                {listHocKy.map((e, index) => (
                                    <option key={index} value={e.TenDot}>{e.TenDot}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                            <span className="block pr-10">Loại thi</span>
                            <select className="flex-1 md:max-w-[75%] p-2 rounded-md border border-solid border-gray-300" value={loaiThi} onChange={e => {setLoaiThi(e.target.value)}}>
                                <option value="">Chọn loại thi</option>
                                {listLoaiThi.map((e, index) => (
                                    <option key={index} value={e.value}>{e.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                            <span className="block pr-10">Lý do (*)</span>
                            <select className="flex-1 md:max-w-[75%] p-2 rounded-md border border-solid border-gray-300" value={lyDo} onChange={e => {setLyDo(e.target.value); setLyDoKhac('')}}>
                                <option value="">Chọn lý do</option>
                                {listLyDo.map((e, index) => (
                                    <option key={index} value={e}>{e}</option>
                                ))}
                            </select>
                        </div>
                        {
                            lyDo === 'Lý do khác' && (
                            <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                <span className="block pr-10">Lý do khác (*)</span>
                                <textarea value={lyDoKhac} onChange={e => setLyDoKhac(e.target.value)} className="flex-1 md:max-w-[75%] p-2 rounded-md border border-solid border-gray-300">
                                </textarea>
                            </div>
                            )
                        }

                            <div className="w-[75%] flex flex-col justify-between items-start gap-2">
                                <span className="block pr-10">Ảnh giấy tờ kèm theo</span>
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="w-full p-2 rounded-md border border-dashed text-center border-gray-300" for="file">Chọn File Ảnh</label>
                                    <input type="file" id="file" className="hidden"  accept="image/png, image/jpeg"/>
                                </div>
                            </div>
                    </form>

                    {((hocKy === '' || lyDo === '' || loaiThi === '') &&  !(hocKy === '' && lyDo === '' && loaiThi === '') && !(hocKy !== '' && lyDo !== '' && loaiThi !== ''))
                        ? (
                        <div className="flex justify-center items-center pb-4">
                            <span className="w-[75%] text-center font-bold block text-red-900 bg-red-200 p-3 rounded-md">
                            Vui lòng chọn đầy đủ thông tin học kỳ, loại thi, lý do và môn học để xem lịch gửi yêu cầu hoãn thi!
                            </span>
                        </div>) : null}
                    <div className="flex justify-center items-center pb-8">
                        <button className="mt-8 px-5 py-3 border-2 border-solid text-[#245D7C] border-[#245D7C] rounded-md font-bold transition-all duration-200 hover:bg-[#245D7C] hover:text-white">Gửi Yêu Cầu</button>
                    </div>
                </div>
			</div>
		</div>
    )
}

HoanThiView.propTypes = {
};

export default HoanThiView;