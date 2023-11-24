import React from "react";
import FeatureLimited from "../../../../../Components/FeatureLimited/FeatureLimited";
import Breadcrumb from "../../../../../Components/Breadcumb/Breadcrumb";

function MienHocThiTiengAnh() {
	const home = {
		path: "/motcua",
		title: "Bộ phận một cửa",
	};

	const breadcrumbs = [
		{
			path: "/motcua/khaothi",
			title: "Khảo thí",
		},
		{
			path: "/motcua/khaothi/mienhocthiTA",
			title: "Miễn học, thi Tiếng Anh",
		},
	];

	return (
		<div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
			<div className="p-4 flex flex-col">
				<Breadcrumb home={home} breadcrumbs={breadcrumbs} />
				<FeatureLimited />
			</div>
		</div>
	);
}

export default MienHocThiTiengAnh;
