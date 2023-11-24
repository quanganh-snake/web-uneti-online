import React from "react";

function SidebarTTHCGV() {
	return (
		<div className="uneti__luachon flex items-center gap-4">
			<label htmlFor="donvi" className="flex items-center gap-2 whitespace-nowrap">
				<input type="radio" defaultChecked name="luachon" id="donvi" />
				<span>Đơn vị</span>
			</label>
			<label htmlFor="linhvuc" className="flex items-center gap-2 whitespace-nowrap">
				<input type="radio" name="luachon" id="linhvuc" />
				<span>Lĩnh vực</span>
			</label>
		</div>
	);
}

export default SidebarTTHCGV;
