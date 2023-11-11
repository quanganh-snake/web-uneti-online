import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Breadcrumb from "../Breadcumb/Breadcrumb";

function FeatureLimited(props) {
	return (
		<div className="p-4 flex flex-col justify-center min-h-[500px]">
			<div className="font-bold text-center mb-10">
				<h2 className="text-3xl uppercase text-red-600 mb-4">Thông báo giới hạn tính năng</h2>
				<p>Chức năng này bị giới hạn không cho phép đề nghị trực tuyến, người học cần đến bộ phận Một cửa đề nghị trực tiếp.</p>
			</div>
			<div className="">
				<p className="font-bold mb-3">Các giấy tờ kèm theo (click vào tên giấy tờ để tải file):</p>
				<ol>
					<li>
						<p>1. Mẫu 1</p>
					</li>
					<li>
						<p>
							2. Mẫu giấy tờ kèm theo đề nghị (nếu trong đề nghị yêu cầu), người học tải file mẫu tại địa chỉ sau:
							<Link className="font-semibold ml-2 text-sky-900" to={"https://uneti.edu.vn/bieu-mau-bo-phan-hanh-chinh-mot-cua/"} target="_blank">
								https://uneti.edu.vn/bieu-mau-bo-phan-hanh-chinh-mot-cua/
							</Link>
						</p>
					</li>
				</ol>
			</div>
		</div>
	);
}

FeatureLimited.propTypes = {};

export default FeatureLimited;
