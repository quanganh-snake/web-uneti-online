import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

function FeatureItemMotCua(props) {
	const { iconKhaoThi, featureItem } = props;
	const location = useLocation();
	const { pathname } = location;

	return (
		<div className="feature__item min-h-[200px] h-full bg-white p-4 rounded-xl shadow-lg flex flex-col relative">
			<div className="feature--header flex items-center gap-4 border-b-2 pb-2 border-[#336699]">
				<img src={iconKhaoThi} className="w-14" alt={featureItem.title} />
				<h2 className="text-xl font-semibold">{featureItem.title}</h2>
			</div>
			<div className="feature--body my-4">
				<p dangerouslySetInnerHTML={{ __html: featureItem.desc }}></p>
			</div>
			<div className="feature--footer flex justify-end absolute bottom-3 right-3">
				<Link to={pathname + featureItem.path} className="px-3 py-2 bg-white text-[#336699] font-semibold border border-sky-900 rounded-full hover:bg-[#336699] hover:text-white">
					Gửi yêu cầu
				</Link>
			</div>
		</div>
	);
}

FeatureItemMotCua.propTypes = {
	featureItem: PropTypes.object.isRequired,
};

export default FeatureItemMotCua;
