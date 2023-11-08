import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown, MdNotificationImportant, MdInsertDriveFile, MdFormatListNumbered, MdLogout } from "react-icons/md";
import { FaYoutube } from "react-icons/fa6";
// data
import noAvatar from "../../Assets/Images/noavatar.png";
import logoUNETI from "../../Assets/Images/LOGO_UNETI.ico";

// styles
import "./Header.scss";

function Header() {
	const handleLogout = () => {};

	return (
		<header className="shadow-md fixed left-0 right-0 top-0 w-[100%] z-10">
			<nav className="bg-white border-gray-200 dark:bg-gray-900">
				<div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto">
					<Link to="/" className="flex items-center p-2">
						<img src={logoUNETI} className="h-20 mr-3" alt="UNETI Logo" />
					</Link>
					<div className="flex items-center md:order-2 relative py-4" id="control-dropdown">
						<button
							type="button"
							className="flex items-center gap-4 mr-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
							id="user-menu-button"
							aria-expanded="false"
							data-dropdown-toggle="user-dropdown"
							data-dropdown-placement="bottom"
						>
							<span className="sr-only">Open user menu</span>
							<img className="w-14 h-14 rounded-full object-cover border border-slate-500" src={noAvatar} alt="user photo" />
							<span className="hidden md:block">{"Tống Bá Quang Anh"}</span>
							<MdKeyboardArrowDown className="text-2xl hidden md:inline-block" />
						</button>
						{/* Dropdown menu */}
						<div
							className={`min-w-[220px] z-50 absolute top-[80%] my-4 right-0 text-base list-none bg-white divide-y divide-gray-100 rounded-b-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
							id="user-dropdown"
						>
							<ul className="py-2" aria-labelledby="user-menu-button">
								<li>
									<Link
										to="theodoidenghi"
										className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white hover:font-bold hover:text-white hover:bg-sky-800"
									>
										<MdNotificationImportant className="text-xl" />
										<span>Theo dõi đề nghị</span>
									</Link>
								</li>
								<li>
									<Link
										to="https://uneti.edu.vn/bieu-mau-bo-phan-hanh-chinh-mot-cua/"
										target="_blank"
										className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white hover:font-bold hover:text-white hover:bg-sky-800"
									>
										<MdInsertDriveFile className="text-xl" />
										<span>Biểu mẫu tham khảo</span>
									</Link>
								</li>
								<li>
									<Link
										to="https://uneti.edu.vn/category/quy-trinh-bo-phan-mot-cua/"
										target="_blank"
										className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white  hover:font-bold hover:text-white hover:bg-sky-800"
									>
										<MdFormatListNumbered className="text-xl" />
										Quy trình thủ tục
									</Link>
								</li>
								<li>
									<Link
										to="https://www.youtube.com/playlist?list=PLtaZam4oqTqBgIrLn2LBviw4nQArnNYqJ"
										target="_blank"
										className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white hover:font-bold hover:text-white hover:bg-sky-800"
									>
										<FaYoutube className="text-xl" />
										Hướng dẫn sử dụng
									</Link>
								</li>
								<li>
									<Link
										to={"#"}
										onClick={handleLogout}
										className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white  hover:font-bold hover:text-white hover:bg-sky-800"
									>
										<MdLogout className="text-xl" />
										Đăng xuất
									</Link>
								</li>
							</ul>
						</div>
					</div>
					{/* START: Navbar Pages */}
					<div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
						<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
							{/* {moduleStatic &&
								Object.keys(moduleStatic).length > 0 &&
								Object.keys(moduleStatic).map((module, index) => {
									const dataModule = moduleStatic[module];
									return (
										<li key={index}>
											<Link
												to={dataModule.path}
												className="block hover:bg-sky-800 hover:text-white px-4 py-2 text-white rounded-[99px] md:bg-transparent md:text-black"
												aria-current="page"
											>
												{dataModule.name}
											</Link>
										</li>
									);
								})} */}
						</ul>
					</div>
					{/* END: Navbar Pages */}
				</div>
			</nav>
		</header>
	);
}

export default Header;
