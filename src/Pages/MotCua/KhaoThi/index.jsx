import React from "react";
import { homeMotCua } from "../../../Services/Utils/dataStatic.js";
import { Link, useLocation } from "react-router-dom";
import FeatureItemMotCua from "../../../Components/FeatureItemMotCua/FeatureItemMotCua.jsx";

function HomeKhaoThi() {
	const iconKhaoThi = homeMotCua[0].ico;
	const featureKhaoThi = homeMotCua[0].childrens;

	const location = useLocation();
	const { pathname } = location;
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
			{featureKhaoThi.map((featureItem, index) => {
				return featureItem.visiable ? (
					<div key={index} className="feature-box">
						<FeatureItemMotCua iconKhaoThi={iconKhaoThi} featureItem={featureItem} />
					</div>
				) : null;
			})}
		</div>
	);
}

export default HomeKhaoThi;
