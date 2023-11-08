import { Route } from "react-router-dom";
import Login from "../Pages/Login/Login";

export const publicRoutes = (
	<>
		<Route path={"/dangnhap"} element={<Login />} />
	</>
);
