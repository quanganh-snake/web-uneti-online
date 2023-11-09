import React from "react";
import { homeMain } from "../../Services/Utils/dataStatic";
import { Link } from "react-router-dom";

function Home() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 px-4 lg:px-0">
			{homeMain.map((module, index) => {
				return (
					<Link
						to={module.path}
						key={index}
						className="uneti-module flex flex-col items-center p-10 bg-white hover:bg-[#ebf4f9] cursor-pointer shadow-[12px_12px_12px_#bfbfbf] hover:shadow-[3px_3px_3px_#bfbfbf] rounded-xl"
					>
						<img src={module.icon} className="w-20 mb-4" alt={module.title} />
						<h2 className="uppercase text-2xl font-bold text-center text-sky-900 mb-4">{module.title}</h2>
						<div className="line w-full h-[2px] bg-sky-900 mb-4"></div>
						<p className="text-center text-sky-700">{module.desc}</p>
					</Link>
				);
			})}
		</div>
	);
}

export default Home;
