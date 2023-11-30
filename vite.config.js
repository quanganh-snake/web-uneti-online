import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/demo-web-uneti-online",
	plugins: [react()],
	assetsInclude: ["/src/assets/*.{ico,jpg,jpeg,gif,svg,.png}"],
});
