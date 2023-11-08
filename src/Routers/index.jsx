import React from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { privateRoutes } from "./privateRoutes";
import Error404 from "../Pages/Errors/404/Error404";

function RouterCore() {
	return (
		<Routes>
			{publicRoutes}
			{privateRoutes}
			<Route path="*" element={<Error404 />} />
		</Routes>
	);
}

export default RouterCore;
