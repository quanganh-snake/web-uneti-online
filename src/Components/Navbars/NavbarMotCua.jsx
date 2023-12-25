import React, { useState } from "react";
import { homeMotCua } from "../../Services/Static/dataStatic.js";
import { Link } from "react-router-dom";
import clsx from "clsx";

function NavbarMotCua() {
	const [activeIndex, setActiveIndex] = useState(0);
	return (
		<div className="items-center justify-between hidden w-full lg:flex md:w-auto md:order-1" id="navbar-user">
			<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
				{homeMotCua &&
					homeMotCua.map((module, index) => {
						const handleActive = () => {
							if (activeIndex === index) {
								setActiveIndex(null);
							} else {
								setActiveIndex(index);
							}
						};
						const isActive = index === activeIndex;
						return (
							<li key={index}>
								<Link
									to={"/motcua" + module.path}
									className={clsx(
										"block hover:bg-sky-800 hover:text-white px-4 py-2 rounded-[99px]",
										isActive ? "bg-sky-800 text-white" : "bg-transparent text-black"
									)}
									aria-current="page"
									onClick={handleActive}
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

export default NavbarMotCua;
