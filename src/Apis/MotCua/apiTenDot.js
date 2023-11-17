import http from "../../Configs/http";

export const getTenDot = (token) => {
	return http.get("/SP_EDU/Load_TenDot", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
