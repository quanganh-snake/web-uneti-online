import React from "react";
import { MdAdd } from "react-icons/md";

function TrangThaiHoSo() {
	return (
		<div className="uneti-tthcgv__trangthai mb-5">
			<h2 className="text-2xl font-semibold uppercase mb-4">Thiết lập trạng thái</h2>
			<button type="button" className="flex flex-row gap-2 items-center font-semibold text-xl text-white bg-[#245D7C] px-2 py-1 rounded-md hover:opacity-70">
				<MdAdd size={24} className="font-bold" />
				Thêm trạng thái
			</button>
		</div>
	);
}

export default TrangThaiHoSo;
