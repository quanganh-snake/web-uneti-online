import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineLocationOn, MdPhone, MdOutlinePublic } from "react-icons/md";
// data
import logoUNETI from "../../assets/Images/LOGO_UNETI.ico";
function Footer() {
	return (
		<footer className="bg-sky-800">
			<div className="py-3 max-w-7xl mx-auto flex flex-col md:flex-row gap-y-4 justify-between items-center">
				<div className="uneti-logo mb-5">
					<Link to="/">
						<img src={logoUNETI} alt="UNETI Logo" width={120} />
					</Link>
				</div>
				<div className="uneti-hanoi flex flex-col text-white mb-5 px-3">
					<h2 className="uppercase text-3xl font-bold text-center mb-3">Cơ sở Hà Nội</h2>
					<ul>
						<li>
							<p className="flex items-center gap-2 mb-3">
								<MdOutlineLocationOn />
								<span>Số 456 Minh Khai, P.Vĩnh Tuy, Q.Hai Bà Trưng, TP.Hà Nội </span>
							</p>
						</li>
						<li>
							<p className="flex items-center gap-2 mb-3">
								<MdOutlineLocationOn />
								<span>Số 218 Đường Lĩnh Nam, Q.Hoàng Mai, TP.Hà Nội </span>
							</p>
						</li>
						<li>
							<div className="uneti-phone flex items-center gap-4">
								<p className="flex items-center gap-1 mb-3">
									<MdPhone />
									<span>024.38621504</span>
								</p>
								<p className="flex items-center gap-1 mb-3">
									<MdPhone />
									<span>024.38621504</span>
								</p>
							</div>
						</li>
						<li>
							<Link to="https://uneti.edu.vn" className="flex items-center gap-2">
								<MdOutlinePublic />
								<span>uneti.edu.vn</span>
							</Link>
						</li>
					</ul>
				</div>
				<div className="uneti-namdinh flex flex-col text-white px-3">
					<h2 className="uppercase text-3xl font-bold text-center mb-3">Cơ sở Nam Định</h2>
					<ul>
						<li>
							<p className="flex items-center gap-2 mb-3">
								<MdOutlineLocationOn />
								<span>Số 353 Trần Hưng Đạo, P.Bà Triệu, TP.Nam Định</span>
							</p>
						</li>
						<li>
							<p className="flex items-center gap-2 mb-3">
								<MdOutlineLocationOn />
								<span>Khu xưởng Thực hành: Phường Mỹ Xá, TP.Nam Định</span>
							</p>
						</li>
						<li>
							<div className="uneti-phone flex items-center gap-4">
								<p className="flex items-center gap-1 mb-3">
									<MdPhone />
									<span>0228.3848706</span>
								</p>
								<p className="flex items-center gap-1 mb-3">
									<MdPhone />
									<span>0228.3845747</span>
								</p>
							</div>
						</li>
						<li>
							<Link to="https://uneti.edu.vn" className="flex items-center gap-2">
								<MdOutlinePublic />
								<span>uneti.edu.vn</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="bg-[#134156]">
				<div className="max-w-7xl mx-auto text-white flex items-center justify-between font-semibold p-3">
					<p>&#169; Copyright Trường Đại học Kinh tế - Kỹ thuật Công nghiệp</p>
					<p className="text-center">Version: 2.0.0.0</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
