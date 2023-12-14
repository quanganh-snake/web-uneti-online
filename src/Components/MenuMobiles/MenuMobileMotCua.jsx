import clsx from "clsx";
import React, { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";

function MenuMobileMotCua() {
	const [showMenu, setShowMenu] = useState(false);
	return (
		<>
			{showMenu ? (
				<IoMdClose
					size={32}
					color="red"
					className="hover:opacity-70"
					onClick={() => {
						setShowMenu(false);
					}}
				/>
			) : (
				<IoMdMenu
					size={32}
					color="#336699"
					className="hover:opacity-70"
					onClick={() => {
						setShowMenu(true);
					}}
				/>
			)}

			<div className={clsx("absolute left-0 right-0 top-[100%] w-full bg-[#336699]", showMenu ? "block" : "hidden")}>
				<ul>
					<li>
						<Link className="block w-full p-3 text-white font-medium hover:text-black hover:bg-gray-200 hover:border hover:boder-slate-600">Trang chủ</Link>
					</li>
					<li>
						<Link className="block w-full p-3 text-white font-medium hover:text-black hover:bg-gray-200 hover:border hover:boder-slate-600">Khảo thí</Link>
					</li>
					<li>
						<Link className="block w-full p-3 text-white font-medium hover:text-black hover:bg-gray-200 hover:border hover:boder-slate-600">Đào tạo</Link>
					</li>
					<li>
						<Link className="block w-full p-3 text-white font-medium hover:text-black hover:bg-gray-200 hover:border hover:boder-slate-600">CT&CTSV</Link>
					</li>
					<li>
						<Link className="block w-full p-3 text-white font-medium hover:text-black hover:bg-gray-200 hover:border hover:boder-slate-600">Hàn chính</Link>
					</li>
				</ul>
			</div>
		</>
	);
}

export default MenuMobileMotCua;
