export const getTenDot = (axiosJWT, accesToken) => {
	console.log([axiosJWT]);
	return axiosJWT.get("/SP_EDU/Load_TenDot", {
		headers: {
			Authorization: `Bearer ${accesToken}`,
		},
	});
};
