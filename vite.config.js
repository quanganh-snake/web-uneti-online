import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	assetsInclude: ["/src/Assets/*.{ico,jpg,jpeg,gif,svg,.png}"],
});
