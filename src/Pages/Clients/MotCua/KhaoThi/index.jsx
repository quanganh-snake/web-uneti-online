import React from "react";
import { homeMotCua } from "../../../../Services/Static/dataStatic.js";
import { useLocation } from "react-router-dom";
import FeatureItemMotCua from "../../../../Components/FeatureItemMotCua/FeatureItemMotCua.jsx";
import Breadcrumb from "../../../../Components/Breadcumb/Breadcrumb.jsx";

function HomeKhaoThi() {
	const iconKhaoThi = homeMotCua[0].ico;
	const featureKhaoThi = homeMotCua[0].childrens;

	const location = useLocation();
	const { pathname } = location;

	const breadcrumbs = [
		{
			title: "Khảo thí",
			path: pathname,
		},
	];

	const home = {
		path: "/motcua",
		title: "Bộ phận Một cửa",
	};

	return (
		<div className="">
			<div className="flex flex-col gap-4 p-5 rounded-md shadow-xl bg-white">
				<Breadcrumb home={home} breadcrumbs={breadcrumbs} />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{featureKhaoThi.map((featureItem, index) => {
						return featureItem.visiable ? (
							<div key={index} className="feature-box">
								<FeatureItemMotCua iconKhaoThi={iconKhaoThi} featureItem={featureItem} />
							</div>
						) : null;
					})}
				</div>
			</div>
		</div>
	);
}

export default HomeKhaoThi;
