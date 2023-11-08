import React from "react";
import Header from "../Headers/Header";
import Footer from "../Footers/Footer";
import RouterCore from "../../Routers";

function MainCommon() {
	return (
		<>
			<Header />
			<main className="mt-[140px] mb-[50px] max-w-7xl mx-auto">
				<RouterCore />
			</main>
			<Footer />
		</>
	);
}

export default MainCommon;
