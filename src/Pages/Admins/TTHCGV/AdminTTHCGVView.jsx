import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaFileInvoice } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import ThemMoiHoSoView from "./ThemMoiHoSo/indexView";
function AdminTTHCGVView(props) {
	const [thongTinActive, setThongTinActive] = useState(false);
	const [tpHoSoDeNghiActive, setTPHoSoDeNghiActive] = useState(false);
	const [trinhTuThucHienActive, setTrinhTuThucHienActive] = useState(false);
	const [phiActive, setPhiActive] = useState(false);
	const [phanQuyenActive, setPhanQuyenActive] = useState(false);
	const [trangThaiActive, setTrangThaiActive] = useState(false);

	useEffect(() => {
		setThongTinActive(true);
	}, []);

	return (
		<div className="p-4 rounded-xl shadow-lg bg-white">
			<div className="mb-5 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
				<ul className="flex flex-wrap -mb-px">
					<li className="me-2">
						<a href="#" className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500">
							Thiết lập hồ sơ
						</a>
					</li>
					<li className="me-2">
						<a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" aria-current="page">
							Thành phần hồ sơ đề nghị
						</a>
					</li>
					<li className="me-2">
						<a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
							Thiết lập trình tự thực hiện
						</a>
					</li>
					<li className="me-2">
						<a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
							Phí, lệ phí
						</a>
					</li>
					<li className="me-2">
						<a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
							Phân quyền
						</a>
					</li>
					<li className="me-2">
						<a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
							Trạng thái
						</a>
					</li>
				</ul>
			</div>
			<form>
				<ThemMoiHoSoView />
			</form>
		</div>
	);
}

AdminTTHCGVView.propTypes = {};

export default AdminTTHCGVView;
