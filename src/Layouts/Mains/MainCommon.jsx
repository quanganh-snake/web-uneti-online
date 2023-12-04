import React from "react";
import Header from "../Headers/Header";
import Footer from "../Footers/Footer";
import RouterCore from "../../Routers";
import { useLocation } from "react-router-dom";

function MainCommon() {
	const location = useLocation();
	const { pathname } = location;

	return (
		<>
			{pathname === "/" || pathname === "/dangnhap" ? null : <Header />}

			<main className="mt-[140px] mb-[50px] max-w-7xl mx-auto">
				<RouterCore />
			</main>
			{pathname === "/" || pathname === "/dangnhap" ? null : <Footer />}
		</>
	);
}

export default MainCommon;
