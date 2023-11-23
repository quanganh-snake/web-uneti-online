import React from "react";
import PropTypes from "prop-types";
import Breadcrumb from "../../../../Components/Breadcumb/Breadcrumb";

function LichThiView(props) {
	const { home, breadcrumbs, loading, listHocKy, tenDot, dataLoaiThi, loaiThi, listHocPhan, handleChangeValue, handleRowSelection, handleSubmitData } = props;
	return (
		<div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
			<div className="p-4 flex flex-col gap-4">
				<Breadcrumb home={home} breadcrumbs={breadcrumbs} />
			</div>
		</div>
	);
}

LichThiView.propTypes = {};

export default LichThiView;
