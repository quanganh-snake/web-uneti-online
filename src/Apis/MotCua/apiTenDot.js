export const getTenDot = (axiosJWT, accesToken) => {
	// console.log(`>>> Check log axios prototype: `,[axiosJWT]);
	return axiosJWT.get("/SP_EDU/Load_TenDot", {
		headers: {
			Authorization: `Bearer ${accesToken}`,
		},
	});
};
