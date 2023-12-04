import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
// data
import noAvatar from "../../assets/Images/noavatar.png";
import logoUNETI from "../../assets/Images/LOGO_UNETI.ico";

// styles
import "./Header.scss";
import NavbarMotCua from "../../Components/Navbars/NavbarMotCua";
import { useDispatch } from "react-redux";
import { logOut } from "./../../Apis/apiLogout";
import { persistor } from "../../Services/Redux/store";
import { DataSinhVien } from "../../Services/Utils/dataSinhVien.js";
import { DataCanBoGV } from "../../Services/Utils/dataCanBoGV.js";
import localStorage from "redux-persist/es/storage";
import DropdownProfileTeacher from "./DropdownProfileTeacher.jsx";
import DropdownProfileStudent from "./DropdownProfileStudent.jsx";
import NavbarTTHCGV from "../../Components/Navbars/NavbarTTHCGV.jsx";

function Header() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { pathname } = location;

	const listPath = pathname
		.split("/")
		.filter(Boolean)
		.map((item) => `/${item}`);

	const dataSV = DataSinhVien();
	const dataCBGV = DataCanBoGV();

	const refreshToken = dataSV.dataToken?.refreshToken ? dataSV.dataToken?.refreshToken : dataCBGV.dataToken?.refreshToken ? dataCBGV.dataToken?.refreshToken : null;

	const role = dataSV.Role ? dataSV.Role : dataCBGV.Role ? dataCBGV.Role : null;

	const handleLogout = () => {
		localStorage.removeItem("persist:root");
		logOut(role, dispatch, navigate, refreshToken);
		persistor.purge();
	};

	return (
		<header className="shadow-md fixed left-0 right-0 top-0 w-[100%] z-10">
			<nav className="bg-white border-gray-200 dark:bg-gray-900">
				<div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto">
					<Link to="/uneti" className="flex items-center p-2">
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
							<img className="w-14 h-14 rounded-full object-cover border border-slate-500" src={role === "GV" ? noAvatar : dataSV.HinhAnh} alt="user photo" />
							<span className="hidden md:block">{role === "GV" ? dataCBGV.HoDem + " " + dataCBGV.Ten : dataSV.HoDem + " " + dataSV.Ten}</span>
							<MdKeyboardArrowDown className="text-2xl hidden md:inline-block" />
						</button>
						{/* Dropdown menu */}
						<div
							className={`min-w-[220px] z-50 absolute top-[80%] my-4 right-0 text-base list-none bg-white divide-y divide-gray-100 rounded-b-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
							id="user-dropdown"
						>
							{role === "GV" ? <DropdownProfileTeacher handleLogout={handleLogout} /> : <DropdownProfileStudent handleLogout={handleLogout} />}
						</div>
					</div>
					{/* START: Navbar Pages */}
					{listPath && listPath.includes("/motcua") ? <NavbarMotCua /> : null}
					{listPath.includes("/tthcgiangvien") ? <NavbarTTHCGV /> : listPath.includes("/admin") ? <NavbarTTHCGV /> : null}

					{/* END: Navbar Pages */}
				</div>
			</nav>
		</header>
	);
}

export default Header;
