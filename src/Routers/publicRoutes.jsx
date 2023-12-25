import { Route } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Default from "../Pages/Default";

export const publicRoutes = (
	<>
		<Route path={"/"}>
			<Route index element={<Default />} />
			<Route path="/dangnhap" element={<Login />} />
		</Route>
	</>
);
