import React from "react";
import Login from "./Login/Login";

function Default() {
	localStorage.removeItem("persist:root");
	return <Login />;
}

export default Default;
