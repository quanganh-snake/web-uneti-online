import React from "react";
import { homeTTHCGV } from "../../Services/Static/dataStatic.js";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

function NavbarTTHCGV() {
	const location = useLocation();
	const { pathname } = location;
	const listPathName = pathname.split("/").filter((path) => path != "");
	return (
		<div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
			<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
				{homeTTHCGV &&
					homeTTHCGV.map((module, index) => {
						return (
							<li key={module.id}>
								<Link
									to={module.path}
									className={clsx(
										"block hover:bg-sky-800 hover:text-white px-4 py-2 rounded-[99px]",
										listPathName.includes(module.path.split("/")[2]) ? "bg-sky-800 text-white" : "bg-transparent text-black"
									)}
									aria-current="page"
								>
									{module.name}
								</Link>
							</li>
						);
					})}
			</ul>
		</div>
	);
}

export default NavbarTTHCGV;
